"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";

export function CTABanner() {
  return (
    <section className="section-padding">
      <FadeIn>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading leading-tight">
            Ready to Take Back Control?
          </h2>
          <p className="text-muted text-lg mt-4">
            Apply for a free audit and see what we can do for your brand.
          </p>
          <div className="mt-8">
            <a href="#apply">
              <Button size="lg">Apply Now — It&apos;s Free</Button>
            </a>
          </div>
          <p className="text-sm text-muted mt-4">
            No commitment. We respond within 24 hours.
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
