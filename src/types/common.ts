/**
 * Base common types for all entities in the Dr. Noopur Patel Practice Platform.
 */

export interface BaseEntity {
  id: string;
  createdAt: string; // ISO 8601 string representation for portable SSR/Client serialization
  updatedAt: string; // ISO 8601 string representation
}

export interface SEOMetadata {
  title: string;
  description: string;
  slug: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string[];
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  cursor?: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  nextCursor?: string;
}
