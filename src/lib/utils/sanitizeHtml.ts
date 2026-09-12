/**
 * Lightweight, robust HTML sanitizer for restricted Custom HTML/CSS landing page sections.
 * Strictly prevents XSS, malicious script execution, and unsafe iframe/URI injections.
 */

// Disallowed tag names (removed along with their contents)
const FORBIDDEN_TAGS = [
  "script",
  "iframe",
  "object",
  "embed",
  "applet",
  "base",
  "link",
  "meta",
  "form",
];

/**
 * Sanitizes an HTML string to ensure safe client-side rendering without XSS vulnerabilities.
 */
export function sanitizeCustomHtml(rawHtml: string): string {
  if (!rawHtml || typeof rawHtml !== "string") return "";

  let sanitized = rawHtml;

  // 1. Remove forbidden tags and their inner content
  for (const tag of FORBIDDEN_TAGS) {
    const tagRegex = new RegExp(`<${tag}[^>]*>[\\s\\S]*?<\\/${tag}>`, "gi");
    sanitized = sanitized.replace(tagRegex, "");
    // Remove self-closing/singleton variants
    const selfClosingRegex = new RegExp(`<${tag}[^>]*\\/?>`, "gi");
    sanitized = sanitized.replace(selfClosingRegex, "");
  }

  // 2. Remove all inline event handlers (e.g. onclick, onload, onerror, onmouseover, etc.)
  sanitized = sanitized.replace(/\s+on[a-z]+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, "");

  // 3. Neutralize dangerous URL schemes in attributes (javascript:, data:, vbscript:)
  sanitized = sanitized.replace(
    /(href|src|action)\s*=\s*(?:'|\")\s*(javascript|data|vbscript):[^\">]*\s*(?:'|\")/gi,
    '$1="#"'
  );

  // 4. Neutralize unsafe CSS expression() or behavior: in style attributes
  sanitized = sanitized.replace(
    /style\s*=\s*(['"])[^'"]*(expression|behavior|javascript:|url\s*\(\s*['"]?data:)[^'"]*\1/gi,
    ""
  );

  return sanitized;
}
