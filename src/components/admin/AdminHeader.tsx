"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminUserSession } from "@/lib/auth/constants";
import { logoutAdmin } from "@/lib/auth/clientAuth";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export interface AdminHeaderProps {
  user: AdminUserSession;
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutAdmin();
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("[AdminHeader] Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <header
      style={{
        backgroundColor: "var(--brand-navy)",
        color: "#ffffff",
        borderBottom: "1px solid var(--border-dark)",
        padding: "0.75rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <Link href="/admin" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Logo size="sm" />
          <Badge variant="primary-solid" size="sm" style={{ fontWeight: 700 }}>
            ADMIN
          </Badge>
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link
            href="/admin"
            style={{
              color: "#ffffff",
              fontSize: "0.875rem",
              fontWeight: 500,
              padding: "0.35rem 0.75rem",
              borderRadius: "var(--radius-sm)",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            Overview
          </Link>
        </nav>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link
          href="/"
          target="_blank"
          style={{
            color: "var(--text-inverse-muted)",
            fontSize: "0.8125rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          <span>View Public Site</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.25rem 0.75rem",
            borderRadius: "var(--radius-full)",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            fontSize: "0.8125rem",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "var(--brand-primary)",
            }}
          />
          <span>{user.email}</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          isLoading={isLoggingOut}
          style={{
            borderColor: "rgba(255, 255, 255, 0.2)",
            color: "#ffffff",
          }}
        >
          Sign Out
        </Button>
      </div>
    </header>
  );
}
