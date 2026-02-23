# SF Management Website — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a premium single-page marketing site for SF Management using Next.js 15, Tailwind CSS, and Framer Motion with a dark Scandinavian minimalist aesthetic.

**Architecture:** Next.js App Router with a single page (`app/page.tsx`) composing 8 section components. Shared UI primitives (`FadeIn`, `Button`, `SectionHeading`) keep animations and styling DRY. All content is static — no API routes or backend.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Inter font via `next/font/google`

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `.gitignore`

**Step 1: Scaffold Next.js project**

Run from `~/Desktop/sf-management`:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

When prompted, accept defaults. This creates the full Next.js scaffold.

Expected: Project files created, `node_modules` installed.

**Step 2: Install Framer Motion**

```bash
npm install framer-motion
```

Expected: `framer-motion` added to `package.json` dependencies.

**Step 3: Configure Tailwind custom theme**

Replace the contents of `tailwind.config.ts` with:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        surface: "#141414",
        "surface-light": "#1A1A1A",
        accent: "#7DD3FC",
        text: "#F5F5F5",
        muted: "#737373",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 4: Configure globals.css**

Replace `app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-text antialiased;
  }
}

@layer utilities {
  .section-padding {
    @apply px-6 md:px-12 lg:px-24 py-24;
  }
  .container-narrow {
    @apply max-w-6xl mx-auto;
  }
}
```

**Step 5: Configure root layout with Inter font**

Replace `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SF Management — Premium Creator Management Agency",
  description:
    "The premier Scandinavian management agency located in Norway. We do the heavy lifting, you keep the focus on creation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

**Step 6: Replace page.tsx with placeholder**

Replace `app/page.tsx` with:

```tsx
export default function Home() {
  return (
    <main>
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-accent">SF Management</h1>
      </div>
    </main>
  );
}
```

**Step 7: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts on `http://localhost:3000`. Page shows "SF Management" in ice blue on a near-black background.

**Step 8: Commit**

```bash
git add -A && git commit -m "chore: scaffold Next.js project with Tailwind and Framer Motion"
```

---

### Task 2: UI Primitives (FadeIn, Button, SectionHeading)

**Files:**
- Create: `components/ui/FadeIn.tsx`
- Create: `components/ui/Button.tsx`
- Create: `components/ui/SectionHeading.tsx`

**Step 1: Create FadeIn component**

Create `components/ui/FadeIn.tsx`:

```tsx
"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}

export function FadeIn({
  delay = 0,
  duration = 0.6,
  children,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
```

**Step 2: Create Button component**

Create `components/ui/Button.tsx`:

```tsx
import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  size?: "default" | "lg";
}

export function Button({
  variant = "primary",
  size = "default",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer";
  const sizes = {
    default: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };
  const variants = {
    primary:
      "bg-accent text-background hover:bg-accent/90 shadow-lg shadow-accent/20",
    outline:
      "border border-surface-light text-text hover:border-accent hover:text-accent",
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

**Step 3: Create SectionHeading component**

Create `components/ui/SectionHeading.tsx`:

```tsx
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
```

**Step 4: Verify — import all three into page.tsx temporarily**

Replace `app/page.tsx`:

```tsx
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
```

Check `http://localhost:3000` — heading, two buttons, fade-in animations.

**Step 5: Commit**

```bash
git add components/ui/ app/page.tsx && git commit -m "feat: add FadeIn, Button, and SectionHeading UI primitives"
```

---

### Task 3: Navbar

**Files:**
- Create: `components/sections/Navbar.tsx`
- Modify: `app/page.tsx` (import Navbar)

**Step 1: Create Navbar component**

Create `components/sections/Navbar.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-surface/80 backdrop-blur-md border-b border-surface-light"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="text-lg font-bold text-text">
            SF Management
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-text transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button>
              <a href="#apply">Apply Now</a>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-text transition-transform ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-text transition-opacity ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-text transition-transform ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl text-text hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button size="lg">
              <a href="#apply" onClick={() => setMobileOpen(false)}>
                Apply Now
              </a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

**Step 2: Add Navbar to page.tsx**

Update `app/page.tsx` to import and render `<Navbar />` at the top of `<main>`.

**Step 3: Verify**

Check `http://localhost:3000`:
- Navbar visible at top, transparent
- Scroll down → background appears with blur
- Resize to mobile → hamburger menu works

**Step 4: Commit**

```bash
git add components/sections/Navbar.tsx app/page.tsx && git commit -m "feat: add sticky Navbar with mobile menu and scroll effect"
```

---

### Task 4: Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`
- Modify: `app/page.tsx` (import Hero)

**Step 1: Create Hero component**

Create `components/sections/Hero.tsx`:

```tsx
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
          <Button size="lg">
            <a href="#apply">Get Your Free Growth Audit</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Add Hero to page.tsx below Navbar**

**Step 3: Verify**

Check `http://localhost:3000`:
- Full-screen hero with staggered fade-in animation
- Heading, subtext, CTA all visible
- Responsive text sizing

**Step 4: Commit**

```bash
git add components/sections/Hero.tsx app/page.tsx && git commit -m "feat: add Hero section with staggered fade-in animation"
```

---

### Task 5: Services Section

**Files:**
- Create: `components/sections/Services.tsx`
- Modify: `app/page.tsx` (import Services)

**Step 1: Create Services component**

Create `components/sections/Services.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";

const services = [
  {
    title: "Account Management",
    description:
      "Full strategic control of your account. Content scheduling, optimization, and analytics — handled.",
  },
  {
    title: "Social Media Growth",
    description:
      "Organic and paid strategies to build your audience across every platform that matters.",
  },
  {
    title: "Chatting & Fan-Engagement",
    description:
      "Professional, high-converting fan interactions that maximize your revenue per subscriber.",
  },
  {
    title: "Reputation & Privacy Protection",
    description:
      "Discreet identity management and DMCA enforcement. Your privacy is non-negotiable.",
  },
];

export function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="container-narrow">
        <SectionHeading
          label="What We Do"
          title="Services Built for Results"
          description="No fluff. Every service is designed to directly grow your revenue."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-surface border border-surface-light rounded-xl p-8 hover:border-accent/30 transition-colors duration-300"
              >
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add Services to page.tsx**

**Step 3: Verify**

- 2x2 grid on desktop, single column on mobile
- Cards fade in on scroll with stagger
- Hover lifts cards slightly with accent border glow

**Step 4: Commit**

```bash
git add components/sections/Services.tsx app/page.tsx && git commit -m "feat: add Services section with hover cards and scroll animations"
```

---

### Task 6: Why Us Section

**Files:**
- Create: `components/sections/WhyUs.tsx`
- Modify: `app/page.tsx` (import WhyUs)

**Step 1: Create WhyUs component**

Create `components/sections/WhyUs.tsx`:

```tsx
"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";

const industryStandard = [
  "Predatory revenue splits and hidden fees",
  "No real strategy — just empty promises",
  "Poor communication and slow response times",
  "Zero discretion with sensitive creator data",
];

const sfStandard = [
  "Transparent contracts with fair, competitive terms",
  "Custom growth strategies backed by real data",
  "Dedicated team with 24/7 communication",
  "100% discretion — built on Norwegian privacy values",
];

export function WhyUs() {
  return (
    <section id="why-us" className="section-padding">
      <div className="container-narrow">
        <SectionHeading
          label="Why Us"
          title="The SF Management Standard"
          description="We built this agency because the industry needed better. Here's how we compare."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Industry Standard */}
          <FadeIn>
            <div className="bg-surface border border-surface-light rounded-xl p-8">
              <h3 className="text-lg font-semibold text-muted mb-6">
                Industry Standard
              </h3>
              <ul className="space-y-4">
                {industryStandard.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-red-400 mt-0.5 text-lg">✕</span>
                    <span className="text-muted text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* SF Standard */}
          <FadeIn delay={0.15}>
            <div className="bg-surface border border-accent/20 rounded-xl p-8">
              <h3 className="text-lg font-semibold text-accent mb-6">
                SF Management Standard
              </h3>
              <ul className="space-y-4">
                {sfStandard.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-accent mt-0.5 text-lg">✓</span>
                    <span className="text-text text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add to page.tsx**

**Step 3: Verify** — two columns, X vs check icons, accent border on SF column

**Step 4: Commit**

```bash
git add components/sections/WhyUs.tsx app/page.tsx && git commit -m "feat: add Why Us comparison section"
```

---

### Task 7: Stats Strip

**Files:**
- Create: `components/sections/Stats.tsx`
- Modify: `app/page.tsx` (import Stats)

**Step 1: Create Stats component**

Create `components/sections/Stats.tsx`:

```tsx
"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const stats = [
  { value: "Norway", label: "Founded In" },
  { value: "7-Figure", label: "Revenue Generated" },
  { value: "100%", label: "Full Discretion" },
];

export function Stats() {
  return (
    <section className="bg-surface-light py-16">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0 md:divide-x md:divide-surface-light">
          {stats.map((stat, i) => (
            <FadeIn
              key={stat.label}
              delay={i * 0.15}
              className="flex-1 text-center px-8"
            >
              <div className="text-3xl md:text-4xl font-bold text-accent">
                {stat.value}
              </div>
              <div className="text-muted text-sm mt-2">{stat.label}</div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add to page.tsx**

**Step 3: Verify** — horizontal strip, 3 stats, fade-in stagger

**Step 4: Commit**

```bash
git add components/sections/Stats.tsx app/page.tsx && git commit -m "feat: add Stats strip with staggered fade-in"
```

---

### Task 8: Process Section

**Files:**
- Create: `components/sections/Process.tsx`
- Modify: `app/page.tsx` (import Process)

**Step 1: Create Process component**

Create `components/sections/Process.tsx`:

```tsx
"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Apply for an Audit",
    description: "Fill out a quick application. We review your profile and potential within 24 hours.",
  },
  {
    number: "02",
    title: "Custom Strategy",
    description: "We build a tailored growth plan based on your niche, goals, and current position.",
  },
  {
    number: "03",
    title: "Full Team Support",
    description: "Our team handles everything — content strategy, engagement, and account management.",
  },
  {
    number: "04",
    title: "Scale to Six Figures",
    description: "Watch your revenue grow while you focus on what you do best — creating.",
  },
];

export function Process() {
  return (
    <section id="process" className="section-padding">
      <div className="container-narrow">
        <SectionHeading
          label="How It Works"
          title="Four Steps to Growth"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 0.1}>
              <div className="relative">
                <span className="text-5xl font-bold text-accent/20">
                  {step.number}
                </span>
                <h3 className="text-lg font-semibold mt-2">{step.title}</h3>
                <p className="text-muted text-sm mt-2 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add to page.tsx**

**Step 3: Verify** — 4 columns on desktop, fade-in stagger, large faded step numbers

**Step 4: Commit**

```bash
git add components/sections/Process.tsx app/page.tsx && git commit -m "feat: add Process section with 4-step timeline"
```

---

### Task 9: Application Form

**Files:**
- Create: `components/sections/ApplicationForm.tsx`
- Modify: `app/page.tsx` (import ApplicationForm)

**Step 1: Create ApplicationForm component**

Create `components/sections/ApplicationForm.tsx`:

```tsx
"use client";

import { useState, type FormEvent } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

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

export function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="apply" className="section-padding">
      <div className="max-w-xl mx-auto">
        <SectionHeading
          label="Get Started"
          title="Apply for Your Free Audit"
          description="Tell us about yourself and we'll get back to you within 24 hours."
        />

        {submitted ? (
          <FadeIn>
            <div className="bg-surface border border-accent/20 rounded-xl p-12 text-center">
              <p className="text-2xl font-semibold">Application Received</p>
              <p className="text-muted mt-3">
                We&apos;ll review your profile and reach out within 24 hours.
              </p>
            </div>
          </FadeIn>
        ) : (
          <FadeIn>
            <form
              onSubmit={handleSubmit}
              className="bg-surface border border-surface-light rounded-xl p-8 space-y-6"
            >
              {/* Name */}
              <div>
                <label className="block text-sm text-muted mb-2">Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  className="w-full bg-background border border-surface-light rounded-lg px-4 py-3 text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm text-muted mb-2">
                  Phone Number
                </label>
                <div className="flex gap-3">
                  <select
                    defaultValue="+47"
                    className="bg-background border border-surface-light rounded-lg px-3 py-3 text-text focus:outline-none focus:border-accent/50 transition-colors"
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.country} {c.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    required
                    placeholder="Phone number"
                    className="flex-1 bg-background border border-surface-light rounded-lg px-4 py-3 text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
              </div>

              {/* Instagram */}
              <div>
                <label className="block text-sm text-muted mb-2">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  required
                  placeholder="@yourhandle"
                  className="w-full bg-background border border-surface-light rounded-lg px-4 py-3 text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm text-muted mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your goals..."
                  className="w-full bg-background border border-surface-light rounded-lg px-4 py-3 text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors resize-none"
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Submit Application
              </Button>

              <p className="text-xs text-muted text-center">
                All information is handled with strict Norwegian privacy
                standards.
              </p>
            </form>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
```

**Step 2: Add to page.tsx**

**Step 3: Verify** — form renders, validation works, submit shows success state

**Step 4: Commit**

```bash
git add components/sections/ApplicationForm.tsx app/page.tsx && git commit -m "feat: add Application form with client-side validation"
```

---

### Task 10: Footer

**Files:**
- Create: `components/sections/Footer.tsx`
- Modify: `app/page.tsx` (import Footer)

**Step 1: Create Footer component**

Create `components/sections/Footer.tsx`:

```tsx
export function Footer() {
  return (
    <footer className="bg-surface border-t border-surface-light py-12">
      <div className="container-narrow px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-lg font-bold">SF Management</div>

          <div className="flex gap-6 text-sm text-muted">
            <a href="#home" className="hover:text-text transition-colors">
              Home
            </a>
            <a href="#services" className="hover:text-text transition-colors">
              Services
            </a>
            <a href="#why-us" className="hover:text-text transition-colors">
              Why Us
            </a>
            <a href="#process" className="hover:text-text transition-colors">
              Process
            </a>
            <a href="#apply" className="hover:text-text transition-colors">
              Apply
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-surface-light text-center">
          <p className="text-xs text-muted">
            &copy; 2026 SF Management. All rights reserved.
          </p>
          <p className="text-xs text-muted mt-2">
            SF Management is an independent agency. We are not affiliated with,
            endorsed by, or sponsored by any platform.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Add to page.tsx**

**Step 3: Verify** — footer with logo, links, copyright, disclaimer

**Step 4: Commit**

```bash
git add components/sections/Footer.tsx app/page.tsx && git commit -m "feat: add Footer with links and legal disclaimer"
```

---

### Task 11: Final Assembly & Polish

**Files:**
- Modify: `app/page.tsx` (final assembly with all sections)

**Step 1: Ensure page.tsx imports and renders all sections in order**

Final `app/page.tsx`:

```tsx
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
```

**Step 2: Add smooth scrolling to globals.css**

Add to `app/globals.css`:

```css
html {
  scroll-behavior: smooth;
}
```

**Step 3: Full visual QA**

Check `http://localhost:3000`:
- All 8 sections render in order
- Scroll animations trigger correctly
- Navbar scroll effect works
- Mobile hamburger menu works
- All hover effects work
- Form validation and submission work
- Smooth scroll to section anchors from nav links

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: assemble all sections and add smooth scrolling"
```

---

## Summary

| Task | Description | Key Files |
|------|-------------|-----------|
| 1 | Project scaffolding | package.json, layout.tsx, globals.css, tailwind.config.ts |
| 2 | UI primitives | FadeIn.tsx, Button.tsx, SectionHeading.tsx |
| 3 | Navbar | Navbar.tsx |
| 4 | Hero | Hero.tsx |
| 5 | Services | Services.tsx |
| 6 | Why Us | WhyUs.tsx |
| 7 | Stats | Stats.tsx |
| 8 | Process | Process.tsx |
| 9 | Application Form | ApplicationForm.tsx |
| 10 | Footer | Footer.tsx |
| 11 | Final assembly & polish | page.tsx, globals.css |
