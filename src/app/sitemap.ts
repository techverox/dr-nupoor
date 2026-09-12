import { MetadataRoute } from "next";
import {
  getAllCmsServicesAdmin,
  getAllCmsPortfolioAdmin,
  getAllCmsBlogPostsAdmin,
} from "@/lib/services/cmsService";
import { getAllLandingPagesAdmin } from "@/lib/services/landingPageService";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate at most once every hour

/**
 * Next.js Dynamic XML Sitemap Route
 * Generates authoritative sitemap index on https://digivigee.com
 * covering core pages, CMS services, portfolio case studies, blog articles, and landing pages.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://digivigee.com";
  const now = new Date();

  // 1. Core High-Priority Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    // 2. Fetch CMS Dynamic Content concurrently
    const [services, portfolio, blogs, landingPages] = await Promise.all([
      getAllCmsServicesAdmin().catch(() => []),
      getAllCmsPortfolioAdmin().catch(() => []),
      getAllCmsBlogPostsAdmin().catch(() => []),
      getAllLandingPagesAdmin().catch(() => []),
    ]);

    // CMS Services
    for (const service of services) {
      if (service.isPublished && service.slug) {
        dynamicRoutes.push({
          url: `${baseUrl}/services/${service.slug}`,
          lastModified: service.updatedAt ? new Date(service.updatedAt) : now,
          changeFrequency: "weekly",
          priority: 0.85,
        });
      }
    }

    // CMS Portfolio
    for (const item of portfolio) {
      if (item.isPublished && item.slug) {
        dynamicRoutes.push({
          url: `${baseUrl}/portfolio/${item.slug}`,
          lastModified: item.updatedAt ? new Date(item.updatedAt) : now,
          changeFrequency: "weekly",
          priority: 0.75,
        });
      }
    }

    // CMS Blog Posts
    for (const post of blogs) {
      if (post.status === "published" && post.slug) {
        dynamicRoutes.push({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: post.updatedAt ? new Date(post.updatedAt) : now,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    }

    // CMS Published Landing Pages
    for (const lp of landingPages) {
      if (lp.status === "published" && lp.slug && !lp.seo?.noIndex) {
        dynamicRoutes.push({
          url: `${baseUrl}/landing/${lp.slug}`,
          lastModified: lp.updatedAt ? new Date(lp.updatedAt) : now,
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  } catch (error) {
    console.warn("[sitemap.ts] Error resolving dynamic routes:", error);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
