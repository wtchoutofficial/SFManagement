"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2000,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(0);
  const isMobile = useIsMobile();
  const effectiveDuration = isMobile ? Math.min(duration, 1000) : duration;

  useEffect(() => {
    if (!isInView) return;

    const start = performance.now();

    function update(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / effectiveDuration, 1);
      const eased = easeOutCubic(progress);
      setDisplay(Math.round(eased * value));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }, [isInView, value, effectiveDuration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
