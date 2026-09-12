import { BaseEntity, SEOMetadata } from "./common";

export interface CaseStudyMetric {
  label: string;
  value: string;
  description?: string;
}

export interface PortfolioCategory {
  id: string;
  name: string;
  slug: string;
}

export interface PortfolioItem extends BaseEntity {
  title: string;
  slug: string;
  clientName: string;
  industry: string;
  category: string;
  servicesDelivered: string[];
  shortDescription: string;
  challenge: string;
  strategy: string;
  execution: string;
  results: string;
  metrics: CaseStudyMetric[];
  heroImage: string;
  galleryImages?: string[];
  videoUrl?: string;
  projectUrl?: string;
  testimonialId?: string;
  testimonialQuote?: string;
  beforePoints?: string[];
  afterPoints?: string[];
  executionMilestones?: string[];
  keyTakeaway?: string;
  completionDate?: string;
  authorAvatar?: string;
  authorName?: string;
  authorRole?: string;
  categoryKey?: string;
  tags?: string[];
  isFeatured: boolean;
  isPublished: boolean;
  order: number;
  seo: SEOMetadata;
}
