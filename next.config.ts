import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all domains
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
