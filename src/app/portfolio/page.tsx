import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalSpotlightGrid from "@/components/GlobalSpotlightGrid";
import { getCmsPortfolio } from "@/lib/services/cmsService";
import { resolveDynamicPageMetadata } from "@/lib/seo/metadata";
import PortfolioClientView from "@/components/portfolio/PortfolioClientView";

export const revalidate = 60;

export async function generateMetadata() {
  return resolveDynamicPageMetadata("/portfolio", {
    title: "Patient Care Stories & Clinical Outcomes | Dr. Noopur Patel",
    description:
      "Read verified recovery journeys, compassionate care experiences, and surgical outcomes from patients treated by Dr. Noopur Patel at Marengo CIMS Hospital, Ahmedabad.",
    path: "/portfolio",
    keywords: [
      "patient care stories",
      "breast surgery recovery",
      "oncoplastic surgery testimonials",
      "breast cancer care ahmedabad",
    ],
  });
}

export default async function PortfolioArchivePage() {
  const portfolio = await getCmsPortfolio();
  const publishedPortfolio = portfolio.filter((p) => p.isPublished !== false);

  return (
    <div className="relative min-h-screen bg-[#FCFDFD] text-[#0C1628] selection:bg-emerald-500/20 selection:text-emerald-900">
      <GlobalSpotlightGrid />
      <Navbar />
      <PortfolioClientView initialItems={publishedPortfolio} />
      <Footer />
    </div>
  );
}
