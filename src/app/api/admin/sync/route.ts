import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { syncAllDataToFirestore } from "@/lib/services/syncService";
import { recordAuditLog } from "@/lib/services/auditLogService";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const guard = await requirePermission(request, "settings.edit");
  if (!guard.authorized) return guard.response!;

  try {
    const result = await syncAllDataToFirestore();

    if (result.success && guard.user) {
      await recordAuditLog({
        actor: {
          uid: guard.user.uid,
          email: guard.user.email,
          displayName: guard.user.displayName || guard.user.email.split("@")[0],
          role: guard.user.role,
          roleName: guard.user.roleName,
        },
        action: "SETTINGS_UPDATE",
        resourceType: "settings",
        resourceId: "firestore-sync",
        resourceTitle: "Cloud Firestore Collections Sync",
        summary: "Synchronized all CMS, SEO, page, and RBAC collections to live Firestore.",
        status: "success",
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/sync POST] Error:", error);
    return NextResponse.json(
      { success: false, error: "Database synchronization failed." },
      { status: 500 }
    );
  }
}
