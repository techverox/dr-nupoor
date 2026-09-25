import React from "react";
import Link from "next/link";
import { DashboardMetrics } from "@/lib/services/dashboardService";
import { Card } from "@/components/ui/Card";

export interface ContentOverviewGridProps {
  metrics: DashboardMetrics;
}

export function ContentOverviewGrid({ metrics }: ContentOverviewGridProps) {
  const contentItems = [
    {
      title: "Services",
      count: metrics.totalServices,
      desc: "Digital Marketing Core Offerings",
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
      title: "Portfolio Case Studies",
      count: metrics.portfolioProjects,
      desc: "Client Success Stories & Results",
      href: "/admin/portfolio",
      color: "#10b981",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      title: "Blog Articles",
      count: metrics.publishedBlogs,
      desc: "Published SEO Growth Articles",
      href: "/admin/blog",
      color: "#8b5cf6",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
    },
    {
      title: "Frequently Asked Questions",
      count: metrics.totalFaqs,
      desc: "Public Service & Agency FAQs",
      href: "/admin/faqs",
      color: "#f59e0b",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
    {
      title: "Patient Reviews & Stories",
      count: metrics.totalTestimonials,
      desc: "Patient Reflections & QR Submissions",
      href: "/admin/testimonials",
      color: "#ec4899",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      title: "Team Members",
      count: metrics.totalTeamMembers,
      desc: "Agency Leadership & Specialists",
      href: "/admin/team",
      color: "#6366f1",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
        </svg>
      ),
    },
    {
      title: "Media Assets",
      count: metrics.totalMedia ?? 0,
      desc: "Visual Assets in Media Library",
      href: "/admin/media",
      color: "#14b8a6",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      ),
    },
    {
      title: "Audience Subscribers",
      count: metrics.totalSubscribers ?? 0,
      desc: "Newsletter Email Contacts",
      href: "/admin/subscribers",
      color: "#059669",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      title: "Active Offers",
      count: metrics.activeOffers ?? 0,
      desc: "Live Popups & Announcement Banners",
      href: "/admin/offers",
      color: "#f43f5e",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      title: "URL Redirects",
      count: metrics.activeRedirects ?? 0,
      desc: "Active 301/302 Routing Rules",
      href: "/admin/redirects",
      color: "#ea580c",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 14 20 9 15 4" />
          <path d="M4 20v-7a4 4 0 0 1 4-4h12" />
        </svg>
      ),
    },
    {
      title: "SEO Health Score",
      count: `${metrics.seoHealthScore ?? 100}%`,
      desc: "Metadata & Indexing Coverage",
      href: "/admin/seo",
      color: "#0284c7",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
    {
      title: "Landing Pages",
      count: metrics.totalLandingPages ?? 0,
      desc: "Campaign Funnels & Custom URLs",
      href: "/admin/landing-pages",
      color: "#0d9488",
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
  ];

  return (
    <div className="flex flex-col p-5 sm:p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="mb-5 flex flex-col gap-1">
        <h3 className="text-base font-bold text-zinc-900 dark:text-white tracking-tight">
          Website Content Overview
        </h3>
        <p className="text-[13px] text-zinc-500">
          Live content collections currently active on the public DigiVigee platform. Click any collection to manage.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contentItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group flex flex-col justify-between p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800/80 hover:bg-white dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all duration-200 relative no-underline"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-semibold text-zinc-600 dark:text-zinc-400">
                  {item.title}
                </span>
                <div 
                  className="flex items-center justify-center w-7 h-7 rounded-md transition-transform duration-200 group-hover:scale-110"
                  style={{ color: item.color, backgroundColor: `color-mix(in srgb, ${item.color} 10%, transparent)` }}
                >
                  {item.icon}
                </div>
              </div>

              <div className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                {item.count}
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60">
              <span className="text-[11px] text-zinc-500 font-medium">
                {item.desc}
              </span>
              <span
                className="text-[13px] font-bold transition-transform duration-200 group-hover:translate-x-1"
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

