"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  subscribeLiveSync,
  setupFirestoreRealtimeListener,
  LiveSyncEvent,
} from "@/lib/sync/clientSync";

/**
 * LiveSyncListener provides seamless 100% real-time UI synchronization
 * between the Admin Panel, Cloud Firestore, and the Public Website.
 *
 * 1. Cross-Tab / Cross-Window: BroadcastChannel + LocalStorage event triggers instant router.refresh().
 * 2. Cross-Device / Cloud: Live Firestore onSnapshot listeners detect any database change in real time.
 * 3. Window Focus: Re-checks sync state when returning to a dormant tab.
 */
export function LiveSyncListener() {
  const router = useRouter();
  const lastSyncTimeRef = useRef<number>(Date.now());
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const triggerDebouncedRefresh = () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
      refreshTimeoutRef.current = setTimeout(() => {
        try {
          router.refresh();
        } catch (e) {
          console.warn("[LiveSync] Refresh error:", e);
        }
      }, 350);
    };

    // 1. Subscribe to instant cross-tab broadcast events (Admin -> Website in same browser)
    const unsubscribeBroadcast = subscribeLiveSync((event: LiveSyncEvent) => {
      lastSyncTimeRef.current = event.timestamp;
      triggerDebouncedRefresh();
    });

    // 2. Subscribe to Cloud Firestore onSnapshot for 100% live multi-device database sync
    const unsubscribeFirestore = setupFirestoreRealtimeListener((colName) => {
      lastSyncTimeRef.current = Date.now();
      triggerDebouncedRefresh();
    });

    // 3. Window focus sync: when returning to the tab, check if updates happened while away
    const handleFocus = () => {
      try {
        const stored = localStorage.getItem("drn_last_live_sync_event");
        if (stored) {
          const parsed = JSON.parse(stored) as LiveSyncEvent;
          if (parsed.timestamp && parsed.timestamp > lastSyncTimeRef.current) {
            lastSyncTimeRef.current = parsed.timestamp;
            triggerDebouncedRefresh();
          }
        }
      } catch {
        // Silently handle restricted storage in incognito
      }
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      unsubscribeBroadcast();
      unsubscribeFirestore();
      window.removeEventListener("focus", handleFocus);
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [router]);

  return null;
}
