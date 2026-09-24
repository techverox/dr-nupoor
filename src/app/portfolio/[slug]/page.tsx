import React from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalSpotlightGrid from "@/components/GlobalSpotlightGrid";
import CaseStudyDetailClientView from "@/components/portfolio/CaseStudyDetailClientView";
import { getCmsPortfolioBySlug, getCmsPortfolio } from "@/lib/services/cmsService";
import { resolveDynamicPageMetadata } from "@/lib/seo/metadata";
import { SITE_CONFIG } from "@/config/site";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PortfolioPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PortfolioPageProps) {
  const { slug } = await params;
  const item = await getCmsPortfolioBySlug(slug);

  if (!item) {
    return {
      title: "Story Not Found | Dr. Noopur Patel",
    };
  }

  return resolveDynamicPageMetadata(`/portfolio/${slug}`, {
    title: item.seo?.title || `${item.title} | Patient Care Journey | Dr. Noopur Patel`,
    description:
      item.seo?.description ||
      item.shortDescription ||
      `Clinical journey and breast surgical outcomes with Dr. Noopur Patel at Marengo CIMS Hospital, Ahmedabad.`,
    path: `/portfolio/${slug}`,
    keywords: item.seo?.keywords || [item.clientName, item.industry, "patient care journey", "breast oncology outcomes"],
    ogImage: item.seo?.ogImage || item.heroImage,
  });
}

export default async function PortfolioDetailPage({ params }: PortfolioPageProps) {
  const { slug } = await params;
  const item = await getCmsPortfolioBySlug(slug);

  if (!item || item.isPublished === false) {
    notFound();
  }

  // Related items
  const allItems = await getCmsPortfolio();
  const relatedItems = allItems
    .filter((p) => p.slug !== slug && p.isPublished !== false)
    .slice(0, 2);

  // Schema JSON-LD
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: item.shortDescription,
    image: item.heroImage ? [item.heroImage] : undefined,
    author: {
      "@type": "Physician",
      name: "Dr. Noopur Patel",
    },
    publisher: {
      "@type": "Organization",
      name: "Dr. Noopur Patel Breast Clinic",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/images/doctor/assets/logo.png`,
      },
    },
  };

  return (
    <div className="relative min-h-screen bg-[#FCFDFD] text-[#0C1628] selection:bg-emerald-500/20 selection:text-emerald-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <GlobalSpotlightGrid />
      <Navbar />

      <CaseStudyDetailClientView
        item={item}
        relatedItems={relatedItems}
      />

      <Footer />
    </div>
  );
}

