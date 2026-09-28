import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import {
  getLeadByIdAdmin,
  updateLeadAdmin,
  deleteLeadAdmin,
} from "@/lib/services/leadService";
import { recordAuditLog } from "@/lib/services/auditLogService";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requirePermission(request, "leads.view");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const lead = await getLeadByIdAdmin(id);
    if (!lead) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, lead }, { status: 200 });
  } catch (error: unknown) {
    console.error("[GET /api/admin/leads/[id]] Error:", error);
    return NextResponse.json({ success: false, error: "Failed to load lead" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requirePermission(request, "leads.edit");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await updateLeadAdmin(id, {
      ...body,
      noteAuthor: guard.user?.email || "Admin User",
    });

    if (guard.user) {
      const actor = {
        uid: guard.user.uid,
        email: guard.user.email,
        displayName: guard.user.displayName || guard.user.email.split("@")[0],
        role: guard.user.role,
        roleName: guard.user.roleName,
      };

      await recordAuditLog({
        actor,
        action: "LEAD_STATUS_CHANGE",
        resourceType: "lead",
        resourceId: id,
        resourceTitle: updated.name || updated.email,
        summary: `Updated lead status / metadata for "${updated.name || updated.email}" (${updated.status})`,
        status: "success",
        metadata: { newStatus: updated.status },
      });
    }

    return NextResponse.json({ success: true, lead: updated }, { status: 200 });
  } catch (error: unknown) {
    console.error("[PATCH /api/admin/leads/[id]] Error:", error);
    const message = error instanceof Error ? error.message : "Failed to update lead";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requirePermission(request, "leads.delete");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const existing = await getLeadByIdAdmin(id);
    await deleteLeadAdmin(id);

    if (guard.user) {
      const actor = {
        uid: guard.user.uid,
        email: guard.user.email,
        displayName: guard.user.displayName || guard.user.email.split("@")[0],
        role: guard.user.role,
        roleName: guard.user.roleName,
      };

      await recordAuditLog({
        actor,
        action: "LEAD_DELETE",
        resourceType: "lead",
        resourceId: id,
        resourceTitle: existing?.name || existing?.email || id,
        summary: `Deleted sales lead "${existing?.name || existing?.email || id}"`,
        status: "success",
      });
    }

    return NextResponse.json({ success: true, message: "Lead removed" }, { status: 200 });
  } catch (error: unknown) {
    console.error("[DELETE /api/admin/leads/[id]] Error:", error);
    const message = error instanceof Error ? error.message : "Failed to delete lead";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
