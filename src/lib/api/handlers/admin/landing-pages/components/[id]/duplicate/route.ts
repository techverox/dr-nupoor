import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { duplicateReusableComponent } from "@/lib/services/reusableComponentService";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "landing_pages.create");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const duplicated = await duplicateReusableComponent(id);

    return NextResponse.json({
      success: true,
      component: duplicated,
      message: `Duplicated master component as "${duplicated.name}".`,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to duplicate master component.";
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}

