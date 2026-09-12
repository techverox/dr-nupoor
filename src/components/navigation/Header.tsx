"use client";

import React, { useState, useEffect } from "react";
import { HEADER_NAV_LINKS } from "@/config/navigation";
import { SITE_CONFIG } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { LinkButton } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { NavItem } from "./NavItem";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { SiteSettings } from "@/types";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setSettings] = useState<Partial<SiteSettings>>({
    siteName: SITE_CONFIG.name,
    tagline: SITE_CONFIG.tagline,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      } catch {}
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
    } catch {}

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

  const handleOpenMobileMenu = React.useCallback(() => {
    setIsMobileMenuOpen(true);
  }, []);

  const handleCloseMobileMenu = React.useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <header
        role="banner"
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          padding: isScrolled ? "0.6rem 1rem" : "0.85rem 1rem",
          backgroundColor: "transparent",
          pointerEvents: "none",
          transition: "padding 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          className="floating-nav-island"
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.88)" : "rgba(255, 255, 255, 0.82)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: isScrolled ? "1px solid rgba(0, 208, 83, 0.3)" : "1px solid rgba(0, 0, 0, 0.08)",
            borderRadius: "9999px",
            boxShadow: isScrolled
              ? "0 16px 36px -8px rgba(15, 23, 42, 0.08), 0 0 20px rgba(0, 208, 83, 0.1)"
              : "0 4px 20px -2px rgba(15, 23, 42, 0.04)",
            padding: "0.1rem 1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pointerEvents: "auto",
            transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* 1. Brand Logo (Left) */}
          <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <Logo
              size="md"
              tagline={SITE_CONFIG.tagline}
            />
          </div>

          {/* 2. Main Navigation (Center) */}
          <nav
            className="desktop-nav"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
            aria-label="Main Navigation"
          >
            {HEADER_NAV_LINKS.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </nav>

          {/* 3. Action CTAs (Right) */}
          <div
            className="desktop-actions"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              flexShrink: 0,
            }}
          >
            {/* Primary Consultation CTA */}
            <LinkButton
              href={SITE_CONFIG.cta.primaryHref}
              variant="primary"
              size="sm"
              style={{
                height: "40px",
                padding: "0 1.25rem",
                fontSize: "0.84375rem",
                fontWeight: 800,
                background: "linear-gradient(135deg, #00D053 0%, #059669 100%)",
                borderRadius: "9999px",
                boxShadow: "0 4px 14px rgba(0, 208, 83, 0.35)",
                fontFamily: "var(--font-sans)",
              }}
              rightIcon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              }
            >
              Claim Growth Plan
            </LinkButton>
          </div>

          {/* Mobile / Tablet Actions & Hamburger Toggle */}
          <div
            className="mobile-toggle"
            style={{
              display: "none",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <WhatsAppButton variant="icon-only" />

            <button
              type="button"
              onClick={handleOpenMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label="Open mobile navigation"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "38px",
                height: "38px",
                borderRadius: "9999px",
                border: "1px solid rgba(0, 0, 0, 0.08)",
                backgroundColor: "rgba(0, 0, 0, 0.03)",
                color: "var(--brand-navy-900)",
                cursor: "pointer",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .desktop-nav,
            .desktop-actions {
              display: none !important;
            }
            .mobile-toggle {
              display: flex !important;
            }
          }
        `}</style>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={handleCloseMobileMenu}
      />
    </>
  );
}
