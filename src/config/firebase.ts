/**
 * Centralized Firestore collection name registry.
 * Using constant definitions prevents string typos and provides IDE autocompletion across the codebase.
 */
export const COLLECTIONS = {
  SERVICES: "services",
  PORTFOLIO: "portfolio",
  BLOGS: "blogs",
  BLOG_CATEGORIES: "blogCategories",
  BLOG_TAGS: "blogTags",
  TESTIMONIALS: "testimonials",
  FAQS: "faqs",
  TEAM: "team",
  LEADS: "leads",
  FORMS: "forms",
  FORM_SUBMISSIONS: "formSubmissions",
  NAVIGATION: "navigation",
  SITE_SETTINGS: "siteSettings",
  NEWSLETTER_SUBSCRIBERS: "newsletterSubscribers",
  OFFERS: "offers",
  REDIRECTS: "redirects",
  LANDING_PAGES: "landingPages",
  REUSABLE_COMPONENTS: "reusableComponents",
  LANDING_TEMPLATES: "landingTemplates",
  PAGES: "pages",
  MEDIA: "media",
  SEO_SETTINGS: "seoSettings",
  ANALYTICS_EVENTS: "analyticsEvents",
  ADMIN_USERS: "adminUsers",
  ROLES: "roles",
  AUDIT_LOGS: "auditLogs",
  CONTENT_REVISIONS: "contentRevisions",
  ADMIN_CREDENTIALS: "adminCredentials",
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];
