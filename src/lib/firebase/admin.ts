import { getApps, initializeApp, cert, App } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getServerEnv } from "../env";

let hasWarnedCredentials = false;

export function getFirebaseAdminApp(): App | null {
  const apps = getApps();
  if (apps.length > 0) {
    return apps[0] as App;
  }

  const env = getServerEnv();

  if (!env.FIREBASE_PROJECT_ID || !env.FIREBASE_CLIENT_EMAIL || !env.FIREBASE_PRIVATE_KEY) {
    if (process.env.NODE_ENV === "development" && !hasWarnedCredentials) {
      hasWarnedCredentials = true;
      console.info(
        "[DigiVigee Firebase Admin] Service Account credentials not set in .env.local. Running in robust local runtime mode."
      );
    }
    return null;
  }

  try {
    // Handle escaped newline strings and wrapping quotes in private keys
    let rawKey = env.FIREBASE_PRIVATE_KEY.trim();
    if (rawKey.startsWith('"') && rawKey.endsWith('"')) {
      rawKey = rawKey.slice(1, -1);
    }
    const formattedPrivateKey = rawKey.replace(/\\n/g, "\n");

    return initializeApp({
      credential: cert({
        projectId: env.FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        privateKey: formattedPrivateKey,
      }),
    });
  } catch (error) {
    console.error("[DigiVigee Firebase Admin] Initialization failed:", error);
    return null;
  }
}

export function getAdminFirestore(): Firestore | null {
  const app = getFirebaseAdminApp();
  if (!app) return null;
  const db = getFirestore(app);
  try {
    db.settings({ ignoreUndefinedProperties: true });
  } catch {
    // Settings can only be applied once per instance
  }
  return db;
}

export function getAdminAuth(): Auth | null {
  const app = getFirebaseAdminApp();
  if (!app) return null;
  return getAuth(app);
}
