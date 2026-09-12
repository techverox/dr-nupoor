import { BaseEntity, SEOMetadata } from "./common";

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  businessHours: string;
  googleMapsEmbedUrl?: string;
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  github?: string;
}

export interface SiteSettings extends BaseEntity {
  siteName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  contact: ContactInfo;
  socials: SocialLinks;
  defaultSEO: SEOMetadata;
  headerContent?: {
    announcementBarText?: string;
    showAnnouncementBar?: boolean;
    announcementLink?: string;
  };
  footerContent?: {
    aboutText: string;
    copyrightText: string;
    badgeText?: string;
  };
}
