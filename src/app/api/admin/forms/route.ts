import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { getAllFormsAdmin, createFormAdmin, resetFormsAdmin } from "@/lib/services/formService";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "forms.view");
  if (!guard.authorized) return guard.response!;

  try {
    const forms = await getAllFormsAdmin();
    return NextResponse.json({ success: true, forms }, { status: 200 });
  } catch (error: unknown) {
    console.error("[GET /api/admin/forms] Error:", error);
    return NextResponse.json({ success: false, error: "Failed to load forms." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const guard = await requirePermission(request, "forms.create");
  if (!guard.authorized) return guard.response!;

  try {
    const body = await request.json();

    // 1-Click Reset to Defaults action
    if (body.action === "reset") {
      const forms = await resetFormsAdmin();
      return NextResponse.json(
        {
          success: true,
          forms,
          message: "All 6 official forms and lead funnels have been reset to factory defaults.",
        },
        { status: 200 }
      );
    }

    if (!body.name || typeof body.name !== "string" || body.name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Form name must be at least 2 characters long." },
        { status: 400 }
      );
    }

    const newForm = await createFormAdmin({
      ...body,
      createdBy: guard.user?.email || "admin",
    });

    return NextResponse.json({ success: true, form: newForm }, { status: 201 });
  } catch (error: unknown) {
    console.error("[POST /api/admin/forms] Error:", error);
    const message = error instanceof Error ? error.message : "Failed to create form.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

