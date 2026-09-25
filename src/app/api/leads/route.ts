import { NextRequest, NextResponse } from "next/server";
import { leadSubmissionSchema } from "@/lib/validation/lead";
import { createLead } from "@/lib/services/leadService";
import { resolveClientIp } from "@/lib/services/rateLimiter";
import { sanitizeNoSqlInput } from "@/lib/validation/inputSanitizer";

export async function POST(request: NextRequest) {
  try {
    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    // 1. Sanitize payload against NoSQL operator injection
    const body = sanitizeNoSqlInput(rawBody);

    // 2. Zod Schema Validation & Sanitization
    const validationResult = leadSubmissionSchema.safeParse(body);

    if (!validationResult.success) {
      const formattedErrors: Record<string, string> = {};
      (validationResult.error.issues || []).forEach((err: any) => {
        const field = err.path.join(".");
        formattedErrors[field] = err.message;
      });

      return NextResponse.json(
        {
          success: false,
          error: "Please check the required fields and try again.",
          fieldErrors: formattedErrors,
        },
        { status: 400 }
      );
    }

    // 3. Resolve Client IP accurately
    const clientIp = resolveClientIp(request.headers);

    // 4. Persist Lead Document with Rate Limiting
    const result = await createLead(validationResult.data, clientIp);

    if (!result.success) {
      const statusCode = result.error?.includes("Too many") ? 429 : 500;
      return NextResponse.json(
        { success: false, error: result.error || "Failed to process lead inquiry." },
        { status: statusCode }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you. Your consultation request has been received. Dr. Noopur Patel's clinical coordinator will contact you shortly.",
        leadId: result.leadId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Dr. Noopur Patel /api/leads] Unhandled POST error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please contact us via phone or WhatsApp." },
      { status: 500 }
    );
  }
}
