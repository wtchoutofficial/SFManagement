"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}

export function FadeIn({
  delay = 0,
  duration = 0.7,
  children,
  ...props
}: FadeInProps) {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 16 : 24, scale: isMobile ? 1 : 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
      transition={{
        duration: isMobile ? 0.4 : duration,
        delay: isMobile ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
