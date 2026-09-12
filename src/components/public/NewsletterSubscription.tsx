"use client";

import React, { useState } from "react";
import { trackEvent } from "@/lib/tracking/events";
import { getAttributionContext } from "@/lib/tracking/attribution";

interface NewsletterSubscriptionProps {
  source?: string;
  className?: string;
  variant?: "footer" | "inline";
}

export function NewsletterSubscription({
  source = "Website Footer",
  variant = "footer",
}: NewsletterSubscriptionProps) {
  const [email, setEmail] = useState("");
  const [websiteHp, setWebsiteHp] = useState(""); // Honeypot field
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      const attr = getAttributionContext();
      const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
      const isLanding = currentPath.startsWith("/landing/");
      const landingPageSlug = isLanding ? currentPath.replace("/landing/", "") : undefined;

      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          website_hp: websiteHp,
          source,
          landingPageSlug,
          utmSource: attr.utmSource,
          utmMedium: attr.utmMedium,
          utmCampaign: attr.utmCampaign,
          utmContent: attr.utmContent,
          utmTerm: attr.utmTerm,
          referrer: attr.referrer,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setMessage(data.message || "Thank you for subscribing to DigiVigee insights!");
        setEmail("");

        // Track conversion event
        trackEvent("newsletter_subscription", { source });
      } else {
        setStatus("error");
        setMessage(data.error || "Subscription failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFooter = variant === "footer";

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div
        className="newsletter-row"
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
        }}
      >
        {/* Left Content Column */}
        <div style={{ flex: "1", maxWidth: "600px" }}>
          <span
            style={{
              fontSize: "1.125rem",
              fontWeight: 800,
              color: isFooter ? "#ffffff" : "var(--brand-navy-900)",
              letterSpacing: "-0.015em",
              fontFamily: "var(--font-sans)",
              display: "block",
            }}
          >
            Stay Ahead in Digital Growth
          </span>
          <p
            style={{
              fontSize: "0.875rem",
              color: isFooter ? "rgba(255, 255, 255, 0.65)" : "var(--text-body)",
              lineHeight: 1.5,
              marginTop: "0.35rem",
              marginBottom: 0,
              fontFamily: "var(--font-sans)",
            }}
          >
            Bi-weekly growth strategies, conversion guides, and ROI playbooks delivered to your inbox.
          </p>
        </div>

        {/* Right Form Column */}
        <form
          onSubmit={handleSubmit}
          className="newsletter-form"
          style={{
            flex: "1",
            maxWidth: "420px",
            width: "100%",
            position: "relative",
          }}
        >
          {/* Honeypot Field */}
          <div style={{ display: "none" }} aria-hidden="true">
            <label htmlFor="website_hp_input">Do not fill this field</label>
            <input
              id="website_hp_input"
              type="text"
              name="website_hp"
              tabIndex={-1}
              autoComplete="off"
              value={websiteHp}
              onChange={(e) => setWebsiteHp(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", gap: "0.5rem", width: "100%" }}>
            <input
              type="email"
              required
              placeholder="Enter your work email..."
              aria-label="Email Address for Newsletter"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading || status === "success"}
              className="newsletter-input"
              style={{
                flex: 1,
                height: "46px",
                padding: "0 1rem",
                borderRadius: "0.75rem",
                border: isFooter ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid var(--surface-border)",
                backgroundColor: isFooter ? "rgba(255, 255, 255, 0.03)" : "var(--surface-white)",
                color: isFooter ? "#ffffff" : "var(--text-heading)",
                fontSize: "0.9375rem",
                outline: "none",
                fontFamily: "var(--font-sans)",
              }}
            />

            <button
              type="submit"
              disabled={isLoading || status === "success"}
              className="newsletter-button"
              style={{
                height: "46px",
                padding: "0 1.5rem",
                borderRadius: "0.75rem",
                border: "none",
                background: "linear-gradient(135deg, #00D053 0%, #059669 100%)",
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "0.9375rem",
                cursor: isLoading || status === "success" ? "not-allowed" : "pointer",
                whiteSpace: "nowrap",
                fontFamily: "var(--font-sans)",
                boxShadow: "0 4px 14px rgba(0, 208, 83, 0.35)",
              }}
            >
              {isLoading ? "Joining..." : status === "success" ? "Subscribed ✓" : "Subscribe"}
            </button>
          </div>

          {/* Status Messages */}
          {status === "success" && (
            <div
              role="status"
              style={{
                fontSize: "0.8125rem",
                color: "var(--brand-green-400)",
                fontWeight: 600,
                lineHeight: 1.4,
                fontFamily: "var(--font-sans)",
                marginTop: "0.5rem",
                position: "absolute",
                left: 0,
                top: "100%",
              }}
            >
              ✓ {message}
            </div>
          )}

          {status === "error" && (
            <div
              role="alert"
              style={{
                fontSize: "0.8125rem",
                color: "#f87171",
                fontWeight: 600,
                lineHeight: 1.4,
                fontFamily: "var(--font-sans)",
                marginTop: "0.5rem",
                position: "absolute",
                left: 0,
                top: "100%",
              }}
            >
              ⚠️ {message}
            </div>
          )}
        </form>
      </div>

      <style>{`
        .newsletter-input {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .newsletter-input:focus {
          border-color: rgba(0, 208, 83, 0.6) !important;
          background-color: rgba(255, 255, 255, 0.06) !important;
          box-shadow: 0 0 14px rgba(0, 208, 83, 0.18) !important;
        }
        .newsletter-button {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .newsletter-button:hover {
          background: linear-gradient(135deg, #00FF66 0%, #059669 100%) !important;
          box-shadow: 0 0 20px rgba(0, 208, 83, 0.5) !important;
          transform: translateY(-1px);
        }
        @media (max-width: 768px) {
          .newsletter-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.25rem !important;
          }
          .newsletter-form {
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
