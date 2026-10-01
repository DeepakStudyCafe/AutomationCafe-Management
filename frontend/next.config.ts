import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/admin-login',
        destination: '/admin/login',
        permanent: true,
      },
      {
        source: '/admin',
        destination: '/superadmin',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/account/login',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
