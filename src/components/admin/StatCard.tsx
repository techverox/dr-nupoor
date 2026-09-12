import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";

export interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  subtitle?: string;
  accentColor?: string;
  href?: string;
  badge?: {
    text: string;
    type?: "success" | "neutral" | "info";
  };
}

export function StatCard({
  title,
  value,
  icon,
  subtitle,
  accentColor = "var(--brand-primary)",
  href,
  badge,
}: StatCardProps) {
  const cardContent = (
    <div className="flex flex-col justify-between h-full p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0E1422] border border-slate-200/80 dark:border-slate-800/80 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 group relative">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {title}
          </span>
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
            style={{ color: accentColor, backgroundColor: `color-mix(in srgb, ${accentColor} 10%, transparent)` }}
          >
            {icon}
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-none tabular-nums">
            {value}
          </div>

          {badge && (
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                badge.type === "success"
                  ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40"
                  : badge.type === "info"
                  ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/40"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/40"
              }`}
            >
              {badge.text}
            </span>
          )}
        </div>
      </div>

      {subtitle && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-normal">
          <span>{subtitle}</span>
          {href && (
            <span
              className="text-xs font-bold transition-transform duration-200 group-hover:translate-x-1"
              style={{ color: accentColor }}
            >
              →
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block no-underline">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
