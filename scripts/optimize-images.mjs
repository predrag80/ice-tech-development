import sharp from "sharp";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, extname } from "node:path";

// Originals remain untouched. Only generated assets are included in the release.
export const imageSources = [
  "hero-blue-clouds-v2.webp", "hero-mountain-editorial-v2.png", "cta-architectural-blueprint-v3.png",
  "project-smoki-cover.jpg", "project-hse-hero.webp", "project-99bitcoins-cover.png",
  "project-smoki-homepage-screen.webp", "project-smoki-avatar-screen.webp", "project-smoki-cheering-screen.webp",
  "project-hse-training.webp", "project-hse-coaching.webp", "project-hse-team.webp",
  "project-99bitcoins-bitcoin.jpg", "project-99bitcoins-dex.jpg", "project-99bitcoins-indices.jpg",
];

await mkdir("public/media", { recursive: true });
await mkdir("src/generated", { recursive: true });
const manifest = {};
for (const file of imageSources) {
  const source = await readFile(`public/${file}`);
  const hash = createHash("sha256").update(source).update("webp-q82-v1").digest("hex").slice(0, 12);
  const metadata = await sharp(source).metadata();
  const widths = [...new Set([240, 320, 480, 768, 1200, 1600, 1920].map((w) => Math.min(w, metadata.width)))];
  manifest[`/${file}`] = {};
  for (const width of widths) {
    const output = `${basename(file, extname(file))}-${hash}-${width}.webp`;
    await sharp(source).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toFile(`public/media/${output}`);
    manifest[`/${file}`][width] = `/media/${output}`;
  }
}
await sharp("public/og.png").resize(1200, 630, { fit: "cover" }).jpeg({ quality: 85, mozjpeg: true }).toFile("public/social-card.jpg");
await sharp("public/icon.svg").resize(180, 180).png().toFile("public/apple-touch-icon.png");
await writeFile("src/generated/images.json", `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Generated responsive WebP variants for ${imageSources.length} images, social card and app icon.`);
