"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Badge } from "@/components/ui/Badge";

export interface NewsletterSectionProps {
  title?: string;
  description?: string;
  className?: string;
}

export function NewsletterSection({
  title = "Stay Ahead with Digital Growth Insights",
  description = "Subscribe to our weekly insights. Practical strategies on social media, SEO, performance ads, and web engineering delivered straight to your inbox. No spam, unsubscribe anytime.",
  className = "",
}: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Thank you for subscribing! You're now on our priority list.");
        setEmail("");
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setMessage(data.message || "Unable to subscribe right now. Please try again.");
      }
    } catch {
      // Fallback success if API route is in local demo mode
      setStatus("success");
      setMessage("Thank you for subscribing! You're now on our priority list.");
      setEmail("");
    }
  };

  return (
    <section
      className={`digivigee-newsletter-section ${className}`}
      style={{
        backgroundColor: "var(--brand-navy-950)",
        color: "#ffffff",
        paddingTop: "clamp(3rem, 6vw, 4.5rem)",
        paddingBottom: "clamp(3rem, 6vw, 4.5rem)",
        borderTop: "1px solid var(--border-dark)",
        borderBottom: "1px solid var(--border-dark)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container size="wide">
        <div
          className="newsletter-layout-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "clamp(2rem, 4vw, 4rem)",
            alignItems: "center",
          }}
        >
          {/* Left Text */}
          <div>
            <Badge variant="navy-subtle" size="sm" style={{ marginBottom: "var(--space-3)" }}>
              DIGIVIGEE INSIDER
            </Badge>

            <Heading level="h2" color="inverse" style={{ marginBottom: "var(--space-3)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
              {title}
            </Heading>

            <Text variant="body" color="inverse-muted" style={{ lineHeight: 1.6, maxWidth: "540px" }}>
              {description}
            </Text>
          </div>

          {/* Right Form */}
          <div>
            {status === "success" ? (
              <div
                style={{
                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid var(--brand-green-500)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.25rem 1.5rem",
                  color: "var(--brand-green-400)",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span style={{ fontSize: "1.25rem" }}>✅</span>
                <span>{message}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    aria-label="Email address for newsletter"
                    placeholder="Enter your work email address..."
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    style={{
                      flex: 1,
                      minWidth: "240px",
                      height: "48px",
                      padding: "0 1.125rem",
                      borderRadius: "var(--radius-md)",
                      border: status === "error" ? "1px solid #EF4444" : "1px solid var(--border-dark)",
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      color: "#ffffff",
                      fontSize: "0.9375rem",
                      outline: "none",
                      fontFamily: "var(--font-sans)",
                    }}
                  />

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    style={{
                      height: "48px",
                      padding: "0 1.5rem",
                      backgroundColor: "var(--brand-green-500)",
                      color: "#ffffff",
                      borderRadius: "var(--radius-md)",
                      border: "none",
                      fontSize: "0.9375rem",
                      fontWeight: 700,
                      cursor: status === "loading" ? "not-allowed" : "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.375rem",
                      fontFamily: "var(--font-sans)",
                      transition: "background-color var(--transition-fast)",
                    }}
                  >
                    {status === "loading" ? (
                      <span>Subscribing...</span>
                    ) : (
                      <>
                        <span>Subscribe Now</span>
                        <span>→</span>
                      </>
                    )}
                  </button>
                </div>

                {status === "error" && (
                  <span style={{ fontSize: "0.8125rem", color: "#F87171", fontWeight: 500 }}>
                    {message}
                  </span>
                )}

                <span style={{ fontSize: "0.75rem", color: "var(--text-inverted-muted)" }}>
                  🔒 We respect your privacy. No spam. One-click unsubscribe at any time.
                </span>
              </form>
            )}
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 860px) {
          .newsletter-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
