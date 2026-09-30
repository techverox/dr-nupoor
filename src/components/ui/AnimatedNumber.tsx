"use client";

import React, { useEffect, useState, useRef } from "react";

export interface AnimatedNumberProps {
  /** The target number to animate to */
  value: number;
  /** Duration of the count-up animation in milliseconds (default: 1500ms) */
  duration?: number;
  /** Optional custom formatter function (default: Indian English locale comma formatting) */
  formatter?: (val: number) => string;
  /** Optional prefix text placed before the number */
  prefix?: string;
  /** Optional suffix text placed after the number (e.g., "%", "+") */
  suffix?: string;
  /** Extra CSS classes */
  className?: string;
}

/**
 * AnimatedNumber
 * Smooth, high-performance requestAnimationFrame count-up number animation.
 * Counts from initial/previous value to target value over 1-2 seconds with easeOutExpo easing.
 */
export function AnimatedNumber({
  value,
  duration = 1500,
  formatter,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedNumberProps) {
  const target = typeof value === "number" && !isNaN(value) ? value : 0;
  const [displayValue, setDisplayValue] = useState<number>(0);
  const previousValueRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const startValue = previousValueRef.current;
    const endValue = target;

    // If already at target value, no animation needed
    if (startValue === endValue && displayValue === endValue) {
      return;
    }

    const startTime = performance.now();

    // High-precision exponential ease-out for ultra-smooth deceleration
    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const updateFrame = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / Math.max(duration, 300), 1);
      const easedProgress = easeOutExpo(rawProgress);

      const nextVal = Math.round(startValue + (endValue - startValue) * easedProgress);
      setDisplayValue(nextVal);

      if (rawProgress < 1) {
        animationFrameRef.current = requestAnimationFrame(updateFrame);
      } else {
        setDisplayValue(endValue);
        previousValueRef.current = endValue;
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateFrame);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [target, duration]);

  const formattedNumber = formatter
    ? formatter(displayValue)
    : displayValue.toLocaleString("en-IN");

  return (
    <span className={`inline-block tabular-nums transition-opacity duration-150 ${className}`}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
}
