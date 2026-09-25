import React from "react";
import Link from "next/link";

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
  accentColor = "#059669",
  href,
  badge,
}: StatCardProps) {
  const cardContent = (
    <div className="flex flex-col justify-between h-full p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all duration-200 group relative">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {title}
          </span>
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-2xs"
            style={{ color: accentColor, backgroundColor: `color-mix(in srgb, ${accentColor} 12%, transparent)` }}
          >
            {icon}
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-none tabular-nums">
            {value}
          </div>

          {badge && (
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                badge.type === "success"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : badge.type === "info"
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : "bg-slate-100 text-slate-600 border-slate-200"
              }`}
            >
              {badge.text}
            </span>
          )}
        </div>
      </div>

      {subtitle && (
        <div className="mt-3 text-xs text-slate-500 font-medium">
          {subtitle}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full transition-transform hover:-translate-y-0.5 focus:outline-none">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
