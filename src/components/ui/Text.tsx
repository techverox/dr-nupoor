import React from "react";

export type TextVariant = "body-lg" | "body" | "body-sm" | "caption";
export type TextColor = "primary" | "secondary" | "muted" | "inverse" | "inverse-muted" | "inherit";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  as?: "p" | "span" | "div" | "label" | "small";
  color?: TextColor;
  weight?: "regular" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right";
  children: React.ReactNode;
}

export function Text({
  variant = "body",
  as: Tag = "p",
  color = "secondary",
  weight = "regular",
  align = "left",
  className = "",
  style,
  children,
  ...props
}: TextProps) {
  const getFontSize = (): string => {
    switch (variant) {
      case "body-lg":
        return "var(--text-body-lg)";
      case "body":
        return "var(--text-body)";
      case "body-sm":
        return "var(--text-body-sm)";
      case "caption":
        return "var(--text-caption)";
    }
  };

  const getColor = (): string => {
    switch (color) {
      case "primary":
        return "var(--text-heading)";
      case "secondary":
        return "var(--text-body)";
      case "muted":
        return "var(--text-muted)";
      case "inverse":
        return "var(--text-inverted)";
      case "inverse-muted":
        return "var(--text-inverted-muted)";
      case "inherit":
        return "inherit";
    }
  };

  const getFontWeight = (): number => {
    switch (weight) {
      case "regular":
        return 400;
      case "medium":
        return 500;
      case "semibold":
        return 600;
      case "bold":
        return 700;
    }
  };

  const getLineHeight = (): number => {
    switch (variant) {
      case "body-lg":
        return 1.7;
      case "body":
        return 1.65;
      case "body-sm":
        return 1.5;
      case "caption":
        return 1.4;
    }
  };

  return (
    <Tag
      className={`digivigee-text ${className}`}
      style={{
        fontSize: getFontSize(),
        color: getColor(),
        fontWeight: getFontWeight(),
        textAlign: align,
        lineHeight: getLineHeight(),
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}
