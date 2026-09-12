import React from "react";
import Link from "next/link";
import { BreadcrumbStructuredData } from "@/components/seo/StructuredData";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const schemaItems = [
    { name: "Home", href: "/" },
    ...items.map((i) => ({ name: i.label, href: i.href || "" })),
  ];

  return (
    <>
      <BreadcrumbStructuredData items={schemaItems} />
      <nav
        aria-label="Breadcrumbs"
        className={`digivigee-breadcrumbs ${className}`}
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
          fontSize: "0.875rem",
          color: "var(--text-muted)",
          marginBottom: "var(--space-6)",
          fontFamily: "var(--font-sans)",
        }}
      >
        <Link
          href="/"
          style={{
            color: "var(--text-body)",
            fontWeight: 500,
            transition: "color var(--transition-fast)",
          }}
        >
          Home
        </Link>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <span style={{ color: "var(--surface-border)" }} aria-hidden="true">
                /
              </span>
              {isLast || !item.href ? (
                <span
                  style={{
                    color: "var(--brand-navy-900)",
                    fontWeight: 600,
                  }}
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  style={{
                    color: "var(--text-body)",
                    fontWeight: 500,
                    transition: "color var(--transition-fast)",
                  }}
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}
