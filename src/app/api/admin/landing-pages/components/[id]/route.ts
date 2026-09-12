import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import {
  getReusableComponentByIdAdmin,
  updateReusableComponent,
  deleteReusableComponent,
} from "@/lib/services/reusableComponentService";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "landing_pages.view");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const component = await getReusableComponentByIdAdmin(id);

    if (!component) {
      return NextResponse.json(
        { success: false, error: "Master component not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, component });
  } catch (error) {
    console.error("[/api/admin/landing-pages/components/[id] GET] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch master component." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "landing_pages.edit");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await updateReusableComponent(id, body);

    return NextResponse.json({
      success: true,
      component: updated,
      message: `Master component "${updated.name}" updated successfully.`,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to update master component.";
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "landing_pages.delete");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    await deleteReusableComponent(id);

    return NextResponse.json({
      success: true,
      message: "Master component deleted successfully.",
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to delete master component.";
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}
