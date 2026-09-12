import { BlogPost } from "@/types";

/**
 * Calculates deterministic reading time based on ~200 words per minute.
 */
export function calculateReadingTime(content: string): number {
  if (!content || typeof content !== "string") return 1;

  // Strip markdown formatting symbols and HTML tags
  const cleanText = content
    .replace(/<[^>]*>/g, " ")
    .replace(/#+/g, "")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "")
    .replace(/`{1,3}[^`\n]*`{1,3}/g, "")
    .trim();

  const words = cleanText.split(/\s+/).filter((w) => w.length > 0);
  const wordCount = words.length;
  const minutes = Math.ceil(wordCount / 200);

  return Math.max(1, minutes);
}

/**
 * Generates an SEO-safe, normalized URL slug from a title string.
 */
export function generateSlug(title: string): string {
  if (!title) return "";
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove non-alphanumeric characters except hyphens and spaces
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
}

export interface SeoCheckItem {
  id: string;
  label: string;
  status: "pass" | "warning" | "error";
  message: string;
  recommendation?: string;
}

export interface BlogSeoAnalysis {
  overallStatus: "good" | "needs-improvement" | "critical";
  checks: SeoCheckItem[];
  wordCount: number;
  readingTimeMinutes: number;
}

/**
 * Analyzes blog post content and metadata against editorial SEO best practices.
 * Provides honest advisory feedback without synthetic numerical score inflation.
 */
export function analyzeBlogSeo(post: Partial<BlogPost>): BlogSeoAnalysis {
  const checks: SeoCheckItem[] = [];

  const title = (post.title || "").trim();
  const seoTitle = (post.seo?.title || title).trim();
  const excerpt = (post.excerpt || "").trim();
  const metaDescription = (post.seo?.description || excerpt).trim();
  const content = (post.content || "").trim();
  const slug = (post.slug || "").trim();
  const featuredImage = (post.featuredImage || "").trim();
  const featuredImageAlt = (post.featuredImageAlt || "").trim();
  const keywords = post.seo?.keywords || post.tags || [];

  // Word count & Read Time
  const cleanWords = content
    .replace(/<[^>]*>/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 0);
  const wordCount = cleanWords.length;
  const readingTimeMinutes = calculateReadingTime(content);

  // 1. Title Length Check
  if (!title) {
    checks.push({
      id: "title-presence",
      label: "Article Title",
      status: "error",
      message: "Article title is missing.",
      recommendation: "Provide a clear, descriptive article title.",
    });
  } else if (title.length < 25) {
    checks.push({
      id: "title-length",
      label: "Article Title Length",
      status: "warning",
      message: `Title is short (${title.length} characters).`,
      recommendation: "Target 30–65 characters for optimal search visibility.",
    });
  } else if (title.length > 70) {
    checks.push({
      id: "title-length",
      label: "Article Title Length",
      status: "warning",
      message: `Title is long (${title.length} characters) and may be truncated on search engines.`,
      recommendation: "Keep titles under 65–70 characters.",
    });
  } else {
    checks.push({
      id: "title-length",
      label: "Article Title Length",
      status: "pass",
      message: `Optimal title length (${title.length} characters).`,
    });
  }

  // 2. SEO Title
  if (!seoTitle) {
    checks.push({
      id: "seo-title",
      label: "SEO Meta Title",
      status: "warning",
      message: "Custom SEO title not specified (will fallback to article title).",
    });
  } else {
    checks.push({
      id: "seo-title",
      label: "SEO Meta Title",
      status: "pass",
      message: `SEO title configured (${seoTitle.length} characters).`,
    });
  }

  // 3. Meta Description Check
  if (!metaDescription) {
    checks.push({
      id: "meta-desc",
      label: "Meta Description",
      status: "error",
      message: "Meta description / excerpt is missing.",
      recommendation: "Add a 120–160 character summary to improve search click-through rates.",
    });
  } else if (metaDescription.length < 90) {
    checks.push({
      id: "meta-desc",
      label: "Meta Description Length",
      status: "warning",
      message: `Description is short (${metaDescription.length} characters).`,
      recommendation: "Aim for 120–160 characters to fully explain article value.",
    });
  } else if (metaDescription.length > 170) {
    checks.push({
      id: "meta-desc",
      label: "Meta Description Length",
      status: "warning",
      message: `Description is long (${metaDescription.length} characters) and will truncate on SERPs.`,
      recommendation: "Keep under 160 characters.",
    });
  } else {
    checks.push({
      id: "meta-desc",
      label: "Meta Description Length",
      status: "pass",
      message: `Optimal meta description length (${metaDescription.length} characters).`,
    });
  }

  // 4. URL Slug Check
  if (!slug) {
    checks.push({
      id: "slug",
      label: "URL Slug",
      status: "error",
      message: "URL slug is missing.",
      recommendation: "Generate a clean, hyphenated URL slug.",
    });
  } else if (slug !== generateSlug(slug)) {
    checks.push({
      id: "slug",
      label: "URL Slug Format",
      status: "warning",
      message: "Slug contains non-standard characters or formatting.",
      recommendation: "Use lowercase alphanumeric characters separated by single hyphens.",
    });
  } else {
    checks.push({
      id: "slug",
      label: "URL Slug Format",
      status: "pass",
      message: `Valid URL slug: /blog/${slug}`,
    });
  }

  // 5. Content Word Count Check
  if (wordCount < 100) {
    checks.push({
      id: "content-length",
      label: "Content Length",
      status: "error",
      message: `Content is very short (${wordCount} words).`,
      recommendation: "Substantive articles should exceed 300 words for search indexation.",
    });
  } else if (wordCount < 300) {
    checks.push({
      id: "content-length",
      label: "Content Length",
      status: "warning",
      message: `Content length is modest (${wordCount} words).`,
      recommendation: "Comprehensive guides often perform best between 600–1,500 words.",
    });
  } else {
    checks.push({
      id: "content-length",
      label: "Content Length",
      status: "pass",
      message: `Sufficient content length (${wordCount} words, ~${readingTimeMinutes} min read).`,
    });
  }

  // 6. Heading Structure Check
  const hasH2 = content.includes("## ") || content.includes("<h2>");
  const hasH3 = content.includes("### ") || content.includes("<h3>");
  if (!hasH2 && wordCount > 200) {
    checks.push({
      id: "heading-hierarchy",
      label: "Heading Structure",
      status: "warning",
      message: "No subheadings (H2) detected in body text.",
      recommendation: "Break long content into scannable sections with H2 and H3 headings.",
    });
  } else {
    checks.push({
      id: "heading-hierarchy",
      label: "Heading Structure",
      status: "pass",
      message: hasH2 && hasH3 ? "Multi-level heading structure detected (H2, H3)." : "Subheadings detected.",
    });
  }

  // 7. Featured Image & Alt Text Check
  if (!featuredImage) {
    checks.push({
      id: "featured-image",
      label: "Featured Image",
      status: "warning",
      message: "Featured image URL is not provided.",
      recommendation: "Add a featured visual asset for rich social sharing cards (Open Graph).",
    });
  } else {
    if (!featuredImageAlt) {
      checks.push({
        id: "image-alt",
        label: "Image Alt Text",
        status: "warning",
        message: "Featured image alt text is missing.",
        recommendation: "Add descriptive alt text for accessibility and image search SEO.",
      });
    } else {
      checks.push({
        id: "featured-image",
        label: "Featured Image & Alt Text",
        status: "pass",
        message: "Featured image and accessibility alt text configured.",
      });
    }
  }

  // 8. Focus Keywords
  if (keywords.length === 0) {
    checks.push({
      id: "keywords",
      label: "Tags & Keywords",
      status: "warning",
      message: "No tags or focus keywords assigned.",
      recommendation: "Assign 2–4 relevant tags to categorize the article.",
    });
  } else {
    checks.push({
      id: "keywords",
      label: "Tags & Keywords",
      status: "pass",
      message: `${keywords.length} tags/keywords defined.`,
    });
  }

  // Overall Status
  const hasError = checks.some((c) => c.status === "error");
  const hasWarning = checks.some((c) => c.status === "warning");

  let overallStatus: "good" | "needs-improvement" | "critical" = "good";
  if (hasError) {
    overallStatus = "critical";
  } else if (hasWarning) {
    overallStatus = "needs-improvement";
  }

  return {
    overallStatus,
    checks,
    wordCount,
    readingTimeMinutes,
  };
}
