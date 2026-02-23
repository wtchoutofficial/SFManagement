"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const stats = [
  { value: "Norway", label: "Founded In" },
  { value: "7-Figure", label: "Revenue Generated" },
  { value: "100%", label: "Full Discretion" },
];

export function Stats() {
  return (
    <section className="bg-surface-light py-16">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0 md:divide-x md:divide-muted/20">
          {stats.map((stat, i) => (
            <FadeIn
              key={stat.label}
              delay={i * 0.15}
              className="flex-1 text-center px-8"
            >
              <div className="text-3xl md:text-4xl font-bold text-accent">
                {stat.value}
              </div>
              <div className="text-muted text-sm mt-2">{stat.label}</div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
