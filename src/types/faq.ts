import { BaseEntity } from "./common";

export interface FAQCategory {
  id: string;
  name: string;
  slug: string;
}

export interface FAQItem extends BaseEntity {
  question: string;
  answer: string;
  category: string;
  order: number;
  isPublished: boolean;
  isFeatured?: boolean;
}
