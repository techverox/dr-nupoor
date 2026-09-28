import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import {
  getAllLeadsAdmin,
  exportLeadsToCsv,
  resetLeadsAdmin,
  createManualLeadAdmin,
} from "@/lib/services/leadService";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format");

  const requiredPermission = format === "csv" ? "leads.export" : "leads.view";
  const guard = await requirePermission(request, requiredPermission);
  if (!guard.authorized) return guard.response!;

  try {
    const search = searchParams.get("search") || undefined;
    const status = searchParams.get("status") || undefined;

    const leads = await getAllLeadsAdmin({ search, status });

    if (format === "csv") {
      const csv = exportLeadsToCsv(leads);
      const filename = `digivigee-leads-${new Date().toISOString().slice(0, 10)}.csv`;

      return new Response(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    }

    return NextResponse.json({ success: true, leads }, { status: 200 });
  } catch (error: unknown) {
    console.error("[GET /api/admin/leads] Error:", error);
    return NextResponse.json({ success: false, error: "Failed to load leads." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const guard = await requirePermission(request, "leads.create");
  if (!guard.authorized) return guard.response!;

  try {
    const body = await request.json();

    // 1-Click Reset to Defaults action
    if (body.action === "reset") {
      const leads = await resetLeadsAdmin();
      return NextResponse.json(
        {
          success: true,
          leads,
          message: "All 6 official prospective client inquiries have been restored to defaults.",
        },
        { status: 200 }
      );
    }

    // Manual lead creation
    if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
      return NextResponse.json(
        { success: false, error: "Contact name is required." },
        { status: 400 }
      );
    }

    if (!body.email || typeof body.email !== "string" || !body.email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Valid email address is required." },
        { status: 400 }
      );
    }

    const lead = await createManualLeadAdmin({
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone ? String(body.phone).trim() : undefined,
      serviceInterestedIn: body.serviceInterestedIn ? String(body.serviceInterestedIn).trim() : undefined,
      message: body.message ? String(body.message).trim() : undefined,
      status: body.status || "new",
    });

    return NextResponse.json(
      {
        success: true,
        lead,
        message: `Inquiry for "${lead.name}" added successfully.`,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("[POST /api/admin/leads] Error:", error);
    const msg = error instanceof Error ? error.message : "Failed to process lead action.";
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}


