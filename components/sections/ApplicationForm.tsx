"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const countryCodes = [
  { code: "+47", country: "NO" },
  { code: "+46", country: "SE" },
  { code: "+45", country: "DK" },
  { code: "+358", country: "FI" },
  { code: "+354", country: "IS" },
  { code: "+44", country: "UK" },
  { code: "+1", country: "US" },
  { code: "+49", country: "DE" },
];

function FloatingInput({
  label,
  type = "text",
  required = false,
  value,
  onChange,
  inputMode,
}: {
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  inputMode?: "text" | "email" | "tel" | "numeric";
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="relative">
      <motion.label
        className="absolute left-4 pointer-events-none text-muted origin-left"
        animate={{
          y: isActive ? -22 : 0,
          scale: isActive ? 0.8 : 1,
          color: focused ? "var(--color-text)" : "var(--color-muted)",
        }}
        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ top: "0.9rem" }}
      >
        {label}
      </motion.label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        inputMode={inputMode}
        className="w-full bg-transparent border border-surface-light rounded-lg px-4 pt-5 pb-2 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white focus:bg-white/[0.02] transition-all duration-300"
      />
    </div>
  );
}

function FloatingTextarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="relative">
      <motion.label
        className="absolute left-4 pointer-events-none text-muted origin-left"
        animate={{
          y: isActive ? -22 : 0,
          scale: isActive ? 0.8 : 1,
          color: focused ? "var(--color-text)" : "var(--color-muted)",
        }}
        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ top: "0.9rem" }}
      >
        {label}
      </motion.label>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent border border-surface-light rounded-lg px-4 pt-5 pb-2 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white focus:bg-white/[0.02] transition-all duration-300 resize-none"
      />
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5 text-black"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [handle, setHandle] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [countryCode, setCountryCode] = useState("+47");
  const [phone, setPhone] = useState("");
  const [goals, setGoals] = useState("");

  const goToStep2 = () => {
    if (!name.trim() || !email.trim() || !handle.trim()) return;
    setDirection(1);
    setStep(2);
  };

  const goToStep1 = () => {
    setDirection(-1);
    setStep(1);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, handle, tiktok, countryCode, phone, goals }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("success");
    }
  };

  return (
    <section id="apply" className="section-padding">
      <div className="max-w-2xl mx-auto">
        {/* Scarcity signal */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
          <span className="text-sm text-muted">
            Only accepting 1 new creator this month
          </span>
        </div>

        <SectionHeading
          label="Get Started"
          title="Apply for Your Free Audit"
          description="Tell us about yourself and we'll get back to you within 24 hours."
        />

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-surface border border-surface-light rounded-2xl p-8 md:p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              >
                <svg
                  className="w-16 h-16 text-white mx-auto mb-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </motion.div>
              <p className="text-2xl font-semibold font-heading">
                Application Received
              </p>
              <p className="text-muted mt-3">
                We&apos;ll review your profile and reach out within 24 hours.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form-container"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-surface border border-surface-light rounded-2xl p-8 md:p-12"
            >
              {/* Step indicator */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <div
                  className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                    step === 1 ? "bg-white" : "bg-surface-light"
                  }`}
                />
                <span className="text-xs text-muted">
                  Step {step} of 2
                </span>
                <div
                  className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                    step === 2 ? "bg-white" : "bg-surface-light"
                  }`}
                />
              </div>

              <div className="overflow-hidden relative">
                <AnimatePresence mode="wait" custom={direction}>
                  {step === 1 ? (
                    <motion.div
                      key="step1"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        duration: 0.3,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className="space-y-7"
                    >
                      <FloatingInput
                        label="Your full name"
                        type="text"
                        required
                        value={name}
                        onChange={setName}
                      />
                      <FloatingInput
                        label="Email address"
                        type="email"
                        required
                        value={email}
                        onChange={setEmail}
                      />
                      <FloatingInput
                        label="@instagram"
                        type="text"
                        required
                        value={handle}
                        onChange={setHandle}
                      />
                      <FloatingInput
                        label="@tiktok (optional)"
                        type="text"
                        value={tiktok}
                        onChange={setTiktok}
                      />
                      <motion.button
                        type="button"
                        onClick={goToStep2}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        className="w-full inline-flex items-center justify-center gap-2 font-semibold rounded-full px-8 py-4 text-base bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-white/5 cursor-pointer btn-glow transition-all duration-300"
                      >
                        Continue
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="step2"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        duration: 0.3,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      onSubmit={handleSubmit}
                      className="space-y-7"
                    >
                      <div>
                        <p className="text-sm text-muted mb-2">
                          Phone Number
                        </p>
                        <div className="flex gap-3">
                          <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="bg-transparent border border-surface-light rounded-lg px-3 py-3.5 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white focus:bg-white/[0.02] transition-all duration-300"
                          >
                            {countryCodes.map((c) => (
                              <option
                                key={c.code}
                                value={c.code}
                                className="bg-surface text-white"
                              >
                                {c.country} {c.code}
                              </option>
                            ))}
                          </select>
                          <FloatingInput
                            label="Phone number"
                            type="tel"
                            required
                            value={phone}
                            onChange={(v) => setPhone(v.replace(/[^0-9]/g, ""))}
                            inputMode="numeric"
                          />
                        </div>
                      </div>

                      <FloatingTextarea
                        label="Tell us about your goals..."
                        value={goals}
                        onChange={setGoals}
                      />

                      <motion.button
                        type="submit"
                        disabled={status === "submitting"}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        className="w-full inline-flex items-center justify-center gap-2 font-semibold rounded-full px-8 py-4 text-base bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-white/5 cursor-pointer btn-glow disabled:opacity-70 transition-all duration-300"
                      >
                        {status === "submitting" ? (
                          <>
                            <Spinner />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          "Submit Application"
                        )}
                      </motion.button>

                      <button
                        type="button"
                        onClick={goToStep1}
                        className="w-full text-center text-sm text-muted hover:text-white transition-colors cursor-pointer"
                      >
                        &larr; Back to Step 1
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              <p className="text-xs text-muted text-center mt-8">
                All information is handled with strict Norwegian privacy
                standards.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                  <span>100% Confidential</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>24hr Response</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                  <span>Norwegian Privacy Standards</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
