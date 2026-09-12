import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";

export interface AuthActionResult {
  success: boolean;
  error?: string;
}

/**
 * Authenticates an admin user with email and password, establishing a server session cookie.
 */
export async function loginAdmin(
  email: string,
  password: string
): Promise<AuthActionResult> {
  try {
    const auth = getFirebaseAuth();
    let idToken = "mock-dev-token";

    if (auth) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        idToken = await userCredential.user.getIdToken();
      } catch (authErr) {
        // In local development, allow fallback if matching development admin credentials
        if (
          process.env.NODE_ENV === "development" &&
          email === "admin@digivigee.com" &&
          (password === "Admin@DigiVigee2026" || password === "admin123" || password === "admin")
        ) {
          console.warn("[DigiVigee Auth] Using development fallback token for admin.");
          idToken = `mock-dev-token-${Date.now()}`;
        } else {
          throw authErr;
        }
      }
    } else {
      // In development fallback if client Firebase credentials are not yet configured
      if (process.env.NODE_ENV === "development") {
        console.log("[DigiVigee Auth Client] Mocking login for development testing.");
      }
    }

    // Exchange ID Token for HTTP-Only Session Cookie
    const response = await fetch("/api/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken, email }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return { success: false, error: data.error || "Failed to establish secure session." };
    }

    return { success: true };
  } catch (error: unknown) {
    const firebaseError = error as { code?: string; message?: string };
    let message = "Invalid email or password. Please check your credentials.";

    if (firebaseError.code === "auth/user-not-found" || firebaseError.code === "auth/wrong-password" || firebaseError.code === "auth/invalid-credential") {
      message = "Invalid email or password.";
    } else if (firebaseError.code === "auth/too-many-requests") {
      message = "Too many failed login attempts. Please try again in a few minutes.";
    } else if (firebaseError.code === "auth/user-disabled") {
      message = "This admin account has been disabled. Contact system administrator.";
    }

    return { success: false, error: message };
  }
}

/**
 * Destroys the admin session and signs out from Firebase client SDK.
 */
export async function logoutAdmin(): Promise<AuthActionResult> {
  try {
    const auth = getFirebaseAuth();
    if (auth) {
      await firebaseSignOut(auth);
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
    const auth = getFirebaseAuth();
    if (auth) {
      await sendPasswordResetEmail(auth, email);
    }

    // Call server endpoint for audit & server verification
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    return {
      success: true,
    };
  } catch (error: unknown) {
    // Avoid leaking account enumeration details
    console.warn("[DigiVigee Auth] Password reset warning:", error);
    return {
      success: true,
    };
  }
}
