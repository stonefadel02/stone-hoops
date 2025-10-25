import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apiv2.allsportsapi.com',
        port: '',
        pathname: '/logo-basketball/**',
      },
    ],
  },
};

export default nextConfig;
