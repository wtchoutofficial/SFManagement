"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const stats = [
  { value: "45+", label: "Creators Managed" },
  { value: "$2.4M+", label: "Revenue Generated" },
  { value: "24hr", label: "Average Response Time" },
  { value: "100%", label: "Discretion Guaranteed" },
];

export function SocialProofBar() {
  return (
    <section className="py-6 border-y border-surface-light">
      <div className="container-narrow">
        <FadeIn>
          <div className="flex flex-wrap justify-center gap-12 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="min-w-[120px]">
                <p className="text-2xl font-bold font-heading text-text">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-widest text-muted mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
