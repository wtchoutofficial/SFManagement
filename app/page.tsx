import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8">
      <SectionHeading label="Test" title="UI Primitives" description="Working correctly" />
      <FadeIn>
        <Button>Primary</Button>
      </FadeIn>
      <FadeIn delay={0.2}>
        <Button variant="outline">Outline</Button>
      </FadeIn>
    </main>
  );
}
