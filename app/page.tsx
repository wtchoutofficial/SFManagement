import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { Stats } from "@/components/sections/Stats";
import { Process } from "@/components/sections/Process";
import { ApplicationForm } from "@/components/sections/ApplicationForm";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <WhyUs />
      <Stats />
      <Process />
      <ApplicationForm />
      <Footer />
    </main>
  );
}
