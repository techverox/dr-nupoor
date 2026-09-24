/**
 * Dr. Noopur Patel Medical Platform — Comprehensive Input Sanitization & Injection Defense
 *
 * Protects server-side endpoints and database query boundaries against XSS,
 * SQL-like patterns, NoSQL operator injection, and malicious string manipulation.
 */

// HTML entity escape map
const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
};

/**
 * Escapes characters with HTML entities to strictly prevent Cross-Site Scripting (XSS).
 */
export function escapeHtml(str: string): string {
  if (!str || typeof str !== "string") return "";
  return str.replace(/[&<>"'/]/g, (char) => HTML_ESCAPE_MAP[char] || char);
}

/**
 * Sanitizes a single plain text string by removing control characters, null bytes,
 * and normalizing whitespace.
 */
export function sanitizePlainText(str: unknown): string {
  if (typeof str !== "string") return "";
  return str
    // Remove null bytes (%00) and dangerous control characters
    .replace(/\0/g, "")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim();
}

/**
 * Neutralizes potential SQL injection keywords and comments from search query strings.
 */
export function sanitizeSqlLikeInput(str: string): string {
  if (!str || typeof str !== "string") return "";
  return str
    .replace(/(\b(UNION\s+SELECT|DROP\s+TABLE|INSERT\s+INTO|DELETE\s+FROM|UPDATE\s+SET|ALTER\s+TABLE|EXEC|EXECUTE)\b)/gi, "")
    .replace(/(--|;|\/\*|\*\/)/g, "")
    .trim();
}

/**
 * Neutralizes NoSQL operator injection (e.g. keys starting with '$').
 */
export function sanitizeNoSqlInput<T>(input: T): T {
  if (input === null || typeof input !== "object") {
    if (typeof input === "string") {
      return sanitizePlainText(input) as unknown as T;
    }
    return input;
  }

  if (Array.isArray(input)) {
    return input.map((item) => sanitizeNoSqlInput(item)) as unknown as T;
  }

  const cleanObj: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
    // Strip leading '$' or dangerous operator keys
    const safeKey = key.replace(/^\$+/, "").trim();
    if (safeKey.length > 0) {
      cleanObj[safeKey] = sanitizeNoSqlInput(value);
    }
  }

  return cleanObj as T;
}

/**
 * Validates and normalizes slug identifiers (a-z, 0-9, hyphens only).
 */
export function sanitizeSlug(slug: string): string {
  if (!slug || typeof slug !== "string") return "";
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Validates and normalizes URL inputs (ensures protocol is http: or https:).
 */
export function sanitizeUrl(rawUrl: string): string | null {
  if (!rawUrl || typeof rawUrl !== "string") return null;
  const trimmed = rawUrl.trim();

  // Relative path validation
  if (trimmed.startsWith("/")) {
    // Prevent protocol-relative URL bypass (`//attacker.com`)
    if (trimmed.startsWith("//")) return null;
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString();
    }
  } catch {
    // Invalid URL structure
  }

  return null;
}
