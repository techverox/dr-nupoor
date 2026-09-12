import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminSessionCookie, AUTH_CONFIG } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(AUTH_CONFIG.SESSION_COOKIE_NAME)?.value;

    const result = await verifyAdminSessionCookie(sessionCookie);

    if (!result.authenticated || !result.user) {
      return NextResponse.json(
        { authenticated: false, error: "Unauthorized. Valid admin session required." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        authenticated: true,
        user: result.user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[DigiVigee /api/auth/me] Error:", error);
    return NextResponse.json(
      { authenticated: false, error: "Session verification failed." },
      { status: 500 }
    );
  }
}
