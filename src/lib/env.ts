import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1, "Firebase API Key is required"),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1, "Firebase Auth Domain is required"),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1, "Firebase Project ID is required"),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().min(1, "Firebase Storage Bucket is required"),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1, "Firebase Messaging Sender ID is required"),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1, "Firebase App ID is required"),
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string().optional(),
});

const serverEnvSchema = z.object({
  FIREBASE_PROJECT_ID: z.string().optional(),
  FIREBASE_CLIENT_EMAIL: z.string().email().optional(),
  FIREBASE_PRIVATE_KEY: z.string().optional(),
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;

/**
 * Validates and retrieves client environment variables safely.
 * Returns null if environment variables are not fully configured (e.g., during build phase).
 */
export function getClientEnv(): ClientEnv | null {
  const envValues = {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  const parsed = clientEnvSchema.safeParse(envValues);
  if (!parsed.success) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[DigiVigee Env] Client environment variables are incomplete:",
        parsed.error.flatten().fieldErrors
      );
    }
    return null;
  }
  return parsed.data;
}

const CANONICAL_PROJECT_ID = "digivigeewebsite";
const CANONICAL_CLIENT_EMAIL = "firebase-adminsdk-fbsvc@digivigeewebsite.iam.gserviceaccount.com";
const CANONICAL_PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDENX/YLN3xFqHk\nxsyR9Pa0846tQmuWDbsMZgEfoTpnynO73Ox+fKFx1GTMaEywy6ziIpvYw2UMhsbK\np2VE7UwloelF8mCb15TuJ8LRY52xidHkd+FrJy2kfuqrDczRHwZCq81nVoiOqqUh\niZTuvmsk2nfu/MacA0fGs/pf/hYU3cFF2Wx8jsbNos7SNnYH6oK96eStxNMaGdJZ\njRHei47er6puiG4z6J81iixJaHRHCLxuZwEe7sRejndEd4zFIg5Gi80+fASxP5Z2\neAA3xE5vvBex9fexvLR38m0oZkyrEEhImAs4xUslocOqU94AFGtlLfLZiZFVcv3j\nFez2T8spAgMBAAECggEAI2xlQGoZR8WGRP9/P3qyb8jpIW60bcrc0kg4O7WoDcUH\nUAt6xvtJSnvGFwFdly2ucMU+zcu5GqHakgvWxLLy5Hhu3Sn9NyWcxcJ38cXCWqM/\nObhLAkV4gBJJ28gKCldHkhHia5272cYFOiDUuqW2QlkO/h603MXa14z2zw3YfruZ\nYSnKmn9jFLlHOSKkIyDfZiKUpWu/O6qTkd22Q+dTTTeXzCGngu5dftistEVou2ud\n+idmOAeGMvxs3U8PTE9fYTmow6Mk4iSLMV+oXkokdwmPLRxQ9JYov1g4FSIOyPp5\ndIDL+LI72N333BoUMB1Ss1Kv70WEb8EVUxhaLH/g4QKBgQDwaXAe+QIUWOTyy+9n\nCBVOod1jVySxGAxf8F1P6sJZeMbCYC1Y5W5bdZbTQejcpVbK4MQnyf6c7qxGDnlo\n0sRrAX/nx7B0Cr99RtcIEYT6PjJQFaY6PZ5WYFwTFe5CU7VOfankCkX74GQA79KC\nd6uv+AoznsQZI9MRXmJMEPLkawKBgQDQ7lgV2/Saew046+10/2DVGstc/U1335GH\n83Up8cLSSthau+7/DUTFSAnyG1unibbu1QGFZUHkDP4QHPueE0gYQ/xGc/Dw8nS7\napc9FWdAyCtPsCQpydE6JLii08OYjjKX2I5AP1NrasMyf/V+n2W6jAGT6iqlmjmE\nkvH//Y0TuwKBgQCWVBf8BhC60Gs5NzRX5MIODUD2IUOcSUFTrGVs14r3j4IZgTJZ\n5/z9y6WoLAqEDg8bhTii+LfxQX0PwXVBiqmvj5x/Pmqj5SSgHW/QZ8QTBllHooHy\n4RzlPhPVC12Us+snTYSyR4pDWaiuvUeQtWvx+NPIO3q7jZ8puS8WCXMYSQKBgQCd\nHD384hRD/nho73D24/trBOUcHhadJ++F7huS2QwJmuKrCFumS9IFEDD6cHwxtitr\n2Z11NDmiRerfLww/SHyUUrtoN1NdvNTvAi6MboXgfyWinO/0xKCjOm3lc5zIIVYG\nPYBq67PNONFkLjjraO3Uo+ej1RkQwrKx8NYuC/qEdQKBgQCKpfLJYv9NAZ05BQhH\nN5LrQG6Tyz14ryqaQ9liZJ+NonnfufVb1jDRqk5jyADtarAUTwnsoPmQXwkfxSR2\nHvzzgpMvxaqiQE3evj2QSLhgis2dTVnEzHl4LY435d1PHWwVZOL6LGTGsKp4iBa4\nmpuYO6/6o/lO7RN491u06PVedQ==\n-----END PRIVATE KEY-----`;

/**
 * Validates and retrieves server environment variables with canonical project fallbacks.
 */
export function getServerEnv(): ServerEnv {
  const envValues = {
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || CANONICAL_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL || CANONICAL_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY || CANONICAL_PRIVATE_KEY,
  };

  const parsed = serverEnvSchema.safeParse(envValues);
  if (!parsed.success) {
    console.warn(
      "[DigiVigee Env] Server environment variables validation warnings:",
      parsed.error.flatten().fieldErrors
    );
    return {};
  }
  return parsed.data;
}
