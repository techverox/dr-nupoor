import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_CONFIG, verifyAdminSessionCookie } from "@/lib/auth";
import { verifyTwoFactorCode, verifyBackupRecoveryCode } from "@/lib/auth/twoFactor";
import { getAdminFirestore } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/config/firebase";
import { getAdminUserByIdOrEmail } from "@/lib/services/rbacService";
import { recordAuditLog } from "@/lib/services/auditLogService";
import { checkRateLimit, resolveClientIp, RATE_LIMIT_PROFILES } from "@/lib/services/rateLimiter";

export const dynamic = "force-dynamic";

/**
 * POST /api/auth/2fa/verify
 * Validates a 6-digit TOTP code or backup recovery code.
 */
export async function POST(request: NextRequest) {
  try {
    const clientIp = resolveClientIp(request.headers);
    const rateCheck = checkRateLimit(`2fa_verify:${clientIp}`, RATE_LIMIT_PROFILES.LOGIN_ATTEMPT);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many failed 2FA verification attempts. Please retry in ${rateCheck.retryAfterSeconds} seconds.`,
        },
        { status: 429 }
      );
    }

    let body: {
      code?: string;
      secret?: string;
      hashedBackupCodes?: string[];
      action?: "activate" | "challenge";
    };

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const { code, secret, hashedBackupCodes, action = "challenge" } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { success: false, error: "Verification code is required." },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(AUTH_CONFIG.SESSION_COOKIE_NAME)?.value;
    const session = await verifyAdminSessionCookie(sessionCookie);

    if (!session.authenticated || !session.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Valid session required." },
        { status: 401 }
      );
    }

    const userDoc = await getAdminUserByIdOrEmail(session.user.email);
    const activeSecret = secret || userDoc?.twoFactorSecret;

    if (!activeSecret) {
      return NextResponse.json(
        { success: false, error: "2FA is not configured for this account." },
        { status: 400 }
      );
    }

    // 1. Verify 6-digit TOTP Code
    const cleanCode = code.trim().replace(/[\s-]/g, "");
    let isValid = false;

    if (cleanCode.length === 6 && /^\d+$/.test(cleanCode)) {
      isValid = verifyTwoFactorCode(activeSecret, cleanCode);
    }

    // 2. Check Backup Recovery Code if TOTP failed
    if (!isValid && userDoc?.twoFactorBackupCodes && userDoc.twoFactorBackupCodes.length > 0) {
      const backupCheck = verifyBackupRecoveryCode(code, userDoc.twoFactorBackupCodes);
      if (backupCheck.valid && backupCheck.matchedHash) {
        isValid = true;
        // Invalidate single-use backup code
        const updatedBackupCodes = userDoc.twoFactorBackupCodes.filter(
          (h) => h !== backupCheck.matchedHash
        );
        const adminDb = getAdminFirestore();
        if (adminDb && userDoc.id) {
          await adminDb.collection(COLLECTIONS.ADMIN_USERS).doc(userDoc.id).update({
            twoFactorBackupCodes: updatedBackupCodes,
          });
        }
      }
    }

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid 2FA verification code. Please check your authenticator app." },
        { status: 400 }
      );
    }

    // 3. If activating 2FA for the first time, save configuration to user document
    if (action === "activate" && secret) {
      const adminDb = getAdminFirestore();
      if (adminDb && userDoc?.id) {
        await adminDb.collection(COLLECTIONS.ADMIN_USERS).doc(userDoc.id).set(
          {
            twoFactorEnabled: true,
            twoFactorSecret: secret,
            twoFactorBackupCodes: hashedBackupCodes || [],
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      }

      await recordAuditLog({
        actor: {
          uid: session.user.uid,
          email: session.user.email,
          role: session.user.role,
          roleName: session.user.roleName,
        },
        action: "UPDATE",
        resourceType: "user",
        resourceId: session.user.uid,
        resourceTitle: session.user.email,
        summary: `Admin user "${session.user.email}" successfully enabled Two-Factor Authentication (2FA)`,
        status: "success",
      });

      return NextResponse.json({
        success: true,
        message: "Two-Factor Authentication has been successfully enabled on your account.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Two-Factor Authentication code verified successfully.",
    });
  } catch (error) {
    console.error("[/api/auth/2fa/verify POST] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal error verifying 2FA code." },
      { status: 500 }
    );
  }
}
