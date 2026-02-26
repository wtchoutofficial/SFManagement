"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { RevenueGraph } from "@/components/ui/RevenueGraph";
import { useIsMobile } from "@/hooks/useIsMobile";

const revenueData = [
  { label: "Oct", value: 70 },
  { label: "Nov", value: 66 },
  { label: "Dec", value: 125 },
  { label: "Jan", value: 76 },
];

const caseStudies = [
  {
    value: 289,
    prefix: "+",
    suffix: "%",
    title: "Revenue Growth",
    description: "New creator scaled to $20K+ in just 6 weeks",
  },
  {
    value: 195,
    prefix: "+",
    suffix: "%",
    title: "3-Month Growth",
    description: "From near-zero to $33K in 3 months under our management",
  },
  {
    value: 125,
    prefix: "$",
    suffix: "K",
    title: "Best Month",
    description: "Single creator's peak month with our strategy",
  },
];

export function Results() {
  const isMobile = useIsMobile();

  return (
    <section className="section-padding">
      <div className="container-narrow">
        <SectionHeading
          label="Results"
          title="Real Creator Results"
          description="Real results from creators we manage — verified earnings, not projections."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left column — Revenue Graph */}
          <FadeIn className="flex">
            <div className="card-glow p-6 md:p-8 flex flex-col flex-1">
              <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-1">
                Creator Revenue Growth
              </p>
              <p className="text-xs text-muted mb-6">
                Managed by SF Management
              </p>
              <div className="flex-1 flex items-center">
                <RevenueGraph data={revenueData} />
              </div>
            </div>
          </FadeIn>

          {/* Right column — 3 metric cards */}
          <div className="flex flex-col gap-5">
            {caseStudies.map((study, i) => (
              <FadeIn key={study.title} delay={i * 0.15}>
                <motion.div
                  whileHover={isMobile ? undefined : { y: -4, scale: 1.01 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="card-glow p-6 md:p-8"
                >
                  <div className="text-3xl md:text-4xl font-bold text-accent font-heading">
                    <AnimatedCounter
                      value={study.value}
                      prefix={study.prefix}
                      suffix={study.suffix}
                    />
                  </div>
                  <h3 className="text-base font-semibold mt-3 font-heading">
                    {study.title}
                  </h3>
                  <p className="text-muted text-sm mt-1 leading-relaxed">
                    {study.description}
                  </p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={0.3}>
          <p className="text-xs text-muted text-center mt-10 max-w-xl mx-auto">
            Real anonymized results from managed creators. Individual results
            vary based on niche, content quality, and audience engagement.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
