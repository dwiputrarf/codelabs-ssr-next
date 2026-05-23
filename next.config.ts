import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 2678400, // 31 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  output: 'export',

  basePath: '/codelabs-ssr-next',
  assetPrefix: '/codelabs-ssr-next/',
};

export default nextConfig;