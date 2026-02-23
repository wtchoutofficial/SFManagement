"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";

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

export function WhyUs() {
  return (
    <section id="why-us" className="section-padding">
      <div className="container-narrow">
        <SectionHeading
          label="Why Us"
          title="The SF Management Standard"
          description="We built this agency because the industry needed better. Here's how we compare."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeIn>
            <div className="bg-surface border border-surface-light rounded-xl p-8">
              <h3 className="text-lg font-semibold text-muted mb-6">
                Industry Standard
              </h3>
              <ul className="space-y-4">
                {industryStandard.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-red-400 mt-0.5 text-lg">✕</span>
                    <span className="text-muted text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="bg-surface border border-accent/20 rounded-xl p-8">
              <h3 className="text-lg font-semibold text-accent mb-6">
                SF Management Standard
              </h3>
              <ul className="space-y-4">
                {sfStandard.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-accent mt-0.5 text-lg">✓</span>
                    <span className="text-text text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
