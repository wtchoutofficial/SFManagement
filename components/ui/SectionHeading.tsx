import { FadeIn } from "./FadeIn";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
}

export function SectionHeading({
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="text-center mb-16">
      {label && (
        <FadeIn>
          <span className="text-accent text-sm font-medium tracking-widest uppercase">
            {label}
          </span>
        </FadeIn>
      )}
      <FadeIn delay={0.1}>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
          {title}
        </h2>
      </FadeIn>
      {description && (
        <FadeIn delay={0.2}>
          <p className="text-muted text-lg mt-4 max-w-2xl mx-auto">
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
