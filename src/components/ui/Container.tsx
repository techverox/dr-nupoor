import React from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide" | "full";
  children: React.ReactNode;
}

export function Container({
  size = "default",
  className = "",
  style,
  children,
  ...props
}: ContainerProps) {
  const getMaxWidth = () => {
    switch (size) {
      case "narrow":
        return "960px";
      case "wide":
        return "var(--container-wide-max-width)";
      case "full":
        return "100%";
      case "default":
      default:
        return "var(--container-max-width)";
    }
  };

  return (
    <div
      className={`${size === "wide" ? "site-container-wide" : "site-container"} ${className}`}
      style={{
        maxWidth: getMaxWidth(),
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
