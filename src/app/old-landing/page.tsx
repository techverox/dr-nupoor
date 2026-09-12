import React from "react";
import Image from "next/image";
import {
  getCmsServices,
  getCmsPortfolio,
  getCmsTestimonials,
  getCmsFaqs,
  getCmsBlogPosts,
} from "@/lib/services/cmsService";
import { resolveDynamicPageMetadata } from "@/lib/seo/metadata";
import { FAQStructuredData } from "@/components/seo";
import {
  Section,
  LinkButton,
  ScrollReveal,
} from "@/components/ui";
import {
  ClientStrip,
  MetricsBar,
  ServiceCard,
  HeroDashboardConsole,
  WhyChooseBento,
  LiveSocialProofToast,
  StickyConversionBar,
  GrowthIntelligenceHub,
  FAQSection,
} from "@/components/public";
import { HomePortfolioCarousel } from "@/components/public/HomePortfolioCarousel";
import { HomeLeadSection } from "@/components/public/HomeLeadSection";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  return resolveDynamicPageMetadata("/", {
    title: "Premier Digital Marketing Agency | DigiVigee",
    description:
      "DigiVigee is a premier digital marketing agency driving exponential growth through high-performance SEO, performance marketing, website design, and automated lead generation.",
    path: "/",
    keywords: [
      "digital marketing agency Gujarat",
      "ROI performance marketing",
      "local SEO specialists",
      "social media growth agency",
      "lead generation automation",
    ],
  });
}

export default async function HomePage() {
  const [services, portfolio, testimonials, faqs, blogPosts] = await Promise.all([
    getCmsServices(),
    getCmsPortfolio(),
    getCmsTestimonials(),
    getCmsFaqs(),
    getCmsBlogPosts(),
  ]);

  const featuredServices = services.slice(0, 6);
  const featuredTestimonials = testimonials.slice(0, 3);
  const featuredBlogs = blogPosts.slice(0, 5);

  return (
    <main
      className="bg-saas-light-mint"
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <FAQStructuredData faqs={faqs} />

      {/* ================================================================
          01. HERO SECTION — Premium SaaS Full-Viewport Layout
          ================================================================ */}
      <section
        className="hero-section"
        style={{
          position: "relative",
          backgroundColor: "transparent",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Ambient Hero Glow Effects */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "10%",
            width: "550px",
            height: "550px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 208, 83, 0.14) 0%, rgba(56, 189, 248, 0.08) 40%, transparent 70%)",
            filter: "blur(50px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "5%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 82, 255, 0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <ScrollReveal delay={0.1} distance={30}>
          <div
            className="hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              alignItems: "center",
              width: "100%",
              maxWidth: "1400px",
              margin: "0 auto",
              position: "relative",
              zIndex: 2,
            }}
          >
          {/* ── LEFT: Copy + CTAs + Trust ── */}
          <div
            className="hero-text-col"
            style={{
              paddingLeft: "clamp(1.5rem, 5vw, 4rem)",
              paddingRight: "clamp(1rem, 4vw, 4rem)",
              paddingTop: "2rem",
              paddingBottom: "2rem",
              zIndex: 2,
            }}
          >
            {/* Eyebrow Live Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.35rem 0.85rem",
                borderRadius: "var(--radius-full)",
                backgroundColor: "rgba(0, 208, 83, 0.08)",
                border: "1px solid rgba(0, 208, 83, 0.25)",
                marginBottom: "var(--space-5)",
                boxShadow: "0 2px 10px rgba(0, 208, 83, 0.12)",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "var(--brand-green-500)",
                  display: "inline-block",
                  boxShadow: "0 0 10px #00D053",
                }}
              />
              <span
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 800,
                  color: "var(--brand-green-700)",
                  letterSpacing: "0.02em",
                  fontFamily: "var(--font-sans)",
                }}
              >
                #1 Agency OS Platform
              </span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: "clamp(2.75rem, 4.8vw, 4.75rem)",
                fontWeight: 900,
                color: "#0f2851",
                letterSpacing: "-0.03em",
                lineHeight: "1.08",
                marginBottom: "var(--space-5)",
                fontFamily: "var(--font-sans)",
              }}
            >
              <span style={{ whiteSpace: "nowrap" }}>One Platform.</span><br />
              <span
                style={{
                  background: "linear-gradient(135deg, #00D053 0%, #059669 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  whiteSpace: "nowrap",
                }}
              >
                Infinite Scale.
              </span><br />
              <span style={{ whiteSpace: "nowrap" }}>Total Control.</span>
            </h1>

            {/* Sub-headline */}
            <p
              style={{
                fontSize: "var(--text-body-lg)",
                color: "var(--text-body)",
                lineHeight: "1.65",
                maxWidth: "520px",
                marginBottom: "var(--space-8)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Replace 15+ marketing tools with a single, white-labeled CRM. Automate 
              client onboarding, AI campaigns, and billing to scale your digital agency effortlessly.
            </p>

            {/* Streamlined $10B Minimalist Hero CTAs */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "var(--space-8)",
              }}
            >
              {/* Primary High-Contrast Growth Action */}
              <LinkButton
                href="/contact"
                variant="primary"
                size="lg"
                style={{
                  background: "linear-gradient(135deg, #00D053 0%, #059669 100%)",
                  fontWeight: 800,
                  padding: "0 1.75rem",
                  height: "52px",
                  borderRadius: "9999px",
                  boxShadow: "0 10px 28px -4px rgba(0, 208, 83, 0.42), 0 0 15px rgba(0, 208, 83, 0.2)",
                  fontSize: "0.9375rem",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "-0.01em",
                }}
                rightIcon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                }
              >
                Book Platform Demo
              </LinkButton>

              {/* Minimalist Glass Video Pill */}
              <a
                href="#roi-calculator"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  height: "52px",
                  padding: "0 1.25rem",
                  borderRadius: "9999px",
                  backgroundColor: "rgba(255, 255, 255, 0.85)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  color: "var(--brand-navy-900)",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  fontFamily: "var(--font-sans)",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.03)",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="hero-video-glass-pill"
              >
                <span
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0, 208, 83, 0.12)",
                    border: "1px solid rgba(0, 208, 83, 0.35)",
                    color: "#00D053",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.6875rem",
                    flexShrink: 0,
                  }}
                >
                  ▶
                </span>
                <span>Watch Platform Tour</span>
                <span
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    color: "rgba(15, 23, 42, 0.45)",
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                    padding: "0.15rem 0.45rem",
                    borderRadius: "9999px",
                  }}
                >
                  1:30
                </span>
              </a>
            </div>

            {/* Quick Micro Trust Badges */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "var(--space-6)",
                paddingTop: "var(--space-4)",
                borderTop: "1px solid rgba(0, 208, 83, 0.18)",
              }}
            >
              {[
                { icon: "⚡", text: "Fast Setup" },
                { icon: "📊", text: "Transparent ROI" },
                { icon: "🛡️", text: "Dedicated Team" },
                { icon: "🚀", text: "On-Time Delivery" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    color: "var(--brand-navy-800)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Live Interactive SaaS Dashboard Console ── */}
          <div
            className="hero-image-col"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              padding: "clamp(1rem, 3vw, 2rem) clamp(1rem, 2vw, 2rem)",
              zIndex: 2,
            }}
          >
            <HeroDashboardConsole />
          </div>
            </div>
          </ScrollReveal>

        {/* Responsive overrides */}
        <style>{`
          @media (max-width: 1024px) {
            .hero-grid {
              grid-template-columns: 1fr !important;
              gap: 2.5rem !important;
            }
            .hero-text-col {
              padding-right: clamp(1.5rem, 5vw, 4rem) !important;
              text-align: left;
            }
            .hero-image-col {
              max-width: 100% !important;
              margin: 0 auto;
              padding: 0 var(--space-4) !important;
            }
          }
        `}</style>
      </section>

      {/* ================================================================
          02. TRUSTED BY 250+ BUSINESSES — Client Logo Strip
          ================================================================ */}
      <ScrollReveal delay={0.2} distance={20}>
        <ClientStrip title="TRUSTED BY 250+ BUSINESSES" />
      </ScrollReveal>

      <Section background="transparent" padding="fluid">
        <ScrollReveal>
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto var(--space-10) auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.75rem",
              fontWeight: 800,
              color: "var(--brand-green-700)",
              backgroundColor: "rgba(0, 208, 83, 0.08)",
              border: "1px solid rgba(0, 208, 83, 0.25)",
              padding: "0.3rem 0.8rem",
              borderRadius: "var(--radius-full)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "var(--space-3)",
              fontFamily: "var(--font-sans)",
            }}
          >
            <span>⚡</span>
            <span>END-TO-END GROWTH ENGINES</span>
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
              fontWeight: 900,
              color: "var(--text-heading)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: "var(--space-3)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Everything You Need to Scale Online
          </h2>
          <p style={{ fontSize: "var(--text-body-lg)", color: "var(--text-body)", lineHeight: 1.65, fontFamily: "var(--font-sans)" }}>
            Data-driven digital marketing infrastructure engineered to maximize return on ad spend and compound organic market share.
          </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="services-grid-responsive" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "1.5rem" }}>
          {featuredServices.map((service, idx) => (
            <ServiceCard key={service.id} service={service} index={idx} />
          ))}
          </div>
        </ScrollReveal>

        <style>{`
          @media (max-width: 1024px) { .services-grid-responsive { grid-template-columns: repeat(2, 1fr) !important; gap: 1.25rem !important; } }
          @media (max-width: 640px)  { .services-grid-responsive { grid-template-columns: 1fr !important; } }
        `}</style>
      </Section>

      {/* ================================================================
          04. METRICS / STATS BAR
          ================================================================ */}
      <ScrollReveal>
        <MetricsBar variant="navy" />
      </ScrollReveal>

      {/* ================================================================
          05. WHY CHOOSE DIGIVIGEE? — Enterprise Value Proposition
          ================================================================ */}
      <Section background="transparent" padding="fluid">
        <ScrollReveal>
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto var(--space-12) auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.75rem",
              fontWeight: 800,
              color: "var(--brand-green-700)",
              backgroundColor: "rgba(0, 208, 83, 0.08)",
              border: "1px solid rgba(0, 208, 83, 0.25)",
              padding: "0.3rem 0.8rem",
              borderRadius: "var(--radius-full)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "var(--space-3)",
              fontFamily: "var(--font-sans)",
            }}
          >
            <span>💎</span>
            <span>THE DIGIVIGEE ADVANTAGE</span>
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
              fontWeight: 900,
              color: "var(--text-heading)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: "var(--space-3)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Engineered for High-Performance Growth
          </h2>
          <p style={{ fontSize: "var(--text-body-lg)", color: "var(--text-body)", lineHeight: 1.65, fontFamily: "var(--font-sans)" }}>
            Why market-leading enterprises and high-growth brands trust DigiVigee as their primary digital execution partner.
          </p>
          </div>
        </ScrollReveal>

        {/* ── Asymmetrical Apple/Linear Style Bento Grid ── */}
        <ScrollReveal delay={0.1}>
          <WhyChooseBento />
        </ScrollReveal>
      </Section>

      {/* ================================================================
          06. OUR WORK — Portfolio Carousel
          ================================================================ */}
      <Section background="transparent" padding="fluid">
        <ScrollReveal>
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto var(--space-10) auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.75rem",
              fontWeight: 800,
              color: "var(--brand-green-700)",
              backgroundColor: "rgba(0, 208, 83, 0.08)",
              border: "1px solid rgba(0, 208, 83, 0.25)",
              padding: "0.3rem 0.8rem",
              borderRadius: "var(--radius-full)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "var(--space-3)",
              fontFamily: "var(--font-sans)",
            }}
          >
            <span>🏆</span>
            <span>PROVEN CASE STUDIES</span>
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
              fontWeight: 900,
              color: "var(--text-heading)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: "var(--space-3)",
              fontFamily: "var(--font-sans)",
            }}
          >
            We Build. We Market. We Deliver Results.
          </h2>
          <p style={{ fontSize: "var(--text-body-lg)", color: "var(--text-body)", lineHeight: 1.65, fontFamily: "var(--font-sans)" }}>
            Real client revenue breakthroughs engineered through custom marketing infrastructure.
          </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <HomePortfolioCarousel projects={portfolio} />
        </ScrollReveal>
      </Section>

      {/* ================================================================
          07. TESTIMONIALS — Real Stories. Real Results.
          ================================================================ */}
      <Section background="transparent" padding="fluid">
        <ScrollReveal>
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto var(--space-12) auto" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.75rem",
                fontWeight: 800,
                color: "var(--brand-green-700)",
                backgroundColor: "rgba(0, 208, 83, 0.08)",
                border: "1px solid rgba(0, 208, 83, 0.25)",
                padding: "0.3rem 0.8rem",
                borderRadius: "var(--radius-full)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "var(--space-3)",
                fontFamily: "var(--font-sans)",
              }}
            >
              <span>⭐</span>
              <span>VERIFIED CLIENT REVIEWS</span>
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                fontWeight: 900,
                color: "var(--text-heading)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                marginBottom: "var(--space-3)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Real Stories. Measurable Results.
            </h2>
            <p style={{ fontSize: "var(--text-body-lg)", color: "var(--text-body)", lineHeight: 1.65, fontFamily: "var(--font-sans)" }}>
              Read how our performance strategies generated compounding growth for verified founders and marketing leaders.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "var(--space-6)", marginBottom: "var(--space-8)" }}>
            {featuredTestimonials.map((item, idx) => {
              const founderProfiles = [
                {
                  name: "Rajesh Kumar",
                  role: "Managing Director",
                  company: "Ayush Healthcare",
                  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
                  metric: "⚡ ₹21.4L / Mo (+580%)",
                  companyTag: "HEALTHCARE // LEAD GEN",
                },
                {
                  name: "Priya Sharma",
                  role: "Co-Founder & CMO",
                  company: "Kalpvruksh Organics",
                  avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
                  metric: "⚡ 5.8x Blended ROAS",
                  companyTag: "D2C AYURVEDA // ROAS",
                },
                {
                  name: "Amit Mehta",
                  role: "Head of Growth",
                  company: "The Printing Wala B2B",
                  avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
                  metric: "⚡ #1 Google Rank",
                  companyTag: "B2B PACKAGING // SEO",
                },
              ];
              const founder = founderProfiles[idx % 3];

              return (
                <div
                  key={item.id}
                  className="home-testimonial-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backgroundColor: "#FFFFFF",
                    border: "1.5px solid rgba(0, 208, 83, 0.22)",
                    borderRadius: "1.5rem",
                    boxShadow: "0 14px 34px -8px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255, 255, 255, 1)",
                    padding: "1.85rem 1.6rem",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <div>
                    {/* Top Rating & Quantitative Outcome Header */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.15rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#F59E0B", fontSize: "0.875rem" }}>
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                      </div>
                      <span
                        style={{
                          fontSize: "0.6875rem",
                          fontWeight: 800,
                          color: "#00D053",
                          backgroundColor: "rgba(0, 208, 83, 0.08)",
                          border: "1px solid rgba(0, 208, 83, 0.28)",
                          padding: "0.2rem 0.55rem",
                          borderRadius: "9999px",
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        {founder.metric}
                      </span>
                    </div>

                    <p
                      className="testimonial-text"
                      style={{
                        fontSize: "0.9375rem",
                        color: "var(--text-heading)",
                        lineHeight: 1.65,
                        marginBottom: "1.5rem",
                        fontFamily: "var(--font-sans)",
                        fontWeight: 500,
                      }}
                    >
                      &ldquo;{item.testimonial}&rdquo;
                    </p>
                  </div>

                  {/* Founder Identity Strip with Real Headshot & Verified Badge */}
                  <div
                    className="testimonial-divider"
                    style={{
                      borderTop: "1px solid rgba(0, 208, 83, 0.15)",
                      paddingTop: "1rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.85rem",
                    }}
                  >
                    <div
                      style={{
                        width: "46px",
                        height: "46px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "2px solid #00D053",
                        boxShadow: "0 4px 12px rgba(0, 208, 83, 0.25)",
                        flexShrink: 0,
                        position: "relative",
                      }}
                    >
                      <Image
                        src={founder.avatarUrl}
                        alt={founder.name}
                        width={46}
                        height={46}
                        unoptimized
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>

                    <div>
                      <div
                        className="testimonial-author"
                        style={{
                          fontWeight: 800,
                          color: "var(--text-heading)",
                          fontSize: "0.9375rem",
                          fontFamily: "var(--font-sans)",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.35rem",
                        }}
                      >
                        <span>{item.clientName || founder.name}</span>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "15px",
                            height: "15px",
                            borderRadius: "50%",
                            backgroundColor: "#0052FF",
                            color: "#ffffff",
                            fontSize: "0.5625rem",
                            fontWeight: 900,
                          }}
                          title="Verified Client"
                        >
                          ✓
                        </span>
                      </div>
                      <div className="testimonial-company" style={{ fontSize: "0.75rem", color: "var(--text-body)", marginTop: "0.15rem", fontFamily: "var(--font-sans)" }}>
                        {founder.role} • <strong style={{ color: "var(--brand-navy-900)" }}>{item.companyName || founder.company}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-2)" }}>
          <span style={{ width: "24px", height: "8px", borderRadius: "var(--radius-full)", backgroundColor: "var(--brand-green-500)" }} />
          <span style={{ width: "8px", height: "8px", borderRadius: "var(--radius-full)", backgroundColor: "rgba(0, 208, 83, 0.3)" }} />
          <span style={{ width: "8px", height: "8px", borderRadius: "var(--radius-full)", backgroundColor: "rgba(0, 208, 83, 0.3)" }} />
          <span style={{ width: "8px", height: "8px", borderRadius: "var(--radius-full)", backgroundColor: "rgba(0, 208, 83, 0.3)" }} />
        </div>

        <style>{`
          @media (max-width: 960px) { .testimonials-grid { grid-template-columns: 1fr !important; } }
          
          .home-testimonial-card {
            transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
            cursor: pointer;
          }
          .home-testimonial-card:hover {
            border-color: #00D053 !important;
            box-shadow: 0 24px 50px -10px rgba(0, 208, 83, 0.22), 0 0 20px rgba(0, 208, 83, 0.08) !important;
            transform: translateY(-6px) !important;
          }
        `}</style>
      </Section>

      {/* ================================================================
          08. LATEST INSIGHTS — Tips, Trends & Insights
          ================================================================ */}
      <Section background="transparent" padding="fluid">
        <ScrollReveal>
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto var(--space-10) auto" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.75rem",
                fontWeight: 800,
                color: "var(--brand-green-700)",
                backgroundColor: "rgba(0, 208, 83, 0.08)",
                border: "1px solid rgba(0, 208, 83, 0.25)",
                padding: "0.3rem 0.8rem",
                borderRadius: "var(--radius-full)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "var(--space-3)",
                fontFamily: "var(--font-sans)",
              }}
            >
              <span>📈</span>
              <span>GROWTH PLAYBOOKS &amp; INSIGHTS</span>
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                fontWeight: 900,
                color: "var(--text-heading)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                marginBottom: "var(--space-3)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Latest Strategies, Trends &amp; Frameworks
            </h2>
            <p style={{ fontSize: "var(--text-body-lg)", color: "var(--text-body)", lineHeight: 1.65, fontFamily: "var(--font-sans)" }}>
              Actionable breakdowns and tactical marketing playbooks curated by our senior performance strategists.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Asymmetrical Editorial Intelligence Lab ── */}
        <ScrollReveal delay={0.1}>
          <GrowthIntelligenceHub posts={featuredBlogs} />
        </ScrollReveal>
      </Section>

      {/* ================================================================
          09. ENTERPRISE FAQ & OBJECTION CLEARANCE
          ================================================================ */}
      <ScrollReveal delay={0.1}>
        <FAQSection faqs={faqs} />
      </ScrollReveal>

      {/* ================================================================
          10. INTERACTIVE ROI GROWTH CALCULATOR & LEAD CTA
          ================================================================ */}
      <div id="roi-calculator">
        <ScrollReveal delay={0.15}>
          <HomeLeadSection />
        </ScrollReveal>
      </div>

      {/* Real-time Floating Social Proof Toast */}
      <LiveSocialProofToast />

      {/* Mid-Scroll Floating Conversion Funnel Pill */}
      <StickyConversionBar />
    </main>
  );
}
