import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "cdn.myshop.com", "localhost"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "http://ec2-3-111-25-104.ap-south-1.compute.amazonaws.com:4000/api/:path*",
      },
    ];
  },
};

export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**", // allow all domains
//       },
//     ],
//   },
//   /* config options here */
// };

// export default nextConfig;
