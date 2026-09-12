"use client";

import React, { useState } from "react";
import { FAQItem } from "@/types";
import { FAQS_DATA } from "@/data/faqs";

export interface FAQSectionProps {
  faqs?: FAQItem[];
  badgeText?: string;
  title?: string;
  subtitle?: string;
  background?: "white" | "subtle" | "transparent" | string;
  columns?: number;
  className?: string;
}

const CATEGORIES = ["ALL QUESTIONS", "ROI & ATTRIBUTION", "TIMELINES & ONBOARDING", "RETAINERS & BUDGET"];

export function FAQSection({
  faqs = FAQS_DATA,
  badgeText = "ENTERPRISE FAQ & OBJECTION CLEARANCE",
  title = "Clear Answers. Zero Guesswork.",
  subtitle = "Everything you need to know about our growth sprint models, ROI attribution, onboarding timelines, and campaign governance.",
  background = "transparent",
  columns = 1,
  className = "",
}: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || "faq-1");
  const [selectedCategory, setSelectedCategory] = useState("ALL QUESTIONS");

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = selectedCategory === "ALL QUESTIONS"
    ? faqs
    : faqs.filter((f) => f.category?.toUpperCase() === selectedCategory || true);

  const getBgColor = () => {
    if (background === "white") return "var(--bg-white, #FFFFFF)";
    if (background === "subtle") return "var(--bg-subtle, #F8FAF9)";
    return background;
  };

  return (
    <section
      className={`enterprise-faq-section ${className}`}
      style={{
        paddingTop: "clamp(3.5rem, 5vw, 5rem)",
        paddingBottom: "clamp(3.5rem, 5vw, 5rem)",
        backgroundColor: getBgColor(),
        position: "relative",
      }}
    >
      <div style={{ maxWidth: columns === 2 ? "1200px" : "1000px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto var(--space-8) auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.75rem",
              fontWeight: 800,
              color: "var(--brand-green-800)",
              backgroundColor: "rgba(0, 208, 83, 0.08)",
              border: "1px solid rgba(0, 208, 83, 0.25)",
              padding: "0.3rem 0.85rem",
              borderRadius: "9999px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "var(--space-3)",
              fontFamily: "var(--font-sans)",
            }}
          >
            <span>❓</span>
            <span>{badgeText}</span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
              fontWeight: 900,
              color: "var(--text-heading)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: "var(--space-3)",
              fontFamily: "var(--font-sans)",
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p style={{ fontSize: "var(--text-body-lg)", color: "var(--text-body)", lineHeight: 1.65, fontFamily: "var(--font-sans)" }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            marginBottom: "2.5rem",
          }}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  fontFamily: "var(--font-sans)",
                  padding: "0.45rem 1rem",
                  borderRadius: "9999px",
                  border: isSelected ? "1.5px solid #00D053" : "1px solid rgba(0, 0, 0, 0.08)",
                  backgroundColor: isSelected ? "rgba(0, 208, 83, 0.12)" : "#FFFFFF",
                  color: isSelected ? "var(--brand-green-800)" : "var(--text-body)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: isSelected ? "0 0 12px rgba(0, 208, 83, 0.2)" : "0 2px 6px rgba(0, 0, 0, 0.02)",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: columns === 2 ? "repeat(auto-fit, minmax(360px, 1fr))" : "1fr",
            gap: "0.85rem",
            alignItems: "start",
          }}
        >
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "1.25rem",
                  border: isOpen ? "1.5px solid #00D053" : "1px solid rgba(0, 208, 83, 0.2)",
                  boxShadow: isOpen ? "0 12px 30px -4px rgba(0, 208, 83, 0.15)" : "0 4px 14px rgba(15, 23, 42, 0.04)",
                  overflow: "hidden",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1.25rem 1.5rem",
                    textAlign: "left",
                    fontWeight: 800,
                    fontSize: "1.0625rem",
                    color: isOpen ? "var(--brand-navy-900)" : "var(--text-heading)",
                    cursor: "pointer",
                    gap: "1rem",
                    fontFamily: "var(--font-sans)",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                >
                  <span>{faq.question}</span>
                  <span
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: isOpen ? "#00D053" : "rgba(0, 208, 83, 0.1)",
                      color: isOpen ? "#ffffff" : "#00D053",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontWeight: 900,
                      fontSize: "1.1rem",
                      transition: "transform 0.3s ease, background-color 0.3s ease",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: "0 1.5rem 1.5rem 1.5rem",
                      fontSize: "0.9375rem",
                      color: "var(--text-body)",
                      lineHeight: 1.65,
                      fontFamily: "var(--font-sans)",
                      borderTop: "1px solid rgba(0, 208, 83, 0.1)",
                      paddingTop: "1rem",
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
