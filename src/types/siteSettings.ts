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

export interface CustomScriptsSettings {
  isEnabled: boolean;
  headerCode?: string; // Injected into <head> (Google Analytics, GTM container, Meta Pixel base, verification meta tags)
  bodyCode?: string;   // Injected at start of <body> (GTM noscript fallback, body pixels)
  footerCode?: string; // Injected before closing </body> (Live chat widgets, WhatsApp button, footer tracking)
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
  customScripts?: CustomScriptsSettings;
}

