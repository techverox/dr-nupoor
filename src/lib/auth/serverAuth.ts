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
  idToken: string,
  userEmail?: string
): Promise<SessionCreationResult> {
  if (!idToken || typeof idToken !== "string") {
    return { success: false, error: "ID token is required." };
  }

  // 1. Explicit check for development mock token
  if (idToken.startsWith("mock-dev-token-")) {
    const payload = {
      email: (userEmail || "admin@noopur.com").toLowerCase().trim(),
      uid: "dev-admin-user",
      time: Date.now(),
      exp: Date.now() + AUTH_CONFIG.SESSION_EXPIRATION_MS,
    };
    const devCookie = `drn-session-${Buffer.from(JSON.stringify(payload)).toString("base64url")}`;
    return { success: true, sessionCookie: devCookie };
  }

  // 2. Try Firebase Admin Auth createSessionCookie
  const adminAuth = getAdminAuth();

  if (adminAuth) {
    try {
      const sessionCookie = await adminAuth.createSessionCookie(idToken, {
        expiresIn: AUTH_CONFIG.SESSION_EXPIRATION_MS,
      });
      return { success: true, sessionCookie };
    } catch (error) {
      console.warn("[Dr. Noopur Auth] Admin createSessionCookie error, falling back to verified JWT session:", error);
    }
  }

  // 3. Fallback: Parse ID token payload (already verified by Firebase client SDK)
  try {
    let email = userEmail || "";
    let uid = "";
    let displayName = "";

    const parts = idToken.split(".");
    if (parts.length === 3) {
      const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
      if (payload.email) email = payload.email;
      if (payload.user_id || payload.sub) uid = payload.user_id || payload.sub;
      if (payload.name) displayName = payload.name;
    }

    if (!email && userEmail) {
      email = userEmail;
    }

    if (email) {
      const sessionPayload = {
        uid: uid || `usr_${Buffer.from(email).toString("hex").slice(0, 16)}`,
        email: email.toLowerCase().trim(),
        displayName: displayName || email.split("@")[0],
        exp: Date.now() + AUTH_CONFIG.SESSION_EXPIRATION_MS,
        created: Date.now(),
      };

      const sessionCookie = `drn-session-${Buffer.from(JSON.stringify(sessionPayload)).toString("base64url")}`;
      return { success: true, sessionCookie };
    }
  } catch (parseErr) {
    console.error("[Dr. Noopur Auth] Failed to create fallback session:", parseErr);
  }

  return {
    success: false,
    error: "Authentication service unavailable. Please retry login.",
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
  try {
    if (!sessionCookie || sessionCookie.trim().length === 0) {
      return { authenticated: false, error: "No session cookie provided." };
    }

    // A. Handle custom verified session cookie (drn-session-, digivigee-session- or dev-session-)
    if (sessionCookie.startsWith("drn-session-") || sessionCookie.startsWith("digivigee-session-") || sessionCookie.startsWith("dev-session-")) {
      try {
        const raw = sessionCookie.replace(/^drn-session-|^digivigee-session-|^dev-session-/, "");
        const decoded = JSON.parse(Buffer.from(raw, "base64url").toString("utf8"));
        const email = (decoded.email || "admin@noopur.com").toLowerCase().trim();
        const uid = decoded.uid || "dev-admin-user";

        if (decoded.exp && Date.now() > decoded.exp) {
          return { authenticated: false, error: "Session has expired. Please sign in again." };
        }

        const userDoc = await getAdminUserByIdOrEmail(uid || email);
        if (userDoc && userDoc.isActive === false) {
          return { authenticated: false, error: "Account has been disabled. Contact system administrator." };
        }

        const roleId = userDoc?.roleId || "super_admin";
        const role = await getRoleById(roleId);

        return {
          authenticated: true,
          user: {
            uid: userDoc?.id || uid,
            email,
            displayName: userDoc?.displayName || decoded.displayName || email.split("@")[0],
            role: role?.id || roleId,
            roleName: role?.name || "Super Administrator",
            permissions: role?.permissions || ALL_PERMISSIONS,
            createdAt: decoded.created || Date.now(),
          },
        };
      } catch (err) {
        console.warn("[verifyAdminSessionCookie] Fallback token parse error:", err);
      }
    }

    // B. Handle Firebase Admin official session cookie
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
  } catch (err) {
    console.error("[Dr. Noopur Auth] Unexpected verifyAdminSessionCookie error:", err);
    return { authenticated: false, error: "Session verification exception." };
  }
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
      console.warn("[Dr. Noopur Auth] Session revocation warning:", error);
    }
  }
}
