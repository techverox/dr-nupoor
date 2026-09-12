export type LandingPageStatus = "draft" | "published";

export interface LandingPageSectionStyling {
  backgroundColor?: string;
  textColor?: string;
  paddingY?: "sm" | "md" | "lg" | "xl";
  customClasses?: string;
}

export interface LandingPageSection {
  id: string;
  type: "hero" | "features" | "services" | "pricing" | "testimonials" | "faq" | "cta" | "form" | string;
  order: number;
  isVisible: boolean;
  content: Record<string, unknown>;
  styling?: LandingPageSectionStyling;
}

export interface LandingPageCtaConfig {
  primaryCtaLabel: string;
  primaryCtaType: "link" | "scroll_to_form" | "whatsapp" | "phone";
  primaryCtaTarget: string; // URL, anchor, phone or WhatsApp number
  secondaryCtaLabel?: string;
  secondaryCtaType?: "link" | "scroll_to_form" | "whatsapp" | "phone";
  secondaryCtaTarget?: string;
}

export interface LandingPageFormConfig {
  formId?: string; // Reference to reusable form or standard lead form
  formTitle?: string;
  formSubtitle?: string;
  submitButtonText?: string;
  successMessage?: string;
  redirectUrl?: string;
  includePhone?: boolean;
  includeRequirement?: boolean;
  leadSourceTag?: string; // e.g. "landing-page:meta-ads"
}

export interface LandingPageSeo {
  seoTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export interface LandingPageTheme {
  pageBackground?: string;
  showAmbientGrid?: boolean;
}

export interface LandingPage {
  id: string;
  title: string;
  slug: string;
  status: LandingPageStatus;
  templateId?: string; // null or empty for blank canvas, or template identifier
  sections: LandingPageSection[];
  cta: LandingPageCtaConfig;
  form: LandingPageFormConfig;
  seo: LandingPageSeo;
  theme?: LandingPageTheme;
  duplicatedFromId?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
}

export interface CreateLandingPageInput {
  title: string;
  slug: string;
  templateId?: string;
  status?: LandingPageStatus;
  cta?: Partial<LandingPageCtaConfig>;
  form?: Partial<LandingPageFormConfig>;
  seo?: Partial<LandingPageSeo>;
  theme?: Partial<LandingPageTheme>;
  sections?: LandingPageSection[];
}

export interface UpdateLandingPageInput {
  title?: string;
  slug?: string;
  status?: LandingPageStatus;
  templateId?: string;
  sections?: LandingPageSection[];
  cta?: Partial<LandingPageCtaConfig>;
  form?: Partial<LandingPageFormConfig>;
  seo?: Partial<LandingPageSeo>;
  theme?: Partial<LandingPageTheme>;
}

// -----------------------------------------------------------------------------
// STEP 13: REUSABLE COMPONENT LIBRARY TYPES (Master Component vs Page Copy)
// -----------------------------------------------------------------------------

export interface ReusableComponent {
  id: string;
  name: string;
  category: string; // "Hero", "Features", "Pricing", "Testimonials", "FAQ", "Conversion", "Trust", "Site", "Advanced"
  description?: string;
  tags?: string[];
  sectionType: string;
  // Serialized deep snapshot of section content & styling
  sectionContent: Record<string, unknown>;
  sectionStyling?: LandingPageSectionStyling;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReusableComponentInput {
  name: string;
  category: string;
  description?: string;
  tags?: string[];
  sectionType: string;
  sectionContent: Record<string, unknown>;
  sectionStyling?: LandingPageSectionStyling;
}

export interface UpdateReusableComponentInput {
  name?: string;
  category?: string;
  description?: string;
  tags?: string[];
  sectionContent?: Record<string, unknown>;
  sectionStyling?: LandingPageSectionStyling;
}

// -----------------------------------------------------------------------------
// STEP 13: LANDING PAGE TEMPLATES TYPES
// -----------------------------------------------------------------------------

export interface LandingPageTemplate {
  id: string;
  name: string;
  description: string;
  category: "Lead Generation" | "Service" | "Product" | "Campaign" | "General" | string;
  tags?: string[];
  thumbnailUrl?: string;
  badge?: string;
  // Serialized ordered sections for this template
  sections: LandingPageSection[];
  defaultCta?: LandingPageCtaConfig;
  defaultForm?: LandingPageFormConfig;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLandingPageTemplateInput {
  name: string;
  description: string;
  category: string;
  tags?: string[];
  thumbnailUrl?: string;
  badge?: string;
  sections: LandingPageSection[];
  defaultCta?: LandingPageCtaConfig;
  defaultForm?: LandingPageFormConfig;
}

