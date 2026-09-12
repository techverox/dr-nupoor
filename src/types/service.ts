import { BaseEntity, SEOMetadata } from "./common";

export interface ServicePackage {
  id: string;
  name: string;
  price?: string;
  billingPeriod?: "monthly" | "one-time" | "custom";
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

export interface ServiceBenefit {
  title: string;
  description: string;
  icon?: string;
}

export interface ServiceCapability {
  title: string;
  description: string;
  icon?: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem extends BaseEntity {
  title: string;
  subtitle?: string;
  slug: string;
  shortDescription: string;
  detailedDescription: string;
  heroImage?: string;
  icon?: string;
  order: number;
  isPublished: boolean;
  isFeatured?: boolean;
  problemStatement?: string;
  solutionStatement?: string;
  outcomeStatement?: string;
  capabilities?: ServiceCapability[];
  benefits?: ServiceBenefit[];
  deliverables?: string[];
  packages?: ServicePackage[];
  faqs?: ServiceFAQ[];
  relatedServiceSlugs?: string[];
  relatedPortfolioSlugs?: string[];
  seo: SEOMetadata;
}
