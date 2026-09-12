import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_CONFIG, verifyAdminSessionCookie } from "@/lib/auth";
import { generateTwoFactorSecret, getTwoFactorOtpAuthUrl, generateBackupRecoveryCodes } from "@/lib/auth/twoFactor";

export const dynamic = "force-dynamic";

/**
 * GET /api/auth/2fa/setup
 * Generates a new 2FA setup configuration (Secret, OTPAuth URI, and Backup Codes)
 * for the authenticated admin user.
 */
export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(AUTH_CONFIG.SESSION_COOKIE_NAME)?.value;

    const session = await verifyAdminSessionCookie(sessionCookie);
    if (!session.authenticated || !session.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in to configure 2FA." },
        { status: 401 }
      );
    }

    const secret = generateTwoFactorSecret();
    const otpAuthUrl = getTwoFactorOtpAuthUrl(session.user.email, secret, "DigiVigee");
    const { rawCodes, hashedCodes } = generateBackupRecoveryCodes(8);

    return NextResponse.json({
      success: true,
      secret,
      otpAuthUrl,
      backupCodes: rawCodes,
      _hashedBackupCodes: hashedCodes,
      instructions: "Scan the QR code or enter the secret key into Google Authenticator, Authy, or 1Password, then verify with a 6-digit code.",
    });
  } catch (error) {
    console.error("[/api/auth/2fa/setup GET] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error configuring 2FA." },
      { status: 500 }
    );
  }
}
