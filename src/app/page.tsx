import React from "react";
import type { Metadata } from "next";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import DoctorHero from "@/components/doctor/DoctorHero";
import TrustStrip from "@/components/doctor/TrustStrip";
import DoctorAboutSpotlight from "@/components/doctor/DoctorAboutSpotlight";
import BreastConditionsGrid from "@/components/doctor/BreastConditionsGrid";
import BreastCancerTreatments from "@/components/doctor/BreastCancerTreatments";
import WhyChooseDoctor from "@/components/doctor/WhyChooseDoctor";
import FeaturedProceduresSection from "@/components/doctor/FeaturedProceduresSection";
import CareJourneyTimeline from "@/components/doctor/CareJourneyTimeline";
import InstagramAwarenessFeed from "@/components/doctor/InstagramAwarenessFeed";
import CommunityInitiativesSection from "@/components/doctor/CommunityInitiativesSection";
import PatientStoriesSection from "@/components/doctor/PatientStoriesSection";
import DoctorFaqAccordion from "@/components/doctor/DoctorFaqAccordion";
import ClinicLocationSection from "@/components/doctor/ClinicLocationSection";
import HopeCtaBanner from "@/components/doctor/HopeCtaBanner";
import DoctorFooter from "@/components/doctor/DoctorFooter";
import {
  getCmsTestimonials,
  getCmsFaqs,
} from "@/lib/services/cmsService";
import { TESTIMONIALS_DATA } from "@/data/testimonials";
import { FAQS_DATA } from "@/data/faqs";
import { getSeoPageData } from "@/data/seoKeywordMap";
import { SITE_CONFIG } from "@/config/site";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const homeSeo = getSeoPageData("home");
  const title = homeSeo?.metaTitle || "Best Breast Surgeon in Ahmedabad | Dr. Noopur Patel";
  const description =
    homeSeo?.metaDescription ||
    "Dr. Noopur Patel is a Breast Cancer Surgeon and Oncoplastic Specialist at Marengo CIMS Hospital, Ahmedabad. Specialised breast cancer surgery and compassionate care.";

  return {
    title: {
      absolute: title,
    },
    description,
    keywords: homeSeo ? [homeSeo.targetKeyword, ...homeSeo.secondaryKeywords] : [],
    alternates: {
      canonical: SITE_CONFIG.url,
    },
    openGraph: {
      title,
      description,
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: `${SITE_CONFIG.url}/images/doctor/optimized/dr-noopur-patel-hero-portrait.webp`,
          width: 1200,
          height: 630,
          alt: "Dr. Nupur Patel - Best Breast Cancer Surgeon in Ahmedabad",
        },
      ],
      type: "website",
    },
  };
}

export default async function Home() {
  let testimonials = TESTIMONIALS_DATA;
  let faqs = FAQS_DATA;

  try {
    const [cmsTestimonials, cmsFaqs] = await Promise.all([
      getCmsTestimonials().catch(() => TESTIMONIALS_DATA),
      getCmsFaqs().catch(() => FAQS_DATA),
    ]);

    if (cmsTestimonials && cmsTestimonials.length > 0) testimonials = cmsTestimonials;
    if (cmsFaqs && cmsFaqs.length > 0) faqs = cmsFaqs;
  } catch (e) {
    console.warn("[Home] Using resilient clinical seed data:", e);
  }

  // Comprehensive JSON-LD Schema for Ahmedabad Google Local SEO & Rich Snippets
  const physicianSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: "Dr. Nupur Patel",
    alternateName: ["Dr. Noopur Patel", "Dr Nupur Patel Breast Surgeon Ahmedabad"],
    jobTitle: "Associate Consultant – Surgical Breast Oncology",
    description:
      "Dr. Nupur Patel is an expert Breast Cancer Surgeon & Oncoplastic Specialist at Marengo CIMS Hospital, Ahmedabad. Specialised in breast cancer surgery, breast conservation (BCS), mastectomy, and benign breast lumps.",
    medicalSpecialty: [
      "Surgical Oncology",
      "Breast Cancer Surgery",
      "Oncoplastic Breast Surgery",
      "Mammography Screening & Biopsy"
    ],
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}/images/doctor/optimized/dr-noopur-patel-hero-portrait.webp`,
    telephone: SITE_CONFIG.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Off Science City Road, Sola",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "380060",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "23.0725",
      longitude: "72.5165",
    },
    worksFor: {
      "@type": "Hospital",
      name: "Marengo CIMS Hospital",
      address: "Off Science City Road, Sola, Ahmedabad, Gujarat 380060",
    },
    hospitalAffiliation: {
      "@type": "Hospital",
      name: "Marengo CIMS Hospital",
    },
    areaServed: [
      { "@type": "City", name: "Ahmedabad" },
      { "@type": "AdministrativeArea", name: "Gujarat" },
      { "@type": "Place", name: "Sola" },
      { "@type": "Place", name: "Science City Road" },
      { "@type": "Place", name: "SG Highway" },
    ],
    openingHours: "Mo-Sa 10:00-18:00",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.slice(0, 10).map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#D84C70]/20 selection:text-[#9B2846]">
      {/* Schema Injection for Google Search & Ahmedabad Local Ranking */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 01. Header / Navigation */}
      <DoctorNavbar />

      <main className="flex-1">
        {/* 02. Hero Section */}
        <DoctorHero
          badge="SURGICAL BREAST ONCOLOGY · BREAST CANCER SPECIALIST"
          headline="Surgical Breast Oncology"
          headlineHighlight="& Advanced Breast Cancer Surgery in Ahmedabad"
          subheadline="Dr. Nupur Patel provides specialised surgical breast oncology, oncoplastic breast surgery, and compassionate care for breast cancer and benign breast conditions at Marengo CIMS Hospital, Ahmedabad."
          primaryCtaText="Book a Consultation"
          primaryCtaLink="/appointments"
          secondaryCtaText="Consult on WhatsApp"
          secondaryCtaLink={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=Hello%20Dr.%20Nupur%20Patel,%20I%20would%20like%20to%20schedule%20a%20consultation.`}
        />

        {/* 03. Doctor Trust / Credentials Strip */}
        <TrustStrip />

        {/* 04. About Dr. Noopur Patel */}
        <DoctorAboutSpotlight />

        {/* 05. Breast Conditions We Treat (6 Condition Cards) */}
        <BreastConditionsGrid />

        {/* 06. Breast Cancer Treatment & Surgery in Ahmedabad */}
        <BreastCancerTreatments />

        {/* 07. Why Choose Dr. Noopur Patel (Personalised Care Approach) */}
        <WhyChooseDoctor />

        {/* 08. Featured / Specialised Advanced Procedures */}
        <FeaturedProceduresSection />

        {/* 09. Breast Cancer Treatment Journey (7-Step Interactive Timeline) */}
        <CareJourneyTimeline />

        {/* 10. Instagram — Latest Reels */}
        <InstagramAwarenessFeed />

        {/* 11. Cancer Patient Support Group, Screening Camps & Awareness Sessions */}
        <CommunityInitiativesSection />

        {/* 12. Patient Testimonials (What Our Patients Say) */}
        <PatientStoriesSection testimonials={testimonials} />

        {/* 13. Frequently Asked Questions */}
        <DoctorFaqAccordion faqs={faqs} />

        {/* 14. Location / Clinic Information with Google Map */}
        <ClinicLocationSection />

        {/* 15. Final Appointment CTA Banner */}
        <HopeCtaBanner />
      </main>

      {/* 16. Global Footer */}
      <DoctorFooter />
    </div>
  );
}

