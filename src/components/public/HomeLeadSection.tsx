"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type GoalType = "ecom" | "leads" | "brand";

const GOAL_OPTIONS = [
  { id: "ecom" as GoalType, label: "E-commerce Sales", roas: 4.8, icon: "🛍️", desc: "Maximize purchase ROAS & scale revenue" },
  { id: "leads" as GoalType, label: "High-Intent Inquiries", roas: 5.4, icon: "⚡", desc: "Acquire qualified B2B & clinic leads" },
  { id: "brand" as GoalType, label: "Full-Funnel Scaling", roas: 4.2, icon: "🚀", desc: "Omnichannel market dominance" },
];

export function HomeLeadSection() {
  const [monthlySpend, setMonthlySpend] = useState(250000); // 2.5 Lakhs default
  const [selectedGoal, setSelectedGoal] = useState<GoalType>("ecom");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const currentGoal = GOAL_OPTIONS.find((g) => g.id === selectedGoal) || GOAL_OPTIONS[0];

  // Dynamic calculations
  const projectedPipeline = Math.round(monthlySpend * currentGoal.roas);
  const projectedLeads = Math.round(monthlySpend / 140);

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)} Lakhs`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          service: `ROI Calculator: ${currentGoal.label} (Budget: ${formatCurrency(monthlySpend)})`,
          message: `Calculated Target Pipeline: ${formatCurrency(projectedPipeline)} with ${currentGoal.roas}x ROAS.`,
          source: "roi_growth_calculator",
          formType: "interactive_calculator_claim",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Unable to submit. Please message us on WhatsApp.");
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
      setIsSubmitting(false);
    } catch {
      setErrorMessage("Network error. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="roi-calculator-section"
      style={{
        backgroundColor: "transparent",
        paddingTop: "clamp(4rem, 6vw, 6rem)",
        paddingBottom: "clamp(4rem, 6vw, 6rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container size="wide">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto var(--space-10) auto" }}>
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
              padding: "0.3rem 0.85rem",
              borderRadius: "9999px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "var(--space-3)",
              fontFamily: "var(--font-sans)",
            }}
          >
            <span>🧮</span>
            <span>INTERACTIVE GROWTH ESTIMATOR</span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 3.8vw, 3rem)",
              fontWeight: 900,
              color: "var(--text-heading)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: "var(--space-3)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Calculate Your Revenue Growth Potential
          </h2>
          <p style={{ fontSize: "var(--text-body-lg)", color: "var(--text-body)", lineHeight: 1.65, fontFamily: "var(--font-sans)" }}>
            Select your monthly marketing budget to simulate projected pipeline, estimated qualified inquiries, and blended ROAS scaling.
          </p>
        </div>

        {/* Master Interactive Calculator Container */}
        <div
          className="calculator-glass-box"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1.5px solid rgba(0, 208, 83, 0.3)",
            borderRadius: "2rem",
            boxShadow: "0 24px 60px -12px rgba(15, 23, 42, 0.08), 0 0 30px rgba(0, 208, 83, 0.12)",
            padding: "clamp(1.5rem, 3vw, 2.5rem)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(1.5rem, 2.5vw, 2.25rem)",
            alignItems: "center",
          }}
        >
          {/* ── LEFT: Interactive Controls (Spend Slider + Goals) ── */}
          <div>
            {/* 1. Monthly Budget Slider with Visual Tick Marks */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.875rem", fontWeight: 800, color: "var(--text-heading)", fontFamily: "var(--font-sans)" }}>
                  Monthly Ad Spend Budget:
                </span>
                <span
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 900,
                    color: "var(--brand-green-700)",
                    backgroundColor: "rgba(0, 208, 83, 0.1)",
                    border: "1px solid rgba(0, 208, 83, 0.3)",
                    padding: "0.3rem 0.85rem",
                    borderRadius: "0.75rem",
                    fontFamily: "var(--font-sans)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {formatCurrency(monthlySpend)} / mo
                </span>
              </div>

              <div style={{ position: "relative", padding: "0.25rem 0" }}>
                <input
                  type="range"
                  min={50000}
                  max={1500000}
                  step={25000}
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(Number(e.target.value))}
                  className="roi-slider"
                  style={{
                    width: "100%",
                    accentColor: "#00D053",
                  }}
                />

                {/* Track Tick Anchors */}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "0 4px", marginTop: "0.25rem" }}>
                  <span style={{ width: "2px", height: "6px", backgroundColor: "rgba(0, 208, 83, 0.4)", borderRadius: "1px" }} />
                  <span style={{ width: "2px", height: "6px", backgroundColor: "rgba(0, 208, 83, 0.4)", borderRadius: "1px" }} />
                  <span style={{ width: "2px", height: "6px", backgroundColor: "rgba(0, 208, 83, 0.4)", borderRadius: "1px" }} />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-body)", marginTop: "0.3rem", fontWeight: 700 }}>
                <span>₹50,000</span>
                <span>₹5,00,000</span>
                <span>₹15,00,000+</span>
              </div>
            </div>

            {/* 2. Target Goal Selector (Radio Card Affordance) */}
            <div style={{ marginBottom: "1.75rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "0.75rem", fontFamily: "var(--font-sans)" }}>
                Select Growth Objective:
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.6rem" }}>
                {GOAL_OPTIONS.map((opt) => {
                  const isSelected = selectedGoal === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedGoal(opt.id)}
                      role="radio"
                      aria-checked={isSelected}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.75rem 1rem",
                        borderRadius: "0.875rem",
                        border: isSelected ? "1.5px solid #00D053" : "1px solid rgba(0, 0, 0, 0.1)",
                        backgroundColor: isSelected ? "rgba(0, 208, 83, 0.08)" : "#F8FAFC",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        {/* Radio Checkmark Circle */}
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            border: isSelected ? "2px solid #00D053" : "2px solid rgba(0, 0, 0, 0.2)",
                            backgroundColor: isSelected ? "#00D053" : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff",
                            fontSize: "0.6875rem",
                            fontWeight: 900,
                            flexShrink: 0,
                          }}
                        >
                          {isSelected && "✓"}
                        </div>

                        <div>
                          <div style={{ fontSize: "0.875rem", fontWeight: 800, color: isSelected ? "var(--brand-navy-900)" : "var(--text-heading)", fontFamily: "var(--font-sans)" }}>
                            {opt.icon} {opt.label}
                          </div>
                          <div style={{ fontSize: "0.75rem", color: "var(--text-body)", fontFamily: "var(--font-sans)", marginTop: "0.1rem" }}>
                            {opt.desc}
                          </div>
                        </div>
                      </div>
                      <span style={{ fontSize: "0.8125rem", fontWeight: 800, color: "#00D053", fontFamily: "var(--font-sans)" }}>
                        {opt.roas}x Target
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Live Output HUD + Claim Roadmap Form ── */}
          <div
            style={{
              backgroundColor: "#050B18",
              backgroundImage: `
                radial-gradient(ellipse 100% 60% at 50% -10%, rgba(0, 208, 83, 0.15), transparent 70%),
                radial-gradient(circle, rgba(0, 208, 83, 0.12) 1px, transparent 1px),
                radial-gradient(circle, rgba(56, 189, 248, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: "100% 100%, 22px 22px, 22px 22px",
              backgroundPosition: "0 0, 0 0, 11px 11px",
              border: "1.5px solid rgba(0, 208, 83, 0.35)",
              borderRadius: "1.5rem",
              padding: "clamp(1.5rem, 3vw, 2.25rem)",
              boxShadow: "0 20px 45px -10px rgba(5, 11, 24, 0.5)",
            }}
          >
            {/* Projected Outputs Grid */}
            <div style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)", paddingBottom: "1.25rem", marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "rgba(255, 255, 255, 0.6)", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--font-sans)" }}>
                ESTIMATED MONTHLY REVENUE PIPELINE
              </div>
              <div style={{ fontSize: "clamp(1.75rem, 3vw, 2.35rem)", fontWeight: 900, color: "#00D053", letterSpacing: "-0.03em", marginTop: "0.2rem", fontFamily: "var(--font-sans)", fontVariantNumeric: "tabular-nums" }}>
                {formatCurrency(projectedPipeline)}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginTop: "0.75rem" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.55)", fontWeight: 700 }}>PROJECTED LEADS</span>
                  <div style={{ fontSize: "1.0625rem", fontWeight: 900, color: "#ffffff" }}>{projectedLeads.toLocaleString("en-US")}+ Inquiries</div>
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.55)", fontWeight: 700 }}>BLENDED ROAS</span>
                  <div style={{ fontSize: "1.0625rem", fontWeight: 900, color: "#38BDF8" }}>{currentGoal.roas}x Scale</div>
                </div>
              </div>

              {/* Financial Allocation Split Bar with Generous Breathing Space */}
              <div style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px dashed rgba(255, 255, 255, 0.15)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.7)", fontWeight: 700, marginBottom: "0.45rem" }}>
                  <span>Ad Spend: 20%</span>
                  <span>Creative Testing: 10%</span>
                  <span style={{ color: "#00D053", fontWeight: 900 }}>Net Pipeline: 70%</span>
                </div>
                <div style={{ width: "100%", height: "8px", backgroundColor: "rgba(255, 255, 255, 0.12)", borderRadius: "4px", overflow: "hidden", display: "flex" }}>
                  <div style={{ width: "20%", height: "100%", backgroundColor: "#EF4444" }} title="Media Spend" />
                  <div style={{ width: "10%", height: "100%", backgroundColor: "#38BDF8" }} title="Creative Testing" />
                  <div style={{ width: "70%", height: "100%", backgroundColor: "#00D053" }} title="Projected Revenue Pipeline" />
                </div>
              </div>
            </div>

            {/* Claim Roadmap Form with High-Contrast Visible Inputs */}
            {isSuccess ? (
              <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🎉</div>
                <h4 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#ffffff", marginBottom: "0.5rem", fontFamily: "var(--font-sans)" }}>
                  Growth Roadmap Requested!
                </h4>
                <p style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.7)", fontFamily: "var(--font-sans)" }}>
                  Our Senior Growth Architect will review your {formatCurrency(monthlySpend)} budget model and share your custom scaling plan within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {errorMessage && (
                  <div style={{ fontSize: "0.75rem", color: "#EF4444", backgroundColor: "rgba(239, 68, 68, 0.1)", padding: "0.4rem 0.75rem", borderRadius: "0.5rem" }}>
                    {errorMessage}
                  </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      borderRadius: "0.625rem",
                      padding: "0.75rem 0.85rem",
                      color: "#ffffff",
                      fontSize: "0.875rem",
                      outline: "none",
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Work Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      borderRadius: "0.625rem",
                      padding: "0.75rem 0.85rem",
                      color: "#ffffff",
                      fontSize: "0.875rem",
                      outline: "none",
                    }}
                  />
                </div>

                <input
                  type="tel"
                  placeholder="Phone / WhatsApp (Optional for instant audit)"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    borderRadius: "0.625rem",
                    padding: "0.75rem 0.85rem",
                    color: "#ffffff",
                    fontSize: "0.875rem",
                    outline: "none",
                  }}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    background: "linear-gradient(135deg, #00D053 0%, #059669 100%)",
                    color: "#ffffff",
                    fontWeight: 900,
                    padding: "0.85rem 1.5rem",
                    borderRadius: "0.75rem",
                    fontSize: "0.875rem",
                    boxShadow: "0 8px 20px rgba(0, 208, 83, 0.4)",
                    border: "none",
                    cursor: "pointer",
                    marginTop: "0.4rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  {isSubmitting ? "Calculating Model..." : "Claim This Growth Roadmap →"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 960px) {
          .calculator-glass-box {
            grid-template-columns: 1fr !important;
          }
        }
        .roi-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 12px;
          border-radius: 6px;
          background: rgba(0, 208, 83, 0.2);
          outline: none;
          cursor: pointer;
        }
        .roi-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #00D053;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 4px 10px rgba(0, 208, 83, 0.4);
        }
        .roi-slider::-moz-range-thumb {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #00D053;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 4px 10px rgba(0, 208, 83, 0.4);
        }
      `}</style>
    </section>
  );
}
