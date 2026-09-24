import { collection, addDoc, serverTimestamp as clientServerTimestamp } from "firebase/firestore";
import { getAdminFirestore, FieldValue, type Query } from "@/lib/firebase/admin";
import { getFirebaseFirestore } from "@/lib/firebase/client";
import { COLLECTIONS } from "@/config/firebase";
import { LeadSubmissionPayload, NewsletterSubscriberPayload } from "@/lib/validation/lead";
import { LeadItem, UpdateLeadInput, LeadFilterOptions, LeadStatus } from "@/types/lead";

// Starter fallback leads for local development
export const SEED_LEADS: LeadItem[] = [
  {
    id: "lead-seed-1",
    name: "Rajesh Kulkarni",
    email: "rajesh@kulkarnilabs.com",
    phone: "+91 98230 11223",
    serviceInterestedIn: "Performance Marketing",
    message: "Looking to scale Google Ads and Meta campaigns for B2B diagnostic testing kits.",
    source: "landing_page",
    landingPageSlug: "performance-marketing-blueprint",
    status: "new",
    notes: [
      {
        id: "note-1",
        author: "Admin System",
        note: "Inquiry received via Performance Marketing Blueprint landing page.",
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "lead-seed-2",
    name: "Ananya Mehta",
    email: "ananya@urbanliving.in",
    phone: "+91 99000 88776",
    serviceInterestedIn: "Social Media Marketing",
    message: "Need end-to-end Instagram and LinkedIn management for boutique luxury furniture showroom.",
    source: "contact_form",
    status: "contacted",
    followUpDate: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
    notes: [
      {
        id: "note-2",
        author: "Senior Strategist",
        note: "Initial discovery call completed. Client requested formal commercial proposal.",
        createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 3600000 * 14).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: "lead-seed-3",
    name: "Vikram Singhania",
    email: "vikram@singhaniapharma.com",
    phone: "+91 97111 22334",
    serviceInterestedIn: "Search Engine Optimization",
    message: "Interested in technical SEO audit and international multi-lingual rankings.",
    source: "consultation_cta",
    status: "qualified",
    notes: [
      {
        id: "note-3",
        author: "SEO Lead",
        note: "High intent enterprise account. Budget confirmed > ₹2.5L/mo.",
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: "lead-seed-4",
    name: "Siddharth Joshi",
    email: "siddharth@growthagency.co",
    phone: "+91 98980 44556",
    serviceInterestedIn: "Agency White-Label & Partner Program",
    message: "Managing ₹50L+ monthly Meta & Google ad spend for 18 D2C clients. Seeking white-label media execution.",
    source: "agency_partner_program",
    status: "new",
    notes: [
      {
        id: "note-4",
        author: "Partnership Team",
        note: "High priority B2B partner application. Awaiting introductory alignment call.",
        createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: "lead-seed-5",
    name: "Priya Patel",
    email: "priya@organicskincare.in",
    phone: "+91 99222 33445",
    serviceInterestedIn: "Performance Marketing & Paid Ads",
    message: "Scaling Ayurvedic skincare brand from ₹15L/mo to ₹50L/mo revenue. Need high-ROAS creative scaling.",
    source: "performance_ads_audit",
    status: "follow_up",
    followUpDate: new Date(Date.now() + 86400000 * 1).toISOString().slice(0, 10),
    notes: [
      {
        id: "note-5",
        author: "Media Buyer Lead",
        note: "Completed initial ad account teardown. Identified 42% wasted spend on low-intent keywords.",
        createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
  {
    id: "lead-seed-6",
    name: "Amit Verma",
    email: "amit@fintechsolutions.com",
    phone: "+91 98111 77889",
    serviceInterestedIn: "Omnichannel Growth Retainer",
    message: "Enterprise fintech payment gateway looking for full-funnel organic + paid acquisition and LinkedIn thought leadership.",
    source: "enterprise_expansion",
    status: "converted",
    notes: [
      {
        id: "note-6",
        author: "Managing Director",
        note: "Contract signed! ₹3.5L/month quarterly retainer finalized with kickoff on Monday.",
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
];

let memoryLeads: LeadItem[] = [...SEED_LEADS];

// In-memory rate limiting tracker (IP -> submission timestamps)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_SUBMISSIONS_PER_WINDOW = 5;

/**
 * Checks if the client IP has exceeded the submission rate limit.
 */
export function checkRateLimit(clientIp: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(clientIp) || [];

  // Filter out timestamps outside the sliding window
  const recentTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recentTimestamps.length >= MAX_SUBMISSIONS_PER_WINDOW) {
    return false; // Rate limit exceeded
  }

  recentTimestamps.push(now);
  rateLimitMap.set(clientIp, recentTimestamps);
  return true;
}

export interface CreateLeadResult {
  success: boolean;
  leadId?: string;
  isSpam?: boolean;
  isDuplicate?: boolean;
  message?: string;
  error?: string;
}

/**
 * Persists a validated lead submission into Firestore.
 */
export async function createLead(
  payload: LeadSubmissionPayload,
  clientIp: string
): Promise<CreateLeadResult> {
  // 1. Honeypot check: Bots fill hidden inputs
  if (payload.website_hp && payload.website_hp.trim().length > 0) {
    // Silently discard spam bot submission
    return { success: true, isSpam: true };
  }

  // 2. Submission timing check: Humans take at least 1.5s to read & submit forms
  if (payload.formStartTime && Date.now() - payload.formStartTime < 1500) {
    return { success: true, isSpam: true };
  }

  // 3. IP-based rate limiting check
  if (!checkRateLimit(clientIp)) {
    return {
      success: false,
      error: "Too many requests. Please wait a few minutes before submitting again.",
    };
  }

  // 4. Try Admin SDK Firestore Write (Primary Server-Side Pipeline)
  const adminDb = getAdminFirestore();

  if (adminDb) {
    try {
      const docRef = await adminDb.collection(COLLECTIONS.LEADS).add({
        name: payload.name,
        email: payload.email,
        phone: payload.phone || null,
        serviceInterestedIn: payload.service || null,
        message: payload.message || null,
        source: payload.source,
        sourceUrl: payload.sourceUrl || null,
        formType: payload.formType,
        status: "new",
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });

      return { success: true, leadId: docRef.id };
    } catch (error) {
      console.error("[Clinical Enquiries Engine] Admin Firestore write error:", error);
    }
  }

  // 5. Try Client SDK Firestore Write (Fallback Pipeline)
  const clientDb = getFirebaseFirestore();
  if (clientDb) {
    try {
      const docRef = await addDoc(collection(clientDb, COLLECTIONS.LEADS), {
        name: payload.name,
        email: payload.email,
        phone: payload.phone || null,
        serviceInterestedIn: payload.service || null,
        message: payload.message || null,
        source: payload.source,
        sourceUrl: payload.sourceUrl || null,
        formType: payload.formType,
        status: "new",
        createdAt: clientServerTimestamp(),
        updatedAt: clientServerTimestamp(),
      });

      return { success: true, leadId: docRef.id };
    } catch (error) {
      console.error("[Clinical Enquiries Engine] Client Firestore write error:", error);
    }
  }

  // 6. Local Development Fallback (when Firebase credentials are not yet configured in .env.local)
  console.log("[Clinical Enquiries Engine] Consultation enquiry logged:", {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    service: payload.service,
    source: payload.source,
    timestamp: new Date().toISOString(),
  });

  return { success: true, leadId: `local-lead-${Date.now()}` };
}

/**
 * Persists a newsletter subscriber into Firestore with deduplication and UTM attribution.
 */
export async function createNewsletterSubscriber(
  payload: NewsletterSubscriberPayload,
  clientIp: string
): Promise<CreateLeadResult> {
  if (payload.website_hp && payload.website_hp.trim().length > 0) {
    return { success: true, isSpam: true };
  }

  if (!checkRateLimit(clientIp)) {
    return {
      success: false,
      error: "Too many subscription attempts. Please try again later.",
    };
  }

  const normalizedEmail = payload.email.toLowerCase().trim();
  const adminDb = getAdminFirestore();

  if (adminDb) {
    try {
      // 1. Check for existing subscriber with the same email
      const existingSnap = await adminDb
        .collection(COLLECTIONS.NEWSLETTER_SUBSCRIBERS)
        .where("email", "==", normalizedEmail)
        .limit(1)
        .get();

      if (!existingSnap.empty) {
        const existingDoc = existingSnap.docs[0];
        const existingData = existingDoc.data();

        if (existingData.status === "active") {
          return {
            success: true,
            isDuplicate: true,
            leadId: existingDoc.id,
            message: "You are already subscribed to Dr. Noopur Patel's breast health updates!",
          };
        } else {
          // Reactivate previously unsubscribed contact
          await existingDoc.ref.update({
            status: "active",
            name: payload.name || existingData.name || null,
            source: payload.source || existingData.source,
            utmSource: payload.utmSource || existingData.utmSource || null,
            utmMedium: payload.utmMedium || existingData.utmMedium || null,
            utmCampaign: payload.utmCampaign || existingData.utmCampaign || null,
            subscribedAt: FieldValue.serverTimestamp(),
            unsubscribedAt: null,
            updatedAt: FieldValue.serverTimestamp(),
            ipAddress: clientIp,
          });

          return {
            success: true,
            leadId: existingDoc.id,
            message: "Welcome back! Your newsletter subscription has been reactivated.",
          };
        }
      }

      // 2. Create new subscriber
      const docRef = await adminDb.collection(COLLECTIONS.NEWSLETTER_SUBSCRIBERS).add({
        email: normalizedEmail,
        name: payload.name || null,
        source: payload.source || "website_footer",
        landingPageSlug: payload.landingPageSlug || null,
        utmSource: payload.utmSource || null,
        utmMedium: payload.utmMedium || null,
        utmCampaign: payload.utmCampaign || null,
        utmContent: payload.utmContent || null,
        utmTerm: payload.utmTerm || null,
        referrer: payload.referrer || null,
        status: "active",
        ipAddress: clientIp,
        subscribedAt: FieldValue.serverTimestamp(),
        createdAt: FieldValue.serverTimestamp(),
      });

      return {
        success: true,
        leadId: docRef.id,
        message: "Thank you for subscribing to Dr. Noopur Patel's breast health updates!",
      };
    } catch (error) {
      console.error("[Clinical Newsletter] Admin Firestore write error:", error);
    }
  }

  const clientDb = getFirebaseFirestore();
  if (clientDb) {
    try {
      const docRef = await addDoc(collection(clientDb, COLLECTIONS.NEWSLETTER_SUBSCRIBERS), {
        email: normalizedEmail,
        name: payload.name || null,
        source: payload.source || "website_footer",
        status: "active",
        subscribedAt: clientServerTimestamp(),
        createdAt: clientServerTimestamp(),
      });

      return {
        success: true,
        leadId: docRef.id,
        message: "Thank you for subscribing to Dr. Noopur Patel's breast health updates!",
      };
    } catch (error) {
      console.error("[Clinical Newsletter] Client Firestore write error:", error);
    }
  }

  console.log("[Clinical Newsletter] Subscriber logged:", normalizedEmail);
  return {
    success: true,
    leadId: `local-sub-${Date.now()}`,
    message: "Thank you for subscribing to Dr. Noopur Patel's breast health updates!",
  };
}

/**
 * Retrieves all captured leads with optional search, status filtering, and pagination.
 */
export async function getAllLeadsAdmin(filters?: LeadFilterOptions): Promise<LeadItem[]> {
  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      let query: Query = adminDb.collection(COLLECTIONS.LEADS);

      if (filters?.status && filters.status !== "all") {
        query = query.where("status", "==", filters.status);
      }

      query = query.orderBy("createdAt", "desc");

      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      const snap = await query.get();
      if (!snap.empty) {
        let results = snap.docs.map((doc: any) => {
          const data = doc.data();
          let createdAtStr = new Date().toISOString();
          if (data.createdAt && typeof data.createdAt.toDate === "function") {
            createdAtStr = data.createdAt.toDate().toISOString();
          } else if (typeof data.createdAt === "string") {
            createdAtStr = data.createdAt;
          }

          let updatedAtStr = createdAtStr;
          if (data.updatedAt && typeof data.updatedAt.toDate === "function") {
            updatedAtStr = data.updatedAt.toDate().toISOString();
          } else if (typeof data.updatedAt === "string") {
            updatedAtStr = data.updatedAt;
          }

          return {
            id: doc.id,
            name: data.name || "Anonymous",
            email: data.email || "",
            phone: data.phone || undefined,
            serviceInterestedIn: data.serviceInterestedIn || data.service || undefined,
            message: data.message || undefined,
            source: data.source || "website",
            sourceUrl: data.sourceUrl || undefined,
            status: data.status || "new",
            notes: Array.isArray(data.notes) ? data.notes : [],
            followUpDate: data.followUpDate || undefined,
            formId: data.formId || undefined,
            submissionId: data.submissionId || undefined,
            landingPageId: data.landingPageId || undefined,
            landingPageSlug: data.landingPageSlug || undefined,
            utmSource: data.utmSource || undefined,
            utmMedium: data.utmMedium || undefined,
            utmCampaign: data.utmCampaign || undefined,
            utmContent: data.utmContent || undefined,
            utmTerm: data.utmTerm || undefined,
            referrer: data.referrer || undefined,
            customFields: data.customFields || undefined,
            createdAt: createdAtStr,
            updatedAt: updatedAtStr,
          } as LeadItem;
        });

        if (filters?.search) {
          const q = filters.search.toLowerCase();
          results = results.filter((l: any) =>
            l.name.toLowerCase().includes(q) ||
            l.email.toLowerCase().includes(q) ||
            (l.phone && l.phone.toLowerCase().includes(q)) ||
            (l.serviceInterestedIn && l.serviceInterestedIn.toLowerCase().includes(q))
          );
        }

        return results;
      }
    } catch (err) {
      console.warn("[getAllLeadsAdmin] Firestore query error, falling back to memory:", err);
    }
  }

  let list = memoryLeads;
  if (filters?.status && filters.status !== "all") {
    list = list.filter((l) => l.status === filters.status);
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.phone && l.phone.toLowerCase().includes(q))
    );
  }
  return list;
}

/**
 * Retrieves a single lead by ID for admin review.
 */
export async function getLeadByIdAdmin(id: string): Promise<LeadItem | null> {
  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      const doc = await adminDb.collection(COLLECTIONS.LEADS).doc(id).get();
      if (doc.exists) {
        const data = doc.data()!;
        let createdAtStr = new Date().toISOString();
        if (data.createdAt && typeof data.createdAt.toDate === "function") {
          createdAtStr = data.createdAt.toDate().toISOString();
        } else if (typeof data.createdAt === "string") {
          createdAtStr = data.createdAt;
        }

        return {
          id: doc.id,
          name: data.name || "Anonymous",
          email: data.email || "",
          phone: data.phone || undefined,
          serviceInterestedIn: data.serviceInterestedIn || data.service || undefined,
          message: data.message || undefined,
          source: data.source || "website",
          sourceUrl: data.sourceUrl || undefined,
          status: data.status || "new",
          notes: Array.isArray(data.notes) ? data.notes : [],
          followUpDate: data.followUpDate || undefined,
          formId: data.formId || undefined,
          submissionId: data.submissionId || undefined,
          landingPageId: data.landingPageId || undefined,
          landingPageSlug: data.landingPageSlug || undefined,
          customFields: data.customFields || undefined,
          createdAt: createdAtStr,
          updatedAt: data.updatedAt ? String(data.updatedAt) : createdAtStr,
        } as LeadItem;
      }
    } catch (err) {
      console.warn(`[getLeadByIdAdmin] Firestore query error for ${id}:`, err);
    }
  }

  return memoryLeads.find((l) => l.id === id) || null;
}

/**
 * Updates a lead's status, appends an internal note, or sets follow-up date.
 */
export async function updateLeadAdmin(id: string, input: UpdateLeadInput): Promise<LeadItem> {
  const existing = await getLeadByIdAdmin(id);
  if (!existing) {
    throw new Error(`Lead with ID "${id}" was not found.`);
  }

  const now = new Date().toISOString();
  const updatePayload: Record<string, unknown> = {
    updatedAt: now,
  };

  if (input.status) {
    updatePayload.status = input.status;
  }
  if (input.followUpDate !== undefined) {
    updatePayload.followUpDate = input.followUpDate;
  }

  const notesList = [...(existing.notes || [])];
  if (input.note && input.note.trim().length > 0) {
    const newNote = {
      id: `note-${Date.now()}`,
      author: input.noteAuthor || "Admin User",
      note: input.note.trim(),
      createdAt: now,
    };
    notesList.unshift(newNote);
    updatePayload.notes = notesList;
  }

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      await adminDb.collection(COLLECTIONS.LEADS).doc(id).update(updatePayload);
      const updated = await getLeadByIdAdmin(id);
      if (updated) return updated;
    } catch (err) {
      console.warn(`[updateLeadAdmin] Firestore update error for ${id}:`, err);
    }
  }

  const updatedItem: LeadItem = {
    ...existing,
    ...updatePayload,
    notes: notesList,
    updatedAt: now,
  } as LeadItem;

  memoryLeads = memoryLeads.map((l) => (l.id === id ? updatedItem : l));
  return updatedItem;
}

/**
 * Deletes a lead record from Firestore.
 */
export async function deleteLeadAdmin(id: string): Promise<void> {
  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      await adminDb.collection(COLLECTIONS.LEADS).doc(id).delete();
    } catch (err) {
      console.warn(`[deleteLeadAdmin] Error deleting ${id}:`, err);
    }
  }
  memoryLeads = memoryLeads.filter((l) => l.id !== id);
}

/**
 * Generates an RFC-compliant CSV string for leads with formula injection protection.
 */
export function exportLeadsToCsv(leads: LeadItem[]): string {
  if (leads.length === 0) {
    return "Lead ID,Name,Email,Phone,Service,Status,Source,Campaign,UTM Source,UTM Medium,Follow Up Date,Date Created\n";
  }

  const sanitizeCsvCell = (val: unknown): string => {
    if (val === null || val === undefined) return "";
    let str = typeof val === "object" ? JSON.stringify(val) : String(val);

    // Neutralize formula injection
    if (/^[=+\-@\t\r]/.test(str)) {
      str = "'" + str;
    }

    str = str.replace(/"/g, '""');
    return `"${str}"`;
  };

  const headers = [
    "Lead ID",
    "Name",
    "Email",
    "Phone",
    "Service",
    "Status",
    "Source",
    "Campaign",
    "UTM Source",
    "UTM Medium",
    "Follow Up Date",
    "Date Created",
  ];
  const rows = leads.map((l) => [
    sanitizeCsvCell(l.id),
    sanitizeCsvCell(l.name),
    sanitizeCsvCell(l.email),
    sanitizeCsvCell(l.phone || ""),
    sanitizeCsvCell(l.serviceInterestedIn || ""),
    sanitizeCsvCell(l.status),
    sanitizeCsvCell(l.source),
    sanitizeCsvCell(l.utmCampaign || ""),
    sanitizeCsvCell(l.utmSource || ""),
    sanitizeCsvCell(l.utmMedium || ""),
    sanitizeCsvCell(l.followUpDate || ""),
    sanitizeCsvCell(l.createdAt),
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}

/**
 * Resets leads back to canonical seed defaults.
 * Wipes existing leads in Firestore and re-seeds all 6 canonical blueprints.
 */
export async function resetLeadsAdmin(): Promise<LeadItem[]> {
  const adminDb = getAdminFirestore();

  if (adminDb) {
    try {
      const snap = await adminDb.collection(COLLECTIONS.LEADS).get();
      const deleteBatch = adminDb.batch();
      snap.docs.forEach((doc) => {
        deleteBatch.delete(doc.ref);
      });
      await deleteBatch.commit();

      const insertBatch = adminDb.batch();
      for (const lead of SEED_LEADS) {
        const ref = adminDb.collection(COLLECTIONS.LEADS).doc(lead.id);
        const { id: _, ...data } = lead;
        void _;
        insertBatch.set(ref, data);
      }
      await insertBatch.commit();

      memoryLeads = JSON.parse(JSON.stringify(SEED_LEADS));
      return memoryLeads;
    } catch (err) {
      console.error("[resetLeadsAdmin] Firestore reset error:", err);
    }
  }

  memoryLeads = JSON.parse(JSON.stringify(SEED_LEADS));
  return memoryLeads;
}

/**
 * Creates a manual lead directly from the admin dashboard (e.g. phone call inquiry).
 */
export async function createManualLeadAdmin(input: {
  name: string;
  email: string;
  phone?: string;
  serviceInterestedIn?: string;
  message?: string;
  status?: LeadStatus;
}): Promise<LeadItem> {
  const now = new Date().toISOString();
  const payload: Omit<LeadItem, "id"> = {
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone?.trim() || undefined,
    serviceInterestedIn: input.serviceInterestedIn?.trim() || "General Consultation",
    message: input.message?.trim() || "Manual offline lead inquiry recorded by agency team.",
    source: "manual_admin",
    status: input.status || "new",
    notes: [
      {
        id: `note-${Date.now()}`,
        author: "Admin Team",
        note: "Direct inquiry registered manually via Admin Leads Portal.",
        createdAt: now,
      },
    ],
    createdAt: now,
    updatedAt: now,
  };

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      const docRef = await adminDb.collection(COLLECTIONS.LEADS).add(payload);
      return { id: docRef.id, ...payload };
    } catch (err) {
      console.warn("[createManualLeadAdmin] Firestore error, saving to memory fallback:", err);
    }
  }

  const newLead: LeadItem = { id: `lead-${Date.now()}`, ...payload };
  memoryLeads = [newLead, ...memoryLeads];
  return newLead;
}

