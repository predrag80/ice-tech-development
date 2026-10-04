import { createHash } from "node:crypto";
import { readdir, readFile, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";

const manifest = JSON.parse(await readFile("src/generated/images.json", "utf8"));
// Remove only build copies of original/retired design assets. Source files stay intact.
const excluded = [
  ...Object.keys(manifest).map((path) => path.slice(1)),
  "og.png", "ice-mountains.png", "samoyed-watermark.png", "hero-alps-4k.webp",
  "cta-brutalist-alpine-v2.png", "project-smoki-fans.jpg", "project-smoki-onboarding.jpg", "project-smoki-reward.svg",
];
for (const name of excluded) await unlink(join("out", name)).catch((error) => { if (error.code !== "ENOENT") throw error; });
const currentVariants = new Set(Object.values(manifest).flatMap(Object.values).map((path) => path.slice("/media/".length)));
for (const name of await readdir("out/media")) if (!currentVariants.has(name)) await unlink(join("out/media", name));

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory() ? walk(join(dir, entry.name)) : join(dir, entry.name)))).flat();
}
const hashes = new Set();
for (const file of await walk("out")) {
  if (!file.endsWith(".html")) continue;
  const html = await readFile(file, "utf8");
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/\bsrc=/.test(match[1]) || !match[2]) continue;
    hashes.add(`'sha256-${createHash("sha256").update(match[2]).digest("base64")}'`);
  }
}
const policy = `default-src 'self'; script-src 'self' ${[...hashes].join(" ")}; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`;
if (policy.length > 7500) throw new Error("CSP header exceeds release size budget; switch to per-page CSP headers.");
const headers = {
  "Content-Security-Policy": policy,
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};
await writeFile("out/.headers.json", JSON.stringify(headers, null, 2));
const config = await readFile("hosting/apache.htaccess", "utf8");
await writeFile("out/.htaccess", `${config}\n<IfModule mod_headers.c>\n${Object.entries(headers).map(([key, value]) => `  Header always set ${key} "${value}"`).join("\n")}\n</IfModule>\n`);
for (const directory of ["out/_next/static", "out/media"]) {
  await writeFile(join(directory, ".htaccess"), '<IfModule mod_headers.c>\n  Header set Cache-Control "public, max-age=31536000, immutable"\n</IfModule>\n');
}
console.log(`Static export ready: ${hashes.size} inline script hashes secured; source images excluded from out/.`);
