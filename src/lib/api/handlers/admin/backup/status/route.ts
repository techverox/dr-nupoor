import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { getSystemBackupStatus, EXPORTABLE_COLLECTIONS } from "@/lib/services/backupService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "backup.view");
  if (!guard.authorized) return guard.response!;

  try {
    const status = await getSystemBackupStatus();

    return NextResponse.json({
      success: true,
      status,
      exportableCollections: EXPORTABLE_COLLECTIONS,
    });
  } catch (error) {
    console.error("[/api/admin/backup/status GET] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load backup and storage status." },
      { status: 500 }
    );
  }
}
