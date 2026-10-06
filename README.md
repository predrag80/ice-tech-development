# ICE TECH DEVELOPMENT

Static Next.js website for ICE TECH DEVELOPMENT, built for `https://icetechdevelopment.com/` and Apache-compatible Unlimited hosting. The host serves exported files; it does not run Node.js or Next.js. GitHub Actions verifies the release, then deploys successful `main` builds through a restricted SSH receiver once the one-time setup below is complete.

Internal navigation deliberately uses native document links through `StaticLink`. This avoids partial React Server Component/prefetch failures observed with this Next.js static export. Galleries and other client-side interactions still hydrate normally; each project opens with its first slide.

`SectionNavigation` enhances section links with scrolling and keyboard focus without adding a URL fragment. Cross-page section targets are passed through a short-lived, tab-local session entry; existing hash links still work and are cleaned on arrival. Native hrefs remain available without JavaScript and for modified/new-tab clicks. Query parameters are preserved, and reduced-motion preferences are respected.

## Development

```bash
npm ci
npm run dev
```

Node.js 24 LTS is used in CI. Development runs on port 3000. Source images remain in `public/`; `npm run images` generates responsive, content-hashed WebP variants, the social card and PNG/ICO favicons from the logo in `public/icon.svg`. Every new Next Image source must be listed in `scripts/optimize-images.mjs`.

## Verify and package

```bash
npm run check
npm start
```

`check` runs ESLint, a production export, 23 Node test groups (including 14 Python deployment tests) and the production dependency audit. Python 3 is required for the receiver tests. `npm start` previews the static export at `http://127.0.0.1:4175/`, including the generated Content Security Policy. It is a local preview, not an Apache emulator.

The homepage hero uses a code-native ICE TECH concept illustration, not a client project or a working application. Client work belongs in the project sections: Smoki and 99Bitcoins covers use existing application screenshots; HSE uses an HTML layout preview with its existing image. The contact illustration is also code-native and retains reduced-motion-aware parallax. Release tests keep client projects out of the hero and calculate the image budget from the assets actually rendered on the homepage.

Run `npm run release` to repeat checks and create a dated ZIP and SHA-256 checksum in `releases/` (requires the `zip` command). The ZIP contains the contents of `out/`, including `.htaccess`, but not source files, dependencies, original design images, credentials or the local header manifest. Production uses the clean GitHub Actions package, not an export made from a developer's untracked files.

## Automatic deployment: one-time setup

**Active since 5 October 2026.** The restricted receiver and dedicated credential are installed, the `production` environment permits only the `main` branch, and the first push-triggered [verification and deployment run](https://github.com/predrag80/ice-tech-development/actions/runs/37285344230) completed successfully. The steps below document the setup for maintenance or recovery; do not create duplicate keys or overwrite the installed receiver without reviewing it.

1. Create a GitHub `production` environment with a deployment branch policy allowing only the **main branch**, not pull requests or tags. Keep the existing required `check` ruleset; do not bypass it.
2. Install `hosting/deploy-receiver.py` and `hosting/apache.htaccess` in `/home/prowebsy/.ice-tech-deploy/`, **outside** every document root, with directory mode 700 and file mode 600. Install reviewed files from an exact commit and verify their SHA-256 checksums. The receiver is run by `/bin/python3 -I`, compatible with the server's Python 3.6. Changes to the receiver or Apache template require a reviewed manual update; a site deploy cannot replace them.
3. Create a dedicated Ed25519 key for this repository only. Append its **public** key to the account's `authorized_keys` with these options (preserve all existing entries):

   ```text
   restrict,command="/bin/python3 -I /home/prowebsy/.ice-tech-deploy/deploy-receiver.py" ssh-ed25519 PUBLIC_KEY ice-tech-github-deploy
   ```

   This key cannot open a shell, use SFTP/SCP, forward ports or choose another deployment directory. The receiver only accepts a ZIP of allowed static files and a fixed Apache configuration; arbitrary server-side scripts and Apache directives are rejected. It is a constrained publishing credential, not OS-level isolation from the hosting account.
4. Save the private key as the `UNLIMITED_DEPLOY_KEY` **environment secret** under `production`; never place it in source, a PR, chat, shell history, or a public artifact. Do not reuse the account's normal SSH key. SSH uses `s34.unlimited.rs:9780` and `prowebsy`. Its pinned Ed25519 host key in `hosting/unlimited-known-hosts` was verified against the server's loopback fingerprint through the authenticated cPanel terminal on 5 October 2026. If it changes, verify it independently with the host; do not disable host-key checking.
5. Merge through the protected PR workflow. The `Deploy to Unlimited` job depends on `check`, downloads **that same run's** archive, verifies its checksum, rejects outdated commits, and sends it to the receiver. It never receives production secrets on PR runs. A manual retry is available under Actions → Verify production release → Run workflow → main.

The receiver stages a complete site, preserving `/.well-known/`, existing unmanaged files and old hashed assets. It rejects symlinks, special files, path traversal, oversized ZIPs and mismatched HTML/CSP. Linux `RENAME_EXCHANGE` atomically swaps the prepared directory with `/home/prowebsy/icetechdevelopment.com`, so HTML and CSP change together. This capability was successfully probed on the actual host using two disposable empty directories. The public candidate uses 755 directories and 644 new files so Apache can read it; mail and other domains are untouched.

Seven real routes are verified over HTTPS after publishing. Failure automatically exchanges the complete previous site back into place. GitHub concurrency plus a server-side lock prevent overlapping deploys. The previous directory remains under `.ice-tech-deploy/release-…/site`, and `current.json` records the deployed commit, checksum, backup and managed file list. No backup is automatically deleted; review disk usage and retain the desired recovery history. Obsolete managed pages disappear from the new release, while previous hashed assets remain for open browser tabs.

For a later manual rollback, prefer reverting the application commit through a PR: the pipeline publishes a freshly checked version. For an emergency, use the authenticated cPanel terminal and the recorded backup with the receiver's `exchange()` function under the same `deploy.lock`; restore HTML and `.htaccess` together. Do not grant the deploy key unrestricted shell access to perform recovery.

Provider/reference documentation: [Unlimited SSH access and port](https://panel.unlimited.rs/index.php?rp=/knowledgebase/49/Pristup-putem-SSH-Shell.html), [GitHub deployment controls](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/control-deployments).

## Manual deployment fallback

1. In cPanel, locate the document root for **icetechdevelopment.com** under Domains. Do not assume it is `public_html` if the domain is an addon domain. Back up its existing files and `.htaccess` outside the public directory first; preserve mail and unrelated applications.
2. Check SSL/TLS Status and AutoSSL for both the apex domain and `www`. The supplied rewrite rules assume direct Apache/LiteSpeed TLS; if a CDN terminates TLS, confirm its proxy settings with the host before enabling the redirect to avoid a loop. [Unlimited SSL instructions](https://panel.unlimited.rs/index.php?rp=/knowledgebase/40/SSL-sertifikati-i-HTTPS-saobracaj.html).
3. Upload and extract the verified release ZIP **contents** into that document root, not into an extra `out` directory. Enable Show Hidden Files to include `.htaccess`. Do not upload `.git`, `node_modules`, `.env`, `src` or `design`. Replace an existing WordPress rewrite configuration only after backing it up and confirming the old site is being replaced.
4. Use directory permissions 755 and file permissions 644 unless the host requires otherwise. Keep any existing `/.well-known/` validation files. Do not alter MX, SPF or other mail DNS records to publish the website.
5. Purge any host/CDN HTML cache. Check HTTPS, the non-www redirect, direct entry/refresh on every project page, the mobile menu and all gallery controls. HTML and navigation payloads revalidate; hashed images and chunks are cacheable for a year. Retain the previous release assets during the rollout so open tabs can finish loading them.
6. Test `/does-not-exist/` returns HTTP 404 with the branded error page, not the homepage. Check `robots.txt`, `sitemap.xml`, social previews and the headers below. If `.htaccess` causes a server error, restore the backup and ask Unlimited support which directive is disallowed; do not silently remove the whole security configuration.

```bash
curl -I https://icetechdevelopment.com/
curl -I http://icetechdevelopment.com/projects/smoki-navijaj/
curl -I https://www.icetechdevelopment.com/
curl -I https://icetechdevelopment.com/does-not-exist/
```

Expect HTTP redirects to `https://icetechdevelopment.com/`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, a Content Security Policy, Referrer Policy and Permissions Policy. Directory routes use a trailing slash. The policy allows only self-hosted scripts plus build-generated inline script hashes, not arbitrary inline JavaScript or evaluation. Inline styles remain allowed for Next.js and the parallax component. Always rebuild the full export if HTML or scripts change; editing published HTML invalidates those hashes. HSTS is deliberately not enabled before the live TLS configuration is verified.

For rollback, restore the backed-up release files **and its `.htaccess` together**. Never restore only HTML with a different release's CSP. If the existing document root hosts other content, deploy only within the agreed website scope.

## Production deployment — 4 October 2026

- Live at `https://icetechdevelopment.com/` on Unlimited, from application commit `6e8934f`.
- Uploaded `ice-tech-production-2026-10-04T15-00-52-816Z.zip` (SHA-256 `341a87e1d273bc07caf957bb2396dd9b9193a1aaca686a6af24ed6416d3cdddc`) to the domain's dedicated `icetechdevelopment.com` document root.
- Preserved the previous content in `ice-tech-predeploy-2026-10-04-6e8934f.zip` in the cPanel account home, outside the public directory. The release ZIP is also retained there. SSL validation files, mail settings, DNS and other domains were not changed.
- Verified all 163 public release files byte-for-byte over HTTPS, seven page routes, per-page metadata and CSP hashes, HTTP/non-www redirects, a real 404, robots/sitemap, and protection of source/dotfiles. Desktop and 390px mobile browser checks passed, including the hamburger menu, project navigation and all three galleries; no browser errors were reported in these checks.
- Confirmed `info@icetechdevelopment.com` exists without account restrictions. MX, SPF and DMARC records are present. Actual inbound/outbound email delivery still requires a mailbox test; existence and DNS records alone do not prove delivery.

## First automatic deployment — 5 October 2026

- Application/infrastructure commit `8588f094697fc98080ecb8ab8bd873f261eb3af2` was deployed by GitHub Actions after PR #10 merged and all checks passed. Earlier team/FAQ/project-content changes are included; the personal name and all anonymous leadership roles are absent.
- Release: `ice-tech-production-2026-10-05T08-43-35-646Z.zip`, SHA-256 `34b46748908a610b58a71d8a5ce953a49b3af3d1afcca4f71041e8ecf4136e88`.
- Automatic pre-deploy backup: `/home/prowebsy/.ice-tech-deploy/release-8588f094697f-s106077w/site`. The earlier manual `ice-tech-predeploy-2026-10-05-before-content.zip` backup also remains outside the public root.
- Verified all 162 public package files byte-for-byte, all seven routes, inline-script CSP hashes, canonical HTTPS redirects, branded 404, robots/sitemap and source/dotfile protection. Desktop and 390px mobile checks passed for the team section, menu, FAQ and project galleries, without browser errors.
- The dedicated key successfully authenticated but refused an ordinary shell command. Server-side atomic exchange was probed before activation; all 14 receiver tests passed in Linux CI, including security rejection, backup preservation, atomic exchange and simulated verification-failure rollback.
- Future successful `main` pushes publish automatically. Inspect the latest Actions run and the server's private `current.json` for the current commit and backup; the entry above records the initial activation, not every later deployment.

## Launch checklist

- Domain and per-page canonical, Open Graph and Twitter metadata are configured in `src/app/site.ts`. Sitemap and robots are generated at build time.
- Project facts, technologies and permission to publish screenshots/logos were confirmed by the owner on 4 October 2026. Smoki is marked as an archived campaign with no live-site link. Unverified campaign dates were removed.
- No analytics or advertising scripts are installed. Fonts and images are served locally. LinkedIn/GitHub placeholders have been removed until actual profile URLs are supplied.
- Deployment, TLS, redirects, live headers and functional desktop/mobile checks are complete. Search Console sitemap submission and real-user performance monitoring remain owner follow-ups; no live Lighthouse score or full accessibility certification is claimed.
- **Still requires a mailbox test:** send an email to `info@icetechdevelopment.com` from an external account and reply to it. All contact buttons use `mailto:` and require the visitor's email app. Confirm DKIM and mail authentication with the mail administrator. No test email has been sent by the build process.

## Dependency security

On 6 October 2026, `npm audit --omit=dev` reports zero vulnerabilities after updating the transitive `source-map-js` dependency from 1.2.1 to 1.2.2 to address [GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q). The full audit still reports five high-severity package entries in one ESLint development chain: `eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces`. The previously accepted [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) limitation remains; this development dependency is not shipped to the static host.

Do not run `npm audit fix --force`: its suggested Next ESLint downgrade does not match this Next.js version. Run lint only on trusted project input, retain the full CI audit report, and apply a compatible upstream fix when published. Dependabot is configured for weekly npm checks. This is a documented open development-tooling issue, not a claim that the full dependency tree is vulnerability-free.
