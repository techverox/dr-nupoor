import { BaseEntity } from "./common";

export type SubscriberStatus = "active" | "unsubscribed";

export interface NewsletterSubscriber extends BaseEntity {
  email: string;
  name?: string;
  status: SubscriberStatus;
  source?: string;
  subscribedAt: string;
  unsubscribedAt?: string;
  ipAddress?: string;
  landingPageSlug?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  referrer?: string;
}

export interface SubscriberExportRow {
  email: string;
  name?: string;
  status: string;
  source: string;
  campaign?: string;
  subscribedAt: string;
}
