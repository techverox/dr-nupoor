import type { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";
import { getGlobalSeoSettings, getCustomPageSeo } from "@/lib/services/seoService";

export interface GenerateMetadataOptions {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  ogType?: "website" | "article";
  ogImage?: string;
  publishedTime?: string;
  authors?: string[];
  noIndex?: boolean;
}

/**
 * Synchronous metadata generator for fallback / default rendering.
 */
export function generatePageMetadata({
  title,
  description,
  path = "",
  keywords = [],
  ogType = "website",
  ogImage = SITE_CONFIG.ogImage,
  publishedTime,
  authors,
  noIndex = false,
}: GenerateMetadataOptions): Metadata {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${SITE_CONFIG.url}${normalizedPath === "/" ? "" : normalizedPath}`;
  const fullTitle = `${title} | ${SITE_CONFIG.name}`;

  const defaultKeywords = [
    "digital marketing agency",
    "social media marketing",
    "performance marketing",
    "SEO services",
    "web design and development",
    "lead generation",
    "DigiVigee",
  ];

  const mergedKeywords = Array.from(new Set([...keywords, ...defaultKeywords]));

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : `${SITE_CONFIG.url}${ogImage}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      type: ogType,
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.startsWith("http") ? ogImage : `${SITE_CONFIG.url}${ogImage}`],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/**
 * Dynamic metadata resolver: Checks Firestore for admin-configured page-level SEO overrides
 * and global SEO settings, falling back seamlessly to default options.
 */
export async function resolveDynamicPageMetadata(
  routePath: string,
  defaults: GenerateMetadataOptions
): Promise<Metadata> {
  const normalizedPath = routePath.startsWith("/") ? routePath : `/${routePath}`;

  try {
    const [globalSeo, customSeo] = await Promise.all([
      getGlobalSeoSettings(),
      getCustomPageSeo(normalizedPath),
    ]);

    const title = customSeo?.title || defaults.title;
    const description = customSeo?.description || defaults.description;
    const baseUrl = globalSeo.canonicalBaseUrl || SITE_CONFIG.url;
    const canonicalUrl =
      customSeo?.canonicalUrl ||
      `${baseUrl}${normalizedPath === "/" ? "" : normalizedPath}`;

    const ogTitle = customSeo?.ogTitle || `${title} | ${globalSeo.organizationName || SITE_CONFIG.name}`;
    const ogDescription = customSeo?.ogDescription || description;
    const ogImage =
      customSeo?.ogImage || defaults.ogImage || globalSeo.defaultOgImage || SITE_CONFIG.ogImage;
    const fullOgImageUrl = ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`;

    const twitterTitle = customSeo?.twitterTitle || ogTitle;
    const twitterDescription = customSeo?.twitterDescription || ogDescription;
    const twitterImage = customSeo?.twitterImage || ogImage;
    const fullTwitterImageUrl = twitterImage.startsWith("http") ? twitterImage : `${baseUrl}${twitterImage}`;

    // Indexability: Respect page-level custom override, else default, constrained by global indexability
    let isIndexable = true;
    if (customSeo?.robotsIndex !== undefined) {
      isIndexable = customSeo.robotsIndex;
    } else if (defaults.noIndex) {
      isIndexable = false;
    } else {
      isIndexable = globalSeo.robotsIndex;
    }

    const isFollowable =
      customSeo?.robotsFollow !== undefined ? customSeo.robotsFollow : globalSeo.robotsFollow;

    const keywords = Array.from(
      new Set([
        ...(customSeo?.keywords || []),
        ...(defaults.keywords || []),
        ...(globalSeo.defaultKeywords || []),
      ])
    );

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: ogTitle,
        description: ogDescription,
        url: canonicalUrl,
        siteName: globalSeo.organizationName || SITE_CONFIG.name,
        images: [
          {
            url: fullOgImageUrl,
            width: 1200,
            height: 630,
            alt: ogTitle,
          },
        ],
        type: defaults.ogType || "website",
        ...(defaults.publishedTime ? { publishedTime: defaults.publishedTime } : {}),
        ...(defaults.authors ? { authors: defaults.authors } : {}),
      },
      twitter: {
        card: "summary_large_image",
        title: twitterTitle,
        description: twitterDescription,
        images: [fullTwitterImageUrl],
      },
      robots: {
        index: isIndexable,
        follow: isFollowable,
        googleBot: {
          index: isIndexable,
          follow: isFollowable,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } catch (err) {
    console.warn(`[resolveDynamicPageMetadata] Fallback for ${normalizedPath}:`, err);
    return generatePageMetadata(defaults);
  }
}

/**
 * Root Layout Metadata Resolver:
 * Resolves global SEO metadata (default title, title template, description, OpenGraph, Twitter,
 * search engine verification tags for Google & Bing) dynamically from Firestore.
 */
export async function resolveRootLayoutMetadata(): Promise<Metadata> {
  try {
    const [globalSeo, homeCustomSeo] = await Promise.all([
      getGlobalSeoSettings(),
      getCustomPageSeo("/"),
    ]);

    const rawBaseUrl = (globalSeo?.canonicalBaseUrl || SITE_CONFIG.url || "https://digivigee.com").trim();
    const siteUrl = rawBaseUrl.startsWith("http") ? rawBaseUrl : `https://${rawBaseUrl}`;

    let metadataBase: URL;
    try {
      metadataBase = new URL(siteUrl);
    } catch {
      metadataBase = new URL("https://digivigee.com");
    }

    const titleDefault =
      homeCustomSeo?.title?.trim() ||
      globalSeo?.defaultTitle?.trim() ||
      SITE_CONFIG.name;

    const titleTemplate =
      globalSeo?.titleTemplate?.trim() ||
      `%s | ${globalSeo?.organizationName || SITE_CONFIG.name}`;

    const description =
      homeCustomSeo?.description?.trim() ||
      globalSeo?.defaultDescription?.trim() ||
      SITE_CONFIG.description;

    const defaultKeywords = [
      "digital marketing agency",
      "performance marketing",
      "social media marketing",
      "SEO services",
      "web design and development",
      "lead generation",
      "DigiVigee",
    ];

    const keywords = Array.from(
      new Set([
        ...(homeCustomSeo?.keywords || []),
        ...(globalSeo?.defaultKeywords || []),
        ...defaultKeywords,
      ])
    );

    const ogTitle = homeCustomSeo?.ogTitle?.trim() || titleDefault;
    const ogDescription = homeCustomSeo?.ogDescription?.trim() || description;
    const rawOgImage =
      homeCustomSeo?.ogImage?.trim() ||
      globalSeo?.defaultOgImage?.trim() ||
      SITE_CONFIG.ogImage;
    const fullOgImageUrl = rawOgImage.startsWith("http")
      ? rawOgImage
      : `${siteUrl}${rawOgImage.startsWith("/") ? "" : "/"}${rawOgImage}`;

    const twitterTitle = homeCustomSeo?.twitterTitle?.trim() || ogTitle;
    const twitterDescription = homeCustomSeo?.twitterDescription?.trim() || ogDescription;
    const rawTwitterImage =
      homeCustomSeo?.twitterImage?.trim() ||
      rawOgImage;
    const fullTwitterImageUrl = rawTwitterImage.startsWith("http")
      ? rawTwitterImage
      : `${siteUrl}${rawTwitterImage.startsWith("/") ? "" : "/"}${rawTwitterImage}`;

    const isIndexable =
      homeCustomSeo?.robotsIndex !== undefined
        ? homeCustomSeo.robotsIndex
        : globalSeo?.robotsIndex ?? true;

    const isFollowable =
      homeCustomSeo?.robotsFollow !== undefined
        ? homeCustomSeo.robotsFollow
        : globalSeo?.robotsFollow ?? true;

    const verification: Metadata["verification"] = {};
    if (globalSeo?.googleSiteVerification?.trim()) {
      verification.google = globalSeo.googleSiteVerification.trim();
    }
    if (globalSeo?.bingSiteVerification?.trim()) {
      verification.other = {
        "msvalidate.01": [globalSeo.bingSiteVerification.trim()],
      };
    }

    return {
      metadataBase,
      title: {
        default: titleDefault,
        template: titleTemplate,
      },
      description,
      keywords,
      alternates: {
        canonical: homeCustomSeo?.canonicalUrl || siteUrl,
      },
      openGraph: {
        title: ogTitle,
        description: ogDescription,
        url: siteUrl,
        siteName: globalSeo?.organizationName || SITE_CONFIG.name,
        images: [
          {
            url: fullOgImageUrl,
            width: 1200,
            height: 630,
            alt: ogTitle,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: twitterTitle,
        description: twitterDescription,
        images: [fullTwitterImageUrl],
      },
      robots: {
        index: isIndexable,
        follow: isFollowable,
        googleBot: {
          index: isIndexable,
          follow: isFollowable,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      icons: {
        icon: [
          { url: "/favicon.ico", sizes: "any" },
          { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
          { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        ],
        apple: [
          { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        ],
        shortcut: "/favicon.ico",
      },
      ...(Object.keys(verification).length > 0 ? { verification } : {}),
    };
  } catch (error) {
    console.warn("[resolveRootLayoutMetadata] Fallback metadata:", error);
    return {
      title: {
        default: "Dr. Noopur Patel — Breast Cancer Surgeon | Marengo CIMS Hospital, Ahmedabad",
        template: "%s | Dr. Noopur Patel",
      },
      description:
        "Dr. Noopur Patel is an Associate Consultant in Surgical Breast Oncology at Marengo CIMS Hospital, Ahmedabad. Specializing in oncoplastic breast surgery, breast conservation, and comprehensive breast care.",
      icons: {
        icon: [
          { url: "/favicon.ico", sizes: "any" },
          { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
          { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        ],
        apple: [
          { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        ],
        shortcut: "/favicon.ico",
      },
    };
  }
}

