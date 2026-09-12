import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GlobalSpotlightGrid from "@/components/GlobalSpotlightGrid";
import AgencyRolePillars from "@/components/AgencyRolePillars";
import CorePlatformSuite from "@/components/CorePlatformSuite";
import AgencyTeamsShowcase from "@/components/AgencyTeamsShowcase";
import Integrations from "@/components/Integrations";
import AgencyRoiComparison from "@/components/AgencyRoiComparison";
import LiveServicesShowcase from "@/components/public/LiveServicesShowcase";
import LivePortfolioShowcase from "@/components/public/LivePortfolioShowcase";
import LiveFaqAccordion from "@/components/public/LiveFaqAccordion";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import {
  getCmsServices,
  getCmsPortfolio,
  getCmsTestimonials,
  getCmsFaqs,
  getCmsPageContent,
  DEFAULT_HOME_PAGE_CONTENT,
} from "@/lib/services/cmsService";
import { SERVICES_DATA } from "@/data/services";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { TESTIMONIALS_DATA } from "@/data/testimonials";
import { FAQS_DATA } from "@/data/faqs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  let services = SERVICES_DATA;
  let portfolio = PORTFOLIO_DATA;
  let testimonials = TESTIMONIALS_DATA;
  let faqs = FAQS_DATA;
  let homeContent = DEFAULT_HOME_PAGE_CONTENT;

  try {
    const [cmsServices, cmsPortfolio, cmsTestimonials, cmsFaqs, cmsHomeContent] = await Promise.all([
      getCmsServices().catch((err) => {
        console.warn("[Home:services] Fallback:", err);
        return SERVICES_DATA;
      }),
      getCmsPortfolio().catch((err) => {
        console.warn("[Home:portfolio] Fallback:", err);
        return PORTFOLIO_DATA;
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
    if (cmsPortfolio && cmsPortfolio.length > 0) portfolio = cmsPortfolio;
    if (cmsTestimonials && cmsTestimonials.length > 0) testimonials = cmsTestimonials;
    if (cmsFaqs && cmsFaqs.length > 0) faqs = cmsFaqs;
    if (cmsHomeContent) homeContent = cmsHomeContent;
  } catch (err) {
    console.warn("[Home:Hydration] Graceful fallback to default data:", err);
  }

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-emerald-500/20 selection:text-emerald-900">
      {/* Global Interactive Crosshair Grid & Fluid Ambient Light Canvas */}
      <GlobalSpotlightGrid />

      {/* Top Quiet Navigation Bar */}
      <Navbar />

      {/* Hero Section with Pinned Enterprise Logo Ribbon */}
      <Hero content={homeContent} />

      {/* 40% Core Pillar: Full-Funnel Marketing Services Showcase (Live from /admin/services) */}
      <LiveServicesShowcase services={services} />

      {/* 60% SaaS Pillar 1: "Scale 10x retainers. Burn out 0 teams." (2x3 Bento Feature Grid) */}
      <AgencyRolePillars />

      {/* 60% SaaS Pillar 2: "Your agency needs more than a task manager" (5 Tabs + Interactive Software Stage) */}
      <CorePlatformSuite />

      {/* 60% SaaS Pillar 3: "Every agency department has work that Digivigee handles" (5 Department Cards) */}
      <AgencyTeamsShowcase />

      {/* Wrike Section 4: AgencyScale 2026 Highlight Banner + 120+ Integrations Multi-Row Marquee */}
      <Integrations />

      {/* Wrike Section 5 & 6: Trusted Platform Dual Split Cards + Dynamic Testimonial Wall (Live from /admin/testimonials) */}
      <AgencyRoiComparison initialTestimonials={testimonials} />

      {/* Dynamic Portfolio Showcase (Live from /admin/portfolio) */}
      <LivePortfolioShowcase portfolio={portfolio} />

      {/* Dynamic FAQ Objection Clearance (Live from /admin/faqs) */}
      <LiveFaqAccordion faqs={faqs} />

      {/* Wrike Section 7: High-Converting Final Conversion Banner & 6 Verified Award Badges */}
      <FinalCta />

      {/* Wrike Section 8: Comprehensive 6-Column Agency OS Footer (Live from /admin/settings) */}
      <Footer />
    </div>
  );
}
