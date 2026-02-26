"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useIsMobile } from "@/hooks/useIsMobile";

const steps = [
  {
    number: "01",
    title: "Apply for an Audit",
    description:
      "Fill out a quick application. We review your profile and potential within 24 hours.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="12" height="16" rx="1.5" />
        <line x1="7" y1="6" x2="13" y2="6" />
        <line x1="7" y1="9" x2="13" y2="9" />
        <line x1="7" y1="12" x2="10" y2="12" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Custom Strategy",
    description:
      "We build a tailored growth plan based on your niche, goals, and current position.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2C7.5 2 6 4.5 6 7c0 1.5.5 2.5 1.5 3.5.5.5 1 1.5 1 2.5h3c0-1 .5-2 1-2.5C13.5 9.5 14 8.5 14 7c0-2.5-1.5-5-4-5z" />
        <line x1="7.5" y1="15" x2="12.5" y2="15" />
        <line x1="8" y1="17" x2="12" y2="17" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Full Team Support",
    description:
      "Our team handles everything — content strategy, engagement, and account management.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="6" r="3" />
        <path d="M4 18c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <circle cx="16" cy="5" r="2" />
        <path d="M18 14c0-1.7-1-3.2-2.5-3.8" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Scale to Six Figures",
    description:
      "Watch your revenue grow while you focus on what you do best — creating.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="2,16 7,10 11,13 18,4" />
        <polyline points="13,4 18,4 18,9" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export function Process() {
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="process" className="section-padding">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          label="How It Works"
          title="Four Steps to Growth"
        />

        <div ref={ref} className="relative">
          {/* Horizontal connecting line — desktop only */}
          <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] z-0">
            <motion.div
              className="h-px w-full origin-left"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), rgba(255,255,255,0.15), transparent)",
              }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                delay: 0.2,
              }}
            />
          </div>

          {/* Step dots on the line — desktop only */}
          {steps.map((_, i) => (
            <div
              key={i}
              className="hidden md:block absolute top-[22px] z-10"
              style={{ left: `${12.5 + (75 / 3) * i}%`, transform: "translateX(-50%)" }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.4 + i * 0.15,
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
                className="w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_rgba(255,255,255,0.3)]"
              />
            </div>
          ))}

          {/* Cards grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={cardVariants}
                whileHover={isMobile ? undefined : { y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex flex-col items-center text-center relative"
              >
                {/* Vertical connecting line — mobile only */}
                {i < steps.length - 1 && (
                  <div className="md:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 h-10 w-px bg-gradient-to-b from-white/15 to-transparent" />
                )}

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5 text-accent">
                  {step.icon}
                </div>

                {/* Step number */}
                <span className="text-xs uppercase tracking-widest text-muted mb-2">
                  Step {step.number}
                </span>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-semibold font-heading mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-muted text-sm leading-relaxed max-w-[240px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
