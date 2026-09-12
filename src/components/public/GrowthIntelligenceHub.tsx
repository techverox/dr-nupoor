"use client";

import React from "react";
import Link from "next/link";
import { BlogPost } from "@/types";

export interface GrowthIntelligenceItem {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  category?: string;
  categoryName?: string;
  readTime?: string;
  readingTimeMinutes?: number;
  authorName?: string;
  author?: { name?: string };
  publishedAt?: string;
}

export interface GrowthIntelligenceHubProps {
  posts: (BlogPost | GrowthIntelligenceItem)[];
}

export function GrowthIntelligenceHub({ posts }: GrowthIntelligenceHubProps) {
  const featured = posts[0] || {
    id: "feat-1",
    title: "The 2026 B2B & D2C Full-Funnel Scaling Playbook: Eliminating Ad Spend Waste",
    slug: "scaling-playbook-2026",
    excerpt: "A comprehensive executive teardown on optimizing Meta ad creatives, Google search intent, and CRM attribution to scale past ₹1 Crore monthly revenue without diminishing ROAS.",
    category: "TACTICAL PLAYBOOK",
    categoryName: "TACTICAL PLAYBOOK",
    readTime: "7 min read",
    authorName: "Senior Performance Architect",
    publishedAt: "2026-08-15",
  };

  const sidePosts = posts.slice(1, 4).length > 0 ? posts.slice(1, 4) : [
    {
      id: "side-1",
      title: "Mastering Zero-Click AI SEO & Google Search Generative Experience",
      slug: "mastering-zero-click-seo",
      excerpt: "How to capture #1 ranking real estate across AI search results and Google Maps packs.",
      category: "ORGANIC SCALE",
      categoryName: "ORGANIC SCALE",
      readTime: "4 min read",
      authorName: "Lead SEO Strategist",
      publishedAt: "2026-08-20",
    },
    {
      id: "side-2",
      title: "Meta Ads ROAS Engineering: Creative Fatigue & Audience Stacking",
      slug: "meta-ads-roas-engineering",
      excerpt: "The exact creative testing framework our team uses to maintain 4.8x blended ROAS.",
      category: "PERFORMANCE ADS",
      categoryName: "PERFORMANCE ADS",
      readTime: "5 min read",
      authorName: "Media Buying Lead",
      publishedAt: "2026-08-18",
    },
    {
      id: "side-3",
      title: "CRM Automation & Sub-10-Second Lead Routing Architecture",
      slug: "crm-automation-lead-routing",
      excerpt: "Why cutting lead response times from 30 minutes to 10 seconds triples sales conversion.",
      category: "LEAD MACHINE",
      categoryName: "LEAD MACHINE",
      readTime: "3 min read",
      authorName: "Automation Lead",
      publishedAt: "2026-08-12",
    },
  ];

  const getPostCategory = (p: BlogPost | GrowthIntelligenceItem) => {
    return ("category" in p && p.category) || ("categoryName" in p && p.categoryName) || "TACTICAL PLAYBOOK";
  };

  const getPostReadTime = (p: BlogPost | GrowthIntelligenceItem) => {
    if ("readTime" in p && p.readTime) return p.readTime;
    if ("readingTimeMinutes" in p && p.readingTimeMinutes) return `${p.readingTimeMinutes} min read`;
    return "5 min read";
  };

  const getPostAuthorName = (p: BlogPost | GrowthIntelligenceItem) => {
    if ("authorName" in p && p.authorName) return p.authorName;
    if ("author" in p && p.author?.name) return p.author.name;
    return "DigiVigee Intelligence";
  };

  return (
    <div className="growth-intelligence-hub" style={{ width: "100%", maxWidth: "1280px", margin: "0 auto" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "1.5rem",
          alignItems: "stretch",
        }}
        className="hub-grid"
      >
        {/* ================================================================
            LEFT: FEATURED MASTER TEARDOWN HERO CARD (60% Width)
            ================================================================ */}
        <div
          className="featured-teardown-card"
          style={{
            backgroundColor: "#050B18",
            backgroundImage: `
              radial-gradient(ellipse 100% 60% at 50% -10%, rgba(0, 208, 83, 0.16), transparent 70%),
              radial-gradient(circle, rgba(0, 208, 83, 0.12) 1px, transparent 1px),
              radial-gradient(circle, rgba(56, 189, 248, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "100% 100%, 22px 22px, 22px 22px",
            backgroundPosition: "0 0, 0 0, 11px 11px",
            border: "1.5px solid rgba(0, 208, 83, 0.4)",
            borderRadius: "1.75rem",
            padding: "clamp(1.75rem, 3.5vw, 2.5rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 24px 60px -12px rgba(5, 11, 24, 0.5), 0 0 35px rgba(0, 208, 83, 0.2)",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div>
            {/* Top Meta Badges */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span
                  style={{
                    backgroundColor: "rgba(0, 208, 83, 0.15)",
                    border: "1px solid rgba(0, 208, 83, 0.4)",
                    color: "#00D053",
                    fontSize: "0.6875rem",
                    fontWeight: 900,
                    padding: "0.25rem 0.65rem",
                    borderRadius: "9999px",
                    letterSpacing: "0.06em",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  ⚡ FEATURED DEEP-DIVE
                </span>
                <span
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    padding: "0.25rem 0.6rem",
                    borderRadius: "9999px",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  ⏱️ {getPostReadTime(featured)}
                </span>
              </div>

              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "rgba(255, 255, 255, 0.4)", fontFamily: "var(--font-sans)" }}>
                RESEARCH LAB
              </span>
            </div>

            {/* Main Title */}
            <h3
              style={{
                fontSize: "clamp(1.4rem, 2.4vw, 1.85rem)",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                marginBottom: "0.85rem",
                fontFamily: "var(--font-sans)",
              }}
            >
              <Link href={`/blog/${featured.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                {featured.title}
              </Link>
            </h3>

            {/* Excerpt */}
            <p
              style={{
                fontSize: "0.9375rem",
                color: "rgba(255, 255, 255, 0.75)",
                lineHeight: 1.65,
                marginBottom: "1.5rem",
                fontFamily: "var(--font-sans)",
              }}
            >
              {featured.excerpt}
            </p>

            {/* Executive Highlights Box */}
            <div
              style={{
                backgroundColor: "rgba(0, 208, 83, 0.06)",
                border: "1px dashed rgba(0, 208, 83, 0.35)",
                borderRadius: "1rem",
                padding: "1rem 1.25rem",
                marginBottom: "1.5rem",
              }}
            >
              <div style={{ fontSize: "0.6875rem", fontWeight: 800, color: "#00D053", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.4rem" }}>
                Key Research Takeaways:
              </div>
              <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.8125rem", color: "rgba(255, 255, 255, 0.85)", lineHeight: 1.6, fontFamily: "var(--font-sans)" }}>
                <li>How to reduce Customer Acquisition Cost (CAC) by 42% via intent segmentation</li>
                <li>Dynamic Creative Optimization (DCO) frameworks for Meta Ads in 2026</li>
                <li>Full-funnel revenue attribution without relying on third-party cookies</li>
              </ul>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              paddingTop: "1.25rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "rgba(0, 208, 83, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>
                ✍️
              </div>
              <div>
                <div style={{ fontSize: "0.8125rem", fontWeight: 800, color: "#ffffff", fontFamily: "var(--font-sans)" }}>
                  {getPostAuthorName(featured)}
                </div>
                <div style={{ fontSize: "0.6875rem", color: "rgba(255, 255, 255, 0.5)", fontFamily: "var(--font-sans)" }}>
                  Senior Growth Architect
                </div>
              </div>
            </div>

            <Link
              href={`/blog/${featured.slug}`}
              style={{
                background: "linear-gradient(135deg, #00D053 0%, #059669 100%)",
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "0.8125rem",
                padding: "0.55rem 1.15rem",
                borderRadius: "0.75rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                boxShadow: "0 4px 14px rgba(0, 208, 83, 0.35)",
                fontFamily: "var(--font-sans)",
              }}
            >
              <span>Read Playbook</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* ================================================================
            RIGHT: 3 COMPACT TRENDING FRAMEWORKS (40% Width)
            ================================================================ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {sidePosts.map((post, idx) => (
            <div
              key={post.id || idx}
              className="side-framework-card"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(0, 208, 83, 0.22)",
                borderRadius: "1.25rem",
                padding: "1.25rem 1.5rem",
                boxShadow: "0 8px 24px -4px rgba(15, 23, 42, 0.05)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flex: 1,
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span
                    style={{
                      fontSize: "0.625rem",
                      fontWeight: 800,
                      color: "var(--brand-green-800)",
                      backgroundColor: "rgba(0, 208, 83, 0.08)",
                      border: "1px solid rgba(0, 208, 83, 0.2)",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "9999px",
                      letterSpacing: "0.04em",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {getPostCategory(post)}
                  </span>
                  <span style={{ fontSize: "0.6875rem", color: "var(--text-body)", fontFamily: "var(--font-sans)" }}>
                    ⏱️ {getPostReadTime(post)}
                  </span>
                </div>

                <h4
                  style={{
                    fontSize: "1.0625rem",
                    fontWeight: 800,
                    color: "var(--text-heading)",
                    letterSpacing: "-0.015em",
                    lineHeight: 1.3,
                    marginBottom: "0.4rem",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                    {post.title}
                  </Link>
                </h4>

                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--text-body)",
                    lineHeight: 1.5,
                    margin: 0,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {post.excerpt}
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.75rem", paddingTop: "0.6rem", borderTop: "1px solid rgba(0, 208, 83, 0.1)" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--brand-navy-600)", fontFamily: "var(--font-sans)" }}>
                  {getPostAuthorName(post)}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    color: "var(--brand-green-700)",
                    textDecoration: "none",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  View Framework →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .featured-teardown-card:hover {
          border-color: rgba(0, 208, 83, 0.7) !important;
          box-shadow: 0 30px 70px -12px rgba(5, 11, 24, 0.6), 0 0 45px rgba(0, 208, 83, 0.3) !important;
          transform: translateY(-3px);
        }
        .side-framework-card:hover {
          border-color: #00D053 !important;
          box-shadow: 0 16px 36px -8px rgba(0, 208, 83, 0.2) !important;
          transform: translateY(-3px);
        }
        @media (max-width: 960px) {
          .hub-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
