import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { getAllOffersAdmin, saveOffer, resetOffersAdmin } from "@/lib/services/offerService";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "offers.view");
  if (!guard.authorized) return guard.response!;

  const offers = await getAllOffersAdmin();
  return NextResponse.json({ success: true, offers });
}

export async function POST(request: NextRequest) {
  const guard = await requirePermission(request, "offers.create");
  if (!guard.authorized) return guard.response!;

  try {
    const body = await request.json();

    if (body.action === "reset") {
      const resetResult = await resetOffersAdmin();
      return NextResponse.json(resetResult);
    }

    if (!body.title || !body.title.trim()) {
      return NextResponse.json({ success: false, error: "Offer title is required." }, { status: 400 });
    }

    const result = await saveOffer(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/offers POST] Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}

