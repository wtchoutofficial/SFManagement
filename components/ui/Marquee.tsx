"use client";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
}

export function Marquee({ children, className = "" }: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="animate-marquee flex whitespace-nowrap">
        {children}
        {children}
      </div>
    </div>
  );
}
