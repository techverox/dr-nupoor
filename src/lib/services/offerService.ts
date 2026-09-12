import { FieldValue } from "firebase-admin/firestore";
import { getAdminFirestore } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/config/firebase";
import { OfferItem, OfferTargeting, OfferStatus } from "@/types";
import { cachedFirestoreRead, invalidateFirestoreCache } from "@/lib/utils/firestoreCache";

export const CANONICAL_OFFERS: OfferItem[] = [
  {
    id: "offer-growth-audit",
    title: "Claim Your Free Q1 Performance & SEO Growth Audit",
    description: "Unlock your tailored organic revenue roadmap and high-intent conversion diagnosis with our senior director pod.",
    type: "banner",
    badgeText: "LIMITED SLOTS",
    ctaText: "Claim Free Audit",
    ctaLink: "/contact",
    isActive: true,
    priority: 10,
    targetPages: "all",
    displayFrequency: "once_per_session",
    utmCampaign: "growth_audit_q1",
    utmSource: "website_banner",
    utmMedium: "promotional_bar",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "offer-retainer-discount",
    title: "Special 20% Off Growth & Meta Ads Strategy Retainer",
    description: "Full-scale growth engineering, high-ROAS creative sprints & Meta Partner media buying with zero onboarding fee.",
    type: "floating_bar",
    badgeText: "EXCLUSIVE 20% DEAL",
    ctaText: "Claim 20% Off",
    ctaLink: "/contact",
    isActive: true,
    priority: 9,
    targetPages: "all",
    displayFrequency: "always",
    utmCampaign: "retainer_discount_20",
    utmSource: "floating_bar",
    utmMedium: "onsite_cta",
    createdAt: "2026-01-05T00:00:00Z",
    updatedAt: "2026-01-05T00:00:00Z",
  },
  {
    id: "offer-restromitra-launch",
    title: "New: RestroMitra Cloud POS & WhatsApp Billing Live!",
    description: "Experience instant QR dining, contact-free ordering, live kitchen KDS & automated WhatsApp bills for restaurants.",
    type: "banner",
    badgeText: "PRODUCT LAUNCH",
    ctaText: "Explore RestroMitra",
    ctaLink: "/contact?product=restromitra",
    isActive: true,
    priority: 8,
    targetPages: "home_only",
    displayFrequency: "once_per_day",
    utmCampaign: "restromitra_launch",
    utmSource: "website_banner",
    utmMedium: "home_hero",
    createdAt: "2026-01-10T00:00:00Z",
    updatedAt: "2026-01-10T00:00:00Z",
  },
  {
    id: "offer-blueprint-pilot",
    title: "Performance Marketing Blueprint: 14-Day Risk-Free Pilot",
    description: "Scale paid acquisition with data-driven creative hooks, full conversion tracking setup, and audited CAC benchmarks.",
    type: "popup",
    badgeText: "14-DAY SPRINT",
    ctaText: "View Blueprint",
    ctaLink: "/landing/performance-marketing-blueprint",
    isActive: false,
    priority: 7,
    targetPages: "services_only",
    displayFrequency: "once_per_session",
    utmCampaign: "blueprint_pilot",
    utmSource: "slidein_popup",
    utmMedium: "services_intent",
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-01-15T00:00:00Z",
  },
  {
    id: "offer-meta-partner-audit",
    title: "High-ROAS Meta Ads Creative Audit & Tracking Health Check",
    description: "Stop ad spend leakage. Comprehensive CAPI audit, audience deduplication, and creative fatigue diagnosis.",
    type: "floating_bar",
    badgeText: "META AUDIT",
    ctaText: "Book Ad Audit",
    ctaLink: "/services/meta-partner",
    isActive: false,
    priority: 6,
    targetPages: "services_only",
    displayFrequency: "once_per_day",
    utmCampaign: "meta_partner_audit",
    utmSource: "floating_bar",
    utmMedium: "meta_service",
    createdAt: "2026-01-20T00:00:00Z",
    updatedAt: "2026-01-20T00:00:00Z",
  },
  {
    id: "offer-vip-partner",
    title: "VIP Agency Partner White-Label Program Enrollment",
    description: "Scale client deliverables with DigiVigee's dedicated execution pods under your own agency brand.",
    type: "modal",
    badgeText: "AGENCY NETWORK",
    ctaText: "Apply as Partner",
    ctaLink: "/forms/vip-partner",
    isActive: false,
    priority: 5,
    targetPages: "all",
    displayFrequency: "once_per_session",
    utmCampaign: "vip_partner_enroll",
    utmSource: "modal_takeover",
    utmMedium: "partner_funnel",
    createdAt: "2026-01-25T00:00:00Z",
    updatedAt: "2026-01-25T00:00:00Z",
  },
];

export const DEFAULT_SEED_OFFERS = CANONICAL_OFFERS;

// In-memory runtime store for real-time mutations and zero-downtime quota resilience
const globalForOffers = globalThis as unknown as {
  __DIGIVIGEE_OFFERS_STORE__?: Map<string, OfferItem>;
};

const offersStore =
  globalForOffers.__DIGIVIGEE_OFFERS_STORE__ ||
  new Map<string, OfferItem>();

if (!globalForOffers.__DIGIVIGEE_OFFERS_STORE__) {
  globalForOffers.__DIGIVIGEE_OFFERS_STORE__ = offersStore;
  CANONICAL_OFFERS.forEach((o) => offersStore.set(o.id, { ...o }));
}

/**
 * Computes the real-time operational status of an offer based on dates and active toggle.
 */
export function getOfferComputedStatus(offer: OfferItem): OfferStatus {
  if (!offer.isActive) return "disabled";
  const now = new Date();

  if (offer.startDate) {
    const start = new Date(offer.startDate);
    if (!isNaN(start.getTime()) && start > now) {
      return "scheduled";
    }
  }

  if (offer.endDate) {
    const end = new Date(offer.endDate);
    if (!isNaN(end.getTime()) && end < now) {
      return "expired";
    }
  }

  return "active";
}

/**
 * Lists all promotional offers for admin management.
 */
export async function getAllOffersAdmin(): Promise<OfferItem[]> {
  const adminDb = getAdminFirestore();

  const getFallback = (): OfferItem[] => {
    const stored = Array.from(offersStore.values()).map((o) => ({
      ...o,
      computedStatus: getOfferComputedStatus(o),
    }));

    if (stored.length > 0) {
      return stored.sort((a, b) => (b.priority || 0) - (a.priority || 0));
    }

    return DEFAULT_SEED_OFFERS.map((o) => ({
      ...o,
      computedStatus: getOfferComputedStatus(o),
    }));
  };

  if (adminDb) {
    try {
      return await cachedFirestoreRead<OfferItem[]>(
        "offers_admin_all",
        180000,
        async () => {
          const snap = await adminDb
            .collection(COLLECTIONS.OFFERS)
            .orderBy("priority", "desc")
            .get();

          if (snap.empty) return getFallback();

          return snap.docs.map((doc) => {
            const d = doc.data();
            const offer = {
              id: doc.id,
              ...d,
              createdAt: d.createdAt?.toDate ? d.createdAt.toDate().toISOString() : d.createdAt || new Date().toISOString(),
              updatedAt: d.updatedAt?.toDate ? d.updatedAt.toDate().toISOString() : d.updatedAt,
            } as OfferItem;

            offer.computedStatus = getOfferComputedStatus(offer);
            offersStore.set(doc.id, offer);
            return offer;
          });
        },
        getFallback
      );
    } catch (e) {
      console.warn("[getAllOffersAdmin] Firestore read fallback (quota/offline):", (e as { message?: string })?.message || "Using memory store");
    }
  }

  return getFallback();
}

/**
 * Returns active offers matching schedule and page targeting rules for public site display.
 */
export async function getActiveOffersPublic(currentPath: string = "/"): Promise<OfferItem[]> {
  const allOffers = await getAllOffersAdmin();

  return allOffers.filter((offer) => {
    // 1. Must be computed as active (enabled and within date window)
    if (getOfferComputedStatus(offer) !== "active") return false;

    // 2. Page targeting rule
    const targeting: OfferTargeting = offer.targetPages || "all";
    if (targeting === "all") return true;
    if (targeting === "home_only") return currentPath === "/";
    if (targeting === "blog_only") return currentPath.startsWith("/blog");
    if (targeting === "services_only") return currentPath.startsWith("/services");
    if (targeting === "custom") {
      return (offer.customPaths || []).includes(currentPath);
    }

    return true;
  });
}

/**
 * Creates or updates an offer document.
 */
export async function saveOffer(
  data: Partial<OfferItem>,
  id?: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  const offerId = id || `offer-${Date.now()}`;
  const existing = offersStore.get(offerId) || DEFAULT_SEED_OFFERS.find((o) => o.id === offerId);
  const now = new Date().toISOString();

  const cleanOffer: OfferItem = {
    id: offerId,
    title: (data.title || existing?.title || "").trim(),
    description: (data.description || existing?.description || "").trim(),
    type: data.type || existing?.type || "banner",
    badgeText: data.badgeText !== undefined ? data.badgeText : existing?.badgeText,
    imageUrl: data.imageUrl !== undefined ? data.imageUrl : existing?.imageUrl,
    ctaText: (data.ctaText || existing?.ctaText || "Learn More").trim(),
    ctaLink: (data.ctaLink || existing?.ctaLink || "/contact").trim(),
    isActive: data.isActive !== undefined ? Boolean(data.isActive) : (existing?.isActive !== undefined ? existing.isActive : true),
    startDate: data.startDate !== undefined ? data.startDate : existing?.startDate,
    endDate: data.endDate !== undefined ? data.endDate : existing?.endDate,
    targetPages: data.targetPages || existing?.targetPages || "all",
    customPaths: Array.isArray(data.customPaths) ? data.customPaths : (existing?.customPaths || []),
    priority: Number(data.priority) || existing?.priority || 1,
    displayFrequency: data.displayFrequency || existing?.displayFrequency || "once_per_session",
    utmCampaign: data.utmCampaign !== undefined ? data.utmCampaign : existing?.utmCampaign,
    utmSource: data.utmSource !== undefined ? data.utmSource : existing?.utmSource,
    utmMedium: data.utmMedium !== undefined ? data.utmMedium : existing?.utmMedium,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };
  cleanOffer.computedStatus = getOfferComputedStatus(cleanOffer);

  // 1. Immediately store in runtime store so UI state and public site never fail
  offersStore.set(offerId, cleanOffer);
  invalidateFirestoreCache("offers");

  // 2. Try Firestore persistence
  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      const cleanData: Record<string, unknown> = {
        ...cleanOffer,
        updatedAt: FieldValue.serverTimestamp(),
      };
      if (!id) {
        cleanData.createdAt = FieldValue.serverTimestamp();
      }
      await adminDb.collection(COLLECTIONS.OFFERS).doc(offerId).set(cleanData, { merge: true });
    } catch (e) {
      console.warn("[saveOffer] Firestore write warning (quota/offline), saved to runtime store:", (e as { message?: string })?.message || e);
    }
  }

  return { success: true, id: offerId };
}

/**
 * Deletes an offer.
 */
export async function deleteOffer(id: string): Promise<{ success: boolean; error?: string }> {
  offersStore.delete(id);
  invalidateFirestoreCache("offers");

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      await adminDb.collection(COLLECTIONS.OFFERS).doc(id).delete();
    } catch (e) {
      console.warn("[deleteOffer] Firestore delete warning (quota/offline):", (e as { message?: string })?.message || e);
    }
  }

  return { success: true };
}

/**
 * Toggles an offer's active status.
 */
export async function toggleOfferStatus(
  id: string,
  isActive?: boolean
): Promise<{ success: boolean; error?: string }> {
  // 1. Find existing from memory store or seed
  let existing = offersStore.get(id);
  if (!existing) {
    const seed = DEFAULT_SEED_OFFERS.find((o) => o.id === id);
    if (seed) existing = { ...seed };
  }

  const nextActive = isActive !== undefined
    ? Boolean(isActive)
    : existing
      ? !existing.isActive
      : true;

  if (existing) {
    existing.isActive = nextActive;
    existing.updatedAt = new Date().toISOString();
    existing.computedStatus = getOfferComputedStatus(existing);
    offersStore.set(id, { ...existing });
    invalidateFirestoreCache("offers");
  } else {
    const newOffer: OfferItem = {
      id,
      title: "Promotional Offer",
      description: "",
      type: "banner",
      targetPages: "all",
      priority: 1,
      isActive: nextActive,
      ctaText: "Learn More",
      ctaLink: "/contact",
      displayFrequency: "once_per_session",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      computedStatus: nextActive ? "active" : "disabled",
    };
    offersStore.set(id, newOffer);
  }

  // 2. Try Firestore persistence
  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      await adminDb.collection(COLLECTIONS.OFFERS).doc(id).set(
        {
          isActive: nextActive,
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    } catch (e) {
      console.warn("[toggleOfferStatus] Firestore write warning (quota/offline), updated runtime store:", (e as { message?: string })?.message || e);
    }
  }

  return { success: true };
}

/**
 * Resets all offers to canonical defaults in Firestore and runtime memory store.
 */
export async function resetOffersAdmin(): Promise<{ success: boolean; offers: OfferItem[]; message: string; error?: string }> {
  offersStore.clear();
  CANONICAL_OFFERS.forEach((o) => offersStore.set(o.id, { ...o, computedStatus: getOfferComputedStatus(o) }));
  invalidateFirestoreCache("offers");

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      // 1. Delete existing documents
      const existingSnap = await adminDb.collection(COLLECTIONS.OFFERS).get();
      if (!existingSnap.empty) {
        const batch = adminDb.batch();
        existingSnap.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
      }

      // 2. Re-seed canonical offers
      const reseedBatch = adminDb.batch();
      for (const offer of CANONICAL_OFFERS) {
        const docRef = adminDb.collection(COLLECTIONS.OFFERS).doc(offer.id);
        reseedBatch.set(docRef, {
          ...offer,
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        });
      }
      await reseedBatch.commit();
    } catch (e) {
      console.warn("[resetOffersAdmin] Firestore reset warning (quota/offline), memory store updated:", (e as { message?: string })?.message || e);
    }
  }

  const freshOffers = await getAllOffersAdmin();
  return {
    success: true,
    offers: freshOffers,
    message: "Successfully reset to 6 canonical DigiVigee banners and popups.",
  };
}
