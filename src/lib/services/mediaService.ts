import path from "path";
import fs from "fs/promises";
import { getAdminFirestore, getFirebaseAdminApp, getAdminStorage, FieldValue } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/config/firebase";
import { MediaItem, MediaUsageCheckResult, MediaUsageReference } from "@/types";
import { getAllCmsBlogPostsAdmin, getAllCmsServicesAdmin, getAllCmsPortfolioAdmin, getAllCmsTeamMembersAdmin, getAllCmsTestimonialsAdmin, getCmsSiteSettings } from "./cmsService";

// ==========================================
// SEED DEFAULT MEDIA (Existing Website Assets)
// ==========================================
export const SEED_MEDIA_ITEMS: MediaItem[] = [
  // 1. BRAND IDENTITY & LOGOS
  {
    id: "media-logo",
    name: "Dr. Noopur Patel Primary Brand Logo",
    fileName: "logo.png",
    url: "/images/doctor/assets/logo.png",
    storagePath: "images/doctor/assets/logo.png",
    mimeType: "image/png",
    fileSize: 942911,
    width: 2172,
    height: 724,
    altText: "Dr. Noopur Patel — Breast Cancer Surgeon & Surgical Breast Oncology Logo",
    title: "Official Brand Logo",
    caption: "Primary brand identity logo for navigation headers and official footers",
    uploadedAt: "2026-01-01T00:00:00.000Z",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "media-logo-official",
    name: "DigiVigee Official Full Logo",
    fileName: "digivigee-official-logo.png",
    url: "/images/digivigee-official-logo.png",
    storagePath: "images/digivigee-official-logo.png",
    mimeType: "image/png",
    fileSize: 213792,
    width: 800,
    height: 250,
    altText: "DigiVigee Official Registered Agency Logo",
    title: "Official Brand Mark",
    caption: "High resolution official logo for marketing decks and banners",
    uploadedAt: "2026-01-01T00:00:00.000Z",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "media-logo-symbol",
    name: "DigiVigee Icon Emblem Symbol",
    fileName: "digivigee-symbol.png",
    url: "/images/digivigee-symbol.png",
    storagePath: "images/digivigee-symbol.png",
    mimeType: "image/png",
    fileSize: 1419735,
    width: 512,
    height: 512,
    altText: "DigiVigee Geometric Growth Emblem Symbol",
    title: "App Icon Symbol",
    caption: "Square brand mark for PWA icons, favicons, and social avatars",
    uploadedAt: "2026-01-01T00:00:00.000Z",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "media-logo-text",
    name: "DigiVigee Wordmark Logo",
    fileName: "digivigee-text-logo.png",
    url: "/images/digivigee-text-logo.png",
    storagePath: "images/digivigee-text-logo.png",
    mimeType: "image/png",
    fileSize: 612560,
    width: 600,
    height: 160,
    altText: "DigiVigee Clean Typography Wordmark",
    title: "Typography Wordmark",
    caption: "Text-only vector mark for footer and partner lockups",
    uploadedAt: "2026-01-01T00:00:00.000Z",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "media-logo-techverox",
    name: "Techverox Partner Brand Logo",
    fileName: "techverox_logo.png",
    url: "/images/techverox_logo.png",
    storagePath: "images/techverox_logo.png",
    mimeType: "image/png",
    fileSize: 10317,
    width: 320,
    height: 90,
    altText: "Techverox Strategic Technology Partner Logo",
    title: "Partner Techverox",
    caption: "Technology partner logo displayed on homepage credentials",
    uploadedAt: "2026-01-01T00:00:00.000Z",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },

  // 2. HERO & MARKETING BANNERS
  {
    id: "media-og-default",
    name: "DigiVigee Global Open Graph Social Card",
    fileName: "og-image.jpg",
    url: "/images/og-image.jpg",
    storagePath: "images/og-image.jpg",
    mimeType: "image/jpeg",
    fileSize: 184500,
    width: 1200,
    height: 630,
    altText: "DigiVigee Digital Marketing Growth Agency Social Card",
    title: "DigiVigee Social Share Image",
    caption: "Default Open Graph and Twitter Card 1200x630 asset",
    uploadedAt: "2026-01-01T00:00:00.000Z",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "media-hero-home",
    name: "Homepage Master Hero Visual",
    fileName: "home-page-hero-image.png",
    url: "/images/home-page-hero-image.png",
    storagePath: "images/home-page-hero-image.png",
    mimeType: "image/png",
    fileSize: 1976973,
    width: 1920,
    height: 1080,
    altText: "DigiVigee All-in-One Growth Platform UI Hero Showcase",
    title: "Homepage Hero UI",
    caption: "High-resolution hero dashboard showcase on landing page",
    uploadedAt: "2026-01-01T00:00:00.000Z",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "media-hero-pro",
    name: "Enterprise Professional Team Visual",
    fileName: "hero-professional.png",
    url: "/images/hero-professional.png",
    storagePath: "images/hero-professional.png",
    mimeType: "image/png",
    fileSize: 1347066,
    width: 1200,
    height: 800,
    altText: "Professional Growth Specialists Collaborating on Ad Campaigns",
    title: "Growth Specialists Banner",
    caption: "Creative strategy team banner for About and Services pages",
    uploadedAt: "2026-01-01T00:00:00.000Z",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "media-hero-growth-illus",
    name: "Performance Marketing Growth Illustration",
    fileName: "hero-growth-illustration.png",
    url: "/images/hero-growth-illustration.png",
    storagePath: "images/hero-growth-illustration.png",
    mimeType: "image/png",
    fileSize: 946598,
    width: 1200,
    height: 700,
    altText: "Revenue Compounding Graph and ROAS Scalability Chart",
    title: "ROAS Growth Graph",
    caption: "3D visual illustrating multi-channel pipeline acceleration",
    uploadedAt: "2026-01-01T00:00:00.000Z",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "media-hero-premium",
    name: "Dark Luxe Premium Agency Hero",
    fileName: "hero_image_premium.jpg",
    url: "/images/hero_image_premium.jpg",
    storagePath: "images/hero_image_premium.jpg",
    mimeType: "image/jpeg",
    fileSize: 518230,
    width: 1600,
    height: 900,
    altText: "Futuristic Glassmorphic Digital Marketing Command Center",
    title: "Command Center Hero",
    caption: "Modern dark mode header backdrop for Enterprise Solutions",
    uploadedAt: "2026-01-01T00:00:00.000Z",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },

  // 3. BLOG COVERS
  {
    id: "media-blog-social-media",
    name: "Social Media Marketing Strategy Banner",
    fileName: "social-media-tips.jpg",
    url: "/images/blog/social-media-tips.jpg",
    storagePath: "images/blog/social-media-tips.jpg",
    mimeType: "image/jpeg",
    fileSize: 745976,
    width: 1200,
    height: 675,
    altText: "Social Media Marketing Strategy and Community Growth Infographic",
    title: "Social Media Strategy Banner",
    caption: "Featured cover for organic and paid social media guides",
    uploadedAt: "2026-01-10T00:00:00.000Z",
    createdAt: "2026-01-10T00:00:00.000Z",
    updatedAt: "2026-01-10T00:00:00.000Z",
  },
  {
    id: "media-blog-seo-guide",
    name: "Local Search & SEO Playbook Banner",
    fileName: "local-seo-guide.jpg",
    url: "/images/blog/local-seo-guide.jpg",
    storagePath: "images/blog/local-seo-guide.jpg",
    mimeType: "image/jpeg",
    fileSize: 796970,
    width: 1200,
    height: 675,
    altText: "Local Search Optimization and Google Business Ranking Playbook",
    title: "Local SEO Guide Hero",
    caption: "Featured cover for technical SEO and local Google Maps playbooks",
    uploadedAt: "2026-01-15T00:00:00.000Z",
    createdAt: "2026-01-15T00:00:00.000Z",
    updatedAt: "2026-01-15T00:00:00.000Z",
  },
  {
    id: "media-blog-perf-marketing",
    name: "Performance Marketing ROI Infographic",
    fileName: "performance-marketing-roi.jpg",
    url: "/images/blog/performance-marketing-roi.jpg",
    storagePath: "images/blog/performance-marketing-roi.jpg",
    mimeType: "image/jpeg",
    fileSize: 717780,
    width: 1200,
    height: 675,
    altText: "Data analytics and performance marketing ROI conversion metrics",
    title: "Performance Marketing Metrics",
    caption: "Header artwork for paid media ROAS optimization playbooks",
    uploadedAt: "2026-01-20T00:00:00.000Z",
    createdAt: "2026-01-20T00:00:00.000Z",
    updatedAt: "2026-01-20T00:00:00.000Z",
  },
  {
    id: "media-blog-content-strat",
    name: "Omnichannel Content Strategy Blueprint",
    fileName: "content-strategy.jpg",
    url: "/images/blog/content-strategy.jpg",
    storagePath: "images/blog/content-strategy.jpg",
    mimeType: "image/jpeg",
    fileSize: 804856,
    width: 1200,
    height: 675,
    altText: "Strategic Content Calendar and Conversion Copywriting Framework",
    title: "Content Strategy Blueprint",
    caption: "Cover for editorial copywriting and brand storytelling guides",
    uploadedAt: "2026-01-22T00:00:00.000Z",
    createdAt: "2026-01-22T00:00:00.000Z",
    updatedAt: "2026-01-22T00:00:00.000Z",
  },
  {
    id: "media-blog-email-marketing",
    name: "Automated Email Drip Sequences Cover",
    fileName: "email-marketing.jpg",
    url: "/images/blog/email-marketing.jpg",
    storagePath: "images/blog/email-marketing.jpg",
    mimeType: "image/jpeg",
    fileSize: 782666,
    width: 1200,
    height: 675,
    altText: "Email Marketing CRM Automation and Retention Funnels",
    title: "Email Marketing Funnels",
    caption: "Cover image for email lifecycle marketing and lead nurturing",
    uploadedAt: "2026-01-25T00:00:00.000Z",
    createdAt: "2026-01-25T00:00:00.000Z",
    updatedAt: "2026-01-25T00:00:00.000Z",
  },
  {
    id: "media-blog-web-design",
    name: "High-Converting Website Design Banner",
    fileName: "website-design.jpg",
    url: "/images/blog/website-design.jpg",
    storagePath: "images/blog/website-design.jpg",
    mimeType: "image/jpeg",
    fileSize: 50835,
    width: 800,
    height: 450,
    altText: "UI UX Web Design and Landing Page Conversion Architecture",
    title: "Web Design Showcase",
    caption: "Cover image for web development and conversion rate optimization articles",
    uploadedAt: "2026-01-28T00:00:00.000Z",
    createdAt: "2026-01-28T00:00:00.000Z",
    updatedAt: "2026-01-28T00:00:00.000Z",
  },

  // 4. PORTFOLIO CASE STUDIES
  {
    id: "media-portfolio-ayush",
    name: "Ayush Wellness Case Study Visual",
    fileName: "ayush-case-study.jpg",
    url: "/images/portfolio/ayush-case-study.jpg",
    storagePath: "images/portfolio/ayush-case-study.jpg",
    mimeType: "image/jpeg",
    fileSize: 717780,
    width: 1200,
    height: 800,
    altText: "Ayush Wellness eCommerce performance advertising dashboard results",
    title: "Ayush Wellness Results",
    caption: "Case study hero: 4.8x ROAS scale for wellness D2C brand",
    uploadedAt: "2026-01-12T00:00:00.000Z",
    createdAt: "2026-01-12T00:00:00.000Z",
    updatedAt: "2026-01-12T00:00:00.000Z",
  },
  {
    id: "media-portfolio-kalpvruksh",
    name: "Kalpvruksh Real Estate Case Study",
    fileName: "kalpvruksh-case-study.jpg",
    url: "/images/portfolio/kalpvruksh-case-study.jpg",
    storagePath: "images/portfolio/kalpvruksh-case-study.jpg",
    mimeType: "image/jpeg",
    fileSize: 748008,
    width: 1200,
    height: 800,
    altText: "Kalpvruksh Luxury Real Estate Lead Generation Campaign Metrics",
    title: "Kalpvruksh Case Study",
    caption: "Case study hero: Generated 320+ qualified HNI investor leads",
    uploadedAt: "2026-01-14T00:00:00.000Z",
    createdAt: "2026-01-14T00:00:00.000Z",
    updatedAt: "2026-01-14T00:00:00.000Z",
  },
  {
    id: "media-portfolio-mahalaxmi",
    name: "Mahalaxmi Sweets Local Growth Case Study",
    fileName: "mahalaxmi-case-study.jpg",
    url: "/images/portfolio/mahalaxmi-case-study.jpg",
    storagePath: "images/portfolio/mahalaxmi-case-study.jpg",
    mimeType: "image/jpeg",
    fileSize: 716124,
    width: 1200,
    height: 800,
    altText: "Mahalaxmi Sweets Omnichannel Local Footfall and Online Delivery Growth",
    title: "Mahalaxmi Sweets Results",
    caption: "Case study hero: 240% increase in holiday gifting orders",
    uploadedAt: "2026-01-16T00:00:00.000Z",
    createdAt: "2026-01-16T00:00:00.000Z",
    updatedAt: "2026-01-16T00:00:00.000Z",
  },
  {
    id: "media-portfolio-printing-wala",
    name: "Printing Wala B2B Growth Case Study",
    fileName: "printing-wala-case-study.jpg",
    url: "/images/portfolio/printing-wala-case-study.jpg",
    storagePath: "images/portfolio/printing-wala-case-study.jpg",
    mimeType: "image/jpeg",
    fileSize: 804856,
    width: 1200,
    height: 800,
    altText: "Printing Wala Custom Merchandising B2B Pipeline Growth",
    title: "Printing Wala Results",
    caption: "Case study hero: Acquired 180+ corporate contract clients",
    uploadedAt: "2026-01-18T00:00:00.000Z",
    createdAt: "2026-01-18T00:00:00.000Z",
    updatedAt: "2026-01-18T00:00:00.000Z",
  },
  {
    id: "media-portfolio-riddhi-siddhi",
    name: "Riddhi Siddhi Enterprise Scale Case Study",
    fileName: "riddhi-siddhi-case-study.jpg",
    url: "/images/portfolio/riddhi-siddhi-case-study.jpg",
    storagePath: "images/portfolio/riddhi-siddhi-case-study.jpg",
    mimeType: "image/jpeg",
    fileSize: 685434,
    width: 1200,
    height: 800,
    altText: "Riddhi Siddhi Multi-Location Retail Paid Social Conversion Strategy",
    title: "Riddhi Siddhi Results",
    caption: "Case study hero: 5.2x ROAS across Meta and Google Search campaigns",
    uploadedAt: "2026-01-19T00:00:00.000Z",
    createdAt: "2026-01-19T00:00:00.000Z",
    updatedAt: "2026-01-19T00:00:00.000Z",
  },

  // 5. LEADERSHIP & TEAM PROFILES
  {
    id: "media-team-vipul",
    name: "Vipul Gajjar Profile Portrait",
    fileName: "vipul-gajjar.jpg",
    url: "/images/team/vipul-gajjar.jpg",
    storagePath: "images/team/vipul-gajjar.jpg",
    mimeType: "image/jpeg",
    fileSize: 87112,
    width: 400,
    height: 400,
    altText: "Vipul Gajjar Founder and Principal Growth Strategist at DigiVigee",
    title: "Vipul Gajjar Profile",
    caption: "Founder portrait featured across agency leadership sections",
    uploadedAt: "2026-01-05T00:00:00.000Z",
    createdAt: "2026-01-05T00:00:00.000Z",
    updatedAt: "2026-01-05T00:00:00.000Z",
  },
  {
    id: "media-team-disha",
    name: "Disha Parmar Profile Portrait",
    fileName: "disha-parmar.jpg",
    url: "/images/team/disha-parmar.jpg",
    storagePath: "images/team/disha-parmar.jpg",
    mimeType: "image/jpeg",
    fileSize: 115635,
    width: 400,
    height: 400,
    altText: "Disha Parmar Head of Social Media and Creative Operations at DigiVigee",
    title: "Disha Parmar Profile",
    caption: "Head of Creative portrait featured in Team CMS",
    uploadedAt: "2026-01-05T00:00:00.000Z",
    createdAt: "2026-01-05T00:00:00.000Z",
    updatedAt: "2026-01-05T00:00:00.000Z",
  },
  {
    id: "media-team-hetal",
    name: "Hetal Shah Profile Portrait",
    fileName: "hetal-shah.jpg",
    url: "/images/team/hetal-shah.jpg",
    storagePath: "images/team/hetal-shah.jpg",
    mimeType: "image/jpeg",
    fileSize: 710745,
    width: 400,
    height: 400,
    altText: "Hetal Shah Senior Performance Marketer and Paid Media Director",
    title: "Hetal Shah Profile",
    caption: "Paid Media Lead portrait in Team CMS",
    uploadedAt: "2026-01-05T00:00:00.000Z",
    createdAt: "2026-01-05T00:00:00.000Z",
    updatedAt: "2026-01-05T00:00:00.000Z",
  },
  {
    id: "media-team-krunal",
    name: "Krunal Vyas Profile Portrait",
    fileName: "krunal-vyas.jpg",
    url: "/images/team/krunal-vyas.jpg",
    storagePath: "images/team/krunal-vyas.jpg",
    mimeType: "image/jpeg",
    fileSize: 29235,
    width: 400,
    height: 400,
    altText: "Krunal Vyas Technical SEO and Web Architect at DigiVigee",
    title: "Krunal Vyas Profile",
    caption: "Technical SEO Specialist portrait in Team CMS",
    uploadedAt: "2026-01-05T00:00:00.000Z",
    createdAt: "2026-01-05T00:00:00.000Z",
    updatedAt: "2026-01-05T00:00:00.000Z",
  },
  {
    id: "media-team-meet",
    name: "Meet Patel Profile Portrait",
    fileName: "meet-patel.jpg",
    url: "/images/team/meet-patel.jpg",
    storagePath: "images/team/meet-patel.jpg",
    mimeType: "image/jpeg",
    fileSize: 723939,
    width: 400,
    height: 400,
    altText: "Meet Patel Client Success and Retention Director at DigiVigee",
    title: "Meet Patel Profile",
    caption: "Client Success Director portrait in Team CMS",
    uploadedAt: "2026-01-05T00:00:00.000Z",
    createdAt: "2026-01-05T00:00:00.000Z",
    updatedAt: "2026-01-05T00:00:00.000Z",
  },

  // 6. AWARDS & BADGES
  {
    id: "media-award-ai-tech",
    name: "AI Tech Excellence Award Badge",
    fileName: "award_ai_excellence.png",
    url: "/images/awards/award_ai_excellence.png",
    storagePath: "images/awards/award_ai_excellence.png",
    mimeType: "image/png",
    fileSize: 14221,
    width: 300,
    height: 300,
    altText: "AI Excellence in Digital Marketing Automation Award 2026",
    title: "AI Excellence Badge",
    caption: "Homepage trust seal badge for artificial intelligence innovation",
    uploadedAt: "2026-01-01T00:00:00.000Z",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "media-award-capterra",
    name: "Capterra Highest Rated Agency Badge",
    fileName: "award_capterra.png",
    url: "/images/awards/award_capterra.png",
    storagePath: "images/awards/award_capterra.png",
    mimeType: "image/png",
    fileSize: 16103,
    width: 300,
    height: 300,
    altText: "Capterra 4.9 Star Verified Client Satisfaction Recognition",
    title: "Capterra Recognition Badge",
    caption: "Client review trust badge featured on conversion landing pages",
    uploadedAt: "2026-01-01T00:00:00.000Z",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "media-award-g2",
    name: "G2 Top 50 Marketing Solutions Badge",
    fileName: "award_g2_top50.png",
    url: "/images/awards/award_g2_top50.png",
    storagePath: "images/awards/award_g2_top50.png",
    mimeType: "image/png",
    fileSize: 12414,
    width: 300,
    height: 300,
    altText: "G2 Top 50 Regional Digital Marketing Agencies Badge",
    title: "G2 Top 50 Seal",
    caption: "Industry accreditation seal on trust bar",
    uploadedAt: "2026-01-01T00:00:00.000Z",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "media-award-buyers-choice",
    name: "Buyer's Choice Best Value Agency Seal",
    fileName: "award_buyers_choice.png",
    url: "/images/awards/award_buyers_choice.png",
    storagePath: "images/awards/award_buyers_choice.png",
    mimeType: "image/png",
    fileSize: 15040,
    width: 300,
    height: 300,
    altText: "Buyer's Choice Award for ROI and Transparency",
    title: "Buyer's Choice Seal",
    caption: "Badge for pricing and value guarantee sections",
    uploadedAt: "2026-01-01T00:00:00.000Z",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "media-award-compliance",
    name: "Verified Security & Compliance Seals",
    fileName: "award_compliance_seals.png",
    url: "/images/awards/award_compliance_seals.png",
    storagePath: "images/awards/award_compliance_seals.png",
    mimeType: "image/png",
    fileSize: 16632,
    width: 300,
    height: 300,
    altText: "Enterprise Grade SSL and Data Privacy Compliance Certifications",
    title: "Data Security Compliance Seal",
    caption: "Trust seal assuring customer data privacy and confidentiality",
    uploadedAt: "2026-01-01T00:00:00.000Z",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },

  // 7. SHOWCASE & PLATFORM MODULE CARDS
  {
    id: "media-card-ads",
    name: "Paid Ads ROAS Command Card",
    fileName: "card_ads.jpg",
    url: "/images/showcase/card_ads.jpg",
    storagePath: "images/showcase/card_ads.jpg",
    mimeType: "image/jpeg",
    fileSize: 65177,
    width: 600,
    height: 400,
    altText: "Multi-Channel Ad Spend and Return on Ad Spend Command Interface",
    title: "Paid Media Command Card",
    caption: "Module illustration for Performance Advertising feature section",
    uploadedAt: "2026-01-01T00:00:00.000Z",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "media-card-seo",
    name: "Technical SEO Audit Command Card",
    fileName: "card_seo.jpg",
    url: "/images/showcase/card_seo.jpg",
    storagePath: "images/showcase/card_seo.jpg",
    mimeType: "image/jpeg",
    fileSize: 65370,
    width: 600,
    height: 400,
    altText: "Keyword Rank Tracking and Technical Audit Health Diagnostics",
    title: "SEO Command Card",
    caption: "Module illustration for SEO & Content Engineering feature section",
    uploadedAt: "2026-01-01T00:00:00.000Z",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "media-card-crm",
    name: "Lead Pipeline CRM Command Card",
    fileName: "card_crm.jpg",
    url: "/images/showcase/card_crm.jpg",
    storagePath: "images/showcase/card_crm.jpg",
    mimeType: "image/jpeg",
    fileSize: 74277,
    width: 600,
    height: 400,
    altText: "Inbound Lead Management and CRM Funnel Conversion Stages",
    title: "CRM Lead Card",
    caption: "Module illustration for Client Inquiries and Lead Pipeline feature section",
    uploadedAt: "2026-01-01T00:00:00.000Z",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "media-card-billing",
    name: "Automated Client Invoicing Card",
    fileName: "card_billing.jpg",
    url: "/images/showcase/card_billing.jpg",
    storagePath: "images/showcase/card_billing.jpg",
    mimeType: "image/jpeg",
    fileSize: 47048,
    width: 600,
    height: 400,
    altText: "Retainer Billing and Payment Gateway Transaction Dashboard",
    title: "Billing & Invoicing Card",
    caption: "Module illustration for Agency Financial Operations",
    uploadedAt: "2026-01-01T00:00:00.000Z",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "media-card-approvals",
    name: "Creative Asset Approvals Card",
    fileName: "card_approvals.jpg",
    url: "/images/showcase/card_approvals.jpg",
    storagePath: "images/showcase/card_approvals.jpg",
    mimeType: "image/jpeg",
    fileSize: 59639,
    width: 600,
    height: 400,
    altText: "Client Review and Instant Feedback Creative Approval Pipeline",
    title: "Asset Approval Card",
    caption: "Module illustration for Creative Social Publishing and Client Proofing",
    uploadedAt: "2026-01-01T00:00:00.000Z",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
];

// Supported image types
export const ALLOWED_MEDIA_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif",
];

export const MAX_MEDIA_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

/**
 * Lists all media assets for the Admin Media Library.
 */
export async function getAllMediaAdmin(searchQuery?: string): Promise<MediaItem[]> {
  const adminDb = getAdminFirestore();
  let items: MediaItem[] = [];

  if (adminDb) {
    try {
      const snap = await adminDb
        .collection(COLLECTIONS.MEDIA)
        .orderBy("uploadedAt", "desc")
        .get();

      if (!snap.empty) {
        items = snap.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            ...d,
            uploadedAt: d.uploadedAt?.toDate ? d.uploadedAt.toDate().toISOString() : d.uploadedAt,
            createdAt: d.createdAt?.toDate ? d.createdAt.toDate().toISOString() : d.createdAt,
            updatedAt: d.updatedAt?.toDate ? d.updatedAt.toDate().toISOString() : d.updatedAt,
          } as MediaItem;
        });
      }
    } catch (error) {
      console.warn("[getAllMediaAdmin] Firestore read fallback:", error);
    }
  }

  // If no Firestore items yet, merge with seed media
  if (items.length === 0) {
    items = [...SEED_MEDIA_ITEMS];
  } else {
    // Ensure seed media items are merged if not already present by URL
    const existingUrls = new Set(items.map((i) => i.url));
    for (const seed of SEED_MEDIA_ITEMS) {
      if (!existingUrls.has(seed.url)) {
        items.push(seed);
      }
    }
  }

  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    items = items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.fileName.toLowerCase().includes(q) ||
        item.altText.toLowerCase().includes(q) ||
        (item.title && item.title.toLowerCase().includes(q))
    );
  }

  return items;
}

/**
 * Retrieves an individual media item by ID.
 */
export async function getMediaItemById(id: string): Promise<MediaItem | null> {
  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      const doc = await adminDb.collection(COLLECTIONS.MEDIA).doc(id).get();
      if (doc.exists) {
        const d = doc.data()!;
        return {
          id: doc.id,
          ...d,
          uploadedAt: d.uploadedAt?.toDate ? d.uploadedAt.toDate().toISOString() : d.uploadedAt,
          createdAt: d.createdAt?.toDate ? d.createdAt.toDate().toISOString() : d.createdAt,
          updatedAt: d.updatedAt?.toDate ? d.updatedAt.toDate().toISOString() : d.updatedAt,
        } as MediaItem;
      }
    } catch (e) {
      console.warn(`[getMediaItemById:${id}] Error:`, e);
    }
  }

  const seed = SEED_MEDIA_ITEMS.find((s) => s.id === id);
  return seed || null;
}

/**
 * Updates metadata for an existing media asset (altText, title, caption).
 */
export async function saveMediaMetadata(
  id: string,
  metadata: { altText?: string; title?: string; caption?: string }
): Promise<{ success: boolean; error?: string }> {
  const adminDb = getAdminFirestore();
  if (!adminDb) {
    return { success: true };
  }

  try {
    const payload: Record<string, unknown> = {
      updatedAt: FieldValue.serverTimestamp(),
    };
    if (metadata.altText !== undefined) payload.altText = metadata.altText.trim();
    if (metadata.title !== undefined) payload.title = metadata.title.trim();
    if (metadata.caption !== undefined) payload.caption = metadata.caption.trim();

    await adminDb.collection(COLLECTIONS.MEDIA).doc(id).set(payload, { merge: true });
    return { success: true };
  } catch (error) {
    console.error("[saveMediaMetadata] Error:", error);
    return { success: false, error: "Failed to update media metadata." };
  }
}

/**
 * Checks across all CMS collections whether a media URL is currently referenced.
 * Prevents accidental broken images in production!
 */
export async function checkMediaUsage(mediaUrl: string): Promise<MediaUsageCheckResult> {
  const references: MediaUsageReference[] = [];
  if (!mediaUrl) return { isUsed: false, references };

  try {
    const [blogs, services, portfolio, team, testimonials, settings] = await Promise.all([
      getAllCmsBlogPostsAdmin(),
      getAllCmsServicesAdmin(),
      getAllCmsPortfolioAdmin(),
      getAllCmsTeamMembersAdmin(),
      getAllCmsTestimonialsAdmin(),
      getCmsSiteSettings(),
    ]);

    // 1. Check Blogs
    for (const b of blogs) {
      if (b.featuredImage === mediaUrl) {
        references.push({ collection: "Blog Post", entityId: b.id, title: b.title, field: "Featured Image" });
      }
      if (b.author?.avatar === mediaUrl) {
        references.push({ collection: "Blog Post", entityId: b.id, title: b.title, field: "Author Avatar" });
      }
      if (b.content && b.content.includes(mediaUrl)) {
        references.push({ collection: "Blog Post", entityId: b.id, title: b.title, field: "Body Content Image" });
      }
    }

    // 2. Check Services
    for (const s of services) {
      if (s.icon === mediaUrl) {
        references.push({ collection: "Service", entityId: s.id, title: s.title, field: "Service Icon" });
      }
    }

    // 3. Check Portfolio
    for (const p of portfolio) {
      if (p.heroImage === mediaUrl) {
        references.push({ collection: "Portfolio Case Study", entityId: p.id, title: p.title, field: "Hero Image" });
      }
      if (p.galleryImages && p.galleryImages.includes(mediaUrl)) {
        references.push({ collection: "Portfolio Case Study", entityId: p.id, title: p.title, field: "Gallery Image" });
      }
    }

    // 4. Check Team
    for (const t of team) {
      if (t.avatar === mediaUrl) {
        references.push({ collection: "Team Member", entityId: t.id, title: t.name, field: "Avatar" });
      }
    }

    // 5. Check Testimonials
    for (const tm of testimonials) {
      if (tm.clientAvatar === mediaUrl) {
        references.push({ collection: "Testimonial", entityId: tm.id, title: tm.clientName, field: "Avatar" });
      }
    }

    // 6. Check Site Settings
    if (settings) {
      if (settings.logoUrl === mediaUrl) {
        references.push({ collection: "Site Settings", entityId: settings.id, title: "Global Settings", field: "Logo" });
      }
      if (settings.faviconUrl === mediaUrl) {
        references.push({ collection: "Site Settings", entityId: settings.id, title: "Global Settings", field: "Favicon" });
      }
      if (settings.defaultSEO?.ogImage === mediaUrl) {
        references.push({ collection: "Site Settings", entityId: settings.id, title: "Global Settings", field: "Default OG Image" });
      }
    }
  } catch (error) {
    console.warn("[checkMediaUsage] Reference scan error:", error);
  }

  return {
    isUsed: references.length > 0,
    references,
  };
}

/**
 * Deletes a media asset document and its underlying stored file.
 */
export async function deleteMediaAsset(
  id: string,
  bypassUsageCheck: boolean = false
): Promise<{ success: boolean; error?: string; inUseWarning?: MediaUsageReference[] }> {
  const item = await getMediaItemById(id);
  if (!item) {
    return { success: false, error: "Media item not found." };
  }

  // Reference safety check
  if (!bypassUsageCheck) {
    const usage = await checkMediaUsage(item.url);
    if (usage.isUsed) {
      return {
        success: false,
        error: "This media asset is currently in use across your website content.",
        inUseWarning: usage.references,
      };
    }
  }

  // Delete physical file if saved in local uploads
  if (item.url.startsWith("/uploads/media/")) {
    try {
      const filePath = path.join(process.cwd(), "public", item.url);
      await fs.unlink(filePath).catch(() => {});
    } catch {
      // Ignore missing file errors
    }
  }

  // Delete from Firestore
  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      await adminDb.collection(COLLECTIONS.MEDIA).doc(id).delete();
    } catch (error) {
      console.error("[deleteMediaAsset] Firestore delete error:", error);
      return { success: false, error: "Failed to delete media document." };
    }
  }

  return { success: true };
}

/**
 * Verifies file integrity using Magic Byte headers to prevent MIME spoofing.
 */
export function verifyImageMagicBytes(buffer: Buffer, mimeType: string): boolean {
  if (!buffer || buffer.length < 4) return false;

  const normalizedMime = mimeType.toLowerCase();

  switch (normalizedMime) {
    case "image/jpeg":
      return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;

    case "image/png":
      return (
        buffer[0] === 0x89 &&
        buffer[1] === 0x50 &&
        buffer[2] === 0x4e &&
        buffer[3] === 0x47
      );

    case "image/gif":
      return buffer.toString("ascii", 0, 4) === "GIF8";

    case "image/webp":
      return (
        buffer.length >= 12 &&
        buffer.toString("ascii", 0, 4) === "RIFF" &&
        buffer.toString("ascii", 8, 12) === "WEBP"
      );

    case "image/svg+xml": {
      const text = buffer.toString("utf-8", 0, Math.min(buffer.length, 1024)).trim();
      return text.includes("<svg") || text.includes("<?xml");
    }

    default:
      return false;
  }
}

/**
 * Sanitizes SVG vector assets to eliminate embedded scripts, XXE entities, and malicious event handlers.
 */
export function sanitizeSvgBuffer(buffer: Buffer): Buffer {
  let svgText = buffer.toString("utf-8");

  // 1. Remove XML External Entity (XXE) declarations
  svgText = svgText.replace(/<!DOCTYPE[\s\S]*?>/gi, "");
  svgText = svgText.replace(/<!ENTITY[\s\S]*?>/gi, "");

  // 2. Remove script tags and embedded foreign objects
  svgText = svgText.replace(/<script[\s\S]*?<\/script>/gi, "");
  svgText = svgText.replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, "");
  svgText = svgText.replace(/<script[^>]*\/>/gi, "");

  // 3. Remove inline event handlers (onload, onerror, onclick, etc.)
  svgText = svgText.replace(/\s+on[a-z]+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, "");

  // 4. Remove javascript: URIs in xlink:href or href
  svgText = svgText.replace(
    /(href|xlink:href)\s*=\s*(?:'|")\s*javascript:[^"'>]*\s*(?:'|")/gi,
    '$1="#"'
  );

  return Buffer.from(svgText, "utf-8");
}

/**
 * Handles secure file upload with validation (MIME, magic bytes, size, sanitization)
 * and dual storage support (Firebase Storage or safe Next.js public/uploads/media).
 */
export async function uploadMediaFile({
  buffer,
  fileName,
  mimeType,
  altText = "",
  title = "",
  uploadedBy = "admin",
}: {
  buffer: Buffer;
  fileName: string;
  mimeType: string;
  altText?: string;
  title?: string;
  uploadedBy?: string;
}): Promise<{ success: boolean; item?: MediaItem; error?: string }> {
  const normalizedMime = mimeType.toLowerCase().trim();

  // 1. Validate MIME type against whitelist
  if (!ALLOWED_MEDIA_MIME_TYPES.includes(normalizedMime)) {
    return {
      success: false,
      error: `Unsupported file type (${mimeType}). Only JPEG, PNG, WebP, SVG, and GIF images are allowed.`,
    };
  }

  // 2. Validate file size
  if (buffer.length > MAX_MEDIA_FILE_SIZE) {
    return {
      success: false,
      error: `File size exceeds the 5MB limit (${(buffer.length / (1024 * 1024)).toFixed(2)}MB).`,
    };
  }

  if (buffer.length < 16) {
    return {
      success: false,
      error: "File buffer is corrupted or empty.",
    };
  }

  // 3. Magic Byte Verification (Header Inspection)
  if (!verifyImageMagicBytes(buffer, normalizedMime)) {
    return {
      success: false,
      error: "File signature mismatch: The uploaded file content does not match its declared image MIME type.",
    };
  }

  // 4. Sanitize SVG payloads if SVG
  let finalBuffer = buffer;
  if (normalizedMime === "image/svg+xml") {
    finalBuffer = sanitizeSvgBuffer(buffer);
  }

  // 5. Sanitize file name & extension alignment
  const rawExt = path.extname(fileName).toLowerCase();
  const validExtensionsMap: Record<string, string[]> = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "image/webp": [".webp"],
    "image/gif": [".gif"],
    "image/svg+xml": [".svg"],
  };

  const allowedExts = validExtensionsMap[normalizedMime] || [".jpg"];
  const safeExt = allowedExts.includes(rawExt) ? rawExt : allowedExts[0];

  // Block double extension attacks (e.g. `exploit.php.jpg` -> `exploit-php.jpg`)
  const baseName = path
    .basename(fileName, rawExt)
    .toLowerCase()
    .replace(/[^\w-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const safeFileName = `${Date.now()}-${baseName || "media"}${safeExt}`;
  const relativeUploadPath = `/uploads/media/${safeFileName}`;
  let storagePath = `media/${safeFileName}`;
  let publicUrl = relativeUploadPath;

  // 6. Try Firebase Storage if bucket is configured
  let storedInCloud = false;
  const adminApp = getFirebaseAdminApp();
  if (adminApp && process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) {
    try {
      const storage = getAdminStorage();
      if (!storage) throw new Error("Firebase Storage unavailable");
      const bucket = storage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
      const file = bucket.file(`media/${safeFileName}`);
      await file.save(finalBuffer, {
        metadata: { contentType: normalizedMime },
        public: true,
      });
      // Signed or public URL
      publicUrl = `https://storage.googleapis.com/${bucket.name}/media/${safeFileName}`;
      storagePath = `gs://${bucket.name}/media/${safeFileName}`;
      storedInCloud = true;
    } catch (cloudError) {
      console.warn("[uploadMediaFile] Firebase Storage write failed, falling back to local disk:", cloudError);
    }
  }

  // 7. Fallback to local uploads directory if not stored in cloud
  if (!storedInCloud) {
    try {
      const targetDir = path.join(process.cwd(), "public", "uploads", "media");
      await fs.mkdir(targetDir, { recursive: true });
      const targetFilePath = path.join(targetDir, safeFileName);
      await fs.writeFile(targetFilePath, finalBuffer);
      publicUrl = relativeUploadPath;
      storagePath = `public/uploads/media/${safeFileName}`;
    } catch (fsError) {
      console.error("[uploadMediaFile] Local disk write error:", fsError);
      return {
        success: false,
        error: "Failed to persist uploaded file to storage.",
      };
    }
  }

  // 6. Register Media Document in Firestore
  const now = new Date().toISOString();
  const mediaItem: MediaItem = {
    id: `media-${Date.now()}`,
    name: title || baseName.replace(/-/g, " "),
    fileName: safeFileName,
    url: publicUrl,
    storagePath,
    mimeType,
    fileSize: buffer.length,
    altText: altText.trim(),
    title: title.trim() || undefined,
    uploadedAt: now,
    uploadedBy,
    createdAt: now,
    updatedAt: now,
  };

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      const ref = await adminDb.collection(COLLECTIONS.MEDIA).add({
        ...mediaItem,
        uploadedAt: FieldValue.serverTimestamp(),
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
      mediaItem.id = ref.id;
    } catch (dbError) {
      console.warn("[uploadMediaFile] Firestore registration warning:", dbError);
    }
  }

  return { success: true, item: mediaItem };
}

/**
 * Resets the media library to canonical DigiVigee production assets.
 */
export async function resetMediaToDefaultsAdmin(): Promise<{
  success: boolean;
  count: number;
  items: MediaItem[];
  error?: string;
}> {
  const adminDb = getAdminFirestore();
  const canonicalItems = [...SEED_MEDIA_ITEMS];

  if (!adminDb) {
    return { success: true, count: canonicalItems.length, items: canonicalItems };
  }

  try {
    const snap = await adminDb.collection(COLLECTIONS.MEDIA).get();
    const batch = adminDb.batch();

    // Delete existing records
    snap.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // Write all canonical seed items
    for (const item of canonicalItems) {
      const docRef = adminDb.collection(COLLECTIONS.MEDIA).doc(item.id);
      batch.set(docRef, {
        ...item,
        uploadedAt: FieldValue.serverTimestamp(),
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
    }

    await batch.commit();
    return { success: true, count: canonicalItems.length, items: canonicalItems };
  } catch (error) {
    console.error("[resetMediaToDefaultsAdmin] Error resetting media:", error);
    return { success: false, count: 0, items: [], error: "Failed to reset media library." };
  }
}

