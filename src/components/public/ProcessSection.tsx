import React from "react";
import { PROCESS_STEPS, ProcessStep } from "@/data/process";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Badge } from "@/components/ui/Badge";

export interface ProcessSectionProps {
  steps?: ProcessStep[];
  badgeText?: string;
  title?: string;
  subtitle?: string;
  background?: "white" | "subtle";
  className?: string;
}

export function ProcessSection({
  steps = PROCESS_STEPS,
  badgeText = "HOW WE WORK",
  title = "Our Proven 5-Step Growth Engine",
  subtitle = "A structured, transparent methodology engineered to accelerate time-to-market and maximize commercial return on investment.",
  background = "white",
  className = "",
}: ProcessSectionProps) {
  return (
    <Section background={background} padding="fluid" className={className}>
      <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto var(--space-12) auto" }}>
        <Badge variant="primary-subtle" size="sm" style={{ marginBottom: "var(--space-3)" }}>
          {badgeText}
        </Badge>
        <Heading level="h2" color="navy" style={{ marginBottom: "var(--space-3)" }}>
          {title}
        </Heading>
        <Text variant="body" color="secondary">
          {subtitle}
        </Text>
      </div>

      <div
        className="process-steps-grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
          gap: "var(--space-6)",
          position: "relative",
        }}
      >
        {steps.map((step) => (
          <div
            key={step.stepNumber}
            className="process-step-item"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              padding: "var(--space-6) var(--space-4)",
              borderRadius: "var(--radius-xl)",
              border: "1px solid transparent",
              cursor: "pointer",
            }}
          >
            {/* Circular Step Number Badge */}
            <div
              className="process-step-badge"
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "var(--radius-full)",
                backgroundColor: "var(--brand-green-500)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "1.25rem",
                marginBottom: "var(--space-4)",
                boxShadow: "var(--shadow-glow-green)",
                fontFamily: "var(--font-sans)",
              }}
            >
              {step.stepNumber}
            </div>

            <h4 className="process-step-title" style={{ marginBottom: "var(--space-2)", fontSize: "1.125rem", fontWeight: 800, color: "var(--brand-navy-900)", fontFamily: "var(--font-sans)" }}>
              {step.title}
            </h4>

            <p className="process-step-desc" style={{ lineHeight: 1.6, fontSize: "var(--text-body-sm)", color: "var(--text-body)", margin: 0, fontFamily: "var(--font-sans)" }}>
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .process-steps-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: var(--space-6) !important;
          }
        }
        @media (max-width: 640px) {
          .process-steps-grid {
            grid-template-columns: 1fr !important;
            gap: var(--space-6) !important;
          }
        }

        .process-step-item {
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .process-step-item .process-step-badge,
        .process-step-item .process-step-title,
        .process-step-item .process-step-desc {
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .process-step-item:hover {
          background: linear-gradient(135deg, #00D053 0%, #059669 100%) !important;
          border-color: #00D053 !important;
          box-shadow: 0 18px 36px -6px rgba(0, 208, 83, 0.42), 0 8px 16px -4px rgba(0, 208, 83, 0.22) !important;
          transform: translateY(-6px) !important;
        }
        .process-step-item:hover .process-step-badge {
          background-color: #ffffff !important;
          color: #059669 !important;
          transform: scale(1.15) !important;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15) !important;
        }
        .process-step-item:hover .process-step-title {
          color: #ffffff !important;
        }
        .process-step-item:hover .process-step-desc {
          color: rgba(255, 255, 255, 0.95) !important;
        }
      `}</style>
    </Section>
  );
}
