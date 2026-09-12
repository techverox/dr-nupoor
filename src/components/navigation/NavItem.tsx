"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "@/config/navigation";

export interface NavItemProps {
  item: NavLink;
  onNavigate?: () => void;
}

export function NavItem({ item, onNavigate }: NavItemProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Active state matching
  const isActive =
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href || pathname.startsWith(`${item.href}/`);

  const hasChildren = item.children && item.children.length > 0;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleBlur = (e: React.FocusEvent) => {
    if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  const getServiceIcon = (href: string) => {
    if (href.includes("social-media")) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      );
    }
    if (href.includes("performance-marketing")) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    }
    if (href.includes("content-creation")) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      );
    }
    if (href.includes("website-design")) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    }
    if (href.includes("seo")) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      );
    }
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    );
  };

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        onClick={onNavigate}
        aria-current={isActive ? "page" : undefined}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          padding: "0.5rem 0.875rem",
          fontSize: "0.9375rem",
          fontWeight: isActive ? 700 : 600,
          color: isActive ? "var(--brand-green-500)" : "var(--brand-navy-900)",
          transition: "color var(--transition-fast)",
          borderRadius: "var(--radius-sm)",
          fontFamily: "var(--font-sans)",
          outline: "none",
          textDecoration: "none",
        }}
      >
        <span>{item.label}</span>
        {isActive && (
          <span
            style={{
              position: "absolute",
              bottom: "0px",
              left: "0.875rem",
              right: "0.875rem",
              height: "2.5px",
              backgroundColor: "var(--brand-green-500)",
              borderRadius: "var(--radius-full)",
            }}
          />
        )}
      </Link>
    );
  }

  return (
    <div
      ref={dropdownRef}
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onBlur={handleBlur}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-current={isActive ? "page" : undefined}
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.375rem",
          padding: "0.5rem 0.875rem",
          fontSize: "0.9375rem",
          fontWeight: isActive ? 700 : 600,
          color: isActive ? "var(--brand-green-500)" : "var(--brand-navy-900)",
          cursor: "pointer",
          transition: "color var(--transition-fast)",
          borderRadius: "var(--radius-sm)",
          fontFamily: "var(--font-sans)",
          position: "relative",
          background: "none",
          border: "none",
          outline: "none",
        }}
      >
        <span>{item.label}</span>
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform var(--transition-fast)",
          }}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>

        {isActive && (
          <span
            style={{
              position: "absolute",
              bottom: "0px",
              left: "0.875rem",
              right: "0.875rem",
              height: "2.5px",
              backgroundColor: "var(--brand-green-500)",
              borderRadius: "var(--radius-full)",
            }}
          />
        )}
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label={`${item.label} submenu`}
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: "-1rem",
            width: "360px",
            backgroundColor: "#ffffff",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--surface-border)",
            boxShadow: "0 20px 40px -10px rgba(7, 15, 38, 0.15)",
            padding: "0.625rem",
            zIndex: "var(--z-dropdown)" as unknown as number,
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
            animation: "fadeIn var(--transition-fast) forwards",
          }}
        >
          {item.children?.map((child, idx) => {
            const isChildActive = pathname === child.href;
            const isBlue = idx % 2 === 0;
            return (
              <Link
                key={child.href}
                href={child.href}
                role="menuitem"
                onClick={() => {
                  setIsOpen(false);
                  onNavigate?.();
                }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  padding: "0.625rem 0.875rem",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: isChildActive
                    ? "var(--brand-green-50)"
                    : "transparent",
                  color: isChildActive
                    ? "var(--brand-green-600)"
                    : "var(--text-heading)",
                  transition: "all var(--transition-fast)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  if (!isChildActive) {
                    e.currentTarget.style.backgroundColor = "var(--surface-subtle)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isChildActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: isChildActive
                      ? "var(--brand-green-100)"
                      : isBlue
                      ? "var(--brand-blue-50)"
                      : "var(--brand-green-50)",
                    color: isBlue ? "var(--brand-blue-600)" : "var(--brand-green-600)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "0.1rem",
                    border: `1px solid ${isBlue ? "var(--brand-blue-200)" : "var(--brand-green-200)"}`,
                  }}
                >
                  {getServiceIcon(child.href)}
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--brand-navy-900)" }}>
                    {child.label}
                  </span>
                  {child.description && (
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-body)",
                        marginTop: "0.15rem",
                        lineHeight: 1.35,
                      }}
                    >
                      {child.description}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}

          {/* View All Services Link */}
          <div style={{ borderTop: "1px solid var(--surface-border)", marginTop: "0.35rem", paddingTop: "0.5rem" }}>
            <Link
              href="/services"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                onNavigate?.();
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.5rem 0.875rem",
                borderRadius: "var(--radius-md)",
                fontSize: "0.8125rem",
                fontWeight: 800,
                color: "var(--brand-green-600)",
                textDecoration: "none",
                backgroundColor: "var(--brand-green-50)",
              }}
            >
              <span>Explore All 6 Core Services</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
