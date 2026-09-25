"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Badge } from "@/components/ui/Badge";
import { Permission } from "@/types/rbac";
import { AdminUserSession } from "@/lib/auth/constants";
import { hasPermission, hasAnyPermission } from "@/lib/auth/rbacRules";

export interface NavItemDef {
  label: string;
  href: string;
  isImplemented: boolean;
  icon: React.ReactNode;
  permission?: Permission;
  permissions?: Permission[];
}

export interface NavGroupDef {
  title: string;
  items: NavItemDef[];
}

export const ADMIN_NAV_GROUPS: NavGroupDef[] = [
  {
    title: "MAIN",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        isImplemented: true,
        permission: "dashboard.view",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
          </svg>
        ),
      },
    ],
  },
  {
    title: "CMS & CONTENT",
    items: [
      {
        label: "Website Pages",
        href: "/admin/pages",
        isImplemented: true,
        permission: "pages.view",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        ),
      },
      {
        label: "Services",
        href: "/admin/services",
        isImplemented: true,
        permission: "services.view",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        ),
      },
      {
        label: "Portfolio",
        href: "/admin/portfolio",
        isImplemented: true,
        permission: "portfolio.view",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        ),
      },
      {
        label: "Reviews & Stories",
        href: "/admin/testimonials",
        isImplemented: true,
        permission: "testimonials.view",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        ),
      },
      {
        label: "FAQs",
        href: "/admin/faqs",
        isImplemented: true,
        permission: "faqs.view",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        ),
      },
      {
        label: "Team Members",
        href: "/admin/team",
        isImplemented: true,
        permission: "team.view",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
      },
      {
        label: "Blog Posts",
        href: "/admin/blog",
        isImplemented: true,
        permission: "blogs.view",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        ),
      },
      {
        label: "Landing Pages",
        href: "/admin/landing-pages",
        isImplemented: true,
        permission: "landing_pages.view",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        ),
      },
      {
        label: "Component Library",
        href: "/admin/landing-pages/components",
        isImplemented: true,
        permission: "landing_pages.view",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
          </svg>
        ),
      },
      {
        label: "Landing Templates",
        href: "/admin/landing-pages/templates",
        isImplemented: true,
        permission: "landing_pages.view",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
        ),
      },
    ],
  },
  {
    title: "GROWTH & OPERATIONS",
    items: [
      {
        label: "Forms & Builder",
        href: "/admin/forms",
        isImplemented: true,
        permission: "forms.view",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        ),
      },
      {
        label: "Leads & Inquiries",
        href: "/admin/leads",
        isImplemented: true,
        permission: "leads.view",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
      },
      {
        label: "Analytics",
        href: "/admin/analytics",
        isImplemented: true,
        permission: "analytics.view",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        ),
      },
      {
        label: "Subscribers",
        href: "/admin/subscribers",
        isImplemented: true,
        permission: "subscribers.view",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        ),
      },
      {
        label: "Website Banners & Popups",
        href: "/admin/offers",
        isImplemented: true,
        permission: "offers.view",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ),
      },
      {
        label: "URL Redirects",
        href: "/admin/redirects",
        isImplemented: true,
        permission: "redirects.view",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 14 20 9 15 4" />
            <path d="M4 20v-7a4 4 0 0 1 4-4h12" />
          </svg>
        ),
      },
      {
        label: "SEO Settings",
        href: "/admin/seo",
        isImplemented: true,
        permission: "seo.view",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        ),
      },
      {
        label: "Media Library",
        href: "/admin/media",
        isImplemented: true,
        permission: "media.view",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        ),
      },
      {
        label: "Global Settings",
        href: "/admin/settings",
        isImplemented: true,
        permission: "settings.view",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        ),
      },
    ],
  },
  {
    title: "SYSTEM & ACCESS",
    items: [
      {
        label: "Users & Permissions",
        href: "/admin/users",
        isImplemented: true,
        permissions: ["users.view", "roles.view"],
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M12 8v4" />
            <circle cx="12" cy="16" r="1" />
          </svg>
        ),
      },
      {
        label: "Activity & Audit Logs",
        href: "/admin/activity",
        isImplemented: true,
        permission: "audit_logs.view",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        ),
      },
      {
        label: "Backup & Storage",
        href: "/admin/backup",
        isImplemented: true,
        permission: "backup.view",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          </svg>
        ),
      },
    ],
  },
];

export interface AdminSidebarProps {
  isMobileOpen: boolean;
  isCollapsed: boolean;
  onCloseMobile: () => void;
  onToggleCollapse: () => void;
  user?: AdminUserSession | null;
}

export function AdminSidebar({
  isMobileOpen,
  isCollapsed,
  onCloseMobile,
  onToggleCollapse,
  user,
}: AdminSidebarProps) {
  const pathname = usePathname();

  // Filter navigation items by user permissions
  const filteredNavGroups = ADMIN_NAV_GROUPS.map((group) => {
    const visibleItems = group.items.filter((item) => {
      if (!user) return true;
      if (item.permission) {
        return hasPermission(user, item.permission);
      }
      if (item.permissions && item.permissions.length > 0) {
        return hasAnyPermission(user, item.permissions);
      }
      return true;
    });

    return {
      ...group,
      items: visibleItems,
    };
  }).filter((group) => group.items.length > 0);

  // Determine active item: select the single item with the most specific (longest matching) href
  const activeHref = React.useMemo(() => {
    // 1. Direct exact match
    for (const group of filteredNavGroups) {
      for (const item of group.items) {
        if (pathname === item.href) {
          return item.href;
        }
      }
    }
    // 2. Prefix match for subpages (e.g. /admin/services/new matching /admin/services)
    let bestMatch = "";
    for (const group of filteredNavGroups) {
      for (const item of group.items) {
        if (
          item.href !== "/admin" &&
          pathname.startsWith(item.href + "/") &&
          item.href.length > bestMatch.length
        ) {
          bestMatch = item.href;
        }
      }
    }
    return bestMatch || (pathname === "/admin" ? "/admin" : "");
  }, [pathname, filteredNavGroups]);

  return (
    <>
      {/* Mobile Backdrop Overlay (z-40 so it stays under modals z-200) */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Navigation Panel (Light First Minimalist) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col h-screen bg-white dark:bg-[#0B0F17] text-slate-700 dark:text-slate-300 border-r border-slate-200/80 dark:border-slate-800/80 transition-all duration-300 ease-in-out
          lg:static lg:sticky lg:top-0 lg:z-30
          ${isMobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
          ${isCollapsed ? "lg:w-[72px] lg:min-w-[72px]" : "lg:w-[260px] lg:min-w-[260px]"}
        `}
      >
        {/* Sidebar Brand Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-200/80 dark:border-slate-800/80 shrink-0 h-14 bg-white dark:bg-[#0B0F17]">
          <div className="flex items-center gap-2 overflow-hidden">
            {!isCollapsed ? (
              <>
                <div className="w-[115px] shrink-0">
                  <span className="dark:hidden inline-block"><Logo variant="light" /></span>
                  <span className="hidden dark:inline-block"><Logo variant="dark" /></span>
                </div>
                <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 shrink-0">
                  Admin
                </span>
              </>
            ) : (
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 flex items-center justify-center font-bold text-xs shrink-0 mx-auto">
                DV
              </div>
            )}
          </div>

          {/* Hamburger / Collapse Button in Sidebar Header */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onToggleCollapse}
              className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors cursor-pointer"
              title={isCollapsed ? "Expand Sidebar (Ctrl+B)" : "Collapse Sidebar (Ctrl+B)"}
              aria-label="Toggle sidebar collapse"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            {/* Mobile Close Button */}
            <button
              type="button"
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors cursor-pointer"
              onClick={onCloseMobile}
              aria-label="Close sidebar"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Navigation Groups (Hidden Scrollbar for Minimalist Polish) */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 sm:px-3 flex flex-col gap-5 overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {filteredNavGroups.map((group) => (
            <div key={group.title}>
              {!isCollapsed ? (
                <div className="px-3 pb-1.5 text-[10px] font-bold tracking-[0.08em] text-slate-400 dark:text-slate-500 uppercase truncate select-none">
                  {group.title}
                </div>
              ) : (
                <div className="w-8 mx-auto border-t border-slate-200/80 dark:border-slate-800/80 my-1" />
              )}

              <div className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const isActive = item.href === activeHref;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onCloseMobile}
                      title={isCollapsed ? item.label : undefined}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium transition-all group ${
                        isCollapsed ? "justify-center px-2" : "justify-between"
                      } ${
                        isActive
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200/80 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30 font-semibold shadow-2xs"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/50"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`shrink-0 transition-colors ${
                            isActive
                              ? "text-emerald-700 dark:text-emerald-400"
                              : "text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200"
                          }`}
                        >
                          {item.icon}
                        </span>
                        {!isCollapsed && <span className="truncate">{item.label}</span>}
                      </div>

                      {!isCollapsed && item.isImplemented && isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 shadow-[0_0_6px_rgba(5,150,105,0.4)] dark:shadow-[0_0_8px_rgba(52,211,153,0.8)] shrink-0" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer (adjusted padding so Next.js dev badge doesn't overlap text) */}
        <div className="p-3 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium shrink-0 bg-slate-50/50 dark:bg-[#0B0F17] h-14">
          {!isCollapsed ? (
            <>
              <div className="flex items-center gap-1.5 pl-10 text-slate-600 dark:text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse shrink-0" />
                <span className="font-semibold text-xs text-slate-700 dark:text-slate-300">DigiVigee CMS</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 shrink-0">
                Live Sync
              </span>
            </>
          ) : (
            <span className="mx-auto text-[9px] font-bold text-slate-400">v1.4</span>
          )}
        </div>
      </aside>
    </>
  );
}
