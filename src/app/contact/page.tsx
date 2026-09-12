import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalSpotlightGrid from "@/components/GlobalSpotlightGrid";
import { SITE_CONFIG } from "@/config/site";
import { resolveDynamicPageMetadata } from "@/lib/seo/metadata";

// Modular Minimalist Contact Components
import ContactHero from "@/components/contact/ContactHero";
import ContactTelemetryStrip from "@/components/contact/ContactTelemetryStrip";
import ContactUnifiedHub from "@/components/contact/ContactUnifiedHub";
import ContactProcessRoadmap from "@/components/contact/ContactProcessRoadmap";
import ContactFaqSection from "@/components/contact/ContactFaqSection";
import { getCmsSiteSettings, getCmsPageContent, DEFAULT_SITE_SETTINGS, DEFAULT_CONTACT_PAGE_CONTENT } from "@/lib/services/cmsService";

export const revalidate = 60;

export async function generateMetadata() {
  return resolveDynamicPageMetadata("/contact", {
    title: "Contact DigiVigee | Strategy Consultation & Global Office Pods",
    description:
      "Schedule a strategy consultation call with our senior agency architects. Reach out via WhatsApp, direct line, email, or schedule a 1-on-1 discovery session.",
    path: "/contact",
    keywords: [
      "contact DigiVigee",
      "digital marketing consultation",
      "hire digital agency",
      "agency discovery call",
      "DigiVigee phone number",
      "DigiVigee Gujarat office",
    ],
  });
}

export default async function ContactPage() {
  let settings = DEFAULT_SITE_SETTINGS;
  let contactContent = DEFAULT_CONTACT_PAGE_CONTENT;

  try {
    const [fetchedSettings, fetchedContent] = await Promise.all([
      getCmsSiteSettings().catch(() => DEFAULT_SITE_SETTINGS),
      getCmsPageContent("contact").catch(() => DEFAULT_CONTACT_PAGE_CONTENT),
    ]);
    if (fetchedSettings) settings = fetchedSettings;
    if (fetchedContent) contactContent = fetchedContent;
  } catch (err) {
    console.warn("[ContactPage:Hydration] Fallback:", err);
  }

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
      <Suspense fallback={null}>
        <ContactHero content={contactContent} />
      </Suspense>

      {/* 2. Real-Time Telemetry & SLA Strip */}
      <ContactTelemetryStrip />

      {/* 3. The Unified Command Center (Direct Channels + Integrated Google Map + Form) */}
      <Suspense fallback={null}>
        <ContactUnifiedHub
          phone={phone}
          email={email}
          address={address}
          workingHours={workingHours}
        />
      </Suspense>

      {/* 4. 3-Step Execution Transparency Roadmap */}
      <ContactProcessRoadmap />

      {/* 5. Consultative FAQ Accordion */}
      <ContactFaqSection />

      <Footer />
    </div>
  );
}
