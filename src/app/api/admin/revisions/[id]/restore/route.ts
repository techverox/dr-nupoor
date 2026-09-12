import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { restoreContentRevision } from "@/lib/services/revisionService";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "revisions.restore");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const actor = {
      uid: guard.user!.uid,
      email: guard.user!.email,
      displayName: guard.user!.displayName || guard.user!.email.split("@")[0],
      role: guard.user!.role,
      roleName: guard.user!.roleName,
    };

    const result = await restoreContentRevision(id, actor);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Failed to restore revision snapshot." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      newVersion: result.newVersion,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal error while restoring revision.";
    console.error("[/api/admin/revisions/[id]/restore POST] Error:", error);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
