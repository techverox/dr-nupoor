import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["firebase-admin"],
  allowedDevOrigins: ["192.168.1.34", "localhost:3000"],
};

export default nextConfig;
