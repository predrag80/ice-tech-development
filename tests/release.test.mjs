import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolve, join } from "node:path";
import { previewServer } from "../scripts/preview.mjs";
import sharp from "sharp";

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
    for (const icon of ["/favicon.ico?v=ice-tech-1", "/favicon-32x32.png?v=ice-tech-1", "/icon.svg?v=ice-tech-1", "/apple-touch-icon.png?v=ice-tech-1"]) {
      assert.ok(html.includes(`href="${icon}"`), `${route}: missing brand icon ${icon}`);
    }
    assert.doesNotMatch(html, /localhost:3000|mcp\.figma\.com|DUBIC|northwind|dashboard-pro/i);
    assert.equal((html.match(/aria-label="Primary navigation"/g) ?? []).length, 1);
    assert.match(html, /mailto:info@icetechdevelopment.com/);
    assert.doesNotMatch(html, /hello@icetechdevelopment\.com/);
    for (const [, email] of html.matchAll(/href="mailto:([^"]+)"/g)) {
      assert.equal(email, "info@icetechdevelopment.com");
    }
    assert.match(html, /<summary aria-label="Navigation menu"><span class="mobile-menu-icon" aria-hidden="true">/);
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

test("favicon variants contain the site's logo at the advertised sizes", async () => {
  const ico = await readFile("out/favicon.ico");
  assert.equal(ico.readUInt16LE(0), 0);
  assert.equal(ico.readUInt16LE(2), 1);
  assert.equal(ico.readUInt16LE(4), 3);
  for (const [index, size] of [16, 32, 48].entries()) {
    const entry = 6 + index * 16;
    assert.equal(ico[entry], size);
    assert.equal(ico[entry + 1], size);
    const offset = ico.readUInt32LE(entry + 12);
    const image = ico.subarray(offset, offset + ico.readUInt32LE(entry + 8));
    const expected = await sharp("public/icon.svg").resize(size, size).png().toBuffer();
    assert.deepEqual(image, expected);
  }
  for (const [file, size] of [["favicon-32x32.png", 32], ["apple-touch-icon.png", 180]]) {
    assert.deepEqual(await readFile(`out/${file}`), await sharp("public/icon.svg").resize(size, size).png().toBuffer());
  }
});

test("About identifies the business and the FAQ explains first contact", async () => {
  const html = await page("/");
  const about = html.match(/<section\b[^>]*id="about"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.ok(about, "About navigation must lead to the business introduction");
  assert.match(about, /Who we are/);
  assert.match(about, /Belgrade, Serbia/);
  assert.match(about, /a development team based in Belgrade/);
  assert.doesNotMatch(html, /Predrag (?:Vučković|Vuckovic)/i);
  assert.doesNotMatch(html, /leadership|founder|lead developer|project manager/i);
  assert.match(html, /id="approach"/);
  const faq = html.match(/<section\b[^>]*id="project-faq"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.ok(faq);
  assert.match(faq, /What happens after your email/);
  const answers = [...faq.matchAll(/<details>([\s\S]*?)<\/details>/g)];
  assert.equal(answers.length, 7);
  for (const [, answer] of answers) {
    assert.match(answer, /^<summary>/, "FAQ must use native keyboard-accessible disclosure controls");
    assert.match(answer, /<\/summary><p>.+<\/p>/);
  }
  assert.match(faq, /mailto:info@icetechdevelopment.com/);
  assert.match(faq, /hosting and support after launch/);
  assert.match(faq, /source code and access handed over/);
});

test("process phases stay consistent across all three presentations", async () => {
  const phases = ["Understand", "Define", "Design", "Build", "Launch & evolve"];
  for (const route of ["/", "/services/", "/process/"]) {
    const html = await page(route);
    const list = html.match(/<ol\b[^>]*aria-label="Our five-phase process"[^>]*>([\s\S]*?)<\/ol>/)?.[1];
    assert.ok(list, route);
    const titles = [...list.matchAll(/<(?:strong|h3|small)>(.*?)<\/(?:strong|h3|small)>/g)].map((match) => decode(match[1]));
    assert.deepEqual(titles, phases, route);
  }
});

test("each case study distinguishes contribution, scope and result", async () => {
  for (const route of routes.filter((route) => route.startsWith("/projects/") && route !== "/projects/")) {
    const html = await page(route);
    for (const title of ["The challenge", "Our contribution", "The result"]) assert.ok(html.includes(`<h3>${title}</h3>`), `${route}: ${title}`);
    assert.match(html, /<p>Our scope<\/p>/);
  }
  assert.match(await page("/projects/99bitcoins/"), /Our work focused on custom WordPress plugins/);
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
  const renderedImages = [...(await page("/")).matchAll(/<img\b[^>]*>/g)].map(([tag]) => tag).join("\n");
  const homepageVariants = Object.values(manifest).filter((variants) => Object.values(variants).some((src) => renderedImages.includes(src)));
  assert.ok(homepageVariants.length >= 4, "Homepage image budget must cover the actual rendered assets");
  for (const variants of homepageVariants) {
    const widths = Object.keys(variants).map(Number).sort((a, b) => a - b);
    total += (await stat(join("out", variants[widths.find((w) => w >= 1200) ?? widths.at(-1)]))).size;
  }
  assert.ok(total < 1_000_000, `Homepage image budget exceeded: ${total} bytes`);
  console.log(`Homepage imagery at 1200px variants: ${total} bytes (formerly 5,759,589 bytes).`);
});

test("brand concept stays separate from real project screens and navigation", async () => {
  const home = await page("/");
  assert.doesNotMatch(home, /Code editor preview|class="hero-note"|cta-architectural-blueprint-v3|hero-mountain-editorial-v2/);
  assert.match(home, /Our five-phase process/);
  assert.match(home, /Thoughtfully connected\. Built to evolve/);
  const hero = home.match(/<section id="main-content"[\s\S]*?<\/section>/)?.[0];
  assert.ok(hero, "Product hero is rendered");
  assert.match(hero, /ICE TECH concept illustration/);
  assert.match(hero, /Application \+ data/);
  assert.doesNotMatch(hero, /99bitcoins|smoki|hse-training|href="\/projects\//i);
  assert.doesNotMatch(hero, /<button\b|role="button"/);
  for (const route of ["/", "/projects/"]) {
    const html = await page(route);
    for (const asset of ["project-smoki-homepage-screen", "project-smoki-avatar-screen", "project-99bitcoins-bitcoin"]) {
      assert.ok(html.includes(asset), `${route}: missing product screenshot ${asset}`);
    }
    for (const slug of ["smoki-navijaj", "hse-training", "99bitcoins"]) {
      assert.match(html, new RegExp(`href="/projects/${slug}/?"`));
    }
    assert.match(html, /HSE Training website layout preview/);
  }
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
  for (const [file, type] of [["favicon.ico", "image/x-icon"], ["favicon-32x32.png", "image/png"], ["icon.svg", "image/svg+xml"]]) {
    const icon = await fetch(`${base}/${file}?v=ice-tech-1`);
    assert.equal(icon.status, 200);
    assert.equal(icon.headers.get("content-type"), type);
    assert.deepEqual(Buffer.from(await icon.arrayBuffer()), await readFile(`out/${file}`));
  }
});
