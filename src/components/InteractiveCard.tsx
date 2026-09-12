"use client";

import React, { useRef, useEffect } from "react";

interface InteractiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  tiltEffect?: boolean;
  maxTilt?: number;
  glowEffect?: boolean;
}

/**
 * InteractiveCard provides an ultra-smooth, minimalist 120 FPS elevation
 * and subtle specular highlight without 3D distortion or compositor layer bloat.
 * Zero React re-renders on mouse movement.
 */
export default function InteractiveCard({
  children,
  className = "",
  tiltEffect = true,
  maxTilt = 2.5,
  glowEffect = true,
  ...props
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || !cardRef.current) return;
    const card = cardRef.current;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;

      if (glowRef.current && glowEffect) {
        glowRef.current.style.background = `radial-gradient(350px circle at ${px.toFixed(1)}% ${py.toFixed(1)}%, rgba(0, 224, 92, 0.07), transparent 65%)`;
      }
    });
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || !cardRef.current) return;
    cardRef.current.style.transition = "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1)";
    cardRef.current.style.transform = "translateY(-4px)";
    if (glowRef.current && glowEffect) {
      glowRef.current.style.opacity = "1";
    }
  };

  const handlePointerLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    if (!cardRef.current) return;
    cardRef.current.style.transition = "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1)";
    cardRef.current.style.transform = "translateY(0px)";
    if (glowRef.current && glowEffect) {
      glowRef.current.style.opacity = "0";
    }
  };

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`relative transition-all duration-300 ${className}`}
      {...props}
    >
      {glowEffect && (
        <div
          ref={glowRef}
          aria-hidden="true"
          className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 z-10 overflow-hidden opacity-0"
        />
      )}
      {children}
    </div>
  );
}
