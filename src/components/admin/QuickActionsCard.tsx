import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";

export function QuickActionsCard() {
  const actions = [
    {
      title: "View Live Public Website",
      desc: "Open public agency portal in a new browser tab",
      href: "/",
      isExternal: true,
      color: "var(--brand-primary)",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      ),
    },
    {
      title: "Manage Services & Packages",
      desc: "Update core offerings, pricing, and service FAQs",
      href: "/admin/services",
      color: "#3b82f6",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
    },
    {
      title: "Write & Publish Blog Post",
      desc: "Rich-text article editor with SEO metadata",
      href: "/admin/blog",
      color: "#8b5cf6",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      ),
    },
    {
      title: "Manage Leads & Inquiries",
      desc: "Full status management, notes, and inquiry follow-ups",
      href: "/admin/leads",
      color: "#f59e0b",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      title: "Global Site Settings & Sync",
      desc: "Configure brand info, contact details, and database sync",
      href: "/admin/settings",
      color: "#0284c7",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
    {
      title: "Marketing Intelligence & Analytics",
      desc: "Live traffic trends, conversion rates, and SEO performance",
      href: "/admin/analytics",
      color: "#10b981",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0E1422] border border-slate-200/80 dark:border-slate-800/80 shadow-2xs h-full">
      <div className="mb-5 flex flex-col gap-1">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Quick Actions & Shortcuts
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
          Direct operational access to platform management workflows.
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            target={action.isExternal ? "_blank" : undefined}
            className="group flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/80 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-2xs transition-all duration-200 no-underline"
          >
            <div className="flex items-center gap-3.5">
              <div
                className="flex items-center justify-center w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 transition-transform duration-200 group-hover:scale-105 shadow-2xs"
                style={{ color: action.color }}
              >
                {action.icon}
              </div>
              <div>
                <div className="text-xs sm:text-[13px] font-semibold text-slate-900 dark:text-slate-100">
                  {action.title}
                </div>
                <div className="text-[11px] text-slate-400 font-normal mt-0.5">
                  {action.desc}
                </div>
              </div>
            </div>

            <span
              className="text-xs font-bold transition-transform duration-200 group-hover:translate-x-1"
              style={{ color: action.color }}
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

