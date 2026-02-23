"use client";

import { useState, type FormEvent } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const countryCodes = [
  { code: "+47", country: "NO" },
  { code: "+46", country: "SE" },
  { code: "+45", country: "DK" },
  { code: "+358", country: "FI" },
  { code: "+354", country: "IS" },
  { code: "+44", country: "UK" },
  { code: "+1", country: "US" },
  { code: "+49", country: "DE" },
];

export function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="apply" className="section-padding">
      <div className="max-w-xl mx-auto">
        <SectionHeading
          label="Get Started"
          title="Apply for Your Free Audit"
          description="Tell us about yourself and we'll get back to you within 24 hours."
        />

        {submitted ? (
          <FadeIn>
            <div className="bg-surface border border-accent/20 rounded-xl p-12 text-center">
              <p className="text-2xl font-semibold">Application Received</p>
              <p className="text-muted mt-3">
                We&apos;ll review your profile and reach out within 24 hours.
              </p>
            </div>
          </FadeIn>
        ) : (
          <FadeIn>
            <form
              onSubmit={handleSubmit}
              className="bg-surface border border-surface-light rounded-xl p-8 space-y-6"
            >
              <div>
                <label className="block text-sm text-muted mb-2">Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  className="w-full bg-background border border-surface-light rounded-lg px-4 py-3 text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-muted mb-2">
                  Phone Number
                </label>
                <div className="flex gap-3">
                  <select
                    defaultValue="+47"
                    className="bg-background border border-surface-light rounded-lg px-3 py-3 text-text focus:outline-none focus:border-accent/50 transition-colors"
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.country} {c.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    required
                    placeholder="Phone number"
                    className="flex-1 bg-background border border-surface-light rounded-lg px-4 py-3 text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-muted mb-2">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  required
                  placeholder="@yourhandle"
                  className="w-full bg-background border border-surface-light rounded-lg px-4 py-3 text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-muted mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your goals..."
                  className="w-full bg-background border border-surface-light rounded-lg px-4 py-3 text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors resize-none"
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Submit Application
              </Button>

              <p className="text-xs text-muted text-center">
                All information is handled with strict Norwegian privacy
                standards.
              </p>
            </form>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
