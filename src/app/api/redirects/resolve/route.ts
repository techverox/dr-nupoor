import { NextRequest, NextResponse } from "next/server";
import { getActiveRedirects, recordRedirectHit } from "@/lib/services/redirectService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all");
    const hitId = searchParams.get("hit");
    const path = searchParams.get("path");

    // 1. Asynchronous hit count recording
    if (hitId) {
      await recordRedirectHit(hitId);
      return NextResponse.json({ success: true });
    }

    const active = await getActiveRedirects();

    // 2. Bulk active redirects for Edge Middleware cache hydration
    if (all === "true") {
      const redirects = active.map((r) => ({
        id: r.id,
        sourcePath: r.sourcePath,
        destinationPath: r.destinationPath,
        statusCode: r.statusCode || 301,
      }));
      return NextResponse.json({ success: true, redirects });
    }

    // 3. Single-path resolution
    if (!path) {
      return NextResponse.json({ redirect: null });
    }

    const normalizedPath = path.toLowerCase().trim();
    const match = active.find((r) => r.sourcePath === normalizedPath);

    if (match) {
      // Fire-and-forget hit tracking
      recordRedirectHit(match.id).catch(() => {});

      return NextResponse.json({
        redirect: {
          id: match.id,
          destinationPath: match.destinationPath,
          statusCode: match.statusCode,
        },
      });
    }

    return NextResponse.json({ redirect: null });
  } catch (error) {
    console.error("[/api/redirects/resolve] Error:", error);
    return NextResponse.json({ redirect: null });
  }
}

