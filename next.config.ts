import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    registry: ["./registry/**/*"],
  },
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/registry/:path*",
        destination: "/registry/:path*.json",
      },
    ];
  },
};

export default nextConfig;
