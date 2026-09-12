import { NextResponse } from "next/server";
import { getCmsSiteSettings } from "@/lib/services/cmsService";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const settings = await getCmsSiteSettings();
  return NextResponse.json(
    { success: true, settings },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );
}

