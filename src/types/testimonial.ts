import { BaseEntity } from "./common";

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
}
