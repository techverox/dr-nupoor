import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalSpotlightGrid from "@/components/GlobalSpotlightGrid";
import AboutClientView from "@/components/about/AboutClientView";
import { getCmsTeamMembers, getCmsSiteSettings, getCmsPageContent } from "@/lib/services/cmsService";
import { resolveDynamicPageMetadata } from "@/lib/seo/metadata";
import { TEAM_MEMBERS_DATA } from "@/data/team";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  return resolveDynamicPageMetadata("/about", {
    title: "About DigiVigee | Technology, Tools & Business Growth (Est. 2016)",
    description:
      "Digivigee is a digital technology and business solutions company founded in 2016. Official Meta Partner, helping businesses build, automate, market and grow with the right digital tools, SaaS products, and expertise.",
    path: "/about",
    keywords: [
      "about DigiVigee",
      "Digivigee technology tools",
      "RestroMitra SaaS",
      "Maru Gujarat app",
      "official Meta partner Gujarat",
      "business automation",
      "WhatsApp automation",
      "Vipul Gajjar",
      "digital growth solutions",
    ],
  });
}

export default async function AboutPage() {
  const [cmsMembers, aboutContent] = await Promise.all([
    getCmsTeamMembers().catch(() => TEAM_MEMBERS_DATA),
    getCmsPageContent("about"),
  ]);

  const teamMembers = cmsMembers && cmsMembers.length > 0 ? cmsMembers : TEAM_MEMBERS_DATA;

  // Filter published members only
  const publishedTeam = teamMembers.filter((tm) => tm.isPublished !== false);

  // Structured Data Schema for Search Engines (Organization & AboutPage)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About DigiVigee",
    description:
      "Digivigee is a digital technology and business solutions company helping businesses build, automate, market and grow with the right digital tools, technology and expertise.",
    url: "https://digivigee.com/about",
    mainEntity: {
      "@type": "Organization",
      name: "DigiVigee",
      url: "https://digivigee.com",
      foundingDate: "2016",
      founder: {
        "@type": "Person",
        name: "Vipul Gajjar",
        jobTitle: "Founder & Digital Strategist",
      },
      sameAs: [
        "https://linkedin.com/company/digivigee",
        "https://twitter.com/digivigee",
      ],
      brand: [
        {
          "@type": "Brand",
          name: "RestroMitra",
          description: "Restaurant Management Software — SaaS",
        },
        {
          "@type": "Brand",
          name: "Maru Gujarat",
          description: "Gujarat Business Listing & Directory — Android Application",
        },
      ],
      employee: publishedTeam.map((m) => ({
        "@type": "Person",
        name: m.name,
        jobTitle: m.role,
      })),
    },
  };

  return (
    <div className="relative min-h-screen bg-[#FCFDFD] text-[#0C1628] selection:bg-emerald-500/20 selection:text-emerald-900">
      {/* Search Engine Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <GlobalSpotlightGrid />
      <Navbar />

      <main>
        <AboutClientView content={aboutContent} teamMembers={publishedTeam} />
      </main>

      <Footer />
    </div>
  );
}
