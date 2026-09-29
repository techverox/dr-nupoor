import { NextRequest, NextResponse } from "next/server";
import { getInstagramPosts, sanitizePost } from "@/lib/services/instagramService";
import { decodeHtmlEntities } from "@/lib/utils/instagram";

export const dynamic = "force-dynamic";

/**
 * Proxy Instagram CDN images to prevent hotlinking blocks, referrer blocks,
 * and expired token failures.
 */
async function handleImageProxy(request: NextRequest, rawUrl: string) {
  try {
    let parsed: URL;
    try {
      parsed = new URL(rawUrl);
    } catch {
      return NextResponse.redirect(new URL("/images/doctor/assets/insta-1.png", request.url), { status: 307 });
    }

    const host = parsed.hostname.toLowerCase();
    const isAllowed =
      host.endsWith(".cdninstagram.com") ||
      host.endsWith(".fbcdn.net") ||
      host.endsWith(".instagram.com");

    if (!isAllowed) {
      return NextResponse.redirect(new URL("/images/doctor/assets/insta-1.png", request.url), { status: 307 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(parsed.toString(), {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        Referer: "https://www.instagram.com/",
      },
    });
    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`[InstagramProxy] Upstream returned status ${res.status}`);
      return NextResponse.redirect(new URL("/images/doctor/assets/insta-1.png", request.url), { status: 307 });
    }

    const contentType = res.headers.get("content-type") || "image/jpeg";
    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=604800, stale-while-revalidate=86400, immutable",
      },
    });
  } catch (error) {
    console.warn("[InstagramProxy] Proxy error:", (error as Error)?.message);
    return NextResponse.redirect(new URL("/images/doctor/assets/insta-1.png", request.url), { status: 307 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get("image") || searchParams.get("imageUrl") || searchParams.get("url");

    // If an image URL is requested, proxy it
    if (imageUrl) {
      return handleImageProxy(request, imageUrl);
    }

    const rawPosts = await getInstagramPosts();
    const posts = rawPosts.map((p) => {
      const sanitized = sanitizePost(p);
      return {
        ...sanitized,
        title: decodeHtmlEntities(sanitized.title),
        caption: decodeHtmlEntities(sanitized.caption || ""),
      };
    });

    return NextResponse.json(
      { success: true, posts },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
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
