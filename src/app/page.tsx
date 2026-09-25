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
import MedicalGallerySection from "@/components/doctor/MedicalGallerySection";
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
          url: `${SITE_CONFIG.url}/images/doctor/assets/hero-doctor.png`,
          width: 1200,
          height: 630,
          alt: "Dr. Noopur Patel - Best Breast Surgeon in Ahmedabad",
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

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#D84C70]/20 selection:text-[#9B2846]">
      {/* 01. Header / Navigation */}
      <DoctorNavbar />

      <main className="flex-1">
        {/* 02. Hero Section */}
        <DoctorHero
          badge="BREAST CANCER & BREAST SURGERY"
          headline="Specialised"
          headlineHighlight="Breast Cancer Care, With a Patient-First Approach"
          subheadline="Dr. Noopur Patel provides specialised care for breast cancer and other breast conditions, with a focus on personalised evaluation, surgical treatment planning and breast surgery."
          primaryCtaText="Book a Consultation"
          primaryCtaLink="/appointments"
          secondaryCtaText="WhatsApp"
          secondaryCtaLink={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}`}
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

        {/* 11. Medical Gallery (4 Categories Bento Grid + Lightbox Modal) */}
        <MedicalGallerySection />

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

