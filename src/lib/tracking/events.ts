/**
 * Privacy-conscious event tracking abstraction for Dr. Noopur Patel Platform.
 * Dispatches to First-Party Analytics Engine (/api/analytics/events), Google Analytics (gtag),
 * Meta Pixel (fbq), and native DOM events safely.
 * Will NEVER throw errors or degrade client performance if providers are blocked or offline.
 */

import { getFirebaseAnalytics } from "@/lib/firebase/client";
import { logEvent } from "firebase/analytics";
import { getAttributionContext } from "./attribution";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

export type DrNoopurEvent =
  | "page_view"
  | "landing_page_view"
  | "cta_click"
  | "form_interaction"
  | "form_submission"
  | "lead_created"
  | "consultation_request"
  | "whatsapp_click"
  | "primary_cta_click"
  | "newsletter_subscription";

export type DigiVigeeEvent = DrNoopurEvent;

export function trackEvent(
  eventName: DrNoopurEvent | string,
  params: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;

  try {
    const attr = getAttributionContext();
    const now = new Date().toISOString();

    const enrichedParams = {
      ...params,
      sessionId: attr.sessionId,
      visitorId: attr.visitorId,
      utmSource: attr.utmSource,
      utmMedium: attr.utmMedium,
      utmCampaign: attr.utmCampaign,
      utmContent: attr.utmContent,
      utmTerm: attr.utmTerm,
      referrer: attr.referrer || (document.referrer || undefined),
      timestamp: now,
      path: window.location.pathname,
      pageTitle: document.title || undefined,
    };

    // 1. First-Party Analytics Engine API (Async, Non-blocking)
    try {
      const payload = JSON.stringify({
        eventName,
        eventType:
          eventName === "page_view" || eventName === "landing_page_view"
            ? "page_view"
            : eventName === "form_submission"
            ? "form_submission"
            : eventName === "newsletter_subscription"
            ? "newsletter_subscription"
            : eventName === "lead_created"
            ? "lead_created"
            : eventName === "whatsapp_click"
            ? "whatsapp_click"
            : "cta_click",
        path: window.location.pathname,
        pageTitle: document.title || undefined,
        timestamp: now,
        sessionId: attr.sessionId,
        visitorId: attr.visitorId,
        referrer: attr.referrer || (document.referrer || undefined),
        utmSource: attr.utmSource,
        utmMedium: attr.utmMedium,
        utmCampaign: attr.utmCampaign,
        utmContent: attr.utmContent,
        utmTerm: attr.utmTerm,
        metadata: Object.fromEntries(
          Object.entries(params).filter(
            ([, v]) =>
              typeof v === "string" || typeof v === "number" || typeof v === "boolean"
          )
        ),
      });

      if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon("/api/analytics/events", blob);
      } else {
        fetch("/api/analytics/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {
          // Non-blocking fallback
        });
      }
    } catch {
      // Non-blocking fallback
    }

    // 2. Google Analytics (gtag)
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, enrichedParams);
    }

    // 3. Google Tag Manager (dataLayer event push)
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        ...enrichedParams,
      });
    }

    // 4. Meta Pixel (fbq) for lead/form events
    if (typeof window.fbq === "function") {
      if (eventName === "lead_created" || eventName === "consultation_request") {
        window.fbq("track", "Lead", enrichedParams);
      } else if (eventName === "newsletter_subscription") {
        window.fbq("track", "Subscribe", enrichedParams);
      }
    }

    // 4. Firebase Analytics SDK
    getFirebaseAnalytics()
      .then((instance) => {
        if (instance) {
          logEvent(instance, eventName, enrichedParams);
        }
      })
      .catch(() => {
        // Non-blocking fallback
      });

    // 5. Native Custom DOM Event (for client listeners/audit)
    window.dispatchEvent(
      new CustomEvent("drn:analytics", {
        detail: { event: eventName, params: enrichedParams },
      })
    );

    if (process.env.NODE_ENV === "development") {
      console.log(`[Dr. Noopur Analytics] Event tracked: "${eventName}"`, enrichedParams);
    }
  } catch (error) {
    // Analytics failure must NEVER break the website
    console.warn("[Dr. Noopur Analytics] Event tracking error:", error);
  }
}
