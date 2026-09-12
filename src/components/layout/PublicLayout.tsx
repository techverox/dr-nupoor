"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CMS_SYNC_CHANNEL_NAME, CMS_SYNC_STORAGE_KEY } from "@/lib/utils/realtimeSync";

export interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdminRoute = pathname ? pathname.startsWith("/admin") : false;

  // Real-time synchronization across tabs and when user switches focus to website
  useEffect(() => {
    if (isAdminRoute) return;

    // 1. BroadcastChannel for instant zero-latency cross-tab sync
    let channel: BroadcastChannel | null = null;
    try {
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        channel = new BroadcastChannel(CMS_SYNC_CHANNEL_NAME);
        channel.onmessage = (event) => {
          if (event.data?.type === "CMS_UPDATED") {
            router.refresh();
          }
        };
      }
    } catch {
      // Graceful fallback
    }

    // 2. Storage event listener (fires in all other tabs when localStorage is updated)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === CMS_SYNC_STORAGE_KEY) {
        router.refresh();
      }
    };
    window.addEventListener("storage", handleStorage);

    // 3. Tab visibility / focus sync: When switching back to public tab, refresh fresh data
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        router.refresh();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", handleVisibility);

    return () => {
      channel?.close();
      window.removeEventListener("storage", handleStorage);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", handleVisibility);
    };
  }, [isAdminRoute, router]);

  // On Admin routes (/admin, /admin/login, /admin/*), do NOT render public header, footer, or floating WhatsApp button
  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="bg-saas-light-mint" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative" }}>
      <Header />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
      <WhatsAppButton variant="floating" />
    </div>
  );
}
