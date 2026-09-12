import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalSpotlightGrid from "@/components/GlobalSpotlightGrid";
import FinalCta from "@/components/FinalCta";
import ServicesClientView from "@/components/services/ServicesClientView";
import { getCmsServices } from "@/lib/services/cmsService";
import { resolveDynamicPageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  return resolveDynamicPageMetadata("/services", {
    title: "Agency Growth Services & Retainer Capabilities | DigiVigee",
    description:
      "Explore DigiVigee's 7 specialized enterprise retainer engines: Algorithmic Paid Ad Ops, Creative Production & Proofing, High-Speed Next.js Web Systems, Technical SEO, and Automated Billing Retainers.",
    path: "/services",
    keywords: [
      "digital marketing services",
      "performance marketing agency",
      "technical SEO audit",
      "retainer agency capabilities",
      "paid ads management",
      "Next.js web engineering",
      "social media delivery engine",
      "agency operating system",
    ],
  });
}

export default async function ServicesArchivePage() {
  const services = await getCmsServices();
  const publishedServices = services.filter((s) => s.isPublished !== false);

  // Schema.org ItemList of Services for Enterprise SEO
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "DigiVigee Enterprise Agency Services & Retainer Engines",
    "description":
      "Dedicated execution engines for hyper-growth brands and marketing agencies.",
    "itemListElement": publishedServices.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.title,
        "description": service.shortDescription || service.detailedDescription,
        "url": `https://digivigee.com/services/${service.slug}`,
        "provider": {
          "@type": "Organization",
          "name": "DigiVigee",
        },
      },
    })),
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-emerald-500/20 selection:text-emerald-900">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />

      <GlobalSpotlightGrid />
      <Navbar />

      {/* Main Interactive Services Platform View */}
      <main>
        <ServicesClientView services={publishedServices} />
      </main>

      <FinalCta />
      <Footer />
    </div>
  );
}
