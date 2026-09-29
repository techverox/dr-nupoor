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
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
      { protocol: "https", hostname: "**.instagram.com" },
    ],
  },
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
      {
        source: "/patient-resources",
        destination: "/patient-guide",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
