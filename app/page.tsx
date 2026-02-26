import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { SocialProofBar } from "@/components/sections/SocialProofBar";
import { Problems } from "@/components/sections/Problems";
import { Services } from "@/components/sections/Services";
import { CTABanner } from "@/components/sections/CTABanner";
import { WhyUs } from "@/components/sections/WhyUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { Process } from "@/components/sections/Process";
import { FAQ } from "@/components/sections/FAQ";
import { ApplicationForm } from "@/components/sections/ApplicationForm";
import { Footer } from "@/components/sections/Footer";
import { AmbientOrbs } from "@/components/ui/AmbientOrbs";
import { StickyMobileCTA } from "@/components/ui/StickyMobileCTA";

export default function Home() {
  return (
    <main>
      <AmbientOrbs />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <SocialProofBar />
        <Problems />
        <WhyUs />
        <Services />
        <Process />
        <Testimonials />
        <CTABanner />
        <FAQ />
        <ApplicationForm />
        <Footer />
      </div>
      <StickyMobileCTA />
    </main>
  );
}
