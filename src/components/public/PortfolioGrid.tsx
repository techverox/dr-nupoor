"use client";

import React, { useState, useMemo } from "react";
import { PortfolioItem } from "@/types";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/public/ProjectCard";

const FILTER_TABS = [
  { label: "All Projects", key: "all" },
  { label: "Social Media", key: "social" },
  { label: "Web Design", key: "web" },
  { label: "SEO", key: "seo" },
  { label: "Performance", key: "performance" },
  { label: "Branding", key: "branding" },
  { label: "Content", key: "content" },
];

export interface PortfolioGridProps {
  initialProjects: PortfolioItem[];
}

export function PortfolioGrid({ initialProjects }: PortfolioGridProps) {
  const [selectedKey, setSelectedKey] = useState("all");

  const filteredProjects = useMemo(() => {
    if (selectedKey === "all") return initialProjects;

    return initialProjects.filter((project) => {
      const categoryLower = (project.category || "").toLowerCase();
      const tagsLower = (project.tags || []).map((t) => t.toLowerCase());

      switch (selectedKey) {
        case "social":
          return (
            categoryLower.includes("social") ||
            tagsLower.some((t) => t.includes("social") || t.includes("reels"))
          );
        case "web":
          return (
            categoryLower.includes("web") ||
            categoryLower.includes("ui") ||
            tagsLower.some((t) => t.includes("web") || t.includes("next.js"))
          );
        case "seo":
          return (
            categoryLower.includes("seo") ||
            tagsLower.some((t) => t.includes("seo") || t.includes("search"))
          );
        case "performance":
          return (
            categoryLower.includes("performance") ||
            categoryLower.includes("ad") ||
            tagsLower.some((t) => t.includes("ad") || t.includes("meta") || t.includes("google"))
          );
        case "branding":
          return (
            categoryLower.includes("branding") ||
            tagsLower.some((t) => t.includes("branding") || t.includes("brand"))
          );
        case "content":
          return (
            categoryLower.includes("content") ||
            tagsLower.some((t) => t.includes("content") || t.includes("copy"))
          );
        default:
          return true;
      }
    });
  }, [initialProjects, selectedKey]);

  return (
    <div>
      {/* Accessible Filter Tab Bar */}
      <div
        role="tablist"
        aria-label="Filter portfolio projects by category"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          justifyContent: "center",
          marginBottom: "var(--space-10)",
        }}
      >
        {FILTER_TABS.map((tab) => {
          const isActive = selectedKey === tab.key;
          return (
            <Button
              key={tab.key}
              role="tab"
              aria-selected={isActive}
              variant={isActive ? "primary" : "outline"}
              size="sm"
              onClick={() => setSelectedKey(tab.key)}
              style={{
                borderRadius: "var(--radius-full)",
                padding: "0.45rem 1.1rem",
                fontSize: "0.875rem",
                fontWeight: isActive ? 700 : 500,
                transition: "all var(--transition-fast)",
              }}
            >
              {tab.label}
            </Button>
          );
        })}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "var(--space-6)",
          }}
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        /* Graceful Empty State */
        <div
          style={{
            textAlign: "center",
            padding: "var(--space-12) var(--space-4)",
            backgroundColor: "var(--surface-card)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--surface-border)",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "var(--space-3)" }}>📁</div>
          <div style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--brand-navy-900)", marginBottom: "var(--space-2)" }}>
            No Projects in this Category Yet
          </div>
          <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "var(--space-6)" }}>
            We are actively executing new campaigns in this vertical. Explore our full portfolio or request a custom proposal.
          </div>
          <Button variant="primary" size="sm" onClick={() => setSelectedKey("all")}>
            View All Projects
          </Button>
        </div>
      )}
    </div>
  );
}
