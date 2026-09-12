import { NextRequest, NextResponse } from "next/server";
import { processPublicFormSubmission } from "@/lib/services/formService";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    let body: {
      values?: Record<string, unknown>;
      landingPageId?: string;
      landingPageSlug?: string;
      source?: string;
      pageUrl?: string;
      referrer?: string;
      website_hp?: string;
      formStartTime?: number;
      utmSource?: string;
      utmMedium?: string;
      utmCampaign?: string;
      utmContent?: string;
      utmTerm?: string;
      sessionId?: string;
      visitorId?: string;
    };

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON submission payload." },
        { status: 400 }
      );
    }

    // Resolve client IP for rate limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || undefined;
    const referrer = request.headers.get("referer") || body.referrer;

    const result = await processPublicFormSubmission(
      id,
      body.values || {},
      clientIp,
      {
        landingPageId: body.landingPageId,
        landingPageSlug: body.landingPageSlug,
        source: body.source,
        pageUrl: body.pageUrl,
        referrer,
        userAgent,
        website_hp: body.website_hp,
        formStartTime: body.formStartTime,
        utmSource: body.utmSource,
        utmMedium: body.utmMedium,
        utmCampaign: body.utmCampaign,
        utmContent: body.utmContent,
        utmTerm: body.utmTerm,
        sessionId: body.sessionId,
        visitorId: body.visitorId,
      }
    );

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Please check the required fields and try again.",
          fieldErrors: result.fieldErrors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        submissionId: result.submissionId,
        leadId: result.leadId,
        successAction: result.successAction,
        successMessage: result.successMessage,
        redirectUrl: result.redirectUrl,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("[POST /api/forms/[id]/submit] Uncaught error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your submission. Please try again.",
      },
      { status: 500 }
    );
  }
}
