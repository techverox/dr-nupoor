"use client";

import React, { useEffect, useRef, useState } from "react";

export default function DigivigeeHeroBeam() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Floating particles
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      speedY: number;
      speedX: number;
      color: string;
    }> = [];

    const numParticles = 90;
    for (let i = 0; i < numParticles; i++) {
      const isGreen = Math.random() > 0.4;
      particles.push({
        x: width * 0.58 + (Math.random() - 0.5) * 600,
        y: Math.random() * 850,
        radius: Math.random() * 1.6 + 0.4,
        alpha: Math.random() * 0.65 + 0.2,
        speedY: -(Math.random() * 0.4 + 0.1),
        speedX: (Math.random() - 0.5) * 0.2,
        color: isGreen ? "74, 222, 128" : "6, 182, 212",
      });
    }

    let t = 0;
    const render = () => {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Beam position: responsive alignment (~60% on wide screens, ~65% on mobile)
      const isMobile = width < 768;
      const beamX = isMobile ? width * 0.65 : width * 0.60;
      let targetY = isMobile ? 540 : 470;
      const dashboardEl = document.getElementById("hero-dashboard-container");
      if (dashboardEl && canvas) {
        const dRect = dashboardEl.getBoundingClientRect();
        const cRect = canvas.getBoundingClientRect();
        if (dRect.top > cRect.top) {
          targetY = dRect.top - cRect.top + 2;
        }
      }

      // 1. Right Side Cosmic Cyan/Blue Nebula Bloom
      const nebulaCyan = ctx.createRadialGradient(
        beamX + 120,
        targetY * 0.45,
        10,
        beamX + 120,
        targetY * 0.45,
        width * 0.42
      );
      nebulaCyan.addColorStop(0, "rgba(6, 182, 212, 0.25)");
      nebulaCyan.addColorStop(0.35, "rgba(37, 99, 235, 0.15)");
      nebulaCyan.addColorStop(0.7, "rgba(29, 78, 216, 0.05)");
      nebulaCyan.addColorStop(1, "rgba(6, 7, 9, 0)");
      ctx.fillStyle = nebulaCyan;
      ctx.fillRect(0, 0, width, height);

      // 2. Left Side Electric Lime-Green Nebula Bloom
      const nebulaGreen = ctx.createRadialGradient(
        beamX - 80,
        targetY * 0.55,
        15,
        beamX - 80,
        targetY * 0.55,
        width * 0.4
      );
      nebulaGreen.addColorStop(0, "rgba(74, 222, 128, 0.28)");
      nebulaGreen.addColorStop(0.35, "rgba(34, 197, 94, 0.14)");
      nebulaGreen.addColorStop(0.75, "rgba(6, 7, 9, 0.02)");
      nebulaGreen.addColorStop(1, "rgba(6, 7, 9, 0)");
      ctx.fillStyle = nebulaGreen;
      ctx.fillRect(0, 0, width, height);

      // 3. Wide Luminous Sheath
      ctx.save();
      const sheathGrad = ctx.createLinearGradient(beamX, 0, beamX, targetY);
      sheathGrad.addColorStop(0, "rgba(74, 222, 128, 0.2)");
      sheathGrad.addColorStop(0.4, "rgba(34, 197, 94, 0.35)");
      sheathGrad.addColorStop(0.8, "rgba(6, 182, 212, 0.45)");
      sheathGrad.addColorStop(1, "rgba(74, 222, 128, 0.8)");

      ctx.beginPath();
      ctx.moveTo(beamX - 35, 0);
      ctx.lineTo(beamX + 35, 0);
      ctx.lineTo(beamX + 220, targetY);
      ctx.lineTo(beamX - 220, targetY);
      ctx.closePath();
      ctx.fillStyle = sheathGrad;
      ctx.fill();
      ctx.restore();

      // 4. Parabolic Flaring Curve Wings
      ctx.save();
      // Left Wing Flare (Electric Lime Green)
      const leftWingGrad = ctx.createLinearGradient(beamX - 340, targetY, beamX, targetY - 300);
      leftWingGrad.addColorStop(0, "rgba(74, 222, 128, 0)");
      leftWingGrad.addColorStop(0.5, "rgba(34, 197, 94, 0.3)");
      leftWingGrad.addColorStop(1, "rgba(187, 247, 208, 0.8)");

      ctx.beginPath();
      ctx.moveTo(beamX - 3, 0);
      ctx.quadraticCurveTo(beamX - 20, targetY - 160, beamX - 340, targetY);
      ctx.lineTo(beamX, targetY);
      ctx.closePath();
      ctx.fillStyle = leftWingGrad;
      ctx.fill();

      // Right Wing Flare (Electric Cyan to Royal Blue)
      const rightWingGrad = ctx.createLinearGradient(beamX + 340, targetY, beamX, targetY - 300);
      rightWingGrad.addColorStop(0, "rgba(6, 182, 212, 0)");
      rightWingGrad.addColorStop(0.5, "rgba(6, 182, 212, 0.35)");
      rightWingGrad.addColorStop(1, "rgba(165, 243, 252, 0.85)");

      ctx.beginPath();
      ctx.moveTo(beamX + 3, 0);
      ctx.quadraticCurveTo(beamX + 20, targetY - 160, beamX + 340, targetY);
      ctx.lineTo(beamX, targetY);
      ctx.closePath();
      ctx.fillStyle = rightWingGrad;
      ctx.fill();
      ctx.restore();

      // 5. Razor-Sharp Vertical Laser Core (Intense Lime-White)
      ctx.save();
      const laserGrad = ctx.createLinearGradient(beamX, 0, beamX, targetY);
      laserGrad.addColorStop(0, "rgba(255, 255, 255, 1)");
      laserGrad.addColorStop(0.3, "rgba(220, 252, 231, 0.95)");
      laserGrad.addColorStop(0.7, "rgba(74, 222, 128, 1)");
      laserGrad.addColorStop(1, "rgba(6, 182, 212, 1)");

      ctx.shadowColor = "rgba(74, 222, 128, 1)";
      ctx.shadowBlur = 28 + Math.sin(t * 3.5) * 8;

      ctx.beginPath();
      ctx.rect(beamX - 2.5, 0, 5, targetY);
      ctx.fillStyle = laserGrad;
      ctx.fill();

      // Laser Aura
      ctx.shadowColor = "rgba(6, 182, 212, 0.9)";
      ctx.shadowBlur = 50;
      ctx.beginPath();
      ctx.rect(beamX - 8, 0, 16, targetY);
      ctx.fillStyle = "rgba(134, 239, 172, 0.35)";
      ctx.fill();
      ctx.restore();

      // 6. Horizon Glow Flare Along Top Rim of Dashboard
      ctx.save();
      const flareWidth = isMobile ? 220 : 420;
      const horizonGlow = ctx.createRadialGradient(
        beamX,
        targetY,
        0,
        beamX,
        targetY,
        flareWidth
      );
      horizonGlow.addColorStop(0, "rgba(255, 255, 255, 1)");
      horizonGlow.addColorStop(0.12, "rgba(74, 222, 128, 0.9)");
      horizonGlow.addColorStop(0.35, "rgba(6, 182, 212, 0.5)");
      horizonGlow.addColorStop(0.7, "rgba(37, 99, 235, 0.2)");
      horizonGlow.addColorStop(1, "rgba(6, 7, 9, 0)");

      ctx.fillStyle = horizonGlow;
      ctx.beginPath();
      ctx.ellipse(beamX, targetY, flareWidth, isMobile ? 18 : 28, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 7. Ambient Upward Floating Particles
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(t + p.y * 0.012) * 0.2;

        if (p.y < 0) {
          p.y = targetY + 25;
          p.x = beamX + (Math.random() - 0.5) * 550;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha * (0.6 + Math.sin(t * 2.5 + p.x) * 0.4)})`;
        ctx.shadowColor = `rgba(${p.color}, 0.85)`;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden transition-opacity duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full min-h-[750px] md:min-h-[920px]"
      />
    </div>
  );
}
