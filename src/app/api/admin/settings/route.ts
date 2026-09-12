import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { getCmsSiteSettings, saveCmsItem, resetCmsSiteSettingsToDefaults } from "@/lib/services/cmsService";
import { COLLECTIONS } from "@/config/firebase";
import { recordAuditLog } from "@/lib/services/auditLogService";
import { createContentRevision } from "@/lib/services/revisionService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "settings.view");
  if (!guard.authorized) return guard.response!;

  const settings = await getCmsSiteSettings();
  return NextResponse.json({ success: true, settings });
}

export async function POST(request: NextRequest) {
  const guard = await requirePermission(request, "settings.edit");
  if (!guard.authorized) return guard.response!;

  try {
    const body = await request.json();

    // 1-Click Reset to Defaults
    if (body.action === "reset") {
      const resetResult = await resetCmsSiteSettingsToDefaults();

      if (guard.user) {
        const actor = {
          uid: guard.user.uid,
          email: guard.user.email,
          displayName: guard.user.displayName || guard.user.email.split("@")[0],
          role: guard.user.role,
          roleName: guard.user.roleName,
        };

        await createContentRevision({
          resourceType: "settings",
          resourceId: "global",
          resourceTitle: "Global Site Settings",
          snapshot: resetResult.settings as unknown as Record<string, unknown>,
          changeSummary: "Reset global website settings to canonical production defaults",
          actor,
        });

        await recordAuditLog({
          actor,
          action: "RESTORE",
          resourceType: "settings",
          resourceId: "global",
          resourceTitle: "Global Site Settings",
          summary: "Reset global website settings to canonical production defaults",
          status: "success",
        });
      }

      return NextResponse.json({
        success: true,
        settings: resetResult.settings,
        message: "Global website settings successfully reset to canonical defaults.",
      });
    }

    const result = await saveCmsItem(COLLECTIONS.SITE_SETTINGS, body, "global");

    if (result.success && guard.user) {
      const actor = {
        uid: guard.user.uid,
        email: guard.user.email,
        displayName: guard.user.displayName || guard.user.email.split("@")[0],
        role: guard.user.role,
        roleName: guard.user.roleName,
      };

      await createContentRevision({
        resourceType: "settings",
        resourceId: "global",
        resourceTitle: "Global Site Settings",
        snapshot: body,
        changeSummary: "Updated global brand, contact, and social settings",
        actor,
      });

      await recordAuditLog({
        actor,
        action: "SETTINGS_UPDATE",
        resourceType: "settings",
        resourceId: "global",
        resourceTitle: "Global Site Settings",
        summary: "Updated global brand, contact info, and footer parameters",
        status: "success",
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/settings POST] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}


