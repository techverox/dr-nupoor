"use client";

import React from "react";
import { BlogPost } from "@/types";
import { analyzeBlogSeo, SeoCheckItem } from "@/lib/utils/blogUtils";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export interface BlogSeoCheckerProps {
  post: Partial<BlogPost>;
}

export function BlogSeoChecker({ post }: BlogSeoCheckerProps) {
  const analysis = analyzeBlogSeo(post);

  const title = (post.seo?.title || post.title || "Article Title").trim();
  const description = (
    post.seo?.description ||
    post.excerpt ||
    "Add a compelling meta description to see how your article snippet appears on search engine results pages."
  ).trim();
  const slug = (post.slug || "your-article-slug").trim();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* 1. Google SERP Snippet Preview */}
      <Card padding="lg" style={{ backgroundColor: "var(--bg-primary)", border: "1px solid var(--border-subtle)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--brand-navy)", margin: 0 }}>
            Search Engine Result Snippet Preview (Google)
          </h3>
          <Badge
            variant={
              analysis.overallStatus === "good"
                ? "primary-solid"
                : analysis.overallStatus === "needs-improvement"
                ? "outline"
                : "navy-subtle"
            }
            size="sm"
          >
            {analysis.overallStatus === "good"
              ? "SEO READY"
              : analysis.overallStatus === "needs-improvement"
              ? "NEEDS ATTENTION"
              : "ACTION REQUIRED"}
          </Badge>
        </div>

        {/* Mock SERP Box */}
        <div
          style={{
            padding: "1rem 1.25rem",
            borderRadius: "var(--radius-md)",
            backgroundColor: "#ffffff",
            border: "1px solid var(--border-strong)",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: "var(--brand-navy)",
                color: "var(--brand-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.625rem",
                fontWeight: 900,
              }}
            >
              NP
            </div>
            <div style={{ fontSize: "0.75rem", color: "#202124", lineHeight: 1.2 }}>
              <div>Dr. Noopur Patel | Breast Surgical Oncologist</div>
              <div style={{ color: "#5f6368", fontSize: "0.6875rem" }}>
                https://drnoopurpatel.com/blog/{slug}
              </div>
            </div>
          </div>

          <div
            style={{
              fontSize: "1.125rem",
              fontWeight: 500,
              color: "#1a0dab",
              lineHeight: 1.3,
              marginTop: "0.25rem",
              marginBottom: "0.25rem",
              cursor: "pointer",
            }}
          >
            {title} — Dr. Noopur Patel
          </div>

          <div
            style={{
              fontSize: "0.8125rem",
              color: "#4d5156",
              lineHeight: 1.5,
              wordBreak: "break-word",
            }}
          >
            {description}
          </div>
        </div>
      </Card>

      {/* 2. Editorial SEO Advisory Checklist */}
      <Card padding="lg" style={{ backgroundColor: "var(--bg-primary)", border: "1px solid var(--border-subtle)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--brand-navy)", margin: 0 }}>
            Editorial SEO Checklist & Guidelines
          </h3>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            {analysis.wordCount} words • ~{analysis.readingTimeMinutes} min read
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {analysis.checks.map((check) => (
            <SeoCheckRow key={check.id} check={check} />
          ))}
        </div>
      </Card>
    </div>
  );
}

function SeoCheckRow({ check }: { check: SeoCheckItem }) {
  const icon =
    check.status === "pass" ? "🟢" : check.status === "warning" ? "🟡" : "🔴";

  const borderColor =
    check.status === "pass"
      ? "var(--brand-primary-border)"
      : check.status === "warning"
      ? "#fef08a"
      : "#fecaca";

  const bgColor =
    check.status === "pass"
      ? "rgba(10, 186, 115, 0.04)"
      : check.status === "warning"
      ? "rgba(234, 179, 8, 0.05)"
      : "rgba(239, 68, 68, 0.05)";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0.75rem",
        padding: "0.75rem",
        borderRadius: "var(--radius-md)",
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
      }}
    >
      <span style={{ fontSize: "1rem", flexShrink: 0, marginTop: "0.1rem" }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--brand-navy)" }}>
            {check.label}
          </span>
          <span
            style={{
              fontSize: "0.6875rem",
              fontWeight: 700,
              textTransform: "uppercase",
              color:
                check.status === "pass"
                  ? "var(--brand-primary-hover)"
                  : check.status === "warning"
                  ? "#b45309"
                  : "var(--status-error)",
            }}
          >
            {check.status}
          </span>
        </div>
        <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginTop: "0.15rem", lineHeight: 1.4 }}>
          {check.message}
        </div>
        {check.recommendation && (
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              marginTop: "0.25rem",
              fontStyle: "italic",
            }}
          >
            Tip: {check.recommendation}
          </div>
        )}
      </div>
    </div>
  );
}
