import { NextResponse } from "next/server";
import { getCmsSiteSettings, DEFAULT_SITE_SETTINGS } from "@/lib/services/cmsService";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const settings = await getCmsSiteSettings();
    return NextResponse.json(
      { success: true, settings: settings || DEFAULT_SITE_SETTINGS },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error("[/api/settings] Error fetching settings (using defaults):", err);
    return NextResponse.json(
      { success: true, settings: DEFAULT_SITE_SETTINGS, error: errMsg },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  }
}

