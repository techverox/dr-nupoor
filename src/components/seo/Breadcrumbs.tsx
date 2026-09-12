import React from "react";
import Link from "next/link";
import { BreadcrumbStructuredData } from "./StructuredData";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [{ name: "Home", href: "/" }, ...items];

  return (
    <>
      {/* Embedded JSON-LD Schema */}
      <BreadcrumbStructuredData items={allItems} />

      {/* Visual Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className={`breadcrumbs-nav ${className}`}
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
          fontSize: "0.8125rem",
          color: "var(--text-muted)",
          marginBottom: "1rem",
        }}
      >
        <ol
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {allItems.map((item, idx) => {
            const isLast = idx === allItems.length - 1;

            return (
              <li
                key={item.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                {isLast ? (
                  <span
                    aria-current="page"
                    style={{
                      fontWeight: 600,
                      color: "var(--brand-navy)",
                      maxWidth: "280px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.href}
                      style={{
                        color: "var(--text-secondary)",
                        textDecoration: "none",
                        transition: "color var(--transition-fast)",
                      }}
                    >
                      {item.name}
                    </Link>
                    <span style={{ color: "var(--border-strong)", userSelect: "none" }} aria-hidden="true">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
