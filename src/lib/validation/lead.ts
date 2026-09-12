import { z } from "zod";

/**
 * Strips HTML tags, script payloads, and control characters to prevent XSS.
 */
export function sanitizeInput(input: string): string {
  if (!input) return "";
  return input
    .replace(/<[^>]*>?/gm, "") // Strip HTML tags
    .replace(/javascript:/gi, "") // Strip inline JS schemes
    .replace(/data:/gi, "") // Strip data schemes
    .trim();
}

/**
 * Zod validation schema for incoming public lead submissions.
 */
export const leadSubmissionSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long.")
    .max(100, "Name cannot exceed 100 characters.")
    .transform(sanitizeInput),
  email: z
    .string()
    .email("Please provide a valid email address.")
    .max(150, "Email cannot exceed 150 characters.")
    .transform((val) => sanitizeInput(val).toLowerCase()),
  phone: z
    .string()
    .max(25, "Phone number cannot exceed 25 characters.")
    .optional()
    .or(z.literal(""))
    .transform((val) => (val ? sanitizeInput(val) : undefined)),
  service: z
    .string()
    .max(100, "Service name cannot exceed 100 characters.")
    .optional()
    .or(z.literal(""))
    .transform((val) => (val ? sanitizeInput(val) : undefined)),
  message: z
    .string()
    .max(2000, "Message cannot exceed 2,000 characters.")
    .optional()
    .or(z.literal(""))
    .transform((val) => (val ? sanitizeInput(val) : undefined)),
  source: z
    .enum([
      "contact_form",
      "hero_form",
      "consultation_cta",
      "whatsapp",
      "landing_page",
      "manual",
    ])
    .default("contact_form"),
  sourceUrl: z.string().max(500).optional(),
  formType: z.string().max(50).default("contact"),
  // Honeypot field for bot detection (must remain empty for human submissions)
  website_hp: z.string().optional().or(z.literal("")),
  // Timestamp when form was loaded in the client (to detect instant automated bot submissions)
  formStartTime: z.number().optional(),
});

export type LeadSubmissionPayload = z.infer<typeof leadSubmissionSchema>;

/**
 * Newsletter subscriber validation schema.
 */
export const newsletterSubscriberSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address.")
    .max(150, "Email cannot exceed 150 characters.")
    .transform((val) => sanitizeInput(val).toLowerCase()),
  name: z.string().max(100).optional().transform((val) => (val ? sanitizeInput(val) : undefined)),
  source: z.string().max(100).default("website_footer"),
  landingPageSlug: z.string().max(150).optional(),
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
  utmContent: z.string().max(100).optional(),
  utmTerm: z.string().max(100).optional(),
  referrer: z.string().max(300).optional(),
  website_hp: z.string().optional().or(z.literal("")),
});

export type NewsletterSubscriberPayload = z.infer<typeof newsletterSubscriberSchema>;
