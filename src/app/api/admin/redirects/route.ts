import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { getAllRedirectsAdmin, saveRedirect, resetRedirectsAdmin } from "@/lib/services/redirectService";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "redirects.view");
  if (!guard.authorized) return guard.response!;

  const redirects = await getAllRedirectsAdmin();
  return NextResponse.json({ success: true, redirects });
}

export async function POST(request: NextRequest) {
  const guard = await requirePermission(request, "redirects.create");
  if (!guard.authorized) return guard.response!;

  try {
    const body = await request.json();

    if (body.action === "reset") {
      const resetResult = await resetRedirectsAdmin();
      return NextResponse.json(resetResult);
    }

    const result = await saveRedirect(body);
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/redirects POST] Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}

