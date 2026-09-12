"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { BlogPost } from "@/types";
import { formatDate } from "@/utils/formatters";
import {
  Card,
  Button,
  Badge,
  Heading,
  Text,
} from "@/components/ui";
import { BlogCard } from "@/components/public/BlogCard";

export interface BlogListFilterProps {
  initialPosts: BlogPost[];
}

export function BlogListFilter({ initialPosts }: BlogListFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");

  // Dynamic topic categories from actual posts
  const dynamicCategories = useMemo(() => {
    const categories = Array.from(new Set(initialPosts.map((p) => p.categoryName || "General"))).filter(Boolean);
    return ["All", ...categories];
  }, [initialPosts]);

  // Filtered posts based on search query and selected category
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTopic =
        selectedTopic === "All" ||
        (post.categoryName || "").toLowerCase() === selectedTopic.toLowerCase() ||
        (post.tags || []).some((t) => t.toLowerCase() === selectedTopic.toLowerCase());

      return matchesSearch && matchesTopic;
    });
  }, [initialPosts, searchQuery, selectedTopic]);

  // Featured article for spotlight
  const featuredPost = useMemo(() => {
    return initialPosts.find((p) => p.isFeatured) || initialPosts[0];
  }, [initialPosts]);

  // Popular insights (compact list)
  const popularPosts = useMemo(() => {
    return initialPosts.slice(0, 4);
  }, [initialPosts]);

  return (
    <div>
      {/* Search & Topic Tabs Bar */}
      <div style={{ maxWidth: "860px", margin: "0 auto var(--space-10) auto", textAlign: "center" }}>
        {/* Search Input */}
        <div
          style={{
            position: "relative",
            maxWidth: "540px",
            margin: "0 auto var(--space-6) auto",
          }}
        >
          <input
            type="text"
            aria-label="Search articles and insights"
            placeholder="Search articles, SEO, social media, marketing strategies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              height: "50px",
              padding: "0 2.5rem 0 2.75rem",
              borderRadius: "var(--radius-full)",
              border: "1px solid var(--surface-border)",
              backgroundColor: "var(--surface-white)",
              fontSize: "0.9375rem",
              color: "var(--text-heading)",
              boxShadow: "var(--shadow-sm)",
              outline: "none",
              fontFamily: "var(--font-sans)",
            }}
          />
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="2"
            style={{
              position: "absolute",
              left: "1.125rem",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              style={{
                position: "absolute",
                right: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "var(--text-muted)",
                fontSize: "1rem",
                cursor: "pointer",
                padding: "0.25rem",
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Topic Filter Pills */}
        <div
          role="tablist"
          aria-label="Filter blog posts by category"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            justifyContent: "center",
          }}
        >
          {dynamicCategories.map((topic) => {
            const isActive = selectedTopic === topic;
            return (
              <Button
                key={topic}
                role="tab"
                aria-selected={isActive}
                variant={isActive ? "primary" : "outline"}
                size="sm"
                onClick={() => setSelectedTopic(topic)}
                style={{
                  borderRadius: "var(--radius-full)",
                  padding: "0.4rem 1rem",
                  fontSize: "0.875rem",
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                {topic}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Featured Spotlight Card (Rendered when no search/topic filter is active) */}
      {selectedTopic === "All" && searchQuery.trim() === "" && featuredPost && (
        <div style={{ marginBottom: "var(--space-12)" }}>
          <Card
            variant="default"
            padding="none"
            hoverable
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr",
              overflow: "hidden",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--surface-border)",
              boxShadow: "var(--shadow-lg)",
              backgroundColor: "var(--surface-white)",
            }}
            className="featured-blog-card"
          >
            {/* Visual Box */}
            <div
              style={{
                backgroundColor: "var(--brand-navy-950)",
                color: "#ffffff",
                padding: "clamp(2rem, 4vw, 3.5rem)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "300px",
                borderRight: "1px solid var(--border-dark)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Badge variant="primary-solid" size="sm">
                  {featuredPost.categoryName}
                </Badge>
                <Badge variant="navy-subtle" size="sm">
                  FEATURED PLAYBOOK
                </Badge>
              </div>

              <div style={{ padding: "1.5rem 0" }}>
                <div style={{ fontSize: "1.875rem", fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.02em" }}>
                  {featuredPost.title}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.8125rem", color: "var(--text-inverted-muted)" }}>
                <span>{formatDate(featuredPost.publishedAt)}</span>
                <span>•</span>
                <span>{featuredPost.readingTimeMinutes} min read</span>
                {featuredPost.author?.name && (
                  <>
                    <span>•</span>
                    <span>By {featuredPost.author.name}</span>
                  </>
                )}
              </div>
            </div>

            {/* Excerpt & CTA */}
            <div
              style={{
                padding: "clamp(2rem, 4vw, 3rem)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--brand-green-600)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                Executive Summary
              </div>

              <Text variant="body" color="secondary" style={{ lineHeight: 1.7, marginBottom: "var(--space-6)" }}>
                {featuredPost.excerpt}
              </Text>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "var(--space-6)" }}>
                {(featuredPost.tags || []).map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--brand-navy-800)",
                      backgroundColor: "var(--surface-subtle)",
                      border: "1px solid var(--surface-border)",
                      padding: "0.2rem 0.55rem",
                      borderRadius: "var(--radius-full)",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/blog/${featuredPost.slug}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--brand-green-600)",
                  textDecoration: "none",
                  width: "fit-content",
                }}
              >
                <span>Read Full Playbook</span>
                <span>→</span>
              </Link>
            </div>
          </Card>

          <style>{`
            @media (max-width: 860px) {
              .featured-blog-card {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </div>
      )}

      {/* Main Blog Content + Sidebar Grid */}
      <div
        className="blog-layout-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "2.3fr 1fr",
          gap: "clamp(2rem, 4vw, 3.5rem)",
          alignItems: "flex-start",
        }}
      >
        {/* Left: Articles Grid */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-6)" }}>
            <Heading level="h3" color="navy">
              {selectedTopic === "All" ? "All Insights" : `${selectedTopic} Articles`} {filteredPosts.length > 0 && `(${filteredPosts.length})`}
            </Heading>
          </div>

          {filteredPosts.length === 0 ? (
            <Card variant="default" padding="lg" style={{ textAlign: "center", padding: "var(--space-12) var(--space-4)" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "var(--space-3)" }}>🔍</div>
              <Heading level="h4" color="navy" style={{ marginBottom: "var(--space-2)" }}>
                No Articles Found
              </Heading>
              <Text variant="body-sm" color="secondary" style={{ marginBottom: "var(--space-6)", maxWidth: "400px", margin: "0 auto var(--space-6) auto" }}>
                We couldn&apos;t find any articles matching &ldquo;{searchQuery || selectedTopic}&rdquo;. Try another search keyword or reset filters.
              </Text>
              <Button variant="outline" size="sm" onClick={() => { setSearchQuery(""); setSelectedTopic("All"); }}>
                Reset All Filters
              </Button>
            </Card>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "var(--space-6)",
              }}
            >
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>

        {/* Right: Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          {/* Popular Insights Card */}
          <Card variant="default" padding="lg">
            <Heading level="h4" color="navy" style={{ marginBottom: "var(--space-4)", fontSize: "1.125rem", borderBottom: "1px solid var(--surface-border)", paddingBottom: "var(--space-3)" }}>
              Popular Insights
            </Heading>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {popularPosts.map((pop, idx) => (
                <Link
                  key={pop.id}
                  href={`/blog/${pop.slug}`}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    textDecoration: "none",
                    paddingBottom: idx !== popularPosts.length - 1 ? "var(--space-3)" : 0,
                    borderBottom: idx !== popularPosts.length - 1 ? "1px solid var(--surface-border)" : "none",
                  }}
                >
                  <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--brand-green-600)", minWidth: "20px" }}>
                    0{idx + 1}
                  </span>
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--brand-navy-900)", lineHeight: 1.35, marginBottom: "0.2rem" }}>
                      {pop.title}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      {formatDate(pop.publishedAt)} • {pop.readingTimeMinutes} min read
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          {/* Quick Capability Bridge Card */}
          <Card
            variant="default"
            padding="lg"
            style={{
              backgroundColor: "var(--brand-navy-950)",
              color: "#ffffff",
              border: "1px solid var(--border-dark)",
            }}
          >
            <Badge variant="primary-solid" size="sm" style={{ marginBottom: "var(--space-3)" }}>
              DIGIVIGEE SERVICES
            </Badge>
            <div style={{ fontSize: "1.125rem", fontWeight: 800, color: "#ffffff", marginBottom: "0.5rem" }}>
              Turn Knowledge Into Revenue
            </div>
            <div style={{ fontSize: "0.8125rem", color: "var(--text-inverted-muted)", lineHeight: 1.5, marginBottom: "var(--space-4)" }}>
              Ready to implement these growth strategies for your business? Partner with our dedicated marketing strategists.
            </div>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "var(--brand-green-400)",
                textDecoration: "none",
              }}
            >
              <span>Schedule Free Strategy Call</span>
              <span>→</span>
            </Link>
          </Card>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .blog-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
