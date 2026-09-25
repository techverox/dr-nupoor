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
  "/admin": "Practice Dashboard",
  "/admin/pages": "Website Pages CMS",
  "/admin/services": "Treatments & Services",
  "/admin/portfolio": "Patient Stories & Cases",
  "/admin/testimonials": "Patient Reviews & Stories",
  "/admin/faqs": "Clinical FAQs",
  "/admin/team": "Medical Team & Specialists",
  "/admin/blog": "Health Insights & Blog",
  "/admin/landing-pages": "Specialty Care Pages",
  "/admin/landing-pages/components": "Clinical Component Library",
  "/admin/landing-pages/templates": "Care Journey Templates",
  "/admin/forms": "Clinical Forms & Assessments",
  "/admin/leads": "Consultation Bookings & Inquiries",
  "/admin/analytics": "Practice Analytics & Traffic",
  "/admin/subscribers": "Health Newsletter Subscribers",
  "/admin/offers": "Announcements & Health Alerts",
  "/admin/redirects": "URL Redirects",
  "/admin/seo": "Oncology SEO Engine",
  "/admin/users": "Staff Access & Permissions",
  "/admin/settings": "Clinic Global Settings",
};

export function AdminTopBar({ user, onToggleSidebar, isSidebarCollapsed }: AdminTopBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Strictly enforce Light Mode for the entire Admin experience
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.remove("dark");
      try {
        localStorage.setItem("dr_noopur_theme", "light");
      } catch {}
    }
  }, []);

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
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 h-14 flex items-center justify-between px-3 sm:px-6 transition-colors shadow-2xs">
      {/* Left Area: Universal Hamburger Button & Breadcrumbs */}
      <div className="flex items-center gap-3">
        {/* Universal Hamburger Toggle Button (Active on ALL screens) */}
        <button
          type="button"
          onClick={onToggleSidebar}
          className="flex items-center justify-center w-8.5 h-8.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all shadow-2xs cursor-pointer group"
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
          <span className="text-slate-400 font-medium">Admin</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-semibold tracking-tight truncate max-w-[160px] sm:max-w-[280px]">
            {currentSection}
          </span>
        </div>
      </div>

      {/* Right Area: Live Mode Badge, Live Site Link, User Info & Logout */}
      <div className="flex items-center gap-2 sm:gap-3.5">
        {/* Live Mode Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-semibold tracking-tight shadow-2xs select-none">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Live Mode</span>
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-emerald-700 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-100 no-underline"
          title="Open public website in new tab"
        >
          <span className="hidden sm:inline">Live Website</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </Link>

        <div className="h-4 w-px bg-slate-200" />

        {/* User Badge */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex flex-col items-end mr-0.5">
            <span className="text-xs font-semibold text-slate-900 leading-tight tracking-tight">
              {user.email}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
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
          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
          title="Change Admin Password"
        >
          <KeyRound className="w-4 h-4" />
        </button>

        {/* Sign Out Button */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50 cursor-pointer"
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
