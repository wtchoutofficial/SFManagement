"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const stats = [
  { value: 100, suffix: "%", label: "Discretion Guaranteed" },
  { value: 24, suffix: "hr", label: "Response Time" },
  { prefix: "", value: 6, suffix: "-Figure", label: "Monthly Target" },
];

export function Stats() {
  return (
    <section className="py-16 relative">
      <div className="gradient-divider" />
      <div className="container-narrow py-16">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 md:divide-x md:divide-surface-light">
          {stats.map((stat, i) => (
            <FadeIn
              key={stat.label}
              delay={i * 0.15}
              className="flex-1 text-center px-4 md:px-8"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent font-heading">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-muted text-sm mt-2">{stat.label}</div>
            </FadeIn>
          ))}
        </div>
      </div>
      <div className="gradient-divider" />
    </section>
  );
}
