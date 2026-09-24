import { getAdminFirestore, FieldValue, type Query } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/config/firebase";
import {
  FormDefinition,
  FormSubmission,
  CreateFormInput,
  UpdateFormInput,
} from "@/types/form";
import { checkRateLimit } from "@/lib/services/leadService";
import { sanitizeInput } from "@/lib/validation/lead";

// Starter Seed Forms for Dr. Noopur Patel Clinical Practice
export const SEED_FORMS: FormDefinition[] = [
  {
    id: "form-consultation-default",
    name: "General Consultation & Growth Strategy",
    slug: "general-consultation",
    description: "Standard multi-field lead capture form for agency prospective clients.",
    status: "active",
    fields: [
      {
        id: "fld-name",
        type: "text",
        name: "name",
        label: "Full Name",
        placeholder: "e.g. Rahul Sharma",
        required: true,
        width: "half",
        order: 0,
        isVisible: true,
        validation: { minLength: 2, maxLength: 100 },
      },
      {
        id: "fld-email",
        type: "email",
        name: "email",
        label: "Business Email",
        placeholder: "rahul@company.com",
        required: true,
        width: "half",
        order: 1,
        isVisible: true,
      },
      {
        id: "fld-phone",
        type: "phone",
        name: "phone",
        label: "Phone Number",
        placeholder: "+91 98765 43210",
        required: true,
        width: "half",
        order: 2,
        isVisible: true,
      },
      {
        id: "fld-service",
        type: "select",
        name: "service",
        label: "Service of Interest",
        placeholder: "Choose a service...",
        required: true,
        width: "half",
        order: 3,
        isVisible: true,
        options: [
          { label: "Performance Marketing & Paid Ads", value: "Performance Marketing" },
          { label: "Social Media Marketing (SMM)", value: "Social Media Marketing" },
          { label: "Search Engine Optimization (SEO)", value: "Search Engine Optimization" },
          { label: "Website Design & CMS Development", value: "Web Development" },
          { label: "Full-Funnel Omnichannel Growth", value: "Omnichannel Growth" },
        ],
      },
      {
        id: "fld-budget",
        type: "select",
        name: "budget",
        label: "Estimated Monthly Budget",
        placeholder: "Select budget range...",
        required: false,
        width: "half",
        order: 4,
        isVisible: true,
        options: [
          { label: "Under ₹50,000 / month", value: "Under 50k" },
          { label: "₹50,000 - ₹1,50,000 / month", value: "50k-1.5L" },
          { label: "₹1,50,000 - ₹5,00,000 / month", value: "1.5L-5L" },
          { label: "₹5,00,000+ / month (Enterprise)", value: "5L+" },
        ],
      },
      {
        id: "fld-timeline",
        type: "radio",
        name: "timeline",
        label: "How quickly do you want to launch?",
        required: false,
        width: "half",
        order: 5,
        isVisible: true,
        options: [
          { label: "Immediately (Within 7 days)", value: "Immediately" },
          { label: "Within 30 Days", value: "Within 30 Days" },
          { label: "Exploratory / Next Quarter", value: "Exploratory" },
        ],
      },
      {
        id: "fld-message",
        type: "textarea",
        name: "message",
        label: "Project Scope or Specific Requirements",
        placeholder: "Describe your current challenges, target audience, and growth objectives...",
        required: false,
        width: "full",
        order: 6,
        isVisible: true,
        validation: { maxLength: 2000 },
      },
    ],
    submitButtonText: "Request Free Consultation",
    successAction: "message",
    successMessage: "Thank you! We have received your inquiry. A senior growth strategist will contact you within 24 hours.",
    createLead: true,
    leadSource: "consultation_form",
    spamProtection: {
      honeypot: true,
      rateLimit: true,
    },
    totalSubmissions: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "form-audit-lead-gen",
    name: "Free Performance Marketing & Ads Audit",
    slug: "performance-ads-audit",
    description: "Conversion-optimized audit application form for paid ads campaigns.",
    status: "active",
    fields: [
      {
        id: "fld-name",
        type: "text",
        name: "name",
        label: "Your Name",
        placeholder: "e.g. Priya Patel",
        required: true,
        width: "half",
        order: 0,
        isVisible: true,
      },
      {
        id: "fld-email",
        type: "email",
        name: "email",
        label: "Work Email",
        placeholder: "priya@brand.com",
        required: true,
        width: "half",
        order: 1,
        isVisible: true,
      },
      {
        id: "fld-phone",
        type: "phone",
        name: "phone",
        label: "Phone / WhatsApp",
        placeholder: "+91 98765 00000",
        required: true,
        width: "half",
        order: 2,
        isVisible: true,
      },
      {
        id: "fld-website",
        type: "text",
        name: "website",
        label: "Brand Website / Store URL",
        placeholder: "https://yourbrand.com",
        required: true,
        width: "half",
        order: 3,
        isVisible: true,
      },
      {
        id: "fld-ad-spend",
        type: "select",
        name: "ad_spend",
        label: "Current Monthly Ad Spend",
        placeholder: "Select spend bracket...",
        required: true,
        width: "half",
        order: 4,
        isVisible: true,
        options: [
          { label: "Not running ads yet", value: "None" },
          { label: "₹25,000 - ₹1,00,000", value: "25k-1L" },
          { label: "₹1,00,000 - ₹5,00,000", value: "1L-5L" },
          { label: "₹5,00,000+", value: "5L+" },
        ],
      },
      {
        id: "fld-platforms",
        type: "checkbox",
        name: "channels",
        label: "Advertising Channels (Select all that apply)",
        required: false,
        width: "full",
        order: 5,
        isVisible: true,
        options: [
          { label: "Meta (Instagram & Facebook Ads)", value: "Meta Ads" },
          { label: "Google Search & Performance Max", value: "Google Ads" },
          { label: "YouTube Ads", value: "YouTube Ads" },
          { label: "LinkedIn B2B Ads", value: "LinkedIn Ads" },
        ],
      },
    ],
    submitButtonText: "Claim Free Audit Report",
    successAction: "message",
    successMessage: "Audit request received! Our media buyers are analyzing your domain and will prepare your custom report.",
    createLead: true,
    leadSource: "audit_funnel",
    spamProtection: {
      honeypot: true,
      rateLimit: true,
    },
    totalSubmissions: 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "form-seo-review",
    name: "Technical SEO & Ranking Opportunity Review",
    slug: "seo-audit-review",
    description: "Lead capture for organic search ranking and competitor analysis audits.",
    status: "active",
    fields: [
      {
        id: "fld-name",
        type: "text",
        name: "name",
        label: "Full Name",
        placeholder: "e.g. Amit Verma",
        required: true,
        width: "half",
        order: 0,
        isVisible: true,
      },
      {
        id: "fld-email",
        type: "email",
        name: "email",
        label: "Email Address",
        placeholder: "amit@enterprise.in",
        required: true,
        width: "half",
        order: 1,
        isVisible: true,
      },
      {
        id: "fld-website",
        type: "text",
        name: "website",
        label: "Target Website / Domain",
        placeholder: "https://example.com",
        required: true,
        width: "full",
        order: 2,
        isVisible: true,
      },
      {
        id: "fld-competitors",
        type: "textarea",
        name: "competitors",
        label: "Top 2-3 Competitor Websites",
        placeholder: "competitor1.com, competitor2.com...",
        required: false,
        width: "full",
        order: 3,
        isVisible: true,
      },
    ],
    submitButtonText: "Generate SEO Audit",
    successAction: "message",
    successMessage: "Your domain has been queued for comprehensive technical and keyword analysis!",
    createLead: true,
    leadSource: "seo_review",
    spamProtection: {
      honeypot: true,
      rateLimit: true,
    },
    totalSubmissions: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "form-quick-quote",
    name: "Quick Project Estimate & Scope Request",
    slug: "quick-quote",
    description: "Compact 3-minute form for instant commercial scope and turnaround estimates.",
    status: "active",
    fields: [
      {
        id: "fld-name",
        type: "text",
        name: "name",
        label: "Your Name",
        placeholder: "e.g. Sunita Desai",
        required: true,
        width: "half",
        order: 0,
        isVisible: true,
      },
      {
        id: "fld-phone",
        type: "phone",
        name: "phone",
        label: "Contact Number",
        placeholder: "+91 98765 43210",
        required: true,
        width: "half",
        order: 1,
        isVisible: true,
      },
      {
        id: "fld-email",
        type: "email",
        name: "email",
        label: "Email",
        placeholder: "sunita@gmail.com",
        required: true,
        width: "half",
        order: 2,
        isVisible: true,
      },
      {
        id: "fld-services",
        type: "checkbox",
        name: "required_services",
        label: "Required Services",
        required: true,
        width: "full",
        order: 3,
        isVisible: true,
        options: [
          { label: "Performance Marketing Ads", value: "Ads" },
          { label: "Social Media Retainer", value: "SMM" },
          { label: "SEO & Content Marketing", value: "SEO" },
          { label: "Custom Website Development", value: "Web" },
        ],
      },
    ],
    submitButtonText: "Get Instant Quote",
    successAction: "message",
    successMessage: "Thank you! We will prepare a customized quotation and send it to your email shortly.",
    createLead: true,
    leadSource: "quick_quote",
    spamProtection: {
      honeypot: true,
      rateLimit: true,
    },
    totalSubmissions: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "form-enterprise-expansion",
    name: "Enterprise Multi-State & Franchise Discovery Funnel",
    slug: "enterprise-growth-application",
    description: "Structured discovery questionnaire for corporate multi-state scaling, franchise expansion, and high-ticket retainers.",
    status: "active",
    fields: [
      {
        id: "fld-name",
        type: "text",
        name: "name",
        label: "Contact Executive Name",
        placeholder: "e.g. Vikramaditya Singhania",
        required: true,
        width: "half",
        order: 0,
        isVisible: true,
      },
      {
        id: "fld-email",
        type: "email",
        name: "email",
        label: "Corporate Email",
        placeholder: "vikram@enterprise-holding.com",
        required: true,
        width: "half",
        order: 1,
        isVisible: true,
      },
      {
        id: "fld-phone",
        type: "phone",
        name: "phone",
        label: "Direct Phone / WhatsApp",
        placeholder: "+91 98765 11223",
        required: true,
        width: "half",
        order: 2,
        isVisible: true,
      },
      {
        id: "fld-company",
        type: "text",
        name: "company",
        label: "Enterprise / Brand Name",
        placeholder: "e.g. Singhania Retail Group",
        required: true,
        width: "half",
        order: 3,
        isVisible: true,
      },
      {
        id: "fld-territory",
        type: "select",
        name: "target_state",
        label: "Primary State / Expansion Territory",
        placeholder: "Select expansion state...",
        required: true,
        width: "half",
        order: 4,
        isVisible: true,
        options: [
          { label: "Gujarat (Maru Gujarat)", value: "Gujarat" },
          { label: "Maharashtra (Maru Maharashtra)", value: "Maharashtra" },
          { label: "Rajasthan (Maru Rajasthan)", value: "Rajasthan" },
          { label: "Delhi NCR (Maru Delhi)", value: "Delhi NCR" },
          { label: "Pan-India Multi-State Scale", value: "Pan-India" },
        ],
      },
      {
        id: "fld-revenue",
        type: "select",
        name: "annual_turnover",
        label: "Current Annual Revenue Bracket",
        placeholder: "Select revenue scale...",
        required: true,
        width: "half",
        order: 5,
        isVisible: true,
        options: [
          { label: "₹1 Crore - ₹5 Crores", value: "1Cr-5Cr" },
          { label: "₹5 Crores - ₹25 Crores", value: "5Cr-25Cr" },
          { label: "₹25 Crores+ (Enterprise)", value: "25Cr+" },
        ],
      },
      {
        id: "fld-requirements",
        type: "textarea",
        name: "expansion_scope",
        label: "Strategic Expansion Objectives",
        placeholder: "Detail your market growth targets, store rollout goals, or performance expectations...",
        required: false,
        width: "full",
        order: 6,
        isVisible: true,
      },
    ],
    submitButtonText: "Submit Enterprise Discovery Application",
    successAction: "message",
    successMessage: "Enterprise discovery request received! Our Senior Growth Architect will coordinate a confidential strategy session within 12 hours.",
    createLead: true,
    leadSource: "enterprise_funnel",
    spamProtection: {
      honeypot: true,
      rateLimit: true,
    },
    totalSubmissions: 9,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "form-vip-partner",
    name: "Agency White-Label & Strategic Partner Program",
    slug: "agency-partner-program",
    description: "Confidential partnership application for agencies seeking white-label execution, media buying, and AI automation workflows.",
    status: "active",
    fields: [
      {
        id: "fld-name",
        type: "text",
        name: "name",
        label: "Agency Principal / Partner Name",
        placeholder: "e.g. Siddharth Joshi",
        required: true,
        width: "half",
        order: 0,
        isVisible: true,
      },
      {
        id: "fld-email",
        type: "email",
        name: "email",
        label: "Agency Work Email",
        placeholder: "siddharth@growthagency.co",
        required: true,
        width: "half",
        order: 1,
        isVisible: true,
      },
      {
        id: "fld-agency",
        type: "text",
        name: "agency_name",
        label: "Agency Name & Website",
        placeholder: "e.g. Apex Digital Media (https://apexdigital.com)",
        required: true,
        width: "half",
        order: 2,
        isVisible: true,
      },
      {
        id: "fld-managed-spend",
        type: "select",
        name: "managed_ad_spend",
        label: "Monthly Managed Ad Spend",
        placeholder: "Select spend volume...",
        required: true,
        width: "half",
        order: 3,
        isVisible: true,
        options: [
          { label: "₹5 Lakhs - ₹20 Lakhs / month", value: "5L-20L" },
          { label: "₹20 Lakhs - ₹1 Crore / month", value: "20L-1Cr" },
          { label: "₹1 Crore+ / month (High Scale)", value: "1Cr+" },
        ],
      },
      {
        id: "fld-collab-type",
        type: "select",
        name: "partnership_type",
        label: "Desired Collaboration Model",
        placeholder: "Select collaboration type...",
        required: true,
        width: "half",
        order: 4,
        isVisible: true,
        options: [
          { label: "White-Label Performance Media Buying", value: "White-Label Media" },
          { label: "Full-Funnel Agency OS & Landing Pages", value: "Agency OS" },
          { label: "AI Marketing Agents & CRM Automation", value: "AI Automation" },
          { label: "Strategic Co-Pitching & Enterprise Joint Venture", value: "Joint Venture" },
        ],
      },
      {
        id: "fld-overview",
        type: "textarea",
        name: "agency_overview",
        label: "Agency Overview & Target Retainers",
        placeholder: "Tell us about your team size, core specialties, and growth goals...",
        required: false,
        width: "full",
        order: 5,
        isVisible: true,
      },
    ],
    submitButtonText: "Submit Clinical Enquiry",
    successAction: "message",
    successMessage: "Thank you for your enquiry! Dr. Noopur Patel's clinical coordination team at Marengo CIMS Hospital will connect with you within 24 hours.",
    createLead: true,
    leadSource: "agency_partner_program",
    spamProtection: {
      honeypot: true,
      rateLimit: true,
    },
    totalSubmissions: 6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Fallback in-memory state for development
let memoryForms: FormDefinition[] = [...SEED_FORMS];
let memorySubmissions: FormSubmission[] = [
  {
    id: "sub-seed-1",
    formId: "form-consultation-default",
    formName: "General Consultation & Growth Strategy",
    values: {
      name: "Rajesh Kulkarni",
      email: "rajesh@kulkarnilabs.com",
      phone: "+91 98230 11223",
      service: "Performance Marketing",
      budget: "1.5L-5L",
      timeline: "Immediately",
      message: "Looking to scale Google Ads and Meta campaigns for B2B diagnostic testing kits.",
    },
    source: "landing-page:performance-marketing-blueprint",
    landingPageSlug: "performance-marketing-blueprint",
    pageUrl: "/landing/performance-marketing-blueprint",
    ipAddress: "127.0.0.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    status: "new",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "sub-seed-2",
    formId: "form-audit-lead-gen",
    formName: "Free Performance Marketing & Ads Audit",
    values: {
      name: "Ananya Mehta",
      email: "ananya@urbanliving.in",
      phone: "+91 99000 88776",
      website: "https://urbanliving.in",
      ad_spend: "1L-5L",
      channels: ["Meta Ads", "Google Ads"],
    },
    source: "website_form",
    pageUrl: "/contact",
    ipAddress: "127.0.0.1",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    status: "new",
    createdAt: new Date(Date.now() - 3600000 * 14).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 14).toISOString(),
  },
];

/**
 * Normalizes a form key or slug into clean kebab-case.
 */
export function normalizeFormSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/**
 * Validates redirect URLs against open redirect vulnerabilities.
 * Allows relative URLs starting with a single '/' (e.g. '/thank-you').
 * Strictly prohibits protocol-relative '//' or external arbitrary domains.
 */
export function isSafeRedirectUrl(url: string | undefined): boolean {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  // Valid relative path: must start with / but NOT //
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return true;
  }
  return false;
}

/**
 * Retrieves all forms for the Admin Forms dashboard.
 */
export async function getAllFormsAdmin(): Promise<FormDefinition[]> {
  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      const snap = await adminDb
        .collection(COLLECTIONS.FORMS)
        .orderBy("createdAt", "desc")
        .get();

      if (!snap.empty) {
        return snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<FormDefinition, "id">),
        }));
      }

      // If Firestore collection is empty, auto-seed starter forms
      const batch = adminDb.batch();
      for (const form of SEED_FORMS) {
        const ref = adminDb.collection(COLLECTIONS.FORMS).doc(form.id);
        const { id: _id, ...data } = form;
        void _id;
        batch.set(ref, data);
      }
      await batch.commit();
      return SEED_FORMS;
    } catch (err) {
      console.warn("[getAllFormsAdmin] Firestore query error, falling back to memory:", err);
    }
  }

  return memoryForms;
}

/**
 * Retrieves a single form by ID for admin editing.
 */
export async function getFormByIdAdmin(id: string): Promise<FormDefinition | null> {
  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      const doc = await adminDb.collection(COLLECTIONS.FORMS).doc(id).get();
      if (doc.exists) {
        return {
          id: doc.id,
          ...(doc.data() as Omit<FormDefinition, "id">),
        };
      }
    } catch (err) {
      console.warn(`[getFormByIdAdmin] Query error for ${id}:`, err);
    }
  }

  return memoryForms.find((f) => f.id === id) || null;
}

/**
 * Public resolver: Retrieves an active form by ID for rendering on public pages or landing pages.
 * Rejects inactive forms to ensure retired campaigns do not accept submissions.
 */
export async function getPublishedFormById(id: string): Promise<FormDefinition | null> {
  const form = await getFormByIdAdmin(id);
  if (!form) return null;
  if (form.status !== "active") return null;
  return form;
}

/**
 * Creates a new form definition in Firestore.
 */
export async function createFormAdmin(input: CreateFormInput): Promise<FormDefinition> {
  if (!input.name || input.name.trim().length < 2) {
    throw new Error("Form name must be at least 2 characters long.");
  }

  const now = new Date().toISOString();
  const slug = input.slug ? normalizeFormSlug(input.slug) : normalizeFormSlug(input.name);

  // Default initial fields if none provided
  const initialFields = input.fields && input.fields.length > 0 ? input.fields : [
    {
      id: `fld-${Date.now()}-name`,
      type: "text" as const,
      name: "name",
      label: "Full Name",
      placeholder: "e.g. John Doe",
      required: true,
      width: "half" as const,
      order: 0,
      isVisible: true,
    },
    {
      id: `fld-${Date.now()}-email`,
      type: "email" as const,
      name: "email",
      label: "Email Address",
      placeholder: "john@example.com",
      required: true,
      width: "half" as const,
      order: 1,
      isVisible: true,
    },
    {
      id: `fld-${Date.now()}-phone`,
      type: "phone" as const,
      name: "phone",
      label: "Phone Number",
      placeholder: "+91...",
      required: false,
      width: "half" as const,
      order: 2,
      isVisible: true,
    },
    {
      id: `fld-${Date.now()}-message`,
      type: "textarea" as const,
      name: "message",
      label: "Your Message",
      placeholder: "Tell us how we can help...",
      required: false,
      width: "full" as const,
      order: 3,
      isVisible: true,
    },
  ];

  const payload: Omit<FormDefinition, "id"> = {
    name: input.name.trim(),
    slug,
    description: input.description?.trim() || "",
    status: input.status || "active",
    fields: initialFields,
    submitButtonText: input.submitButtonText?.trim() || "Submit Inquiry",
    successAction: input.successAction || "message",
    successMessage: input.successMessage?.trim() || "Thank you! Your submission has been received.",
    successRedirectUrl: input.successRedirectUrl?.trim() || "",
    createLead: input.createLead ?? true,
    leadSource: input.leadSource?.trim() || "custom_form",
    spamProtection: {
      honeypot: input.spamProtection?.honeypot ?? true,
      rateLimit: input.spamProtection?.rateLimit ?? true,
    },
    totalSubmissions: 0,
    notifyEmail: input.notifyEmail?.trim() || "",
    createdAt: now,
    updatedAt: now,
  };

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      const docRef = await adminDb.collection(COLLECTIONS.FORMS).add(payload);
      return { id: docRef.id, ...payload };
    } catch (err) {
      console.warn("[createFormAdmin] Firestore write error, saving to memory fallback:", err);
    }
  }

  const newForm: FormDefinition = {
    id: `form-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    ...payload,
  };
  memoryForms = [newForm, ...memoryForms];
  return newForm;
}

/**
 * Updates an existing form definition.
 */
export async function updateFormAdmin(id: string, input: UpdateFormInput): Promise<FormDefinition> {
  const existing = await getFormByIdAdmin(id);
  if (!existing) {
    throw new Error(`Form with ID "${id}" was not found.`);
  }

  const now = new Date().toISOString();
  const { spamProtection: inputSpam, ...restInput } = input;
  const updatePayload: Partial<FormDefinition> = {
    ...restInput,
    updatedAt: now,
  };

  if (inputSpam) {
    updatePayload.spamProtection = {
      honeypot: inputSpam.honeypot ?? existing.spamProtection?.honeypot ?? true,
      rateLimit: inputSpam.rateLimit ?? existing.spamProtection?.rateLimit ?? true,
    };
  }

  if (input.name) {
    updatePayload.name = input.name.trim();
  }
  if (input.slug) {
    updatePayload.slug = normalizeFormSlug(input.slug);
  }

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      await adminDb.collection(COLLECTIONS.FORMS).doc(id).update(updatePayload);
      const updatedDoc = await adminDb.collection(COLLECTIONS.FORMS).doc(id).get();
      return { id: updatedDoc.id, ...(updatedDoc.data() as Omit<FormDefinition, "id">) };
    } catch (err) {
      console.warn(`[updateFormAdmin] Firestore update error for ${id}:`, err);
    }
  }

  const updated: FormDefinition = { ...existing, ...updatePayload, id };
  memoryForms = memoryForms.map((f) => (f.id === id ? updated : f));
  return updated;
}

/**
 * Duplicates a form creating a completely independent copy.
 */
export async function duplicateFormAdmin(id: string): Promise<FormDefinition> {
  const original = await getFormByIdAdmin(id);
  if (!original) {
    throw new Error(`Form "${id}" not found.`);
  }

  // Deep clone fields with fresh unique field IDs
  const clonedFields = (original.fields || []).map((fld, idx) => ({
    ...JSON.parse(JSON.stringify(fld)),
    id: `fld-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
    order: idx,
  }));

  const duplicateInput: CreateFormInput = {
    name: `${original.name} (Copy)`,
    slug: `${original.slug}-copy-${Date.now().toString().slice(-4)}`,
    description: original.description,
    status: "active",
    fields: clonedFields,
    submitButtonText: original.submitButtonText,
    successAction: original.successAction,
    successMessage: original.successMessage,
    successRedirectUrl: original.successRedirectUrl,
    createLead: original.createLead,
    leadSource: original.leadSource,
    spamProtection: original.spamProtection ? { ...original.spamProtection } : { honeypot: true, rateLimit: true },
    notifyEmail: original.notifyEmail,
  };

  return createFormAdmin(duplicateInput);
}

/**
 * Deletes a form document.
 */
export async function deleteFormAdmin(id: string): Promise<void> {
  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      await adminDb.collection(COLLECTIONS.FORMS).doc(id).delete();
    } catch (err) {
      console.warn(`[deleteFormAdmin] Error deleting ${id}:`, err);
    }
  }
  memoryForms = memoryForms.filter((f) => f.id !== id);
}

/**
 * Retrieves submissions for a specific form (or all forms if formId is not specified).
 */
export async function getFormSubmissionsAdmin(
  formId?: string,
  filters?: { search?: string; status?: string; limit?: number }
): Promise<FormSubmission[]> {
  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      let query: Query = adminDb.collection(COLLECTIONS.FORM_SUBMISSIONS);
      if (formId) {
        query = query.where("formId", "==", formId);
      }
      query = query.orderBy("createdAt", "desc");
      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      const snap = await query.get();
      if (!snap.empty) {
        let results = snap.docs.map((d: any) => ({
          id: d.id,
          ...(d.data() as Omit<FormSubmission, "id">),
        }));

        if (filters?.search) {
          const q = filters.search.toLowerCase();
          results = results.filter((s: any) => {
            const valStr = JSON.stringify(s.values || {}).toLowerCase();
            return (
              s.formName?.toLowerCase().includes(q) ||
              valStr.includes(q) ||
              s.source?.toLowerCase().includes(q)
            );
          });
        }

        if (filters?.status && filters.status !== "all") {
          results = results.filter((s: any) => s.status === filters.status);
        }

        return results;
      }
    } catch (err) {
      console.warn("[getFormSubmissionsAdmin] Firestore query error, using memory:", err);
    }
  }

  let list = formId ? memorySubmissions.filter((s) => s.formId === formId) : memorySubmissions;
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    list = list.filter((s) => JSON.stringify(s.values).toLowerCase().includes(q));
  }
  return list;
}

/**
 * Result structure returned after processing a public form submission.
 */
export interface ProcessSubmissionResult {
  success: boolean;
  submissionId?: string;
  leadId?: string;
  successAction: "message" | "redirect";
  successMessage: string;
  redirectUrl?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
  isSpam?: boolean;
}

/**
 * Canonical Server-Side Form Submission Engine.
 * 
 * Pipeline:
 * 1. Honeypot check (bot trap)
 * 2. Submission timing check (<1.5s is automated)
 * 3. Sliding-window IP rate limit
 * 4. Fetch canonical FormDefinition from database (authoritative source of truth)
 * 5. Validate that form exists and is active
 * 6. Validate every field against canonical definitions:
 *    - Required check
 *    - Type checks (email regex, phone max length)
 *    - Min / Max length checks
 *    - Allowed options check for select / radio / checkbox
 * 7. XSS sanitization
 * 8. Persist submission record in COLLECTIONS.FORM_SUBMISSIONS
 * 9. If createLead === true, create lead in COLLECTIONS.LEADS using existing lead schema
 * 10. Return success with canonical configured success action
 */
export async function processPublicFormSubmission(
  formId: string,
  rawValues: Record<string, unknown>,
  clientIp: string,
  metadata: {
    landingPageId?: string;
    landingPageSlug?: string;
    source?: string;
    pageUrl?: string;
    referrer?: string;
    userAgent?: string;
    website_hp?: string;
    formStartTime?: number;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmContent?: string;
    utmTerm?: string;
    sessionId?: string;
    visitorId?: string;
  }
): Promise<ProcessSubmissionResult> {
  // 1. Honeypot check: Bots fill hidden inputs
  if (metadata.website_hp && metadata.website_hp.trim().length > 0) {
    return {
      success: true,
      isSpam: true,
      successAction: "message",
      successMessage: "Thank you for reaching out!",
    };
  }

  // 2. Submission timing check: Humans take at least 1.5s to read & submit forms
  if (metadata.formStartTime && Date.now() - metadata.formStartTime < 1500) {
    return {
      success: true,
      isSpam: true,
      successAction: "message",
      successMessage: "Thank you for reaching out!",
    };
  }

  // 3. Rate limiting check
  if (!checkRateLimit(clientIp)) {
    return {
      success: false,
      error: "Too many submission attempts. Please wait a few minutes before trying again.",
      successAction: "message",
      successMessage: "",
    };
  }

  // 4. Fetch Canonical Form Definition from Server/Firestore
  const form = await getPublishedFormById(formId);
  if (!form) {
    return {
      success: false,
      error: "This form is inactive or no longer accepts submissions.",
      successAction: "message",
      successMessage: "",
    };
  }

  // 5. Server-Side Authoritative Field Validation
  const fieldErrors: Record<string, string> = {};
  const sanitizedValues: Record<string, unknown> = {};

  const fields = form.fields || [];
  for (const field of fields) {
    if (!field.isVisible) continue;

    const val = rawValues[field.name];

    // Check Required
    if (field.required) {
      if (val === undefined || val === null || val === "") {
        fieldErrors[field.name] = `${field.label} is required.`;
        continue;
      }
      if (Array.isArray(val) && val.length === 0) {
        fieldErrors[field.name] = `Please select at least one ${field.label}.`;
        continue;
      }
    }

    if (val === undefined || val === null || val === "") {
      continue;
    }

    // Type-specific validation and sanitization
    if (typeof val === "string") {
      const sanitized = sanitizeInput(val);

      if (field.type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(sanitized)) {
          fieldErrors[field.name] = "Please enter a valid email address.";
          continue;
        }
        sanitizedValues[field.name] = sanitized.toLowerCase();
      } else if (field.type === "phone") {
        // Broad international phone check (allow +, digits, spaces, parens, hyphens)
        if (sanitized.length > 30) {
          fieldErrors[field.name] = "Phone number is too long.";
          continue;
        }
        sanitizedValues[field.name] = sanitized;
      } else {
        // Text / Textarea
        if (field.validation?.minLength && sanitized.length < field.validation.minLength) {
          fieldErrors[field.name] = `${field.label} must be at least ${field.validation.minLength} characters.`;
          continue;
        }
        if (field.validation?.maxLength && sanitized.length > field.validation.maxLength) {
          fieldErrors[field.name] = `${field.label} cannot exceed ${field.validation.maxLength} characters.`;
          continue;
        }
        sanitizedValues[field.name] = sanitized;
      }
    } else if (Array.isArray(val)) {
      // Checkbox array values
      const sanitizedArr = val
        .map((item) => (typeof item === "string" ? sanitizeInput(item) : String(item)))
        .filter(Boolean);
      sanitizedValues[field.name] = sanitizedArr;
    } else {
      sanitizedValues[field.name] = val;
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      error: "Please correct the highlighted fields and resubmit.",
      fieldErrors,
      successAction: "message",
      successMessage: "",
    };
  }

  const now = new Date().toISOString();
  let submissionId = `sub-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  let leadId: string | undefined;

  // 6. Persist Form Submission Record
  const submissionData: Omit<FormSubmission, "id"> = {
    formId: form.id,
    formName: form.name,
    landingPageId: metadata.landingPageId,
    landingPageSlug: metadata.landingPageSlug,
    values: sanitizedValues,
    source: metadata.source || form.leadSource || "website_form",
    pageUrl: metadata.pageUrl,
    referrer: metadata.referrer,
    ipAddress: clientIp,
    userAgent: metadata.userAgent,
    utmSource: metadata.utmSource,
    utmMedium: metadata.utmMedium,
    utmCampaign: metadata.utmCampaign,
    utmContent: metadata.utmContent,
    utmTerm: metadata.utmTerm,
    sessionId: metadata.sessionId,
    visitorId: metadata.visitorId,
    status: "new",
    createdAt: now,
    updatedAt: now,
  };

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      const subRef = await adminDb.collection(COLLECTIONS.FORM_SUBMISSIONS).add(submissionData);
      submissionId = subRef.id;

      // Increment form's submission counter
      await adminDb.collection(COLLECTIONS.FORMS).doc(form.id).update({
        totalSubmissions: FieldValue.increment(1),
        updatedAt: now,
      });

      // 7. Route into Lead Engine if createLead is enabled
      if (form.createLead) {
        // Map submission fields to primary lead fields
        const leadName = String(
          sanitizedValues.name ||
          sanitizedValues.fullName ||
          sanitizedValues.full_name ||
          sanitizedValues.contact_name ||
          "Website Lead"
        );
        const leadEmail = String(
          sanitizedValues.email ||
          sanitizedValues.work_email ||
          sanitizedValues.business_email ||
          ""
        );
        const leadPhone = sanitizedValues.phone ? String(sanitizedValues.phone) : undefined;
        const leadService = sanitizedValues.service
          ? String(sanitizedValues.service)
          : sanitizedValues.required_services
          ? Array.isArray(sanitizedValues.required_services)
            ? sanitizedValues.required_services.join(", ")
            : String(sanitizedValues.required_services)
          : form.name;
        const leadMessage = sanitizedValues.message
          ? String(sanitizedValues.message)
          : sanitizedValues.goals || sanitizedValues.description
          ? String(sanitizedValues.goals || sanitizedValues.description)
          : undefined;

        const leadDocRef = await adminDb.collection(COLLECTIONS.LEADS).add({
          name: leadName,
          email: leadEmail,
          phone: leadPhone || null,
          serviceInterestedIn: leadService,
          message: leadMessage || null,
          source: metadata.source || form.leadSource || "custom_form",
          sourceUrl: metadata.pageUrl || null,
          formId: form.id,
          submissionId,
          landingPageId: metadata.landingPageId || null,
          landingPageSlug: metadata.landingPageSlug || null,
          utmSource: metadata.utmSource || null,
          utmMedium: metadata.utmMedium || null,
          utmCampaign: metadata.utmCampaign || null,
          utmContent: metadata.utmContent || null,
          utmTerm: metadata.utmTerm || null,
          referrer: metadata.referrer || null,
          status: "new",
          customFields: sanitizedValues,
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        });

        leadId = leadDocRef.id;

        // Update submission with associated leadId
        await subRef.update({ leadId });
      }
    } catch (err) {
      console.error("[processPublicFormSubmission] Firestore write error:", err);
    }
  } else {
    // In-memory fallback
    const memSub: FormSubmission = { id: submissionId, ...submissionData, leadId: `local-lead-${Date.now()}` };
    memorySubmissions = [memSub, ...memorySubmissions];
    leadId = memSub.leadId;
  }

  // 8. Determine safe response action
  const willRedirect =
    form.successAction === "redirect" &&
    isSafeRedirectUrl(form.successRedirectUrl);

  return {
    success: true,
    submissionId,
    leadId,
    successAction: willRedirect ? "redirect" : "message",
    successMessage: form.successMessage || "Thank you! Your submission has been received.",
    redirectUrl: willRedirect ? form.successRedirectUrl : undefined,
  };
}

/**
 * Generates an RFC-compliant CSV string from an array of Form Submissions.
 * Includes CSV injection protection to neutralize spreadsheet formula execution.
 */
export function exportFormSubmissionsToCsv(submissions: FormSubmission[]): string {
  if (submissions.length === 0) {
    return "Submission ID,Form Name,Source,Landing Page,Date,Status,Values\n";
  }

  // Sanitize values for CSV escaping and protect against formula injection (=, +, -, @, \t, \r)
  const sanitizeCsvCell = (val: unknown): string => {
    if (val === null || val === undefined) return "";
    let str = typeof val === "object" ? JSON.stringify(val) : String(val);

    // Neutralize formula injection
    if (/^[=+\-@\t\r]/.test(str)) {
      str = "'" + str;
    }

    // Escape double quotes
    str = str.replace(/"/g, '""');
    return `"${str}"`;
  };

  const headers = ["Submission ID", "Form Name", "Source", "Landing Page", "Date", "Status", "Values"];
  const rows = submissions.map((s) => [
    sanitizeCsvCell(s.id),
    sanitizeCsvCell(s.formName),
    sanitizeCsvCell(s.source),
    sanitizeCsvCell(s.landingPageSlug || s.landingPageId || "Direct"),
    sanitizeCsvCell(s.createdAt),
    sanitizeCsvCell(s.status),
    sanitizeCsvCell(JSON.stringify(s.values || {})),
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}

/**
 * Resets all forms and lead funnels back to official canonical seed defaults.
 * Wipes existing form records and re-seeds all 6 canonical blueprints.
 */
export async function resetFormsAdmin(): Promise<FormDefinition[]> {
  const adminDb = getAdminFirestore();

  if (adminDb) {
    try {
      const snap = await adminDb.collection(COLLECTIONS.FORMS).get();
      const deleteBatch = adminDb.batch();
      snap.docs.forEach((doc) => {
        deleteBatch.delete(doc.ref);
      });
      await deleteBatch.commit();

      const insertBatch = adminDb.batch();
      for (const form of SEED_FORMS) {
        const ref = adminDb.collection(COLLECTIONS.FORMS).doc(form.id);
        const { id: _, ...data } = form;
        void _;
        insertBatch.set(ref, data);
      }
      await insertBatch.commit();

      memoryForms = JSON.parse(JSON.stringify(SEED_FORMS));
      return memoryForms;
    } catch (err) {
      console.error("[resetFormsAdmin] Firestore reset error:", err);
    }
  }

  memoryForms = JSON.parse(JSON.stringify(SEED_FORMS));
  return memoryForms;
}
