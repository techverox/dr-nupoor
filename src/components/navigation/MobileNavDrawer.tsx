"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HEADER_NAV_LINKS } from "@/config/navigation";
import { SITE_CONFIG } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { LinkButton } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
  const pathname = usePathname();
  const [servicesExpanded, setServicesExpanded] = useState(
    pathname.startsWith("/services")
  );
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer upon pathname change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Handle ESC key and body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      id="mobile-navigation-drawer"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: "var(--z-drawer-backdrop)" as unknown as number,
      }}
    >
      {/* Backdrop with click-to-dismiss */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(3, 7, 18, 0.75)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          transition: "opacity var(--transition-normal)",
        }}
      />

      {/* Slide-out Drawer Panel */}
      <div
        ref={drawerRef}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          maxWidth: "360px",
          backgroundColor: "var(--surface-white)",
          boxShadow: "var(--shadow-xl)",
          display: "flex",
          flexDirection: "column",
          zIndex: "var(--z-drawer)" as unknown as number,
          overflowY: "auto",
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--surface-border)",
            backgroundColor: "var(--surface-white)",
          }}
        >
          <Logo size="sm" showTagline={false} asLink={false} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "var(--radius-md)",
              color: "var(--brand-navy-900)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--surface-subtle)",
              border: "1px solid var(--surface-border)",
              cursor: "pointer",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "1.25rem 1rem",
            gap: "0.375rem",
            flex: 1,
          }}
          aria-label="Mobile Main Navigation"
        >
          {HEADER_NAV_LINKS.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            if (!hasChildren) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive ? "page" : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    minHeight: "48px",
                    padding: "0.75rem 1rem",
                    borderRadius: "var(--radius-md)",
                    fontSize: "1rem",
                    fontWeight: isActive ? 800 : 600,
                    color: isActive ? "var(--brand-blue-600)" : "var(--text-heading)",
                    backgroundColor: isActive ? "var(--brand-blue-50)" : "transparent",
                    fontFamily: "var(--font-sans)",
                    textDecoration: "none",
                    borderLeft: isActive ? "3px solid var(--brand-blue-500)" : "3px solid transparent",
                  }}
                >
                  {item.label}
                </Link>
              );
            }

            // Services accordion disclosure item
            return (
              <div key={item.href} style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: isActive ? "var(--brand-blue-50)" : "transparent",
                    borderLeft: isActive ? "3px solid var(--brand-blue-500)" : "3px solid transparent",
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      minHeight: "48px",
                      padding: "0.75rem 1rem",
                      fontSize: "1rem",
                      fontWeight: isActive ? 800 : 600,
                      color: isActive ? "var(--brand-blue-600)" : "var(--text-heading)",
                      textDecoration: "none",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {item.label}
                  </Link>

                  <button
                    type="button"
                    onClick={() => setServicesExpanded((prev) => !prev)}
                    aria-expanded={servicesExpanded}
                    aria-label={`Toggle ${item.label} submenu`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "48px",
                      height: "48px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: isActive ? "var(--brand-blue-600)" : "var(--text-body)",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      style={{
                        transform: servicesExpanded ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform var(--transition-fast)",
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </div>

                {servicesExpanded && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingLeft: "0.75rem",
                      marginTop: "0.25rem",
                      gap: "0.25rem",
                      borderLeft: "2px solid var(--brand-blue-200)",
                      marginLeft: "1rem",
                    }}
                  >
                    {item.children?.map((child, cIdx) => {
                      const isChildActive = pathname === child.href;
                      const isEven = cIdx % 2 === 0;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          aria-current={isChildActive ? "page" : undefined}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            minHeight: "44px",
                            padding: "0.5rem 0.75rem",
                            fontSize: "0.9375rem",
                            fontWeight: isChildActive ? 700 : 500,
                            color: isChildActive
                              ? "var(--brand-blue-600)"
                              : "var(--text-heading)",
                            backgroundColor: isChildActive
                              ? isEven ? "var(--brand-blue-50)" : "var(--brand-green-50)"
                              : "transparent",
                            borderRadius: "var(--radius-sm)",
                            fontFamily: "var(--font-sans)",
                            textDecoration: "none",
                          }}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Drawer Action CTAs (Pinned at bottom) */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderTop: "1px solid var(--surface-border)",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            backgroundColor: "var(--surface-subtle)",
          }}
        >
          <LinkButton
            href={SITE_CONFIG.cta.primaryHref}
            variant="brand"
            size="md"
            fullWidth
            onClick={onClose}
            rightIcon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            }
          >
            {SITE_CONFIG.cta.primaryText}
          </LinkButton>

          <WhatsAppButton variant="inline" label="Chat on WhatsApp" />
        </div>
      </div>
    </div>
  );
}
