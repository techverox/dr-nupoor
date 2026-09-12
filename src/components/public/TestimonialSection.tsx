import React from "react";
import { TESTIMONIALS_DATA } from "@/data/testimonials";
import { TestimonialItem } from "@/types";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Badge } from "@/components/ui/Badge";

export interface TestimonialSectionProps {
  testimonials?: TestimonialItem[];
  badgeText?: string;
  title?: string;
  subtitle?: string;
  background?: "white" | "subtle";
  className?: string;
}

export function TestimonialSection({
  testimonials = TESTIMONIALS_DATA,
  badgeText = "WHAT OUR CLIENTS SAY",
  title = "Real Partnerships. Measurable Results.",
  subtitle = "Discover how our strategic digital growth frameworks empower businesses to generate predictable revenue and scale sustainably.",
  background = "white",
  className = "",
}: TestimonialSectionProps) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <Section background={background} padding="fluid" className={className}>
      <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto var(--space-12) auto" }}>
        <Badge variant="primary-subtle" size="sm" style={{ marginBottom: "var(--space-3)" }}>
          {badgeText}
        </Badge>
        <Heading level="h2" color="navy" style={{ marginBottom: "var(--space-3)" }}>
          {title}
        </Heading>
        {subtitle && (
          <Text variant="body" color="secondary">
            {subtitle}
          </Text>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "var(--space-6)",
        }}
      >
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="t-card"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              backgroundColor: "var(--surface-card)",
              border: "1px solid var(--surface-border)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-card)",
              padding: "var(--space-6)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div>
              {/* Star Rating & Verified Pill */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "var(--space-4)",
                }}
              >
                {/* 5-Star Rating */}
                <div style={{ display: "flex", gap: "0.2rem", color: "#F59E0B" }} aria-label={`${item.rating} out of 5 stars`}>
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <svg key={i} width="17" height="17" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <Badge variant="verified" size="sm" icon={<span style={{ marginRight: "0.2rem" }}>✓</span>}>
                  Verified Client
                </Badge>
              </div>

              {/* Testimonial Quote */}
              <p
                className="t-quote"
                style={{
                  lineHeight: 1.65,
                  marginBottom: "var(--space-6)",
                  fontStyle: "italic",
                  fontSize: "0.9375rem",
                  color: "var(--text-heading)",
                  margin: 0,
                  paddingBottom: "var(--space-6)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                &ldquo;{item.testimonial}&rdquo;
              </p>
            </div>

            {/* Client Identity Footer */}
            <div
              className="t-divider"
              style={{
                borderTop: "1px solid var(--surface-border)",
                paddingTop: "var(--space-4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div className="t-client-name" style={{ fontWeight: 700, color: "var(--brand-navy-900)", fontSize: "0.9375rem", fontFamily: "var(--font-sans)" }}>
                  {item.clientName}
                </div>
                <div className="t-client-company" style={{ fontSize: "0.8125rem", color: "var(--text-body)", fontWeight: 500, fontFamily: "var(--font-sans)" }}>
                  {item.clientRole ? `${item.clientRole}, ` : ""}
                  <span style={{ fontWeight: 600, color: "var(--brand-green-600)" }}>{item.companyName}</span>
                </div>
              </div>

              {item.serviceReceived && (
                <span
                  className="t-service-pill"
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "var(--brand-green-50)",
                    color: "var(--brand-green-700)",
                    border: "1px solid var(--brand-green-200)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {item.serviceReceived}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .t-card {
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;
          cursor: pointer;
        }
        .t-card .t-quote,
        .t-card .t-divider,
        .t-card .t-client-name,
        .t-card .t-client-company,
        .t-card .t-service-pill {
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .t-card:hover {
          background: linear-gradient(135deg, #00D053 0%, #059669 100%) !important;
          border-color: #00D053 !important;
          box-shadow: 0 18px 36px -6px rgba(0, 208, 83, 0.42), 0 8px 16px -4px rgba(0, 208, 83, 0.22) !important;
          transform: translateY(-6px) !important;
        }
        .t-card:hover .t-quote {
          color: #ffffff !important;
        }
        .t-card:hover .t-divider {
          border-top-color: rgba(255, 255, 255, 0.25) !important;
        }
        .t-card:hover .t-client-name {
          color: #ffffff !important;
        }
        .t-card:hover .t-client-company {
          color: rgba(255, 255, 255, 0.95) !important;
        }
        .t-card:hover .t-client-company span {
          color: #ffffff !important;
        }
        .t-card:hover .t-service-pill {
          background-color: rgba(255, 255, 255, 0.2) !important;
          color: #ffffff !important;
          border-color: rgba(255, 255, 255, 0.35) !important;
        }
      `}</style>
    </Section>
  );
}
