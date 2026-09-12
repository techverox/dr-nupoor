import { NextRequest, NextResponse } from "next/server";
import { newsletterSubscriberSchema } from "@/lib/validation/lead";
import { createNewsletterSubscriber } from "@/lib/services/leadService";
import { checkRateLimit, resolveClientIp, RATE_LIMIT_PROFILES } from "@/lib/services/rateLimiter";
import { sanitizeNoSqlInput } from "@/lib/validation/inputSanitizer";

export async function POST(request: NextRequest) {
  try {
    const clientIp = resolveClientIp(request.headers);
    const rateCheck = checkRateLimit(`newsletter:${clientIp}`, RATE_LIMIT_PROFILES.NEWSLETTER);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many subscription attempts. Please retry in ${rateCheck.retryAfterSeconds} seconds.`,
        },
        { status: 429 }
      );
    }

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const body = sanitizeNoSqlInput(rawBody);
    const validationResult = newsletterSubscriberSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const result = await createNewsletterSubscriber(validationResult.data, clientIp);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Subscription failed." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: result.message || "Thank you for subscribing to DigiVigee insights!",
        isDuplicate: result.isDuplicate,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[DigiVigee /api/newsletter] Unhandled error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
