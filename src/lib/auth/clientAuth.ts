import {
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";

export interface AuthActionResult {
  success: boolean;
  error?: string;
  user?: {
    id: string;
    email: string;
    displayName: string;
    roleId: string;
    roleName?: string;
  };
}

/**
 * Authenticates an administrator via the dedicated server-side authentication pipeline.
 * Supports dual-layer verification (Firebase Auth + Secure Salted Credentials Store).
 */
export async function loginAdmin(
  email: string,
  password: string,
  rememberMe: boolean = false
): Promise<AuthActionResult> {
  try {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      return { success: false, error: "Please provide both email and password." };
    }

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: cleanEmail, password, rememberMe }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        error: data.error || "Authentication failed. Please verify your credentials.",
      };
    }

    return {
      success: true,
      user: data.user,
    };
  } catch (error: unknown) {
    console.error("[DigiVigee Auth] loginAdmin error:", error);
    return {
      success: false,
      error: "Unable to connect to authentication server. Please check your connection and try again.",
    };
  }
}

/**
 * Self-service password change for currently authenticated administrator.
 */
export async function changeAdminPassword(
  currentPassword: string,
  newPassword: string
): Promise<AuthActionResult> {
  try {
    const response = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        error: data.error || "Failed to update password.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("[DigiVigee Auth] changeAdminPassword error:", error);
    return {
      success: false,
      error: "An unexpected error occurred while updating your password.",
    };
  }
}

/**
 * Destroys the admin session and signs out from Firebase client SDK.
 */
export async function logoutAdmin(): Promise<AuthActionResult> {
  try {
    const auth = getFirebaseAuth();
    if (auth) {
      try {
        await firebaseSignOut(auth);
      } catch {
        // Soft fail if client auth wasn't initialized
      }
    }

    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      return { success: false, error: "Logout failed on server." };
    }

    return { success: true };
  } catch (error) {
    console.error("[DigiVigee Auth] Logout error:", error);
    return { success: false, error: "An unexpected error occurred during logout." };
  }
}

/**
 * Initiates a password reset email for an admin account.
 */
export async function requestPasswordReset(email: string): Promise<AuthActionResult> {
  try {
    const cleanEmail = email.trim().toLowerCase();
    const auth = getFirebaseAuth();
    if (auth) {
      try {
        await sendPasswordResetEmail(auth, cleanEmail);
      } catch {
        // Soft fail if client firebase is offline
      }
    }

    // Call server endpoint for audit & server verification
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: cleanEmail }),
    });

    return {
      success: true,
    };
  } catch (error: unknown) {
    console.warn("[DigiVigee Auth] Password reset warning:", error);
    return {
      success: true,
    };
  }
}
