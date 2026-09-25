import { NextResponse } from "next/server";
import { getCmsTestimonials } from "@/lib/services/cmsService";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stories = await getCmsTestimonials();
    return NextResponse.json({
      success: true,
      stories,
      total: stories.length,
    });
  } catch (error) {
    console.error("[/api/stories GET] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stories" },
      { status: 500 }
    );
  }
}
