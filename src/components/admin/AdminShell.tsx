"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AdminUserSession } from "@/lib/auth/constants";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopBar } from "./AdminTopBar";
import { notifyCmsUpdate } from "@/lib/utils/realtimeSync";

export interface AdminShellProps {
  user: AdminUserSession;
  children: React.ReactNode;
}

export function AdminShell({ user, children }: AdminShellProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  // Restore desktop collapsed state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("drn_admin_sidebar_collapsed");
      if (saved === "true") {
        setIsDesktopCollapsed(true);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Toggle sidebar for both mobile and desktop
  const handleToggleSidebar = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setIsMobileOpen((prev) => !prev);
    } else {
      setIsDesktopCollapsed((prev) => {
        const next = !prev;
        try {
          localStorage.setItem("drn_admin_sidebar_collapsed", String(next));
        } catch {}
        return next;
      });
    }
  }, []);

  // Global Keyboard Shortcut: Ctrl+B or Cmd+B to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        handleToggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleToggleSidebar]);

  // Global Admin Mutation Interceptor
  useEffect(() => {
    if (typeof window === "undefined") return;

    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const response = await originalFetch(...args);
      try {
        const url = typeof args[0] === "string" ? args[0] : (args[0] as Request)?.url || "";
        const options = args[1];
        const method = (options?.method || "GET").toUpperCase();

        if (
          url.includes("/api/admin/") &&
          ["POST", "PUT", "PATCH", "DELETE"].includes(method) &&
          response.ok
        ) {
          notifyCmsUpdate(url);
        }
      } catch {
        // Silent recovery
      }
      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  // Enforce pure light mode in admin interface
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.remove("dark");
      try {
        localStorage.setItem("dr_noopur_theme", "light");
      } catch {}
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-900 font-[family-name:var(--font-plus-jakarta)] font-sans antialiased tracking-[-0.011em] selection:bg-emerald-500/20 selection:text-emerald-900">
      {/* Sidebar Navigation */}
      <AdminSidebar
        isMobileOpen={isMobileOpen}
        isCollapsed={isDesktopCollapsed}
        onCloseMobile={() => setIsMobileOpen(false)}
        onToggleCollapse={handleToggleSidebar}
        user={user}
      />

      {/* Main App Canvas */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden relative">
        <AdminTopBar
          user={user}
          onToggleSidebar={handleToggleSidebar}
          isSidebarCollapsed={isDesktopCollapsed}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}

