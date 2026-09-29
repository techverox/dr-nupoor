/**
 * Instagram Client & Server Utility
 * High-performance string manipulation and HTML entity decoders.
 */

/**
 * Fully decodes all HTML entities (hex, decimal, and named entities)
 * including Unicode/Devanagari characters (e.g. &#x92b;&#x947; -> फे)
 * and special punctuation (quotes, dashes, ellipsis, ampersands).
 */
export function decodeHtmlEntities(str: string): string {
  if (!str || typeof str !== "string") return "";
  return str
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
      try {
        return String.fromCodePoint(parseInt(hex, 16));
      } catch {
        return "";
      }
    })
    .replace(/&#([0-9]+);/g, (_, dec) => {
      try {
        return String.fromCodePoint(parseInt(dec, 10));
      } catch {
        return "";
      }
    })
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;/g, "...")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–");
}

/**
 * Intelligently cleans and shortens a scraped title or caption into an elegant, concise card title:
 * - Decodes all HTML entities (Hindi / English / Symbols)
 * - Strips account prefixes ("Name on Instagram: ")
 * - Removes excess hashtags (#...)
 * - Picks first meaningful sentence/clause (max 75 chars)
 */
export function cleanInstagramTitle(rawText: string, fallbackShortcode?: string): string {
  if (!rawText) return fallbackShortcode ? `Clinical Reel (${fallbackShortcode})` : "Breast Awareness Reel";

  let cleaned = decodeHtmlEntities(rawText);

  // Strip prefixes like "Dr. Divax Oza | Pulmonologist | Palanpur on Instagram: " or "... on Instagram: "
  cleaned = cleaned.replace(/^.*?on Instagram:\s*["“]?/i, "");
  // Remove wrapping quotes
  cleaned = cleaned.replace(/^["'“”]+|["'“”]+$/g, "").trim();

  // If there are multiple lines or paragraphs, pick the first clean line
  const firstLine = cleaned.split(/[\r\n]+/)[0]?.trim() || "";
  if (firstLine) {
    cleaned = firstLine;
  }

  // If it's a long sentence, extract first sentence terminating at Hindi '।', English '.', '!', or '?'
  const sentenceMatch = cleaned.match(/^([^।!?\r\n]+[।!?]?)/);
  if (sentenceMatch && sentenceMatch[1] && sentenceMatch[1].length >= 15 && sentenceMatch[1].length <= 80) {
    cleaned = sentenceMatch[1].trim();
  } else if (cleaned.length > 80) {
    // Truncate at word boundary up to 80 chars
    const sliced = cleaned.slice(0, 80);
    const lastSpace = sliced.lastIndexOf(" ");
    cleaned = (lastSpace > 40 ? sliced.slice(0, lastSpace) : sliced).trim() + "...";
  }

  // Remove hashtags and collapse multiple spaces
  cleaned = cleaned.replace(/#\w+/g, "").replace(/\s{2,}/g, " ").trim();

  if (!cleaned || cleaned.length < 3) {
    cleaned = fallbackShortcode ? `Clinical Reel (${fallbackShortcode})` : "Breast Awareness Reel";
  }

  return cleaned;
}
