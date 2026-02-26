"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface DataPoint {
  label: string;
  value: number;
}

interface RevenueGraphProps {
  data: DataPoint[];
  className?: string;
}

const GRAPH_WIDTH = 400;
const GRAPH_HEIGHT = 200;
const PADDING = { top: 30, right: 20, bottom: 40, left: 50 };
const INNER_WIDTH = GRAPH_WIDTH - PADDING.left - PADDING.right;
const INNER_HEIGHT = GRAPH_HEIGHT - PADDING.top - PADDING.bottom;

function formatValue(v: number): string {
  return `$${v}K`;
}

export function RevenueGraph({ data, className = "" }: RevenueGraphProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [animated, setAnimated] = useState(false);

  const maxVal = Math.max(...data.map((d) => d.value));
  const minVal = Math.min(...data.map((d) => d.value));
  const range = maxVal - minVal || 1;
  const yPad = range * 0.15;
  const yMin = minVal - yPad;
  const yMax = maxVal + yPad;
  const yRange = yMax - yMin;

  const points = data.map((d, i) => ({
    x: PADDING.left + (i / (data.length - 1)) * INNER_WIDTH,
    y: PADDING.top + INNER_HEIGHT - ((d.value - yMin) / yRange) * INNER_HEIGHT,
  }));

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  // Area polygon (line + bottom closing)
  const areaPoints = [
    `${points[0].x},${PADDING.top + INNER_HEIGHT}`,
    ...points.map((p) => `${p.x},${p.y}`),
    `${points[points.length - 1].x},${PADDING.top + INNER_HEIGHT}`,
  ].join(" ");

  // Calculate polyline length for dash animation
  let pathLength = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    pathLength += Math.sqrt(dx * dx + dy * dy);
  }

  useEffect(() => {
    if (isInView && !animated) {
      setAnimated(true);
    }
  }, [isInView, animated]);

  const animDuration = reducedMotion ? 0 : isMobile ? 0.8 : 1.5;
  const showAnimation = animated || reducedMotion;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`}
      className={`w-full h-auto ${className}`}
      aria-label="Revenue growth chart showing monthly earnings"
      role="img"
    >
      <defs>
        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Y-axis labels */}
      {[0, 0.5, 1].map((frac) => {
        const val = Math.round(yMin + frac * yRange);
        const y = PADDING.top + INNER_HEIGHT - frac * INNER_HEIGHT;
        return (
          <text
            key={frac}
            x={PADDING.left - 8}
            y={y + 4}
            textAnchor="end"
            className="fill-muted"
            fontSize="10"
            fontFamily="var(--font-sans)"
          >
            {formatValue(val)}
          </text>
        );
      })}

      {/* X-axis labels */}
      {data.map((d, i) => (
        <text
          key={d.label}
          x={points[i].x}
          y={PADDING.top + INNER_HEIGHT + 20}
          textAnchor="middle"
          className="fill-muted"
          fontSize="10"
          fontFamily="var(--font-sans)"
        >
          {d.label}
        </text>
      ))}

      {/* Area fill */}
      <polygon
        points={areaPoints}
        fill="url(#areaGradient)"
        opacity={showAnimation ? 1 : 0}
        style={{
          transition: `opacity ${animDuration}s ease`,
        }}
      />

      {/* Line */}
      <polyline
        points={polylinePoints}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={pathLength}
        strokeDashoffset={showAnimation ? 0 : pathLength}
        style={{
          transition: `stroke-dashoffset ${animDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        }}
      />

      {/* Data point dots */}
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="4"
          fill="var(--color-background)"
          stroke="var(--color-accent)"
          strokeWidth="2"
          opacity={showAnimation ? 1 : 0}
          style={{
            transition: `opacity 0.3s ease ${animDuration * 0.6 + i * 0.1}s`,
          }}
        />
      ))}

      {/* Value labels on points */}
      {points.map((p, i) => (
        <text
          key={`val-${i}`}
          x={p.x}
          y={p.y - 12}
          textAnchor="middle"
          fill="var(--color-text)"
          fontSize="11"
          fontWeight="600"
          fontFamily="var(--font-sans)"
          opacity={showAnimation ? 1 : 0}
          style={{
            transition: `opacity 0.3s ease ${animDuration * 0.6 + i * 0.1}s`,
          }}
        >
          {formatValue(data[i].value)}
        </text>
      ))}
    </svg>
  );
}
