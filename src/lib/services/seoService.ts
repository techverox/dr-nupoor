import { FieldValue } from "firebase-admin/firestore";
import { getAdminFirestore } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/config/firebase";
import { SITE_CONFIG } from "@/config/site";
import { GlobalSeoSettings, PageSeoSummary, CustomPageSeo, SeoHealthReport, SeoAuditIssue } from "@/types";
import {
  getAllCmsBlogPostsAdmin,
  getAllCmsServicesAdmin,
  getAllCmsPortfolioAdmin,
  getCmsPageContent,
} from "./cmsService";
import { getAllLandingPagesAdmin } from "./landingPageService";
import { cachedFirestoreRead, invalidateFirestoreCache } from "@/lib/utils/firestoreCache";

export const DEFAULT_GLOBAL_SEO: GlobalSeoSettings = {
  id: "global_seo",
  defaultTitle: "DigiVigee — Premier Digital Marketing Agency",
  titleTemplate: "%s | DigiVigee",
  defaultDescription:
    "DigiVigee is a premier full-service digital marketing agency dedicated to compounding revenue growth through precision performance advertising, creative social storytelling, and technical SEO.",
  canonicalBaseUrl: SITE_CONFIG.url,
  defaultOgImage: "/images/og-image.jpg",
  defaultKeywords: [
    "digital marketing agency",
    "performance marketing",
    "social media agency",
    "SEO services India",
    "lead generation",
    "DigiVigee",
  ],
  robotsIndex: true,
  robotsFollow: true,
  organizationName: "DigiVigee",
  organizationLogo: "/images/digivigee_logo.png",
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
};

// In-memory cache for page-level custom SEO
const customPageSeoCache: Map<string, CustomPageSeo> = new Map();

/**
 * Normalizes and encodes a URL path into a safe Firestore document ID.
 */
export function encodeRouteDocId(path: string): string {
  const normalized = (path || "").trim().toLowerCase();
  if (normalized === "" || normalized === "/") return "page_home";
  const clean = normalized.replace(/^\//, "").replace(/\/+$/, "").replace(/[^a-z0-9]+/g, "_");
  return `page_${clean}`;
}

/**
 * Fetches the centralized global SEO settings from Firestore or fallback.
 */
export async function getGlobalSeoSettings(): Promise<GlobalSeoSettings> {
  return cachedFirestoreRead<GlobalSeoSettings>(
    "global_seo",
    60 * 1000,
    async () => {
      const adminDb = getAdminFirestore();
      if (adminDb) {
        const doc = await adminDb.collection(COLLECTIONS.SEO_SETTINGS).doc("global_seo").get();
        if (doc.exists) {
          const data = doc.data()!;
          return {
            id: "global_seo",
            ...data,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
            updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
          } as GlobalSeoSettings;
        }
      }
      return { ...DEFAULT_GLOBAL_SEO };
    },
    () => ({ ...DEFAULT_GLOBAL_SEO })
  );
}

/**
 * Saves or updates the global SEO configuration in Firestore.
 */
export async function saveGlobalSeoSettings(
  data: Partial<GlobalSeoSettings>
): Promise<{ success: boolean; error?: string }> {
  const adminDb = getAdminFirestore();
  if (!adminDb) {
    return { success: true };
  }

  try {
    const timestamp = FieldValue.serverTimestamp();
    const cleanData: Record<string, unknown> = {
      ...data,
      updatedAt: timestamp,
    };

    await adminDb.collection(COLLECTIONS.SEO_SETTINGS).doc("global_seo").set(cleanData, { merge: true });
    invalidateFirestoreCache("global_seo");
    return { success: true };
  } catch (error) {
    console.error("[saveGlobalSeoSettings] Error:", error);
    return { success: false, error: "Failed to save global SEO settings." };
  }
}

/**
 * Resets global SEO configuration to canonical DigiVigee defaults.
 */
export async function resetSeoSettingsAdmin(): Promise<{
  success: boolean;
  settings?: GlobalSeoSettings;
  error?: string;
}> {
  const adminDb = getAdminFirestore();
  const canonicalDefaults: GlobalSeoSettings = {
    ...DEFAULT_GLOBAL_SEO,
    canonicalBaseUrl: "https://digivigee.com",
    updatedAt: new Date().toISOString(),
  };

  invalidateFirestoreCache("global_seo");

  if (!adminDb) {
    return { success: true, settings: canonicalDefaults };
  }

  try {
    const timestamp = FieldValue.serverTimestamp();
    await adminDb.collection(COLLECTIONS.SEO_SETTINGS).doc("global_seo").set({
      ...canonicalDefaults,
      updatedAt: timestamp,
    });
    invalidateFirestoreCache("global_seo");
    return { success: true, settings: canonicalDefaults };
  } catch (error) {
    console.error("[resetSeoSettingsAdmin] Error resetting SEO settings:", error);
    return { success: false, error: "Failed to reset SEO settings to defaults." };
  }
}

/**
 * Retrieves custom page-level SEO overrides for a specific route path.
 */
export async function getCustomPageSeo(routePath: string): Promise<CustomPageSeo | null> {
  const docId = encodeRouteDocId(routePath);

  if (customPageSeoCache.has(docId)) {
    return customPageSeoCache.get(docId)!;
  }

  return cachedFirestoreRead<CustomPageSeo | null>(
    `custom_seo_${docId}`,
    60 * 1000,
    async () => {
      const adminDb = getAdminFirestore();
      if (adminDb) {
        const doc = await adminDb.collection(COLLECTIONS.SEO_SETTINGS).doc(docId).get();
        if (doc.exists) {
          const data = doc.data() as Omit<CustomPageSeo, "id" | "routePath">;
          const result: CustomPageSeo = {
            id: docId,
            routePath,
            ...data,
          };
          customPageSeoCache.set(docId, result);
          return result;
        }
      }
      return null;
    },
    () => null
  );
}

/**
 * Retrieves all saved custom page-level SEO overrides.
 */
export async function getAllCustomPageSeo(): Promise<CustomPageSeo[]> {
  const adminDb = getAdminFirestore();
  const list: CustomPageSeo[] = [];

  if (adminDb) {
    try {
      const snap = await adminDb.collection(COLLECTIONS.SEO_SETTINGS).get();
      snap.docs.forEach((doc) => {
        if (doc.id.startsWith("page_")) {
          const data = doc.data() as Omit<CustomPageSeo, "id">;
          const item: CustomPageSeo = { ...data, id: doc.id };
          list.push(item);
          customPageSeoCache.set(doc.id, item);
        }
      });
    } catch (err) {
      console.warn("[getAllCustomPageSeo] Error fetching:", err);
    }
  }

  return list;
}

/**
 * Saves custom page-level SEO configuration for a specific route path.
 */
export async function saveCustomPageSeo(
  routePath: string,
  data: Partial<CustomPageSeo>
): Promise<{ success: boolean; error?: string }> {
  const docId = encodeRouteDocId(routePath);
  const adminDb = getAdminFirestore();

  const payload: CustomPageSeo = {
    id: docId,
    routePath,
    ...data,
    updatedAt: new Date().toISOString(),
  };

  customPageSeoCache.set(docId, payload);
  invalidateFirestoreCache(`custom_seo_${docId}`);

  if (adminDb) {
    try {
      await adminDb.collection(COLLECTIONS.SEO_SETTINGS).doc(docId).set(payload, { merge: true });
      return { success: true };
    } catch (err) {
      console.error(`[saveCustomPageSeo] Error saving ${docId}:`, err);
      return { success: false, error: "Failed to save page SEO settings to database." };
    }
  }

  return { success: true };
}

/**
 * Compiles a comprehensive page-level SEO directory for inspection in the Admin SEO Studio.
 * Merges core pages, CMS services, CMS portfolio, blogs, and landing pages with custom overrides.
 */
export async function getPageSeoDirectory(): Promise<PageSeoSummary[]> {
  const directory: PageSeoSummary[] = [];

  try {
    const [globalSeo, customSeos, homeContent, aboutContent, contactContent, services, portfolio, blogs, landingPages] =
      await Promise.all([
        getGlobalSeoSettings(),
        getAllCustomPageSeo(),
        getCmsPageContent("home"),
        getCmsPageContent("about"),
        getCmsPageContent("contact"),
        getAllCmsServicesAdmin(),
        getAllCmsPortfolioAdmin(),
        getAllCmsBlogPostsAdmin(),
        getAllLandingPagesAdmin(),
      ]);

    const customMap = new Map<string, CustomPageSeo>();
    customSeos.forEach((c) => {
      customMap.set(c.routePath, c);
    });

    const mergePageSeo = (
      id: string,
      pageName: string,
      routePath: string,
      defaultTitle: string,
      defaultDescription: string,
      defaultOgImage: string | undefined,
      defaultIndexable: boolean,
      status: "published" | "draft"
    ): PageSeoSummary => {
      const custom = customMap.get(routePath);
      const seoTitle = custom?.title || defaultTitle;
      const metaDescription = custom?.description || defaultDescription;
      const ogImageUrl = custom?.ogImage || defaultOgImage || globalSeo.defaultOgImage;
      const isIndexable = custom?.robotsIndex !== undefined ? custom.robotsIndex : defaultIndexable && globalSeo.robotsIndex;
      const robotsFollow = custom?.robotsFollow !== undefined ? custom.robotsFollow : globalSeo.robotsFollow;
      const isCustomized = Boolean(custom && (custom.title || custom.description || custom.ogImage || custom.canonicalUrl));

      return {
        id,
        pageName,
        routePath,
        seoTitle,
        metaDescription,
        canonicalUrl: custom?.canonicalUrl,
        hasOgImage: Boolean(ogImageUrl),
        ogImageUrl,
        isIndexable,
        robotsFollow,
        isCustomized,
        keywords: custom?.keywords || globalSeo.defaultKeywords,
        status,
      };
    };

    // 1. Core Static Pages
    directory.push(
      mergePageSeo(
        "page-home",
        "Home Page",
        "/",
        globalSeo.defaultTitle,
        homeContent.heroSubheadline || globalSeo.defaultDescription,
        globalSeo.defaultOgImage,
        true,
        "published"
      )
    );

    directory.push(
      mergePageSeo(
        "page-about",
        "About DigiVigee",
        "/about",
        "About Us — Results-Driven Marketing | DigiVigee",
        aboutContent.heroSubheadline || "Learn about DigiVigee's philosophy and data-driven marketing team.",
        globalSeo.defaultOgImage,
        true,
        "published"
      )
    );

    directory.push(
      mergePageSeo(
        "page-services",
        "Services Directory",
        "/services",
        "Digital Marketing Services — Performance, SEO & Creative | DigiVigee",
        "Comprehensive suite of digital marketing solutions tailored for high-growth businesses.",
        globalSeo.defaultOgImage,
        true,
        "published"
      )
    );

    directory.push(
      mergePageSeo(
        "page-portfolio",
        "Case Studies & Portfolio",
        "/portfolio",
        "Proven Results & Case Studies — Performance Marketing ROI | DigiVigee",
        "Real campaign case studies, ROI metrics, and proven scale delivered for ambitious brands.",
        globalSeo.defaultOgImage,
        true,
        "published"
      )
    );

    directory.push(
      mergePageSeo(
        "page-blog",
        "Blog & Marketing Insights",
        "/blog",
        "Blog & Marketing Insights — Growth Playbooks & Strategy | DigiVigee",
        "Explore actionable digital marketing playbooks, SEO strategies, paid media optimization, and social growth tactics.",
        globalSeo.defaultOgImage,
        true,
        "published"
      )
    );

    directory.push(
      mergePageSeo(
        "page-contact",
        "Contact & Discovery",
        "/contact",
        "Contact Our Growth Strategists | DigiVigee",
        contactContent.heroSubheadline || "Schedule your custom growth roadmap and competitive digital audit with our specialists.",
        globalSeo.defaultOgImage,
        true,
        "published"
      )
    );

    directory.push(
      mergePageSeo(
        "page-privacy",
        "Privacy Policy",
        "/privacy-policy",
        "Privacy Policy | DigiVigee",
        "Read our commitment to transparency, client confidentiality, and data privacy safeguards.",
        globalSeo.defaultOgImage,
        true,
        "published"
      )
    );

    directory.push(
      mergePageSeo(
        "page-terms",
        "Terms and Conditions",
        "/terms-and-conditions",
        "Terms & Conditions | DigiVigee",
        "Official terms and conditions governing DigiVigee's services and digital platform usage.",
        globalSeo.defaultOgImage,
        true,
        "published"
      )
    );

    // 2. Individual Services
    for (const s of services) {
      directory.push(
        mergePageSeo(
          `service-${s.id}`,
          `Service: ${s.title}`,
          `/services/${s.slug}`,
          s.seo?.title || `${s.title} — Digital Marketing Services`,
          s.seo?.description || s.shortDescription,
          s.seo?.ogImage || globalSeo.defaultOgImage,
          s.isPublished,
          s.isPublished ? "published" : "draft"
        )
      );
    }

    // 3. Individual Portfolio Case Studies
    for (const p of portfolio) {
      directory.push(
        mergePageSeo(
          `portfolio-${p.id}`,
          `Case Study: ${p.title}`,
          `/portfolio/${p.slug}`,
          p.seo?.title || `${p.title} Case Study | DigiVigee`,
          p.seo?.description || p.shortDescription,
          p.heroImage || globalSeo.defaultOgImage,
          p.isPublished,
          p.isPublished ? "published" : "draft"
        )
      );
    }

    // 4. Individual Blog Posts
    for (const b of blogs) {
      directory.push(
        mergePageSeo(
          `blog-${b.id}`,
          `Blog: ${b.title}`,
          `/blog/${b.slug}`,
          b.seo?.title || b.title,
          b.seo?.description || b.excerpt,
          b.seo?.ogImage || b.featuredImage,
          b.status === "published",
          b.status === "published" ? "published" : "draft"
        )
      );
    }

    // 5. Landing Pages
    for (const lp of landingPages) {
      directory.push(
        mergePageSeo(
          `landing-${lp.id}`,
          `Landing: ${lp.title}`,
          `/landing/${lp.slug}`,
          lp.seo?.seoTitle || `${lp.title} | DigiVigee`,
          lp.seo?.metaDescription || lp.title,
          lp.seo?.ogImage || globalSeo.defaultOgImage,
          lp.status === "published" && !lp.seo?.noIndex,
          lp.status === "published" ? "published" : "draft"
        )
      );
    }
  } catch (error) {
    console.warn("[getPageSeoDirectory] Compilation error:", error);
  }

  return directory;
}

/**
 * Conducts an automated SEO health audit across all pages and CMS content.
 */
export async function getSeoHealthAudit(): Promise<SeoHealthReport> {
  const directory = await getPageSeoDirectory();
  const issues: SeoAuditIssue[] = [];

  let goodPoints = 0;
  let totalPointsPossible = 0;

  for (const page of directory) {
    // 1. Check Title
    totalPointsPossible += 2;
    if (!page.seoTitle || !page.seoTitle.trim()) {
      issues.push({
        id: `${page.id}-missing-title`,
        pageId: page.id,
        pageName: page.pageName,
        routePath: page.routePath,
        severity: "critical",
        category: "title",
        message: "Missing SEO Title tag.",
        recommendation: "Define a descriptive 40–60 character page title including targeted primary keywords.",
      });
    } else if (page.seoTitle.length > 65) {
      issues.push({
        id: `${page.id}-long-title`,
        pageId: page.id,
        pageName: page.pageName,
        routePath: page.routePath,
        severity: "warning",
        category: "title",
        message: `SEO Title is ${page.seoTitle.length} characters (exceeds Google's 65-character desktop threshold).`,
        recommendation: "Shorten title to 40–60 characters to prevent search result truncation.",
      });
      goodPoints += 1;
    } else if (page.seoTitle.length < 30) {
      issues.push({
        id: `${page.id}-short-title`,
        pageId: page.id,
        pageName: page.pageName,
        routePath: page.routePath,
        severity: "warning",
        category: "title",
        message: `SEO Title is short (${page.seoTitle.length} characters).`,
        recommendation: "Expand title with brand modifier or secondary intent keyword.",
      });
      goodPoints += 1;
    } else {
      goodPoints += 2;
    }

    // 2. Check Meta Description
    totalPointsPossible += 2;
    if (!page.metaDescription || !page.metaDescription.trim()) {
      issues.push({
        id: `${page.id}-missing-desc`,
        pageId: page.id,
        pageName: page.pageName,
        routePath: page.routePath,
        severity: "critical",
        category: "description",
        message: "Missing Meta Description tag.",
        recommendation: "Write an engaging commercial summary between 120–160 characters with a clear call-to-action.",
      });
    } else if (page.metaDescription.length > 165) {
      issues.push({
        id: `${page.id}-long-desc`,
        pageId: page.id,
        pageName: page.pageName,
        routePath: page.routePath,
        severity: "warning",
        category: "description",
        message: `Meta Description is ${page.metaDescription.length} characters (may truncate in mobile SERPs).`,
        recommendation: "Trim to 120–160 characters for complete display across desktop and mobile devices.",
      });
      goodPoints += 1;
    } else if (page.metaDescription.length < 70) {
      issues.push({
        id: `${page.id}-short-desc`,
        pageId: page.id,
        pageName: page.pageName,
        routePath: page.routePath,
        severity: "warning",
        category: "description",
        message: `Meta Description is only ${page.metaDescription.length} characters.`,
        recommendation: "Expand description with compelling value proposition details.",
      });
      goodPoints += 1;
    } else {
      goodPoints += 2;
    }

    // 3. Check Open Graph Visual Card
    totalPointsPossible += 1;
    if (!page.hasOgImage) {
      issues.push({
        id: `${page.id}-missing-og`,
        pageId: page.id,
        pageName: page.pageName,
        routePath: page.routePath,
        severity: "warning",
        category: "social",
        message: "No custom Open Graph social share image assigned (inherits site default).",
        recommendation: "Upload a page-specific 1200×630px visual card to boost social click-through rates.",
      });
    } else {
      goodPoints += 1;
    }

    // 4. Indexing & Status
    totalPointsPossible += 1;
    if (page.status === "draft" && page.isIndexable) {
      issues.push({
        id: `${page.id}-draft-indexable`,
        pageId: page.id,
        pageName: page.pageName,
        routePath: page.routePath,
        severity: "critical",
        category: "indexing",
        message: "Draft page is marked as indexable.",
        recommendation: "Ensure drafts remain noindexed until reviewed and published.",
      });
    } else {
      goodPoints += 1;
    }
  }

  const criticalCount = issues.filter((i) => i.severity === "critical").length;
  const warningCount = issues.filter((i) => i.severity === "warning").length;
  const goodCount = directory.length * 3 - (criticalCount * 2 + warningCount);

  const overallScore = totalPointsPossible > 0
    ? Math.max(0, Math.min(100, Math.round((goodPoints / totalPointsPossible) * 100)))
    : 100;

  return {
    overallScore,
    totalPagesChecked: directory.length,
    goodCount: Math.max(0, goodCount),
    warningCount,
    criticalCount,
    issues,
  };
}
