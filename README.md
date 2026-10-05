# ICE TECH DEVELOPMENT

Static Next.js website for ICE TECH DEVELOPMENT, built for `https://icetechdevelopment.com/` and Apache-compatible Unlimited hosting. The host serves exported files; it does not run Node.js or Next.js. Publishing is a separate, manual step.

Internal navigation deliberately uses native document links through `StaticLink`. This avoids partial React Server Component/prefetch failures observed with this Next.js static export. Galleries and other client-side interactions still hydrate normally; each project opens with its first slide.

## Development

```bash
npm ci
npm run dev
```

Node.js 24 LTS is used in CI. Development runs on port 3000. Source images remain in `public/`; `npm run images` generates responsive, content-hashed WebP variants, the social card and app icon. Every new Next Image source must be listed in `scripts/optimize-images.mjs`.

## Verify and package

```bash
npm run check
npm start
```

`check` runs ESLint, a production export, 16 release tests and the production dependency audit. `npm start` previews the static export at `http://127.0.0.1:4175/`, including the generated Content Security Policy. It is a local preview, not an Apache emulator.

Run `npm run release` to repeat checks and create a dated ZIP and SHA-256 checksum in `releases/` (requires the `zip` command). The ZIP contains the contents of `out/`, including `.htaccess`, but not source files, dependencies, original design images, credentials or the local header manifest. GitHub Actions runs the same checks; it does not deploy automatically.

## Deploy to Unlimited

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

## Launch checklist

- Domain and per-page canonical, Open Graph and Twitter metadata are configured in `src/app/site.ts`. Sitemap and robots are generated at build time.
- Project facts, technologies and permission to publish screenshots/logos were confirmed by the owner on 4 October 2026. Smoki is marked as an archived campaign with no live-site link. Unverified campaign dates were removed.
- No analytics or advertising scripts are installed. Fonts and images are served locally. LinkedIn/GitHub placeholders have been removed until actual profile URLs are supplied.
- Deployment, TLS, redirects, live headers and functional desktop/mobile checks are complete. Search Console sitemap submission and real-user performance monitoring remain owner follow-ups; no live Lighthouse score or full accessibility certification is claimed.
- **Still requires a mailbox test:** send an email to `info@icetechdevelopment.com` from an external account and reply to it. All contact buttons use `mailto:` and require the visitor's email app. Confirm DKIM and mail authentication with the mail administrator. No test email has been sent by the build process.

## Dependency security

On 4 October 2026, `npm audit --omit=dev` reports zero vulnerabilities. The full audit reports five high-severity package entries in one ESLint development chain: `eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces`. [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) has no patched version, and the registry's latest braces version is 3.0.3. This dependency is not shipped to the static host.

Do not run `npm audit fix --force`: its suggested Next ESLint downgrade does not match this Next.js version. Run lint only on trusted project input, retain the full CI audit report, and apply a compatible upstream fix when published. Dependabot is configured for weekly npm checks. This is a documented open development-tooling issue, not a claim that the full dependency tree is vulnerability-free.
