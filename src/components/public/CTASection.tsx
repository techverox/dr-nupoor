import React from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { LinkButton } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export interface CTASectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  showWhatsApp?: boolean;
  className?: string;
}

export function CTASection({
  title = "Ready to Scale Your Digital Revenue?",
  description = "Let's discuss how we can help you build an authoritative presence, generate predictable high-value inquiries, and maximize your commercial return on investment.",
  primaryButtonText = "Get Free Consultation",
  primaryButtonHref = "/contact",
  secondaryButtonText = "Explore Our Services",
  secondaryButtonHref = "/services",
  showWhatsApp = true,
  className = "",
}: CTASectionProps) {
  return (
    <section
      className={`digivigee-cta-section ${className}`}
      style={{
        background: "radial-gradient(circle at 50% 0%, #142143 0%, #0B132B 85%)",
        color: "var(--text-inverted)",
        paddingTop: "clamp(4.5rem, 8vw, 6.5rem)",
        paddingBottom: "clamp(4.5rem, 8vw, 6.5rem)",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid var(--border-dark)",
      }}
    >
      <Container>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "840px",
            margin: "0 auto",
          }}
        >
          {/* Rocket / Launch Growth Icon Badge */}
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              border: "1.5px solid var(--brand-green-500)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "var(--space-6)",
              color: "var(--brand-green-400)",
              boxShadow: "var(--shadow-glow-green)",
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
              <path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2.5 5-2.5" />
              <path d="M15 9v5s3.03-.55 4.5-2c1.63-1.62 2.5-5 2.5-5" />
            </svg>
          </div>

          <Heading level="h2" color="inverse" style={{ marginBottom: "var(--space-4)", letterSpacing: "-0.025em" }}>
            {title}
          </Heading>

          <Text
            variant="body-lg"
            color="inverse-muted"
            style={{ maxWidth: "660px", marginBottom: "var(--space-8)", lineHeight: 1.7 }}
          >
            {description}
          </Text>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginBottom: "var(--space-8)",
            }}
          >
            <LinkButton
              href={primaryButtonHref}
              variant="primary"
              size="lg"
              rightIcon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              }
            >
              {primaryButtonText}
            </LinkButton>

            {secondaryButtonText && (
              <LinkButton
                href={secondaryButtonHref}
                variant="outline"
                size="lg"
                style={{
                  color: "#ffffff",
                  borderColor: "rgba(255, 255, 255, 0.25)",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                }}
              >
                {secondaryButtonText}
              </LinkButton>
            )}

            {showWhatsApp && (
              <WhatsAppButton
                variant="inline"
                label="WhatsApp Strategist"
              />
            )}
          </div>

          {/* Trust Reassurances Bar */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.5rem",
              fontSize: "0.875rem",
              color: "var(--text-inverted-muted)",
              paddingTop: "var(--space-4)",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              width: "100%",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem" }}>
              <span style={{ color: "var(--brand-green-400)" }}>✓</span> Free 30-Minute Growth Audit
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem" }}>
              <span style={{ color: "var(--brand-green-400)" }}>✓</span> Response Within 24 Hours
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem" }}>
              <span style={{ color: "var(--brand-green-400)" }}>✓</span> 100% Confidential
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
