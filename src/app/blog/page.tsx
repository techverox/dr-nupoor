import React from "react";
import type { Metadata } from "next";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import DoctorFooter from "@/components/doctor/DoctorFooter";
import BlogArchiveClientView from "@/components/blog/BlogArchiveClientView";
import { getCmsBlogPosts } from "@/lib/services/cmsService";
import { resolveDynamicPageMetadata } from "@/lib/seo/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return await resolveDynamicPageMetadata("/blog", {
    title: "Breast Health & Oncology Articles | Dr. Noopur Patel Ahmedabad",
    description:
      "Evidence-based medical articles on breast health awareness, early cancer screening, mammography guidance, benign lumps, and oncoplastic surgical techniques by Dr. Noopur Patel.",
    path: "/blog",
    keywords: [
      "breast health blog",
      "breast cancer awareness ahmedabad",
      "breast lump symptoms",
      "fibroadenoma vs breast cancer",
      "oncoplastic surgery articles",
      "mammography guide ahmedabad",
      "breast surgeon blog",
    ],
  });
}

export default async function BlogArchivePage() {
  const posts = await getCmsBlogPosts();

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#D84C70]/20 selection:text-[#9B2846] flex flex-col">
      {/* Dr. Noopur Patel Unified Navigation Bar */}
      <DoctorNavbar />
      <main className="flex-1 w-full">
        <BlogArchiveClientView initialPosts={posts} />
      </main>
      {/* Dr. Noopur Patel Unified Footer */}
      <DoctorFooter />
    </div>
  );
}

