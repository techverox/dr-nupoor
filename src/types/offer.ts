import { BaseEntity } from "./common";

export type OfferType = "banner" | "popup" | "floating_bar" | "modal";
export type OfferTargeting = "all" | "home_only" | "blog_only" | "services_only" | "custom";
export type OfferFrequency = "always" | "once_per_session" | "once_per_day";
export type OfferStatus = "draft" | "scheduled" | "active" | "expired" | "disabled";

export interface OfferItem extends BaseEntity {
  title: string;
  description: string;
  type: OfferType;
  badgeText?: string;
  imageUrl?: string;
  ctaText: string;
  ctaLink: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  targetPages: OfferTargeting;
  customPaths?: string[];
  priority: number;
  displayFrequency: OfferFrequency;
  utmCampaign?: string;
  utmSource?: string;
  utmMedium?: string;
  computedStatus?: OfferStatus;
}
