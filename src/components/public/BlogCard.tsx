import React from "react";
import Link from "next/link";
import { BlogPost } from "@/types";
import { formatDate } from "@/utils/formatters";

export interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  index?: number;
  className?: string;
}

export function BlogCard({ post, className = "" }: BlogCardProps) {
  const getCategoryTheme = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "social-media":
      case "social media":
        return {
          bg: "linear-gradient(135deg, #070F26 0%, #1E3A8A 100%)",
          color: "var(--brand-blue-600)",
          accent: "#38BDF8",
          icon: "📱",
          tag: "Social Media",
        };
      case "seo":
      case "local seo":
        return {
          bg: "linear-gradient(135deg, #050b18 0%, #064E3B 100%)",
          color: "var(--brand-green-600)",
          accent: "#00D053",
          icon: "🔍",
          tag: "SEO Strategy",
        };
      case "performance-marketing":
      case "marketing":
        return {
          bg: "linear-gradient(135deg, #030712 0%, #172554 100%)",
          color: "var(--brand-blue-600)",
          accent: "#60A5FA",
          icon: "📈",
          tag: "Performance",
        };
      case "content":
      case "content-creation":
        return {
          bg: "linear-gradient(135deg, #0f172a 0%, #4c0519 100%)",
          color: "#be185d",
          accent: "#F43F5E",
          icon: "✍️",
          tag: "Content",
        };
      default:
        return {
          bg: "linear-gradient(135deg, #050b18 0%, #064E3B 100%)",
          color: "var(--brand-green-600)",
          accent: "#00D053",
          icon: "⚡",
          tag: "Growth Insight",
        };
    }
  };

  const theme = getCategoryTheme(post.categoryName || post.categoryId || "");

  return (
    <div
      className={`blog-card ${className}`}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "var(--surface-white)",
        borderRadius: "1.25rem",
        border: "1px solid var(--surface-border)",
        boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.04)",
        position: "relative",
      }}
    >
      <Link
        href={`/blog/${post.slug}`}
        style={{
          textDecoration: "none",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <div>
          {/* Top Graphic Thumbnail Canvas */}
          <div
            className="blog-card-canvas"
            style={{
              width: "100%",
              height: "155px",
              background: theme.bg,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              overflow: "hidden",
              transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {/* Tech Dots */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "radial-gradient(circle, rgba(255, 255, 255, 0.12) 1.5px, transparent 1.5px)",
                backgroundSize: "16px 16px",
                opacity: 0.6,
              }}
            />

            {/* Glowing Center Ambient */}
            <div
              style={{
                position: "absolute",
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                backgroundColor: theme.accent,
                filter: "blur(30px)",
                opacity: 0.35,
              }}
            />

            {/* Category Icon Badge */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                width: "48px",
                height: "48px",
                borderRadius: "0.875rem",
                backgroundColor: "rgba(3, 7, 18, 0.7)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.35rem",
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.3)",
              }}
            >
              {theme.icon}
            </div>

            {/* Top-Right Read Time Pill */}
            <div
              style={{
                position: "absolute",
                top: "0.75rem",
                right: "0.75rem",
                zIndex: 3,
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#ffffff",
                padding: "0.2rem 0.55rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                fontFamily: "var(--font-sans)",
              }}
            >
              ⏱️ 5 min
            </div>
          </div>

          {/* Card Body */}
          <div style={{ padding: "1.25rem 1.25rem 0.5rem 1.25rem" }}>
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 800,
                color: "var(--brand-green-700)",
                backgroundColor: "rgba(0, 208, 83, 0.08)",
                border: "1px solid rgba(0, 208, 83, 0.25)",
                padding: "0.2rem 0.55rem",
                borderRadius: "var(--radius-full)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                display: "inline-block",
                marginBottom: "0.5rem",
                fontFamily: "var(--font-sans)",
              }}
            >
              {post.categoryName || theme.tag}
            </span>

            <h3
              style={{
                fontSize: "0.9375rem",
                fontWeight: 800,
                color: "var(--brand-navy-900)",
                lineHeight: 1.35,
                marginBottom: "0.4rem",
                fontFamily: "var(--font-sans)",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                minHeight: "2.55rem",
              }}
            >
              {post.title}
            </h3>

            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                margin: 0,
                fontFamily: "var(--font-sans)",
              }}
            >
              {formatDate(post.publishedAt)}
            </p>
          </div>
        </div>

        {/* Bottom Link Footer */}
        <div
          style={{
            padding: "0.875rem 1.25rem 1.15rem 1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.8125rem",
            fontWeight: 800,
            color: "var(--brand-green-600)",
            fontFamily: "var(--font-sans)",
            borderTop: "1px solid var(--surface-border)",
            marginTop: "0.75rem",
          }}
        >
          <span>Read Article</span>
          <span className="blog-card-arrow" style={{ transition: "transform 0.25s ease", display: "inline-block" }}>→</span>
        </div>
      </Link>

      <style>{`
        .blog-card {
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;
          cursor: pointer;
        }
        .blog-card:hover {
          transform: translateY(-8px) !important;
          border-color: rgba(0, 208, 83, 0.4) !important;
          box-shadow: 0 20px 40px -8px rgba(0, 0, 0, 0.08), 0 0 20px -4px rgba(0, 208, 83, 0.2) !important;
        }
        .blog-card:hover .blog-card-canvas {
          transform: scale(1.03);
        }
        .blog-card:hover .blog-card-arrow {
          transform: translateX(4px) !important;
        }
      `}</style>
    </div>
  );
}
