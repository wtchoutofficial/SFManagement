"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Apply for an Audit",
    description: "Fill out a quick application. We review your profile and potential within 24 hours.",
  },
  {
    number: "02",
    title: "Custom Strategy",
    description: "We build a tailored growth plan based on your niche, goals, and current position.",
  },
  {
    number: "03",
    title: "Full Team Support",
    description: "Our team handles everything — content strategy, engagement, and account management.",
  },
  {
    number: "04",
    title: "Scale to Six Figures",
    description: "Watch your revenue grow while you focus on what you do best — creating.",
  },
];

export function Process() {
  return (
    <section id="process" className="section-padding">
      <div className="container-narrow">
        <SectionHeading
          label="How It Works"
          title="Four Steps to Growth"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 0.1}>
              <div className="relative">
                <span className="text-5xl font-bold text-accent/20">
                  {step.number}
                </span>
                <h3 className="text-lg font-semibold mt-2">{step.title}</h3>
                <p className="text-muted text-sm mt-2 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
