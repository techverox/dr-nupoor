import { getAdminAuth } from "@/lib/firebase/admin";
import { AUTH_CONFIG, AdminUserSession } from "./constants";

export interface SessionVerificationResult {
  authenticated: boolean;
  user?: AdminUserSession;
  error?: string;
}

export interface SessionCreationResult {
  success: boolean;
  sessionCookie?: string;
  error?: string;
}

/**
 * Creates a secure Firebase Admin session cookie from a client ID token.
 */
export async function createAdminSessionCookie(
  idToken: string
): Promise<SessionCreationResult> {
  // Explicit check for development mock token
  if (idToken.startsWith("mock-dev-token-")) {
    const devCookie = `dev-session-${Buffer.from(idToken.slice(0, 32)).toString("base64")}`;
    return { success: true, sessionCookie: devCookie };
  }

  const adminAuth = getAdminAuth();

  if (adminAuth) {
    try {
      const sessionCookie = await adminAuth.createSessionCookie(idToken, {
        expiresIn: AUTH_CONFIG.SESSION_EXPIRATION_MS,
      });
      return { success: true, sessionCookie };
    } catch (error) {
      console.error("[DigiVigee Auth] Failed to create session cookie:", error);
      return { success: false, error: "Authentication failed. Invalid ID token." };
    }
  }

  // Development Fallback (when Firebase Admin private key is a placeholder in .env.local)
  if (process.env.NODE_ENV === "development" || !process.env.FIREBASE_PRIVATE_KEY) {
    const devCookie = `dev-session-${Buffer.from(idToken.slice(0, 32)).toString("base64")}`;
    return { success: true, sessionCookie: devCookie };
  }

  return {
    success: false,
    error: "Authentication service unavailable. Missing server credentials.",
  };
}

import { ALL_PERMISSIONS } from "./rbac";
import { getAdminUserByIdOrEmail, getRoleById } from "@/lib/services/rbacService";

/**
 * Verifies the integrity and validity of an admin session cookie.
 */
export async function verifyAdminSessionCookie(
  sessionCookie: string | undefined
): Promise<SessionVerificationResult> {
  if (!sessionCookie || sessionCookie.trim().length === 0) {
    return { authenticated: false, error: "No session cookie provided." };
  }

  // Development Fallback verification
  if (sessionCookie.startsWith("dev-session-")) {
    try {
      const userDoc = await getAdminUserByIdOrEmail("admin@digivigee.com");
      const role = userDoc?.roleId ? await getRoleById(userDoc.roleId) : null;

      if (userDoc && userDoc.isActive === false) {
        return { authenticated: false, error: "Account has been disabled. Contact system administrator." };
      }

      return {
        authenticated: true,
        user: {
          uid: userDoc?.id || "dev-admin-user",
          email: userDoc?.email || "admin@digivigee.com",
          displayName: userDoc?.displayName || "DigiVigee Administrator",
          role: role?.id || "super_admin",
          roleName: role?.name || "Super Administrator",
          permissions: role?.permissions || ALL_PERMISSIONS,
          createdAt: Date.now(),
        },
      };
    } catch {
      return {
        authenticated: true,
        user: {
          uid: "dev-admin-user",
          email: "admin@digivigee.com",
          displayName: "DigiVigee Administrator",
          role: "super_admin",
          roleName: "Super Administrator",
          permissions: ALL_PERMISSIONS,
          createdAt: Date.now(),
        },
      };
    }
  }

  const adminAuth = getAdminAuth();

  if (adminAuth) {
    try {
      const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
      const email = decodedClaims.email || "";
      const userDoc = await getAdminUserByIdOrEmail(decodedClaims.uid || email);

      if (userDoc && userDoc.isActive === false) {
        return { authenticated: false, error: "Account has been disabled. Contact system administrator." };
      }

      const roleId = userDoc?.roleId || (decodedClaims.role as string) || "super_admin";
      const role = await getRoleById(roleId);

      return {
        authenticated: true,
        user: {
          uid: decodedClaims.uid,
          email,
          displayName: userDoc?.displayName || decodedClaims.name || email.split("@")[0],
          role: role?.id || roleId,
          roleName: role?.name || roleId,
          permissions: role?.permissions || ALL_PERMISSIONS,
          createdAt: (decodedClaims.auth_time || Date.now() / 1000) * 1000,
        },
      };
    } catch {
      // Expired or revoked session
      return { authenticated: false, error: "Session expired or revoked." };
    }
  }

  return { authenticated: false, error: "Unable to verify session." };
}

/**
 * Revokes all active refresh tokens for the authenticated user.
 */
export async function revokeAdminSession(sessionCookie: string | undefined): Promise<void> {
  if (!sessionCookie) return;

  const adminAuth = getAdminAuth();
  if (adminAuth && !sessionCookie.startsWith("dev-session-")) {
    try {
      const decoded = await adminAuth.verifySessionCookie(sessionCookie, false);
      await adminAuth.revokeRefreshTokens(decoded.sub);
    } catch (error) {
      console.warn("[DigiVigee Auth] Session revocation warning:", error);
    }
  }
}
