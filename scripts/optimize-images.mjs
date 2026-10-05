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
// Use the same brand mark at every size, including the conventional browser fallback.
const iconSizes = [16, 32, 48];
const iconImages = await Promise.all(iconSizes.map((size) => sharp("public/icon.svg").resize(size, size).png().toBuffer()));
await writeFile("public/favicon-32x32.png", iconImages[1]);
const iconHeader = Buffer.alloc(6 + iconSizes.length * 16);
iconHeader.writeUInt16LE(1, 2); // ICO, not a cursor.
iconHeader.writeUInt16LE(iconSizes.length, 4);
let iconOffset = iconHeader.length;
for (const [index, size] of iconSizes.entries()) {
  const entry = 6 + index * 16;
  iconHeader[entry] = size;
  iconHeader[entry + 1] = size;
  iconHeader.writeUInt16LE(1, entry + 4);
  iconHeader.writeUInt16LE(32, entry + 6);
  iconHeader.writeUInt32LE(iconImages[index].length, entry + 8);
  iconHeader.writeUInt32LE(iconOffset, entry + 12);
  iconOffset += iconImages[index].length;
}
await writeFile("public/favicon.ico", Buffer.concat([iconHeader, ...iconImages]));
await writeFile("src/generated/images.json", `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Generated responsive WebP variants for ${imageSources.length} images, social card and SVG/PNG/ICO brand icons.`);
