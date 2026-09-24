/**
 * Client-Side Attribution & Session Management for Dr. Noopur Patel Platform.
 *
 * Provides privacy-safe visitor & session identifiers and captures standard
 * UTM campaign parameters (utm_source, utm_medium, utm_campaign, utm_content, utm_term).
 * Supports both First-Touch (localStorage) and Current-Session (sessionStorage) attribution models.
 * Completely fail-safe: will never throw if storage is restricted or disabled.
 */

const STORAGE_KEYS = {
  SESSION_ID: "drn_session_id",
  VISITOR_ID: "drn_visitor_id",
  SESSION_UTM: "drn_session_utm",
  FIRST_TOUCH_UTM: "drn_first_touch_utm",
  REFERRER: "drn_initial_referrer",
} as const;

export interface UtmParams {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
}

export interface AttributionContext extends UtmParams {
  sessionId: string;
  visitorId: string;
  referrer?: string;
  isFirstTouch?: boolean;
}

/**
 * Generates a privacy-safe pseudo-random identifier (UUIDv4 compatible).
 */
function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Safely accesses sessionStorage.
 */
function getSessionStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

/**
 * Safely accesses localStorage.
 */
function getLocalStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

/**
 * Retrieves or initializes the current session identifier.
 * Persists for the duration of the browser tab.
 */
export function getOrCreateSessionId(): string {
  const session = getSessionStorage();
  if (!session) return generateId();

  try {
    let sessionId = session.getItem(STORAGE_KEYS.SESSION_ID);
    if (!sessionId) {
      sessionId = generateId();
      session.setItem(STORAGE_KEYS.SESSION_ID, sessionId);
    }
    return sessionId;
  } catch {
    return generateId();
  }
}

/**
 * Retrieves or initializes the persistent visitor identifier.
 * Stored in localStorage (privacy-safe randomized UUID, no fingerprinting).
 */
export function getOrCreateVisitorId(): string {
  const local = getLocalStorage();
  if (!local) return generateId();

  try {
    let visitorId = local.getItem(STORAGE_KEYS.VISITOR_ID);
    if (!visitorId) {
      visitorId = generateId();
      local.setItem(STORAGE_KEYS.VISITOR_ID, visitorId);
    }
    return visitorId;
  } catch {
    return generateId();
  }
}

/**
 * Inspects a URL search string and extracts standard UTM parameters.
 */
export function parseUtmParameters(searchStr?: string): UtmParams | null {
  if (typeof window === "undefined" && !searchStr) return null;
  const query = searchStr ?? (typeof window !== "undefined" ? window.location.search : "");
  if (!query) return null;

  try {
    const params = new URLSearchParams(query);
    const source = params.get("utm_source")?.trim();
    const medium = params.get("utm_medium")?.trim();
    const campaign = params.get("utm_campaign")?.trim();
    const content = params.get("utm_content")?.trim();
    const term = params.get("utm_term")?.trim();

    if (source || medium || campaign || content || term) {
      return {
        ...(source ? { utmSource: source } : {}),
        ...(medium ? { utmMedium: medium } : {}),
        ...(campaign ? { utmCampaign: campaign } : {}),
        ...(content ? { utmContent: content } : {}),
        ...(term ? { utmTerm: term } : {}),
      };
    }
  } catch {
    // Non-blocking
  }
  return null;
}

/**
 * Captures and persists UTM attribution upon landing on any page.
 * Updates the current session UTM and sets first-touch UTM if not already present.
 */
export function captureLandingAttribution(): void {
  if (typeof window === "undefined") return;

  const currentUtms = parseUtmParameters();
  const session = getSessionStorage();
  const local = getLocalStorage();

  try {
    // Record initial external referrer if available and not from our own domain
    if (document.referrer && session) {
      try {
        const refUrl = new URL(document.referrer);
        if (refUrl.hostname !== window.location.hostname && !session.getItem(STORAGE_KEYS.REFERRER)) {
          session.setItem(STORAGE_KEYS.REFERRER, document.referrer);
        }
      } catch {
        // Ignore invalid referrer
      }
    }

    if (currentUtms) {
      // 1. Store in current session
      if (session) {
        session.setItem(STORAGE_KEYS.SESSION_UTM, JSON.stringify(currentUtms));
      }

      // 2. Store in first-touch (only if not already set)
      if (local && !local.getItem(STORAGE_KEYS.FIRST_TOUCH_UTM)) {
        local.setItem(STORAGE_KEYS.FIRST_TOUCH_UTM, JSON.stringify(currentUtms));
      }
    }
  } catch {
    // Fail silently without blocking UI
  }
}

/**
 * Returns the active attribution context to be attached to form submissions,
 * leads, newsletter signups, or analytics events.
 * Resolves Session UTM -> falling back to First-Touch UTM.
 */
export function getAttributionContext(): AttributionContext {
  const sessionId = getOrCreateSessionId();
  const visitorId = getOrCreateVisitorId();

  let utmSource: string | undefined;
  let utmMedium: string | undefined;
  let utmCampaign: string | undefined;
  let utmContent: string | undefined;
  let utmTerm: string | undefined;
  let referrer: string | undefined;

  const session = getSessionStorage();
  const local = getLocalStorage();

  try {
    if (session) {
      referrer = session.getItem(STORAGE_KEYS.REFERRER) || undefined;
      const sessionUtmRaw = session.getItem(STORAGE_KEYS.SESSION_UTM);
      if (sessionUtmRaw) {
        const parsed = JSON.parse(sessionUtmRaw) as UtmParams;
        utmSource = parsed.utmSource;
        utmMedium = parsed.utmMedium;
        utmCampaign = parsed.utmCampaign;
        utmContent = parsed.utmContent;
        utmTerm = parsed.utmTerm;
      }
    }

    // Fall back to first-touch UTM if not present in current session
    if (!utmSource && local) {
      const firstTouchRaw = local.getItem(STORAGE_KEYS.FIRST_TOUCH_UTM);
      if (firstTouchRaw) {
        const parsed = JSON.parse(firstTouchRaw) as UtmParams;
        utmSource = parsed.utmSource;
        utmMedium = parsed.utmMedium;
        utmCampaign = parsed.utmCampaign;
        utmContent = parsed.utmContent;
        utmTerm = parsed.utmTerm;
      }
    }
  } catch {
    // Fail silently
  }

  return {
    sessionId,
    visitorId,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    utmTerm,
    referrer,
  };
}
