import React from "react";
import { JsonLd } from "./JsonLd";
import { SITE_CONFIG } from "@/config/site";
import { ServiceItem, BlogPost } from "@/types";

/**
 * Global Organization & WebSite JSON-LD Schema.
 */
export function GlobalStructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/doctor/assets/logo.png`,
    description: SITE_CONFIG.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Orchid Complex, Office No. B, Door No. D-23, Approach Road / Pirojpura Road",
      addressLocality: "Chhapi, Banaskantha",
      addressRegion: "Gujarat",
      postalCode: "385210",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.contact.phoneFormatted,
      contactType: "customer service",
      email: SITE_CONFIG.contact.email,
      availableLanguage: ["English", "Hindi", "Gujarati"],
    },
    sameAs: [
      SITE_CONFIG.socials.facebook,
      SITE_CONFIG.socials.instagram,
      SITE_CONFIG.socials.linkedin,
      SITE_CONFIG.socials.twitter,
      SITE_CONFIG.socials.youtube,
    ],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.tagline,
    publisher: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return <JsonLd schema={[organizationSchema, webSiteSchema]} />;
}

/**
 * Service JSON-LD Schema for service detail pages.
 */
export function ServiceStructuredData({ service }: { service: ServiceItem }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    provider: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    serviceType: "Digital Marketing",
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    hasOfferCatalog: service.packages
      ? {
          "@type": "OfferCatalog",
          name: `${service.title} Packages`,
          itemListElement: service.packages.map((pkg) => ({
            "@type": "Offer",
            name: pkg.name,
            description: pkg.description,
            price: pkg.price,
            priceCurrency: "INR",
          })),
        }
      : undefined,
  };

  return <JsonLd schema={schema} />;
}

/**
 * Article JSON-LD Schema for blog posts.
 */
export function ArticleStructuredData({ post }: { post: BlogPost }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt || post.createdAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/images/doctor/assets/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/blog/${post.slug}`,
    },
    keywords: post.tags?.join(", "),
  };

  return <JsonLd schema={schema} />;
}

/**
 * FAQPage JSON-LD Schema for FAQs sections.
 */
export function FAQStructuredData({
  faqs,
}: {
  faqs: Array<{ question: string; answer: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return <JsonLd schema={schema} />;
}

/**
 * BreadcrumbList JSON-LD Schema.
 */
export function BreadcrumbStructuredData({
  items,
}: {
  items: Array<{ name: string; href: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.href}`,
    })),
  };

  return <JsonLd schema={schema} />;
}
