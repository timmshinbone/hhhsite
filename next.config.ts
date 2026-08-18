import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/free-guide",
        destination: "/quiz",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
