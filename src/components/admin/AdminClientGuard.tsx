"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AUTH_CONFIG } from "@/lib/auth/constants";

export function AdminClientGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // If not on login page, verify presence of admin session
    if (pathname && pathname !== AUTH_CONFIG.LOGIN_ROUTE) {
      const hasCookie =
        document.cookie.includes(`${AUTH_CONFIG.SESSION_COOKIE_NAME}=`) ||
        document.cookie.includes(`${AUTH_CONFIG.LEGACY_SESSION_COOKIE_NAME}=`);

      if (!hasCookie) {
        const target =
          pathname !== AUTH_CONFIG.DASHBOARD_ROUTE
            ? `${AUTH_CONFIG.LOGIN_ROUTE}?from=${encodeURIComponent(pathname)}`
            : AUTH_CONFIG.LOGIN_ROUTE;
        router.replace(target);
      }
    }
  }, [pathname, router]);

  return <>{children}</>;
}
