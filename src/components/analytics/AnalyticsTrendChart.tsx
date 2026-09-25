"use client";

import React, { useState, useRef } from "react";
import { TimelineDataPoint } from "@/types/analytics";

interface AnalyticsTrendChartProps {
  timeline: TimelineDataPoint[];
  title?: string;
  subtitle?: string;
}

export function AnalyticsTrendChart({
  timeline,
  title = "Traffic & Visitor Trend",
  subtitle = "Daily volume of page views and distinct visitors over the selected period.",
}: AnalyticsTrendChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const width = 800;
  const height = 260;
  const padding = { top: 25, right: 25, bottom: 40, left: 45 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const hasData = timeline.length > 0;
  const maxVal = hasData
    ? Math.max(...timeline.map((d) => Math.max(d.pageViews || 0, d.visitors || 0)), 5)
    : 5;

  const yTicks = [0, Math.round(maxVal * 0.25), Math.round(maxVal * 0.5), Math.round(maxVal * 0.75), maxVal];

  const getX = (index: number): number => {
    if (timeline.length <= 1) return padding.left + chartWidth / 2;
    return padding.left + (index / (timeline.length - 1)) * chartWidth;
  };

  const getY = (val: number): number => {
    return padding.top + chartHeight - (val / maxVal) * chartHeight;
  };

  let viewsPath = "";
  let viewsAreaPath = "";
  let visitorsPath = "";

  if (hasData) {
    const viewsPoints = timeline.map((d, i) => `${getX(i)},${getY(d.pageViews || 0)}`);
    const visitorsPoints = timeline.map((d, i) => `${getX(i)},${getY(d.visitors || 0)}`);

    viewsPath = `M ${viewsPoints.join(" L ")}`;
    visitorsPath = `M ${visitorsPoints.join(" L ")}`;

    const firstX = getX(0);
    const lastX = getX(timeline.length - 1);
    const bottomY = padding.top + chartHeight;
    viewsAreaPath = `M ${firstX},${bottomY} L ${viewsPoints.join(" L ")} L ${lastX},${bottomY} Z`;
  }

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current || timeline.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const svgX = (clientX / rect.width) * width;

    const relativeX = svgX - padding.left;
    const ratio = Math.max(0, Math.min(1, relativeX / chartWidth));
    const closestIdx = Math.round(ratio * (timeline.length - 1));
    setHoverIndex(closestIdx);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const activePoint = hoverIndex !== null && timeline[hoverIndex] ? timeline[hoverIndex] : null;
  const step = Math.max(1, Math.floor(timeline.length / 6));

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col gap-4">
      {/* Header & Legend */}
      <div className="flex flex-wrap justify-between items-start gap-3">
        <div>
          <h3 className="text-base font-black text-slate-900">
            {title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {subtitle}
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-orange-500" />
            <span className="font-bold text-slate-700">Page Views</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
            <span className="font-bold text-slate-700">Unique Visitors</span>
          </div>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative w-full overflow-hidden">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto block select-none"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          role="img"
          aria-label="Interactive traffic trend chart showing pageviews and visitors"
        >
          <defs>
            <linearGradient id="viewsAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines & Y-axis labels */}
          {yTicks.map((tick) => {
            const y = getY(tick);
            return (
              <g key={tick}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="#94a3b8"
                  fontFamily="sans-serif"
                  fontWeight="600"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* X-axis labels */}
          {timeline.map((d, i) => {
            if (i % step !== 0 && i !== timeline.length - 1) return null;
            const x = getX(i);
            const dateLabel = d.date.length > 5 && d.date.includes("-") ? d.date.slice(5) : d.date;
            return (
              <text
                key={d.date}
                x={x}
                y={height - 12}
                textAnchor="middle"
                fontSize="10"
                fill="#94a3b8"
                fontFamily="sans-serif"
                fontWeight="600"
              >
                {dateLabel}
              </text>
            );
          })}

          {/* Area Fill for Views */}
          {hasData && <path d={viewsAreaPath} fill="url(#viewsAreaGrad)" />}

          {/* Lines */}
          {hasData && (
            <>
              <path d={viewsPath} fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d={visitorsPath} fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5 3" strokeLinecap="round" strokeLinejoin="round" />
            </>
          )}

          {/* Active Hover Crosshair and Markers */}
          {hoverIndex !== null && activePoint && (
            <g>
              <line
                x1={getX(hoverIndex)}
                y1={padding.top}
                x2={getX(hoverIndex)}
                y2={padding.top + chartHeight}
                stroke="#64748b"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <circle
                cx={getX(hoverIndex)}
                cy={getY(activePoint.pageViews || 0)}
                r="5"
                fill="#f97316"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <circle
                cx={getX(hoverIndex)}
                cy={getY(activePoint.visitors || 0)}
                r="4.5"
                fill="#3b82f6"
                stroke="#ffffff"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoverIndex !== null && activePoint && (
          <div
            className="absolute top-2.5 z-20 pointer-events-none whitespace-nowrap bg-slate-900 text-white px-3.5 py-2.5 rounded-2xl shadow-xl border border-slate-800 text-xs font-medium -translate-x-1/2 transition-all duration-75"
            style={{
              left: `${Math.min(85, Math.max(15, (getX(hoverIndex) / width) * 100))}%`,
            }}
          >
            <div className="font-bold border-b border-white/20 pb-1 mb-1.5 text-[11px] text-slate-300">
              📅 {activePoint.date}
            </div>
            <div className="flex justify-between gap-4 text-orange-400">
              <span>Page Views:</span>
              <span className="font-black">{activePoint.pageViews || 0}</span>
            </div>
            <div className="flex justify-between gap-4 text-blue-400">
              <span>Unique Visitors:</span>
              <span className="font-black">{activePoint.visitors || 0}</span>
            </div>
            {typeof activePoint.leads === "number" && activePoint.leads > 0 && (
              <div className="flex justify-between gap-4 text-emerald-400 mt-0.5">
                <span>Leads Captured:</span>
                <span className="font-black">{activePoint.leads}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
