"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureLandingAttribution } from "@/lib/tracking/attribution";
import { trackEvent } from "@/lib/tracking/events";

/**
 * Global Client Analytics & Attribution Tracker.
 *
 * Mounted once in RootLayout to automatically:
 * 1. Capture and persist UTM parameters upon landing (first-touch & current-session).
 * 2. Track non-duplicated pageview events across Next.js client-side navigations.
 * 3. Filter out admin dashboard routes (/admin) from public analytics.
 * 4. Remain completely resilient: never throws or blocks rendering.
 */
export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedKeyRef = useRef<string>("");

  useEffect(() => {
    if (!pathname) return;

    // Do not track admin CMS visits as public traffic
    if (pathname.startsWith("/admin")) return;

    // Capture any incoming UTM campaign parameters on landing
    captureLandingAttribution();

    // Prevent duplicate triggers for the exact same path and search query
    const queryString = searchParams?.toString() || "";
    const trackingKey = `${pathname}?${queryString}`;

    if (lastTrackedKeyRef.current === trackingKey) {
      return;
    }
    lastTrackedKeyRef.current = trackingKey;

    const isLandingPage = pathname.startsWith("/landing/");
    const eventName = isLandingPage ? "landing_page_view" : "page_view";

    // Track page view event across First-Party, GA4, GTM, and Meta Pixel
    trackEvent(eventName, {
      path: pathname,
      pageTitle: typeof document !== "undefined" ? document.title : undefined,
      landingPageSlug: isLandingPage ? pathname.replace("/landing/", "") : undefined,
    });

    // Update GA4 SPA route configuration dynamically if active
    if (typeof window !== "undefined" && typeof window.gtag === "function" && process.env.NEXT_PUBLIC_GA_ID) {
      window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
        page_path: pathname,
        page_title: typeof document !== "undefined" ? document.title : undefined,
      });
    }
  }, [pathname, searchParams]);

  return null;
}
