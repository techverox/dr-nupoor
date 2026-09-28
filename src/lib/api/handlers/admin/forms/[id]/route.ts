import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import {
  getFormByIdAdmin,
  updateFormAdmin,
  deleteFormAdmin,
} from "@/lib/services/formService";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requirePermission(request, "forms.view");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const form = await getFormByIdAdmin(id);
    if (!form) {
      return NextResponse.json({ success: false, error: "Form not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, form }, { status: 200 });
  } catch (error: unknown) {
    console.error("[GET /api/admin/forms/[id]] Error:", error);
    return NextResponse.json({ success: false, error: "Failed to load form" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requirePermission(request, "forms.edit");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await updateFormAdmin(id, body);
    return NextResponse.json({ success: true, form: updated }, { status: 200 });
  } catch (error: unknown) {
    console.error("[PUT /api/admin/forms/[id]] Error:", error);
    const message = error instanceof Error ? error.message : "Failed to update form";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requirePermission(request, "forms.delete");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    await deleteFormAdmin(id);
    return NextResponse.json({ success: true, message: "Form deleted successfully" }, { status: 200 });
  } catch (error: unknown) {
    console.error("[DELETE /api/admin/forms/[id]] Error:", error);
    const message = error instanceof Error ? error.message : "Failed to delete form";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

