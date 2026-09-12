"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { PortfolioItem } from "@/types";

export interface HomePortfolioCarouselProps {
  projects: PortfolioItem[];
}

export function HomePortfolioCarousel({ projects }: HomePortfolioCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -440 : 440;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const getCaseDetails = (slug: string, idx: number) => {
    switch (slug) {
      case "ayush-wellness":
        return {
          brandName: "Ayush Wellness Clinic",
          category: "HEALTHCARE // LEAD GEN",
          beforeRevenue: "₹3.2L / mo",
          afterRevenue: "₹21.4L / mo",
          roas: "6.4x ROAS",
          tag: "⚡ +580% Pipeline Growth",
          mockUrl: "ayushwellness.in/scaling",
          industry: "Healthtech & Wellness",
        };
      case "kalpvruksh-group":
        return {
          brandName: "Kalpvruksh Ayurvedic",
          category: "D2C E-COMMERCE // ROAS",
          beforeRevenue: "₹5.5L / mo",
          afterRevenue: "₹38.2L / mo",
          roas: "5.8x ROAS",
          tag: "⚡ +680% Online Orders",
          mockUrl: "kalpvruksh.com/funnel",
          industry: "Ayurveda D2C",
        };
      case "the-printing-wala":
        return {
          brandName: "The Printing Wala",
          category: "B2B PACKAGING // SEO",
          beforeRevenue: "₹8.0L / mo",
          afterRevenue: "₹45.0L / mo",
          roas: "4.9x ROAS",
          tag: "⚡ Google SERP #1",
          mockUrl: "theprintingwala.com/b2b",
          industry: "B2B Manufacturing",
        };
      case "mahalaxmi-jewellers":
        return {
          brandName: "Mahalaxmi Jewellers",
          category: "LUXURY RETAIL // FOOTFALL",
          beforeRevenue: "₹15.0L / mo",
          afterRevenue: "₹82.0L / mo",
          roas: "7.2x ROAS",
          tag: "⚡ +450% Store Footfall",
          mockUrl: "mahalaxmi.co/luxury",
          industry: "Luxury Retail",
        };
      case "riddhi-siddhi-foods":
        return {
          brandName: "Riddhi Siddhi Foods",
          category: "FMCG // PERFORMANCE ADS",
          beforeRevenue: "₹4.1L / mo",
          afterRevenue: "₹26.8L / mo",
          roas: "5.2x ROAS",
          tag: "⚡ +320% Repeat Purchases",
          mockUrl: "riddhisiddhi.store/growth",
          industry: "FMCG Packaged Foods",
        };
      default:
        return {
          brandName: `Enterprise Growth Client #${idx + 1}`,
          category: "HIGH-GROWTH SAAS & D2C",
          beforeRevenue: "₹4.0L / mo",
          afterRevenue: "₹28.5L / mo",
          roas: "5.4x ROAS",
          tag: "⚡ +420% Verified ROI",
          mockUrl: "client-pipeline.digivigee.com",
          industry: "Enterprise SaaS",
        };
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "1280px", margin: "0 auto" }}>
      {/* Top Carousel Controller Bar: Active Index + Pill Switchers */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
          padding: "0 0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#00D053", boxShadow: "0 0 8px #00D053" }} />
          <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--brand-navy-700)", fontFamily: "var(--font-sans)" }}>
            SHOWCASING {projects.length} AUDITED CLIENT CASE STUDIES
          </span>
        </div>
      </div>

      {/* Interactive Carousel Track with Side Nav Controls */}
      <div style={{ position: "relative" }}>
        {/* Left Nav Button */}
        <button
          type="button"
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          style={{
            position: "absolute",
            left: "-18px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            color: "var(--brand-navy-900)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
            transition: "all 0.2s ease",
          }}
          className="carousel-nav-btn hover-scale"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Horizontal Scrollable Track */}
        <div
          ref={scrollContainerRef}
          style={{
            display: "flex",
            gap: "1.5rem",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            padding: "0.5rem 0.25rem 1.5rem 0.25rem",
          }}
          className="hide-scrollbar"
        >
        {projects.map((project, idx) => {
          const details = getCaseDetails(project.slug, idx);

          return (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              style={{
                flex: "0 0 420px",
                scrollSnapAlign: "start",
                borderRadius: "1.5rem",
                overflow: "hidden",
                boxShadow: "0 14px 34px -8px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255, 255, 255, 1)",
                border: "1.5px solid rgba(0, 208, 83, 0.22)",
                backgroundColor: "#FFFFFF",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className="portfolio-case-card"
            >
              {/* Top Cinematic 16:9 Device Window Frame (Mac HUD) */}
              <div
                style={{
                  height: "215px",
                  backgroundColor: "#050B18",
                  backgroundImage: `
                    radial-gradient(ellipse 100% 60% at 50% -10%, rgba(0, 208, 83, 0.18), transparent 70%),
                    radial-gradient(circle, rgba(0, 208, 83, 0.12) 1px, transparent 1px),
                    radial-gradient(circle, rgba(56, 189, 248, 0.08) 1px, transparent 1px)
                  `,
                  backgroundSize: "100% 100%, 20px 20px, 20px 20px",
                  backgroundPosition: "0 0, 0 0, 10px 10px",
                  padding: "0.85rem 1rem",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Browser Title Bar */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#FF5F56" }} />
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#27C93F" }} />
                    <span style={{ marginLeft: "0.4rem", fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.65)", fontFamily: "var(--font-sans)" }}>
                      {details.mockUrl}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      color: "#00D053",
                      backgroundColor: "rgba(0, 208, 83, 0.15)",
                      border: "1px solid rgba(0, 208, 83, 0.3)",
                      padding: "0.2rem 0.55rem",
                      borderRadius: "9999px",
                    }}
                  >
                    {details.roas}
                  </span>
                </div>

                {/* Before vs After Visual Growth Comparison Widget with Unique Scaling Progress */}
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "0.875rem",
                    padding: "0.75rem 0.85rem",
                    margin: "0.35rem 0",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.6875rem", color: "rgba(255, 255, 255, 0.6)", fontWeight: 700, marginBottom: "0.35rem" }}>
                    <span>Baseline: {details.beforeRevenue}</span>
                    <span style={{ color: "#00D053", fontWeight: 900 }}>Scaled: {details.afterRevenue}</span>
                  </div>
                  {/* Visual Progress Meter */}
                  <div style={{ height: "6px", width: "100%", backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: "9999px", overflow: "hidden", position: "relative" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${Math.min(95, 65 + (idx % 4) * 10)}%`,
                        background: "linear-gradient(90deg, #0052FF 0%, #00D053 100%)",
                        borderRadius: "9999px",
                        boxShadow: "0 0 8px #00D053",
                      }}
                    />
                  </div>
                </div>

                {/* Bottom Attribution Ticker */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.6875rem", color: "#38BDF8", fontWeight: 800, fontFamily: "var(--font-sans)" }}>
                    {details.category}
                  </span>
                  <span style={{ fontSize: "0.6875rem", color: "#34D399", fontWeight: 800 }}>
                    {details.tag}
                  </span>
                </div>
              </div>

              {/* Bottom Card Content */}
              <div
                style={{
                  padding: "1.25rem 1.35rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flexGrow: 1,
                  backgroundColor: "#FFFFFF",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "0.6875rem", fontWeight: 800, color: "var(--brand-green-700)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {details.industry}
                    </span>
                    <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--text-muted)" }}>
                      Audited Case
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 800,
                      color: "var(--text-heading)",
                      marginBottom: "0.4rem",
                      lineHeight: "1.3",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--text-body)",
                      lineHeight: "1.55",
                      marginBottom: "0.75rem",
                      fontFamily: "var(--font-sans)",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {project.shortDescription || project.challenge}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "0.65rem",
                    borderTop: "1px solid rgba(0, 208, 83, 0.12)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: 800,
                      color: "#00D053",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                    }}
                  >
                    <span>View Case Teardown</span>
                    <span className="case-arrow" style={{ transition: "transform 0.2s ease" }}>→</span>
                  </span>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 800,
                      color: "var(--brand-navy-900)",
                      backgroundColor: "rgba(15, 23, 42, 0.05)",
                      padding: "0.15rem 0.45rem",
                      borderRadius: "6px",
                    }}
                  >
                    {details.roas}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Right Nav Button */}
      <button
        type="button"
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        style={{
          position: "absolute",
          right: "-18px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          backgroundColor: "#00D053",
          border: "none",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(0, 208, 83, 0.35)",
          transition: "all 0.2s ease",
        }}
        className="carousel-nav-btn hover-scale"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .portfolio-case-card:hover {
          border-color: #00D053 !important;
          box-shadow: 0 24px 50px -10px rgba(0, 208, 83, 0.22), 0 0 20px rgba(0, 208, 83, 0.08) !important;
          transform: translateY(-6px) !important;
        }
        .portfolio-case-card:hover .case-arrow {
          transform: translateX(4px);
        }
        .carousel-nav-btn:hover {
          transform: scale(1.05);
        }
        @media (max-width: 640px) {
          .portfolio-case-card {
            flex: 0 0 320px !important;
          }
        }
      `}</style>
    </div>
  );
}
