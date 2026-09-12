import { NextResponse } from "next/server";
import { getClientEnv, getServerEnv } from "@/lib/env";

export async function GET() {
  const clientEnv = getClientEnv();
  const serverEnv = getServerEnv();

  const healthData = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "DigiVigee Platform API",
    phase: "Phase 1 — Step 1: Technical Foundation",
    environment: process.env.NODE_ENV || "development",
    integrations: {
      firebaseClient: {
        configured: Boolean(clientEnv),
        projectId: clientEnv?.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "not_configured",
      },
      firebaseAdmin: {
        configured: Boolean(
          serverEnv.FIREBASE_PROJECT_ID &&
            serverEnv.FIREBASE_CLIENT_EMAIL &&
            serverEnv.FIREBASE_PRIVATE_KEY
        ),
      },
    },
  };

  return NextResponse.json(healthData, { status: 200 });
}
