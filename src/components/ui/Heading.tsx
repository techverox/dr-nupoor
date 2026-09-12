import React from "react";

export type HeadingLevel = "display" | "h1" | "h2" | "h3" | "h4";
export type HeadingColor =
  | "navy"
  | "primary"
  | "blue"
  | "gradient-brand"
  | "gradient-blue"
  | "gradient-green"
  | "inverse"
  | "muted"
  | "inherit";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "span";
  color?: HeadingColor;
  weight?: "regular" | "medium" | "semibold" | "bold" | "extrabold" | "black";
  children: React.ReactNode;
}

export function Heading({
  level = "h2",
  as,
  color = "navy",
  weight,
  className = "",
  style,
  children,
  ...props
}: HeadingProps) {
  const Tag = as || (level === "display" ? "h1" : level);

  const getFontSize = (): string => {
    switch (level) {
      case "display":
        return "var(--text-display)";
      case "h1":
        return "var(--text-h1)";
      case "h2":
        return "var(--text-h2)";
      case "h3":
        return "var(--text-h3)";
      case "h4":
        return "var(--text-h4)";
    }
  };

  const getColorStyles = (): React.CSSProperties => {
    switch (color) {
      case "navy":
        return { color: "var(--text-heading)" };
      case "primary":
        return { color: "var(--brand-green-500)" };
      case "blue":
        return { color: "var(--brand-blue-500)" };
      case "gradient-brand":
        return {
          background: "var(--gradient-brand)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
        };
      case "gradient-blue":
        return {
          background: "var(--gradient-blue)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
        };
      case "gradient-green":
        return {
          background: "var(--gradient-green)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
        };
      case "inverse":
        return { color: "var(--text-inverted)" };
      case "muted":
        return { color: "var(--text-muted)" };
      case "inherit":
        return { color: "inherit" };
    }
  };

  const getFontWeight = (): number => {
    if (weight) {
      switch (weight) {
        case "regular": return 400;
        case "medium": return 500;
        case "semibold": return 600;
        case "bold": return 700;
        case "extrabold": return 800;
        case "black": return 900;
      }
    }
    return level === "display" || level === "h1" ? 900 : 800;
  };

  const getLetterSpacing = (): string => {
    switch (level) {
      case "display": return "-0.035em";
      case "h1": return "-0.03em";
      case "h2": return "-0.025em";
      case "h3": return "-0.02em";
      case "h4": return "-0.01em";
    }
  };

  const getLineHeight = (): string => {
    switch (level) {
      case "display":
      case "h1":
        return "var(--line-height-tight)";
      case "h2":
      case "h3":
      case "h4":
        return "var(--line-height-snug)";
    }
  };

  return (
    <Tag
      className={`digivigee-heading ${className}`}
      style={{
        fontSize: getFontSize(),
        fontWeight: getFontWeight(),
        lineHeight: getLineHeight(),
        letterSpacing: getLetterSpacing(),
        fontFamily: "var(--font-sans)",
        ...getColorStyles(),
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}
