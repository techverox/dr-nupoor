import { MetadataRoute } from "next";
import {
  getAllCmsServicesAdmin,
  getAllCmsPortfolioAdmin,
  getAllCmsBlogPostsAdmin,
} from "@/lib/services/cmsService";
import { getAllLandingPagesAdmin } from "@/lib/services/landingPageService";
import { SITE_CONFIG } from "@/config/site";
import { getAllSeoPages } from "@/data/seoKeywordMap";
import { BLOG_POSTS_DATA } from "@/data/blog";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate at most once every hour

/**
 * Next.js Dynamic XML Sitemap Route
 * Generates authoritative sitemap index for Dr. Noopur Patel's medical practice.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url || "https://drnoopurpatel.com";
  const now = new Date();

  // 1. Core High-Priority Clinical Routes
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
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/patient-guide`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/patient-stories`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/appointments`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/medical-disclaimer`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
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

  // 2. Authoritative 26-Keyword SEO Master Map Pages
  const seoMapRoutes: MetadataRoute.Sitemap = getAllSeoPages()
    .filter((page) => page.slug !== "" && page.slug !== "home")
    .map((page) => {
      let priority = 0.85;
      if (page.silo === "High-Conversion Core" || page.silo === "Surgical Oncology") {
        priority = 0.95;
      } else if (page.silo === "Pricing / Cost") {
        priority = 0.9;
      } else if (page.silo === "Hyper-Local SEO") {
        priority = 0.88;
      }

      return {
        url: `${baseUrl}/${page.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority,
      };
    });

  const dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    // 3. Fetch CMS Dynamic Content concurrently
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

    // CMS Blog Posts or fallback
    const allBlogs = blogs && blogs.length > 0 ? blogs : BLOG_POSTS_DATA;
    for (const post of allBlogs) {
      if ((post.status === "published" || !post.status) && post.slug) {
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

  // Deduplicate URLs
  const seenUrls = new Set<string>();
  const combined = [...staticRoutes, ...seoMapRoutes, ...dynamicRoutes].filter((item) => {
    if (seenUrls.has(item.url)) return false;
    seenUrls.add(item.url);
    return true;
  });

  return combined;
}

