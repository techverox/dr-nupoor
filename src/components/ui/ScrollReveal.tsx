"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

export interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number; // Delay in seconds for framer-motion (unlike ms for old component)
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  width = "100%",
  className = "",
  delay = 0,
  direction = "up",
  distance = 50,
  duration = 0.6,
  once = true,
}: ScrollRevealProps) {
  
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      x: direction === "left" ? distance : direction === "right" ? -distance : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <div style={{ position: "relative", width, overflow: "visible" }} className={className}>
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-100px" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
