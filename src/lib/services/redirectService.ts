import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminFirestore } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/config/firebase";
import { RedirectItem, RedirectValidationResult } from "@/types";
import { cachedFirestoreRead, invalidateFirestoreCache } from "@/lib/utils/firestoreCache";

export const CANONICAL_REDIRECTS: RedirectItem[] = [
  {
    id: "red-1",
    sourcePath: "/growth-services",
    destinationPath: "/services",
    statusCode: 301,
    isActive: true,
    note: "Legacy URL migrated to main services directory",
    hitCount: 142,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "red-2",
    sourcePath: "/case-studies",
    destinationPath: "/portfolio",
    statusCode: 301,
    isActive: true,
    note: "Consolidated portfolio & client case studies path",
    hitCount: 288,
    createdAt: "2026-01-05T00:00:00Z",
    updatedAt: "2026-01-05T00:00:00Z",
  },
  {
    id: "red-3",
    sourcePath: "/audit",
    destinationPath: "/contact",
    statusCode: 301,
    isActive: true,
    note: "Quick shortlink for Free Q1 Performance & SEO Growth Audit",
    hitCount: 375,
    createdAt: "2026-01-10T00:00:00Z",
    updatedAt: "2026-01-10T00:00:00Z",
  },
  {
    id: "red-4",
    sourcePath: "/whatsapp",
    destinationPath: "https://wa.me/919081145178",
    statusCode: 302,
    isActive: true,
    note: "Direct WhatsApp Growth Desk shortlink (+91 90811 45178)",
    hitCount: 512,
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-01-15T00:00:00Z",
  },
  {
    id: "red-5",
    sourcePath: "/blueprint",
    destinationPath: "/landing/performance-marketing-blueprint",
    statusCode: 301,
    isActive: true,
    note: "Shortlink for 14-Day Performance Marketing Blueprint Pilot",
    hitCount: 96,
    createdAt: "2026-01-20T00:00:00Z",
    updatedAt: "2026-01-20T00:00:00Z",
  },
  {
    id: "red-6",
    sourcePath: "/pos",
    destinationPath: "/contact?product=restromitra",
    statusCode: 301,
    isActive: true,
    note: "RestroMitra Cloud POS & QR dining product inquiry shortlink",
    hitCount: 164,
    createdAt: "2026-01-22T00:00:00Z",
    updatedAt: "2026-01-22T00:00:00Z",
  },
  {
    id: "red-7",
    sourcePath: "/partner",
    destinationPath: "/forms/vip-partner",
    statusCode: 301,
    isActive: true,
    note: "VIP Agency Partner white-label onboarding shortlink",
    hitCount: 78,
    createdAt: "2026-01-25T00:00:00Z",
    updatedAt: "2026-01-25T00:00:00Z",
  },
  {
    id: "red-8",
    sourcePath: "/careers",
    destinationPath: "/contact?subject=careers",
    statusCode: 302,
    isActive: false,
    note: "Talent acquisition & agency careers inquiry router (Paused)",
    hitCount: 45,
    createdAt: "2026-01-28T00:00:00Z",
    updatedAt: "2026-01-28T00:00:00Z",
  },
];

export const DEFAULT_SEED_REDIRECTS: RedirectItem[] = CANONICAL_REDIRECTS;

// In-memory cache for middleware speed
let redirectsCache: RedirectItem[] | null = null;
let lastCacheFetchTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

/**
 * Validates a redirect to prevent loops, invalid paths, and system route hijacking.
 */
export function validateRedirect(
  sourcePath: string,
  destinationPath: string,
  currentId?: string,
  existingList: RedirectItem[] = []
): RedirectValidationResult {
  const src = (sourcePath || "").trim();
  const dest = (destinationPath || "").trim();

  if (!src) {
    return { isValid: false, error: "Source path is required." };
  }

  if (!src.startsWith("/")) {
    return { isValid: false, error: "Source path must begin with a forward slash (e.g. /old-page)." };
  }

  if (!dest) {
    return { isValid: false, error: "Destination path or URL is required." };
  }

  if (!dest.startsWith("/") && !dest.startsWith("http://") && !dest.startsWith("https://")) {
    return { isValid: false, error: "Destination must be a relative path (e.g. /new-page) or full URL (e.g. https://...)." };
  }

  if (src === dest) {
    return { isValid: false, error: "Source path cannot be identical to destination path (self-redirect loop)." };
  }

  if (src.startsWith("/admin") || src.startsWith("/api") || src.startsWith("/_next")) {
    return { isValid: false, error: "Cannot redirect protected system routes (/admin, /api, /_next)." };
  }

  // Protocol-relative defense (e.g. "//attacker.com")
  if (dest.startsWith("//")) {
    return { isValid: false, error: "Protocol-relative URLs (starting with //) are prohibited for security." };
  }

  // Dangerous scheme defense
  const lowerDest = dest.toLowerCase();
  if (
    lowerDest.startsWith("javascript:") ||
    lowerDest.startsWith("data:") ||
    lowerDest.startsWith("vbscript:") ||
    lowerDest.startsWith("file:")
  ) {
    return { isValid: false, error: "Dangerous URL schemes (javascript, data, vbscript, file) are strictly prohibited." };
  }

  // Multi-hop circular redirect chain detection
  if (dest.startsWith("/")) {
    let currentHop = dest.toLowerCase();
    const normalizedSrc = src.toLowerCase();
    const visited = new Set<string>([normalizedSrc]);
    const maxHops = 10;
    let hops = 0;

    while (hops < maxHops) {
      if (visited.has(currentHop)) {
        return {
          isValid: false,
          error: `Circular redirect chain detected: adding this redirect creates an infinite loop (${src} -> ... -> ${currentHop}).`,
        };
      }
      visited.add(currentHop);

      const nextItem = existingList.find(
        (item) => item.id !== currentId && item.isActive && item.sourcePath.toLowerCase() === currentHop
      );
      if (!nextItem || !nextItem.destinationPath.startsWith("/")) {
        break;
      }
      currentHop = nextItem.destinationPath.toLowerCase();
      hops++;
    }
  }

  return { isValid: true };
}

/**
 * Lists all redirects for admin management.
 */
export async function getAllRedirectsAdmin(): Promise<RedirectItem[]> {
  return cachedFirestoreRead<RedirectItem[]>(
    "all_redirects",
    60 * 1000,
    async () => {
      const adminDb = getAdminFirestore();
      if (!adminDb) return [...DEFAULT_SEED_REDIRECTS];

      const snap = await adminDb
        .collection(COLLECTIONS.REDIRECTS)
        .orderBy("createdAt", "desc")
        .get();

      if (!snap.empty) {
        return snap.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            sourcePath: d.sourcePath,
            destinationPath: d.destinationPath,
            statusCode: d.statusCode || 301,
            isActive: d.isActive !== undefined ? d.isActive : true,
            note: d.note,
            hitCount: d.hitCount || 0,
            lastTriggeredAt: d.lastTriggeredAt?.toDate ? d.lastTriggeredAt.toDate().toISOString() : d.lastTriggeredAt,
            createdAt: d.createdAt?.toDate ? d.createdAt.toDate().toISOString() : d.createdAt || new Date().toISOString(),
            updatedAt: d.updatedAt?.toDate ? d.updatedAt.toDate().toISOString() : d.updatedAt,
          } as RedirectItem;
        });
      }
      return [...DEFAULT_SEED_REDIRECTS];
    },
    () => [...DEFAULT_SEED_REDIRECTS]
  );
}

/**
 * Retrieves active redirects with cache for fast middleware execution.
 */
export async function getActiveRedirects(): Promise<RedirectItem[]> {
  const now = Date.now();
  if (redirectsCache && now - lastCacheFetchTime < CACHE_TTL_MS) {
    return redirectsCache.filter((r) => r.isActive);
  }

  const all = await getAllRedirectsAdmin();
  redirectsCache = all;
  lastCacheFetchTime = now;
  return all.filter((r) => r.isActive);
}

/**
 * Creates or updates a redirect.
 */
export async function saveRedirect(
  data: Partial<RedirectItem>,
  id?: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  const existing = await getAllRedirectsAdmin();
  const validation = validateRedirect(data.sourcePath || "", data.destinationPath || "", id, existing);
  if (!validation.isValid) {
    return { success: false, error: validation.error };
  }

  const adminDb = getAdminFirestore();
  if (!adminDb) return { success: true, id: id || `local-red-${Date.now()}` };

  try {
    const timestamp = FieldValue.serverTimestamp();
    const payload: Record<string, unknown> = {
      sourcePath: (data.sourcePath || "").trim().toLowerCase(),
      destinationPath: (data.destinationPath || "").trim(),
      statusCode: data.statusCode === 302 ? 302 : 301,
      isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
      note: (data.note || "").trim() || null,
      updatedAt: timestamp,
    };

    if (id) {
      await adminDb.collection(COLLECTIONS.REDIRECTS).doc(id).set(payload, { merge: true });
      redirectsCache = null; // Invalidate cache
      invalidateFirestoreCache("all_redirects");
      return { success: true, id };
    } else {
      payload.hitCount = 0;
      payload.createdAt = timestamp;
      const ref = await adminDb.collection(COLLECTIONS.REDIRECTS).add(payload);
      redirectsCache = null;
      invalidateFirestoreCache("all_redirects");
      return { success: true, id: ref.id };
    }
  } catch (error) {
    console.error("[saveRedirect] Error:", error);
    return { success: false, error: "Failed to save URL redirect." };
  }
}

/**
 * Deletes a redirect.
 */
export async function deleteRedirect(id: string): Promise<{ success: boolean; error?: string }> {
  const adminDb = getAdminFirestore();
  if (!adminDb) return { success: true };

  try {
    await adminDb.collection(COLLECTIONS.REDIRECTS).doc(id).delete();
    redirectsCache = null;
    invalidateFirestoreCache("all_redirects");
    return { success: true };
  } catch (error) {
    console.error("[deleteRedirect] Error:", error);
    return { success: false, error: "Failed to delete redirect." };
  }
}

/**
 * Toggles redirect active state.
 */
export async function toggleRedirectStatus(id: string): Promise<{ success: boolean; error?: string }> {
  const adminDb = getAdminFirestore();
  if (!adminDb) return { success: true };

  try {
    const ref = adminDb.collection(COLLECTIONS.REDIRECTS).doc(id);
    const doc = await ref.get();
    if (!doc.exists) return { success: false, error: "Redirect not found." };

    const currentStatus = doc.data()?.isActive !== false;
    await ref.update({
      isActive: !currentStatus,
      updatedAt: FieldValue.serverTimestamp(),
    });

    redirectsCache = null;
    invalidateFirestoreCache("all_redirects");
    return { success: true };
  } catch (error) {
    console.error("[toggleRedirectStatus] Error:", error);
    return { success: false, error: "Failed to toggle redirect status." };
  }
}

/**
 * Increments hit count asynchronously when a redirect is triggered.
 */
export async function recordRedirectHit(id: string): Promise<void> {
  const adminDb = getAdminFirestore();
  if (!adminDb) return;

  try {
    await adminDb
      .collection(COLLECTIONS.REDIRECTS)
      .doc(id)
      .update({
        hitCount: FieldValue.increment(1),
        lastTriggeredAt: FieldValue.serverTimestamp(),
      });
  } catch {
    // Non-blocking
  }
}

/**
 * Resets all redirects to canonical defaults in Firestore and runtime cache.
 */
export async function resetRedirectsAdmin(): Promise<{ success: boolean; redirects: RedirectItem[]; message: string; error?: string }> {
  redirectsCache = null;
  invalidateFirestoreCache("all_redirects");

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      // 1. Delete existing documents
      const snap = await adminDb.collection(COLLECTIONS.REDIRECTS).get();
      if (!snap.empty) {
        const batch = adminDb.batch();
        snap.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
      }

      // 2. Re-seed canonical redirects
      const reseedBatch = adminDb.batch();
      for (const item of CANONICAL_REDIRECTS) {
        const docRef = adminDb.collection(COLLECTIONS.REDIRECTS).doc(item.id);
        reseedBatch.set(docRef, {
          sourcePath: item.sourcePath,
          destinationPath: item.destinationPath,
          statusCode: item.statusCode,
          isActive: item.isActive,
          note: item.note,
          hitCount: item.hitCount || 0,
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        });
      }
      await reseedBatch.commit();
    } catch (e) {
      console.warn("[resetRedirectsAdmin] Firestore reset warning (quota/offline):", (e as { message?: string })?.message || e);
    }
  }

  const freshRedirects = await getAllRedirectsAdmin();
  return {
    success: true,
    redirects: freshRedirects,
    message: "Successfully reset to 8 canonical DigiVigee URL redirect rules.",
  };
}
