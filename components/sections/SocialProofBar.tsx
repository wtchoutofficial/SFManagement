"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const stats = [
  { value: "10+", label: "Creators Managed" },
  { value: "$2M+", label: "Revenue Generated" },
  { value: "24hr", label: "Average Response Time" },
  { value: "100%", label: "Discretion Guaranteed" },
];

export function SocialProofBar() {
  return (
    <section className="py-6 border-y border-surface-light">
      <div className="container-narrow">
        <FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-xl sm:text-2xl font-bold font-heading text-text">
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
