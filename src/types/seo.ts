import { BaseEntity } from "./common";

export interface GlobalSeoSettings extends BaseEntity {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  canonicalBaseUrl: string;
  defaultOgImage: string;
  defaultKeywords: string[];
  robotsIndex: boolean;
  robotsFollow: boolean;
  organizationName: string;
  organizationLogo: string;
  googleSiteVerification?: string;
  bingSiteVerification?: string;
}

export interface CustomPageSeo {
  id: string; // encoded path or slug, e.g. "page-home", "page-about"
  routePath: string; // e.g. "/", "/about", "/services"
  title?: string;
  description?: string;
  canonicalUrl?: string;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  keywords?: string[];
  structuredDataType?: "Organization" | "LocalBusiness" | "WebSite" | "Article" | "None";
  customJsonLd?: string;
  updatedAt?: string;
}

export interface PageSeoSummary {
  id: string;
  pageName: string;
  routePath: string;
  seoTitle: string;
  metaDescription: string;
  canonicalUrl?: string;
  hasOgImage: boolean;
  ogImageUrl?: string;
  isIndexable: boolean;
  robotsFollow?: boolean;
  isCustomized: boolean;
  keywords?: string[];
  status: "published" | "draft";
}

export type SeoIssueSeverity = "critical" | "warning" | "good";

export interface SeoAuditIssue {
  id: string;
  pageId: string;
  pageName: string;
  routePath: string;
  severity: SeoIssueSeverity;
  category: "title" | "description" | "canonical" | "social" | "indexing" | "schema";
  message: string;
  recommendation: string;
}

export interface SeoHealthReport {
  overallScore: number; // 0 - 100
  totalPagesChecked: number;
  goodCount: number;
  warningCount: number;
  criticalCount: number;
  issues: SeoAuditIssue[];
}
