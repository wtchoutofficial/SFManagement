"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";

const services = [
  {
    title: "Account Management",
    description:
      "Full strategic control of your account. Content scheduling, optimization, and analytics — handled.",
  },
  {
    title: "Social Media Growth",
    description:
      "Organic and paid strategies to build your audience across every platform that matters.",
  },
  {
    title: "Chatting & Fan-Engagement",
    description:
      "Professional, high-converting fan interactions that maximize your revenue per subscriber.",
  },
  {
    title: "Reputation & Privacy Protection",
    description:
      "Discreet identity management and DMCA enforcement. Your privacy is non-negotiable.",
  },
];

export function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="container-narrow">
        <SectionHeading
          label="What We Do"
          title="Services Built for Results"
          description="No fluff. Every service is designed to directly grow your revenue."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-surface border border-surface-light rounded-xl p-8 hover:border-accent/30 transition-colors duration-300"
              >
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
