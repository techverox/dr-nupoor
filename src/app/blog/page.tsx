import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalSpotlightGrid from "@/components/GlobalSpotlightGrid";
import BlogArchiveClientView from "@/components/blog/BlogArchiveClientView";
import { getCmsBlogPosts } from "@/lib/services/cmsService";
import { resolveDynamicPageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await resolveDynamicPageMetadata("/blog", {
    title: "Agency Scaling Playbooks & Growth Engineering | DigiVigee Agency OS",
    description:
      "Explore actionable agency operating playbooks, ad pacing telemetry, client reporting automation, and local SEO frameworks from DigiVigee growth directors.",
    path: "/blog",
    keywords: [
      "agency operating playbooks",
      "digital agency blog",
      "performance ad ops strategies",
      "client reporting automation",
      "agency growth insights",
      "DigiVigee articles",
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
