"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const pastHero = scrollY > 600;

        const formSection = document.getElementById("apply");
        let formInView = false;
        if (formSection) {
          const rect = formSection.getBoundingClientRect();
          formInView = rect.top < window.innerHeight && rect.bottom > 0;
        }

        setVisible(pastHero && !formInView);
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] md:hidden"
        >
          <a
            href="#apply"
            className="block w-full text-center font-semibold rounded-full py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 btn-glow"
          >
            Apply Now
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
