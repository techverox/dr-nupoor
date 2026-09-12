import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import {
  getGlobalSeoSettings,
  saveGlobalSeoSettings,
  resetSeoSettingsAdmin,
  getPageSeoDirectory,
  getSeoHealthAudit,
  saveCustomPageSeo,
} from "@/lib/services/seoService";
import { recordAuditLog } from "@/lib/services/auditLogService";
import { createContentRevision } from "@/lib/services/revisionService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "seo.view");
  if (!guard.authorized) return guard.response!;

  const [globalSeo, pageDirectory, seoHealthReport] = await Promise.all([
    getGlobalSeoSettings(),
    getPageSeoDirectory(),
    getSeoHealthAudit(),
  ]);

  return NextResponse.json({
    success: true,
    globalSeo,
    pageDirectory,
    seoHealthReport,
  });
}

export async function POST(request: NextRequest) {
  const guard = await requirePermission(request, "seo.edit");
  if (!guard.authorized) return guard.response!;

  try {
    const body = await request.json();

    if (body.action === "reset") {
      const result = await resetSeoSettingsAdmin();

      if (result.success && guard.user) {
        const actor = {
          uid: guard.user.uid,
          email: guard.user.email,
          displayName: guard.user.displayName || guard.user.email.split("@")[0],
          role: guard.user.role,
          roleName: guard.user.roleName,
        };

        await createContentRevision({
          resourceType: "seo",
          resourceId: "global",
          resourceTitle: "Global SEO Configuration",
          snapshot: (result.settings as unknown as Record<string, unknown>) || {},
          changeSummary: "Reset global SEO settings to canonical DigiVigee defaults",
          actor,
        });

        await recordAuditLog({
          actor,
          action: "SEO_UPDATE",
          resourceType: "seo",
          resourceId: "global",
          resourceTitle: "Global SEO Settings",
          summary: "Restored canonical SEO defaults for digivigee.com",
          status: "success",
        });
      }

      return NextResponse.json({
        success: true,
        message: "SEO configuration restored to canonical DigiVigee defaults.",
        settings: result.settings,
      });
    }

    if (body.action === "save_page_seo") {
      if (!body.routePath) {
        return NextResponse.json({ success: false, error: "Route path is required." }, { status: 400 });
      }
      const result = await saveCustomPageSeo(body.routePath, body.data || {});

      if (result.success && guard.user) {
        const actor = {
          uid: guard.user.uid,
          email: guard.user.email,
          displayName: guard.user.displayName || guard.user.email.split("@")[0],
          role: guard.user.role,
          roleName: guard.user.roleName,
        };

        await createContentRevision({
          resourceType: "seo",
          resourceId: body.routePath,
          resourceTitle: `Page SEO: ${body.routePath}`,
          snapshot: body.data || {},
          changeSummary: `Updated custom SEO metadata for ${body.routePath}`,
          actor,
        });

        await recordAuditLog({
          actor,
          action: "SEO_UPDATE",
          resourceType: "seo",
          resourceId: body.routePath,
          resourceTitle: `Page SEO: ${body.routePath}`,
          summary: `Updated SEO meta tags for route "${body.routePath}"`,
          status: "success",
        });
      }

      return NextResponse.json(result);
    }

    const result = await saveGlobalSeoSettings(body);

    if (result.success && guard.user) {
      const actor = {
        uid: guard.user.uid,
        email: guard.user.email,
        displayName: guard.user.displayName || guard.user.email.split("@")[0],
        role: guard.user.role,
        roleName: guard.user.roleName,
      };

      await createContentRevision({
        resourceType: "seo",
        resourceId: "global",
        resourceTitle: "Global SEO Configuration",
        snapshot: body,
        changeSummary: "Updated global site SEO defaults & verification codes",
        actor,
      });

      await recordAuditLog({
        actor,
        action: "SEO_UPDATE",
        resourceType: "seo",
        resourceId: "global",
        resourceTitle: "Global SEO Settings",
        summary: "Updated global meta titles, verification codes, and indexing policies",
        status: "success",
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/seo POST] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}


