import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * High-performance image proxy for Instagram / Facebook CDN images.
 * Solves:
 * 1. Cross-origin referrer blocks from Instagram CDN.
 * 2. Next.js image domain restriction and local network issues.
 * 3. Expired or blocked tokens by falling back to local clinical assets.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawUrl = searchParams.get("url");

    if (!rawUrl) {
      return NextResponse.redirect(new URL("/images/doctor/assets/insta-1.png", request.url), { status: 307 });
    }

    let targetUrl: URL;
    try {
      targetUrl = new URL(rawUrl);
    } catch {
      return NextResponse.redirect(new URL("/images/doctor/assets/insta-1.png", request.url), { status: 307 });
    }

    // Security check: Only allow Instagram / Facebook CDN domains
    const hostname = targetUrl.hostname.toLowerCase();
    const isAllowedHost =
      hostname.endsWith(".cdninstagram.com") ||
      hostname.endsWith(".fbcdn.net") ||
      hostname.endsWith(".instagram.com");

    if (!isAllowedHost) {
      return NextResponse.redirect(new URL("/images/doctor/assets/insta-1.png", request.url), { status: 307 });
    }

    // Fetch the image from Instagram CDN
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const imageRes = await fetch(targetUrl.toString(), {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        Referer: "https://www.instagram.com/",
      },
    });
    clearTimeout(timeout);

    if (!imageRes.ok) {
      console.warn(`[InstagramImageProxy] Upstream returned status ${imageRes.status} for ${hostname}`);
      return NextResponse.redirect(new URL("/images/doctor/assets/insta-1.png", request.url), { status: 307 });
    }

    const contentType = imageRes.headers.get("content-type") || "image/jpeg";
    const imageBuffer = await imageRes.arrayBuffer();

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=604800, stale-while-revalidate=86400, immutable",
      },
    });
  } catch (error) {
    console.warn("[InstagramImageProxy] Error fetching upstream image:", (error as Error)?.message);
    return NextResponse.redirect(new URL("/images/doctor/assets/insta-1.png", request.url), { status: 307 });
  }
}
