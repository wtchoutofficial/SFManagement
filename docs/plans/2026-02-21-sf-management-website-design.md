# SF Management Website — Design Document

## Overview

Premium single-page website for SF Management, a Scandinavian OnlyFans/Creator management agency based in Norway. Dark mode, minimalist, direct tone. Inspired by iqonic-studios.com but stripped down to Scandinavian minimalism.

## Tech Stack

- Next.js 15 (App Router)
- Tailwind CSS v4
- Framer Motion
- TypeScript

## Project Structure

```
sf-management/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # Home — imports all sections
│   └── globals.css         # Tailwind base + custom utilities
├── components/
│   ├── sections/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── WhyUs.tsx
│   │   ├── Stats.tsx
│   │   ├── Process.tsx
│   │   ├── ApplicationForm.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── FadeIn.tsx       # Reusable Framer Motion wrapper
│       └── SectionHeading.tsx
├── tailwind.config.ts
├── package.json
└── next.config.ts
```

## Color System

| Token          | Value     | Usage                    |
|----------------|-----------|--------------------------|
| background     | #0A0A0A   | Page background          |
| surface        | #141414   | Cards, navbar            |
| surface-light  | #1A1A1A   | Hover states, borders    |
| accent         | #7DD3FC   | CTAs, highlights, links  |
| text           | #F5F5F5   | Primary text             |
| muted          | #737373   | Secondary text, labels   |

## Typography

- Font: Inter (via next/font/google)
- Headings: weight 600–700
- Body: weight 400
- Scale: 72px hero heading, 48px section headings, 18px body, 14px muted/labels

## Animation System

Reusable `<FadeIn>` component:
- `initial={{ opacity: 0, y: 24 }}`
- `whileInView={{ opacity: 1, y: 0 }}`
- `viewport={{ once: true, margin: "-100px" }}`
- Configurable `delay` for stagger effects

Card hover: `whileHover={{ y: -4 }}` + border glow via CSS transition.

Navbar: transparent → surface background on scroll, `backdrop-blur-md`.

## Sections

### 1. Navbar
- Fixed position, z-50
- Logo text "SF Management" (left)
- Links: Home, Services, Why Us, Process, FAQ (center)
- "Apply Now" button (right, accent color)
- Mobile: hamburger menu with slide-in panel
- Scroll behavior: transparent → backdrop-blur with surface bg

### 2. Hero
- Full viewport height (min-h-screen)
- Headline: "Maximize Your Potential. Zero Fluff."
- Subtext: "The premier Scandinavian management agency located in Norway. We do the heavy lifting, you keep the focus on creation."
- CTA: "Get Your Free Growth Audit" button
- Animation: staggered fade-in on load (heading → subtext → button)

### 3. Services ("What We Do")
- 2x2 responsive grid (1 column on mobile)
- 4 cards:
  1. Account Management
  2. Social Media Growth
  3. Chatting & Fan-Engagement
  4. Reputation & Privacy Protection
- Each card: surface bg, subtle border, icon, title, 1-2 sentence description
- Hover: lift + border accent glow

### 4. Why Us ("The SF Management Standard")
- Two-column layout (stacks on mobile)
- Left: "Industry Standard" — muted styling, X icons, negative points
- Right: "SF Management Standard" — accent styling, check icons, positive points
- Points: no predatory contracts, 100% discretion, Norwegian roots, professional partnership

### 5. Stats Strip
- Horizontal banner, surface-light background
- 3 stats: "Founded in Norway", "7-Figure Revenue Generated", "Full Discretion"
- Separated by subtle dividers
- Each stat fades in with stagger delay

### 6. Process (4 Steps)
- Horizontal timeline (vertical on mobile)
- Steps connected by a subtle line
- Step 1: Apply for an Audit
- Step 2: Custom Strategy
- Step 3: Full Team Support
- Step 4: Scale to Six Figures
- Each step: number badge (accent), title, short description
- Scroll-triggered fade-in with stagger

### 7. Application Form
- Centered container (max-w-xl)
- Fields: Name, Phone (country code dropdown), Instagram Handle, Message (textarea)
- Submit button (accent, full width)
- Privacy notice: "All information is handled with strict Norwegian privacy standards."
- Frontend only — no backend submission (placeholder for future integration)
- Client-side validation

### 8. Footer
- Surface background
- Logo, navigation links, copyright "2026 SF Management"
- Legal disclaimer
- Simple, minimal layout

## Deployment

- Target: Vercel
- No backend/API routes needed initially
- Form is frontend-only with client-side validation
