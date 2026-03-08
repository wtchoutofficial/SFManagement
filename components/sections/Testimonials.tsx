"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* ── Sparkline (mini graph for cards) ── */

interface SparklineProps {
  data: number[];
  id: string;
}

function Sparkline({ data, id }: SparklineProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [animated, setAnimated] = useState(false);

  const W = 200;
  const H = 60;
  const PAD = 8;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => ({
    x: PAD + (i / (data.length - 1)) * (W - PAD * 2),
    y: PAD + (H - PAD * 2) - ((v - min) / range) * (H - PAD * 2),
  }));

  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");
  const area = [
    `${points[0].x},${H - PAD}`,
    ...points.map((p) => `${p.x},${p.y}`),
    `${points[points.length - 1].x},${H - PAD}`,
  ].join(" ");

  let pathLength = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    pathLength += Math.sqrt(dx * dx + dy * dy);
  }

  useEffect(() => {
    if (isInView && !animated) setAnimated(true);
  }, [isInView, animated]);

  const dur = reducedMotion ? 0 : isMobile ? 0.6 : 1.2;
  const show = animated || reducedMotion;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto mt-4"
      aria-hidden
    >
      <defs>
        <linearGradient id={`spark-fill-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={area}
        fill={`url(#spark-fill-${id})`}
        opacity={show ? 1 : 0}
        style={{ transition: `opacity ${dur}s ease` }}
      />
      <polyline
        points={polyline}
        fill="none"
        stroke="#22c55e"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={pathLength}
        strokeDashoffset={show ? 0 : pathLength}
        style={{
          transition: `stroke-dashoffset ${dur}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        }}
      />
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3"
          fill="var(--color-background)"
          stroke="#22c55e"
          strokeWidth="1.5"
          opacity={show ? 1 : 0}
          style={{ transition: `opacity 0.3s ease ${dur * 0.6 + i * 0.08}s` }}
        />
      ))}
    </svg>
  );
}

/* ── Data ── */

interface CaseStudy {
  label: string;
  headlinePrefix: string;
  headlineValue: number;
  headlineSuffix: string;
  subtitle: string;
  badge: string;
  sparkData: number[];
}

const caseStudies: CaseStudy[] = [
  {
    label: "Creator A",
    headlinePrefix: "$",
    headlineValue: 125,
    headlineSuffix: "K",
    subtitle: "Best single month",
    badge: "+81.9% Dec growth",
    sparkData: [42, 58, 70, 66, 125],
  },
  {
    label: "Creator B",
    headlinePrefix: "$",
    headlineValue: 94.4,
    headlineSuffix: "K",
    subtitle: "Peak month revenue",
    badge: "+82% monthly growth",
    sparkData: [18, 32, 45, 52, 68, 94.4],
  },
  {
    label: "Creator C",
    headlinePrefix: "$",
    headlineValue: 56.9,
    headlineSuffix: "K",
    subtitle: "Peak month revenue",
    badge: "+52.2% Dec growth",
    sparkData: [12, 19.8, 36.7, 56.9],
  },
  {
    label: "Creator D",
    headlinePrefix: "+",
    headlineValue: 289,
    headlineSuffix: "%",
    subtitle: "Revenue growth",
    badge: "$20.5K in 6 weeks",
    sparkData: [1.2, 4.5, 10, 16, 20.5],
  },
];

/* ── Component ── */

export function Testimonials() {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <SectionHeading
          label="Results"
          title="Verified Creator Earnings"
          description="Real data from creators we manage. No fakes, no projections — just results."
        />

        {/* Case study cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {caseStudies.map((cs, i) => (
            <FadeIn key={cs.label} delay={i * 0.08}>
              <div className="card-glow rounded-xl p-4 md:p-6 flex flex-col h-full">
                <span className="text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3">
                  {cs.label}
                </span>

                <p className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading text-text leading-none">
                  <AnimatedCounter
                    value={cs.headlineValue}
                    prefix={cs.headlinePrefix}
                    suffix={cs.headlineSuffix}
                    duration={1800}
                  />
                </p>

                <p className="text-xs md:text-sm text-muted mt-1.5">
                  {cs.subtitle}
                </p>

                <Sparkline data={cs.sparkData} id={cs.label.replace(/\s/g, "")} />
                <span className="inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] md:text-xs font-medium w-fit">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                    <path d="M5 8V2M5 2L2.5 4.5M5 2L7.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {cs.badge}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <p className="text-xs text-muted text-center mt-10 max-w-xl mx-auto">
            Real anonymized data from managed creators. All earnings verified.
            Individual results vary based on niche, content quality, and audience
            engagement.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
