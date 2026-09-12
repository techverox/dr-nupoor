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
};

export default nextConfig;
