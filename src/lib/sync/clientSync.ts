/**
 * Dr. Noopur Patel Clinic — Real-Time Live Sync Infrastructure
 * Provides zero-latency cross-tab & cross-device state synchronization.
 * 
 * 1. BroadcastChannel (Multi-channel: "drn-live-sync", "drn-cms-sync", "digivigee-cms-sync")
 * 2. LocalStorage storage events for cross-tab fallback
 * 3. Direct Cloud Firestore onSnapshot listeners for 100% live multi-device realtime sync
 */

import { getFirebaseFirestore } from "@/lib/firebase/client";
import { collection, onSnapshot } from "firebase/firestore";

export interface LiveSyncEvent {
  type: "CMS_MUTATION" | "DATABASE_SYNC" | "SETTINGS_UPDATE" | "FIRESTORE_LIVE_SYNC";
  collection?: string;
  id?: string;
  timestamp: number;
}

const PRIMARY_CHANNEL = "drn-live-sync";
const COMPAT_CHANNELS = ["drn-cms-sync", "digivigee-cms-sync"];
const STORAGE_KEYS = [
  "drn_last_live_sync_event",
  "drn_cms_updated",
  "digivigee_cms_updated",
];

const activeChannels: BroadcastChannel[] = [];

function getBroadcastChannels(): BroadcastChannel[] {
  if (typeof window === "undefined" || !("BroadcastChannel" in window)) return [];

  if (activeChannels.length === 0) {
    const allNames = [PRIMARY_CHANNEL, ...COMPAT_CHANNELS];
    for (const name of allNames) {
      try {
        activeChannels.push(new BroadcastChannel(name));
      } catch (e) {
        console.warn(`[LiveSync] Failed to open channel ${name}:`, e);
      }
    }
  }
  return activeChannels;
}

/**
 * Notifies all active browser windows and tabs of a live data mutation.
 */
export function notifyLiveSync(
  collectionName?: string,
  id?: string,
  type: LiveSyncEvent["type"] = "CMS_MUTATION"
): void {
  if (typeof window === "undefined") return;

  const event: LiveSyncEvent = {
    type,
    collection: collectionName,
    id,
    timestamp: Date.now(),
  };

  // 1. Post to all BroadcastChannels
  const channels = getBroadcastChannels();
  for (const ch of channels) {
    try {
      ch.postMessage(event);
    } catch {
      // Ignore broadcast errors
    }
  }

  // 2. Storage event fallback for cross-tab notification
  const rawPayload = JSON.stringify(event);
  for (const key of STORAGE_KEYS) {
    try {
      localStorage.setItem(key, rawPayload);
    } catch {
      // Graceful fallback for incognito or restricted storage
    }
  }
}

/**
 * Subscribes a client component to live sync events across tabs.
 * Returns an unsubscription function.
 */
export function subscribeLiveSync(callback: (event: LiveSyncEvent) => void): () => void {
  if (typeof window === "undefined") return () => {};

  const handleMessage = (e: MessageEvent<unknown>) => {
    if (e.data && typeof e.data === "object") {
      const data = e.data as Partial<LiveSyncEvent>;
      callback({
        type: data.type || "CMS_MUTATION",
        collection: data.collection,
        id: data.id,
        timestamp: data.timestamp || Date.now(),
      });
    }
  };

  const handleStorage = (e: StorageEvent) => {
    if (e.key && STORAGE_KEYS.includes(e.key) && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue) as LiveSyncEvent;
        callback(parsed);
      } catch {
        callback({
          type: "CMS_MUTATION",
          timestamp: Date.now(),
        });
      }
    }
  };

  const channels = getBroadcastChannels();
  for (const ch of channels) {
    ch.addEventListener("message", handleMessage);
  }
  window.addEventListener("storage", handleStorage);

  return () => {
    for (const ch of channels) {
      ch.removeEventListener("message", handleMessage);
    }
    window.removeEventListener("storage", handleStorage);
  };
}

/**
 * Sets up live Cloud Firestore onSnapshot listeners for public CMS collections.
 * Enables 100% real-time cross-device updates directly from Firestore.
 */
export function setupFirestoreRealtimeListener(
  onDataChange: (collectionName: string) => void
): () => void {
  if (typeof window === "undefined") return () => {};

  const db = getFirebaseFirestore();
  if (!db) {
    return () => {};
  }

  const collectionsToListen = [
    "siteSettings",
    "services",
    "blogs",
    "faqs",
    "testimonials",
    "pages",
    "portfolio",
    "team",
  ];

  const unsubs: Array<() => void> = [];

  for (const colName of collectionsToListen) {
    try {
      const colRef = collection(db, colName);
      let isInitialLoad = true;

      const unsub = onSnapshot(
        colRef,
        { includeMetadataChanges: false },
        (snapshot) => {
          if (isInitialLoad) {
            isInitialLoad = false;
            return;
          }
          // Only notify when there are genuine document changes
          if (snapshot.docChanges().length > 0) {
            onDataChange(colName);
          }
        },
        (error) => {
          // Gracefully handle permission-denied or offline without crashing
          if (process.env.NODE_ENV === "development") {
            console.debug(`[Firestore Realtime Listener] Info (${colName}):`, error.message);
          }
        }
      );

      unsubs.push(unsub);
    } catch {
      // Ignore initial setup exceptions for offline mode
    }
  }

  return () => {
    for (const unsub of unsubs) {
      try {
        unsub();
      } catch {
        // Ignore unbind error
      }
    }
  };
}
