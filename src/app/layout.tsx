import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { pageMetadata, siteUrl } from "./site";
import SectionNavigation from "./SectionNavigation";
import "./globals.css";
import "./responsive.css";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...pageMetadata("/", "ICE TECH DEVELOPMENT — Web & Software Development", "We design and build high-performance websites, custom software, and digital products for ambitious businesses."),
  icons: {
    icon: [
      { url: "/favicon.ico?v=ice-tech-1", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { url: "/favicon-32x32.png?v=ice-tech-1", sizes: "32x32", type: "image/png" },
      { url: "/icon.svg?v=ice-tech-1", sizes: "any", type: "image/svg+xml" },
    ],
    apple: { url: "/apple-touch-icon.png?v=ice-tech-1", sizes: "180x180", type: "image/png" },
  },
  keywords: [
    "web development",
    "software development",
    "Next.js",
    "digital products",
    "ICE TECH DEVELOPMENT",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sora.variable}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
        <SectionNavigation />
      </body>
    </html>
  );
}
