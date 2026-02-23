"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center section-padding"
    >
      <div className="container-narrow text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
        >
          Maximize Your Potential.
          <br />
          <span className="text-accent">Zero Fluff.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="text-muted text-lg md:text-xl max-w-2xl mx-auto mt-6"
        >
          The premier Scandinavian management agency located in Norway. We do
          the heavy lifting, you keep the focus on creation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-10"
        >
          <a href="#apply">
            <Button size="lg">Get Your Free Growth Audit</Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
