/**
 * Dr. Noopur Patel Real-Time Cross-Tab & Cross-Device CMS Synchronization
 * Broadcasts CMS mutations across browser tabs and devices to trigger instant UI refresh.
 */

export const CMS_SYNC_CHANNEL_NAME = "drn-cms-sync";
export const CMS_SYNC_STORAGE_KEY = "drn_cms_updated";

export function notifyCmsUpdate(source: string = "admin") {
  if (typeof window === "undefined") return;

  const payload = {
    type: "CMS_UPDATED",
    source,
    timestamp: Date.now(),
  };

  // 1. BroadcastChannel (Instant multi-tab communication)
  try {
    if ("BroadcastChannel" in window) {
      const channel = new BroadcastChannel(CMS_SYNC_CHANNEL_NAME);
      channel.postMessage(payload);
      channel.close();
    }
  } catch {
    // Ignore cross-origin broadcast restrictions if any
  }

  // 2. LocalStorage Event (Triggers 'storage' event in other tabs)
  try {
    localStorage.setItem(CMS_SYNC_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage quota or incognito restrictions
  }
}
