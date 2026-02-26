---
stepsCompleted: [step-01-validate-prerequisites]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
---

# bmad-1 - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for **bmad-1** (Agun Gunawan's personal portfolio website), decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

---

## Requirements Inventory

### Functional Requirements

**Visitor Navigation & Discoverability**

- FR1: Visitor can navigate between site sections via anchor-based links without full page reloads
- FR2: Visitor can land on the site from an external search engine result
- FR3: Visitor can share the site URL and have it render a meaningful preview (title, description, image) on LinkedIn, Slack, and other platforms

**Professional Profile & Availability**

- FR4: Visitor can immediately identify Agun's name, professional title, and core value proposition upon landing
- FR5: Visitor can see Agun's current work availability status displayed in the hero section above the fold on all viewport sizes
- FR6: Visitor can read Agun's professional background, years of experience, and core tech stack
- FR7: Visitor can navigate to key site sections (portfolio, CV download, contact) via CTA buttons from the hero section

**Portfolio Showcase**

- FR8: Visitor can browse a curated set of portfolio project cards
- FR9: Visitor can see each project's title, thumbnail image, and tech stack used on its card
- FR10: Visitor can access a live deployment link for a project where one exists
- FR11: Visitor can access a GitHub repository link for a project where one exists

**CV Access**

- FR12: Visitor can download Agun's CV as a PDF file via a download button visible above the fold or within the first scroll on all viewport sizes
- FR13: The CV download link remains stable and unchanged when the PDF file is updated
- FR14: Agun can replace the CV PDF and have all existing download links immediately serve the new version

**Contact & Inquiry**

- FR15: Visitor can submit an inquiry via a contact form providing their name, email address, subject, and message
- FR16: Visitor receives an on-page confirmation message after successfully submitting the contact form
- FR17: Agun receives an email notification to his personal inbox for each contact form submission
- FR18: Agun can update the recipient email address for form notifications without code changes

**SEO & Search Discoverability**

- FR19: Each page renders a `<title>` tag (≤60 characters) and `<meta description>` (≤160 characters), each containing at least one target search keyword
- FR20: The site includes Open Graph metadata enabling rich link previews on social and messaging platforms
- FR21: The site includes JSON-LD structured data identifying Agun as a Person with job title and skills
- FR22: A `sitemap.xml` and `robots.txt` are publicly accessible at the site root

**Analytics & Tracking**

- FR23: Agun can view page visit count data for the site
- FR24: Agun can track CV download button click events as a distinct measurable metric
- FR25: Analytics data collection does not block or degrade page load for visitors

**Site Owner Content Management**

- FR26: Agun can add a new project card to the portfolio section
- FR27: Agun can update an existing project card's content (title, thumbnail, stack, links)
- FR28: Agun can view a log of all contact form submissions via the Netlify dashboard as a backup to email

**Footer & Social Links**

- FR29: Visitor can access Agun's LinkedIn profile via a footer link
- FR30: Visitor can contact Agun via email using a footer email link
- FR31: Visitor can see copyright information in the footer

---

### Non-Functional Requirements

**Performance**

- NFR1: Initial page load (First Contentful Paint) completes within 2 seconds on standard broadband
- NFR2: Largest Contentful Paint (LCP) completes within 2.5 seconds — meets Google Core Web Vitals "Good" threshold
- NFR3: All images served in optimised formats (WebP with JPEG/PNG fallback); do not block page rendering
- NFR4: Analytics and tracking scripts loaded asynchronously; do not contribute to LCP or blocking time
- NFR5: Lighthouse Performance score of 90+ desktop / 80+ mobile at launch

**Security**

- NFR6: All traffic served over HTTPS — enforced by Netlify at CDN level, no plain HTTP fallback
- NFR7: Contact form does not expose Agun's personal email address in page source or client-side code
- NFR8: Netlify Forms spam filtering enabled to prevent bot submissions reaching the inbox
- NFR9: No third-party scripts loaded from untrusted sources

**Accessibility**

- NFR10: All images include descriptive `alt` text
- NFR11: Colour contrast ratios meet WCAG 2.1 AA minimum (4.5:1 for normal text, 3:1 for large text)
- NFR12: All interactive elements are keyboard-navigable with visible focus states
- NFR13: Form inputs have associated `<label>` elements for screen reader compatibility
- NFR14: Site renders and is fully usable without JavaScript (progressive enhancement baseline)

**Integration**

- NFR15: Netlify Forms delivers 100% of non-spam submissions to configured email within 5 minutes
- NFR16: If analytics provider experiences an outage, site functionality and page load are unaffected
- NFR17: CV download link resolves correctly within 1 second — served from Netlify CDN

---

### Additional Requirements

**From Architecture — Critical Implementation Details:**

- **Starter Template (Epic 1, Story 1):** Architecture mandates `create-next-app@latest` + `shadcn/ui init` as the initialization path. This MUST be the first implementation story.
  - `npx create-next-app@latest bmad-1 --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack`
  - `npx shadcn@latest init`
- **Static Export:** `next.config.ts` must configure `output: 'export'` — this constrains: no Server Actions, no API routes, no middleware
- **Dark-mode-only design:** No `dark:` Tailwind variants — base styles ARE the dark theme. Use CSS variable-backed token classes only (`text-foreground`, `bg-background`, etc.)
- **Named exports only:** No default exports on any component
- **Component structure:** Section components in `src/components/sections/`; UI primitives from shadcn/ui in `src/components/ui/` (never edit shadcn files)
- **TypeScript data files:** Project data lives in `src/data/projects.ts` (typed, no CMS/DB)
- **Analytics abstraction:** All GA4 events via `src/lib/analytics.ts` — never call `gtag()` directly in components
- **Contact form — CRITICAL:** Must be server-rendered (not behind JS-conditional), must include `data-netlify="true"`, must have HTML `action` fallback for progressive enhancement
- **Image rule:** Always `next/image` for content images — never raw `<img>` tag
- **CV link:** Always link to `/cv.pdf` — never dynamic path, never external URL
- **Tests:** Co-located `*.test.tsx` next to components — no separate `__tests__` directory

**From UX Specification:**

- Dark-themed single-page design with anchor navigation (`#hero`, `#about`, `#portfolio`, `#contact`)
- Mobile-first responsive layout; all sections must be functional and visually polished on mobile
- Availability badge visible in hero above the fold on all viewport sizes
- CV download CTA accessible without scrolling below the fold
- Portfolio section: grid of project cards with thumbnail, title, stack badges, live/GitHub links
- Contact form with in-page success confirmation (no redirect)
- Inter + Plus Jakarta Sans + JetBrains Mono fonts via `next/font`
- shadcn/ui components for all interactive UI primitives (Button, Input, Textarea, Label, Badge, Card)

---

### FR Coverage Map

| FR   | Story                           |
| ---- | ------------------------------- |
| FR1  | 2.1 (navigation)                |
| FR2  | 1.4 (SEO/meta)                  |
| FR3  | 1.4 (OG tags)                   |
| FR4  | 2.1 (hero section)              |
| FR5  | 2.1 (availability badge)        |
| FR6  | 2.2 (about section)             |
| FR7  | 2.1 (hero CTAs)                 |
| FR8  | 2.3 (portfolio section)         |
| FR9  | 2.3 (project cards)             |
| FR10 | 2.3 (live links)                |
| FR11 | 2.3 (GitHub links)              |
| FR12 | 2.1 + 2.4 (CV download CTA)     |
| FR13 | 2.4 (stable CV URL)             |
| FR14 | 2.4 (file replacement workflow) |
| FR15 | 2.5 (contact form)              |
| FR16 | 2.5 (on-page confirmation)      |
| FR17 | 2.5 (Netlify Forms email)       |
| FR18 | 2.5 (Netlify dashboard config)  |
| FR19 | 1.4 (meta tags)                 |
| FR20 | 1.4 (OG metadata)               |
| FR21 | 1.4 (JSON-LD)                   |
| FR22 | 1.4 (sitemap/robots)            |
| FR23 | 3.1 (GA4 setup)                 |
| FR24 | 3.1 (CV download event)         |
| FR25 | 3.1 (async script loading)      |
| FR26 | 2.3 (data file update)          |
| FR27 | 2.3 (data file update)          |
| FR28 | 2.5 (Netlify dashboard)         |
| FR29 | 2.6 (footer links)              |
| FR30 | 2.6 (footer email)              |
| FR31 | 2.6 (copyright)                 |

---

## Epic List

1. **Epic 1: Project Foundation & Infrastructure** — Scaffold the Next.js project, configure the tech stack, set up deployment pipeline to Netlify, and establish the SEO/metadata foundation.
2. **Epic 2: Core Portfolio UI Sections** — Build all visible portfolio sections (Hero, About, Portfolio, CV Download, Contact Form, Footer) fully polished and responsive.
3. **Epic 3: Analytics, Tracking & Final QA** — Integrate GA4 analytics, verify all tracking events, perform cross-browser and Lighthouse QA, and prepare for launch.

---

## Epic 1: Project Foundation & Infrastructure

**Goal:** Establish a fully working Next.js SSG project scaffold, configure all tooling, deploy to Netlify with CI/CD, and set up the global SEO and metadata layer. This epic creates the foundation that all UI epics build upon.

### Story 1.1: Initialize Next.js Project with shadcn/ui

As a developer,
I want to scaffold the project using the official Next.js + shadcn/ui initialization commands,
So that the tech stack, folder structure, Tailwind CSS, TypeScript, and ESLint are all correctly configured from day one.

**Acceptance Criteria:**

**Given** I am in the project directory
**When** I run `npx create-next-app@latest bmad-1 --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack` followed by `npx shadcn@latest init`
**Then** the project builds successfully with `next build` producing no errors
**And** `src/app/layout.tsx` and `src/app/page.tsx` exist with App Router structure
**And** `src/components/ui/` contains shadcn base components
**And** `globals.css` includes CSS variable design tokens
**And** `cn()` utility is available in `src/lib/utils.ts`
**And** TypeScript, Tailwind CSS, and ESLint are all configured and passing

---

### Story 1.2: Configure Static Export, Global Layout & Fonts

As a developer,
I want to configure `output: 'export'` in Next.js, set up the root layout with global fonts and dark theme CSS variables, and establish the single-page structure,
So that the site generates as fully static HTML and all pages share consistent typography and theming.

**Acceptance Criteria:**

**Given** the project is scaffolded
**When** `next build` is run
**Then** the `/out/` directory is produced with fully static HTML — no server runtime required
**And** `next.config.ts` has `output: 'export'` configured
**And** Inter, Plus Jakarta Sans, and JetBrains Mono are loaded via `next/font` in `src/app/layout.tsx` with zero layout shift
**And** `globals.css` defines the dark theme as base styles (no `dark:` Tailwind variants; base styles ARE the dark theme)
**And** the single-page `src/app/page.tsx` exists with section placeholder structure (`#hero`, `#about`, `#portfolio`, `#contact`)
**And** no Server Actions, no API routes, no middleware exist in the project

---

### Story 1.3: Configure Netlify Deployment & CI/CD

As a developer,
I want to connect the project to Netlify with auto-deploy on push to `main`,
So that every merge to main triggers an automatic production deployment with no manual steps.

**Acceptance Criteria:**

**Given** the repository is connected to Netlify
**When** a commit is pushed to the `main` branch
**Then** Netlify automatically triggers a build and deploys the `/out/` directory
**And** the site is accessible at a public Netlify URL (or custom domain)
**And** HTTPS is enforced at the CDN level with no plain HTTP fallback
**And** `NEXT_PUBLIC_GA_ID` environment variable is configured in the Netlify dashboard (value can be placeholder until GA4 setup in Epic 3)
**And** the Netlify Forms integration is active (Netlify detects the contact form from the static HTML build)

---

### Story 1.4: SEO Foundation — Meta Tags, OG, JSON-LD, Sitemap

As a developer,
I want to add complete SEO metadata (title, meta description, Open Graph tags, JSON-LD Person schema, sitemap.xml, robots.txt),
So that Agun's site is discoverable via search engines and renders rich link previews on LinkedIn and Slack.

**Acceptance Criteria:**

**Given** the site is deployed to Netlify
**When** a search engine or social platform crawls the site
**Then** each page has a `<title>` tag (≤60 characters) and `<meta description>` (≤160 characters) containing target keywords (e.g., "senior react developer", "webflow")
**And** Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`) are present in `<head>`
**And** `/public/og-image.png` exists as a 1200×630px static asset
**And** JSON-LD Person schema is present identifying Agun with name, job title, and skills
**And** `/public/sitemap.xml` and `/public/robots.txt` are accessible at the root URL
**And** pasting the site URL into LinkedIn or Slack renders a rich link preview with title, description, and image

---

## Epic 2: Core Portfolio UI Sections

**Goal:** Build all user-facing portfolio sections — Hero, About, Portfolio, CV Download, Contact Form, and Footer — fully polished, mobile-first responsive, accessible, and connected to real content.

### Story 2.1: Hero Section with Navigation

As a visitor,
I want to see a compelling hero section with Agun's name, title, availability status, CTAs, and anchor navigation,
So that I can immediately assess his seniority and take action (download CV, view portfolio, contact) without scrolling.

**Acceptance Criteria:**

**Given** I land on the site
**When** the page loads on any viewport (mobile, tablet, desktop)
**Then** I see Agun's name, professional title ("Senior Frontend Developer"), and core value proposition above the fold
**And** a visible availability badge ("Open to Work" or similar) is displayed in the hero section
**And** at least two CTA buttons are present — "Download CV" and "Contact Me" (or equivalent) — navigating to `#contact` and triggering CV download respectively
**And** an anchor-based navigation header/navbar is present with links to `#about`, `#portfolio`, `#contact`
**And** clicking a nav link scrolls smoothly to the target section without full page reload
**And** the layout is fully responsive and visually polished on mobile-first breakpoints
**And** the section renders correctly without JavaScript (progressive enhancement)

---

### Story 2.2: About Section

As a visitor,
I want to read a concise, professional About section describing Agun's background, experience, and core stack,
So that I can evaluate whether his skills and experience match my hiring needs.

**Acceptance Criteria:**

**Given** I scroll to or navigate to `#about`
**When** the section loads
**Then** Agun's professional background and ~8 years of experience are communicated clearly
**And** his core tech stack (React JS, Next.js, Webflow, HTML, CSS, JavaScript, TypeScript) is visible
**And** the section tone is human and professional — not a resume wall
**And** content is stored in a TypeScript data file (e.g., `src/data/about.ts`) — not hardcoded in the component
**And** the section is fully responsive and visually consistent with the overall dark theme
**And** all text meets WCAG 2.1 AA contrast ratios (minimum 4.5:1 for normal text)

---

### Story 2.3: Portfolio Section with Project Cards

As a visitor,
I want to browse a grid of portfolio project cards showing each project's title, thumbnail, stack, and action links,
So that I can evaluate Agun's work quality and find projects relevant to my technical needs.

**Acceptance Criteria:**

**Given** I scroll to or navigate to `#portfolio`
**When** the section loads
**Then** a grid of at least 4 project cards is displayed (up to 6 at MVP)
**And** each card shows: project thumbnail image (via `next/image`), title, one-line problem statement, tech stack badges
**And** each card that has a live URL shows a "Live" link/button navigating to the deployed project
**And** each card that has a GitHub URL shows a "GitHub" link/button navigating to the repository
**And** all project data is sourced from `src/data/projects.ts` (typed `Project[]` array)
**And** thumbnails are in `/public/images/projects/` as `.webp` files
**And** the grid is responsive: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
**And** all images have descriptive `alt` text

---

### Story 2.4: CV Download Integration

As a visitor,
I want to download Agun's CV via a prominent, always-accessible download button,
So that I can review his full work history and forward it to relevant decision-makers.

**Acceptance Criteria:**

**Given** I am on any part of the page
**When** I click the CV download button (in hero or a sticky/prominent location)
**Then** the browser downloads or opens `/cv.pdf` — a stable, CDN-served PDF
**And** the download link is always `/cv.pdf` — never a dynamic or external URL
**And** when Agun replaces the file at `/public/cv.pdf`, all existing download buttons immediately serve the new version without any URL change
**And** the download button is accessible via keyboard navigation with a visible focus state
**And** clicking the CV download button fires a `cv_download` tracking event via `src/lib/analytics.ts`

---

### Story 2.5: Contact Form with Netlify Forms

As a visitor,
I want to submit an inquiry via a contact form,
So that I can reach out to Agun directly without needing to find his personal email address.

**Acceptance Criteria:**

**Given** I navigate to `#contact`
**When** I fill in name, email, subject, and message fields and submit the form
**Then** I see an in-page confirmation message (no page redirect) confirming my submission was received
**And** Agun receives an email notification at his personal inbox within 5 minutes
**And** the form uses `data-netlify="true"` and includes a hidden `form-name` input field so Netlify detects it at deploy time
**And** the form submits natively (HTML `action` fallback) when JavaScript is disabled
**And** Agun's personal email address is not present anywhere in page source or client-side code
**And** all form fields have associated `<label>` elements for screen reader compatibility
**And** all form inputs are keyboard-navigable with visible focus states
**And** Netlify Forms spam filtering (Honeypot) is enabled
**And** Agun can view all form submissions in the Netlify Forms dashboard as a backup to email

---

### Story 2.6: Footer with Social Links

As a visitor,
I want to see a site footer with LinkedIn, email links, and copyright information,
So that I have multiple ways to connect with Agun and can verify the site's credibility.

**Acceptance Criteria:**

**Given** I scroll to the bottom of the page
**When** the footer renders
**Then** a LinkedIn profile link is visible and navigates to Agun's LinkedIn profile
**And** an email link is present (using `mailto:` — does not expose raw email in visible text unless intentional)
**And** copyright information is displayed with the current year
**And** all footer links are keyboard-navigable with visible focus states
**And** the footer is responsive and visually consistent with the overall dark theme

---

## Epic 3: Analytics, Tracking & Final QA

**Goal:** Integrate Google Analytics 4, verify all tracking events, perform full cross-browser and Lighthouse QA, and confirm the site meets all launch criteria.

### Story 3.1: Google Analytics 4 Integration

As the site owner,
I want GA4 tracking active on the live site with page views and CV download events recorded,
So that I can measure visitor traffic and conversion from day one of launch.

**Acceptance Criteria:**

**Given** the site is deployed to Netlify with `NEXT_PUBLIC_GA_ID` set
**When** a visitor loads the page
**Then** the GA4 script loads via `<Script strategy="afterInteractive">` in Next.js — it does not affect LCP or block rendering
**And** page view events are recorded in the GA4 dashboard
**And** `src/lib/analytics.ts` exports a `trackEvent()` function used for all custom events — `gtag()` is never called directly in components
**And** clicking the CV download button fires a `cv_download` event visible in GA4 real-time reports
**And** if GA4 is unavailable, the rest of the site is fully functional and unaffected

---

### Story 3.2: Cross-Browser Testing & Accessibility Audit

As the site owner,
I want the site verified across all target browsers and accessibility standards,
So that every potential employer or client gets a consistent, professional experience regardless of their browser or assistive technology.

**Acceptance Criteria:**

**Given** the site is deployed
**When** tested across Chrome, Firefox, Safari, and Edge (latest 2 versions each) on desktop and mobile
**Then** all sections render correctly with no visual regressions
**And** all interactive elements (nav links, buttons, form, CV download) function correctly in all target browsers
**And** iOS Safari and Android Chrome mobile layouts pass visual inspection
**And** keyboard-only navigation works for all interactive elements with visible focus states
**And** all images have descriptive `alt` text
**And** WCAG 2.1 AA colour contrast requirements are met (verified via browser devtools or axe)
**And** the contact form submits correctly and triggers email notification in all target browsers

---

### Story 3.3: Lighthouse Performance Audit & Optimisation

As the site owner,
I want the site to achieve Lighthouse Performance scores of 90+ desktop / 80+ mobile,
So that the site meets the technical success criteria and performs well for all visitors.

**Acceptance Criteria:**

**Given** the site is deployed to Netlify production
**When** a Lighthouse audit is run in Chrome DevTools on the production URL
**Then** Performance score is 90+ on desktop
**And** Performance score is 80+ on mobile
**And** LCP is ≤ 2.5 seconds
**And** FCP is ≤ 2 seconds
**And** all project thumbnail images are served as WebP with correct sizing via `next/image`
**And** fonts are loaded via `next/font` with no layout shift
**And** analytics script does not contribute to LCP or blocking time
**And** if any score falls below target, identified optimisations are implemented and re-audited
