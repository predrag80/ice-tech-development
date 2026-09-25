import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "ICE TECH DEVELOPMENT — Web & Software Development",
  description:
    "We design and build high-performance websites, custom software, and digital products for ambitious businesses.",
  keywords: [
    "web development",
    "software development",
    "Next.js",
    "digital products",
    "ICE TECH DEVELOPMENT",
  ],
  openGraph: {
    title: "ICE TECH DEVELOPMENT",
    description: "Digital products. Thoughtfully engineered.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1792,
        height: 938,
        alt: "ICE TECH DEVELOPMENT — Digital products. Thoughtfully engineered.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ICE TECH DEVELOPMENT",
    description: "Digital products. Thoughtfully engineered.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
