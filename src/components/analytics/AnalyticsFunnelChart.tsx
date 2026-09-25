"use client";

import React from "react";
import { FunnelStage } from "@/types/analytics";

interface AnalyticsFunnelChartProps {
  funnel: FunnelStage[];
  title?: string;
  subtitle?: string;
}

export function AnalyticsFunnelChart({
  funnel,
  title = "Clinical Consultation Funnel",
  subtitle = "Patient progression from initial inquiry to confirmed OPD consultation.",
}: AnalyticsFunnelChartProps) {
  const topCount = funnel.length > 0 ? funnel[0].count : 0;

  const stageColorClasses: Record<string, string> = {
    visitors: "bg-slate-500",
    engaged: "bg-blue-500",
    intent: "bg-indigo-500",
    submissions: "bg-purple-500",
    leads: "bg-amber-500",
    converted: "bg-emerald-500",
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col gap-4">
      <div>
        <h3 className="text-base font-black text-slate-900">
          {title}
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          {subtitle}
        </p>
      </div>

      {topCount === 0 ? (
        <div className="py-12 text-center text-slate-400 text-xs font-medium">
          No visitor events recorded in this period yet. Patient inquiries will populate funnel metrics.
        </div>
      ) : (
        <div className="space-y-4">
          {funnel.map((stage, index) => {
            const barBg = stageColorClasses[stage.id] || "bg-rose-600";
            const widthPct = Math.max(stage.percentOfTotal, stage.count > 0 ? 4 : 0);

            return (
              <div key={stage.id} className="space-y-1.5">
                <div className="flex items-baseline justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900">
                      {index + 1}. {stage.name}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      ({stage.label})
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-black text-slate-900">
                      {stage.count.toLocaleString()}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-bold text-[10px]">
                      {stage.percentOfTotal}% of total
                    </span>
                  </div>
                </div>

                {/* Funnel Progress Bar */}
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${barBg}`}
                    style={{ width: `${widthPct}%` }}
                  />
                </div>

                {/* Stage-to-stage transition rate */}
                {index > 0 && (
                  <div className="text-[10px] text-slate-400 text-right font-medium">
                    {stage.conversionFromPrevious}% conversion from previous stage
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
