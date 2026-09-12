import { BaseEntity } from "./common";

export type LeadStatus =
  | "new"
  | "contacted"
  | "follow_up"
  | "qualified"
  | "converted"
  | "lost";

export type LeadSource =
  | "contact_form"
  | "hero_form"
  | "consultation_cta"
  | "whatsapp"
  | "landing_page"
  | "manual";

export interface LeadNote {
  id: string;
  author: string;
  note: string;
  createdAt: string;
}

export interface LeadItem extends BaseEntity {
  name: string;
  email: string;
  phone?: string;
  serviceInterestedIn?: string;
  service?: string; // backwards compatibility
  message?: string;
  source: LeadSource | string;
  sourceUrl?: string;
  status: LeadStatus;
  notes?: LeadNote[];
  followUpDate?: string;
  formId?: string;
  submissionId?: string;
  landingPageId?: string;
  landingPageSlug?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  referrer?: string;
  customFields?: Record<string, string | number | boolean>;
}

export interface UpdateLeadInput {
  status?: LeadStatus;
  followUpDate?: string;
  note?: string;
  noteAuthor?: string;
}

export interface LeadFilterOptions {
  status?: string;
  search?: string;
  source?: string;
  limit?: number;
}
