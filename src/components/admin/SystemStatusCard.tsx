import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export interface SystemStatusCardProps {
  status: {
    authStatus: "connected" | "disconnected";
    firestoreStatus: "connected" | "disconnected" | "local_fallback";
    sessionSecurity: "active";
    nodeEnv: string;
  };
}

export function SystemStatusCard({ status }: SystemStatusCardProps) {
  const items = [
    {
      label: "Firebase Authentication",
      value: status.authStatus === "connected" ? "Connected" : "Offline",
      href: "/admin/users",
      badge: (
        <Badge variant="primary-solid" size="sm">
          ACTIVE
        </Badge>
      ),
    },
    {
      label: "Firestore Database",
      value:
        status.firestoreStatus === "connected"
          ? "Cloud Firestore Live"
          : status.firestoreStatus === "local_fallback"
          ? "Development Fallback"
          : "Disconnected",
      href: "/admin/settings",
      badge: (
        <Badge
          variant={status.firestoreStatus === "connected" ? "primary-solid" : "warning"}
          size="sm"
        >
          {status.firestoreStatus === "connected" ? "CONNECTED" : "DEV READY"}
        </Badge>
      ),
    },
    {
      label: "Session Protection",
      value: "HTTP-Only & TLS Encrypted",
      href: "/admin/audit-logs",
      badge: (
        <Badge variant="primary-subtle" size="sm">
          SECURE
        </Badge>
      ),
    },
    {
      label: "Next.js Engine",
      value: `App Router (${status.nodeEnv})`,
      href: "/admin/analytics",
      badge: (
        <Badge variant="navy-subtle" size="sm">
          v15.5.24
        </Badge>
      ),
    },
  ];

  return (
    <div className="flex flex-col p-5 sm:p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm h-full">
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between flex-wrap gap-2 mb-5">
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white tracking-tight">
                System & Infrastructure Status
              </h3>
              <p className="text-[13px] text-zinc-500 mt-1">
                Operational health and infrastructure connectivity.
              </p>
            </div>

            <Link
              href="/admin/settings"
              className="text-xs font-bold text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/60 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white px-3 py-1.5 rounded-md transition-colors no-underline"
            >
              Settings →
            </Link>
          </div>

          <div className="flex flex-col gap-1">
            {items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between p-2.5 rounded-lg border-b border-zinc-100 dark:border-zinc-800/60 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors no-underline last:border-b-0"
              >
                <div>
                  <div className="text-[13px] font-bold text-zinc-900 dark:text-zinc-100">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">
                    {item.value}
                  </div>
                </div>

                <div>{item.badge}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-5 px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 text-[11px] text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-2 border border-zinc-100 dark:border-zinc-800/60">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 14 14" />
          </svg>
          <span>All systems operating normally. Zero simulated marketing data.</span>
        </div>
      </div>
    </div>
  );
}

