import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { duplicateFormAdmin } from "@/lib/services/formService";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requirePermission(request, "forms.create");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const duplicated = await duplicateFormAdmin(id);
    return NextResponse.json({ success: true, form: duplicated }, { status: 201 });
  } catch (error: unknown) {
    console.error("[POST /api/admin/forms/[id]/duplicate] Error:", error);
    const message = error instanceof Error ? error.message : "Failed to duplicate form.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

