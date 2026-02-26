import { FadeIn } from "./FadeIn";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  gradient?: boolean;
}

export function SectionHeading({
  label,
  title,
  description,
  gradient,
}: SectionHeadingProps) {
  return (
    <div className="text-center mb-16">
      {label && (
        <FadeIn>
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-muted border border-surface-light rounded-full px-5 py-2 mb-8">
            {label}
          </span>
        </FadeIn>
      )}
      <FadeIn delay={0.1}>
        <h2
          className={`text-4xl sm:text-5xl md:text-6xl font-bold font-heading leading-tight ${
            gradient ? "text-gradient" : ""
          }`}
        >
          {title}
        </h2>
      </FadeIn>
      {description && (
        <FadeIn delay={0.2}>
          <p className="text-muted text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
