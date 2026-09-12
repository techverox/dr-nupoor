"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/config/site";
import { FOOTER_COLUMNS } from "@/config/navigation";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { NewsletterSubscription } from "@/components/public/NewsletterSubscription";
import { SiteSettings } from "@/types";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState<Partial<SiteSettings>>({
    siteName: SITE_CONFIG.name,
    tagline: SITE_CONFIG.tagline,
    contact: {
      phone: SITE_CONFIG.contact.phone,
      whatsapp: SITE_CONFIG.contact.whatsappDisplay,
      email: SITE_CONFIG.contact.email,
      address: SITE_CONFIG.contact.address,
      businessHours: SITE_CONFIG.contact.workingHours,
    },
    socials: SITE_CONFIG.socials,
    footerContent: {
      aboutText: "We help ambitious businesses build an authoritative presence, scale performance marketing, and generate high-intent customer inquiries with measurable ROI.",
      copyrightText: `© ${currentYear} ${SITE_CONFIG.name}. All rights reserved.`,
    },
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.settings) {
            setSettings(data.settings);
          }
        }
      } catch {
        // Fallback to initial static settings
      }
    }

    fetchSettings();

    let channel: BroadcastChannel | null = null;
    try {
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        channel = new BroadcastChannel("digivigee-cms-sync");
        channel.onmessage = (e) => {
          if (e.data?.type === "CMS_UPDATED") {
            fetchSettings();
          }
        };
      }
    } catch {
      // Graceful fallback
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "digivigee_cms_updated") {
        fetchSettings();
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      channel?.close();
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <footer
      style={{
        backgroundColor: "#050B18",
        color: "var(--text-inverted)",
        paddingTop: "clamp(4rem, 6.5vw, 6rem)",
        paddingBottom: "var(--space-8)",
        borderTop: "1.5px solid rgba(0, 208, 83, 0.35)",
        position: "relative",
        overflow: "hidden",
      }}
      className="bg-tech-circuit-dark"
    >
      {/* Top Luminous Ambient Horizon Beam */}
      <div
        className="luminous-horizon-beam"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2,
        }}
      />

      {/* Top Ambient Glow Orb */}
      <div
        style={{
          position: "absolute",
          top: "-150px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "350px",
          background: "radial-gradient(ellipse at 50% 0%, rgba(0, 208, 83, 0.22), rgba(56, 189, 248, 0.08) 50%, transparent 75%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <Container size="wide">
        {/* Newsletter Subscription Bar */}
        <div
          style={{
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            paddingBottom: "var(--space-8)",
            marginBottom: "var(--space-12)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--space-6)",
          }}
        >
          <NewsletterSubscription source="Website Footer" variant="footer" />
        </div>

        {/* Main 5-Column Grid */}
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1.25fr 1fr 1.35fr",
            gap: "clamp(2rem, 3.5vw, 3rem)",
            marginBottom: "var(--space-12)",
          }}
        >
          {/* Column 1: Brand Info & Socials */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <Logo variant="light" size="md" tagline={settings.tagline} />
            <p
              style={{
                fontSize: "var(--text-body-sm)",
                color: "var(--text-inverted-muted)",
                lineHeight: 1.7,
                maxWidth: "320px",
                fontFamily: "var(--font-sans)",
              }}
            >
              {settings.footerContent?.aboutText ||
                "We help ambitious businesses build an authoritative presence, scale performance marketing, and generate high-intent customer inquiries with measurable ROI."}
            </p>

            {/* Social Icons with Luxury Glow Hover */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.5rem" }}>
              {/* Facebook */}
              <a
                href={settings.socials?.facebook || SITE_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-inverted)",
                  transition: "all var(--transition-fast)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--brand-blue-600)";
                  e.currentTarget.style.borderColor = "var(--brand-blue-400)";
                  e.currentTarget.style.boxShadow = "var(--shadow-glow-blue)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href={settings.socials?.instagram || SITE_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-inverted)",
                  transition: "all var(--transition-fast)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#E1306C";
                  e.currentTarget.style.borderColor = "#E1306C";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(225, 48, 108, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={settings.socials?.linkedin || SITE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-inverted)",
                  transition: "all var(--transition-fast)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#0A66C2";
                  e.currentTarget.style.borderColor = "#0A66C2";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(10, 102, 194, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href={settings.socials?.youtube || SITE_CONFIG.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-inverted)",
                  transition: "all var(--transition-fast)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FF0000";
                  e.currentTarget.style.borderColor = "#FF0000";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(255, 0, 0, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Columns 2, 3, 4: Dynamic Link Columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} style={{ display: "flex", flexDirection: "column" }}>
              <h3
                style={{
                  fontSize: "var(--text-body)",
                  fontWeight: 800,
                  color: "#ffffff",
                  marginBottom: "var(--space-4)",
                  letterSpacing: "-0.01em",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {col.title}
              </h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="footer-link"
                      style={{
                        fontSize: "var(--text-body-sm)",
                        color: "var(--text-inverted-muted)",
                        transition: "all var(--transition-fast)",
                        fontFamily: "var(--font-sans)",
                        fontWeight: 500,
                        display: "inline-block",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 5: Contact Us */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h3
              style={{
                fontSize: "var(--text-body)",
                fontWeight: 800,
                color: "#ffffff",
                marginBottom: "var(--space-4)",
                letterSpacing: "-0.01em",
                fontFamily: "var(--font-sans)",
              }}
            >
              Contact Us
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {/* Phone */}
              <li style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "rgba(0, 82, 255, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--brand-blue-400)",
                    flexShrink: 0,
                  }}
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <a
                  href={`tel:${settings.contact?.phone || SITE_CONFIG.contact.phone}`}
                  style={{ fontSize: "var(--text-body-sm)", color: "var(--text-inverted-muted)", fontFamily: "var(--font-sans)", fontWeight: 600 }}
                >
                  {settings.contact?.phone || SITE_CONFIG.contact.phone}
                </a>
              </li>

              {/* Email */}
              <li style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "rgba(0, 208, 83, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--brand-green-400)",
                    flexShrink: 0,
                  }}
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <a
                  href={`mailto:${settings.contact?.email || SITE_CONFIG.contact.email}`}
                  style={{ fontSize: "var(--text-body-sm)", color: "var(--text-inverted-muted)", fontFamily: "var(--font-sans)", fontWeight: 600 }}
                >
                  {settings.contact?.email || SITE_CONFIG.contact.email}
                </a>
              </li>

              {/* Address */}
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "rgba(0, 82, 255, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--brand-blue-400)",
                    flexShrink: 0,
                    marginTop: "0.15rem",
                  }}
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span style={{ fontSize: "var(--text-body-sm)", color: "var(--text-inverted-muted)", lineHeight: 1.5, fontFamily: "var(--font-sans)" }}>
                  {settings.contact?.address || SITE_CONFIG.contact.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar Divider */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "var(--space-6)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--space-4)",
            fontSize: "var(--text-caption)",
            color: "var(--text-inverted-muted)",
            fontFamily: "var(--font-sans)",
          }}
        >
          <div>
            {settings.footerContent?.copyrightText ||
              `© ${currentYear} ${settings.siteName || SITE_CONFIG.name}. All Rights Reserved.`}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <span>Engineered with</span>
            <span style={{ color: "var(--brand-green-400)" }}>⚡</span>
            <span>for high-growth digital scale</span>
          </div>
        </div>
      </Container>

      <style>{`
        .footer-link:hover {
          color: var(--brand-green-400) !important;
        }
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: var(--space-8) !important;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: var(--space-8) !important;
          }
        }
      `}</style>
    </footer>
  );
}
