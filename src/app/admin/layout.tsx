import React from "react";
import { cookies } from "next/headers";
import { verifyAdminSessionCookie, AUTH_CONFIG } from "@/lib/auth";
import { AdminShell } from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Admin Portal | DigiVigee Platform",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(AUTH_CONFIG.SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie || sessionCookie.trim().length === 0) {
    return <>{children}</>;
  }

  try {
    const { authenticated, user } = await verifyAdminSessionCookie(sessionCookie);

    if (authenticated && user) {
      return <AdminShell user={user}>{children}</AdminShell>;
    }
  } catch (error) {
    console.error("[AdminRootLayout] Session verification error:", error);
  }

  return <>{children}</>;
}
