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
  FIREBASE_PROJECT_ID: z.string().optional().or(z.literal("")),
  FIREBASE_CLIENT_EMAIL: z.string().email().optional().or(z.literal("")),
  FIREBASE_PRIVATE_KEY: z.string().optional().or(z.literal("")),
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
    return null;
  }
  return parsed.data;
}

/**
 * Validates and retrieves server environment variables safely from environment variables.
 */
export function getServerEnv(): ServerEnv {
  const envValues = {
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  };

  const parsed = serverEnvSchema.safeParse(envValues);
  if (!parsed.success) {
    return {};
  }
  return parsed.data;
}

