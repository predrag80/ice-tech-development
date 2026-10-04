import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolve, join } from "node:path";
import { previewServer } from "../scripts/preview.mjs";

const origin = "https://icetechdevelopment.com";
const routes = ["/", "/services/", "/projects/", "/process/", "/projects/smoki-navijaj/", "/projects/hse-training/", "/projects/99bitcoins/"];
const page = (route) => readFile(join("out", route, "index.html"), "utf8");
const decode = (value) => value.replaceAll("&amp;", "&");

for (const route of routes) {
  test(`${route}: production metadata, accessible structure, valid links and assets`, async () => {
    const html = await page(route);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    assert.match(html, /<html lang="en"/);
    assert.match(html, /id="main-content"/);
    assert.match(html, /href="#main-content"/);
    assert.ok(html.includes(`<link rel="canonical" href="${origin}${route}"`));
    assert.ok(html.includes(`<meta property="og:url" content="${origin}${route}"`));
    assert.ok(html.includes(`${origin}/social-card.jpg`));
    assert.doesNotMatch(html, /localhost:3000|mcp\.figma\.com|DUBIC|northwind|dashboard-pro/i);
    assert.equal((html.match(/aria-label="Primary navigation"/g) ?? []).length, 1);
    assert.match(html, /mailto:hello@icetechdevelopment.com/);
    for (const image of html.matchAll(/<img\b[^>]*>/g)) {
      assert.match(image[0], /\balt="/);
      assert.match(image[0], /\bsrcSet="/);
    }
    for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      const href = decode(match[1]);
      if (!href.startsWith("/") && !href.startsWith("#")) continue;
      const url = new URL(href, `${origin}${route}`);
      let path = join("out", decodeURIComponent(url.pathname));
      const info = await stat(path);
      if (info.isDirectory()) path = join(path, "index.html");
      assert.ok((await stat(path)).isFile(), `${route}: missing ${href}`);
      if (url.hash && path.endsWith(".html")) {
        const target = await readFile(path, "utf8");
        assert.ok(target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${route}: missing anchor ${href}`);
      }
    }
    for (const match of html.matchAll(/\bsrcSet="([^"]+)"/g)) {
      for (const candidate of decode(match[1]).split(",")) {
        const src = candidate.trim().split(" ")[0];
        assert.ok((await stat(join("out", src))).isFile(), src);
      }
    }
  });
}

test("SEO discovery contains only the seven real routes", async () => {
  const xml = await readFile("out/sitemap.xml", "utf8");
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  assert.deepEqual(urls.sort(), routes.map((r) => origin + r).sort());
  assert.match(await readFile("out/robots.txt", "utf8"), /Sitemap: https:\/\/icetechdevelopment.com\/sitemap.xml/);
});

test("all exported inline scripts are CSP-hashed; no third-party capture script", async () => {
  const headers = JSON.parse(await readFile("out/.headers.json", "utf8"));
  assert.doesNotMatch(headers["Content-Security-Policy"].split(";").find((p) => p.includes("script-src")), /unsafe-inline|unsafe-eval/);
  for (const route of [...routes, "404"]) {
    const html = route === "404" ? await readFile("out/404.html", "utf8") : await page(route);
    for (const [, attrs, script] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
      if (/\bsrc=/.test(attrs) || !script) continue;
      assert.ok(headers["Content-Security-Policy"].includes(createHash("sha256").update(script).digest("base64")), `${route}: missing CSP hash`);
    }
    assert.doesNotMatch(html, /<script[^>]+src="https?:\/\//);
  }
});

test("CSS background assets resolve in the exported site", async () => {
  const files = await readdir("out/_next/static", { recursive: true });
  for (const file of files.filter((path) => path.endsWith(".css"))) {
    const css = await readFile(join("out/_next/static", file), "utf8");
    for (const [, url] of css.matchAll(/url\(["']?(\/[^"')]+)["']?\)/g)) {
      assert.ok((await stat(join("out", url.split("?")[0]))).isFile(), `${file}: missing ${url}`);
    }
  }
});

test("responsive images exist and homepage imagery is below 1 MB at 1200px", async () => {
  const manifest = JSON.parse(await readFile("src/generated/images.json", "utf8"));
  for (const variants of Object.values(manifest)) {
    for (const src of Object.values(variants)) assert.ok((await stat(join("out", src))).size > 0);
  }
  let total = 0;
  for (const src of ["/hero-blue-clouds-v2.webp", "/hero-mountain-editorial-v2.png", "/cta-architectural-blueprint-v3.png", "/project-smoki-cover.jpg", "/project-hse-hero.webp", "/project-99bitcoins-cover.png"]) {
    const variants = manifest[src];
    const widths = Object.keys(variants).map(Number).sort((a, b) => a - b);
    total += (await stat(join("out", variants[widths.find((w) => w >= 1200) ?? widths.at(-1)]))).size;
  }
  assert.ok(total < 1_000_000, `Homepage image budget exceeded: ${total} bytes`);
  console.log(`Homepage imagery at 1200px variants: ${total} bytes (formerly 5,759,589 bytes).`);
});

test("production-only assets and honest archived-project status", async () => {
  assert.ok(!(await readdir("out")).includes("hero-mountain-editorial-v2.png"));
  const smoki = await page("/projects/smoki-navijaj/");
  assert.match(smoki, /Archived campaign/);
  assert.doesNotMatch(smoki, /Visit live website|2026 campaign/);
  assert.doesNotMatch(await page("/"), /Previous slide|Next slide|aria-label="LinkedIn"|aria-label="GitHub"/);
});

test("static preview serves deep links, redirects, real 404 and security headers", async (t) => {
  const server = await previewServer(resolve("out"));
  await new Promise((done) => server.listen(0, "127.0.0.1", done));
  t.after(() => new Promise((done) => server.close(done)));
  const base = `http://127.0.0.1:${server.address().port}`;
  for (const route of routes) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.ok(response.headers.get("content-security-policy"));
    await response.text();
  }
  const redirect = await fetch(`${base}/projects/smoki-navijaj`, { redirect: "manual" });
  assert.equal(redirect.status, 308);
  assert.equal(redirect.headers.get("location"), "/projects/smoki-navijaj/");
  const missing = await fetch(`${base}/does-not-exist/`);
  assert.equal(missing.status, 404);
  assert.match(await missing.text(), /This page isn/);
  assert.equal((await fetch(`${base}/.headers.json`)).status, 404);
});
