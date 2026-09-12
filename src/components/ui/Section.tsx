import React from "react";
import { Container } from "./Container";

export type SectionBackground = "white" | "subtle" | "tertiary" | "navy" | "dark" | "transparent";
export type SectionPadding = "none" | "sm" | "md" | "lg" | "fluid";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  background?: SectionBackground;
  padding?: SectionPadding;
  container?: boolean | "narrow" | "wide" | "full";
  children: React.ReactNode;
}

export function Section({
  background = "white",
  padding = "fluid",
  container = true,
  className = "",
  style,
  children,
  ...props
}: SectionProps) {
  const getBackgroundStyles = (): React.CSSProperties => {
    switch (background) {
      case "white":
        return {
          backgroundColor: "var(--surface-white)",
          color: "var(--text-heading)",
        };
      case "subtle":
        return {
          backgroundColor: "var(--surface-subtle)",
          color: "var(--text-heading)",
        };
      case "tertiary":
        return {
          backgroundColor: "var(--bg-tertiary)",
          color: "var(--text-heading)",
        };
      case "navy":
        return {
          backgroundColor: "var(--brand-navy-900)",
          color: "var(--text-inverted)",
        };
      case "dark":
        return {
          backgroundColor: "var(--brand-navy-800)",
          color: "var(--text-inverted)",
        };
      case "transparent":
        return {
          backgroundColor: "transparent",
        };
    }
  };

  const getPaddingStyles = (): React.CSSProperties => {
    switch (padding) {
      case "none":
        return { padding: 0 };
      case "sm":
        return {
          paddingTop: "var(--space-8)",
          paddingBottom: "var(--space-8)",
        };
      case "md":
        return {
          paddingTop: "var(--space-12)",
          paddingBottom: "var(--space-12)",
        };
      case "lg":
        return {
          paddingTop: "var(--space-20)",
          paddingBottom: "var(--space-20)",
        };
      case "fluid":
      default:
        return {
          paddingTop: "var(--section-padding-y)",
          paddingBottom: "var(--section-padding-y)",
        };
    }
  };

  const content = container ? (
    <Container size={typeof container === "string" ? container : "default"}>
      {children}
    </Container>
  ) : (
    children
  );

  return (
    <section
      className={`site-section digivigee-section ${className}`}
      style={{
        position: "relative",
        width: "100%",
        ...getBackgroundStyles(),
        ...getPaddingStyles(),
        ...style,
      }}
      {...props}
    >
      {content}
    </section>
  );
}
