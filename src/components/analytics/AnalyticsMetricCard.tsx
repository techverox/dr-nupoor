"use client";

import React from "react";
import { MetricComparison } from "@/types/analytics";

interface AnalyticsMetricCardProps {
  title: string;
  metric: MetricComparison;
  isPercentage?: boolean;
  subtitle?: string;
  comparisonLabel?: string;
  hasComparison?: boolean;
  accentColor?: string;
  icon?: React.ReactNode;
}

export function AnalyticsMetricCard({
  title,
  metric,
  isPercentage = false,
  subtitle,
  comparisonLabel = "previous period",
  hasComparison = true,
  accentColor = "var(--brand-navy)",
  icon,
}: AnalyticsMetricCardProps) {
  const displayValue = isPercentage ? `${metric.current}%` : metric.current.toLocaleString();
  const prevDisplayValue = isPercentage ? `${metric.previous}%` : metric.previous.toLocaleString();

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "var(--radius-lg)",
        padding: "1.25rem",
        border: "1px solid var(--border-subtle)",
        boxShadow: "var(--shadow-sm)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "0.75rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          {title}
        </div>
        {icon && (
          <div style={{ color: "var(--text-muted)", display: "flex", alignItems: "center" }}>
            {icon}
          </div>
        )}
      </div>

      <div>
        <div style={{ fontSize: "1.875rem", fontWeight: 800, color: accentColor, letterSpacing: "-0.02em" }}>
          {displayValue}
        </div>

        {/* Comparison Badge & Baseline */}
        {hasComparison && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.35rem", flexWrap: "wrap" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.15rem",
                padding: "0.15rem 0.45rem",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                backgroundColor:
                  metric.trend === "neutral"
                    ? "#f1f5f9"
                    : metric.isPositive
                    ? "#ecfdf5"
                    : "#fef2f2",
                color:
                  metric.trend === "neutral"
                    ? "#64748b"
                    : metric.isPositive
                    ? "#065f46"
                    : "#b91c1c",
              }}
            >
              {metric.trend === "up" && "↑"}
              {metric.trend === "down" && "↓"}
              {metric.trend === "neutral" && "•"}
              <span>{metric.formattedChange}</span>
            </span>

            <span style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}>
              vs {prevDisplayValue} ({comparisonLabel})
            </span>
          </div>
        )}

        {subtitle && !hasComparison && (
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
