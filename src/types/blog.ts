import { BaseEntity, SEOMetadata } from "./common";

export type BlogStatus = "draft" | "scheduled" | "published" | "archived";

export interface BlogAuthor {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
  bio?: string;
}

export interface BlogCategory extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  order: number;
}

export interface BlogTag extends BaseEntity {
  name: string;
  slug: string;
}

export interface BlogPost extends BaseEntity {
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt?: string;
  author: BlogAuthor;
  status: BlogStatus;
  publishedAt?: string;
  scheduledAt?: string;
  categoryId: string;
  categoryName: string;
  tags: string[];
  content: string; // Markdown or sanitized HTML structure
  readingTimeMinutes: number;
  isFeatured?: boolean;
  relatedPostSlugs?: string[];
  seo: SEOMetadata;
}

export interface CmsBlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  featuredImageAlt: string;
  categoryName: string;
  categoryId: string;
  tagsText: string;
  authorName: string;
  authorRole: string;
  authorBio: string;
  authorAvatar: string;
  isFeatured: boolean;
  status: BlogStatus;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  keywordsText: string;
}

