"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { useIsMobile } from "@/hooks/useIsMobile";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export function Hero() {
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden"
    >
      {/* Hero ambient glow — desktop only */}
      {!isMobile && (
        <motion.div
          style={{ y: glowY, scale: glowScale }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-20 pointer-events-none"
          aria-hidden
        >
          <div className="w-full h-full rounded-full bg-[radial-gradient(ellipse,#7c3aed_0%,#2563eb_40%,transparent_70%)] blur-3xl animate-float-slow" />
        </motion.div>
      )}

      <motion.div
        style={isMobile ? undefined : { y: textY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container-narrow text-center relative z-10"
      >
        <motion.p
          variants={itemVariants}
          className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase text-muted border border-surface-light rounded-full px-5 py-2 mb-8"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
          Less Work, More Traction
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-[1.05] font-heading"
        >
          For Creators Who
          <br />
          <span className="text-gradient">Demand More.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-muted text-lg md:text-xl max-w-2xl mx-auto mt-6"
        >
          Scandinavian precision meets global marketing. We manage your
          OnlyFans & Fansly so you can focus on creating — we handle the rest.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-10">
          <a href="#apply">
            <Button size="lg">Secure Your Spot</Button>
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex items-center justify-center gap-3 text-muted text-sm flex-wrap"
        >
          <span>100% Discretion</span>
          <span className="text-surface-light">&middot;</span>
          <span>24hr Response</span>
          <span className="text-surface-light">&middot;</span>
          <span>Norwegian Privacy Standards</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
