import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalSpotlightGrid from "@/components/GlobalSpotlightGrid";
import SocialProofBar from "@/components/SocialProofBar";
import SolutionDetailView from "@/components/solutions/SolutionDetailView";
import { SOLUTIONS_DATA } from "@/data/solutions";

const solution = SOLUTIONS_DATA["social-media-agencies"];
const related = solution.relatedSolutionSlugs.map((s) => SOLUTIONS_DATA[s]);

export const metadata: Metadata = {
  title: solution.seo.title,
  description: solution.seo.description,
  keywords: solution.seo.keywords,
  openGraph: {
    title: solution.seo.title,
    description: solution.seo.description,
    type: "website",
  },
};

export default function SocialMediaAgenciesPage() {
  return (
    <main className="relative min-h-screen bg-[#FCFDFD] text-slate-900 selection:bg-pink-500/20 selection:text-pink-900 font-sans">
      <GlobalSpotlightGrid />
      <Navbar />
      <SolutionDetailView solution={solution} relatedSolutions={related} />
      <SocialProofBar />
      <Footer />
    </main>
  );
}
