import hashlib
import importlib.util
import io
import json
from pathlib import Path
import platform
import tempfile
import unittest
import zipfile

REPO = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location('receiver', str(REPO / 'hosting/deploy-receiver.py'))
receiver = importlib.util.module_from_spec(spec)
spec.loader.exec_module(receiver)
REVISION = 'a' * 40


def archive(files):
    data = io.BytesIO()
    with zipfile.ZipFile(data, 'w', zipfile.ZIP_DEFLATED) as target:
        for name, value in files.items():
            target.writestr(name, value)
    return data.getvalue()


def portable_swap(left, right):
    temporary = left.parent / 'test-only-exchange'
    left.rename(temporary)
    right.rename(left)
    temporary.rename(right)


class ReceiverTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.export = {str(p.relative_to(REPO / 'out')): p.read_bytes() for p in (REPO / 'out').rglob('*') if p.is_file() and p.name != '.headers.json'}
        cls.apache = (REPO / 'hosting/apache.htaccess').read_text()

    def validate(self, files):
        data = archive(files)
        return receiver.validate_package(data, hashlib.sha256(data).hexdigest(), self.apache)

    def test_real_export_is_accepted(self):
        self.assertEqual(self.validate(self.export), self.export)

    def test_arbitrary_shell_commands_are_rejected(self):
        for command in ('', 'bash', 'sftp', 'scp -t /tmp/site', 'deploy ' + REVISION + ' ' + 'b' * 64 + '; id'):
            with self.assertRaises(ValueError):
                receiver.parse_command(command)
        self.assertEqual(receiver.parse_command('deploy ' + REVISION + ' ' + 'b' * 64), (REVISION, 'b' * 64))

    def test_checksum_must_match(self):
        with self.assertRaises(ValueError):
            receiver.validate_package(archive(self.export), '0' * 64, self.apache)

    def test_unsafe_paths_and_executable_files_are_rejected(self):
        for name in ('../other-domain/index.html', '/index.html', '.ssh/key.txt', 'index.php', 'image.svg.php', 'nested/.htaccess', 'dir/.env', '.htaccess/other.html'):
            with self.subTest(name=name), self.assertRaises(ValueError):
                self.validate(dict(self.export, **{name: b'not allowed'}))

    def test_links_are_rejected(self):
        data = io.BytesIO()
        with zipfile.ZipFile(data, 'w') as target:
            info = zipfile.ZipInfo('link.html')
            info.create_system = 3
            info.external_attr = 0o120777 << 16
            target.writestr(info, '../outside')
        with self.assertRaises(ValueError):
            receiver.validate_package(data.getvalue(), receiver.digest(data.getvalue()), self.apache)

    def test_apache_cannot_gain_executable_handlers(self):
        for suffix in (b'\nAddHandler application/x-httpd-php .txt\n', b'\nRewriteRule . /other-domain/ [L]\n'):
            with self.assertRaises(ValueError):
                self.validate(dict(self.export, **{'.htaccess': self.export['.htaccess'] + suffix}))

    def test_html_and_csp_must_match(self):
        with self.assertRaises(ValueError):
            self.validate(dict(self.export, **{'index.html': self.export['index.html'] + b'<script>unexpected()</script>'}))

    def test_nested_configuration_is_fixed(self):
        with self.assertRaises(ValueError):
            self.validate(dict(self.export, **{'media/.htaccess': b'Options +ExecCGI'}))

    def test_missing_homepage_is_rejected(self):
        with self.assertRaises(ValueError):
            self.validate({n: b for n, b in self.export.items() if n != 'index.html'})

    def make_site(self, root):
        live, state = root / 'site', root / 'private'
        live.mkdir()
        state.mkdir()
        (live / 'index.html').write_text('previous')
        (live / '.htaccess').write_text('previous CSP')
        (live / '.well-known').mkdir()
        (live / '.well-known/token').write_text('keep SSL validation')
        (live / 'media').mkdir()
        (live / 'media/old-hash.webp').write_bytes(b'old open-tab asset')
        return live, state

    def test_publish_keeps_backup_ssl_and_old_hashed_assets(self):
        with tempfile.TemporaryDirectory() as directory:
            live, state = self.make_site(Path(directory))
            report = receiver.publish({'index.html': b'new', '.htaccess': b'new CSP'}, REVISION, 'c' * 64, live, state, lambda _: None, portable_swap)
            self.assertEqual((live / 'index.html').read_text(), 'new')
            self.assertEqual((Path(report['backup']) / 'index.html').read_text(), 'previous')
            self.assertEqual((live / '.well-known/token').read_text(), 'keep SSL validation')
            self.assertTrue((live / 'media/old-hash.webp').is_file())
            self.assertEqual(json.loads((state / 'current.json').read_text())['commit'], REVISION)

    def test_failed_health_check_restores_complete_previous_site(self):
        with tempfile.TemporaryDirectory() as directory:
            live, state = self.make_site(Path(directory))
            def fail(_):
                raise RuntimeError('HTTP check failed')
            with self.assertRaises(RuntimeError):
                receiver.publish({'index.html': b'new', '.htaccess': b'new CSP'}, REVISION, 'c' * 64, live, state, fail, portable_swap)
            self.assertEqual((live / 'index.html').read_text(), 'previous')
            self.assertEqual((live / '.htaccess').read_text(), 'previous CSP')
            self.assertFalse((state / 'current.json').exists())

    def test_removed_route_is_removed_only_from_candidate(self):
        with tempfile.TemporaryDirectory() as directory:
            live, state = self.make_site(Path(directory))
            (live / 'retired.html').write_text('retired')
            (state / 'current.json').write_text(json.dumps({'managed_files': ['retired.html', 'media/old-hash.webp']}))
            report = receiver.publish({'index.html': b'new'}, REVISION, 'c' * 64, live, state, lambda _: None, portable_swap)
            self.assertFalse((live / 'retired.html').exists())
            self.assertTrue((Path(report['backup']) / 'retired.html').exists())
            self.assertTrue((live / 'media/old-hash.webp').exists())

    def test_existing_symlinks_abort_before_publication(self):
        with tempfile.TemporaryDirectory() as directory:
            live, state = self.make_site(Path(directory))
            (live / 'linked.html').symlink_to('/etc/passwd')
            with self.assertRaises(ValueError):
                receiver.publish({'index.html': b'new'}, REVISION, 'c' * 64, live, state, lambda _: None, portable_swap)
            self.assertEqual((live / 'index.html').read_text(), 'previous')

    @unittest.skipUnless(platform.system() == 'Linux', 'Atomic exchange is Linux-specific; also probed on the hosting server')
    def test_real_atomic_directory_exchange(self):
        with tempfile.TemporaryDirectory() as directory:
            a, b = Path(directory) / 'a', Path(directory) / 'b'
            a.mkdir()
            b.mkdir()
            (a / 'old').touch()
            (b / 'new').touch()
            receiver.exchange(a, b)
            self.assertTrue((a / 'new').is_file())
            self.assertTrue((b / 'old').is_file())


if __name__ == '__main__':
    unittest.main()
