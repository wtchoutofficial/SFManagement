"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { useIsMobile } from "@/hooks/useIsMobile";

const features = [
  {
    title: "Custom-Tailored Growth Strategy",
    description:
      "You're unique, so your strategy should be too. We create custom plans that turn your strengths into six-figure success.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="6" width="20" height="36" rx="2" />
        <path d="M16 14h8" />
        <path d="M16 20h8" />
        <path d="M16 26h4" />
        <polyline points="32,22 36,18 40,22" />
        <line x1="36" y1="18" x2="36" y2="34" />
      </svg>
    ),
  },
  {
    title: "No Empty Promises — Only Real Results",
    description:
      "We're all about honesty and hard work. Every strategy we build is rooted in data and proven to deliver real results — no fluff, just facts.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="18" r="8" />
        <path d="M24 10l2 5h5l-4 3 1.5 5L24 20l-4.5 3 1.5-5-4-3h5z" />
        <path d="M18 26l-3 14 9-5 9 5-3-14" />
      </svg>
    ),
  },
  {
    title: "A Full Team of Experts Behind You",
    description:
      "We are relentless in delivering results. Professionalism is our promise — we bring the highest standards to protect and elevate your brand.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="14" r="6" />
        <path d="M14 38c0-5.5 4.5-10 10-10s10 4.5 10 10" />
        <circle cx="38" cy="16" r="4" />
        <path d="M42 32c0-3.3-2-6.2-5-7.5" />
        <circle cx="10" cy="16" r="4" />
        <path d="M6 32c0-3.3 2-6.2 5-7.5" />
      </svg>
    ),
  },
];

const industryStandard = [
  "Predatory revenue splits and hidden fees",
  "No real strategy — just empty promises",
  "Poor communication and slow response times",
  "Zero discretion with sensitive creator data",
];

const sfStandard = [
  "Transparent contracts with fair, competitive terms",
  "Custom growth strategies backed by real data",
  "Dedicated team with 24/7 communication",
  "100% discretion — built on Norwegian privacy values",
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

export function WhyUs() {
  const isMobile = useIsMobile();

  return (
    <section id="why-us" className="section-padding">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading block */}
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-muted border border-surface-light rounded-full px-5 py-2 mb-8">
              Why Us
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading leading-tight">
              Your personal project.
              <br />
              We are just there to help.
            </h2>
            <p className="text-muted text-lg md:text-xl mt-6 max-w-xl mx-auto">
              What can you expect from a world class agency?
            </p>
          </div>
        </FadeIn>

        {/* Three feature cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={isMobile ? undefined : { y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="feature-card group relative rounded-2xl p-10 md:p-12 text-center overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_40%,rgba(124,58,237,0.08),transparent_70%)] pointer-events-none" />

              <div className="flex justify-center mb-8 text-muted group-hover:text-white transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-heading leading-snug mb-4">
                {feature.title}
              </h3>
              <p className="text-muted text-sm md:text-base leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison cards */}
        <FadeIn>
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading">
              The SF Management Standard
            </h3>
            <p className="text-muted text-base md:text-lg mt-4 max-w-lg mx-auto">
              We built this agency because the industry needed better. Here&apos;s how we compare.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeIn>
            <motion.div
              whileHover={isMobile ? undefined : { y: -6 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="card-glow p-10 md:p-12 h-full rounded-2xl"
            >
              <h3 className="text-xl md:text-2xl font-semibold text-muted mb-8 font-heading">
                Industry Standard
              </h3>
              <ul className="space-y-5">
                {industryStandard.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="text-muted/60 mt-0.5 text-xl shrink-0">&#x2715;</span>
                    <span className="text-muted text-base md:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <motion.div
              whileHover={isMobile ? undefined : { y: -6 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="sf-card relative p-10 md:p-12 h-full rounded-2xl overflow-hidden"
            >
              {/* Gradient glow behind the card */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-pink-500/30 -z-10 blur-sm" />

              <h3 className="text-xl md:text-2xl font-semibold text-white mb-8 font-heading">
                SF Management Standard
              </h3>
              <ul className="space-y-5">
                {sfStandard.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="text-purple-400 mt-0.5 text-xl shrink-0">&#x2713;</span>
                    <span className="text-text text-base md:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </FadeIn>
        </div>

        {/* Secondary CTA */}
        <FadeIn delay={0.2}>
          <div className="text-center mt-16">
            <p className="text-muted text-lg mb-6">
              See the difference for yourself.
            </p>
            <a href="#apply">
              <Button size="lg">Get Your Free Audit</Button>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
