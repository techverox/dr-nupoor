import { getAdminFirestore, FieldValue } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/config/firebase";
import { NewsletterSubscriber, SubscriberStatus } from "@/types";

/**
 * Canonical audience subscribers for Dr. Noopur Patel clinical practice.
 * Synchronized with website routes and breast health awareness guides.
 */
export const CANONICAL_SUBSCRIBERS: NewsletterSubscriber[] = [
  {
    id: "sub-seed-1",
    email: "priya.sharma.ahmedabad@gmail.com",
    name: "Priya Sharma",
    status: "active",
    source: "Blog: Early Signs of Breast Cancer",
    landingPageSlug: "patient-guide",
    utmSource: "google",
    utmMedium: "organic",
    utmCampaign: "breast-cancer-awareness",
    subscribedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "sub-seed-2",
    email: "neha.patel.cims@yahoo.com",
    name: "Neha Patel",
    status: "active",
    source: "Homepage Breast Health Bulletin",
    landingPageSlug: "homepage-clinic",
    utmSource: "meta",
    utmMedium: "cpc",
    utmCampaign: "annual-mammogram-drive",
    subscribedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "sub-seed-3",
    email: "dr.bhavna.trivedi@hospitalcare.org",
    name: "Dr. Bhavna Trivedi",
    status: "active",
    source: "Self-Breast Exam Guide Download",
    landingPageSlug: "self-exam-guide",
    utmSource: "google",
    utmMedium: "cpc",
    utmCampaign: "physician-referral-network",
    subscribedAt: new Date(Date.now() - 86400000 * 9).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 9).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 9).toISOString(),
  },
  {
    id: "sub-seed-4",
    email: "ananya.sen.surat@outlook.com",
    name: "Ananya Sen",
    status: "active",
    source: "Website Footer Newsletter",
    utmSource: "instagram",
    utmMedium: "organic",
    utmCampaign: "pink-october-health-bulletin",
    subscribedAt: new Date(Date.now() - 86400000 * 14).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 14).toISOString(),
  },
  {
    id: "sub-seed-5",
    email: "rekha.mehta.vadodara@gmail.com",
    name: "Rekha Mehta",
    status: "active",
    source: "Treatments Overview: Oncoplastic Surgery",
    referrer: "/services",
    utmSource: "marengo-cims",
    utmMedium: "referral",
    utmCampaign: "cims-cancer-institute-referrals",
    subscribedAt: new Date(Date.now() - 86400000 * 20).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 20).toISOString(),
  },
  {
    id: "sub-seed-6",
    email: "meena.deshmukh@healthmail.in",
    name: "Meena Deshmukh",
    status: "active",
    source: "Blog: Dense Breasts & 3D Mammography",
    referrer: "/blog",
    utmSource: "google",
    utmMedium: "organic",
    utmCampaign: "screening-guidelines-gujarat",
    subscribedAt: new Date(Date.now() - 86400000 * 26).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 26).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 26).toISOString(),
  },
  {
    id: "sub-seed-7",
    email: "kavita.joshi.rajkot@gmail.com",
    name: "Kavita Joshi",
    status: "active",
    source: "Second Opinion Consultation Desk",
    referrer: "/contact",
    utmSource: "direct",
    subscribedAt: new Date(Date.now() - 86400000 * 33).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 33).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 33).toISOString(),
  },
  {
    id: "sub-seed-8",
    email: "tanvi.shah.cims@gmail.com",
    name: "Tanvi Shah",
    status: "active",
    source: "Website Footer Newsletter",
    utmSource: "google",
    utmMedium: "organic",
    subscribedAt: new Date(Date.now() - 86400000 * 40).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 40).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 40).toISOString(),
  },
  {
    id: "sub-seed-9",
    email: "sunita.nair@familyhealth.org",
    name: "Sunita Nair",
    status: "unsubscribed",
    source: "Monthly Breast Health Bulletin",
    utmSource: "newsletter",
    utmCampaign: "post-op-recovery-tips",
    subscribedAt: new Date(Date.now() - 86400000 * 55).toISOString(),
    unsubscribedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 55).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
  {
    id: "sub-seed-10",
    email: "alpa.chawla@careconnect.in",
    name: "Alpa Chawla",
    status: "active",
    source: "Breast Biopsy Patient FAQ Page",
    landingPageSlug: "patient-guide",
    utmSource: "meta",
    utmMedium: "cpc",
    utmCampaign: "breast-awareness-ahmedabad",
    subscribedAt: new Date(Date.now() - 86400000 * 62).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 62).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 62).toISOString(),
  },
];

let memorySubscribers: NewsletterSubscriber[] = JSON.parse(JSON.stringify(CANONICAL_SUBSCRIBERS));

/**
 * Lists newsletter subscribers with optional search and status filtering.
 */
export async function getAllSubscribersAdmin(
  search?: string,
  statusFilter?: string
): Promise<NewsletterSubscriber[]> {
  const adminDb = getAdminFirestore();
  let subscribers: NewsletterSubscriber[] = [];

  if (adminDb) {
    try {
      const snap = await adminDb
        .collection(COLLECTIONS.NEWSLETTER_SUBSCRIBERS)
        .orderBy("subscribedAt", "desc")
        .get();

      if (!snap.empty) {
        subscribers = snap.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            email: d.email,
            name: d.name,
            status: d.status || "active",
            source: d.source || "Website Footer",
            landingPageSlug: d.landingPageSlug,
            utmSource: d.utmSource,
            utmMedium: d.utmMedium,
            utmCampaign: d.utmCampaign,
            utmContent: d.utmContent,
            utmTerm: d.utmTerm,
            referrer: d.referrer,
            subscribedAt: d.subscribedAt?.toDate ? d.subscribedAt.toDate().toISOString() : d.subscribedAt || new Date().toISOString(),
            unsubscribedAt: d.unsubscribedAt?.toDate ? d.unsubscribedAt.toDate().toISOString() : d.unsubscribedAt,
            ipAddress: d.ipAddress,
            createdAt: d.createdAt?.toDate ? d.createdAt.toDate().toISOString() : d.createdAt || new Date().toISOString(),
            updatedAt: d.updatedAt?.toDate ? d.updatedAt.toDate().toISOString() : d.updatedAt,
          } as NewsletterSubscriber;
        });
      }
    } catch (error) {
      console.warn("[getAllSubscribersAdmin] Query fallback:", error);
    }
  }

  // Fallback canonical subscribers if empty
  if (subscribers.length === 0) {
    subscribers = memorySubscribers.length > 0 ? memorySubscribers : CANONICAL_SUBSCRIBERS;
  }

  // Filter by search query
  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    subscribers = subscribers.filter(
      (s) =>
        s.email.toLowerCase().includes(q) ||
        (s.name && s.name.toLowerCase().includes(q)) ||
        (s.source && s.source.toLowerCase().includes(q)) ||
        (s.utmCampaign && s.utmCampaign.toLowerCase().includes(q))
    );
  }

  // Filter by status
  if (statusFilter && statusFilter !== "all") {
    subscribers = subscribers.filter((s) => s.status === statusFilter);
  }

  return subscribers;
}

/**
 * 1-Click "Reset to Defaults":
 * Restores the 10 canonical audience subscribers in Firestore and memory.
 */
export async function resetSubscribersAdmin(): Promise<NewsletterSubscriber[]> {
  const adminDb = getAdminFirestore();

  if (adminDb) {
    try {
      const snap = await adminDb.collection(COLLECTIONS.NEWSLETTER_SUBSCRIBERS).get();
      if (!snap.empty) {
        const deleteBatch = adminDb.batch();
        snap.docs.forEach((doc) => deleteBatch.delete(doc.ref));
        await deleteBatch.commit();
      }

      const insertBatch = adminDb.batch();
      for (const sub of CANONICAL_SUBSCRIBERS) {
        const ref = adminDb.collection(COLLECTIONS.NEWSLETTER_SUBSCRIBERS).doc(sub.id);
        const { id: _, ...data } = sub;
        void _;
        insertBatch.set(ref, data);
      }
      await insertBatch.commit();
    } catch (err) {
      console.error("[resetSubscribersAdmin] Firestore reset error:", err);
    }
  }

  memorySubscribers = JSON.parse(JSON.stringify(CANONICAL_SUBSCRIBERS));
  return memorySubscribers;
}

/**
 * Manually creates or enrolls a subscriber from the admin dashboard.
 */
export async function createSubscriberAdmin(input: {
  email: string;
  name?: string;
  source?: string;
}): Promise<{ success: boolean; subscriber?: NewsletterSubscriber; error?: string }> {
  const normalizedEmail = input.email.toLowerCase().trim();
  if (!normalizedEmail || !normalizedEmail.includes("@")) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const adminDb = getAdminFirestore();
  const newSub: NewsletterSubscriber = {
    id: `sub-${Date.now()}`,
    email: normalizedEmail,
    name: input.name?.trim() || undefined,
    status: "active",
    source: input.source?.trim() || "Admin Manual Enrollment",
    subscribedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (adminDb) {
    try {
      const existing = await adminDb
        .collection(COLLECTIONS.NEWSLETTER_SUBSCRIBERS)
        .where("email", "==", normalizedEmail)
        .limit(1)
        .get();

      if (!existing.empty) {
        // Reactivate if exists
        const doc = existing.docs[0];
        await doc.ref.update({
          status: "active",
          name: input.name?.trim() || doc.data().name || null,
          unsubscribedAt: null,
          updatedAt: FieldValue.serverTimestamp(),
        });
        const updated = (await doc.ref.get()).data();
        return {
          success: true,
          subscriber: { id: doc.id, ...updated } as NewsletterSubscriber,
        };
      }

      const ref = await adminDb.collection(COLLECTIONS.NEWSLETTER_SUBSCRIBERS).add({
        email: normalizedEmail,
        name: input.name?.trim() || null,
        status: "active",
        source: newSub.source,
        subscribedAt: FieldValue.serverTimestamp(),
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });

      newSub.id = ref.id;
    } catch (err) {
      console.error("[createSubscriberAdmin] Firestore error:", err);
    }
  }

  // Update memory fallback
  const existingIdx = memorySubscribers.findIndex((s) => s.email === normalizedEmail);
  if (existingIdx >= 0) {
    memorySubscribers[existingIdx].status = "active";
    if (input.name) memorySubscribers[existingIdx].name = input.name;
    return { success: true, subscriber: memorySubscribers[existingIdx] };
  } else {
    memorySubscribers.unshift(newSub);
    return { success: true, subscriber: newSub };
  }
}

/**
 * Toggles a subscriber between "active" and "unsubscribed".
 */
export async function toggleSubscriberStatus(
  id: string,
  newStatus?: SubscriberStatus
): Promise<{ success: boolean; error?: string; status?: SubscriberStatus }> {
  const adminDb = getAdminFirestore();

  // Update memory fallback
  const memSub = memorySubscribers.find((s) => s.id === id);
  const statusToSet = newStatus || (memSub?.status === "active" ? "unsubscribed" : "active");
  if (memSub) {
    memSub.status = statusToSet;
    memSub.updatedAt = new Date().toISOString();
    if (statusToSet === "unsubscribed") memSub.unsubscribedAt = new Date().toISOString();
    else memSub.unsubscribedAt = undefined;
  }

  if (!adminDb) return { success: true, status: statusToSet };

  try {
    const docRef = adminDb.collection(COLLECTIONS.NEWSLETTER_SUBSCRIBERS).doc(id);
    const doc = await docRef.get();

    if (doc.exists) {
      const currentStatus = doc.data()?.status || "active";
      const finalStatus = newStatus || (currentStatus === "active" ? "unsubscribed" : "active");

      const payload: Record<string, unknown> = {
        status: finalStatus,
        updatedAt: FieldValue.serverTimestamp(),
      };

      if (finalStatus === "unsubscribed") {
        payload.unsubscribedAt = FieldValue.serverTimestamp();
      } else {
        payload.unsubscribedAt = null;
      }

      await docRef.update(payload);
      return { success: true, status: finalStatus };
    }
    return { success: true, status: statusToSet };
  } catch (error) {
    console.error("[toggleSubscriberStatus] Error:", error);
    return { success: false, error: "Failed to update subscriber status." };
  }
}

/**
 * Deletes a subscriber permanently.
 */
export async function deleteSubscriber(id: string): Promise<{ success: boolean; error?: string }> {
  const adminDb = getAdminFirestore();
  memorySubscribers = memorySubscribers.filter((s) => s.id !== id);

  if (!adminDb) return { success: true };

  try {
    await adminDb.collection(COLLECTIONS.NEWSLETTER_SUBSCRIBERS).doc(id).delete();
    return { success: true };
  } catch (error) {
    console.error("[deleteSubscriber] Error:", error);
    return { success: false, error: "Failed to delete subscriber." };
  }
}

function escapeCsvValue(val: unknown): string {
  if (val === null || val === undefined) return '""';
  let str = String(val).trim();
  // Neutralize formula injection in Excel / Google Sheets (=, +, -, @, \t, \r)
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }
  return `"${str.replace(/"/g, '""')}"`;
}

/**
 * Generates an RFC-4180 compliant CSV string for export with formula injection defense.
 */
export async function exportSubscribersCsv(): Promise<string> {
  const subscribers = await getAllSubscribersAdmin();

  const headers = [
    "Email",
    "Name",
    "Status",
    "Source",
    "Landing Page",
    "UTM Source",
    "UTM Medium",
    "UTM Campaign",
    "Subscribed At",
    "Unsubscribed At",
  ];

  const rows = subscribers.map((s) => [
    escapeCsvValue(s.email),
    escapeCsvValue(s.name || ""),
    escapeCsvValue(s.status),
    escapeCsvValue(s.source || "Website Footer"),
    escapeCsvValue(s.landingPageSlug || ""),
    escapeCsvValue(s.utmSource || ""),
    escapeCsvValue(s.utmMedium || ""),
    escapeCsvValue(s.utmCampaign || ""),
    escapeCsvValue(s.subscribedAt),
    escapeCsvValue(s.unsubscribedAt || ""),
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}
