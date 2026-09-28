import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { generateDataBackupBundle } from "@/lib/services/backupService";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const guard = await requirePermission(request, "backup.export");
  if (!guard.authorized) return guard.response!;

  try {
    const body = await request.json().catch(() => ({}));
    const selectedCollections = Array.isArray(body.collections) ? body.collections : undefined;

    const actor = {
      uid: guard.user!.uid,
      email: guard.user!.email,
      displayName: guard.user!.displayName || guard.user!.email.split("@")[0],
      role: guard.user!.role,
      roleName: guard.user!.roleName,
    };

    const backupBundle = await generateDataBackupBundle({
      selectedCollections,
      actor,
    });

    const filename = `digivigee-database-backup-${Date.now()}.json`;

    return new NextResponse(backupBundle.jsonContent, {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to generate database backup.";
    console.error("[/api/admin/backup/export POST] Error:", error);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "backup.export");
  if (!guard.authorized) return guard.response!;

  try {
    const actor = {
      uid: guard.user!.uid,
      email: guard.user!.email,
      displayName: guard.user!.displayName || guard.user!.email.split("@")[0],
      role: guard.user!.role,
      roleName: guard.user!.roleName,
    };

    const backupBundle = await generateDataBackupBundle({
      actor,
    });

    const filename = `digivigee-database-full-backup-${Date.now()}.json`;

    return new NextResponse(backupBundle.jsonContent, {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to generate database backup.";
    console.error("[/api/admin/backup/export GET] Error:", error);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
