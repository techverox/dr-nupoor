import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalSpotlightGrid from "@/components/GlobalSpotlightGrid";
import BlogArchiveClientView from "@/components/blog/BlogArchiveClientView";
import { getCmsBlogPosts } from "@/lib/services/cmsService";
import { resolveDynamicPageMetadata } from "@/lib/seo/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return await resolveDynamicPageMetadata("/blog", {
    title: "Breast Health & Oncology Insights | Dr. Noopur Patel",
    description:
      "Evidence-based articles on breast health awareness, early detection screening, oncoplastic surgical techniques, and survivorship guidance by Dr. Noopur Patel.",
    path: "/blog",
    keywords: [
      "breast health blog",
      "breast cancer awareness ahmedabad",
      "breast lump symptoms",
      "oncoplastic surgery articles",
      "mammography guide",
    ],
  });
}

export default async function BlogArchivePage() {
  const posts = await getCmsBlogPosts();

  return (
    <div className="min-h-screen bg-[#FCFDFD] text-[#0C1628] selection:bg-emerald-500/20 selection:text-emerald-900 flex flex-col">
      <GlobalSpotlightGrid />
      <Navbar />
      <main className="flex-1 w-full">
        <BlogArchiveClientView initialPosts={posts} />
      </main>
      <Footer />
    </div>
  );
}
