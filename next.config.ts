import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  devIndicators: false,
  images: {
    loader: "custom",
    loaderFile: "./src/image-loader.ts",
    deviceSizes: [480, 768, 1200, 1600, 1920],
    imageSizes: [240, 320],
  },
};

export default nextConfig;
