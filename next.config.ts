import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // ✅ Autorise les images Sanity (brandLogo, backgroundImage hero, ogImage)
        // Sans cette config, next/image refuse les URLs externes en production
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;