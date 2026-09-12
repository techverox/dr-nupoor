import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import {
  saveRedirect,
  deleteRedirect,
  toggleRedirectStatus,
} from "@/lib/services/redirectService";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "redirects.edit");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const body = await request.json();

    if (body.action === "toggle") {
      const result = await toggleRedirectStatus(id);
      return NextResponse.json(result);
    }

    const result = await saveRedirect(body, id);
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/redirects/[id] PUT] Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "redirects.delete");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const result = await deleteRedirect(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/redirects/[id] DELETE] Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}

