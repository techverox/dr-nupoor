import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/config/firebase";
import { FieldValue } from "firebase-admin/firestore";

// In-memory sliding-window rate limiter (60 events per minute per IP)
const ipRateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_EVENTS_PER_WINDOW = 60;

function checkEventRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_EVENTS_PER_WINDOW) {
    return false;
  }

  recent.push(now);
  ipRateLimitMap.set(ip, recent);
  return true;
}

// Clean up stale IP timestamps every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of ipRateLimitMap.entries()) {
    const active = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (active.length === 0) {
      ipRateLimitMap.delete(ip);
    } else {
      ipRateLimitMap.set(ip, active);
    }
  }
}, 5 * 60 * 1000);

export async function POST(request: NextRequest) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp || "127.0.0.1";

    // Rate Limit Check
    if (!checkEventRateLimit(clientIp)) {
      return NextResponse.json(
        { success: false, error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid payload format" },
        { status: 400 }
      );
    }

    const payload = body as Record<string, unknown>;
    const eventName = typeof payload.eventName === "string" ? payload.eventName.slice(0, 60) : "custom_event";
    const eventType = typeof payload.eventType === "string" ? payload.eventType.slice(0, 40) : "page_view";
    const path = typeof payload.path === "string" ? payload.path.slice(0, 300) : "/";
    const pageTitle = typeof payload.pageTitle === "string" ? payload.pageTitle.slice(0, 150) : undefined;
    const sessionId = typeof payload.sessionId === "string" ? payload.sessionId.slice(0, 100) : "unknown";
    const visitorId = typeof payload.visitorId === "string" ? payload.visitorId.slice(0, 100) : "unknown";
    const referrer = typeof payload.referrer === "string" ? payload.referrer.slice(0, 300) : undefined;
    const utmSource = typeof payload.utmSource === "string" ? payload.utmSource.slice(0, 100) : undefined;
    const utmMedium = typeof payload.utmMedium === "string" ? payload.utmMedium.slice(0, 100) : undefined;
    const utmCampaign = typeof payload.utmCampaign === "string" ? payload.utmCampaign.slice(0, 100) : undefined;
    const utmContent = typeof payload.utmContent === "string" ? payload.utmContent.slice(0, 100) : undefined;
    const utmTerm = typeof payload.utmTerm === "string" ? payload.utmTerm.slice(0, 100) : undefined;

    // Filter metadata safely - allow ONLY strings, numbers, booleans; strip anything nested
    const safeMetadata: Record<string, string | number | boolean> = {};
    if (payload.metadata && typeof payload.metadata === "object") {
      for (const [k, v] of Object.entries(payload.metadata as Record<string, unknown>)) {
        if (k.length > 50) continue;
        if (typeof v === "string") safeMetadata[k] = v.slice(0, 150);
        else if (typeof v === "number" && !isNaN(v)) safeMetadata[k] = v;
        else if (typeof v === "boolean") safeMetadata[k] = v;
      }
    }

    const adminDb = getAdminFirestore();
    if (adminDb) {
      try {
        await adminDb.collection(COLLECTIONS.ANALYTICS_EVENTS).add({
          eventName,
          eventType,
          path,
          pageTitle: pageTitle || null,
          sessionId,
          visitorId,
          referrer: referrer || null,
          utmSource: utmSource || null,
          utmMedium: utmMedium || null,
          utmCampaign: utmCampaign || null,
          utmContent: utmContent || null,
          utmTerm: utmTerm || null,
          metadata: safeMetadata,
          ipAddress: clientIp,
          timestamp: FieldValue.serverTimestamp(),
          createdAt: new Date().toISOString(),
        });
      } catch (dbErr) {
        console.warn("[analytics:events] Firestore write error:", dbErr);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[analytics:events] Unhandled error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
