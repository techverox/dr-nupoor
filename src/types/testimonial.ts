import { BaseEntity } from "./common";

export type StoryStatus = "pending" | "approved" | "rejected";

export type StoryCategory =
  | "Breast Cancer"
  | "Oncoplastic Surgery"
  | "Breast Reconstruction"
  | "Benign Conditions"
  | "Early Detection"
  | "General Care";

export interface TestimonialItem extends BaseEntity {
  clientName: string;
  clientRole?: string;
  companyName: string;
  companyLogo?: string;
  clientAvatar?: string;
  rating: number; // 1 to 5
  testimonial: string;
  serviceReceived?: string;
  isFeatured: boolean;
  isPublished: boolean;
  order: number;

  // Patient Story & Review Specific Fields
  realName?: string;
  isAnonymous?: boolean;
  city?: string;
  category?: StoryCategory | string;
  mediaType?: "text" | "video" | "photo";
  videoUrl?: string;
  videoDuration?: string;
  photoUrl?: string;
  phone?: string;
  email?: string;
  verifiedConsent?: boolean;
  status?: StoryStatus;
  submittedAt?: string;
  adminNotes?: string;
}
