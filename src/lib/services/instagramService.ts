import { getAdminFirestore } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/config/firebase";
import { InstagramPost, InstagramFetchResult } from "@/types/instagram";
import { getCollectionStore, serializeFirestoreData, revalidateWebsitePages } from "@/lib/services/cmsService";
import { notifyLiveSync } from "@/lib/sync/clientSync";

export const DEFAULT_INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "insta-seed-1",
    url: "https://www.instagram.com/reel/DEEarlySignsBC/",
    shortcode: "DEEarlySignsBC",
    title: "Early Signs of Breast Cancer",
    caption: "Early detection saves lives. Recognize the subtle symptoms early with Dr. Noopur Patel.",
    imageUrl: "/images/doctor/assets/insta-1.png",
    embedUrl: "https://www.instagram.com/reel/DEEarlySignsBC/embed/",
    order: 1,
    isActive: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "insta-seed-2",
    url: "https://www.instagram.com/reel/DELumpCancerous/",
    shortcode: "DELumpCancerous",
    title: "Is Every Breast Lump Cancerous?",
    caption: "Over 80% of breast lumps are benign (non-cancerous). Understand triple assessment and peace of mind.",
    imageUrl: "/images/doctor/assets/insta-2.png",
    embedUrl: "https://www.instagram.com/reel/DELumpCancerous/embed/",
    order: 2,
    isActive: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "insta-seed-3",
    url: "https://www.instagram.com/reel/DESelfExamGuide/",
    shortcode: "DESelfExamGuide",
    title: "Breast Self-Exam: How to Do It?",
    caption: "A 5-minute monthly guide on how to perform a gentle breast self-examination at home.",
    imageUrl: "/images/doctor/assets/insta-3.png",
    embedUrl: "https://www.instagram.com/reel/DESelfExamGuide/embed/",
    order: 3,
    isActive: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "insta-seed-4",
    url: "https://www.instagram.com/reel/DETreatmentBCS/",
    shortcode: "DETreatmentBCS",
    title: "Treatment Options for Breast Cancer",
    caption: "From Oncoplastic Breast Conservation to modern reconstructive care: what every patient should know.",
    imageUrl: "/images/doctor/assets/insta-4.png",
    embedUrl: "https://www.instagram.com/reel/DETreatmentBCS/embed/",
    order: 4,
    isActive: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "insta-seed-5",
    url: "https://www.instagram.com/reel/DEMammographyMyths/",
    shortcode: "DEMammographyMyths",
    title: "Myths About Mammography",
    caption: "Dispelling common fears about radiation, pain, and age criteria for routine breast screenings.",
    imageUrl: "/images/doctor/assets/insta-5.png",
    embedUrl: "https://www.instagram.com/reel/DEMammographyMyths/embed/",
    order: 5,
    isActive: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
];

/**
 * Extracts Instagram shortcode from any standard URL format:
 * - https://www.instagram.com/reel/C-xyz123/
 * - https://www.instagram.com/p/C-xyz123/
 * - https://instagr.am/p/C-xyz123/
 */
export function extractInstagramShortcode(rawUrl: string): string | null {
  if (!rawUrl || typeof rawUrl !== "string") return null;
  const cleaned = rawUrl.trim();
  const match = cleaned.match(/(?:reel|reels|p|tv)\/([A-Za-z0-9_-]+)/i);
  return match ? match[1] : null;
}

/**
 * Auto-fetches OpenGraph metadata (Cover Image, Title, Caption) from an Instagram URL.
 * Includes intelligent fallbacks so the administrator is never blocked by rate limits.
 */
export async function fetchInstagramMetadata(rawUrl: string): Promise<InstagramFetchResult> {
  const shortcode = extractInstagramShortcode(rawUrl);
  if (!shortcode) {
    return {
      success: false,
      shortcode: "",
      url: rawUrl,
      error: "Invalid Instagram link. Please paste a link containing /reel/, /p/, or /tv/.",
    };
  }

  const cleanUrl = `https://www.instagram.com/reel/${shortcode}/`;
  const embedUrl = `https://www.instagram.com/reel/${shortcode}/embed/`;

  let scrapedTitle = "";
  let scrapedCaption = "";
  let scrapedImage = "";

  try {
    // Attempt 1: Fetch through Facebook/WhatsApp user-agent to read OpenGraph tags
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4500);

    const res = await fetch(cleanUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
      next: { revalidate: 0 },
    });
    clearTimeout(timeout);

    if (res.ok) {
      const html = await res.text();

      // Extract og:image
      const ogImgMatch =
        html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
        html.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i);
      if (ogImgMatch && ogImgMatch[1]) {
        scrapedImage = ogImgMatch[1].replace(/&amp;/g, "&");
      }

      // Extract og:title
      const ogTitleMatch =
        html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i) ||
        html.match(/<title>([^<]+)<\/title>/i);
      if (ogTitleMatch && ogTitleMatch[1]) {
        scrapedTitle = ogTitleMatch[1]
          .replace(/&amp;/g, "&")
          .replace(/&#039;/g, "'")
          .replace(/&quot;/g, '"')
          .trim();
      }

      // Extract og:description
      const ogDescMatch =
        html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i) ||
        html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
      if (ogDescMatch && ogDescMatch[1]) {
        scrapedCaption = ogDescMatch[1]
          .replace(/&amp;/g, "&")
          .replace(/&#039;/g, "'")
          .replace(/&quot;/g, '"')
          .trim();
      }
    }
  } catch (err) {
    // Non-blocking fallback
    console.warn("[InstagramService] Automated scrape notice:", (err as Error)?.message);
  }

  // Clean up title: Remove common Instagram prefixes like "Dr. Noopur Patel on Instagram: "
  let cleanedTitle = scrapedTitle;
  if (cleanedTitle) {
    cleanedTitle = cleanedTitle.replace(/^.*?on Instagram:\s*["“]?/i, "");
    cleanedTitle = cleanedTitle.replace(/["”]$/, "").trim();
  }

  // If caption is present and title is too generic, pick first line or sentence
  if (!cleanedTitle && scrapedCaption) {
    const firstLine = scrapedCaption.split(/[\n.]/)[0]?.trim();
    if (firstLine && firstLine.length > 5) {
      cleanedTitle = firstLine.slice(0, 70);
    }
  }

  // Smart fallback title if empty
  if (!cleanedTitle) {
    cleanedTitle = `Clinical Breast Awareness Reel (${shortcode})`;
  }

  // Fallback image if Instagram login wall obscured it
  const fallbackImageIndex = (Math.abs(shortcode.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 5) + 1;
  const resolvedImage = scrapedImage || `/images/doctor/assets/insta-${fallbackImageIndex}.png`;

  return {
    success: true,
    shortcode,
    url: cleanUrl,
    title: cleanedTitle,
    caption: scrapedCaption || undefined,
    imageUrl: resolvedImage,
    embedUrl,
  };
}

/**
 * Get active Instagram posts sorted by priority order for public website display.
 */
export async function getInstagramPosts(): Promise<InstagramPost[]> {
  try {
    const db = getAdminFirestore();
    if (db) {
      const snap = await db
        .collection(COLLECTIONS.INSTAGRAM_POSTS)
        .where("isActive", "==", true)
        .get();

      if (!snap.empty) {
        const posts = snap.docs
          .map((doc) => ({
            id: doc.id,
            ...serializeFirestoreData<Record<string, unknown>>(doc.data()),
          })) as InstagramPost[];

        return posts.sort((a, b) => (a.order || 0) - (b.order || 0));
      }
    }
  } catch (e) {
    console.warn("[InstagramService] Firestore read notice, falling back to memory store:", (e as Error)?.message);
  }

  // Memory/Dev store fallback
  const store = getCollectionStore(COLLECTIONS.INSTAGRAM_POSTS);
  if (store.size > 0) {
    const list = Array.from(store.values()) as unknown as InstagramPost[];
    const activeList = list.filter((p) => p.isActive);
    if (activeList.length > 0) {
      return activeList.sort((a, b) => (a.order || 0) - (b.order || 0));
    }
  }

  // Return canonical seed posts
  return DEFAULT_INSTAGRAM_POSTS;
}

/**
 * Get all Instagram posts (active and inactive) for admin management.
 */
export async function getAllInstagramPostsAdmin(): Promise<InstagramPost[]> {
  try {
    const db = getAdminFirestore();
    if (db) {
      const snap = await db.collection(COLLECTIONS.INSTAGRAM_POSTS).get();
      if (!snap.empty) {
        const posts = snap.docs
          .map((doc) => ({
            id: doc.id,
            ...serializeFirestoreData<Record<string, unknown>>(doc.data()),
          })) as InstagramPost[];

        return posts.sort((a, b) => (a.order || 0) - (b.order || 0));
      }
    }
  } catch (e) {
    console.warn("[InstagramService] Admin read fallback:", (e as Error)?.message);
  }

  const store = getCollectionStore(COLLECTIONS.INSTAGRAM_POSTS);
  if (store.size > 0) {
    const list = Array.from(store.values()) as unknown as InstagramPost[];
    return list.sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  // Populate store with canonical seeds on first admin view
  DEFAULT_INSTAGRAM_POSTS.forEach((post) => {
    store.set(post.id, post as unknown as Record<string, unknown>);
  });

  return DEFAULT_INSTAGRAM_POSTS;
}

/**
 * Save or update an Instagram post.
 */
export async function saveInstagramPost(
  data: Partial<InstagramPost>,
  id?: string
): Promise<{ success: boolean; id: string; item?: InstagramPost; error?: string }> {
  try {
    const postId = id || `insta-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    const shortcode = data.shortcode || (data.url ? extractInstagramShortcode(data.url) : "") || "post";
    const cleanUrl = data.url?.trim() || `https://www.instagram.com/reel/${shortcode}/`;
    const embedUrl = data.embedUrl || `https://www.instagram.com/reel/${shortcode}/embed/`;

    const postRecord: InstagramPost = {
      id: postId,
      url: cleanUrl,
      shortcode,
      title: data.title?.trim() || "Breast Awareness Reel",
      caption: data.caption?.trim() || "",
      imageUrl: data.imageUrl?.trim() || "/images/doctor/assets/insta-1.png",
      embedUrl,
      order: typeof data.order === "number" ? data.order : 99,
      isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
      createdAt: data.createdAt || now,
      updatedAt: now,
    };

    const store = getCollectionStore(COLLECTIONS.INSTAGRAM_POSTS);
    store.set(postId, postRecord as unknown as Record<string, unknown>);

    const db = getAdminFirestore();
    if (db) {
      await db.collection(COLLECTIONS.INSTAGRAM_POSTS).doc(postId).set(postRecord, { merge: true });
    }

    revalidateWebsitePages();
    notifyLiveSync(COLLECTIONS.INSTAGRAM_POSTS, postId, "CMS_MUTATION");

    return { success: true, id: postId, item: postRecord };
  } catch (error) {
    console.error("[InstagramService] Save error:", error);
    return { success: false, id: id || "", error: (error as Error)?.message || "Failed to save Instagram reel." };
  }
}

/**
 * Reorder Instagram posts by receiving an array of post IDs in the desired order.
 * Sets order = 1, 2, 3...
 */
export async function reorderInstagramPosts(orderedIds: string[]): Promise<{ success: boolean; count: number }> {
  try {
    if (!orderedIds || !Array.isArray(orderedIds) || orderedIds.length === 0) {
      return { success: false, count: 0 };
    }

    const store = getCollectionStore(COLLECTIONS.INSTAGRAM_POSTS);
    const db = getAdminFirestore();
    const batch = db ? db.batch() : null;

    for (let index = 0; index < orderedIds.length; index++) {
      const id = orderedIds[index];
      const newOrder = index + 1;
      const now = new Date().toISOString();

      const inMemory = store.get(id);
      if (inMemory) {
        inMemory.order = newOrder;
        inMemory.updatedAt = now;
      }

      if (db && batch) {
        const ref = db.collection(COLLECTIONS.INSTAGRAM_POSTS).doc(id);
        batch.set(ref, { order: newOrder, updatedAt: now }, { merge: true });
      }
    }

    if (batch) {
      await batch.commit();
    }

    revalidateWebsitePages();
    notifyLiveSync(COLLECTIONS.INSTAGRAM_POSTS, "all", "CMS_MUTATION");

    return { success: true, count: orderedIds.length };
  } catch (error) {
    console.error("[InstagramService] Reorder error:", error);
    return { success: false, count: 0 };
  }
}

/**
 * Delete an Instagram post.
 */
export async function deleteInstagramPost(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const store = getCollectionStore(COLLECTIONS.INSTAGRAM_POSTS);
    store.delete(id);

    const db = getAdminFirestore();
    if (db) {
      await db.collection(COLLECTIONS.INSTAGRAM_POSTS).doc(id).delete();
    }

    revalidateWebsitePages();
    notifyLiveSync(COLLECTIONS.INSTAGRAM_POSTS, id, "CMS_MUTATION");

    return { success: true };
  } catch (error) {
    console.error("[InstagramService] Delete error:", error);
    return { success: false, error: (error as Error)?.message || "Failed to delete post." };
  }
}

/**
 * 1-Click Reset to Default Awareness Posts.
 */
export async function resetInstagramPostsToDefaults(): Promise<{ success: boolean; count: number }> {
  try {
    const store = getCollectionStore(COLLECTIONS.INSTAGRAM_POSTS);
    store.clear();

    const db = getAdminFirestore();
    const batch = db ? db.batch() : null;

    // Remove existing docs if in db
    if (db && batch) {
      const existing = await db.collection(COLLECTIONS.INSTAGRAM_POSTS).get();
      existing.docs.forEach((doc) => batch.delete(doc.ref));
    }

    for (const post of DEFAULT_INSTAGRAM_POSTS) {
      store.set(post.id, post as unknown as Record<string, unknown>);
      if (db && batch) {
        const ref = db.collection(COLLECTIONS.INSTAGRAM_POSTS).doc(post.id);
        batch.set(ref, post);
      }
    }

    if (batch) {
      await batch.commit();
    }

    revalidateWebsitePages();
    notifyLiveSync(COLLECTIONS.INSTAGRAM_POSTS, "all", "CMS_MUTATION");

    return { success: true, count: DEFAULT_INSTAGRAM_POSTS.length };
  } catch (error) {
    console.error("[InstagramService] Reset error:", error);
    return { success: false, count: 0 };
  }
}
