import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  imageOptimization: {
    formats: ['image/webp'],
    quality: 80,
    maxSize: 16384,
    maxDimensions: { width: 2048, height: 2048 },
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, s-maxage=31536000',
          },
        ],
      },
    ];
  },
};

export default nextConfig;