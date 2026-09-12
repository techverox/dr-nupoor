import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { checkMediaUsage } from "@/lib/services/mediaService";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "media.view");
  if (!guard.authorized) return guard.response!;

  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ success: false, error: "URL query parameter required." }, { status: 400 });
  }

  const result = await checkMediaUsage(url);
  return NextResponse.json({ success: true, ...result });
}

