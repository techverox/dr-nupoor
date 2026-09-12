import React from "react";
import { Button } from "./Button";
import { Heading } from "./Heading";
import { Text } from "./Text";

export interface LoadingStateProps {
  message?: string;
  minHeight?: string;
}

export function LoadingState({
  message = "Loading...",
  minHeight = "200px",
}: LoadingStateProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight,
        padding: "var(--space-8)",
        width: "100%",
      }}
      role="status"
      aria-live="polite"
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          animation: "spin 0.8s linear infinite",
          color: "var(--brand-green-500)",
          marginBottom: "var(--space-4)",
        }}
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="31.4 31.4"
          style={{ opacity: 0.2 }}
        />
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="15.7 47.1"
        />
      </svg>
      <Text variant="body-sm" color="muted">
        {message}
      </Text>
    </div>
  );
}

export interface EmptyStateProps {
  title?: string;
  description: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
  actionHref?: string;
  minHeight?: string;
}

export function EmptyState({
  title = "No Content Found",
  description,
  icon,
  actionText,
  onAction,
  actionHref,
  minHeight = "280px",
}: EmptyStateProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight,
        padding: "var(--space-8)",
        backgroundColor: "var(--surface-subtle)",
        borderRadius: "var(--radius-lg)",
        border: "1px dashed var(--surface-border)",
      }}
    >
      {icon ? (
        <div
          style={{
            marginBottom: "var(--space-4)",
            color: "var(--text-muted)",
          }}
        >
          {icon}
        </div>
      ) : (
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "var(--radius-full)",
            backgroundColor: "var(--bg-tertiary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "var(--space-4)",
            color: "var(--text-muted)",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="9" y1="9" x2="15" y2="15" />
            <line x1="15" y1="9" x2="9" y2="15" />
          </svg>
        </div>
      )}

      <Heading level="h4" color="navy" style={{ marginBottom: "var(--space-2)" }}>
        {title}
      </Heading>

      <Text
        variant="body-sm"
        color="secondary"
        style={{ maxWidth: "420px", marginBottom: actionText ? "var(--space-6)" : 0 }}
      >
        {description}
      </Text>

      {actionText && (
        <>
          {actionHref ? (
            <Button variant="primary" size="sm" onClick={() => (window.location.href = actionHref)}>
              {actionText}
            </Button>
          ) : (
            <Button variant="primary" size="sm" onClick={onAction}>
              {actionText}
            </Button>
          )}
        </>
      )}
    </div>
  );
}

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  minHeight?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We could not load this content. Please try again or contact support.",
  onRetry,
  minHeight = "240px",
}: ErrorStateProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight,
        padding: "var(--space-8)",
        backgroundColor: "var(--status-error-bg)",
        borderRadius: "var(--radius-lg)",
        border: "1.5px solid #FECACA",
      }}
      role="alert"
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "var(--radius-full)",
          backgroundColor: "#FEE2E2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "var(--space-4)",
          color: "var(--status-error)",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      <Heading level="h4" color="navy" style={{ marginBottom: "var(--space-2)" }}>
        {title}
      </Heading>

      <Text
        variant="body-sm"
        color="secondary"
        style={{ maxWidth: "420px", marginBottom: onRetry ? "var(--space-6)" : 0 }}
      >
        {message}
      </Text>

      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}

export interface SuccessStateProps {
  title?: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
  minHeight?: string;
}

export function SuccessState({
  title = "Action Completed Successfully",
  message,
  actionText,
  onAction,
  minHeight = "240px",
}: SuccessStateProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight,
        padding: "var(--space-8)",
        backgroundColor: "var(--status-success-bg)",
        borderRadius: "var(--radius-lg)",
        border: "1.5px solid #A7F3D0",
      }}
      role="status"
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "var(--radius-full)",
          backgroundColor: "var(--brand-green-500)",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "var(--space-4)",
          fontSize: "1.5rem",
        }}
      >
        ✓
      </div>

      <Heading level="h4" color="navy" style={{ marginBottom: "var(--space-2)" }}>
        {title}
      </Heading>

      <Text
        variant="body-sm"
        color="secondary"
        style={{ maxWidth: "420px", marginBottom: actionText ? "var(--space-6)" : 0 }}
      >
        {message}
      </Text>

      {actionText && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}

export interface InfoNoticeProps {
  title?: string;
  children: React.ReactNode;
  variant?: "info" | "warning" | "success";
  className?: string;
}

export function InfoNotice({
  title,
  children,
  variant = "info",
  className = "",
}: InfoNoticeProps) {
  const bg =
    variant === "warning"
      ? "var(--status-warning-bg)"
      : variant === "success"
      ? "var(--status-success-bg)"
      : "var(--status-info-bg)";
  const border =
    variant === "warning"
      ? "#FDE68A"
      : variant === "success"
      ? "#A7F3D0"
      : "#BFDBFE";
  const textColor =
    variant === "warning"
      ? "#92400E"
      : variant === "success"
      ? "#065F46"
      : "#1E40AF";

  return (
    <div
      className={`digivigee-info-notice ${className}`}
      style={{
        backgroundColor: bg,
        border: `1px solid ${border}`,
        borderRadius: "var(--radius-md)",
        padding: "1rem 1.25rem",
        color: textColor,
        fontSize: "0.875rem",
        lineHeight: 1.6,
      }}
      role="note"
    >
      {title && (
        <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>
          {title}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}

export function SkeletonCard({ height = "280px" }: { height?: string }) {
  return (
    <div
      style={{
        width: "100%",
        height,
        backgroundColor: "var(--surface-subtle)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--surface-border)",
        position: "relative",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          transform: "translateX(-100%)",
          backgroundImage: "linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%)",
          animation: "shimmer 1.5s infinite",
        }}
      />
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%" }} aria-hidden="true">
      {Array.from({ length: lines }).map((_, idx) => (
        <div
          key={idx}
          style={{
            height: "14px",
            width: idx === lines - 1 ? "70%" : "100%",
            backgroundColor: "var(--surface-subtle)",
            borderRadius: "var(--radius-xs)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              transform: "translateX(-100%)",
              backgroundImage: "linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%)",
              animation: "shimmer 1.5s infinite",
            }}
          />
        </div>
      ))}
    </div>
  );
}
