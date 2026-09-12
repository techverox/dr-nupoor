import React from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalSpotlightGrid from "@/components/GlobalSpotlightGrid";
import ServiceDetailClientView from "@/components/services/ServiceDetailClientView";
import { getCmsServiceBySlug, getCmsServices } from "@/lib/services/cmsService";
import { resolveDynamicPageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getCmsServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | DigiVigee",
    };
  }

  return resolveDynamicPageMetadata(`/services/${slug}`, {
    title: service.seo?.title || `${service.title} | DigiVigee Engine`,
    description:
      service.seo?.description ||
      service.shortDescription ||
      "Enterprise digital marketing and performance delivery engine by DigiVigee.",
    path: `/services/${slug}`,
    keywords: service.seo?.keywords || [service.title, "delivery engine", "digital marketing", "agency retainers"],
    ogImage: service.seo?.ogImage || service.heroImage,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getCmsServiceBySlug(slug);

  if (!service || service.isPublished === false) {
    notFound();
  }

  // Related services
  const allServices = await getCmsServices();
  const relatedServices = allServices
    .filter((s) => s.slug !== slug && s.isPublished !== false)
    .slice(0, 3);

  // Schema.org Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    provider: {
      "@type": "Organization",
      name: "DigiVigee",
      url: "https://digivigee.com",
    },
    serviceType: "Digital Agency Delivery Engine",
  };

  return (
    <div className="relative min-h-screen bg-[#FCFDFD] text-slate-900 selection:bg-emerald-500/20 selection:text-emerald-900 font-sans">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <GlobalSpotlightGrid />
      <Navbar />

      <ServiceDetailClientView
        service={service}
        relatedServices={relatedServices}
      />

      <Footer />
    </div>
  );
}
