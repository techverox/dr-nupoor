import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalSpotlightGrid from "@/components/GlobalSpotlightGrid";
import PrivacyPolicyClient from "@/components/legal/PrivacyPolicyClient";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `Privacy & Data Protection Charter | ${SITE_CONFIG.name}`,
  description:
    "DigiVigee's comprehensive privacy policy regarding data protection, DPDP Act 2023 compliance, GDPR alignment, client confidentiality, and ad telemetry security.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/privacy-policy`,
  },
  openGraph: {
    title: `Privacy & Data Protection Charter | ${SITE_CONFIG.name}`,
    description:
      "Transparent, client-first data practices. Learn how DigiVigee safeguards personal data and campaign telemetry with bank-grade encryption.",
    url: `${SITE_CONFIG.url}/privacy-policy`,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen bg-[#F8FAFC] dark:bg-[#070A0F] text-slate-900 dark:text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-900">
      {/* Ambient Canvas Light & Crosshairs */}
      <GlobalSpotlightGrid />

      {/* Primary Fixed Navigation Bar */}
      <Navbar />

      {/* Main Interactive Privacy Policy Charter */}
      <main className="relative z-10 w-full">
        <PrivacyPolicyClient />
      </main>

      {/* Global Agency OS Footer */}
      <Footer />
    </div>
  );
}
