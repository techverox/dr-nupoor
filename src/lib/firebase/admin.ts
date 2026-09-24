import type { App } from "firebase-admin/app";
import type { Auth } from "firebase-admin/auth";
import type { Firestore, Query, DocumentData } from "firebase-admin/firestore";
import type { Storage } from "firebase-admin/storage";
import { getServerEnv } from "../env";

export type { App, Auth, Firestore, Storage, Query, DocumentData };

if (typeof process !== "undefined" && process.env) {
  process.env.FIRESTORE_PREFER_REST = "true";
}

let hasWarnedCredentials = false;

/**
 * Robust CJS dynamic loader for Firebase Admin submodules.
 * Using eval("require") prevents Next.js / Turbopack from statically bundling or
 * resolving the module to ESM subpath exports (which triggers ERR_REQUIRE_ESM on Vercel Node runtime).
 */
function safeNodeRequire(moduleName: string): any {
  try {
    if (moduleName === "firebase-admin/app") return require("firebase-admin/app");
    if (moduleName === "firebase-admin/firestore") return require("firebase-admin/firestore");
    if (moduleName === "firebase-admin/auth") return require("firebase-admin/auth");
    if (moduleName === "firebase-admin/storage") return require("firebase-admin/storage");
  } catch (directErr) {
    try {
      // Secondary fallback via Node.js native createRequire
      const mod = typeof require !== "undefined" ? require("module") : eval("require")("module");
      const req = mod.createRequire(process.cwd() + "/package.json");
      return req(moduleName);
    } catch (err) {
      console.error(`[Firebase Admin] Failed to load "${moduleName}":`, directErr, err);
      return null;
    }
  }
  return null;
}

export function getFirebaseAdminApp(): App | null {
  try {
    const appModule = safeNodeRequire("firebase-admin/app");
    if (!appModule) return null;

    const apps = appModule.getApps();
    if (apps && apps.length > 0) {
      return apps[0] as App;
    }

    const env = getServerEnv();

    if (!env.FIREBASE_PROJECT_ID || !env.FIREBASE_CLIENT_EMAIL || !env.FIREBASE_PRIVATE_KEY) {
      if (process.env.NODE_ENV === "development" && !hasWarnedCredentials) {
        hasWarnedCredentials = true;
        console.info(
          "[Firebase Admin] Service Account credentials not set. Running in robust fallback mode."
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

    return appModule.initializeApp({
      credential: appModule.cert({
        projectId: env.FIREBASE_PROJECT_ID.trim(),
        clientEmail: env.FIREBASE_CLIENT_EMAIL.trim(),
        privateKey: formattedPrivateKey,
      }),
    });
  } catch (error) {
    console.error("[Firebase Admin] Initialization failed:", error);
    return null;
  }
}

export function getAdminFirestore(): Firestore | null {
  try {
    const app = getFirebaseAdminApp();
    if (!app) return null;
    const firestoreModule = safeNodeRequire("firebase-admin/firestore");
    if (!firestoreModule) return null;

    const db = firestoreModule.getFirestore(app);
    try {
      db.settings({ ignoreUndefinedProperties: true, preferRest: true });
    } catch {
      // Settings can only be applied once per instance
    }
    return db;
  } catch (err) {
    console.error("[Firebase Admin] Firestore init error:", err);
    return null;
  }
}

export function getAdminAuth(): Auth | null {
  try {
    const app = getFirebaseAdminApp();
    if (!app) return null;
    const authModule = safeNodeRequire("firebase-admin/auth");
    if (!authModule) return null;

    return authModule.getAuth(app);
  } catch (err) {
    console.error("[Firebase Admin] Auth init error:", err);
    return null;
  }
}

export function getAdminStorage(): Storage | null {
  try {
    const app = getFirebaseAdminApp();
    if (!app) return null;
    const storageModule = safeNodeRequire("firebase-admin/storage");
    if (!storageModule) return null;

    return storageModule.getStorage(app);
  } catch (err) {
    console.error("[Firebase Admin] Storage init error:", err);
    return null;
  }
}

/**
 * Universal safe FieldValue proxy that delegates to real Firestore FieldValue if available,
 * or gracefully returns safe fallbacks so no runtime crash can ever occur.
 */
export const FieldValue = {
  serverTimestamp: (): any => {
    try {
      const mod = safeNodeRequire("firebase-admin/firestore");
      if (mod?.FieldValue?.serverTimestamp) {
        return mod.FieldValue.serverTimestamp();
      }
    } catch {}
    return new Date().toISOString();
  },
  increment: (n: number): any => {
    try {
      const mod = safeNodeRequire("firebase-admin/firestore");
      if (mod?.FieldValue?.increment) {
        return mod.FieldValue.increment(n);
      }
    } catch {}
    return n;
  },
  arrayUnion: (...elements: any[]): any => {
    try {
      const mod = safeNodeRequire("firebase-admin/firestore");
      if (mod?.FieldValue?.arrayUnion) {
        return mod.FieldValue.arrayUnion(...elements);
      }
    } catch {}
    return elements;
  },
  arrayRemove: (...elements: any[]): any => {
    try {
      const mod = safeNodeRequire("firebase-admin/firestore");
      if (mod?.FieldValue?.arrayRemove) {
        return mod.FieldValue.arrayRemove(...elements);
      }
    } catch {}
    return elements;
  },
  delete: (): any => {
    try {
      const mod = safeNodeRequire("firebase-admin/firestore");
      if (mod?.FieldValue?.delete) {
        return mod.FieldValue.delete();
      }
    } catch {}
    return undefined;
  },
};
