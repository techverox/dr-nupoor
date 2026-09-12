import React from "react";
import Link from "next/link";
import { PortfolioItem } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

export interface ProjectCardProps {
  project: PortfolioItem;
  className?: string;
}

export function ProjectCard({ project, className = "" }: ProjectCardProps) {
  const topMetric = Array.isArray(project.metrics) && project.metrics.length > 0 ? project.metrics[0] : null;

  return (
    <Card
      variant="default"
      padding="none"
      hoverable
      className={`project-card ${className}`}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Top Media / Brand Banner Placeholder */}
      <div
        style={{
          width: "100%",
          height: "190px",
          backgroundColor: "var(--brand-navy-900)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Geometric Background Accents */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.25) 0%, transparent 65%)",
          }}
        />

        {/* Client Name Display in Banner */}
        <div style={{ zIndex: 2, textAlign: "center", padding: "1rem" }}>
          <span
            style={{
              fontSize: "1.375rem",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              display: "block",
              fontFamily: "var(--font-sans)",
            }}
          >
            {project.clientName}
          </span>
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--text-inverted-muted)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontWeight: 600,
              fontFamily: "var(--font-sans)",
            }}
          >
            {project.industry}
          </span>
        </div>

        {/* Top-Right Metric Pill */}
        {topMetric && (
          <div
            style={{
              position: "absolute",
              top: "0.875rem",
              right: "0.875rem",
              zIndex: 3,
              backgroundColor: "rgba(11, 19, 43, 0.85)",
              backdropFilter: "blur(6px)",
              border: "1px solid var(--brand-green-500)",
              color: "var(--brand-green-400)",
              padding: "0.25rem 0.625rem",
              borderRadius: "var(--radius-full)",
              fontSize: "0.75rem",
              fontWeight: 700,
              fontFamily: "var(--font-sans)",
            }}
          >
            {topMetric.value} {topMetric.label}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", flex: 1 }}>
        <Badge variant="primary-subtle" size="sm" style={{ marginBottom: "var(--space-3)", width: "fit-content" }}>
          {project.category}
        </Badge>

        <Heading level="h4" color="navy" style={{ marginBottom: "var(--space-2)" }}>
          {project.title}
        </Heading>

        <Text variant="body-sm" color="secondary" style={{ lineHeight: 1.6, marginBottom: "var(--space-4)", flex: 1 }}>
          {project.shortDescription}
        </Text>

        <div style={{ borderTop: "1px solid var(--surface-border)", paddingTop: "var(--space-4)" }}>
          <Link
            href={`/portfolio/${project.slug}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              fontSize: "0.9375rem",
              fontWeight: 600,
              color: "var(--brand-green-600)",
            }}
          >
            <span>View Case Study</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </Card>
  );
}
