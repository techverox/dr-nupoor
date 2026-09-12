import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { saveOffer, deleteOffer, toggleOfferStatus } from "@/lib/services/offerService";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "offers.edit");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const body = await request.json();

    if (body.action === "toggle") {
      const result = await toggleOfferStatus(id, body.isActive);
      return NextResponse.json(result);
    }

    const result = await saveOffer(body, id);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/offers/[id] PUT] Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "offers.delete");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const result = await deleteOffer(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/offers/[id] DELETE] Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}

