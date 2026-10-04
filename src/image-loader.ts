"use client";

import type { ImageLoaderProps } from "next/image";
import manifest from "./generated/images.json";

export default function imageLoader({ src, width }: ImageLoaderProps): string {
  const variants = (manifest as Record<string, Record<string, string>>)[src];
  if (!variants) throw new Error(`Missing static image variants for ${src}. Run npm run images.`);
  const widths = Object.keys(variants).map(Number).sort((a, b) => a - b);
  const selected = widths.find((size) => size >= width) ?? widths.at(-1)!;
  return variants[selected];
}
