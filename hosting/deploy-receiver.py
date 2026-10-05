#!/usr/bin/env python3
"""Restricted SSH receiver for this static site. Compatible with host Python 3.6.

Install outside the document root, alongside apache.htaccess. Never execute a
command from SSH_ORIGINAL_COMMAND: accept only deploy + SHA + archive checksum.
"""
import base64
import ctypes
import fcntl
import hashlib
import io
import json
import os
from pathlib import Path
import platform
import re
import shutil
import signal
import stat
import sys
import tempfile
import time
import urllib.request
import zipfile

LIVE = Path('/home/prowebsy/icetechdevelopment.com')
STATE = Path('/home/prowebsy/.ice-tech-deploy')
ORIGIN = 'https://icetechdevelopment.com'
MAX_BYTES = 50 * 1024 * 1024
HASH = re.compile(r"'sha256-[A-Za-z0-9+/]{43}='")
IMMUTABLE = '<IfModule mod_headers.c>\n  Header set Cache-Control "public, max-age=31536000, immutable"\n</IfModule>\n'
POLICY_START = "default-src 'self'; script-src 'self' "
POLICY_END = "; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"
SECURITY_END = '''  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "DENY"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>
'''
EXTENSIONS = {'.html', '.txt', '.xml', '.json', '.js', '.css', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.ico', '.woff2', '.webmanifest'}


def digest(data):
    return hashlib.sha256(data).hexdigest()


def parse_command(command):
    match = re.fullmatch(r'deploy ([0-9a-f]{40}) ([0-9a-f]{64})', command)
    if not match:
        raise ValueError('Only a verified static-site deploy is permitted; shell/SFTP access is disabled.')
    return match.groups()


def validate_package(data, checksum, apache_config):
    if len(data) > MAX_BYTES or digest(data) != checksum:
        raise ValueError('Archive size or checksum is invalid.')
    files = {}
    with zipfile.ZipFile(io.BytesIO(data)) as archive:
        if len(archive.infolist()) > 3000 or sum(i.file_size for i in archive.infolist()) > MAX_BYTES * 2:
            raise ValueError('Archive expansion limit exceeded.')
        seen = set()
        for entry in archive.infolist():
            name = entry.filename.rstrip('/')
            if name in seen or not re.fullmatch(r'[A-Za-z0-9_.$\-/]+', name):
                raise ValueError('Duplicate or invalid archive path.')
            seen.add(name)
            parts = name.split('/')
            if any(p in ('', '.', '..') or (p.startswith('.') and p != '.htaccess') for p in parts):
                raise ValueError('Hidden or escaping archive path.')
            mode = stat.S_IFMT(entry.external_attr >> 16)
            if mode not in (0, stat.S_IFREG, stat.S_IFDIR):
                raise ValueError('Links and special files are not permitted.')
            if entry.is_dir():
                if '.htaccess' in parts:
                    raise ValueError('Invalid directory.')
                continue
            if parts[-1] == '.htaccess':
                if name not in ('.htaccess', '_next/static/.htaccess', 'media/.htaccess'):
                    raise ValueError('Unexpected Apache configuration.')
            elif Path(name).suffix.lower() not in EXTENSIONS:
                raise ValueError('Only static public files are permitted.')
            if '.htaccess' in parts[:-1]:
                raise ValueError('Invalid parent directory.')
            files[name] = archive.read(entry)
    for required in ('index.html', '404.html', 'robots.txt', 'sitemap.xml', '.htaccess'):
        if required not in files:
            raise ValueError('Missing required release file: ' + required)
    # A deploy key must not introduce arbitrary Apache directives or executable handlers.
    config = files['.htaccess'].decode('utf-8')
    policy_match = re.search(r'^  Header always set Content-Security-Policy "([^"\n]+)"$', config, re.M)
    if not policy_match:
        raise ValueError('Missing Content Security Policy.')
    policy = policy_match.group(1)
    if not policy.startswith(POLICY_START) or not policy.endswith(POLICY_END):
        raise ValueError('Unexpected Content Security Policy.')
    hash_text = policy[len(POLICY_START):-len(POLICY_END)]
    hashes = HASH.findall(hash_text)
    if not hashes or ' '.join(hashes) != hash_text or len(policy) > 7500:
        raise ValueError('Invalid script hashes.')
    expected = apache_config + '\n<IfModule mod_headers.c>\n  Header always set Content-Security-Policy "' + policy + '"\n' + SECURITY_END
    if config != expected:
        raise ValueError('Apache configuration differs from the installed trusted template.')
    for name, content in files.items():
        if name.endswith('/.htaccess') and content.decode('utf-8') != IMMUTABLE:
            raise ValueError('Unexpected nested Apache configuration.')
        if name.endswith('.html'):
            for attrs, script in re.findall(r'<script\b([^>]*)>([\s\S]*?)</script>', content.decode('utf-8')):
                if re.search(r'\bsrc=', attrs) or not script:
                    continue
                token = "'sha256-" + base64.b64encode(hashlib.sha256(script.encode()).digest()).decode() + "'"
                if token not in hashes:
                    raise ValueError('HTML and CSP do not belong to the same release.')
    return files


def exchange(left, right):
    """Linux RENAME_EXCHANGE switches HTML, assets and CSP in one filesystem operation."""
    libc = ctypes.CDLL(None, use_errno=True)
    args = (-100, os.fsencode(str(left)), -100, os.fsencode(str(right)), 2)
    if hasattr(libc, 'renameat2'):
        result = libc.renameat2(*args)
    elif platform.system() == 'Linux' and platform.machine() == 'x86_64':
        result = libc.syscall(316, *args)  # CloudLinux glibc predates its renameat2 wrapper.
    else:
        raise RuntimeError('Atomic directory exchange is unavailable; live site was not changed.')
    if result != 0:
        raise OSError(ctypes.get_errno(), 'Atomic directory exchange failed')


def reject_links(root):
    for directory, dirs, files in os.walk(str(root), followlinks=False):
        for name in dirs + files:
            path = Path(directory) / name
            if path.is_symlink() or not (path.is_dir() or path.is_file()):
                raise ValueError('Unexpected link/special file in existing site: ' + name)


def verify_live(files):
    # All real routes, not only the homepage. TLS and certificate validation stay enabled.
    pages = {n: b for n, b in files.items() if n == 'index.html' or (n.endswith('/index.html') and not n.startswith(('404/', '_not-found/')))}
    for name, expected in pages.items():
        path = '/' + name[:-len('index.html')]
        request = urllib.request.Request(ORIGIN + path + '?deploy-check=' + digest(expected)[:12], headers={'Cache-Control': 'no-cache'})
        with urllib.request.urlopen(request, timeout=20) as response:
            if response.status != 200 or response.read(MAX_BYTES) != expected:
                raise RuntimeError('Live content verification failed: ' + path)
            if response.headers.get('X-Content-Type-Options') != 'nosniff' or not response.headers.get('Content-Security-Policy'):
                raise RuntimeError('Live security headers missing: ' + path)


def publish(files, revision, checksum, live=LIVE, state=STATE, verify=verify_live, swap=exchange):
    if live.is_symlink() or not live.is_dir():
        raise ValueError('The existing document root must be a real directory.')
    reject_links(live)
    # Never delete other releases, SSL validation, cgi-bin, mail, or another domain.
    # Existing hashed assets are retained so already-open tabs continue to work.
    candidate = Path(tempfile.mkdtemp(prefix='release-' + revision[:12] + '-', dir=str(state))) / 'site'
    shutil.copytree(str(live), str(candidate))
    if (state / 'current.json').is_file():
        previous = json.loads((state / 'current.json').read_text())
        for name in set(previous.get('managed_files', [])) - set(files):
            if name.startswith(('_next/', 'media/')):
                continue
            old = candidate / name
            if str(old.resolve()).startswith(str(candidate.resolve()) + os.sep) and old.is_file():
                old.unlink()  # Only an obsolete managed file in the new candidate; backup retains it.
    for name, content in files.items():
        path = candidate / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(content)
        path.chmod(0o644)
    # Candidate's group is the account group, while the original root is group nobody.
    # 755 directories allow the web server to read it after the atomic exchange.
    for directory, _, _ in os.walk(str(candidate)):
        os.chmod(directory, 0o755)
    swap(live, candidate)
    try:
        verify(files)
        report = {'commit': revision, 'sha256': checksum, 'backup': str(candidate), 'files': len(files), 'managed_files': sorted(files), 'deployed_at': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())}
        temporary = state / 'current.json.new'
        temporary.write_text(json.dumps(report, indent=2) + '\n')
        os.replace(str(temporary), str(state / 'current.json'))
    except BaseException:
        swap(live, candidate)
        print('Verification failed: previous complete site and CSP restored.', file=sys.stderr)
        raise
    return report


def main():
    revision, checksum = parse_command(os.environ.get('SSH_ORIGINAL_COMMAND', ''))
    # Fixed target and private state directory are never supplied by the SSH caller.
    if LIVE.resolve() != LIVE or STATE.resolve() != STATE:
        raise ValueError('Deployment paths must not be symlinks.')
    STATE.mkdir(mode=0o700, exist_ok=True)
    STATE.chmod(0o700)
    def interrupted(signum, frame):
        raise RuntimeError('Deployment interrupted by signal ' + str(signum))
    for sig in (signal.SIGTERM, signal.SIGINT, signal.SIGALRM):
        signal.signal(sig, interrupted)
    signal.alarm(600)
    with (STATE / 'deploy.lock').open('a') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        data = sys.stdin.buffer.read(MAX_BYTES + 1)
        files = validate_package(data, checksum, (STATE / 'apache.htaccess').read_text())
        report = publish(files, revision, checksum)
        del report['managed_files']
        print(json.dumps(report))


if __name__ == '__main__':
    try:
        main()
    except Exception as error:
        print('Deploy refused: ' + str(error), file=sys.stderr)
        sys.exit(1)
