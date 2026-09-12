import React from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalSpotlightGrid from "@/components/GlobalSpotlightGrid";
import CaseStudyDetailClientView from "@/components/portfolio/CaseStudyDetailClientView";
import { getCmsPortfolioBySlug, getCmsPortfolio } from "@/lib/services/cmsService";
import { resolveDynamicPageMetadata } from "@/lib/seo/metadata";

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
      title: "Case Study Not Found | DigiVigee",
    };
  }

  return resolveDynamicPageMetadata(`/portfolio/${slug}`, {
    title: item.seo?.title || `${item.title} | Case Study | DigiVigee`,
    description:
      item.seo?.description ||
      item.shortDescription ||
      `How DigiVigee helped ${item.clientName} achieve compounding digital growth and verified ROAS.`,
    path: `/portfolio/${slug}`,
    keywords: item.seo?.keywords || [item.clientName, item.industry, "case study", "digital marketing results"],
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
      "@type": "Organization",
      name: "DigiVigee Growth Pod",
    },
    publisher: {
      "@type": "Organization",
      name: "DigiVigee",
      logo: {
        "@type": "ImageObject",
        url: "https://digivigee.com/images/digivigee_logo.png",
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

