"use client";

import React, { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AUTH_CONFIG, AdminUserSession } from "@/lib/auth/constants";
import { AdminShell } from "./AdminShell";

export function AdminClientGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const isLoginPage =
    pathname === AUTH_CONFIG.LOGIN_ROUTE ||
    pathname?.startsWith(`${AUTH_CONFIG.LOGIN_ROUTE}/`);

  const [user, setUser] = useState<AdminUserSession | null>(null);
  const [isVerifying, setIsVerifying] = useState(!isLoginPage);

  useEffect(() => {
    let isCancelled = false;

    async function checkAuthSession() {
      try {
        const res = await fetch("/api/auth/me", {
          cache: "no-store",
          headers: { Accept: "application/json" },
        });

        if (isCancelled) return;

        if (res.ok) {
          const data = await res.json();
          if (data?.authenticated && data?.user) {
            setUser(data.user);
            if (isLoginPage) {
              // User is already logged in, redirect them into the admin dashboard
              startTransition(() => {
                router.replace(AUTH_CONFIG.DASHBOARD_ROUTE);
              });
              return;
            }
            setIsVerifying(false);
            return;
          }
        }

        // Not authenticated
        setUser(null);
        if (!isLoginPage) {
          const fromParam =
            pathname && pathname !== AUTH_CONFIG.DASHBOARD_ROUTE
              ? `?from=${encodeURIComponent(pathname)}`
              : "";
          startTransition(() => {
            router.replace(`${AUTH_CONFIG.LOGIN_ROUTE}${fromParam}`);
          });
        } else {
          setIsVerifying(false);
        }
      } catch (err) {
        if (isCancelled) return;
        console.warn("[AdminClientGuard] Session check warning:", err);
        if (!isLoginPage) {
          startTransition(() => {
            router.replace(AUTH_CONFIG.LOGIN_ROUTE);
          });
        } else {
          setIsVerifying(false);
        }
      }
    }

    checkAuthSession();

    return () => {
      isCancelled = true;
    };
  }, [pathname, isLoginPage, router]);

  // 1. Standalone Login Page: Render directly with NO AdminShell wrapper
  if (isLoginPage) {
    return <>{children}</>;
  }

  // 2. Protected Admin Pages: Show clean clinical spinner while verifying session
  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] font-sans">
        <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-white border border-slate-200/90 shadow-lg shadow-slate-200/50 max-w-sm text-center">
          <div className="relative">
            <div className="w-10 h-10 border-3 border-emerald-600/20 border-t-emerald-600 rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 tracking-tight">Verifying Session</h4>
            <p className="text-xs text-slate-500 mt-1">Connecting to Dr. Noopur Patel Practice Portal...</p>
          </div>
        </div>
      </div>
    );
  }

  // 3. Render authenticated layout shell with live user profile
  return <AdminShell user={user}>{children}</AdminShell>;
}
