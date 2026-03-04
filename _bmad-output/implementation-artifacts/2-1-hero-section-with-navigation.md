# Story 2.1: Hero Section with Navigation

Status: done

## Story

As a visitor,
I want to see a compelling hero section with Agun's name, title, availability status, CTAs, and anchor navigation,
so that I can immediately assess his seniority and take action (download CV, view portfolio, contact) without scrolling.

## Acceptance Criteria

1. **Given** I land on the site  
   **When** the page loads on any viewport (mobile, tablet, desktop)  
   **Then** I see Agun's name, professional title ("Senior Frontend Developer"), and core value proposition above the fold

2. **Given** the page is loaded  
   **When** I look at the hero/sidebar area  
   **Then** a visible "Open to Work" availability badge with a pulsing green dot is displayed

3. **Given** the page is loaded  
   **When** I view the desktop layout (≥1024px)  
   **Then** a fixed 240px sidebar is visible containing: logo/brand mark, circular profile photo (amber ring border), name, title, AvailabilityBadge, nav links (Overview · Projects · About · Contact), and a full-width "Download CV" amber button pinned to the sidebar bottom

4. **Given** the page is loaded on mobile/tablet (<1024px)  
   **When** I view the navigation  
   **Then** the sidebar is hidden and replaced by a fixed top navigation bar (64px height) with logo left, hamburger right, and a full-screen overlay menu when opened — including the CV download button

5. **Given** I click a nav link (Overview, Projects, About, Contact)  
   **When** the anchor target section exists  
   **Then** the page smooth-scrolls to the section without full page reload, and the active nav link updates to amber highlight state

6. **Given** the page is loaded  
   **When** I view the main hero content area  
   **Then** I see: an amber eyebrow label, a bold display-size heading (Agun's name or headline), a professional tagline/bio paragraph, and at least one CTA button ("Get in Touch" navigating to `#contact`)

7. **Given** I click the "Download CV" button (in sidebar or mobile nav)  
   **When** the button is clicked  
   **Then** the browser downloads or opens `/cv.pdf` AND a `cv_download` tracking event is fired via `src/lib/analytics.ts`

8. **Given** JavaScript is disabled  
   **When** the page renders  
   **Then** all navigation anchors work natively, and the hero content is visible and meaningful (progressive enhancement)

9. **Given** I am on any viewport size  
   **When** I keyboard-navigate through the page  
   **Then** all interactive elements (nav links, buttons) are reachable via Tab with a visible amber focus ring (`focus-visible:ring-2 focus-visible:ring-amber-400`)

10. **Given** a screen reader user accesses the site  
    **When** they navigate  
    **Then** a skip-to-content link is the first focusable element, the sidebar/nav has `aria-label="Main navigation"`, and the active nav link has `aria-current="page"`

11. **Given** the user prefers reduced motion (`prefers-reduced-motion: reduce`)  
    **When** the page renders  
    **Then** the `animate-pulse` on the availability badge and all CSS transitions are disabled

## Tasks / Subtasks

- [x] Task 1: Install required shadcn/ui components (AC: 1–7)
  - [x] Run `npx shadcn@latest add button badge` — verify components appear in `src/components/ui/`
  - [x] Do NOT edit any files in `src/components/ui/` directly

- [x] Task 2: Create `src/types/index.ts` with shared type definitions (AC: 3, 5)
  - [x] Export `interface NavItem { label: string; href: string; }`
  - [x] Export `interface SiteConfig { name: string; title: string; availability: boolean; cvPath: string; }`

- [x] Task 3: Create `src/components/shared/AvailabilityBadge.tsx` (AC: 2, 11)
  - [x] Named export `AvailabilityBadge`
  - [x] Pulsing emerald dot (`animate-pulse`) + "Open to Work" text
  - [x] Styling: `bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-full px-3 py-1`
  - [x] Add `aria-label="Currently open to work opportunities"`
  - [x] Respect `prefers-reduced-motion` — disable `animate-pulse` via `motion-safe:animate-pulse`

- [x] Task 4: Create `src/components/shared/Sidebar.tsx` — desktop sidebar (AC: 3, 5, 7, 9, 10)
  - [x] Named export `Sidebar`
  - [x] Fixed 240px sidebar, `hidden lg:flex flex-col` (hidden on mobile)
  - [x] Logo/brand mark at top
  - [x] Profile block: circular avatar placeholder (slate-700 bg, 64×64), name "Agun Gunawan", title "Senior Frontend Developer", `<AvailabilityBadge />`
  - [x] Nav list: Overview · Projects · About · Contact — each `<a href="#section-id">` with `aria-current={isActive ? "page" : undefined}`
  - [x] Active nav link: `bg-amber-950/40 text-amber-400 font-semibold`
  - [x] Hover nav link: `hover:bg-slate-800 hover:text-slate-100`
  - [x] CV Download Button pinned to sidebar bottom: full-width, amber variant, `href="/cv.pdf"`, `download`, calls `trackEvent('cv_download')` on click
  - [x] `<nav aria-label="Main navigation">` landmark wrapping nav list
  - [x] Active link tracking: use IntersectionObserver to update active section as user scrolls

- [x] Task 5: Create mobile top navigation with hamburger menu (AC: 4, 5, 7, 9)
  - [x] Can be co-located in `Sidebar.tsx` OR a standalone `src/components/shared/MobileNav.tsx`
  - [x] `flex lg:hidden` fixed top bar, 64px height, `bg-slate-900/95 backdrop-blur-md border-b border-slate-800`
  - [x] Logo left, hamburger icon button right (`aria-label="Open menu"`, `aria-expanded` state)
  - [x] Mobile menu overlay: full-width, stacked nav links, CV download button included
  - [x] Close on nav link click or Escape key

- [x] Task 6: Create `src/components/sections/HeroSection.tsx` (AC: 1, 6, 8)
  - [x] Named export `HeroSection`
  - [x] Section `id="hero"` — matches anchor `#hero`
  - [x] Amber eyebrow label: "AVAILABLE FOR WORK" or "SENIOR FRONTEND DEVELOPER" (ALL CAPS, `text-xs tracking-widest font-bold text-amber-400`)
  - [x] Display heading (Plus Jakarta Sans, `text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground`): "Agun Gunawan" or a short headline
  - [x] Bio/tagline paragraph (`text-lg text-muted-foreground leading-relaxed max-w-prose`): "8+ years building fast, accessible web products with React, Next.js, and Webflow. Currently open to senior frontend roles."
  - [x] CTA buttons: primary Ghost "Get in Touch" → `#contact`; optional secondary link "View Projects" → `#portfolio`
  - [x] No JS required for the static content (progressive enhancement passes)

- [x] Task 7: Update `src/app/page.tsx` to use the sidebar layout (AC: 3, 4, 5)
  - [x] Import `Sidebar` (or `MobileNav`) and `HeroSection`
  - [x] Wrap page in a flex container: `<div className="flex min-h-screen">`
  - [x] Sidebar on left (desktop), top nav (mobile)
  - [x] Main content area: `<main id="main-content" className="flex-1 lg:ml-60 overflow-y-auto">` with sections
  - [x] Add skip-to-content link as FIRST element in DOM (before sidebar): `<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-amber-400 text-black px-4 py-2 rounded z-50 font-semibold">Skip to content</a>`
  - [x] Section placeholders retained: `#about`, `#portfolio`, `#contact` (will be built in 2.2–2.5)

- [x] Task 8: Create `src/lib/analytics.ts` stub (if not already present) (AC: 7)
  - [x] Check if file exists — if so, skip creation
  - [x] If missing: create with `export function trackEvent(name: string, params?: Record<string, unknown>): void { if (typeof window !== 'undefined' && typeof window.gtag === 'function') { window.gtag('event', name, params) } }`
  - [x] Add `gtag` type declaration: extend `Window` interface or use `@types/gtag.js`

- [x] Task 9: Build validation (AC: 1–11)
  - [x] Run `npm run lint` — exit code 0, zero warnings
  - [x] Run `npm run build` — exit code 0, `/out/` produced
  - [x] Verify `HeroSection` content is in `/out/index.html` source (not JS-only)
  - [ ] Keyboard tab through all interactive elements — confirm amber focus rings visible (requires browser — manual verification)
  - [ ] Toggle `prefers-reduced-motion` in DevTools — confirm pulse animation stops (requires browser — manual verification)

## Dev Notes

### Context: What Stories 1.1–1.4 Built

**Story 1.1** — Scaffolded project with `create-next-app@latest` + `npx shadcn@latest init`. `cn()` utility is in `src/lib/utils.ts`. shadcn UI primitives live in `src/components/ui/` — **do not edit these files**.

**Story 1.2** — Configured `output: 'export'` with `images: { unoptimized: true }` in `next.config.ts`. Fonts loaded: `Inter`, `Plus_Jakarta_Sans`, `JetBrains_Mono` via `next/font` in `layout.tsx` as CSS variables `--font-inter`, `--font-plus-jakarta-sans`, `--font-jetbrains-mono`. Dark theme is set as base styles in `globals.css` — **no `dark:` Tailwind variants are used anywhere**. `page.tsx` has four placeholder sections with `id` attributes: `#hero`, `#about`, `#portfolio`, `#contact`.

**Story 1.3** — Netlify CI/CD wired. `netlify.toml` builds with `npm run build` and publishes `/out/`. `NEXT_PUBLIC_GA_ID=G-PLACEHOLDER` in Netlify env.

**Story 1.4** — Full SEO metadata in `layout.tsx`: `metadataBase`, Open Graph, Twitter card, JSON-LD `Person` schema (injected in `<head>`). `/public/sitemap.xml`, `/public/robots.txt`, `/public/og-image.png` all exist.

**Current `src/app/page.tsx`:**

```tsx
export default function Home() {
  return (
    <main>
      <section id="hero" className="min-h-screen" />
      <section id="about" className="min-h-screen" />
      <section id="portfolio" className="min-h-screen" />
      <section id="contact" className="min-h-screen" />
    </main>
  );
}
```

This will be **replaced entirely** in Task 7.

**Current `src/app/layout.tsx`:** Returns `<html lang="en" className="dark">` with body carrying font CSS variable classes. The `className="dark"` on `<html>` is correct — shadcn/ui dark mode depends on this class. No `dark:` variants needed in components.

### Architecture Compliance Rules for This Story

#### ✅ REQUIRED — Will be checked

- **Named exports only** — `export function HeroSection`, `export function Sidebar`, `export function AvailabilityBadge`. No `export default` on any component.
- **No `dark:` Tailwind variants** — base styles ARE the dark theme. `text-foreground` / `bg-background` / `text-muted-foreground` not `dark:text-white`.
- **No hardcoded hex colors** — use CSS variable token classes (`text-foreground`, `bg-background`, etc.) or Tailwind's named slate/amber/emerald color palette. Never `text-[#f1f5f9]`.
- **Skip link required** — must be the very first focusable element in DOM output.
- **`next/image` for all photos** — the sidebar profile photo/avatar must use `<Image />` from `next/image` if a real image is used. For placeholder, a `<div>` with bg-slate-700 is acceptable.
- **CV link always `/cv.pdf`** — never dynamic, never external.
- **`trackEvent` via `src/lib/analytics.ts`** — never call `window.gtag()` directly in the component.

#### ❌ FORBIDDEN — Anti-patterns

- `export default` on any component
- `dark:` Tailwind variants anywhere
- Raw `<img>` tag (use `next/image` `<Image />`)
- Hardcoded hex colors in className (`text-[#f59e0b]`)
- Separate `__tests__/` directory (tests must be co-located as `*.test.tsx`)
- Editing any file in `src/components/ui/`

### Key File Locations

| File                                          | Status                        | Note                                         |
| --------------------------------------------- | ----------------------------- | -------------------------------------------- |
| `src/app/page.tsx`                            | EXISTS — will be REPLACED     | Currently has 4 empty placeholder sections   |
| `src/app/layout.tsx`                          | EXISTS — DO NOT EDIT metadata | Only add skip link via `page.tsx` DOM        |
| `src/components/ui/button.tsx`                | May exist (shadcn)            | Run `npx shadcn@latest add button` to ensure |
| `src/components/ui/badge.tsx`                 | May exist (shadcn)            | Run `npx shadcn@latest add badge` to ensure  |
| `src/components/shared/Sidebar.tsx`           | DOES NOT EXIST — CREATE       | Desktop fixed sidebar                        |
| `src/components/shared/AvailabilityBadge.tsx` | DOES NOT EXIST — CREATE       | Pulsing green badge                          |
| `src/components/sections/HeroSection.tsx`     | DOES NOT EXIST — CREATE       | Main hero content                            |
| `src/lib/analytics.ts`                        | DOES NOT EXIST — CREATE       | GA4 event helper                             |
| `src/types/index.ts`                          | DOES NOT EXIST — CREATE       | Shared TypeScript types                      |
| `public/cv.pdf`                               | MUST EXIST                    | Placeholder PDF if not yet present           |

### UX Specification — Sidebar Layout (Direction 4)

The chosen UX direction is **Sidebar Navigation (Direction 4)** — not a standard top nav. The 240px left sidebar is the primary navigation surface on desktop.

**Sidebar anatomy (desktop ≥1024px):**

```
┌─────────────────────────────┐
│  [Logo]                     │  ← brand mark top-left
│                             │
│  ○ [Profile Photo]          │  ← 64×64, circular, amber ring
│  Agun Gunawan               │  ← text-slate-100 font-semibold
│  Senior Frontend Developer  │  ← text-slate-400 text-sm
│  ● Open to Work             │  ← AvailabilityBadge (emerald, pulsing)
│                             │
│  · Overview                 │  ← scrolls to #hero
│  · Projects                 │  ← scrolls to #portfolio
│  · About                    │  ← scrolls to #about
│  · Contact                  │  ← scrolls to #contact
│                             │
│  [Download CV ↓]            │  ← full-width amber button, bottom-pinned
└─────────────────────────────┘
```

**Mobile top bar anatomy (<1024px):**

```
┌─────────────────────────────────────────┐
│  [Logo]                     [≡ Menu]    │  ← 64px fixed top bar
└─────────────────────────────────────────┘
```

Hamburger opens full-viewport overlay with stacked nav links + Download CV button.

### Color Token Reference — This Story

| Usage                            | Tailwind class                                      | Token / Hex           |
| -------------------------------- | --------------------------------------------------- | --------------------- |
| Page background                  | `bg-background`                                     | `#0f172a` (slate-950) |
| Sidebar/card surface             | `bg-slate-800`                                      | `#1e293b`             |
| Surface hover                    | `bg-slate-700`                                      | `#334155`             |
| Primary text                     | `text-foreground`                                   | `#f1f5f9` (slate-100) |
| Secondary text                   | `text-muted-foreground`                             | `#94a3b8` (slate-400) |
| Amber accent (CTAs, active link) | `text-amber-400`                                    | `#f59e0b`             |
| Amber hover                      | `hover:text-amber-300`                              | `#d97706`             |
| Amber CTA button bg              | `bg-amber-400 text-black`                           | Primary button        |
| Nav active bg tint               | `bg-amber-950/40`                                   | amber tint            |
| Availability dot/text            | `text-emerald-400`                                  | `#10b981`             |
| Availability badge bg            | `bg-emerald-950/40 border-emerald-500/30`           | emerald tint          |
| Focus ring                       | `focus-visible:ring-2 focus-visible:ring-amber-400` | WCAG AA+              |

### Typography Classes — This Story

| Usage                 | Classes                                                                                               |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| Hero display heading  | `font-[family-name:var(--font-plus-jakarta-sans)] text-5xl lg:text-6xl font-extrabold tracking-tight` |
| Section eyebrow label | `text-xs tracking-widest font-bold text-amber-400 uppercase`                                          |
| Sidebar name          | `text-base font-semibold text-foreground`                                                             |
| Sidebar title         | `text-sm text-muted-foreground`                                                                       |
| Nav links             | `text-sm font-medium`                                                                                 |
| Bio/tagline           | `text-lg text-muted-foreground leading-relaxed max-w-prose`                                           |

### Component Export Pattern — Use This Exactly

```tsx
// src/components/shared/AvailabilityBadge.tsx
export function AvailabilityBadge() { ... }

// src/components/shared/Sidebar.tsx
export function Sidebar() { ... }

// src/components/sections/HeroSection.tsx
export function HeroSection() { ... }
```

No `export default` on any component — this is enforced project-wide.

### Sidebar Active Link — IntersectionObserver Pattern

Use `IntersectionObserver` to track which section is currently in view and update the active nav link. This is a `'use client'` concern — the sidebar will be a Client Component.

```tsx
"use client";
// In Sidebar.tsx
import { useEffect, useState } from "react";

const sectionIds = ["hero", "about", "portfolio", "contact"];

export function Sidebar() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -60% 0px" },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  // ...nav links use activeSection to set aria-current and active classes
}
```

### CV Download Button Implementation

```tsx
import { trackEvent } from "@/lib/analytics";

// Inside sidebar/mobile nav
<a
  href="/cv.pdf"
  download
  onClick={() => trackEvent("cv_download", { method: "button_click" })}
  className="w-full inline-flex items-center justify-center bg-amber-400 text-black font-bold 
             hover:bg-amber-500 px-5 py-2.5 rounded-lg transition-colors duration-150
             focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 
             focus-visible:ring-offset-slate-950"
>
  Download CV
</a>;
```

Always `/cv.pdf` — never dynamic. Uses `<a>` not `<button>` because it triggers a file download/navigation.

### `src/lib/analytics.ts` — Exact Implementation

```ts
// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}
```

### Progressive Enhancement — Critical

The sidebar and hero content must render in the static HTML output. The `Sidebar` Client Component renders as static HTML in SSG — IntersectionObserver only activates on the client after hydration, which is acceptable. Navigation anchors work without JS. The hero content is plain semantic HTML.

Verify after `npm run build`:

```bash
grep -l "Agun Gunawan" out/index.html
grep -l "id=\"hero\"" out/index.html
grep -l "Open to Work" out/index.html
```

All three must return the file (content is in static HTML, not JS-only).

### Layout Structure — `page.tsx` After This Story

```tsx
// src/app/page.tsx
import { Sidebar } from "@/components/shared/Sidebar";
import { HeroSection } from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                   bg-amber-400 text-black px-4 py-2 rounded z-50 font-semibold"
      >
        Skip to content
      </a>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main id="main-content" className="flex-1 lg:ml-60 min-w-0">
          <HeroSection />
          <section id="about" className="min-h-screen py-20 px-6 lg:px-12" />
          <section
            id="portfolio"
            className="min-h-screen py-20 px-6 lg:px-12"
          />
          <section id="contact" className="min-h-screen py-20 px-6 lg:px-12" />
        </main>
      </div>
    </>
  );
}
```

Subsequent stories (2.2–2.5) will replace those placeholder sections with real components.

### Smooth Scroll — Single Line Config

Add to `globals.css` (base layer, already exists):

```css
html {
  scroll-behavior: smooth;
}
```

This enables smooth scrolling to all anchor targets natively without JS. Respects `prefers-reduced-motion` when combined with:

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

### `src/types/index.ts` — Exact Shape

```ts
export interface NavItem {
  label: string;
  href: string;
  sectionId: string; // e.g. 'hero', 'about', 'portfolio', 'contact'
}

export interface SiteConfig {
  name: string;
  title: string;
  availability: boolean;
  cvPath: string;
}
```

### Testing Notes

Tests are co-located, not in a separate `__tests__/` directory:

- `src/components/shared/AvailabilityBadge.test.tsx` (if writing tests this story)
- `src/components/shared/Sidebar.test.tsx`
- `src/components/sections/HeroSection.test.tsx`

Minimum test for this story: smoke render test confirming components mount without error. Full test coverage deferred to Story 3.2 (cross-browser + accessibility audit).

### Project Structure Additions This Story

```
src/
├── app/
│   └── page.tsx              ← REPLACE with sidebar layout + HeroSection
├── components/
│   ├── sections/
│   │   └── HeroSection.tsx   ← CREATE (FR4–7)
│   └── shared/
│       ├── Sidebar.tsx       ← CREATE (FR1, FR3, FR5, FR12)
│       └── AvailabilityBadge.tsx ← CREATE (FR5)
├── lib/
│   └── analytics.ts          ← CREATE (FR24 stub — GA4 ready for Epic 3)
└── types/
    └── index.ts              ← CREATE (NavItem, SiteConfig)
```

### References

- Acceptance criteria source: [epics.md — Story 2.1](../_bmad-output/planning-artifacts/epics.md)
- FR coverage: FR1, FR4, FR5, FR7, FR12 [Source: planning-artifacts/epics.md#FR-Coverage-Map]
- UX Direction 4 — Sidebar Layout: [Source: planning-artifacts/ux-design-specification.md#Chosen-Direction]
- Component anatomy (Sidebar, AvailabilityBadge): [Source: planning-artifacts/ux-design-specification.md#Component-Strategy]
- Color system: [Source: planning-artifacts/ux-design-specification.md#Color-System]
- Typography system: [Source: planning-artifacts/ux-design-specification.md#Typography-System]
- Architecture naming + export rules: [Source: planning-artifacts/architecture.md#Naming-Patterns]
- Architecture directory structure: [Source: planning-artifacts/architecture.md#Complete-Project-Directory-Structure]
- Anti-patterns list: [Source: planning-artifacts/architecture.md#Enforcement-Guidelines]
- CV download pattern: [Source: planning-artifacts/architecture.md#CV-Download]
- Progressive enhancement requirement: [Source: planning-artifacts/architecture.md#Progressive-Enhancement]
- Mobile/responsive breakpoints: [Source: planning-artifacts/ux-design-specification.md#Breakpoint-Strategy]
- Accessibility requirements: [Source: planning-artifacts/ux-design-specification.md#Accessibility-Strategy]
- Navigation patterns: [Source: planning-artifacts/ux-design-specification.md#Navigation-Patterns]
- Previous story 1.4 dev notes: [Source: implementation-artifacts/1-4-seo-foundation-meta-tags-og-json-ld-sitemap.md#Dev-Notes]

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6 (GitHub Copilot)

### Debug Log References

- Tailwind v4 lint: `font-[family-name:var(--font-plus-jakarta-sans)]` → `font-(family-name:--font-plus-jakarta-sans)` (new v4 arbitrary property syntax)
- shadcn badge install: CLI buffered output; verified via file check after command completion
- cv.pdf: Python not available on host; used Node.js to create placeholder PDF

### Completion Notes List

- ✅ Task 1: `badge.tsx` installed via `npx shadcn@latest add badge`; `button.tsx` already present
- ✅ Task 2: `src/types/index.ts` with `NavItem` (added `sectionId` field per dev notes) and `SiteConfig`
- ✅ Task 3: `AvailabilityBadge` — `motion-safe:animate-pulse` respects `prefers-reduced-motion` natively
- ✅ Task 4+5: `Sidebar.tsx` — desktop fixed 240px + mobile full-screen overlay; co-located as single file; IntersectionObserver active section tracking; Escape-key close
- ✅ Task 6: `HeroSection.tsx` — static semantic HTML, `font-(family-name:--font-plus-jakarta-sans)` Tailwind v4 syntax
- ✅ Task 7: `page.tsx` replaced with skip-link + `<Sidebar />` + `<main>` wrapper; placeholder sections retained
- ✅ Task 8: `src/lib/analytics.ts` with Window.gtag type extension
- ✅ Task 9: `npm run lint` → exit 0; `npm run build` → exit 0; all three static HTML grep checks pass
- ⚠️ No test framework installed (no jest/vitest in package.json); per story Testing Notes: full test coverage deferred to Story 3.2
- ⚠️ Browser-only validations (keyboard tab focus rings, prefers-reduced-motion DevTools toggle) documented as manual verification required

### File List

**Created:**

- `src/types/index.ts`
- `src/components/shared/AvailabilityBadge.tsx`
- `src/components/shared/Sidebar.tsx`
- `src/components/sections/HeroSection.tsx`
- `src/lib/analytics.ts`
- `public/cv.pdf` (placeholder)

**Modified:**

- `src/app/page.tsx` (replaced with sidebar layout; CR: added `pt-16 lg:pt-0` to `<main>` for mobile header clearance)
- `src/app/globals.css` (added smooth scroll + reduced-motion override)
- `src/components/shared/Sidebar.tsx` (CR: body scroll lock, focus management, ARIA dialog, motion-safe transitions)
- `src/components/sections/HeroSection.tsx` (CR: motion-safe transitions on CTA buttons)

**Installed (shadcn CLI):**

- `src/components/ui/badge.tsx`

## Senior Developer Review (AI)

**Date:** 2026-03-04
**Reviewer:** GitHub Copilot (Claude Sonnet 4.6)
**Outcome:** Changes Requested → Fixed → ✅ Approved

### Action Items

- [x] [High] AC11 not fully satisfied: `transition-colors duration-150` on nav links, CTA buttons, and CV download fired under `prefers-reduced-motion` — replaced with `motion-safe:transition-colors motion-safe:duration-150` across `Sidebar.tsx` and `HeroSection.tsx`
- [x] [High] Mobile overlay missing focus management: added `useRef` + `closeButtonRef.current?.focus()` on open; `role="dialog"` + `aria-modal="true"` + `aria-label="Navigation menu"` added to overlay div
- [x] [Med] Body scroll not locked when mobile overlay open: added `document.body.style.overflow = "hidden"` / reset in `useEffect` cleanup in `Sidebar.tsx`
- [x] [Med] Hero content collided with fixed 64px mobile header: added `pt-16 lg:pt-0` to `<main>` in `page.tsx`
- [x] [Med] Mobile overlay missing ARIA dialog semantics: fixed as part of H2 action above
- [ ] [Low] `SiteConfig` interface exported but unused — reserved for future content data layer (Story 2.2+), no action required
- [ ] [Low] `_bmad-output/` and story file untracked in git — by design (output folder gitignore strategy), no action required
