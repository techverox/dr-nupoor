import React from "react";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import DoctorHero from "@/components/doctor/DoctorHero";
import EarlyDetectionSection from "@/components/doctor/EarlyDetectionSection";
import ComprehensiveServicesGrid from "@/components/doctor/ComprehensiveServicesGrid";
import BreastAnatomySection from "@/components/doctor/BreastAnatomySection";
import TreatmentOptionsGrid from "@/components/doctor/TreatmentOptionsGrid";
import DoctorAboutSpotlight from "@/components/doctor/DoctorAboutSpotlight";
import CareJourneyTimeline from "@/components/doctor/CareJourneyTimeline";
import InstagramAwarenessFeed from "@/components/doctor/InstagramAwarenessFeed";
import PatientStoriesSection from "@/components/doctor/PatientStoriesSection";
import DoctorFaqAccordion from "@/components/doctor/DoctorFaqAccordion";
import HopeCtaBanner from "@/components/doctor/HopeCtaBanner";
import TrustStrip from "@/components/doctor/TrustStrip";
import HospitalAffiliationBanner from "@/components/doctor/HospitalAffiliationBanner";
import DoctorFooter from "@/components/doctor/DoctorFooter";
import {
  getCmsServices,
  getCmsTestimonials,
  getCmsFaqs,
  getCmsPageContent,
  DEFAULT_HOME_PAGE_CONTENT,
} from "@/lib/services/cmsService";
import { SERVICES_DATA } from "@/data/services";
import { TESTIMONIALS_DATA } from "@/data/testimonials";
import { FAQS_DATA } from "@/data/faqs";

export const revalidate = 60;

export default async function Home() {
  let services = SERVICES_DATA;
  let testimonials = TESTIMONIALS_DATA;
  let faqs = FAQS_DATA;
  let homeContent = DEFAULT_HOME_PAGE_CONTENT;

  try {
    const [cmsServices, cmsTestimonials, cmsFaqs, cmsHomeContent] = await Promise.all([
      getCmsServices().catch((err) => {
        console.warn("[Home:services] Fallback:", err);
        return SERVICES_DATA;
      }),
      getCmsTestimonials().catch((err) => {
        console.warn("[Home:testimonials] Fallback:", err);
        return TESTIMONIALS_DATA;
      }),
      getCmsFaqs().catch((err) => {
        console.warn("[Home:faqs] Fallback:", err);
        return FAQS_DATA;
      }),
      getCmsPageContent("home").catch((err) => {
        console.warn("[Home:homeContent] Fallback:", err);
        return DEFAULT_HOME_PAGE_CONTENT;
      }),
    ]);

    if (cmsServices && cmsServices.length > 0) services = cmsServices;
    if (cmsTestimonials && cmsTestimonials.length > 0) testimonials = cmsTestimonials;
    if (cmsFaqs && cmsFaqs.length > 0) faqs = cmsFaqs;
    if (cmsHomeContent) homeContent = cmsHomeContent;
  } catch (e) {
    console.warn("[Home] Using resilient clinical seed data:", e);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#D84C70]/20 selection:text-[#9B2846]">
      {/* 1. Global Navigation Bar */}
      <DoctorNavbar />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <DoctorHero
          badge={homeContent.heroBadge}
          headline={homeContent.heroHeadline}
          headlineHighlight={homeContent.heroHeadlineHighlight}
          subheadline={homeContent.heroSubheadline}
          primaryCtaText={homeContent.primaryCtaText}
          primaryCtaLink={homeContent.primaryCtaLink}
          secondaryCtaText={homeContent.secondaryCtaText}
          secondaryCtaLink={homeContent.secondaryCtaLink}
        />

        {/* 3. Why Breast Health Matters / Early Detection Strip */}
        <EarlyDetectionSection />

        {/* 4. Comprehensive Services Grid */}
        <ComprehensiveServicesGrid services={services} />

        {/* 5. Know Your Breasts / Understanding Anatomy */}
        <BreastAnatomySection />

        {/* 6. Treatment Options Grid */}
        <TreatmentOptionsGrid />

        {/* 7. About Dr. Noopur Patel Spotlight */}
        <DoctorAboutSpotlight />

        {/* 8. Marengo CIMS Hospital Affiliation & Infrastructure */}
        <HospitalAffiliationBanner />

        {/* 9. Care Journey Timeline */}
        <CareJourneyTimeline />

        {/* 9. Latest from Instagram Feed */}
        <InstagramAwarenessFeed />

        {/* 10. Real Patient Stories */}
        <PatientStoriesSection testimonials={testimonials} />

        {/* 11. Frequently Asked Questions */}
        <DoctorFaqAccordion faqs={faqs} />

        {/* 12. Hope CTA Banner */}
        <HopeCtaBanner />

        {/* 13. Trust Strip */}
        <TrustStrip />
      </main>

      {/* 14. Global Footer */}
      <DoctorFooter />
    </div>
  );
}
