"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { useIsMobile } from "@/hooks/useIsMobile";

const services = [
  {
    title: "Account Management",
    description:
      "Our team keeps your profiles active so you can focus on creating content that fans love.",
    color: "#ec4899",
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="14" r="5" stroke="currentColor" />
        <path d="M8 32c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" />
        <circle cx="30" cy="12" r="3.5" stroke="currentColor" />
        <path d="M34 28c0-2.8-1.8-5.2-4.5-6" stroke="currentColor" />
        <circle cx="32" cy="26" r="5" stroke="#ec4899" strokeWidth="1.5" />
        <path d="M30.5 26l1 1 2-2" stroke="#ec4899" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Social Media Growth",
    description:
      "We grow your social platforms daily to turn your audience into loyal subscribers.",
    color: "#a855f7",
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="10" width="16" height="12" rx="2" stroke="currentColor" />
        <circle cx="14" cy="16" r="1.5" fill="#a855f7" />
        <path d="M6 19l4-3 3 2 5-4 4 5" stroke="#a855f7" strokeWidth="1.5" />
        <path d="M28 14l4-4" stroke="currentColor" />
        <polyline points="28,10 32,10 32,14" stroke="currentColor" />
        <path d="M26 28l6-2" stroke="#a855f7" strokeWidth="1.5" />
        <path d="M24 26a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" stroke="currentColor" />
        <path d="M34 24a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" stroke="currentColor" />
      </svg>
    ),
  },
  {
    title: "Chatting & Fan-Engagement",
    description:
      "We manage fan chats 24/7, building connections that maximize your earnings.",
    color: "#6366f1",
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="12" y="8" width="20" height="28" rx="3" stroke="currentColor" />
        <line x1="12" y1="12" x2="32" y2="12" stroke="currentColor" />
        <line x1="12" y1="30" x2="32" y2="30" stroke="currentColor" />
        <circle cx="22" cy="33" r="1" fill="currentColor" />
        <rect x="17" y="17" width="10" height="8" rx="1.5" stroke="#6366f1" strokeWidth="1.5" />
        <path d="M19 20h6M19 23h4" stroke="#6366f1" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Reputation & Crisis-Protection",
    description:
      "We remove all content leaks, ensuring your online reputation and your identity stays secure.",
    color: "#ec4899",
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 6l12 5v10c0 8-5 13-12 17-7-4-12-9-12-17V11l12-5z" stroke="currentColor" />
        <path d="M22 10l8 3.5v7c0 5.5-3.5 9-8 12-4.5-3-8-6.5-8-12v-7L22 10z" stroke="#ec4899" strokeWidth="1.5" />
        <path d="M18 22l3 3 5-6" stroke="#ec4899" strokeWidth="2" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export function Services() {
  const isMobile = useIsMobile();

  return (
    <section id="services" className="section-padding relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" aria-hidden />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-muted border border-surface-light rounded-full px-5 py-2 mb-8">
              Here&apos;s What We Do — Simplified
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading leading-tight">
              We Do the Hard-Work,
              <br />
              You Reap the Rewards.
            </h2>
            <p className="text-muted text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
              We get it — Growing an OnlyFans account is a lot of work.
              <br className="hidden sm:block" />
              That&apos;s why we&apos;re here for you to take 90% of the work off your plate.
            </p>
          </div>
        </FadeIn>

        {/* Service cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={isMobile ? undefined : { y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="service-card group relative rounded-2xl p-8 md:p-10 overflow-hidden"
            >
              {/* Colored glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${service.color}12, transparent 70%)`,
                }}
              />

              <div className="mb-6 text-muted group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>

              <h3 className="text-xl md:text-2xl font-bold font-heading leading-snug mb-4">
                {service.title}
              </h3>
              <p className="text-muted text-sm md:text-base leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
