"use client";

import React from "react";
import { ExecutiveSummaryInsight } from "@/types/analytics";

interface AnalyticsExecutiveSummaryProps {
  insights: ExecutiveSummaryInsight[];
}

export function AnalyticsExecutiveSummary({ insights }: AnalyticsExecutiveSummaryProps) {
  if (!insights || insights.length === 0) return null;

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "var(--radius-lg)",
        padding: "1.25rem 1.5rem",
        border: "1px solid var(--border-subtle)",
        boxShadow: "var(--shadow-sm)",
        display: "flex",
        flexDirection: "column",
        gap: "0.85rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontSize: "1.125rem" }}>💡</span>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--brand-navy)", margin: 0 }}>
          Executive Growth Insights
        </h3>
        <span
          style={{
            fontSize: "0.6875rem",
            fontWeight: 700,
            padding: "0.15rem 0.5rem",
            borderRadius: "9999px",
            backgroundColor: "#ecfdf5",
            color: "#065f46",
          }}
        >
          MEASURED FACTS
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "0.75rem",
        }}
      >
        {insights.map((item) => {
          let badgeColor = "#3b82f6";
          let badgeBg = "#eff6ff";
          let badgeText = "INSIGHT";

          if (item.sentiment === "positive") {
            badgeColor = "#059669";
            badgeBg = "#ecfdf5";
            badgeText = "GROWTH";
          } else if (item.sentiment === "negative") {
            badgeColor = "#dc2626";
            badgeBg = "#fef2f2";
            badgeText = "ATTENTION";
          }

          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.6rem",
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-md)",
                backgroundColor: "#f8fafc",
                border: "1px solid var(--border-subtle)",
                fontSize: "0.8125rem",
                lineHeight: 1.5,
                color: "var(--brand-navy)",
              }}
            >
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  padding: "0.1rem 0.4rem",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: badgeBg,
                  color: badgeColor,
                  flexShrink: 0,
                  marginTop: "0.15rem",
                }}
              >
                {badgeText}
              </span>
              <span>{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
