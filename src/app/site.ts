import type { Metadata } from "next";

export const siteUrl = "https://icetechdevelopment.com";
export const siteName = "ICE TECH DEVELOPMENT";

// Content values still to be supplied (prices, case-study figures) are marked as gaps
// in `next dev` and left out of production builds.
export const showPlaceholders = process.env.NODE_ENV === "development";

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
