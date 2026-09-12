import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminFirestore } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/config/firebase";
import {
  ContentRevision,
  CreateRevisionInput,
  AuditActor,
  AuditResourceType,
} from "@/types/rbac";
import { recordAuditLog } from "./auditLogService";
import {
  saveCmsBlogPost,
  saveCmsItem,
} from "./cmsService";
import { updateLandingPage } from "./landingPageService";
import { saveGlobalSeoSettings, saveCustomPageSeo } from "./seoService";

// In-memory cache for fast retrieval and local dev fallback
const revisionsCache = new Map<string, ContentRevision[]>();

/**
 * Generates a storage key for caching: `resourceType:resourceId`
 */
function getCacheKey(resourceType: AuditResourceType, resourceId: string): string {
  return `${resourceType}:${resourceId}`;
}

/**
 * Creates an immutable content revision snapshot.
 */
export async function createContentRevision(
  input: CreateRevisionInput
): Promise<ContentRevision> {
  const { resourceType, resourceId, resourceTitle, snapshot, changeSummary, actor } = input;
  const cacheKey = getCacheKey(resourceType, resourceId);

  // Retrieve current version history to calculate next version number
  const existing = await getRevisionHistory(resourceType, resourceId);
  const latestVersion = existing.length > 0 ? Math.max(...existing.map((r) => r.version)) : 0;
  const version = latestVersion + 1;

  const createdAt = new Date().toISOString();
  const id = `rev_${resourceType}_${resourceId}_v${version}`;

  const revision: ContentRevision = {
    id,
    resourceType,
    resourceId,
    resourceTitle: resourceTitle || `${resourceType} ${resourceId}`,
    version,
    snapshot: JSON.parse(JSON.stringify(snapshot)), // Clean deep clone
    changeSummary: changeSummary || (version === 1 ? "Initial version snapshot" : `Updated to version ${version}`),
    createdBy: {
      uid: actor.uid || "system",
      email: actor.email || "system@digivigee.com",
      displayName: actor.displayName || actor.email?.split("@")[0] || "System",
      role: actor.role || "super_admin",
      roleName: actor.roleName,
    },
    createdAt,
  };

  // Update in-memory cache
  const cachedList = revisionsCache.get(cacheKey) || [];
  cachedList.unshift(revision);
  revisionsCache.set(cacheKey, cachedList);

  // Persist to Firestore if available
  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      await adminDb.collection(COLLECTIONS.CONTENT_REVISIONS).doc(id).set({
        ...revision,
        firestoreCreatedAt: FieldValue.serverTimestamp(),
      });
    } catch (err) {
      console.error("[createContentRevision] Firestore write error:", err);
    }
  }

  return revision;
}

/**
 * Retrieves the complete revision history for a specific resource, sorted by version descending.
 */
export async function getRevisionHistory(
  resourceType: AuditResourceType,
  resourceId: string
): Promise<ContentRevision[]> {
  const cacheKey = getCacheKey(resourceType, resourceId);

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      const snap = await adminDb
        .collection(COLLECTIONS.CONTENT_REVISIONS)
        .where("resourceType", "==", resourceType)
        .where("resourceId", "==", resourceId)
        .get();

      if (!snap.empty) {
        const list = snap.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            resourceType: data.resourceType,
            resourceId: data.resourceId,
            resourceTitle: data.resourceTitle,
            version: data.version || 1,
            snapshot: data.snapshot || {},
            changeSummary: data.changeSummary,
            createdBy: data.createdBy || { uid: "system", email: "system@digivigee.com", role: "system" },
            createdAt: data.createdAt || new Date().toISOString(),
            restoredFromVersion: data.restoredFromVersion,
          } as ContentRevision;
        });

        list.sort((a, b) => b.version - a.version);
        revisionsCache.set(cacheKey, list);
        return list;
      }
    } catch (err) {
      console.warn(`[getRevisionHistory:${cacheKey}] Firestore query error, falling back to cache:`, err);
    }
  }

  const cached = revisionsCache.get(cacheKey) || [];
  return [...cached].sort((a, b) => b.version - a.version);
}

/**
 * Retrieves a single revision by document ID.
 */
export async function getRevisionById(id: string): Promise<ContentRevision | null> {
  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      const doc = await adminDb.collection(COLLECTIONS.CONTENT_REVISIONS).doc(id).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() } as ContentRevision;
      }
    } catch (err) {
      console.warn(`[getRevisionById:${id}] Error:`, err);
    }
  }

  for (const list of revisionsCache.values()) {
    const found = list.find((r) => r.id === id);
    if (found) return found;
  }

  return null;
}

export interface RestoreRevisionResult {
  success: boolean;
  newVersion?: number;
  message?: string;
  error?: string;
}

/**
 * Restores a previous content revision snapshot.
 *
 * CRITICAL IMMUTABLE HISTORY RULE:
 * This method never overwrites historical revision records. Instead, it:
 * 1. Applies the snapshot data to the live content.
 * 2. Creates a BRAND NEW sequential version (e.g., Version 6 created from Version 3).
 * 3. Records an audit log event.
 */
export async function restoreContentRevision(
  revisionId: string,
  actor: AuditActor
): Promise<RestoreRevisionResult> {
  const revision = await getRevisionById(revisionId);

  if (!revision) {
    return { success: false, error: "Revision snapshot not found." };
  }

  const { resourceType, resourceId, version: targetVersion, snapshot, resourceTitle } = revision;

  if (!snapshot || typeof snapshot !== "object") {
    return { success: false, error: "Revision snapshot payload is malformed." };
  }

  try {
    // 1. Dispatch update to corresponding CMS service layer
    switch (resourceType) {
      case "blog":
        await saveCmsBlogPost(snapshot, resourceId);
        break;

      case "page":
        await saveCmsItem(COLLECTIONS.PAGES, snapshot, resourceId);
        break;

      case "service":
        await saveCmsItem(COLLECTIONS.SERVICES, snapshot, resourceId);
        break;

      case "portfolio":
        await saveCmsItem(COLLECTIONS.PORTFOLIO, snapshot, resourceId);
        break;

      case "testimonial":
        await saveCmsItem(COLLECTIONS.TESTIMONIALS, snapshot, resourceId);
        break;

      case "faq":
        await saveCmsItem(COLLECTIONS.FAQS, snapshot, resourceId);
        break;

      case "team":
        await saveCmsItem(COLLECTIONS.TEAM, snapshot, resourceId);
        break;

      case "landing_page":
        await updateLandingPage(resourceId, snapshot);
        break;

      case "seo":
        if (resourceId === "global") {
          await saveGlobalSeoSettings(snapshot);
        } else {
          await saveCustomPageSeo(resourceId, snapshot);
        }
        break;

      case "settings":
        await saveCmsItem(COLLECTIONS.SITE_SETTINGS, snapshot, "global");
        break;

      default:
        throw new Error(`Resource type "${resourceType}" does not support automatic revision restoration.`);
    }

    // 2. Create a NEW sequential revision representing this restore action
    const existing = await getRevisionHistory(resourceType, resourceId);
    const latestVersion = existing.length > 0 ? Math.max(...existing.map((r) => r.version)) : targetVersion;
    const newVersion = latestVersion + 1;

    const newRevisionInput: CreateRevisionInput = {
      resourceType,
      resourceId,
      resourceTitle,
      snapshot,
      changeSummary: `Restored to version ${targetVersion}`,
      actor,
    };

    const newRevision = await createContentRevision(newRevisionInput);

    // Update restoredFromVersion metadata on the newly created revision document
    newRevision.restoredFromVersion = targetVersion;
    const adminDb = getAdminFirestore();
    if (adminDb) {
      await adminDb.collection(COLLECTIONS.CONTENT_REVISIONS).doc(newRevision.id).update({
        restoredFromVersion: targetVersion,
      });
    }

    // 3. Record Audit Log
    await recordAuditLog({
      actor,
      action: "RESTORE",
      resourceType,
      resourceId,
      resourceTitle,
      summary: `Restored ${resourceType} "${resourceTitle || resourceId}" from Version ${targetVersion} as new Version ${newVersion}`,
      status: "success",
      metadata: {
        restoredFromVersion: targetVersion,
        newVersion,
        revisionId,
      },
    });

    return {
      success: true,
      newVersion,
      message: `Successfully restored ${resourceType} content to Version ${targetVersion} (now Version ${newVersion}).`,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to restore revision snapshot.";
    console.error("[restoreContentRevision] Error:", err);

    await recordAuditLog({
      actor,
      action: "RESTORE",
      resourceType,
      resourceId,
      resourceTitle,
      summary: `Failed to restore ${resourceType} "${resourceTitle || resourceId}" from Version ${targetVersion}`,
      status: "failure",
      errorMessage: errorMsg,
      metadata: { revisionId, targetVersion },
    });

    return { success: false, error: errorMsg };
  }
}

export interface FieldDiff {
  field: string;
  prevValue: string;
  currValue: string;
  isChanged: boolean;
}

/**
 * Computes human-readable field diffs between two content objects.
 */
export function computeContentDiff(
  prevSnapshot: Record<string, unknown>,
  currSnapshot: Record<string, unknown>
): FieldDiff[] {
  const allKeys = Array.from(new Set([...Object.keys(prevSnapshot), ...Object.keys(currSnapshot)]));
  const ignoredKeys = ["id", "createdAt", "updatedAt", "publishedAt", "firestoreCreatedAt"];

  const diffs: FieldDiff[] = [];

  for (const key of allKeys) {
    if (ignoredKeys.includes(key)) continue;

    const prev = prevSnapshot[key];
    const curr = currSnapshot[key];

    const prevStr = prev !== undefined && prev !== null ? (typeof prev === "object" ? JSON.stringify(prev, null, 2) : String(prev)) : "(empty)";
    const currStr = curr !== undefined && curr !== null ? (typeof curr === "object" ? JSON.stringify(curr, null, 2) : String(curr)) : "(empty)";

    const isChanged = prevStr !== currStr;

    diffs.push({
      field: key,
      prevValue: prevStr,
      currValue: currStr,
      isChanged,
    });
  }

  // Place changed fields at top
  return diffs.sort((a, b) => (b.isChanged ? 1 : 0) - (a.isChanged ? 1 : 0));
}
