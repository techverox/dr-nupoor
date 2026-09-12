"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { OfferItem } from "@/types";
import { trackEvent } from "@/lib/tracking/events";

export function OfferNotificationBanner() {
  const pathname = usePathname();
  const [activeOffer, setActiveOffer] = useState<OfferItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Never show promotional popups in the admin area or contact desk
    if (pathname.startsWith("/admin") || pathname === "/contact") {
      setActiveOffer(null);
      setIsVisible(false);
      return;
    }

    const fetchOffers = async () => {
      try {
        const res = await fetch(`/api/offers/active?path=${encodeURIComponent(pathname)}`, { cache: "no-store" });
        const data = await res.json();

        if (data.success && data.offers && data.offers.length > 0) {
          const offer: OfferItem = data.offers[0];

          // Check Frequency Suppression
          if (offer.displayFrequency === "once_per_session") {
            const dismissed = sessionStorage.getItem(`digivigee_offer_dismissed_${offer.id}`);
            if (dismissed) return;
          } else if (offer.displayFrequency === "once_per_day") {
            const dismissedAt = localStorage.getItem(`digivigee_offer_dismissed_${offer.id}`);
            if (dismissedAt) {
              const elapsed = Date.now() - parseInt(dismissedAt, 10);
              if (elapsed < 24 * 60 * 60 * 1000) return;
            }
          }

          setActiveOffer(offer);
          setIsVisible(true);
        } else {
          setActiveOffer(null);
          setIsVisible(false);
        }
      } catch {
        setActiveOffer(null);
        setIsVisible(false);
      }
    };

    fetchOffers();

    let channel: BroadcastChannel | null = null;
    try {
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        channel = new BroadcastChannel("digivigee-cms-sync");
        channel.onmessage = (e) => {
          if (e.data?.type === "CMS_UPDATED") {
            fetchOffers();
          }
        };
      }
    } catch {}

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "digivigee_cms_updated") {
        fetchOffers();
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      channel?.close();
      window.removeEventListener("storage", handleStorage);
    };
  }, [pathname]);

  // Keyboard accessibility: ESC to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleDismiss = () => {
    if (!activeOffer) return;
    setIsVisible(false);

    if (activeOffer.displayFrequency === "once_per_session") {
      sessionStorage.setItem(`digivigee_offer_dismissed_${activeOffer.id}`, "true");
    } else if (activeOffer.displayFrequency === "once_per_day") {
      localStorage.setItem(`digivigee_offer_dismissed_${activeOffer.id}`, Date.now().toString());
    }
  };

  const handleCtaClick = () => {
    if (activeOffer) {
      trackEvent("primary_cta_click", {
        offerId: activeOffer.id,
        offerTitle: activeOffer.title,
        ctaText: activeOffer.ctaText,
        ctaLink: activeOffer.ctaLink,
      });
    }
  };

  if (!activeOffer || !isVisible) return null;

  return (
    <aside
      role="region"
      aria-label="Promotional Announcement"
      className="fixed bottom-5 left-4 sm:left-6 z-50 max-w-md w-[calc(100vw-2rem)] sm:w-auto bg-slate-950/90 text-white backdrop-blur-md rounded-2xl border border-emerald-500/30 shadow-2xl shadow-emerald-950/40 p-3.5 sm:p-4 transition-all duration-300"
    >
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
          {activeOffer.badgeText && (
            <span className="shrink-0 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-emerald-500 text-slate-950 shadow-sm">
              {activeOffer.badgeText}
            </span>
          )}

          <div className="flex flex-col min-w-0">
            <span className="text-xs sm:text-sm font-bold text-white leading-snug truncate">
              {activeOffer.title}
            </span>
            {activeOffer.description && (
              <span className="text-[11px] text-slate-400 leading-tight truncate">
                {activeOffer.description}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={activeOffer.ctaLink || "#"}
            onClick={handleCtaClick}
            className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all rounded-lg shadow-md shadow-emerald-500/20 whitespace-nowrap active:scale-95"
          >
            {activeOffer.ctaText || "Claim Offer"} →
          </Link>

          <button
            onClick={handleDismiss}
            aria-label="Dismiss Announcement"
            className="p-1 text-slate-400 hover:text-white transition-colors rounded-md hover:bg-slate-800/80"
          >
            <span className="sr-only">Close</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
