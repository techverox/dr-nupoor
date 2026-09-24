import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";

/**
 * Next.js Dynamic Robots.txt Route
 * Generates authoritative crawling directives for Dr. Noopur Patel's website.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.url || "https://drnoopurpatel.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/dashboard/",
          "/_next/",
          "/private/",
          "/tmp/",
        ],
      },
      // Generative AI SEO (GEO) Agents — Explicitly welcomed to index Dr. Noopur Patel's clinical resources & breast oncology guides
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Google-Extended",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "CCBot",
          "Applebot",
          "Bingbot",
          "Googlebot",
        ],
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/dashboard/",
          "/private/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
