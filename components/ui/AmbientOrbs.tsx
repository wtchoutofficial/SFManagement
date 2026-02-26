"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function AmbientOrbs() {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  if (isMobile || reducedMotion) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Orb 1 — Purple, top-left */}
      <motion.div
        style={{ y: y1 }}
        animate={{
          x: [0, 80, 40, 0],
          y: [0, -40, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        className="absolute -top-[15%] -left-[10%] w-[700px] h-[700px] rounded-full opacity-[0.12]"
        aria-hidden
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#E8507A_0%,transparent_70%)] blur-3xl" />
      </motion.div>

      {/* Orb 2 — Deep rose, center-right */}
      <motion.div
        style={{ y: y2 }}
        animate={{
          x: [0, -70, -30, 0],
          y: [0, 50, -20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        className="absolute top-[30%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-[0.12]"
        aria-hidden
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#C43D64_0%,transparent_70%)] blur-3xl" />
      </motion.div>

      {/* Orb 3 — Soft rose, bottom-center */}
      <motion.div
        style={{ y: y3 }}
        animate={{
          x: [0, 50, -40, 0],
          y: [0, -60, -20, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        className="absolute top-[65%] left-[15%] w-[500px] h-[500px] rounded-full opacity-[0.10]"
        aria-hidden
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#E8507A_0%,transparent_70%)] blur-3xl" />
      </motion.div>
    </div>
  );
}
