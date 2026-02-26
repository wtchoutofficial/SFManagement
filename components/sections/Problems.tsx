"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { useIsMobile } from "@/hooks/useIsMobile";

const problems = [
  {
    title: "Inconsistent Revenue",
    description:
      "One month you're up, the next you're scrambling. Without a system, income stays unpredictable.",
    color: "#ef4444",
    icon: (
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="8" y1="36" x2="8" y2="8" stroke="currentColor" />
        <line x1="8" y1="36" x2="38" y2="36" stroke="currentColor" />
        <polyline
          points="12,28 17,16 22,26 27,12 32,22 36,14"
          stroke="#ef4444"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),
  },
  {
    title: "Burnout from Doing Everything",
    description:
      "Content, chatting, marketing — you're wearing every hat and running on empty.",
    color: "#f97316",
    icon: (
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="22" cy="18" r="7" stroke="currentColor" />
        <path d="M14 36c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" />
        <line x1="15" y1="6" x2="13" y2="2" stroke="#f97316" strokeWidth="2" />
        <line x1="22" y1="5" x2="22" y2="1" stroke="#f97316" strokeWidth="2" />
        <line x1="29" y1="6" x2="31" y2="2" stroke="#f97316" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Content Leaks & Privacy Risks",
    description:
      "Your content gets shared on piracy sites, and your personal info is one slip from exposure.",
    color: "#ef4444",
    icon: (
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M22 6l12 5v10c0 8-5 13-12 17-7-4-12-9-12-17V11l12-5z"
          stroke="currentColor"
        />
        <line x1="22" y1="12" x2="22" y2="30" stroke="#ef4444" strokeWidth="2" />
        <line x1="16" y1="16" x2="28" y2="26" stroke="#ef4444" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Stagnant Subscriber Growth",
    description:
      "You've hit a ceiling. No matter what you post, the numbers barely move.",
    color: "#eab308",
    icon: (
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="8" y1="36" x2="8" y2="8" stroke="currentColor" />
        <line x1="8" y1="36" x2="38" y2="36" stroke="currentColor" />
        <polyline
          points="12,28 20,20 28,20 32,20"
          stroke="#eab308"
          strokeWidth="2"
          fill="none"
        />
        <rect x="33" y="14" width="2" height="12" rx="1" stroke="currentColor" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: "No Strategy, Just Guessing",
    description:
      "Posting without a plan, hoping something sticks. No data, no direction.",
    color: "#f97316",
    icon: (
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="22" cy="22" r="13" stroke="currentColor" />
        <path
          d="M18 17a4.5 4.5 0 0 1 8 2c0 2.5-3.5 3-3.5 5.5"
          stroke="#f97316"
          strokeWidth="2"
        />
        <circle cx="22.5" cy="29" r="1" fill="#f97316" />
      </svg>
    ),
  },
  {
    title: "Missed Earnings from Poor Engagement",
    description:
      "Fans subscribe but don't spend. You're leaving thousands on the table every month.",
    color: "#eab308",
    icon: (
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M22 8c-3 0-5 2-5 4.5S20 17 22 19c2-2 5-2.5 5-6.5S25 8 22 8z"
          stroke="currentColor"
        />
        <line x1="22" y1="14" x2="22" y2="22" stroke="#eab308" strokeWidth="2" />
        <line x1="19" y1="17" x2="25" y2="17" stroke="#eab308" strokeWidth="2" />
        <polyline
          points="17,28 22,34 27,28"
          stroke="#eab308"
          strokeWidth="2"
          fill="none"
        />
        <line x1="22" y1="22" x2="22" y2="34" stroke="#eab308" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
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

export function Problems() {
  const isMobile = useIsMobile();

  return (
    <section id="problems" className="section-padding relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" aria-hidden />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-muted border border-surface-light rounded-full px-5 py-2 mb-8">
              Sound Familiar?
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading leading-tight">
              Struggling to Grow on Your Own?
              <br />
              You&apos;re Not Alone.
            </h2>
            <p className="text-muted text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
              These are the problems holding back 90% of creators.
              <br className="hidden sm:block" />
              Most agencies ignore them — we solve them.
            </p>
          </div>
        </FadeIn>

        {/* Problem cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.title}
              variants={cardVariants}
              whileHover={isMobile ? undefined : { y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="problem-card group relative rounded-2xl p-6 sm:p-8 md:p-10 overflow-hidden"
            >
              {/* Colored glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${problem.color}12, transparent 70%)`,
                }}
              />

              <div className="mb-6 text-muted group-hover:text-white transition-colors duration-300">
                {problem.icon}
              </div>

              <h3 className="text-xl md:text-2xl font-bold font-heading leading-snug mb-4">
                {problem.title}
              </h3>
              <p className="text-muted text-sm md:text-base leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
