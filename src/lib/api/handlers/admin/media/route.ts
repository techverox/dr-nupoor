import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { getAllMediaAdmin, uploadMediaFile, resetMediaToDefaultsAdmin } from "@/lib/services/mediaService";
import { recordAuditLog } from "@/lib/services/auditLogService";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "media.view");
  if (!guard.authorized) return guard.response!;

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || undefined;

  const items = await getAllMediaAdmin(search);
  return NextResponse.json({ success: true, items });
}

export async function POST(request: NextRequest) {
  const guard = await requirePermission(request, "media.upload");
  if (!guard.authorized) return guard.response!;

  try {
    const contentType = request.headers.get("content-type") || "";

    // Handle 1-Click Reset to Defaults
    if (contentType.includes("application/json")) {
      const body = await request.json();
      if (body.action === "reset") {
        const result = await resetMediaToDefaultsAdmin();
        if (result.success && guard.user) {
          const actor = {
            uid: guard.user.uid,
            email: guard.user.email,
            displayName: guard.user.displayName || guard.user.email.split("@")[0],
            role: guard.user.role,
            roleName: guard.user.roleName,
          };
          await recordAuditLog({
            actor,
            action: "UPDATE",
            resourceType: "media",
            resourceId: "canonical-seed",
            resourceTitle: "Media Library Defaults",
            summary: `Restored ${result.count} canonical DigiVigee media assets`,
            status: "success",
          });
        }
        return NextResponse.json(result);
      }
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const altText = (formData.get("altText") as string) || "";
    const title = (formData.get("title") as string) || "";

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { success: false, error: "Valid file is required for upload." },
        { status: 400 }
      );
    }

    const uploadedFile = file as File;
    const arrayBuffer = await uploadedFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadMediaFile({
      buffer,
      fileName: uploadedFile.name,
      mimeType: uploadedFile.type,
      altText,
      title,
      uploadedBy: guard.user?.email || "admin",
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Upload failed." },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : String(error);
    console.error("[/api/admin/media POST] Error:", error);
    return NextResponse.json(
      { success: false, error: errMessage || "Internal server error." },
      { status: 500 }
    );
  }
}

