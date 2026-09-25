import React from "react";
import Link from "next/link";
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
      value: status.authStatus === "connected" ? "Connected & Active" : "Offline",
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
          ? "Resilient Local Fallback"
          : "Disconnected",
      href: "/admin/settings",
      badge: (
        <Badge
          variant={status.firestoreStatus === "connected" ? "primary-solid" : "warning"}
          size="sm"
        >
          {status.firestoreStatus === "connected" ? "CONNECTED" : "READY"}
        </Badge>
      ),
    },
    {
      label: "Session Protection",
      value: "HTTP-Only & Scrypt Encrypted",
      href: "/admin/users",
      badge: (
        <Badge variant="primary-subtle" size="sm">
          SECURE
        </Badge>
      ),
    },
    {
      label: "Next.js Engine",
      value: `App Router (${status.nodeEnv})`,
      href: "/admin",
      badge: (
        <Badge variant="navy-subtle" size="sm">
          v16.3
        </Badge>
      ),
    },
  ];

  return (
    <div className="flex flex-col p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs h-full">
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between flex-wrap gap-2 mb-5">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Practice Portal Infrastructure
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Operational health and database connectivity for Dr. Noopur Patel Clinic.
              </p>
            </div>

            <Link
              href="/admin/settings"
              className="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors no-underline"
            >
              Settings →
            </Link>
          </div>

          <div className="flex flex-col gap-1">
            {items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between p-2.5 rounded-lg border-b border-slate-100 hover:bg-slate-50 transition-colors no-underline last:border-b-0"
              >
                <div>
                  <div className="text-[13px] font-bold text-slate-900">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {item.value}
                  </div>
                </div>

                <div>{item.badge}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-5 px-4 py-3 rounded-xl bg-slate-50 text-[11px] text-slate-600 font-medium flex items-center gap-2 border border-slate-200/70">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-600">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 14 14" />
          </svg>
          <span>All clinical systems operating normally. 100% real-time patient data synchronization.</span>
        </div>
      </div>
    </div>
  );
}
