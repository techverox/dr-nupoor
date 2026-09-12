import { MetadataRoute } from "next";

/**
 * Next.js Dynamic Robots.txt Route
 * Generates authoritative crawling directives for standard search engines
 * and explicitly configures Generative AI SEO (GEO) bots (ChatGPT, Google Gemini, Claude, Perplexity).
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://digivigee.com";

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
      // Generative AI SEO (GEO) Agents — Explicitly welcomed to index DigiVigee knowledge base & public services
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
