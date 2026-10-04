import type { Metadata } from "next";

export const siteUrl = "https://icetechdevelopment.com";
export const siteName = "ICE TECH DEVELOPMENT";

export function pageMetadata(path: string, title: string, description: string): Metadata {
  const url = `${siteUrl}${path === "/" ? "/" : `${path.replace(/\/$/, "")}/`}`;
  const image = { url: "/social-card.jpg", width: 1200, height: 630, alt: siteName };
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName, type: "website", locale: "en_US", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
