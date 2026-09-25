import React from "react";
import Link from "next/link";
import { DashboardMetrics } from "@/lib/services/dashboardService";

export interface ContentOverviewGridProps {
  metrics: DashboardMetrics;
}

export function ContentOverviewGrid({ metrics }: ContentOverviewGridProps) {
  const contentItems = [
    {
      title: "Treatments & Services",
      count: metrics.totalServices,
      desc: "Clinical Procedures & Surgical Oncology",
      href: "/admin/services",
      color: "#059669",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
    },
    {
      title: "Patient Stories & Cases",
      count: metrics.portfolioProjects,
      desc: "Verified Clinical Recovery Journeys",
      href: "/admin/portfolio",
      color: "#0284c7",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      title: "Health Insights & Blog",
      count: metrics.publishedBlogs,
      desc: "Breast Health & Patient Guides",
      href: "/admin/blog",
      color: "#7c3aed",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
    },
    {
      title: "Clinical FAQs",
      count: metrics.totalFaqs,
      desc: "Patient Questions & Doctor Answers",
      href: "/admin/faqs",
      color: "#d97706",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
    {
      title: "Patient Reviews",
      count: metrics.totalTestimonials,
      desc: "Verified Patient Reflections & Ratings",
      href: "/admin/testimonials",
      color: "#db2777",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      title: "Medical Team",
      count: metrics.totalTeamMembers,
      desc: "Clinical Specialists & Coordinators",
      href: "/admin/team",
      color: "#4f46e5",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
        </svg>
      ),
    },
    {
      title: "Media Library",
      count: metrics.totalMedia ?? 0,
      desc: "Diagnostic Graphics & Clinical Photos",
      href: "/admin/media",
      color: "#0d9488",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      ),
    },
    {
      title: "Newsletter Subscribers",
      count: metrics.totalSubscribers ?? 0,
      desc: "Subscribed Patients & Carers",
      href: "/admin/subscribers",
      color: "#16a34a",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      title: "SEO Health Score",
      count: `${metrics.seoHealthScore ?? 100}%`,
      desc: "Search Indexing & Clinical Visibility",
      href: "/admin/seo",
      color: "#0891b2",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
      <div className="mb-5 flex flex-col gap-1">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          Website Content Collections
        </h3>
        <p className="text-xs text-slate-500">
          Live content collections currently active on the public Dr. Noopur Patel patient portal. Click any collection to manage.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contentItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group flex flex-col justify-between p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all duration-200 relative no-underline"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">
                  {item.title}
                </span>
                <div 
                  className="flex items-center justify-center w-7 h-7 rounded-lg transition-transform duration-200 group-hover:scale-110 shadow-2xs"
                  style={{ color: item.color, backgroundColor: `color-mix(in srgb, ${item.color} 12%, transparent)` }}
                >
                  {item.icon}
                </div>
              </div>

              <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {item.count}
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200/70">
              <span className="text-[11px] text-slate-500 font-medium">
                {item.desc}
              </span>
              <span
                className="text-xs font-bold transition-transform duration-200 group-hover:translate-x-1"
                style={{ color: item.color }}
              >
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
