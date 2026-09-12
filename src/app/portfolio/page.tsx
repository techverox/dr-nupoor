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
    title: "Client Case Studies & Audited Agency Results | DigiVigee",
    description:
      "Explore audited agency case studies showing how DigiVigee scaled performance, social, and local search agencies with automated pacing and verified ROAS.",
    path: "/portfolio",
    keywords: [
      "agency case studies",
      "digital marketing portfolio",
      "audited ROAS results",
      "agency operating system case studies",
      "white label agency results",
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
