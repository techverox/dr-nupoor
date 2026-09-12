"use client";

import React, { useEffect, useRef } from "react";

export default function HulyHeroBeam() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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

    // Floating luminous dust specks
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      speedY: number;
      speedX: number;
    }> = [];

    const numParticles = 80;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: width * 0.573 + (Math.random() - 0.5) * 450,
        y: Math.random() * 850,
        radius: Math.random() * 1.4 + 0.4,
        alpha: Math.random() * 0.5 + 0.15,
        speedY: -(Math.random() * 0.35 + 0.08),
        speedX: (Math.random() - 0.5) * 0.15,
      });
    }

    let t = 0;
    const render = () => {
      t += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Beam X aligned with Huly's grid (~57.3% on desktop, 50% on mobile)
      const beamX = width > 1024 ? width * 0.654 : width * 0.5;
      const targetY = 728; // The exact top border coordinate of the dashboard mockup

      // 1. Cosmic Atmospheric Blue / Indigo Fog
      const nebula1 = ctx.createRadialGradient(
        beamX,
        targetY * 0.45,
        10,
        beamX,
        targetY * 0.45,
        width * 0.45
      );
      nebula1.addColorStop(0, "rgba(59, 130, 246, 0.22)");
      nebula1.addColorStop(0.3, "rgba(37, 99, 235, 0.14)");
      nebula1.addColorStop(0.65, "rgba(29, 78, 216, 0.06)");
      nebula1.addColorStop(1, "rgba(9, 10, 12, 0)");

      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      // Right-side violet haze
      const nebula2 = ctx.createRadialGradient(
        beamX + 160,
        targetY * 0.5,
        5,
        beamX + 160,
        targetY * 0.5,
        320
      );
      nebula2.addColorStop(0, "rgba(139, 92, 246, 0.14)");
      nebula2.addColorStop(0.5, "rgba(99, 102, 241, 0.06)");
      nebula2.addColorStop(1, "rgba(9, 10, 12, 0)");

      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);

      // 2. Wide subtle glow sheath behind the pillar
      ctx.save();
      const sheathGrad = ctx.createLinearGradient(beamX, 0, beamX, targetY);
      sheathGrad.addColorStop(0, "rgba(96, 165, 250, 0.1)");
      sheathGrad.addColorStop(0.6, "rgba(59, 130, 246, 0.25)");
      sheathGrad.addColorStop(1, "rgba(96, 165, 250, 0.45)");

      ctx.beginPath();
      ctx.moveTo(beamX - 35, 0);
      ctx.lineTo(beamX + 35, 0);
      ctx.lineTo(beamX + 160, targetY);
      ctx.lineTo(beamX - 160, targetY);
      ctx.closePath();
      ctx.fillStyle = sheathGrad;
      ctx.filter = "blur(24px)";
      ctx.fill();
      ctx.restore();

      // 3. Smooth hyperbola trumpet flare into the dashboard horizon
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(beamX - 2, 0);
      ctx.lineTo(beamX - 3, targetY * 0.55);
      // Gentle curve opening out
      ctx.bezierCurveTo(
        beamX - 6,
        targetY * 0.82,
        beamX - 45,
        targetY * 0.94,
        beamX - 220,
        targetY
      );
      ctx.lineTo(beamX + 220, targetY);
      ctx.bezierCurveTo(
        beamX + 45,
        targetY * 0.94,
        beamX + 6,
        targetY * 0.82,
        beamX + 3,
        targetY * 0.55
      );
      ctx.lineTo(beamX + 2, 0);
      ctx.closePath();

      const flareGrad = ctx.createLinearGradient(beamX, targetY * 0.5, beamX, targetY);
      flareGrad.addColorStop(0, "rgba(147, 197, 253, 0.1)");
      flareGrad.addColorStop(0.5, "rgba(96, 165, 250, 0.3)");
      flareGrad.addColorStop(0.85, "rgba(191, 219, 254, 0.7)");
      flareGrad.addColorStop(1, "rgba(255, 255, 255, 0.95)");

      ctx.fillStyle = flareGrad;
      ctx.filter = "blur(4px)";
      ctx.fill();
      ctx.restore();

      // 4. Razor-sharp solid vertical laser beam spine
      ctx.save();
      // Cyan-blue ambient halo
      ctx.beginPath();
      ctx.moveTo(beamX, 0);
      ctx.lineTo(beamX, targetY);
      ctx.lineWidth = 14;
      ctx.strokeStyle = "rgba(59, 130, 246, 0.4)";
      ctx.filter = "blur(8px)";
      ctx.stroke();

      // Intermediate bright electric core
      ctx.beginPath();
      ctx.moveTo(beamX, 0);
      ctx.lineTo(beamX, targetY);
      ctx.lineWidth = 5.5;
      ctx.strokeStyle = "rgba(191, 219, 254, 0.85)";
      ctx.filter = "blur(2.5px)";
      ctx.stroke();

      // Pure white piercing laser spine
      ctx.beginPath();
      ctx.moveTo(beamX, 0);
      ctx.lineTo(beamX, targetY);
      ctx.lineWidth = 2.4;
      ctx.strokeStyle = "rgba(255, 255, 255, 1)";
      ctx.filter = "none";
      ctx.stroke();
      ctx.restore();

      // 5. Intense horizontal rim light across the top of the dashboard
      ctx.save();
      const pulse = 1 + Math.sin(t * 2) * 0.04;
      const rimGrad = ctx.createLinearGradient(
        beamX - 320,
        targetY,
        beamX + 320,
        targetY
      );
      rimGrad.addColorStop(0, "rgba(59, 130, 246, 0)");
      rimGrad.addColorStop(0.25, "rgba(96, 165, 250, 0.4)");
      rimGrad.addColorStop(0.5, "rgba(255, 255, 255, 1)");
      rimGrad.addColorStop(0.75, "rgba(96, 165, 250, 0.4)");
      rimGrad.addColorStop(1, "rgba(59, 130, 246, 0)");

      ctx.beginPath();
      ctx.moveTo(beamX - 340 * pulse, targetY);
      ctx.lineTo(beamX + 340 * pulse, targetY);
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = rimGrad;
      ctx.shadowColor = "#93c5fd";
      ctx.shadowBlur = 15;
      ctx.stroke();

      // Intense focal point flare
      const focalGlow = ctx.createRadialGradient(
        beamX,
        targetY,
        0,
        beamX,
        targetY,
        110 * pulse
      );
      focalGlow.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      focalGlow.addColorStop(0.2, "rgba(191, 219, 254, 0.75)");
      focalGlow.addColorStop(0.5, "rgba(59, 130, 246, 0.35)");
      focalGlow.addColorStop(1, "rgba(9, 10, 12, 0)");

      ctx.beginPath();
      ctx.ellipse(beamX, targetY, 220 * pulse, 24 * pulse, 0, 0, Math.PI * 2);
      ctx.fillStyle = focalGlow;
      ctx.fill();
      ctx.restore();

      // 6. Upward drifting floating sparks
      ctx.save();
      for (const p of particles) {
        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y < 0) {
          p.y = targetY + Math.random() * 20;
          p.x = beamX + (Math.random() - 0.5) * 400;
        }

        const distFromCenter = Math.abs(p.x - beamX);
        const fade = Math.max(0, 1 - distFromCenter / 240);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 242, 254, ${p.alpha * fade})`;
        ctx.shadowColor = "#60a5fa";
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      ctx.restore();

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 overflow-hidden select-none h-[1438px]">
      <canvas
        ref={canvasRef}
        className="h-full w-full object-cover"
        style={{ mixBlendMode: "screen" }}
      />
    </div>
  );
}
