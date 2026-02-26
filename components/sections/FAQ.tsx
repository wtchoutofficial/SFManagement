"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";

const faqs = [
  {
    question: "What's the revenue split?",
    answer:
      "We operate on a performance-based model — our fee is a percentage of the revenue we help generate. This means we only succeed when you do. Exact terms are discussed during your onboarding call.",
  },
  {
    question: "How do I get started?",
    answer:
      "Fill out the application form below. We'll review your profile and schedule a free strategy call within 24 hours. If we're a good fit, onboarding takes less than a week.",
  },
  {
    question: "How do you handle privacy and discretion?",
    answer:
      "We're based in Norway with strict European privacy standards. All communication is encrypted, NDAs are standard, and we never share creator information publicly without explicit consent.",
  },
  {
    question: "What platforms do you manage?",
    answer:
      "We specialize in OnlyFans, Fansly, and similar subscription-based platforms. We also manage cross-promotion across Instagram, TikTok, Twitter/X, and Reddit to drive subscriber growth.",
  },
  {
    question: "How will we communicate?",
    answer:
      "You'll have a dedicated account manager available via Telegram or your preferred messaging platform. We provide weekly performance reports and are available for calls whenever you need them.",
  },
  {
    question: "Is there a contract or lock-in period?",
    answer:
      "We offer flexible month-to-month agreements. No long-term lock-in. We believe our results should be the reason you stay, not a contract.",
  },
  {
    question: "How quickly will I see results?",
    answer:
      "Most creators see measurable growth within the first 2–4 weeks. Significant revenue increases typically happen within 60–90 days as our strategies compound over time.",
  },
  {
    question: "Do I need to create all the content myself?",
    answer:
      "You focus on creating content you're comfortable with. We handle everything else — scheduling, fan engagement, marketing, pricing strategy, and growth campaigns.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="card-glow overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
      >
        <span className="font-semibold font-heading text-lg pr-4">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-accent text-2xl flex-shrink-0 leading-none"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="px-6 pb-6 text-muted leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding">
      <div className="container-narrow">
        <SectionHeading label="FAQ" title="Common Questions" />
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() =>
                  setOpenIndex(openIndex === i ? null : i)
                }
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
