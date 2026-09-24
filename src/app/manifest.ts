import { MetadataRoute } from "next";

/**
 * Next.js Dynamic Web App Manifest Route
 * Configures App Store Optimization (ASO) & PWA metadata for mobile devices,
 * enabling Add to Home Screen and rich mobile search features.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dr. Noopur Patel — Breast Cancer Surgeon & Surgical Breast Oncologist",
    short_name: "Dr. Noopur",
    description:
      "Dr. Noopur Patel, Breast Cancer & Oncoplastic Surgeon at Marengo CIMS Hospital, Ahmedabad. Dedicated to compassionate, evidence-based breast care.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#D84C70",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["medical", "health", "lifestyle"],
  };
}
