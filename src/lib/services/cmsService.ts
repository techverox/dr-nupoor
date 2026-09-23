import { getAdminFirestore, FieldValue } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/config/firebase";
import { SITE_CONFIG } from "@/config/site";
import {
  ServiceItem,
  PortfolioItem,
  TestimonialItem,
  FAQItem,
  TeamMember,
  SiteSettings,
  HomePageContent,
  AboutPageContent,
  ContactPageContent,
  BlogPost,
  BlogStatus,
} from "@/types";
import { SERVICES_DATA } from "@/data/services";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { TESTIMONIALS_DATA } from "@/data/testimonials";
import { FAQS_DATA } from "@/data/faqs";
import { TEAM_MEMBERS_DATA } from "@/data/team";
import { BLOG_POSTS_DATA } from "@/data/blog";
import { revalidatePath } from "next/cache";
import { calculateReadingTime } from "@/lib/utils/blogUtils";
import { cachedFirestoreRead, invalidateFirestoreCache } from "@/lib/utils/firestoreCache";

export function revalidateWebsitePages() {
  invalidateFirestoreCache();
  try {
    revalidatePath("/", "page");
    revalidatePath("/", "layout");
    revalidatePath("/about", "page");
    revalidatePath("/contact", "page");
    revalidatePath("/services", "page");
    revalidatePath("/portfolio", "page");
  } catch {
    // Gracefully ignore outside Next.js request context
  }
}

// Global persistent dev/runtime store for real-time mutations
const globalForCms = globalThis as unknown as {
  __DIGIVIGEE_CMS_STORE__?: Map<string, Map<string, Record<string, unknown>>>;
};

const devStore =
  globalForCms.__DIGIVIGEE_CMS_STORE__ ||
  new Map<string, Map<string, Record<string, unknown>>>();

if (!globalForCms.__DIGIVIGEE_CMS_STORE__) {
  globalForCms.__DIGIVIGEE_CMS_STORE__ = devStore;
}

export function getCollectionStore(collectionName: string): Map<string, Record<string, unknown>> {
  if (!devStore.has(collectionName)) {
    devStore.set(collectionName, new Map<string, Record<string, unknown>>());
  }
  return devStore.get(collectionName)!;
}

/**
 * Recursively converts Firestore Timestamp instances, nested timestamps, and Dates into ISO strings
 * so plain objects can be passed across Server Component -> Client Component boundaries in Next.js.
 */
export function serializeFirestoreData<T>(data: unknown): T {
  if (data === null || data === undefined) return data as T;

  if (typeof data === "object") {
    // Firestore Timestamp check
    if (typeof (data as { toDate?: () => Date }).toDate === "function") {
      return (data as { toDate: () => Date }).toDate().toISOString() as unknown as T;
    }
    if ("_seconds" in (data as Record<string, unknown>)) {
      const ts = data as { _seconds: number; _nanoseconds?: number };
      return new Date(ts._seconds * 1000).toISOString() as unknown as T;
    }
    if ("seconds" in (data as Record<string, unknown>)) {
      const ts = data as { seconds: number; nanoseconds?: number };
      return new Date(ts.seconds * 1000).toISOString() as unknown as T;
    }
    if (Array.isArray(data)) {
      return data.map(serializeFirestoreData) as unknown as T;
    }
    if (data instanceof Date) {
      return data.toISOString() as unknown as T;
    }
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
      result[key] = serializeFirestoreData(value);
    }
    return result as T;
  }

  return data as T;
}

export function sanitizeFirestoreDoc<T>(docId: string, data: Record<string, unknown>): T {
  const sanitized = serializeFirestoreData<Record<string, unknown>>(data);
  return { id: docId, ...sanitized } as T;
}



// ==========================================
// DEFAULT SEED FALLBACKS
// ==========================================

export const DEFAULT_HOME_PAGE_CONTENT: HomePageContent = {
  id: "home",
  heroBadge: "DIGITAL AGENCY & AI PLATFORM",
  heroHeadline: "High-Performance Marketing.",
  heroHeadlineHighlight: "Powered by AI.",
  heroSubheadline:
    "We engineer predictable revenue, high-ticket leads, and omnichannel growth for scaling brands—backed by 24/7 transparent client portals and autonomous AI campaign telemetry.",
  primaryCtaText: "Claim Free Growth Audit",
  primaryCtaLink: "/contact",
  secondaryCtaText: "Explore AI Platform",
  secondaryCtaLink: "#platform",
  stat1Value: "4.8x",
  stat1Label: "Avg Blended ROAS",
  stat2Value: "$84.2M+",
  stat2Label: "Verified Ad Spend Managed",
  stat3Value: "65+ Hrs",
  stat3Label: "Monthly Reporting Saved",
  stat4Value: "0%",
  stat4Label: "Ad Spend Overrun Tolerance",
  whyUsTitle: "Scale 10x retainers. Burn out 0 teams.",
  whyUsSubtitle:
    "Eliminate operational chaos with purpose-built agency workflows, automated pacing alerts, and white-label client reporting portals.",
  ctaSectionHeadline: "Ready to Run Your Entire Agency From One Platform?",
  ctaSectionSubtitle:
    "Join 420+ high-growth performance, social, and search agencies scaling retainers with 100% operational transparency.",
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
};

export const DEFAULT_ABOUT_PAGE_CONTENT: AboutPageContent = {
  id: "about",
  heroBadge: "ESTABLISHED 2016",
  heroHeadline: "Your Digital Partner for",
  heroHeadlineHighlight: "Technology, Tools & Business Growth.",
  heroSubheadline:
    "Digivigee is a digital technology and business solutions company helping businesses build, automate, market and grow with the right digital tools, technology and expertise.",
  storyTitle: "Built from Ground Realities Since 2016",
  storyParagraph1:
    "Founded in 2016 by Vipul Gajjar, DigiVigee has evolved from a digital marketing agency into a technology-driven solutions company. We saw businesses struggling with disconnected software, confusing marketing dashboards, and inconsistent operations.",
  storyParagraph2:
    "Today, we build and run proprietary digital products like RestroMitra (Restaurant SaaS) and Maru Gujarat (Local Discovery Directory), while acting as an Official Meta Partner delivering high-ticket performance marketing.",
  missionTitle: "Our Mission",
  missionDescription:
    "To empower businesses with practical digital tools, automated operations, and performance-driven marketing that produce real, measurable commercial results.",
  visionTitle: "Our Vision",
  visionDescription:
    "To become India's most trusted digital technology and business ecosystem, bridging grassroots businesses to modern digital scale.",
  stat1Value: "10+",
  stat1Label: "Years Innovation",
  stat2Value: "420+",
  stat2Label: "Active Client Retainers",
  stat3Value: "100%",
  stat3Label: "Operational Transparency",
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
};

export const DEFAULT_CONTACT_PAGE_CONTENT: ContactPageContent = {
  id: "contact",
  heroBadge: "DIRECT ACCESS",
  heroHeadline: "Let's Build Something Exceptional",
  heroHeadlineHighlight: "Together.",
  heroSubheadline:
    "Direct access to senior growth architects and software engineers. No junior middlemen, zero sales fluff, 100% transparent execution.",
  formTitle: "Schedule Priority Strategy Session",
  formSubtitle:
    "Direct calendar routing to our senior engineering and media buying pods. Responses within 4 business hours.",
  infoTitle: "Direct Channel Access",
  phone: SITE_CONFIG.contact.phoneFormatted,
  email: SITE_CONFIG.contact.email,
  whatsapp: SITE_CONFIG.contact.whatsappDisplay,
  address: "Orchid Complex, Office No. B, Door No. D-23, Approach Road / Pirojpura Road, Chhapi, Gujarat, 385210, India",
  workingHours: "24/7 Strategy Desk • Priority Response within 4 Hours",
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  id: "global",
  siteName: SITE_CONFIG.name,
  tagline: SITE_CONFIG.tagline,
  logoUrl: "/images/digivigee_logo.png",
  faviconUrl: "/favicon.ico",
  contact: {
    phone: SITE_CONFIG.contact.phoneFormatted,
    whatsapp: SITE_CONFIG.contact.whatsappDisplay,
    email: SITE_CONFIG.contact.email,
    address: SITE_CONFIG.contact.address,
    businessHours: SITE_CONFIG.contact.workingHours,
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Chhapi%20Gujarat%20385210&t=&z=13&ie=UTF8&iwloc=&output=embed",
  },
  socials: {
    facebook: SITE_CONFIG.socials.facebook,
    instagram: SITE_CONFIG.socials.instagram,
    linkedin: SITE_CONFIG.socials.linkedin,
    twitter: SITE_CONFIG.socials.twitter,
    youtube: SITE_CONFIG.socials.youtube,
    github: "https://github.com/digivigee",
  },
  defaultSEO: {
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    slug: "",
    canonicalUrl: SITE_CONFIG.url,
  },
  headerContent: {
    announcementBarText: "🚀 Special Offer: Scale with DigiVigee Platform — Claim Your Growth Audit Today →",
    showAnnouncementBar: true,
    announcementLink: "/offers",
  },
  footerContent: {
    aboutText:
      "DigiVigee is an enterprise-grade Agency Operating System and performance digital marketing platform dedicated to powering compounding revenue growth, automated workflows, and high-retention client experiences.",
    copyrightText: `© ${new Date().getFullYear()} DigiVigee Platform. All rights reserved.`,
    badgeText: "Enterprise-Grade Agency Operating System",
  },
  customScripts: {
    isEnabled: true,
    headerCode: "",
    bodyCode: "",
    footerCode: "",
  },
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
};

// ==========================================
// 1. SERVICES CMS FETCHER
// ==========================================

export function normalizeServiceSlug(slug: string): string {
  const s = (slug || "").trim().toLowerCase();
  if (
    s === "search-engine-optimization-seo" ||
    s === "search-engine-optimization" ||
    s === "seo-optimization"
  ) {
    return "seo-and-local-seo";
  }
  if (
    s === "web-design-development" ||
    s === "website-design-development" ||
    s === "web-design-and-development"
  ) {
    return "website-design-and-development";
  }
  if (
    s === "brand-strategy-and-identity" ||
    s === "brand-strategy-identity" ||
    s === "brand-identity"
  ) {
    return "brand-strategy";
  }
  return s;
}

export function getLocalServicesFallback(): ServiceItem[] {
  const localItems = Array.from(getCollectionStore(COLLECTIONS.SERVICES).values()) as unknown as ServiceItem[];
  if (localItems.length > 0) {
    const baseMap = new Map<string, ServiceItem>(SERVICES_DATA.map((s) => [s.id, s]));
    localItems.forEach((item) => {
      const prev = baseMap.get(item.id);
      baseMap.set(item.id, {
        ...prev,
        ...item,
        title: (item.title || "").trim() || prev?.title || "",
        slug: normalizeServiceSlug(item.slug || prev?.slug || ""),
        shortDescription: (item.shortDescription || "").trim() || prev?.shortDescription || "",
        detailedDescription: (item.detailedDescription || "").trim() || prev?.detailedDescription || "",
        deliverables:
          Array.isArray(item.deliverables) && item.deliverables.length > 0
            ? item.deliverables
            : prev?.deliverables || [],
      } as ServiceItem);
    });
    return Array.from(baseMap.values()).sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  return [...SERVICES_DATA].sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getAllCmsServicesAdmin(): Promise<ServiceItem[]> {
  return cachedFirestoreRead<ServiceItem[]>(
    "cms_services",
    60 * 1000,
    async () => {
      const adminDb = getAdminFirestore();
      if (adminDb) {
        const snap = await adminDb.collection(COLLECTIONS.SERVICES).orderBy("order", "asc").get();
        if (!snap.empty) {
          return snap.docs.map((doc) => sanitizeFirestoreDoc<ServiceItem>(doc.id, doc.data()));
        }
      }
      return getLocalServicesFallback();
    },
    () => getLocalServicesFallback()
  );
}

export async function getCmsServices(): Promise<ServiceItem[]> {
  const all = await getAllCmsServicesAdmin();

  // Create base map of canonical templates
  const mergedMap = new Map<string, ServiceItem>();
  SERVICES_DATA.forEach((s) => {
    const norm = normalizeServiceSlug(s.slug);
    mergedMap.set(norm, { ...s, slug: norm });
  });

  const unpublishedKeys = new Set<string>();

  for (const item of all) {
    const norm = normalizeServiceSlug(item.slug || "");
    if (item.isPublished === false) {
      unpublishedKeys.add(norm);
      if (item.id) unpublishedKeys.add(item.id);
      mergedMap.delete(norm);
      continue;
    }

    if (mergedMap.has(norm)) {
      const base = mergedMap.get(norm)!;
      mergedMap.set(norm, {
        ...base,
        ...item,
        slug: norm,
        title: (item.title || "").trim() || base.title,
        subtitle: item.subtitle || base.subtitle,
        shortDescription: (item.shortDescription || "").trim() || base.shortDescription,
        detailedDescription: (item.detailedDescription || "").trim() || base.detailedDescription,
        problemStatement: item.problemStatement || base.problemStatement,
        solutionStatement: item.solutionStatement || base.solutionStatement,
        outcomeStatement: item.outcomeStatement || base.outcomeStatement,
        order: typeof item.order === "number" ? item.order : base.order,
        capabilities:
          Array.isArray(item.capabilities) && item.capabilities.length > 0
            ? item.capabilities
            : base.capabilities,
        benefits:
          Array.isArray(item.benefits) && item.benefits.length > 0
            ? item.benefits
            : base.benefits,
        deliverables:
          Array.isArray(item.deliverables) && item.deliverables.length > 0
            ? item.deliverables
            : base.deliverables,
        packages:
          Array.isArray(item.packages) && item.packages.length > 0
            ? item.packages
            : base.packages,
        faqs:
          Array.isArray(item.faqs) && item.faqs.length > 0
            ? item.faqs
            : base.faqs,
        isPublished: true,
      });
    } else if (norm) {
      mergedMap.set(norm, {
        ...item,
        slug: norm,
        order: typeof item.order === "number" ? item.order : 99,
        isPublished: true,
      });
    }
  }

  const result: ServiceItem[] = [];
  for (const [slug, svc] of mergedMap.entries()) {
    if (!unpublishedKeys.has(slug) && !unpublishedKeys.has(svc.id) && svc.isPublished !== false) {
      result.push(svc);
    }
  }

  return result.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getCmsServiceBySlug(slug: string): Promise<ServiceItem | null> {
  const normalized = normalizeServiceSlug(slug);
  const all = await getCmsServices();
  const found = all.find((s) => normalizeServiceSlug(s.slug) === normalized);
  if (found) return found;

  const adminAll = await getAllCmsServicesAdmin();
  const adminFound = adminAll.find((s) => normalizeServiceSlug(s.slug) === normalized && s.isPublished !== false);
  if (adminFound) return adminFound;

  const fallback = SERVICES_DATA.find((s) => normalizeServiceSlug(s.slug) === normalized);
  return fallback || null;
}

export async function resetCmsServicesToDefaults(): Promise<{ success: boolean; count: number }> {
  const colStore = getCollectionStore(COLLECTIONS.SERVICES);
  colStore.clear();

  SERVICES_DATA.forEach((s) => {
    colStore.set(s.id, { ...s });
  });

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      const snap = await adminDb.collection(COLLECTIONS.SERVICES).get();
      const batch = adminDb.batch();
      snap.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      SERVICES_DATA.forEach((s) => {
        const ref = adminDb.collection(COLLECTIONS.SERVICES).doc(s.id);
        batch.set(ref, {
          ...s,
          updatedAt: FieldValue.serverTimestamp(),
          createdAt: FieldValue.serverTimestamp(),
        });
      });
      await batch.commit();
    } catch (e) {
      console.error("[resetCmsServicesToDefaults] Firestore Error:", e);
    }
  }

  revalidateWebsitePages();
  return { success: true, count: SERVICES_DATA.length };
}


// ==========================================
// 2. PORTFOLIO CMS FETCHER
// ==========================================

export function getLocalPortfolioFallback(): PortfolioItem[] {
  const localItems = Array.from(getCollectionStore(COLLECTIONS.PORTFOLIO).values()) as unknown as PortfolioItem[];
  if (localItems.length > 0) {
    const baseMap = new Map<string, PortfolioItem>(PORTFOLIO_DATA.map((p) => [p.id, p]));
    localItems.forEach((item) => {
      const prev = baseMap.get(item.id);
      baseMap.set(item.id, {
        ...prev,
        ...item,
        title: (item.title || "").trim() || prev?.title || "",
        clientName: (item.clientName || "").trim() || prev?.clientName || "",
        shortDescription: (item.shortDescription || "").trim() || prev?.shortDescription || "",
        metrics:
          Array.isArray(item.metrics) && item.metrics.length > 0
            ? item.metrics
            : prev?.metrics || [],
      } as PortfolioItem);
    });
    return Array.from(baseMap.values()).sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  return [...PORTFOLIO_DATA].sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getAllCmsPortfolioAdmin(): Promise<PortfolioItem[]> {
  return cachedFirestoreRead<PortfolioItem[]>(
    "cms_portfolio",
    60 * 1000,
    async () => {
      const adminDb = getAdminFirestore();
      if (adminDb) {
        const snap = await adminDb.collection(COLLECTIONS.PORTFOLIO).orderBy("order", "asc").get();
        if (!snap.empty) {
          return snap.docs.map((doc) => {
            const item = sanitizeFirestoreDoc<PortfolioItem>(doc.id, doc.data());
            const fallback = PORTFOLIO_DATA.find((p) => p.slug === item.slug || p.id === item.id);
            return {
              ...fallback,
              ...item,
              title: (item.title || "").trim() || fallback?.title || "",
              clientName: (item.clientName || "").trim() || fallback?.clientName || "",
              metrics:
                Array.isArray(item.metrics) && item.metrics.length > 0
                  ? item.metrics
                  : fallback?.metrics || [],
              shortDescription:
                item.shortDescription ||
                (item as unknown as { summary?: string }).summary ||
                fallback?.shortDescription ||
                "",
            };
          });
        }
      }
      return getLocalPortfolioFallback();
    },
    () => getLocalPortfolioFallback()
  );
}

export async function getCmsPortfolio(): Promise<PortfolioItem[]> {
  const all = await getAllCmsPortfolioAdmin();

  const portfolioMap = new Map<string, PortfolioItem>();

  // 1. Initialize with canonical agency customer stories
  PORTFOLIO_DATA.forEach((p) => {
    portfolioMap.set(p.slug, { ...p });
  });

  const unpublishedKeys = new Set<string>();

  // 2. Merge published updates
  for (const item of all) {
    const slug = (item.slug || "").trim().toLowerCase();
    if (item.isPublished === false) {
      unpublishedKeys.add(slug);
      if (item.id) unpublishedKeys.add(item.id);
      portfolioMap.delete(slug);
      continue;
    }

    if (portfolioMap.has(slug)) {
      const base = portfolioMap.get(slug)!;
      portfolioMap.set(slug, {
        ...base,
        ...item,
        id: base.id,
        slug,
        title: (item.title || "").trim() || base.title,
        clientName: (item.clientName || "").trim() || base.clientName,
        industry: item.industry?.trim() || base.industry,
        category: item.category?.trim() || base.category,
        categoryKey: item.categoryKey || base.categoryKey,
        shortDescription: (item.shortDescription || "").trim() || base.shortDescription,
        heroImage: item.heroImage?.trim() ? item.heroImage.trim() : base.heroImage,
        authorAvatar: item.authorAvatar?.trim() ? item.authorAvatar.trim() : base.authorAvatar,
        authorName: item.authorName || base.authorName,
        authorRole: item.authorRole || base.authorRole,
        challenge: item.challenge?.trim() || base.challenge,
        strategy: item.strategy?.trim() || base.strategy,
        execution: item.execution?.trim() || base.execution,
        results: item.results?.trim() || base.results,
        order: typeof item.order === "number" ? item.order : base.order,
        metrics: Array.isArray(item.metrics) && item.metrics.length > 0 ? item.metrics : base.metrics,
        beforePoints: item.beforePoints?.length ? item.beforePoints : base.beforePoints,
        afterPoints: item.afterPoints?.length ? item.afterPoints : base.afterPoints,
        executionMilestones: item.executionMilestones?.length ? item.executionMilestones : base.executionMilestones,
        testimonialQuote: item.testimonialQuote || base.testimonialQuote,
        keyTakeaway: item.keyTakeaway || base.keyTakeaway,
        isPublished: true,
      });
    } else if (slug) {
      portfolioMap.set(slug, {
        ...item,
        slug,
        order: typeof item.order === "number" ? item.order : 99,
        isPublished: true,
      });
    }
  }

  const result: PortfolioItem[] = [];
  for (const [slug, item] of portfolioMap.entries()) {
    if (!unpublishedKeys.has(slug) && !unpublishedKeys.has(item.id) && item.isPublished !== false) {
      result.push(item);
    }
  }

  return result.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getCmsPortfolioBySlug(slug: string): Promise<PortfolioItem | null> {
  const all = await getCmsPortfolio();
  const direct = all.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
  if (direct) return direct;

  // Backward-compatible alias map for legacy slugs
  const legacyAliases: Record<string, string> = {
    "ayush-wellness": "apex-digital-media",
    "kalpvruksh-group": "vanguard-performance-ops",
    "the-printing-wala": "catalyst-creative-labs",
    "mahalaxmi-jewellers": "acuity-media-network",
    "riddhi-siddhi-foods": "omniscale-growth-partners",
    "local-business-seo": "zenith-local-media",
  };

  if (legacyAliases[slug]) {
    return all.find((p) => p.slug === legacyAliases[slug]) || null;
  }

  const adminAll = await getAllCmsPortfolioAdmin();
  const adminFound = adminAll.find((p) => p.slug.toLowerCase() === slug.toLowerCase() && p.isPublished !== false);
  if (adminFound) return adminFound;

  const fallback = PORTFOLIO_DATA.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
  return fallback || null;
}

export async function resetCmsPortfolioToDefaults(): Promise<{ success: boolean; count: number }> {
  const colStore = getCollectionStore(COLLECTIONS.PORTFOLIO);
  colStore.clear();

  PORTFOLIO_DATA.forEach((p) => {
    colStore.set(p.id, { ...p });
  });

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      const snap = await adminDb.collection(COLLECTIONS.PORTFOLIO).get();
      const batch = adminDb.batch();
      snap.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      PORTFOLIO_DATA.forEach((p) => {
        const ref = adminDb.collection(COLLECTIONS.PORTFOLIO).doc(p.id);
        batch.set(ref, {
          ...p,
          updatedAt: FieldValue.serverTimestamp(),
          createdAt: FieldValue.serverTimestamp(),
        });
      });
      await batch.commit();
    } catch (e) {
      console.error("[resetCmsPortfolioToDefaults] Firestore Error:", e);
    }
  }

  revalidateWebsitePages();
  return { success: true, count: PORTFOLIO_DATA.length };
}

// ==========================================
// 3. TESTIMONIALS CMS FETCHER
// ==========================================

export function getLocalTestimonialsFallback(): TestimonialItem[] {
  const localItems = Array.from(getCollectionStore(COLLECTIONS.TESTIMONIALS).values()) as unknown as TestimonialItem[];
  if (localItems.length > 0) {
    const baseMap = new Map<string, TestimonialItem>(TESTIMONIALS_DATA.map((t) => [t.id, t]));
    localItems.forEach((item) => {
      const prev = baseMap.get(item.id);
      baseMap.set(item.id, {
        ...prev,
        ...item,
        clientName: (item.clientName || "").trim() || prev?.clientName || "",
        companyName: (item.companyName || "").trim() || prev?.companyName || "",
        testimonial: (item.testimonial || "").trim() || prev?.testimonial || "",
        serviceReceived: (item.serviceReceived || "").trim() || prev?.serviceReceived || "",
        clientRole: (item.clientRole || "").trim() || prev?.clientRole || "",
        rating: typeof item.rating === "number" ? item.rating : (prev?.rating || 5),
        isPublished: typeof item.isPublished === "boolean" ? item.isPublished : (prev?.isPublished ?? true),
        isFeatured: typeof item.isFeatured === "boolean" ? item.isFeatured : (prev?.isFeatured ?? false),
        order: typeof item.order === "number" ? item.order : (prev?.order || 1),
      } as TestimonialItem);
    });
    return Array.from(baseMap.values()).sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  return [...TESTIMONIALS_DATA].sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getAllCmsTestimonialsAdmin(): Promise<TestimonialItem[]> {
  return cachedFirestoreRead<TestimonialItem[]>(
    "cms_testimonials",
    60 * 1000,
    async () => {
      const adminDb = getAdminFirestore();
      if (adminDb) {
        const snap = await adminDb
          .collection(COLLECTIONS.TESTIMONIALS)
          .orderBy("order", "asc")
          .get();
        if (!snap.empty) {
          return snap.docs.map((doc) => {
            const item = sanitizeFirestoreDoc<TestimonialItem>(doc.id, doc.data());
            const fallback = TESTIMONIALS_DATA.find((t) => t.id === item.id);
            return {
              ...fallback,
              ...item,
            } as TestimonialItem;
          });
        }
      }
      return getLocalTestimonialsFallback();
    },
    () => getLocalTestimonialsFallback()
  );
}

export async function getCmsTestimonials(): Promise<TestimonialItem[]> {
  const all = await getAllCmsTestimonialsAdmin();
  return all.filter((t) => t.isPublished !== false);
}

export async function resetCmsTestimonialsToDefaults(): Promise<{ success: boolean; count: number }> {
  const colStore = getCollectionStore(COLLECTIONS.TESTIMONIALS);
  colStore.clear();

  TESTIMONIALS_DATA.forEach((t) => {
    colStore.set(t.id, { ...t });
  });

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      const snap = await adminDb.collection(COLLECTIONS.TESTIMONIALS).get();
      const batch = adminDb.batch();
      snap.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      TESTIMONIALS_DATA.forEach((t) => {
        const ref = adminDb.collection(COLLECTIONS.TESTIMONIALS).doc(t.id);
        batch.set(ref, {
          ...t,
          updatedAt: FieldValue.serverTimestamp(),
          createdAt: FieldValue.serverTimestamp(),
        });
      });
      await batch.commit();
    } catch (e) {
      console.error("[resetCmsTestimonialsToDefaults] Firestore Error:", e);
    }
  }

  revalidateWebsitePages();
  return { success: true, count: TESTIMONIALS_DATA.length };
}

// ==========================================
// 4. FAQS CMS FETCHER
// ==========================================

export function getLocalFaqsFallback(): FAQItem[] {
  const localItems = Array.from(getCollectionStore(COLLECTIONS.FAQS).values()) as unknown as FAQItem[];
  if (localItems.length > 0) {
    const baseMap = new Map<string, FAQItem>(FAQS_DATA.map((f) => [f.id, f]));
    localItems.forEach((item) => {
      const prev = baseMap.get(item.id);
      baseMap.set(item.id, {
        ...prev,
        ...item,
        question: (item.question || "").trim() || prev?.question || "",
        answer: (item.answer || "").trim() || prev?.answer || "",
        category: (item.category || "").trim() || prev?.category || "General",
        order: typeof item.order === "number" ? item.order : (prev?.order || 1),
        isPublished: typeof item.isPublished === "boolean" ? item.isPublished : (prev?.isPublished ?? true),
        isFeatured: typeof item.isFeatured === "boolean" ? item.isFeatured : (prev?.isFeatured ?? false),
      } as FAQItem);
    });
    return Array.from(baseMap.values()).sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  return [...FAQS_DATA].sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getAllCmsFaqsAdmin(): Promise<FAQItem[]> {
  return cachedFirestoreRead<FAQItem[]>(
    "cms_faqs",
    60 * 1000,
    async () => {
      const adminDb = getAdminFirestore();
      if (adminDb) {
        const snap = await adminDb.collection(COLLECTIONS.FAQS).orderBy("order", "asc").get();
        if (!snap.empty) {
          return snap.docs.map((doc) => {
            const item = sanitizeFirestoreDoc<FAQItem>(doc.id, doc.data());
            const fallback = FAQS_DATA.find((f) => f.id === item.id);
            return {
              ...fallback,
              ...item,
            } as FAQItem;
          });
        }
      }
      return getLocalFaqsFallback();
    },
    () => getLocalFaqsFallback()
  );
}

export async function getCmsFaqs(): Promise<FAQItem[]> {
  const all = await getAllCmsFaqsAdmin();
  return all.filter((f) => f.isPublished !== false);
}

export async function resetCmsFaqsToDefaults(): Promise<{ success: boolean; count: number }> {
  const colStore = getCollectionStore(COLLECTIONS.FAQS);
  colStore.clear();

  FAQS_DATA.forEach((f) => {
    colStore.set(f.id, { ...f });
  });

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      const snap = await adminDb.collection(COLLECTIONS.FAQS).get();
      const batch = adminDb.batch();
      snap.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      FAQS_DATA.forEach((f) => {
        const ref = adminDb.collection(COLLECTIONS.FAQS).doc(f.id);
        batch.set(ref, {
          ...f,
          updatedAt: FieldValue.serverTimestamp(),
          createdAt: FieldValue.serverTimestamp(),
        });
      });
      await batch.commit();
    } catch (e) {
      console.error("[resetCmsFaqsToDefaults] Firestore Error:", e);
    }
  }

  revalidateWebsitePages();
  return { success: true, count: FAQS_DATA.length };
}

// ==========================================
// 5. TEAM CMS FETCHER
// ==========================================

export function getLocalTeamFallback(): TeamMember[] {
  const localItems = Array.from(getCollectionStore(COLLECTIONS.TEAM).values()) as unknown as TeamMember[];
  if (localItems.length > 0) {
    const baseMap = new Map<string, TeamMember>(TEAM_MEMBERS_DATA.map((tm) => [tm.id, tm]));
    localItems.forEach((item) => {
      const prev = baseMap.get(item.id);
      baseMap.set(item.id, {
        ...prev,
        ...item,
        name: (item.name || "").trim() || prev?.name || "",
        role: (item.role || "").trim() || prev?.role || "",
        bio: (item.bio || "").trim() || prev?.bio || "",
        avatar: item.avatar || prev?.avatar || "/images/team/vipul-gajjar.jpg",
        socials: {
          linkedin: item.socials?.linkedin || prev?.socials?.linkedin,
          twitter: item.socials?.twitter || prev?.socials?.twitter,
          email: item.socials?.email || prev?.socials?.email,
        },
        order: typeof item.order === "number" ? item.order : (prev?.order || 1),
        isPublished: typeof item.isPublished === "boolean" ? item.isPublished : (prev?.isPublished ?? true),
      } as TeamMember);
    });
    return Array.from(baseMap.values()).sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  return [...TEAM_MEMBERS_DATA].sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getAllCmsTeamMembersAdmin(): Promise<TeamMember[]> {
  return cachedFirestoreRead<TeamMember[]>(
    "cms_team",
    60 * 1000,
    async () => {
      const adminDb = getAdminFirestore();
      if (adminDb) {
        const snap = await adminDb.collection(COLLECTIONS.TEAM).orderBy("order", "asc").get();
        if (!snap.empty) {
          return snap.docs.map((doc) => {
            const item = sanitizeFirestoreDoc<TeamMember>(doc.id, doc.data());
            const fallback = TEAM_MEMBERS_DATA.find((tm) => tm.id === item.id);
            return {
              ...fallback,
              ...item,
            } as TeamMember;
          });
        }
      }
      return getLocalTeamFallback();
    },
    () => getLocalTeamFallback()
  );
}

export async function getCmsTeamMembers(): Promise<TeamMember[]> {
  const all = await getAllCmsTeamMembersAdmin();
  return all.filter((tm) => tm.isPublished !== false);
}

export async function resetCmsTeamMembersToDefaults(): Promise<{ success: boolean; count: number }> {
  const colStore = getCollectionStore(COLLECTIONS.TEAM);
  colStore.clear();

  TEAM_MEMBERS_DATA.forEach((tm) => {
    colStore.set(tm.id, { ...tm });
  });

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      const snap = await adminDb.collection(COLLECTIONS.TEAM).get();
      const batch = adminDb.batch();
      snap.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      TEAM_MEMBERS_DATA.forEach((tm) => {
        const ref = adminDb.collection(COLLECTIONS.TEAM).doc(tm.id);
        batch.set(ref, {
          ...tm,
          updatedAt: FieldValue.serverTimestamp(),
          createdAt: FieldValue.serverTimestamp(),
        });
      });
      await batch.commit();
    } catch (e) {
      console.error("[resetCmsTeamMembersToDefaults] Firestore Error:", e);
    }
  }

  revalidateWebsitePages();
  return { success: true, count: TEAM_MEMBERS_DATA.length };
}


// ==========================================
// 6. GLOBAL SITE SETTINGS FETCHER
// ==========================================

export function getLocalSiteSettingsFallback(): SiteSettings {
  const localSaved = getCollectionStore(COLLECTIONS.SITE_SETTINGS).get("global");
  if (localSaved) {
    return {
      ...DEFAULT_SITE_SETTINGS,
      ...localSaved,
      customScripts: {
        ...DEFAULT_SITE_SETTINGS.customScripts,
        ...((localSaved.customScripts as Record<string, unknown>) || {}),
      },
    } as SiteSettings;
  }
  return DEFAULT_SITE_SETTINGS;
}

export async function getCmsSiteSettings(): Promise<SiteSettings> {
  return cachedFirestoreRead<SiteSettings>(
    "cms_site_settings",
    60 * 1000,
    async () => {
      const adminDb = getAdminFirestore();
      if (adminDb) {
        const doc = await adminDb.collection(COLLECTIONS.SITE_SETTINGS).doc("global").get();
        if (doc.exists) {
          const item = sanitizeFirestoreDoc<SiteSettings>(doc.id, doc.data()!);
          return {
            ...DEFAULT_SITE_SETTINGS,
            ...item,
            contact: { ...DEFAULT_SITE_SETTINGS.contact, ...(item.contact || {}) },
            socials: { ...DEFAULT_SITE_SETTINGS.socials, ...(item.socials || {}) },
            headerContent: { ...DEFAULT_SITE_SETTINGS.headerContent, ...(item.headerContent || {}) },
            footerContent: { ...DEFAULT_SITE_SETTINGS.footerContent, ...(item.footerContent || {}) },
            customScripts: {
              ...DEFAULT_SITE_SETTINGS.customScripts,
              ...(item.customScripts || {}),
            },
          } as SiteSettings;
        }
      }
      return getLocalSiteSettingsFallback();
    },
    () => getLocalSiteSettingsFallback()
  );
}

/**
 * 1-Click "Reset to Defaults": Restores canonical DigiVigee site settings
 * (brand identity, contact coordinates, social channels, and footer) in Firestore and memory.
 */
export async function resetCmsSiteSettingsToDefaults(): Promise<{ success: boolean; settings: SiteSettings }> {
  const colStore = getCollectionStore(COLLECTIONS.SITE_SETTINGS);
  colStore.set("global", { ...DEFAULT_SITE_SETTINGS });

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      await adminDb.collection(COLLECTIONS.SITE_SETTINGS).doc("global").set({
        ...DEFAULT_SITE_SETTINGS,
        updatedAt: FieldValue.serverTimestamp(),
      });
    } catch (e) {
      console.error("[resetCmsSiteSettingsToDefaults] Firestore Error:", e);
    }
  }

  revalidateWebsitePages();
  return { success: true, settings: DEFAULT_SITE_SETTINGS };
}



// ==========================================
// 7. PAGE CONTENT FETCHER
// ==========================================

export function getLocalPageContentFallback(
  pageId: "home" | "about" | "contact"
): HomePageContent | AboutPageContent | ContactPageContent {
  const localSaved = getCollectionStore(COLLECTIONS.PAGES).get(pageId);
  if (localSaved) {
    const base =
      pageId === "home"
        ? DEFAULT_HOME_PAGE_CONTENT
        : pageId === "about"
        ? DEFAULT_ABOUT_PAGE_CONTENT
        : DEFAULT_CONTACT_PAGE_CONTENT;
    return { ...base, ...localSaved } as HomePageContent | AboutPageContent | ContactPageContent;
  }
  if (pageId === "home") return DEFAULT_HOME_PAGE_CONTENT;
  if (pageId === "about") return DEFAULT_ABOUT_PAGE_CONTENT;
  return DEFAULT_CONTACT_PAGE_CONTENT;
}

export async function getCmsPageContent(pageId: "home"): Promise<HomePageContent>;
export async function getCmsPageContent(pageId: "about"): Promise<AboutPageContent>;
export async function getCmsPageContent(pageId: "contact"): Promise<ContactPageContent>;
export async function getCmsPageContent(
  pageId: "home" | "about" | "contact"
): Promise<HomePageContent | AboutPageContent | ContactPageContent>;
export async function getCmsPageContent(
  pageId: "home" | "about" | "contact"
): Promise<HomePageContent | AboutPageContent | ContactPageContent> {
  return cachedFirestoreRead(
    `cms_page_${pageId}`,
    60 * 1000,
    async () => {
      const adminDb = getAdminFirestore();
      if (adminDb) {
        const doc = await adminDb.collection(COLLECTIONS.PAGES).doc(pageId).get();
        if (doc.exists) {
          return sanitizeFirestoreDoc<HomePageContent | AboutPageContent | ContactPageContent>(
            doc.id,
            doc.data()!
          );
        }
      }
      return getLocalPageContentFallback(pageId);
    },
    () => getLocalPageContentFallback(pageId)
  );
}


// ==========================================
// 8. ADMIN MUTATION OPERATIONS
// ==========================================

export interface CmsMutationResult {
  success: boolean;
  id?: string;
  error?: string;
}

export async function saveCmsItem(
  collectionName: string,
  data: Record<string, unknown>,
  docId?: string
): Promise<CmsMutationResult> {
  const targetId = docId || `item-${Date.now()}`;
  const nowIso = new Date().toISOString();
  const colStore = getCollectionStore(collectionName);
  const existing = colStore.get(targetId) || {};
  const cleanData: Record<string, unknown> = {
    ...existing,
    ...data,
    id: targetId,
    updatedAt: nowIso,
  };

  if (!cleanData.createdAt) {
    cleanData.createdAt = nowIso;
  }

  // Always store in persistent memory store
  colStore.set(targetId, cleanData);

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      const serverTimestamp = FieldValue.serverTimestamp();
      const firestorePayload = { ...cleanData, updatedAt: serverTimestamp };
      await adminDb.collection(collectionName).doc(targetId).set(firestorePayload, { merge: true });
    } catch (error) {
      console.error(`[saveCmsItem:${collectionName}] Firestore Error:`, error);
      return { success: false, error: "Database error while saving changes." };
    }
  } else {
    console.warn(`[saveCmsItem:${collectionName}] Running without Firestore connection.`);
  }

  revalidateWebsitePages();
  return { success: true, id: targetId };
}


export async function deleteCmsItem(
  collectionName: string,
  docId: string
): Promise<CmsMutationResult> {
  const colStore = getCollectionStore(collectionName);
  colStore.delete(docId);

  const adminDb = getAdminFirestore();
  if (!adminDb) {
    revalidateWebsitePages();
    return { success: true, id: docId };
  }

  try {
    await adminDb.collection(collectionName).doc(docId).delete();
    revalidateWebsitePages();
    return { success: true, id: docId };
  } catch (error) {
    console.error(`[deleteCmsItem:${collectionName}] Error:`, error);
    return { success: false, error: "Failed to delete CMS document." };
  }
}

export async function togglePublishCmsItem(
  collectionName: string,
  docId: string,
  isPublished: boolean
): Promise<CmsMutationResult> {
  return saveCmsItem(collectionName, { isPublished }, docId);
}

export async function toggleFeaturedCmsItem(
  collectionName: string,
  docId: string,
  isFeatured: boolean
): Promise<CmsMutationResult> {
  return saveCmsItem(collectionName, { isFeatured }, docId);
}

export async function reorderCmsItems(
  collectionName: string,
  items: Array<{ id: string; order: number }>
): Promise<CmsMutationResult> {
  const colStore = getCollectionStore(collectionName);
  for (const item of items) {
    const existing = colStore.get(item.id);
    if (existing) {
      colStore.set(item.id, { ...existing, order: item.order });
    }
  }

  const adminDb = getAdminFirestore();
  if (!adminDb) {
    revalidateWebsitePages();
    return { success: true };
  }

  try {
    const batch = adminDb.batch();
    for (const item of items) {
      const ref = adminDb.collection(collectionName).doc(item.id);
      batch.update(ref, {
        order: item.order,
        updatedAt: FieldValue.serverTimestamp(),
      });
    }
    await batch.commit();
    revalidateWebsitePages();
    return { success: true };
  } catch (error) {
    console.error(`[reorderCmsItems:${collectionName}] Error:`, error);
    return { success: false, error: "Failed to update item order." };
  }
}


// ==========================================
// 9. BLOG POSTS FETCHER & MUTATIONS
// ==========================================

export function getLocalBlogPostsFallback(): BlogPost[] {
  const localItems = Array.from(getCollectionStore(COLLECTIONS.BLOGS).values()) as unknown as BlogPost[];
  if (localItems.length > 0) {
    const baseMap = new Map<string, BlogPost>(BLOG_POSTS_DATA.map((b) => [b.id, b]));
    localItems.forEach((item) => {
      const prev = baseMap.get(item.id);
      baseMap.set(item.id, {
        ...prev,
        ...item,
        title: (item.title || "").trim() || prev?.title || "",
        excerpt: (item.excerpt || "").trim() || prev?.excerpt || "",
        content: (item.content || "").trim() || prev?.content || "",
        slug: (item.slug || "").trim() || prev?.slug || "",
        categoryName: (item.categoryName || "").trim() || prev?.categoryName || "Agency OS & Operations",
        status: item.status || prev?.status || "published",
        isFeatured: typeof item.isFeatured === "boolean" ? item.isFeatured : (prev?.isFeatured ?? false),
        featuredImage: item.featuredImage || prev?.featuredImage || "/images/showcase/collaborate_keynote.jpg",
      } as BlogPost);
    });
    return Array.from(baseMap.values()).sort(
      (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }
  return [...BLOG_POSTS_DATA];
}

export async function getAllCmsBlogPostsAdmin(): Promise<BlogPost[]> {
  return cachedFirestoreRead<BlogPost[]>(
    "cms_blogs",
    60 * 1000,
    async () => {
      const adminDb = getAdminFirestore();
      if (adminDb) {
        const snap = await adminDb.collection(COLLECTIONS.BLOGS).orderBy("createdAt", "desc").get();
        if (!snap.empty) {
          return snap.docs.map((doc) => {
            const item = sanitizeFirestoreDoc<BlogPost>(doc.id, doc.data());
            const fallback = BLOG_POSTS_DATA.find((b) => b.id === item.id || b.slug === item.slug);
            return {
              ...fallback,
              ...item,
            } as BlogPost;
          });
        }
      }
      return getLocalBlogPostsFallback();
    },
    () => getLocalBlogPostsFallback()
  );
}

export async function getCmsBlogPosts(): Promise<BlogPost[]> {
  const all = await getAllCmsBlogPostsAdmin();
  const published = all.filter((p) => p.status === "published");

  const blogMap = new Map<string, BlogPost>();

  // 1. Initialize with canonical 2026 agency playbooks
  BLOG_POSTS_DATA.forEach((b) => {
    blogMap.set(b.slug, { ...b });
  });

  // 2. Merge published updates
  for (const item of published) {
    if (blogMap.has(item.slug)) {
      const base = blogMap.get(item.slug)!;
      blogMap.set(item.slug, {
        ...base,
        ...item,
        id: base.id, // Preserve unique ID
        title: (item.title || "").trim() || base.title,
        excerpt: (item.excerpt || "").trim() || base.excerpt,
        content: (item.content || "").trim() || base.content,
        categoryName: (item.categoryName || "").trim() || base.categoryName,
        readingTimeMinutes: item.readingTimeMinutes || base.readingTimeMinutes,
        featuredImage: item.featuredImage?.trim() ? item.featuredImage.trim() : base.featuredImage,
        author: {
          ...base.author,
          ...(item.author || {}),
          name: (item.author?.name || "").trim() || base.author.name,
          role: (item.author?.role || "").trim() || base.author.role,
          avatar: item.author?.avatar?.trim() ? item.author.avatar.trim() : base.author.avatar,
        },
      });
    } else if (item.slug) {
      blogMap.set(item.slug, item);
    }
  }

  // Canonical order
  const CANONICAL_BLOG_ORDER = [
    "10-social-media-marketing-tips",
    "how-performance-marketing-boosts-roi",
    "content-marketing-strategies",
    "local-seo-rank-higher",
    "why-good-website-design-matters",
    "email-marketing-best-practices",
  ];

  const result: BlogPost[] = [];
  for (const slug of CANONICAL_BLOG_ORDER) {
    if (blogMap.has(slug)) {
      const p = blogMap.get(slug)!;
      if (p.status === "published") {
        result.push(p);
      }
    }
  }

  for (const [slug, item] of blogMap.entries()) {
    if (!CANONICAL_BLOG_ORDER.includes(slug) && item.status === "published") {
      result.push(item);
    }
  }

  return result.length > 0 ? result : BLOG_POSTS_DATA;
}

export async function resetCmsBlogPostsToDefaults(): Promise<{ success: boolean; count: number }> {
  const colStore = getCollectionStore(COLLECTIONS.BLOGS);
  colStore.clear();

  BLOG_POSTS_DATA.forEach((b) => {
    colStore.set(b.id, { ...b });
  });

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      const snap = await adminDb.collection(COLLECTIONS.BLOGS).get();
      const batch = adminDb.batch();
      snap.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      BLOG_POSTS_DATA.forEach((b) => {
        const ref = adminDb.collection(COLLECTIONS.BLOGS).doc(b.id);
        batch.set(ref, {
          ...b,
          updatedAt: FieldValue.serverTimestamp(),
          createdAt: FieldValue.serverTimestamp(),
        });
      });
      await batch.commit();
    } catch (e) {
      console.error("[resetCmsBlogPostsToDefaults] Firestore Error:", e);
    }
  }

  revalidateWebsitePages();
  return { success: true, count: BLOG_POSTS_DATA.length };
}

export async function getCmsBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const all = await getCmsBlogPosts();
  const direct = all.find((p) => p.slug === slug);
  if (direct) return direct;

  const fallback = BLOG_POSTS_DATA.find((p) => p.slug === slug);
  return fallback || null;
}

export async function getCmsBlogPostByIdAdmin(id: string): Promise<BlogPost | null> {
  const all = await getAllCmsBlogPostsAdmin();
  const found = all.find((p) => p.id === id);
  return found || null;
}

export async function saveCmsBlogPost(
  data: Partial<BlogPost>,
  docId?: string
): Promise<CmsMutationResult> {
  const slug = (data.slug || "").trim().toLowerCase();
  if (!slug) {
    return { success: false, error: "A valid URL slug is required." };
  }

  const targetId = docId || `blog-${Date.now()}`;
  const nowIso = new Date().toISOString();
  const readingTime = calculateReadingTime(data.content || "");
  const colStore = getCollectionStore(COLLECTIONS.BLOGS);
  const existing = colStore.get(targetId) || {};

  const cleanData: Record<string, unknown> = {
    ...existing,
    ...data,
    id: targetId,
    slug,
    readingTimeMinutes: readingTime,
    updatedAt: nowIso,
  };

  if (!cleanData.createdAt) {
    cleanData.createdAt = nowIso;
  }
  if (data.status === "published" && !cleanData.publishedAt) {
    cleanData.publishedAt = nowIso;
  }

  colStore.set(targetId, cleanData);

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      const serverTimestamp = FieldValue.serverTimestamp();
      const firestorePayload: Record<string, unknown> = { ...cleanData, updatedAt: serverTimestamp };
      if (cleanData.publishedAt === nowIso) {
        firestorePayload.publishedAt = serverTimestamp;
      }
      await adminDb.collection(COLLECTIONS.BLOGS).doc(targetId).set(firestorePayload, { merge: true });
    } catch (e) {
      console.error("[saveCmsBlogPost] Firestore Error:", e);

    }
  }

  revalidateWebsitePages();
  return { success: true, id: targetId };
}

export async function deleteCmsBlogPost(docId: string): Promise<CmsMutationResult> {
  return deleteCmsItem(COLLECTIONS.BLOGS, docId);
}

export async function togglePublishCmsBlogPost(
  docId: string,
  currentStatus: BlogStatus
): Promise<CmsMutationResult> {
  const newStatus: BlogStatus = currentStatus === "published" ? "draft" : "published";
  const nowIso = new Date().toISOString();
  const colStore = getCollectionStore(COLLECTIONS.BLOGS);
  const existing = colStore.get(docId) || {};
  const updated = {
    ...existing,
    status: newStatus,
    updatedAt: nowIso,
    ...(newStatus === "published" && !existing.publishedAt ? { publishedAt: nowIso } : {}),
  };
  colStore.set(docId, updated);

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      const updateData: Record<string, unknown> = {
        status: newStatus,
        updatedAt: FieldValue.serverTimestamp(),
      };
      if (newStatus === "published" && !existing.publishedAt) {
        updateData.publishedAt = FieldValue.serverTimestamp();
      }
      await adminDb.collection(COLLECTIONS.BLOGS).doc(docId).update(updateData);
    } catch (e) {
      console.error("[togglePublishCmsBlogPost] Firestore Error:", e);
    }
  }

  revalidateWebsitePages();
  return { success: true, id: docId };
}

export async function toggleFeaturedCmsBlogPost(

  docId: string,
  currentFeatured: boolean
): Promise<CmsMutationResult> {
  return saveCmsItem(COLLECTIONS.BLOGS, { isFeatured: !currentFeatured }, docId);
}

