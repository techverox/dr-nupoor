"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  Variants,
  HTMLMotionProps,
} from "framer-motion";

// ============================================================================
// 1. FADE IN (Smooth Hardware-Accelerated Reveal)
// ============================================================================
export interface FadeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  once?: boolean;
  scale?: boolean;
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  distance = 24,
  duration = 0.5,
  once = true,
  scale = false,
  className = "",
  ...props
}: FadeInProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      case "none":
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialPos = getInitialPosition();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: initialPos.x,
      y: initialPos.y,
      scale: scale ? 0.96 : 1,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "0px", amount: 0.05 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// 2. STAGGER CONTAINER & ITEM (Cascading Wave Reveals)
// ============================================================================
export interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
  className?: string;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.08,
  delayChildren = 0,
  once = true,
  className = "",
  ...props
}: StaggerContainerProps) {
  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "0px", amount: 0.05 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerItemProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  distance?: number;
  duration?: number;
  className?: string;
}

export function StaggerItem({
  children,
  distance = 20,
  duration = 0.45,
  className = "",
  ...props
}: StaggerItemProps) {
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: distance,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  );
}

// ============================================================================
// 3. COUNTER (Spring-Based Smooth Number Count-Up)
// ============================================================================
export interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  useGrouping?: boolean;
}

export function Counter({
  from = 0,
  to,
  duration = 1.5,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
  useGrouping = true,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [displayValue, setDisplayValue] = useState<string>(
    from.toFixed(decimals)
  );

  const motionVal = useMotionValue(from);
  const springVal = useSpring(motionVal, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (inView) {
      motionVal.set(to);
    }
  }, [inView, motionVal, to]);

  useEffect(() => {
    const unsubscribe = springVal.on("change", (latest) => {
      if (decimals > 0) {
        setDisplayValue(latest.toFixed(decimals));
      } else {
        const rounded = Math.round(latest);
        setDisplayValue(useGrouping ? rounded.toLocaleString() : rounded.toString());
      }
    });

    return () => unsubscribe();
  }, [springVal, decimals, useGrouping]);

  return (
    <span ref={ref} className={`inline-block tabular-nums ${className}`}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

// ============================================================================
// 4. MAGNETIC BUTTON (Subtle Cursor Pull Physics)
// ============================================================================
export interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // Distance multiplier (default: 0.25)
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.25,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.1 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`inline-block cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// 5. SHIMMER BUTTON (High-Conversion Luminous Light Sweep)
// ============================================================================
export interface ShimmerButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerDuration?: number; // in seconds
}

export function ShimmerButton({
  children,
  className = "",
  shimmerColor = "rgba(255, 255, 255, 0.35)",
  shimmerDuration = 3,
  ...props
}: ShimmerButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={`relative inline-flex items-center justify-center overflow-hidden transition-all duration-200 ${className}`}
      {...props}
    >
      {/* Moving Shimmer Beam */}
      <motion.div
        className="absolute inset-0 -translate-x-full pointer-events-none"
        animate={{
          translateX: ["-100%", "200%"],
        }}
        transition={{
          repeat: Infinity,
          repeatDelay: 2.5,
          duration: shimmerDuration,
          ease: "easeInOut",
        }}
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${shimmerColor} 50%, transparent 100%)`,
          width: "60%",
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
