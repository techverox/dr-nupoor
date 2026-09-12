import { NextRequest, NextResponse } from "next/server";
import { getActiveOffersPublic } from "@/lib/services/offerService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path") || "/";

    const offers = await getActiveOffersPublic(path);
    return NextResponse.json({ success: true, offers });
  } catch (error) {
    console.error("[/api/offers/active GET] Error:", error);
    return NextResponse.json({ success: false, offers: [] }, { status: 500 });
  }
}
