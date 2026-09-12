import React from "react";
import { cookies } from "next/headers";
import { verifyAdminSessionCookie, AUTH_CONFIG } from "@/lib/auth";
import { AdminShell } from "@/components/admin/AdminShell";

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

  const { authenticated, user } = await verifyAdminSessionCookie(sessionCookie);

  if (authenticated && user) {
    return <AdminShell user={user}>{children}</AdminShell>;
  }

  return <>{children}</>;
}
