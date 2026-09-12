"use client";

import React from "react";
import Link from "next/link";
import { Permission } from "@/types/rbac";
import { AdminUserSession } from "@/lib/auth/constants";
import { hasPermission, hasAnyPermission } from "@/lib/auth/rbacRules";
import { Button } from "@/components/ui/Button";

export interface AdminPermissionGuardProps {
  user?: AdminUserSession | null;
  permission?: Permission | Permission[];
  requireAll?: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AdminPermissionGuard({
  user,
  permission,
  requireAll = false,
  children,
  fallback,
}: AdminPermissionGuardProps) {
  if (!permission) {
    return <>{children}</>;
  }

  const isAuthorized = Array.isArray(permission)
    ? requireAll
      ? permission.every((p) => hasPermission(user, p))
      : hasAnyPermission(user, permission)
    : hasPermission(user, permission);

  if (isAuthorized) {
    return <>{children}</>;
  }

  if (fallback !== undefined) {
    return <>{fallback}</>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 2rem",
        textAlign: "center",
        backgroundColor: "var(--bg-primary)",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--border-subtle)",
        maxWidth: "600px",
        margin: "2rem auto",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "var(--radius-full)",
          backgroundColor: "#FEE2E2",
          color: "#EF4444",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.5rem",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>

      <h2
        style={{
          fontSize: "1.375rem",
          fontWeight: 700,
          color: "var(--brand-navy)",
          marginBottom: "0.5rem",
        }}
      >
        Access Restricted
      </h2>

      <p
        style={{
          fontSize: "0.9375rem",
          color: "var(--text-secondary)",
          marginBottom: "1.5rem",
          lineHeight: 1.6,
        }}
      >
        Your current role (<strong>{user?.roleName || user?.role || "Restricted User"}</strong>) does not have sufficient permissions to view or manage this section.
      </p>

      <div
        style={{
          padding: "0.75rem 1rem",
          borderRadius: "var(--radius-md)",
          backgroundColor: "var(--bg-secondary)",
          border: "1px solid var(--border-subtle)",
          fontSize: "0.8125rem",
          color: "var(--text-muted)",
          marginBottom: "2rem",
          fontFamily: "monospace",
        }}
      >
        Required Capability: {Array.isArray(permission) ? permission.join(" | ") : permission}
      </div>

      <div style={{ display: "flex", gap: "0.75rem" }}>
        <Link href="/admin">
          <Button variant="primary">Return to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
