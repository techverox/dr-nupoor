import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalSpotlightGrid from "@/components/GlobalSpotlightGrid";
import { getCmsSiteSettings, getCmsPageContent } from "@/lib/services/cmsService";
import { SITE_CONFIG } from "@/config/site";
import { resolveDynamicPageMetadata } from "@/lib/seo/metadata";

// Modular Minimalist Contact Components
import ContactHero from "@/components/contact/ContactHero";
import ContactTelemetryStrip from "@/components/contact/ContactTelemetryStrip";
import ContactUnifiedHub from "@/components/contact/ContactUnifiedHub";
import ContactProcessRoadmap from "@/components/contact/ContactProcessRoadmap";
import ContactFaqSection from "@/components/contact/ContactFaqSection";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  return resolveDynamicPageMetadata("/contact", {
    title: "Contact Growth Pods & 24/7 Strategy Consultation | DigiVigee",
    description:
      "Connect with DigiVigee's senior strategy directors and product architects. 24/7 priority line: +91 90811 45178. Request an ad audit, RestroMitra demo, or Maru Gujarat listing.",
    path: "/contact",
    keywords: [
      "contact DigiVigee",
      "digital marketing consultation Gujarat",
      "RestroMitra demo booking",
      "Maru Gujarat merchant listing",
      "Meta Business Partner consultation",
      "DigiVigee phone number",
      "DigiVigee Chhapi address",
    ],
  });
}

interface PageProps {
  searchParams?: Promise<{ product?: string; service?: string; type?: string }>;
}

export default async function ContactPage({ searchParams }: PageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const product = resolvedParams?.product;
  const service = resolvedParams?.service;

  const [settings, contactContent] = await Promise.all([
    getCmsSiteSettings(),
    getCmsPageContent("contact"),
  ]);

  const phone = contactContent?.phone || SITE_CONFIG.contact.phone;
  const email = contactContent?.email || SITE_CONFIG.contact.email;
  const address = contactContent?.address || SITE_CONFIG.contact.address;
  const workingHours = contactContent?.workingHours || SITE_CONFIG.contact.workingHours;

  // Google ContactPage & LocalBusiness Schema JSON-LD
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "DigiVigee Strategy Consultation & Contact Desk",
    description:
      "Direct communication desk for DigiVigee's proprietary SaaS platforms, digital tools ecosystem, and Meta Partner performance marketing.",
    url: `${SITE_CONFIG.url}/contact`,
    mainEntity: {
      "@type": "LocalBusiness",
      name: "DigiVigee",
      image: `${SITE_CONFIG.url}/images/og-image.jpg`,
      telephone: phone,
      email: email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Orchid Complex, Office No. B, Door No. D-23, Approach Road / Pirojpura Road",
        addressLocality: "Chhapi",
        addressRegion: "Gujarat",
        postalCode: "385210",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "24.0175",
        longitude: "72.4172",
      },
      openingHours: "Mo-Su 00:00-23:59",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: phone,
          contactType: "customer support",
          email: email,
          availableLanguage: ["English", "Hindi", "Gujarati"],
          hoursAvailable: "Mo-Su 00:00-23:59",
        },
      ],
    },
  };

  return (
    <div className="relative min-h-screen bg-[#FCFDFD] text-slate-900 selection:bg-emerald-500/20 selection:text-emerald-900">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <GlobalSpotlightGrid />
      <Navbar />

      {/* 1. Atmospheric Light-First Minimalist Hero with Live Status */}
      <ContactHero product={product} service={service} content={contactContent} />

      {/* 2. Real-Time Telemetry & SLA Strip */}
      <ContactTelemetryStrip />

      {/* 3. The Unified Command Center (Direct Channels + Integrated Google Map + Form) */}
      <ContactUnifiedHub
        phone={phone}
        email={email}
        address={address}
        workingHours={workingHours}
        initialProduct={product}
        initialService={service}
      />

      {/* 4. 3-Step Execution Transparency Roadmap */}
      <ContactProcessRoadmap />

      {/* 5. Consultative FAQ Accordion */}
      <ContactFaqSection />

      <Footer />
    </div>
  );
}
