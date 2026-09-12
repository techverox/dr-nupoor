import { getApps, initializeApp, cert, App } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getServerEnv } from "../env";

if (typeof process !== "undefined" && process.env) {
  process.env.FIRESTORE_PREFER_REST = "true";
}

let hasWarnedCredentials = false;

export function getFirebaseAdminApp(): App | null {
  try {
    const apps = getApps();
    if (apps.length > 0) {
      return apps[0] as App;
    }

    const env = getServerEnv();

    if (!env.FIREBASE_PROJECT_ID || !env.FIREBASE_CLIENT_EMAIL || !env.FIREBASE_PRIVATE_KEY) {
      if (process.env.NODE_ENV === "development" && !hasWarnedCredentials) {
        hasWarnedCredentials = true;
        console.info(
          "[DigiVigee Firebase Admin] Service Account credentials not set. Running in robust fallback mode."
        );
      }
      return null;
    }

    // Handle escaped newline strings, wrapping quotes, and carriage returns
    let rawKey = env.FIREBASE_PRIVATE_KEY.trim();
    if ((rawKey.startsWith('"') && rawKey.endsWith('"')) || (rawKey.startsWith("'") && rawKey.endsWith("'"))) {
      rawKey = rawKey.slice(1, -1);
    }
    const formattedPrivateKey = rawKey.replace(/\\n/g, "\n").replace(/\r/g, "");

    return initializeApp({
      credential: cert({
        projectId: env.FIREBASE_PROJECT_ID.trim(),
        clientEmail: env.FIREBASE_CLIENT_EMAIL.trim(),
        privateKey: formattedPrivateKey,
      }),
    });
  } catch (error) {
    console.error("[DigiVigee Firebase Admin] Initialization failed:", error);
    return null;
  }
}

export function getAdminFirestore(): Firestore | null {
  try {
    const app = getFirebaseAdminApp();
    if (!app) return null;
    const db = getFirestore(app);
    try {
      db.settings({ ignoreUndefinedProperties: true, preferRest: true });
    } catch {
      // Settings can only be applied once per instance
    }
    return db;
  } catch (err) {
    console.error("[DigiVigee Firebase Admin] Firestore init error:", err);
    return null;
  }
}

export function getAdminAuth(): Auth | null {
  try {
    const app = getFirebaseAdminApp();
    if (!app) return null;
    return getAuth(app);
  } catch (err) {
    console.error("[DigiVigee Firebase Admin] Auth init error:", err);
    return null;
  }
}

