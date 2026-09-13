import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalSpotlightGrid from "@/components/GlobalSpotlightGrid";
import TermsAndConditionsClient from "@/components/legal/TermsAndConditionsClient";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `Master Terms of Service & Client Agreement | ${SITE_CONFIG.name}`,
  description:
    "Master Terms of Service governing DigiVigee's performance marketing retainers, SEO services, web development deliverables, ad spend custody, and intellectual property.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/terms-and-conditions`,
  },
  openGraph: {
    title: `Master Terms of Service & Client Agreement | ${SITE_CONFIG.name}`,
    description:
      "Clear, transparent agency terms. 100% client deliverable ownership, direct ad spend custody, and enterprise service level agreements.",
    url: `${SITE_CONFIG.url}/terms-and-conditions`,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="relative min-h-screen bg-[#F8FAFC] dark:bg-[#070A0F] text-slate-900 dark:text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-900">
      {/* Ambient Canvas Light & Crosshairs */}
      <GlobalSpotlightGrid />

      {/* Primary Fixed Navigation Bar */}
      <Navbar />

      {/* Main Interactive Terms of Service Agreement */}
      <main className="relative z-10 w-full">
        <TermsAndConditionsClient />
      </main>

      {/* Global Agency OS Footer */}
      <Footer />
    </div>
  );
}
