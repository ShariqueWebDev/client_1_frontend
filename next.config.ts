// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "cdn.myshop.com", "localhost"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://backend.refilly.in/api/:path*", // ✅ HTTPS + custom domain
      },
    ];
  },
};

export default nextConfig;
