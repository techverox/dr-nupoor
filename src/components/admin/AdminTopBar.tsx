"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AdminUserSession } from "@/lib/auth/constants";
import { logoutAdmin } from "@/lib/auth/clientAuth";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { KeyRound } from "lucide-react";

export interface AdminTopBarProps {
  user: AdminUserSession;
  onToggleSidebar: () => void;
  isSidebarCollapsed?: boolean;
}

const SECTION_TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/pages": "Website Pages CMS",
  "/admin/services": "Services CMS",
  "/admin/portfolio": "Portfolio CMS",
  "/admin/testimonials": "Patient Reviews & Stories",
  "/admin/faqs": "FAQs Management CMS",
  "/admin/team": "Team Specialists CMS",
  "/admin/blog": "Blog CMS & Playbooks",
  "/admin/landing-pages": "Landing Pages CMS",
  "/admin/landing-pages/components": "Component Library",
  "/admin/landing-pages/templates": "Landing Templates",
  "/admin/forms": "Forms & Builder",
  "/admin/leads": "Leads & Inquiries",
  "/admin/analytics": "Traffic & Telemetry",
  "/admin/subscribers": "Newsletter Subscribers",
  "/admin/offers": "Popups & Offers",
  "/admin/redirects": "URL Redirects",
  "/admin/seo": "Global SEO Engine",
  "/admin/users": "Users & RBAC",
  "/admin/activity": "Activity & Audit Logs",
  "/admin/backup": "Backup & Storage",
  "/admin/settings": "Global Settings",
};

export function AdminTopBar({ user, onToggleSidebar, isSidebarCollapsed }: AdminTopBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Sync theme state with document element (Default to Light First)
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedTheme = localStorage.getItem("digivigee_theme");
        if (savedTheme === "dark") {
          document.documentElement.classList.add("dark");
          setIsDark(true);
        } else {
          document.documentElement.classList.remove("dark");
          setIsDark(false);
        }
      } catch {
        document.documentElement.classList.remove("dark");
        setIsDark(false);
      }
    }
  }, []);

  const toggleTheme = () => {
    if (typeof window === "undefined") return;
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      try { localStorage.setItem("digivigee_theme", "dark"); } catch {}
    } else {
      document.documentElement.classList.remove("dark");
      try { localStorage.setItem("digivigee_theme", "light"); } catch {}
    }
  };

  // Dynamic breadcrumb resolution
  const currentSection = useMemo(() => {
    if (SECTION_TITLES[pathname]) return SECTION_TITLES[pathname];
    for (const [route, title] of Object.entries(SECTION_TITLES)) {
      if (route !== "/admin" && pathname.startsWith(route)) {
        return title;
      }
    }
    return "Admin Portal";
  }, [pathname]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutAdmin();
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("[AdminTopBar] Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white/85 dark:bg-[#0B0F17]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 h-14 flex items-center justify-between px-3 sm:px-6 transition-colors">
      {/* Left Area: Universal Hamburger Button & Breadcrumbs */}
      <div className="flex items-center gap-3">
        {/* Universal Hamburger Toggle Button (Active on ALL screens) */}
        <button
          type="button"
          onClick={onToggleSidebar}
          className="flex items-center justify-center w-8.5 h-8.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all shadow-2xs cursor-pointer group"
          title={isSidebarCollapsed ? "Expand Sidebar (Ctrl+B)" : "Toggle Sidebar (Ctrl+B)"}
          aria-label="Toggle navigation sidebar"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:scale-105 transition-transform"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Breadcrumb Path */}
        <div className="flex items-center gap-2 text-xs sm:text-[13px] font-medium">
          <span className="text-slate-400 dark:text-slate-500 font-medium">Admin</span>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <span className="text-slate-900 dark:text-slate-100 font-semibold tracking-tight truncate max-w-[160px] sm:max-w-[280px]">
            {currentSection}
          </span>
        </div>
      </div>

      {/* Right Area: Theme Switcher, Live Site Link, User Info & Logout */}
      <div className="flex items-center gap-2 sm:gap-3.5">
        {/* Theme Mode Toggle (Minimalist Dark / Light) */}
        <button
          type="button"
          onClick={toggleTheme}
          className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title={isDark ? "Switch to Minimalist Light Mode" : "Switch to Minimalist Dark Mode"}
          aria-label="Toggle theme mode"
        >
          {isDark ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 no-underline"
          title="Open public website in new tab"
        >
          <span className="hidden sm:inline">Live Website</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </Link>

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

        {/* User Badge */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex flex-col items-end mr-0.5">
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 leading-tight tracking-tight">
              {user.email}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
              {user.roleName || user.role.replace(/_/g, " ")}
            </span>
          </div>

          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-xs font-bold uppercase shadow-2xs shrink-0">
            {user.email.charAt(0)}
          </div>
        </div>

        {/* Change Password Button */}
        <button
          type="button"
          onClick={() => setIsPasswordModalOpen(true)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors cursor-pointer"
          title="Change Admin Password"
        >
          <KeyRound className="w-4 h-4" />
        </button>

        {/* Sign Out Button */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors disabled:opacity-50 cursor-pointer"
          title="Sign Out"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        userEmail={user.email}
      />
    </header>
  );
}
