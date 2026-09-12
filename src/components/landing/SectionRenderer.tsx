"use client";

import React from "react";
import Link from "next/link";
import { LandingPageSection } from "@/types/landingPage";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/forms/ContactForm";
import { FormRenderer } from "@/components/forms/FormRenderer";
import { sanitizeCustomHtml } from "@/lib/utils/sanitizeHtml";

export interface SectionRendererProps {
  section: LandingPageSection;
  isBuilder?: boolean;
  isSelected?: boolean;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  isDragOver?: boolean;
  onSelect?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onDuplicate?: () => void;
  onSaveAsReusable?: () => void;
  onToggleVisibility?: () => void;
  onDelete?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
}

export function SectionRenderer({
  section,
  isBuilder = false,
  isSelected = false,
  canMoveUp = false,
  canMoveDown = false,
  isDragOver = false,
  onSelect,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onSaveAsReusable,
  onToggleVisibility,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
}: SectionRendererProps) {
  // Public/Preview Mode: Skip hidden sections completely
  if (!section.isVisible && !isBuilder) {
    return null;
  }

  const { content, styling } = section;
  const paddingMap: Record<string, string> = {
    sm: "2rem 0",
    md: "3.5rem 0",
    lg: "5rem 0",
    xl: "6.5rem 0",
  };
  const paddingStyle = paddingMap[styling?.paddingY || "md"] || "3.5rem 0";

  // Section Outer Wrapper Styles
  const isGradient = styling?.backgroundColor?.includes("gradient");
  const wrapperStyle: React.CSSProperties = {
    backgroundColor: isGradient ? undefined : (styling?.backgroundColor || "transparent"),
    background: isGradient ? styling?.backgroundColor : undefined,
    color: styling?.textColor || "inherit",
    padding: paddingStyle,
    position: "relative",
    opacity: !section.isVisible && isBuilder ? 0.6 : 1,
    transition: "all var(--transition-fast)",
  };

  // Builder Container Wrapper Styles
  const builderContainerStyle: React.CSSProperties = {
    position: "relative",
    outline: isSelected ? "2px solid var(--brand-primary)" : "1px dashed rgba(15, 23, 42, 0.15)",
    boxShadow: isSelected ? "0 0 0 4px rgba(22, 163, 74, 0.15)" : "none",
    borderRadius: "var(--radius-sm)",
    transition: "outline var(--transition-fast)",
    cursor: isBuilder ? "pointer" : "default",
  };

  // Render Inner Content by section.type
  const renderContent = () => {
    switch (section.type) {
      case "hero":
        return (
          <Container>
            <div style={{ maxWidth: "840px", margin: "0 auto", textAlign: "center" }}>
              {typeof content.eyebrow === "string" && content.eyebrow && (
                <div
                  style={{
                    display: "inline-block",
                    padding: "0.25rem 0.85rem",
                    borderRadius: "var(--radius-full)",
                    backgroundColor: "rgba(22, 163, 74, 0.15)",
                    color: "var(--brand-primary)",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "1rem",
                  }}
                >
                  {content.eyebrow}
                </div>
              )}

              <h1
                style={{
                  fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  marginBottom: "1.25rem",
                }}
              >
                {typeof content.headline === "string" ? content.headline : "Accelerate Your Business Growth"}
              </h1>

              {typeof content.description === "string" && (
                <p
                  style={{
                    fontSize: "1.125rem",
                    opacity: 0.9,
                    lineHeight: 1.65,
                    marginBottom: "2rem",
                    maxWidth: "700px",
                    margin: "0 auto 2rem auto",
                  }}
                >
                  {content.description}
                </p>
              )}

              <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                {typeof content.primaryCtaLabel === "string" && (
                  <a
                    href={typeof content.primaryCtaTarget === "string" ? content.primaryCtaTarget : "#lead-form"}
                    style={{
                      padding: "0.85rem 1.75rem",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: "var(--brand-primary)",
                      color: "#ffffff",
                      fontWeight: 700,
                      fontSize: "1rem",
                      textDecoration: "none",
                      boxShadow: "0 4px 14px rgba(22, 163, 74, 0.4)",
                    }}
                  >
                    {content.primaryCtaLabel}
                  </a>
                )}

                {typeof content.secondaryCtaLabel === "string" && content.secondaryCtaLabel && (
                  <a
                    href={typeof content.secondaryCtaTarget === "string" ? content.secondaryCtaTarget : "#"}
                    style={{
                      padding: "0.85rem 1.75rem",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: "rgba(255, 255, 255, 0.12)",
                      color: "inherit",
                      fontWeight: 700,
                      fontSize: "1rem",
                      textDecoration: "none",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    {content.secondaryCtaLabel}
                  </a>
                )}
              </div>

              {/* Homepage-Grade Minimalist Logos Ribbon */}
              <div
                style={{
                  marginTop: "3.5rem",
                  paddingTop: "2rem",
                  borderTop:
                    styling?.textColor === "#ffffff" ||
                    (styling?.backgroundColor &&
                      styling.backgroundColor !== "#ffffff" &&
                      styling.backgroundColor !== "#f8fafc")
                      ? "1px solid rgba(255, 255, 255, 0.12)"
                      : "1px solid rgba(15, 23, 42, 0.08)",
                }}
              >
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    opacity: 0.75,
                    marginBottom: "1rem",
                  }}
                >
                  {typeof content.logosHeading === "string"
                    ? content.logosHeading
                    : "Trusted by 2,350+ Scaling Agencies & Enterprises"}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "2.5rem",
                    flexWrap: "wrap",
                    opacity: 0.8,
                    fontSize: "0.9375rem",
                    fontWeight: 800,
                    letterSpacing: "0.05em",
                  }}
                >
                  <span>FORBES</span>
                  <span>TECHCRUNCH</span>
                  <span>AGENCYSCALE</span>
                  <span>KALPVRUKSH</span>
                  <span>APEX RETAIL</span>
                  <span>GOOGLE PREMIER</span>
                </div>
              </div>
            </div>
          </Container>
        );

      case "text":
        return (
          <Container>
            <div style={{ maxWidth: "760px", margin: "0 auto" }}>
              {typeof content.heading === "string" && content.heading && (
                <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
                  {content.heading}
                </h2>
              )}
              {typeof content.body === "string" && (
                <div style={{ fontSize: "1.0625rem", lineHeight: 1.75, opacity: 0.9, whiteSpace: "pre-line" }}>
                  {content.body}
                </div>
              )}
            </div>
          </Container>
        );

      case "image":
        return (
          <Container>
            <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
              {typeof content.imageUrl === "string" && content.imageUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={content.imageUrl}
                  alt={typeof content.altText === "string" ? content.altText : "Campaign Visual"}
                  style={{ width: "100%", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-md)" }}
                />
              ) : (
                <div
                  style={{
                    padding: "4rem 2rem",
                    backgroundColor: "rgba(0,0,0,0.04)",
                    border: "2px dashed var(--border-subtle)",
                    borderRadius: "var(--radius-lg)",
                    color: "var(--text-muted)",
                  }}
                >
                  <div style={{ fontSize: "2rem" }}>🖼️</div>
                  <div style={{ fontWeight: 600, marginTop: "0.5rem" }}>Image Placeholder</div>
                  <div style={{ fontSize: "0.8125rem" }}>Select this section to configure an image URL.</div>
                </div>
              )}
              {typeof content.caption === "string" && content.caption && (
                <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "0.75rem" }}>
                  {content.caption}
                </div>
              )}
            </div>
          </Container>
        );

      case "video":
        return (
          <Container>
            <div style={{ maxWidth: "840px", margin: "0 auto", textAlign: "center" }}>
              {typeof content.heading === "string" && (
                <h2 style={{ fontSize: "1.875rem", fontWeight: 800, marginBottom: "1.25rem" }}>
                  {content.heading}
                </h2>
              )}
              <div
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                  overflow: "hidden",
                  borderRadius: "var(--radius-lg)",
                  backgroundColor: "#000000",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <div style={{ fontSize: "3rem" }}>▶️</div>
                  <div style={{ fontSize: "0.875rem", opacity: 0.8 }}>Video Player Embed: {String(content.videoUrl || "")}</div>
                </div>
              </div>
            </div>
          </Container>
        );

      case "cta":
        return (
          <Container>
            <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
              <h2 style={{ fontSize: "2.25rem", fontWeight: 800, marginBottom: "0.75rem" }}>
                {String(content.headline || "Ready to Grow?")}
              </h2>
              {typeof content.subheadline === "string" && (
                <p style={{ fontSize: "1.125rem", opacity: 0.9, marginBottom: "1.75rem" }}>
                  {content.subheadline}
                </p>
              )}
              <a
                href={String(content.buttonTarget || "#lead-form")}
                style={{
                  display: "inline-block",
                  padding: "0.85rem 2rem",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "#ffffff",
                  color: "#0f172a",
                  fontWeight: 800,
                  fontSize: "1rem",
                  textDecoration: "none",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                {String(content.buttonLabel || "Get Started")} →
              </a>
            </div>
          </Container>
        );

      case "spacer":
        return (
          <Container>
            {content.showDivider ? (
              <hr style={{ border: "none", borderTop: "1px solid var(--border-subtle)", margin: "1rem 0" }} />
            ) : (
              <div style={{ height: "2rem" }} />
            )}
          </Container>
        );

      case "services":
        return (
          <Container>
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3rem auto" }}>
              <h2 style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--brand-navy)", marginBottom: "0.5rem" }}>
                {String(content.sectionTitle || "Our Services")}
              </h2>
              {typeof content.sectionSubtitle === "string" && (
                <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem" }}>{content.sectionSubtitle}</p>
              )}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {(Array.isArray(content.services) ? content.services : []).map((s: Record<string, unknown>, idx: number) => (
                <Card key={idx} padding="lg">
                  <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{String(s.icon || "💼")}</div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--brand-navy)", marginBottom: "0.5rem" }}>
                    {String(s.title || "")}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{String(s.desc || "")}</p>
                </Card>
              ))}
            </div>
          </Container>
        );

      case "features":
        return (
          <Container>
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3rem auto" }}>
              <h2 style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--brand-navy)", marginBottom: "0.5rem" }}>
                {String(content.sectionTitle || "Key Advantages")}
              </h2>
              {typeof content.sectionSubtitle === "string" && (
                <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem" }}>{content.sectionSubtitle}</p>
              )}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {(Array.isArray(content.features) ? content.features : []).map((f: Record<string, unknown>, idx: number) => (
                <Card key={idx} padding="lg" style={{ backgroundColor: "#ffffff", border: "1px solid var(--border-subtle)" }}>
                  <div style={{ width: "36px", height: "3px", backgroundColor: "var(--brand-primary)", marginBottom: "1rem" }} />
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--brand-navy)", marginBottom: "0.5rem" }}>
                    {String(f.title || "")}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{String(f.desc || "")}</p>
                </Card>
              ))}
            </div>
          </Container>
        );

      case "pricing":
        return (
          <Container>
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3rem auto" }}>
              <h2 style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--brand-navy)", marginBottom: "0.5rem" }}>
                {String(content.sectionTitle || "Flexible Packages")}
              </h2>
              {typeof content.sectionSubtitle === "string" && (
                <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem" }}>{content.sectionSubtitle}</p>
              )}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
                alignItems: "stretch",
              }}
            >
              {(Array.isArray(content.tiers) ? content.tiers : []).map((tier: Record<string, unknown>, idx: number) => (
                <Card
                  key={idx}
                  padding="lg"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                    border: tier.highlighted ? "2px solid var(--brand-primary)" : "1px solid var(--border-subtle)",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <div>
                    {tier.badge ? (
                      <span
                        style={{
                          position: "absolute",
                          top: "-12px",
                          right: "20px",
                          backgroundColor: "var(--brand-primary)",
                          color: "#ffffff",
                          fontSize: "0.75rem",
                          fontWeight: 800,
                          padding: "0.2rem 0.6rem",
                          borderRadius: "var(--radius-full)",
                        }}
                      >
                        {String(tier.badge)}
                      </span>
                    ) : null}
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--brand-navy)", marginBottom: "0.5rem" }}>
                      {String(tier.name || "")}
                    </h3>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "1.25rem" }}>
                      <span style={{ fontSize: "2rem", fontWeight: 800, color: "var(--brand-navy)" }}>{String(tier.price || "")}</span>
                      <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{String(tier.period || "")}</span>
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {(Array.isArray(tier.features) ? tier.features : []).map((feat: unknown, fIdx: number) => (
                        <li key={fIdx} style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", display: "flex", gap: "0.5rem" }}>
                          <span style={{ color: "var(--brand-primary)", fontWeight: 700 }}>✓</span> {String(feat || "")}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href={String(tier.ctaTarget || "#lead-form")}
                    style={{
                      display: "block",
                      textAlign: "center",
                      padding: "0.65rem 1rem",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: tier.highlighted ? "var(--brand-primary)" : "var(--bg-secondary)",
                      color: tier.highlighted ? "#ffffff" : "var(--brand-navy)",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      textDecoration: "none",
                    }}
                  >
                    {String(tier.ctaLabel || "Choose Package")}
                  </a>
                </Card>
              ))}
            </div>
          </Container>
        );

      case "portfolio":
        return (
          <Container>
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3rem auto" }}>
              <h2 style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--brand-navy)", marginBottom: "0.5rem" }}>
                {String(content.sectionTitle || "Featured Case Studies")}
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {(Array.isArray(content.projects) ? content.projects : []).map((p: Record<string, unknown>, idx: number) => (
                <Card key={idx} padding="lg" style={{ backgroundColor: "#ffffff" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--brand-primary)", textTransform: "uppercase" }}>
                    {String(p.category || "")}
                  </div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--brand-navy)", margin: "0.35rem 0" }}>
                    {String(p.title || "")}
                  </h3>
                  {p.metric ? (
                    <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#059669", margin: "0.5rem 0" }}>
                      {String(p.metric)}
                    </div>
                  ) : null}
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{String(p.summary || "")}</p>
                </Card>
              ))}
            </div>
          </Container>
        );

      case "testimonials":
        return (
          <Container>
            <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", color: "var(--brand-primary)", lineHeight: 1 }}>“</div>
              <blockquote style={{ fontSize: "1.25rem", fontStyle: "italic", lineHeight: 1.65, margin: "1rem 0" }}>
                {String(content.quote || "")}
              </blockquote>
              {typeof content.author === "string" && (
                <div style={{ fontWeight: 800, fontSize: "1rem", color: "var(--brand-navy)" }}>{content.author}</div>
              )}
              {typeof content.role === "string" && (
                <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>{content.role}</div>
              )}
            </div>
          </Container>
        );

      case "statistics":
        return (
          <Container>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "1.5rem",
                textAlign: "center",
              }}
            >
              {(Array.isArray(content.stats) ? content.stats : []).map((st: Record<string, unknown>, idx: number) => (
                <div key={idx}>
                  <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--brand-primary)", letterSpacing: "-0.02em" }}>
                    {String(st.value || "")}
                  </div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 600, opacity: 0.9, marginTop: "0.25rem" }}>
                    {String(st.label || "")}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        );

      case "faq":
        return (
          <Container>
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3rem auto" }}>
              <h2 style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--brand-navy)", marginBottom: "0.5rem" }}>
                {String(content.sectionTitle || "Frequently Asked Questions")}
              </h2>
            </div>
            <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {(Array.isArray(content.items) ? content.items : []).map((faq: Record<string, unknown>, idx: number) => (
                <div
                  key={idx}
                  style={{
                    padding: "1.25rem",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--brand-navy)", marginBottom: "0.4rem" }}>
                    {String(faq.question || "")}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                    {String(faq.answer || "")}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        );

      case "form":
        return (
          <Container>
            <div style={{ maxWidth: "640px", margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--brand-navy)", marginBottom: "0.5rem" }}>
                  {String(content.headline || "Request Consultation")}
                </h2>
                {typeof content.subheadline === "string" && (
                  <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>{content.subheadline}</p>
                )}
              </div>
              <Card padding="lg" style={{ backgroundColor: "#ffffff", boxShadow: "var(--shadow-lg)" }}>
                {content.formId ? (
                  <FormRenderer
                    formId={String(content.formId)}
                    source={String(content.leadSourceTag || "landing_page")}
                    isTestMode={isBuilder}
                  />
                ) : (
                  <ContactForm
                    source="landing_page"
                    formType={String(content.leadSourceTag || "landing-page:builder")}
                  />
                )}
              </Card>
            </div>
          </Container>
        );

      case "whatsapp":
        return (
          <Container>
            <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                {String(content.headline || "Quick WhatsApp Chat")}
              </h2>
              {typeof content.subheadline === "string" && (
                <p style={{ fontSize: "0.9375rem", opacity: 0.9, marginBottom: "1.5rem" }}>
                  {content.subheadline}
                </p>
              )}
              <a
                href={`https://wa.me/${String(content.phoneNumber || "").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(String(content.prefilledMessage || "Hello!"))}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "#25D366",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textDecoration: "none",
                  boxShadow: "0 4px 12px rgba(37, 211, 102, 0.4)",
                }}
              >
                <span>💬</span>
                <span>{String(content.buttonLabel || "Chat on WhatsApp")}</span>
              </a>
            </div>
          </Container>
        );

      case "countdown":
        return (
          <Container>
            <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
              {Boolean(content.badge) && (
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.2rem 0.75rem",
                    borderRadius: "var(--radius-full)",
                    backgroundColor: "#ef4444",
                    color: "#ffffff",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "0.75rem",
                  }}
                >
                  {String(content.badge)}
                </span>
              )}
              <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                {String(content.headline || "Special Promotion")}
              </h2>
              <p style={{ fontSize: "1rem", opacity: 0.9, marginBottom: "1.5rem" }}>
                {String(content.description || "")}
              </p>
              <a
                href={String(content.ctaTarget || "#lead-form")}
                style={{
                  display: "inline-block",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--brand-primary)",
                  color: "#ffffff",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                {String(content.ctaLabel || "Claim Now")} →
              </a>
            </div>
          </Container>
        );

      case "contact":
        return (
          <Container>
            <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--brand-navy)", marginBottom: "1.5rem" }}>
                {String(content.heading || "Get in Touch")}
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem", textAlign: "left" }}>
                {Boolean(content.phone) && (
                  <div>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Phone</div>
                    <div style={{ fontWeight: 600, color: "var(--brand-navy)", marginTop: "0.2rem" }}>{String(content.phone)}</div>
                  </div>
                )}
                {Boolean(content.email) && (
                  <div>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Email</div>
                    <div style={{ fontWeight: 600, color: "var(--brand-navy)", marginTop: "0.2rem" }}>{String(content.email)}</div>
                  </div>
                )}
                {Boolean(content.address) && (
                  <div style={{ gridColumn: "1 / -1" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Location</div>
                    <div style={{ fontWeight: 600, color: "var(--brand-navy)", marginTop: "0.2rem" }}>{String(content.address)}</div>
                  </div>
                )}
              </div>
            </div>
          </Container>
        );

      case "client-logos":
        return (
          <Container>
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {String(content.heading || "Trusted By Growth Leaders")}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2.5rem", flexWrap: "wrap" }}>
              {(Array.isArray(content.logos) ? content.logos : []).map((l: Record<string, unknown>, idx: number) => (
                <div
                  key={idx}
                  style={{
                    fontWeight: 800,
                    fontSize: "1.125rem",
                    color: "var(--text-secondary)",
                    opacity: 0.8,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {String(l.name || "")}
                </div>
              ))}
            </div>
          </Container>
        );

      case "process":
        return (
          <Container>
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3rem auto" }}>
              <h2 style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--brand-navy)", marginBottom: "0.5rem" }}>
                {String(content.heading || "Our Proven Process")}
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {(Array.isArray(content.steps) ? content.steps : []).map((st: Record<string, unknown>, idx: number) => (
                <Card key={idx} padding="lg" style={{ backgroundColor: "#ffffff" }}>
                  <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--brand-primary)", marginBottom: "0.5rem" }}>
                    {String(st.step || "")}
                  </div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--brand-navy)", marginBottom: "0.4rem" }}>
                    {String(st.title || "")}
                  </h3>
                  <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                    {String(st.desc || "")}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        );

      case "footer":
        return (
          <Container>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
                fontSize: "0.8125rem",
              }}
            >
              <div>{String(content.copyrightText || "© 2026 DigiVigee Platform")}</div>
              {Boolean(content.showLegalLinks) && (
                <div style={{ display: "flex", gap: "1rem" }}>
                  <Link href="/privacy-policy" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</Link>
                  <Link href="/terms-and-conditions" style={{ color: "inherit", textDecoration: "none" }}>Terms</Link>
                </div>
              )}
            </div>
          </Container>
        );

      case "custom-html":
        const sanitizedHtml = sanitizeCustomHtml(typeof content.html === "string" ? content.html : "");
        return (
          <Container>
            <div
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
              style={{ overflow: "hidden" }}
            />
          </Container>
        );

      default:
        return (
          <Container>
            <div
              style={{
                padding: "2rem",
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--bg-secondary)",
                border: "1px dashed var(--border-subtle)",
                textAlign: "center",
                color: "var(--text-muted)",
              }}
            >
              <div style={{ fontWeight: 700, color: "var(--brand-navy)" }}>Unsupported Section Type: {section.type}</div>
              <div style={{ fontSize: "0.8125rem", marginTop: "0.25rem" }}>This section is safely preserved without errors.</div>
            </div>
          </Container>
        );
    }
  };

  // Normal Public / Preview Mode
  if (!isBuilder) {
    return <section id={section.id} style={wrapperStyle} className={styling?.customClasses || ""}>{renderContent()}</section>;
  }

  // Visual Builder Canvas Mode (With Interactive Overlays)
  return (
    <div
      style={{
        position: "relative",
        marginBottom: "1rem",
      }}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {/* Drop Indicator Bar */}
      {isDragOver && (
        <div
          style={{
            height: "4px",
            backgroundColor: "var(--brand-primary)",
            borderRadius: "var(--radius-full)",
            margin: "0.5rem 0",
            boxShadow: "0 0 8px rgba(22, 163, 74, 0.6)",
          }}
        />
      )}

      <div
        id={`builder-${section.id}`}
        style={builderContainerStyle}
        onClick={onSelect}
      >
        {/* Floating Builder Action Bar (Visible when Selected or on Hover) */}
        {isSelected && (
          <div
            style={{
              position: "absolute",
              top: "-36px",
              left: 0,
              right: 0,
              zIndex: 10,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "var(--brand-navy)",
              color: "#ffffff",
              padding: "0.3rem 0.65rem",
              borderRadius: "var(--radius-md) var(--radius-md) 0 0",
              fontSize: "0.75rem",
              fontWeight: 700,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            {/* Drag Handle & Label */}
            <div
              draggable={true}
              onDragStart={onDragStart}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "grab",
                padding: "0.15rem 0.35rem",
                borderRadius: "var(--radius-sm)",
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
              title="Click and drag to reorder"
            >
              <span>☰</span>
              <span style={{ textTransform: "capitalize" }}>{section.type}</span>
              {!section.isVisible && (
                <span style={{ backgroundColor: "#f59e0b", color: "#000000", padding: "0.1rem 0.4rem", borderRadius: "var(--radius-full)", fontSize: "0.6875rem" }}>
                  Hidden
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <button
                type="button"
                disabled={!canMoveUp}
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveUp?.();
                }}
                title="Move Section Up"
                style={{
                  background: "none",
                  border: "none",
                  color: canMoveUp ? "#ffffff" : "rgba(255,255,255,0.3)",
                  cursor: canMoveUp ? "pointer" : "not-allowed",
                  fontSize: "0.8125rem",
                  padding: "0.15rem 0.3rem",
                }}
              >
                ▲
              </button>

              <button
                type="button"
                disabled={!canMoveDown}
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveDown?.();
                }}
                title="Move Section Down"
                style={{
                  background: "none",
                  border: "none",
                  color: canMoveDown ? "#ffffff" : "rgba(255,255,255,0.3)",
                  cursor: canMoveDown ? "pointer" : "not-allowed",
                  fontSize: "0.8125rem",
                  padding: "0.15rem 0.3rem",
                }}
              >
                ▼
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleVisibility?.();
                }}
                title={section.isVisible ? "Hide Section" : "Show Section"}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ffffff",
                  cursor: "pointer",
                  fontSize: "0.8125rem",
                  padding: "0.15rem 0.3rem",
                }}
              >
                {section.isVisible ? "👁️" : "🙈"}
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDuplicate?.();
                }}
                title="Duplicate Section"
                style={{
                  background: "none",
                  border: "none",
                  color: "#ffffff",
                  cursor: "pointer",
                  fontSize: "0.8125rem",
                  padding: "0.15rem 0.3rem",
                }}
              >
                📑
              </button>

              {onSaveAsReusable && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSaveAsReusable();
                  }}
                  title="Save Section as Reusable Master Component"
                  style={{
                    background: "rgba(22, 163, 74, 0.35)",
                    border: "1px solid #4ade80",
                    borderRadius: "var(--radius-sm)",
                    color: "#4ade80",
                    cursor: "pointer",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    padding: "0.15rem 0.45rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.2rem",
                  }}
                >
                  <span>💾</span>
                  <span>Save Reusable</span>
                </button>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.();
                }}
                title="Delete Section"
                style={{
                  background: "none",
                  border: "none",
                  color: "#f87171",
                  cursor: "pointer",
                  fontSize: "0.8125rem",
                  padding: "0.15rem 0.3rem",
                }}
              >
                🗑️
              </button>
            </div>
          </div>
        )}

        <section id={section.id} style={wrapperStyle} className={styling?.customClasses || ""}>
          {renderContent()}
        </section>
      </div>
    </div>
  );
}
