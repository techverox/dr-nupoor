/**
 * Universal slug generation and validation utilities for the DigiVigee Platform.
 */

export const RESERVED_SLUGS = new Set([
  // Core System & API
  "admin",
  "api",
  "_next",
  "favicon",
  "sitemap",
  "robots",
  "static",
  "images",
  "uploads",

  // Core Public Routes
  "about",
  "services",
  "portfolio",
  "blog",
  "contact",
  "privacy-policy",
  "terms-and-conditions",
  "refund-policy",
  "landing",
  "login",
  "logout",
  "dashboard",
  "preview",
  "settings",
  "media",
  "analytics",
  "subscribers",
  "offers",
  "redirects",
  "leads",
  "faqs",
  "team",
  "testimonials",
]);

/**
 * Generates an SEO-safe, normalized URL slug from a title string.
 */
export function generateSlug(title: string): string {
  if (!title) return "";
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Convert spaces & underscores to hyphens
    .replace(/^-+|-+$/g, ""); // Trim leading/trailing hyphens
}

export interface SlugValidationResult {
  isValid: boolean;
  error?: string;
  normalizedSlug: string;
}

/**
 * Validates whether a slug is safe, follows URL specifications, and is not a reserved system route.
 */
export function validateLandingPageSlug(rawSlug: string): SlugValidationResult {
  const normalizedSlug = generateSlug(rawSlug);

  if (!normalizedSlug) {
    return {
      isValid: false,
      error: "Slug cannot be empty.",
      normalizedSlug: "",
    };
  }

  if (normalizedSlug.length < 3) {
    return {
      isValid: false,
      error: "Slug must be at least 3 characters long.",
      normalizedSlug,
    };
  }

  if (normalizedSlug.length > 80) {
    return {
      isValid: false,
      error: "Slug cannot exceed 80 characters.",
      normalizedSlug,
    };
  }

  // Check valid regex structure (alphanumeric separated by hyphens)
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugRegex.test(normalizedSlug)) {
    return {
      isValid: false,
      error: "Slug can only contain lowercase letters, numbers, and single hyphens.",
      normalizedSlug,
    };
  }

  // Check reserved routes
  if (RESERVED_SLUGS.has(normalizedSlug)) {
    return {
      isValid: false,
      error: `"${normalizedSlug}" is a reserved system route and cannot be used as a landing page slug.`,
      normalizedSlug,
    };
  }

  return {
    isValid: true,
    normalizedSlug,
  };
}

/**
 * Generates a unique collision-free duplicate slug (e.g. "seo-audit" -> "seo-audit-copy", "seo-audit-copy-2").
 */
export function generateDuplicateSlug(baseSlug: string, existingSlugs: string[]): string {
  const cleanBase = baseSlug.replace(/-copy(?:-\d+)?$/, "");
  const existingSet = new Set(existingSlugs.map((s) => s.toLowerCase()));

  const candidate = `${cleanBase}-copy`;
  if (!existingSet.has(candidate)) {
    return candidate;
  }

  let counter = 2;
  while (existingSet.has(`${cleanBase}-copy-${counter}`)) {
    counter++;
  }

  return `${cleanBase}-copy-${counter}`;
}
