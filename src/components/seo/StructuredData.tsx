import React from "react";
import { JsonLd } from "./JsonLd";
import { SITE_CONFIG } from "@/config/site";
import { ServiceItem } from "@/types";

/**
 * Global Physician & Medical Clinic JSON-LD Schema.
 * Formatted to Google Healthcare Knowledge Graph and Medical Schema guidelines.
 */
export function GlobalStructuredData() {
  const physicianSchema = {
    "@context": "https://schema.org",
    "@type": ["Physician", "MedicalBusiness"],
    "@id": `${SITE_CONFIG.url}/#physician`,
    name: "Dr. Noopur Patel",
    jobTitle: "Consultant Breast Cancer & Oncoplastic Surgeon",
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}/images/doctor/assets/dr-noopur-hd.jpg`,
    medicalSpecialty: [
      "https://schema.org/Oncologic",
      "https://schema.org/Surgical",
    ],
    availableService: [
      {
        "@type": "MedicalProcedure",
        name: "Breast Cancer Surgery",
      },
      {
        "@type": "MedicalProcedure",
        name: "Oncoplastic Breast Surgery",
      },
      {
        "@type": "MedicalProcedure",
        name: "Breast Conservation Surgery (BCS)",
      },
      {
        "@type": "MedicalProcedure",
        name: "Breast Reconstruction Surgery",
      },
      {
        "@type": "MedicalProcedure",
        name: "Benign Breast Disease Evaluation & Excision",
      },
    ],
    hospitalAffiliation: {
      "@type": "Hospital",
      name: "Marengo CIMS Hospital",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Off Science City Road, Sola",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        postalCode: "380060",
        addressCountry: "IN",
      },
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Marengo CIMS Hospital, Off Science City Road, Sola",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "380060",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "23.0768",
      longitude: "72.5085",
    },
    telephone: SITE_CONFIG.contact.phoneFormatted,
    email: SITE_CONFIG.contact.email,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      SITE_CONFIG.socials.instagram,
      SITE_CONFIG.socials.facebook,
      SITE_CONFIG.socials.youtube,
      SITE_CONFIG.socials.linkedin,
    ],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: "Dr. Noopur Patel | Breast Cancer Surgeon Ahmedabad",
    description: SITE_CONFIG.tagline,
    publisher: {
      "@id": `${SITE_CONFIG.url}/#physician`,
    },
  };

  return <JsonLd schema={[physicianSchema, webSiteSchema]} />;
}

/**
 * Service JSON-LD Schema for clinical procedures.
 */
export function ServiceStructuredData({ service }: { service: ServiceItem }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.title,
    description: service.shortDescription,
    procedureType: "https://schema.org/SurgicalProcedure",
    provider: {
      "@type": "Physician",
      name: "Dr. Noopur Patel",
      url: SITE_CONFIG.url,
      hospitalAffiliation: "Marengo CIMS Hospital, Ahmedabad",
    },
    bodyLocation: "Breast",
  };

  return <JsonLd schema={schema} />;
}

export interface BreadcrumbItemSchema {
  name: string;
  url?: string;
  href?: string;
}

/**
 * BreadcrumbList JSON-LD Schema.
 */
export function BreadcrumbStructuredData({ items }: { items: BreadcrumbItemSchema[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: (items || []).map((item, index) => {
      const link = item.url || item.href || "/";
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: link.startsWith("http") ? link : `${SITE_CONFIG.url}${link}`,
      };
    }),
  };

  return <JsonLd schema={schema} />;
}

export interface FAQItemSchema {
  question: string;
  answer: string;
}

/**
 * FAQPage JSON-LD Schema for patient educational queries.
 */
export function FAQStructuredData({ faqs }: { faqs: FAQItemSchema[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (faqs || []).map((faq) => ({
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
