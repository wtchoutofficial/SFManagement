"use client";

import { Marquee } from "@/components/ui/Marquee";

const words = ["CREATOR MANAGEMENT", "SOCIAL GROWTH", "FAN ENGAGEMENT", "PRIVACY FIRST", "SIX-FIGURE TARGETS", "24/7 SUPPORT"];

export function MarqueeStrip() {
  return (
    <div className="py-8 border-y border-surface-light overflow-hidden">
      <Marquee>
        {words.map((word) => (
          <span
            key={word}
            className="text-2xl md:text-3xl font-bold font-heading text-surface-light mx-8"
          >
            {word}
            <span className="text-muted mx-8">&bull;</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
