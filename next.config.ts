import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "firebase-admin",
    "firebase-admin/app",
    "firebase-admin/auth",
    "firebase-admin/firestore",
    "firebase-admin/storage",
  ],
  allowedDevOrigins: ["192.168.1.34", "localhost:3000"],
  async redirects() {
    return [
      {
        source: "/old-landing",
        destination: "/",
        permanent: true,
      },
      {
        source: "/platform/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/products/:path*",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/meta-partner",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/solutions/:path*",
        destination: "/services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
