import React from "react";

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
  variant?: "subtle" | "strong" | "dark";
  spacing?: "sm" | "md" | "lg" | "none";
}

export function Divider({
  orientation = "horizontal",
  variant = "subtle",
  spacing = "md",
  className = "",
  style,
  ...props
}: DividerProps) {
  const getColor = () => {
    switch (variant) {
      case "subtle":
        return "var(--border-subtle)";
      case "strong":
        return "var(--border-strong)";
      case "dark":
        return "var(--border-dark)";
    }
  };

  const getSpacing = () => {
    switch (spacing) {
      case "none":
        return 0;
      case "sm":
        return "var(--space-4)";
      case "md":
        return "var(--space-8)";
      case "lg":
        return "var(--space-12)";
    }
  };

  if (orientation === "vertical") {
    return (
      <div
        className={`digivigee-divider-v ${className}`}
        style={{
          display: "inline-block",
          width: "1px",
          height: "100%",
          minHeight: "1.5rem",
          backgroundColor: getColor(),
          marginLeft: getSpacing(),
          marginRight: getSpacing(),
          verticalAlign: "middle",
          ...style,
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <hr
      className={`digivigee-divider-h ${className}`}
      style={{
        border: "none",
        height: "1px",
        backgroundColor: getColor(),
        marginTop: getSpacing(),
        marginBottom: getSpacing(),
        width: "100%",
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}
