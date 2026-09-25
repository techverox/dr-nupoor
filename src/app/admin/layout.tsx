import React from "react";
import { cookies } from "next/headers";
import { verifyAdminSessionCookie, AUTH_CONFIG } from "@/lib/auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminClientGuard } from "@/components/admin/AdminClientGuard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Admin Portal | Dr. Noopur Patel Clinic",
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
  const sessionCookie =
    cookieStore.get(AUTH_CONFIG.SESSION_COOKIE_NAME)?.value ||
    cookieStore.get(AUTH_CONFIG.LEGACY_SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie || sessionCookie.trim().length === 0) {
    return <AdminClientGuard>{children}</AdminClientGuard>;
  }

  try {
    const { authenticated, user } = await verifyAdminSessionCookie(sessionCookie);

    const content =
      authenticated && user ? (
        <AdminShell user={user}>{children}</AdminShell>
      ) : (
        <AdminClientGuard>{children}</AdminClientGuard>
      );

    return (
      <div className="light bg-[#F8FAFC] text-slate-900 min-h-screen" style={{ colorScheme: "light" }}>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');document.documentElement.style.colorScheme='light';`,
          }}
        />
        {content}
      </div>
    );
  } catch (error) {
    console.error("[AdminRootLayout] Session verification error:", error);
  }

  return (
    <div className="light bg-[#F8FAFC] text-slate-900 min-h-screen" style={{ colorScheme: "light" }}>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');document.documentElement.style.colorScheme='light';`,
        }}
      />
      <AdminClientGuard>{children}</AdminClientGuard>
    </div>
  );
}
