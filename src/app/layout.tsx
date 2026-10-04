import type { Metadata } from "next";
import { Caveat, Sora } from "next/font/google";
import { pageMetadata, siteUrl } from "./site";
import "./globals.css";
import "./responsive.css";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...pageMetadata("/", "ICE TECH DEVELOPMENT — Web & Software Development", "We design and build high-performance websites, custom software, and digital products for ambitious businesses."),
  icons: { icon: "/icon.svg", apple: "/apple-touch-icon.png" },
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
    <html lang="en" className={`${sora.variable} ${caveat.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
