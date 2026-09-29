import { NextRequest, NextResponse } from "next/server";
import { getInstagramPosts } from "@/lib/services/instagramService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const posts = await getInstagramPosts();
    return NextResponse.json(
      { success: true, posts },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("[PublicInstagramAPI] Error:", error);
    return NextResponse.json(
      { success: false, posts: [], error: "Failed to fetch Instagram feed." },
      { status: 500 }
    );
  }
}
