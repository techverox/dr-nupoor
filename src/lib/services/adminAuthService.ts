import crypto from "crypto";
import { getAdminFirestore, getAdminAuth } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/config/firebase";
import { AdminUser } from "@/types/rbac";
import { getAdminUserByIdOrEmail, DEFAULT_SUPER_ADMIN, bootstrapSystemRbac } from "@/lib/services/rbacService";
import { validateStrongPassword } from "@/lib/validation/passwordPolicy";

export interface AdminCredential {
  uid: string;
  email: string;
  salt: string;
  hash: string;
  failedAttempts: number;
  lockedUntil?: string | null;
  mustChangePassword?: boolean;
  updatedAt: string;
  createdAt: string;
}

// In-memory credential cache with globalThis persistence
const globalForCredentials = globalThis as unknown as {
  __ADMIN_CREDENTIALS_CACHE__?: Map<string, AdminCredential>;
  __CREDENTIALS_BOOTSTRAPPED__?: boolean;
};

const credentialsCache =
  globalForCredentials.__ADMIN_CREDENTIALS_CACHE__ || new Map<string, AdminCredential>();

if (!globalForCredentials.__ADMIN_CREDENTIALS_CACHE__) {
  globalForCredentials.__ADMIN_CREDENTIALS_CACHE__ = credentialsCache;
}

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout

/**
 * Generates a random cryptographic salt.
 */
export function generateSalt(): string {
  return crypto.randomBytes(16).toString("hex");
}

/**
 * Computes an OWASP-compliant scrypt hash from a password and salt.
 */
export function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

/**
 * Secure constant-time password verification.
 */
export function verifyPasswordHash(password: string, salt: string, expectedHash: string): boolean {
  try {
    const derived = hashPassword(password, salt);
    const bufA = Buffer.from(derived, "hex");
    const bufB = Buffer.from(expectedHash, "hex");

    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

/**
 * Initializes and ensures primary Super Admin credentials are in place.
 */
export async function bootstrapAdminCredentials(): Promise<void> {
  if (globalForCredentials.__CREDENTIALS_BOOTSTRAPPED__) return;

  await bootstrapSystemRbac();

  const superAdminEmail = DEFAULT_SUPER_ADMIN.email.toLowerCase().trim();
  const defaultPassword = process.env.INITIAL_ADMIN_PASSWORD || "123456";

  const adminDb = getAdminFirestore();

  if (adminDb) {
    try {
      const credDoc = await adminDb.collection(COLLECTIONS.ADMIN_CREDENTIALS).doc(superAdminEmail).get();
      if (!credDoc.exists) {
        const salt = generateSalt();
        const hash = hashPassword(defaultPassword, salt);
        const cred: AdminCredential = {
          uid: DEFAULT_SUPER_ADMIN.id,
          email: superAdminEmail,
          salt,
          hash,
          failedAttempts: 0,
          lockedUntil: null,
          mustChangePassword: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        await adminDb.collection(COLLECTIONS.ADMIN_CREDENTIALS).doc(superAdminEmail).set(cred);
        credentialsCache.set(superAdminEmail, cred);
        credentialsCache.set(DEFAULT_SUPER_ADMIN.id, cred);
      } else {
        const data = credDoc.data() as AdminCredential;
        credentialsCache.set(superAdminEmail, data);
        credentialsCache.set(data.uid, data);
      }

      // Also ensure Firebase Auth has the Super Admin provisioned
      const adminAuth = getAdminAuth();
      if (adminAuth) {
        try {
          await adminAuth.getUserByEmail(superAdminEmail);
        } catch (authErr: unknown) {
          const err = authErr as { code?: string };
          if (err.code === "auth/user-not-found") {
            try {
              await adminAuth.createUser({
                uid: DEFAULT_SUPER_ADMIN.id,
                email: superAdminEmail,
                password: defaultPassword,
                displayName: DEFAULT_SUPER_ADMIN.displayName,
              });
              await adminAuth.setCustomUserClaims(DEFAULT_SUPER_ADMIN.id, { role: "super_admin" });
            } catch (createErr) {
              console.warn("[bootstrapAdminCredentials] Firebase Auth create warning:", createErr);
            }
          }
        }
      }

      globalForCredentials.__CREDENTIALS_BOOTSTRAPPED__ = true;
      return;
    } catch (err) {
      console.warn("[bootstrapAdminCredentials] Firestore warning, using in-memory bootstrap:", err);
    }
  }

  // Fallback in-memory initialization
  if (!credentialsCache.has(superAdminEmail)) {
    const salt = generateSalt();
    const hash = hashPassword(defaultPassword, salt);
    const cred: AdminCredential = {
      uid: DEFAULT_SUPER_ADMIN.id,
      email: superAdminEmail,
      salt,
      hash,
      failedAttempts: 0,
      lockedUntil: null,
      mustChangePassword: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    credentialsCache.set(superAdminEmail, cred);
    credentialsCache.set(DEFAULT_SUPER_ADMIN.id, cred);
  }

  globalForCredentials.__CREDENTIALS_BOOTSTRAPPED__ = true;
}

/**
 * Stores or updates an admin's salted password credential in Firestore & in-memory cache.
 */
export async function storeAdminPassword(
  email: string,
  plainPassword: string,
  uid: string
): Promise<AdminCredential> {
  const cleanEmail = email.toLowerCase().trim();
  const salt = generateSalt();
  const hash = hashPassword(plainPassword, salt);

  const cred: AdminCredential = {
    uid,
    email: cleanEmail,
    salt,
    hash,
    failedAttempts: 0,
    lockedUntil: null,
    mustChangePassword: false,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };

  credentialsCache.set(cleanEmail, cred);
  credentialsCache.set(uid, cred);

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      await adminDb.collection(COLLECTIONS.ADMIN_CREDENTIALS).doc(cleanEmail).set(cred, { merge: true });
    } catch (err) {
      console.error("[storeAdminPassword] Firestore save error:", err);
    }
  }

  // Synchronize with Firebase Auth if available
  const adminAuth = getAdminAuth();
  if (adminAuth) {
    try {
      const existing = await adminAuth.getUserByEmail(cleanEmail);
      await adminAuth.updateUser(existing.uid, { password: plainPassword });
    } catch (e: unknown) {
      const authErr = e as { code?: string };
      if (authErr.code === "auth/user-not-found") {
        try {
          await adminAuth.createUser({
            uid,
            email: cleanEmail,
            password: plainPassword,
          });
        } catch {
          // Soft ignore if creation fails in test environment
        }
      }
    }
  }

  return cred;
}

export interface VerifyCredentialsResult {
  success: boolean;
  user?: AdminUser;
  idToken?: string;
  error?: string;
  lockedUntil?: string | null;
  method?: "firebase_auth" | "credentials_store";
}

/**
 * Dual-Layer Credential Verification:
 * 1. Checks Firebase Auth REST API (Primary)
 * 2. Checks Secure Firestore `admin_credentials` with salted scrypt (Robust Fallback)
 */
export async function verifyAdminCredentials(
  email: string,
  plainPassword: string
): Promise<VerifyCredentialsResult> {
  const cleanEmail = email.toLowerCase().trim();
  if (!cleanEmail || !plainPassword) {
    return { success: false, error: "Email and password are required." };
  }

  await bootstrapAdminCredentials();

  // Find User Record in RBAC
  const user = await getAdminUserByIdOrEmail(cleanEmail);
  if (!user) {
    return { success: false, error: "Invalid email or password." };
  }

  if (user.isActive === false) {
    return { success: false, error: "This administrator account has been disabled. Contact system administrator." };
  }

  // Lockout Check
  const adminDb = getAdminFirestore();
  let cred: AdminCredential | null = credentialsCache.get(cleanEmail) || credentialsCache.get(user.id) || null;

  if (!cred && adminDb) {
    try {
      const snap = await adminDb.collection(COLLECTIONS.ADMIN_CREDENTIALS).doc(cleanEmail).get();
      if (snap.exists) {
        cred = snap.data() as AdminCredential;
        credentialsCache.set(cleanEmail, cred);
        credentialsCache.set(user.id, cred);
      }
    } catch (err) {
      console.warn("[verifyAdminCredentials] Fetch credential warning:", err);
    }
  }

  const now = Date.now();
  if (cred?.lockedUntil) {
    const lockTime = new Date(cred.lockedUntil).getTime();
    if (now < lockTime) {
      const minutesRemaining = Math.ceil((lockTime - now) / 60000);
      return {
        success: false,
        error: `Account is temporarily locked due to excessive failed attempts. Please retry in ${minutesRemaining} minute(s).`,
        lockedUntil: cred.lockedUntil,
      };
    }
  }

  // ATTEMPT 1: Firebase Auth REST API check (if API key available)
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (apiKey) {
    try {
      const firebaseResp = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: cleanEmail,
            password: plainPassword,
            returnSecureToken: true,
          }),
        }
      );

      const firebaseData = await firebaseResp.json();

      if (firebaseResp.ok && firebaseData.idToken) {
        // Successful Firebase Auth login!
        if (cred && cred.failedAttempts > 0) {
          cred.failedAttempts = 0;
          cred.lockedUntil = null;
          if (adminDb) {
            adminDb.collection(COLLECTIONS.ADMIN_CREDENTIALS).doc(cleanEmail).update({
              failedAttempts: 0,
              lockedUntil: null,
            }).catch(() => {});
          }
        }

        // Keep salted hash synced in credential store
        if (!cred || !verifyPasswordHash(plainPassword, cred.salt, cred.hash)) {
          await storeAdminPassword(cleanEmail, plainPassword, user.id);
        }

        return {
          success: true,
          user,
          idToken: firebaseData.idToken,
          method: "firebase_auth",
        };
      }
    } catch (e) {
      console.warn("[verifyAdminCredentials] Firebase REST auth skipped/failed, using fallback credentials store:", e);
    }
  }

  // ATTEMPT 2: Check Firestore / Memory Credential Store
  if (cred && cred.salt && cred.hash) {
    const isMatch = verifyPasswordHash(plainPassword, cred.salt, cred.hash);
    if (isMatch) {
      // Valid Credentials!
      cred.failedAttempts = 0;
      cred.lockedUntil = null;

      if (adminDb) {
        adminDb.collection(COLLECTIONS.ADMIN_CREDENTIALS).doc(cleanEmail).update({
          failedAttempts: 0,
          lockedUntil: null,
        }).catch(() => {});
      }

      // Proactively sync into Firebase Auth in background if missing
      const adminAuth = getAdminAuth();
      if (adminAuth) {
        adminAuth.getUserByEmail(cleanEmail).then(async (authRecord) => {
          try {
            await adminAuth.updateUser(authRecord.uid, { password: plainPassword });
          } catch {}
        }).catch(async (authErr) => {
          if (authErr?.code === "auth/user-not-found") {
            try {
              await adminAuth.createUser({
                uid: user.id,
                email: cleanEmail,
                password: plainPassword,
                displayName: user.displayName,
              });
              await adminAuth.setCustomUserClaims(user.id, { role: user.roleId });
            } catch {}
          }
        });
      }

      return {
        success: true,
        user,
        method: "credentials_store",
      };
    }
  }

  // Credential mismatch -> handle lockout counting
  const newFailedAttempts = (cred?.failedAttempts || 0) + 1;
  let lockedUntil: string | null = null;

  if (newFailedAttempts >= MAX_FAILED_ATTEMPTS) {
    lockedUntil = new Date(Date.now() + LOCKOUT_DURATION_MS).toISOString();
  }

  if (cred) {
    cred.failedAttempts = newFailedAttempts;
    cred.lockedUntil = lockedUntil;
  }

  if (adminDb) {
    adminDb.collection(COLLECTIONS.ADMIN_CREDENTIALS).doc(cleanEmail).set(
      {
        failedAttempts: newFailedAttempts,
        lockedUntil,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    ).catch(() => {});
  }

  if (lockedUntil) {
    return {
      success: false,
      error: `Too many failed login attempts. Account is locked for 15 minutes for security.`,
      lockedUntil,
    };
  }

  const remaining = MAX_FAILED_ATTEMPTS - newFailedAttempts;
  const hint = remaining > 0 ? ` (${remaining} attempt(s) remaining before temporary lockout)` : "";

  return {
    success: false,
    error: `Invalid email or password.${hint}`,
  };
}

/**
 * Updates an admin user's password with optional current password verification.
 */
export async function updateAdminPassword(params: {
  userIdOrEmail: string;
  newPassword: string;
  currentPassword?: string;
}): Promise<{ success: boolean; error?: string }> {
  const { userIdOrEmail, newPassword, currentPassword } = params;

  await bootstrapAdminCredentials();

  const user = await getAdminUserByIdOrEmail(userIdOrEmail);
  if (!user) {
    return { success: false, error: "Admin user not found." };
  }

  // 1. Verify current password if provided (Self-service change)
  if (currentPassword) {
    const verifyCurrent = await verifyAdminCredentials(user.email, currentPassword);
    if (!verifyCurrent.success) {
      return { success: false, error: "Current password is incorrect. Please verify and retry." };
    }
  }

  // 2. Validate new password strength
  const pwCheck = validateStrongPassword(newPassword);
  if (!pwCheck.valid) {
    return { success: false, error: pwCheck.errors[0] || "New password does not meet security requirements." };
  }

  // 3. Store new salted hash in credentials store & sync with Firebase Auth
  try {
    await storeAdminPassword(user.email, newPassword, user.id);
    return { success: true };
  } catch (err) {
    console.error("[updateAdminPassword] Error updating password:", err);
    return { success: false, error: "Failed to update password in database." };
  }
}
