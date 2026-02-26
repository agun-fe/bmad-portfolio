---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
lastStep: 8
status: 'complete'
completedAt: '2026-02-25'
inputDocuments:
  - _bmad-output/planning-artifacts/product-brief-bmad-1-2026-02-25.md
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/prd-validation-report.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
workflowType: 'architecture'
project_name: 'bmad-1'
user_name: 'Agun Gunawan'
date: '2026-02-25'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**

31 FRs across 9 categories: Visitor Navigation & Discoverability (FR1–FR3), Professional Profile & Availability (FR4–FR7), Portfolio Showcase (FR8–FR11), CV Access (FR12–FR14), Contact & Inquiry (FR15–FR18), SEO & Search Discoverability (FR19–FR22), Analytics & Tracking (FR23–FR25), Site Owner Content Management (FR26–FR28), Footer & Social Links (FR29–FR31).

Architecturally, the FRs resolve to: a statically generated single-page site with anchor navigation, a portfolio card grid, a stable-URL CV PDF download, a server-side-handled contact form (Netlify Forms), SEO metadata, async analytics, and a simple file-based content update workflow. No server runtime, no database, no authentication required.

**Non-Functional Requirements:**

| NFR | Architectural Driver |
|---|---|
| Lighthouse 90+/80+ | SSG mandatory; image optimization (WebP); async analytics loading |
| Progressive enhancement (NFR14) | Site functional without JavaScript — SSG output must be semantic HTML-first |
| HTTPS enforced | Netlify CDN — zero configuration required |
| Email never in source (NFR7) | Netlify Forms — recipient configured server-side in Netlify dashboard |
| Spam filtering (NFR8) | `netlify` attribute on form enables built-in Honeypot + Akismet |
| CV download <1s (NFR17) | PDF served from Netlify CDN via `/public/` — no external storage |
| Analytics doesn't block render (NFR4, NFR25) | Script loaded `async` or via `<Script strategy="afterInteractive">` in Next.js |

**Scale & Complexity:**

- Primary domain: Static Web / SPA (Next.js SSG)
- Complexity level: Low
- Estimated architectural components: 6 page sections + contact form + analytics integration + SEO metadata layer
- No real-time features, no multi-tenancy, no regulatory compliance requirements

### Technical Constraints & Dependencies

- **Deployment target:** Netlify (static export or Next.js SSG — no server runtime)
- **Contact form:** Netlify Forms only — no backend API, no third-party form service
- **CV PDF:** Must be in `/public/` at a stable path (e.g., `/cv.pdf`) — replaced by file swap, URL never changes
- **Analytics:** Lightweight provider (Plausible or Google Analytics) — must load async, must not affect LCP
- **Design system:** Tailwind CSS + shadcn/ui (already decided in UX Spec)
- **Fonts:** Inter + Plus Jakarta Sans + JetBrains Mono via `next/font` (zero layout shift, no external request)
- **Target launch:** End of April 2026

### Cross-Cutting Concerns Identified

- **Performance:** Every architectural decision must be evaluated against Lighthouse 90+/80+ target — images, fonts, scripts, CSS bundle all constrained
- **SEO:** SSG is non-negotiable; meta tags, OG tags, JSON-LD Person schema, sitemap.xml, robots.txt all required at build time
- **Accessibility:** WCAG 2.1 AA spirit — semantic HTML, keyboard navigation, visible focus states, descriptive alt text, `<label>` on all form fields
- **Content management:** No CMS — content is managed in code (React components / data files); project cards and About copy are code-managed
- **Progressive enhancement:** Core content (hero, about, portfolio, CV download link, footer) must render and be usable without JavaScript hydration

---

## Starter Template Evaluation

### Primary Technology Domain

Static Web — Next.js SSG (App Router), established by PRD project classification and UX Specification design system decisions.

### Starter Options Considered

No third-party boilerplate is appropriate here. The project has no SaaS complexity (no auth, no DB, no multi-tenancy). Official `create-next-app` + `shadcn init` is the canonical two-step path for this exact stack — well-documented, actively maintained, zero opinionated overhead beyond what the project already requires.

### Selected Starter: `create-next-app@latest` + `shadcn/ui init`

**Rationale for Selection:**

- First-party, officially maintained by Vercel/Next.js team
- Directly scaffolds the exact stack decisions already made in UX Spec (Next.js, Tailwind, TypeScript)
- `shadcn/ui init` adds CSS variable token foundation, `components/ui/`, and `cn()` utility — the exact design system primitives needed
- No fighting defaults or ejecting configuration; full ownership from day one

**Initialization Commands:**

```bash
npx create-next-app@latest bmad-1 \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-turbopack

cd bmad-1
npx shadcn@latest init
```

**Architectural Decisions Provided by Starter:**

| Decision Area | What It Establishes |
|---|---|
| Language | TypeScript — full type safety throughout |
| Styling | Tailwind CSS — JIT compiler, CSS variables, purged bundle at build |
| App structure | App Router (`/src/app/`) — `layout.tsx`, `page.tsx` conventions |
| Code organization | `src/` directory — source separated from config files |
| Import aliasing | `@/*` → `src/*` — clean absolute imports |
| Linting | ESLint with `next/core-web-vitals` ruleset |
| Build tooling | Next.js image optimization (`next/image`), font optimization (`next/font`) |
| Development server | `next dev` with Fast Refresh |
| shadcn/ui | `components/ui/`, CSS variable design tokens in `globals.css`, `cn()` utility, dark mode class strategy |

**Note:** Project initialization using these commands should be the first implementation story.

---

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Rendering strategy: Next.js SSG with `output: 'export'`
- Contact form: Netlify Forms (no backend code)
- Analytics: Google Analytics 4

**Important Decisions (Shape Architecture):**
- Content data pattern: TypeScript data files (`src/data/`)
- GitHub data fetching: Build-time API fetch (baked into static HTML)
- OG image: Static asset in `/public/`

**Deferred Decisions (Post-MVP):**
- Portfolio filtering by tech stack (triggers when projects exceed 6–8)
- Dark mode toggle (post-launch, based on personal preference)
- CMS adoption (only if content update frequency demands it)

### Data Architecture

- **No database. No CMS.**
- Portfolio project data lives in `src/data/projects.ts` — typed array of project objects (title, description, stack, liveUrl, githubUrl, thumbnail)
- GitHub API data fetched at **build time** via `fetch()` in page/section components using Next.js static data fetching patterns — baked into pre-rendered HTML. Netlify rebuild triggers fresh fetch.
- CV PDF served from `/public/cv.pdf` — stable URL, updated by file replacement only (no URL change on update)

### Authentication & Security

- No authentication required (public-facing static site)
- Netlify Forms handles contact form server-side — Agun's email never exposed in client code
- Netlify Forms spam filtering enabled via `netlify` attribute (Honeypot + built-in spam protection)
- All traffic HTTPS-only — enforced by Netlify CDN, no configuration needed
- All external scripts (GA4, fonts) loaded from established providers only

### API & Communication Patterns

- No custom API routes
- GitHub API: build-time fetch only — no runtime API calls from the deployed site
- Contact form: Netlify Forms HTML attribute-based (`data-netlify="true"`) — zero backend code
- Analytics: Google Analytics 4 — loaded via `<Script strategy="afterInteractive">` in Next.js (non-blocking, does not affect LCP)

### Frontend Architecture

- **Rendering:** Next.js App Router with `output: 'export'` — fully static HTML generated at build time
- **State management:** None required — no interactive state beyond contact form field inputs (React local state only)
- **Component architecture:** Co-located section components (`src/components/sections/`) + reusable UI primitives from shadcn/ui (`src/components/ui/`)
- **Routing:** Single page — no client-side routing. Anchor-based navigation (`#about`, `#portfolio`, `#contact`) via standard HTML `<a href="#id">`
- **Progressive enhancement:** All sections render as semantic HTML without JS hydration. Contact form submits natively to Netlify Forms (HTML `action` fallback)
- **Performance patterns:** `next/image` for all project thumbnails (WebP conversion, lazy loading, size optimization). `next/font` for zero-layout-shift font loading.

### Infrastructure & Deployment

- **Hosting:** Netlify — static file deployment via Netlify CDN
- **Build output:** `next build` → `output: 'export'` → `/out/` directory deployed to Netlify
- **CI/CD:** Netlify auto-deploys on push to `main` branch (Git integration, no extra pipeline config)
- **Environment config:** Netlify environment variables for GA4 Measurement ID (`NEXT_PUBLIC_GA_ID`) — no secrets in committed code
- **OG image:** `/public/og-image.png` — static 1200×630px asset, hand-crafted
- **Sitemap & robots:** `/public/sitemap.xml` + `/public/robots.txt` — manually authored (single-page site, one URL entry)
- **Monitoring:** GA4 dashboard for page visits and CV download click events. Netlify Forms dashboard as backup log for contact submissions.

### Decision Impact Analysis

**Implementation Sequence:**
1. Scaffold with `create-next-app` + `shadcn init`
2. Configure `output: 'export'` in `next.config.ts`
3. Set up Tailwind CSS variables and dark theme in `globals.css`
4. Install fonts via `next/font` in root `layout.tsx`
5. Build section components (Hero → About → Portfolio → Contact → Footer)
6. Wire portfolio data from `src/data/projects.ts` + build-time GitHub API fetch
7. Configure Netlify Forms on contact form
8. Integrate GA4 via `<Script strategy="afterInteractive">`
9. Add SEO metadata (meta, OG, JSON-LD) in `layout.tsx` and `page.tsx`
10. Add `/public/cv.pdf`, `/public/og-image.png`, `/public/sitemap.xml`, `/public/robots.txt`
11. Deploy to Netlify, verify Lighthouse scores

**Cross-Component Dependencies:**
- `output: 'export'` constrains: no Server Actions, no API routes, no middleware — all confirmed acceptable for this project's requirements
- GA4 `NEXT_PUBLIC_GA_ID` env var must be set in Netlify dashboard before first production deploy
- Netlify Forms: the contact form must be present in static HTML output (not client-side rendered only) — ensure it is rendered in the default server-generated HTML, not conditionally shown via JS

---

## Implementation Patterns & Consistency Rules

### Critical Conflict Points Identified: 8

Areas where AI agents could make inconsistent choices: file/component naming, CSS token vs hardcoded color usage, default vs named exports, `<img>` vs `next/image`, `<Script>` placement for analytics, form rendering strategy (static vs client-side), data fetch timing (build-time vs runtime), and test co-location convention.

### Naming Patterns

**File & Component Naming:**
- Components: PascalCase filename matching component name → `HeroSection.tsx`, `ProjectCard.tsx`
- Section components: `src/components/sections/` → `HeroSection.tsx`, `AboutSection.tsx`, `PortfolioSection.tsx`, `ContactSection.tsx`, `Footer.tsx`
- UI primitives (shadcn): `src/components/ui/` — do not modify shadcn files; wrap/extend via `className` only
- Data files: camelCase → `src/data/projects.ts`, `src/data/about.ts`
- Utility functions: camelCase → `src/lib/utils.ts` (shadcn `cn()`), `src/lib/analytics.ts`

**TypeScript Naming:**
- Types/interfaces: PascalCase → `Project`, `NavItem`, `ContactFormValues`
- Types co-located with usage, OR in `src/types/index.ts` if shared across 3+ files
- `interface` for component props and data shapes; `type` for unions

**CSS/Tailwind:**
- Dark mode: `dark:` Tailwind variants are **NOT used** — the site is dark-mode-only; base styles ARE the dark theme
- No hardcoded hex values in components — always use CSS variable-backed token classes (e.g., `text-foreground`, `bg-background`, `text-muted-foreground`)
- No custom CSS classes unless Tailwind cannot achieve the result

### Structure Patterns

**Component Export Pattern:**
```tsx
// CORRECT — named export, section id matches anchor target
export function HeroSection() {
  return (
    <section id="hero" className="...">
      {/* content */}
    </section>
  )
}
// No default exports on any component
```

**shadcn/ui Usage:**
- Always use shadcn `Button`, `Input`, `Textarea`, `Label`, `Badge`, `Card` — never rebuild these
- Extend via `className` prop with `cn()` — never edit files in `src/components/ui/`

**Tests:** Co-located `*.test.tsx` next to their component. No separate `__tests__` directory.

### Format Patterns

**TypeScript Data Shapes:**
```ts
// src/data/projects.ts
export interface Project {
  id: string
  title: string
  description: string
  problem: string        // one-line problem statement shown on card
  stack: string[]
  liveUrl?: string
  githubUrl?: string
  thumbnail: string      // path from /public, e.g. '/images/projects/name.webp'
}

export const projects: Project[] = [ ... ]
```

**GA4 Event Tracking:**
- All custom events go through `src/lib/analytics.ts` — never call `gtag()` directly in components
- CV download: `trackEvent('cv_download', { method: 'button_click' })`

### Process Patterns

**Contact Form — CRITICAL:**
```tsx
// MUST be server-rendered (not behind a JS-conditional render guard)
// MUST include data-netlify attribute so Netlify detects it at deploy time
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  {/* name, email, subject, message fields */}
</form>
// On successful submit: show in-page confirmation via React state (no redirect)
```

**Image Usage:**
- Always `next/image` (`<Image />`) for project thumbnails and photos — never raw `<img>` for content
- All images in `/public/images/` — referenced as `/images/filename.webp`

**CV Download:**
- Always link to `/cv.pdf` — never a dynamic path, never an external URL
- Track on click: `trackEvent('cv_download')` from `src/lib/analytics.ts`

**Progressive Enhancement:**
- Contact form must POST natively to Netlify Forms if JS is disabled (HTML `action` fallback)
- Navigation anchors must work without JS

### Enforcement Guidelines

**All AI Agents MUST:**
- Use named exports for all components (no `export default`)
- Use CSS variable token classes — never hardcode color hex values
- Use `next/image` (`<Image />`) for all content images
- Use `next/font` fonts only — no `@import` in CSS for fonts
- Never edit files in `src/components/ui/` — extend via `className` only
- Track CV download events via `src/lib/analytics.ts` — never call `gtag()` directly
- Render the contact form in static HTML (not behind a JS-only render condition)
- Fetch GitHub data at build time — never at runtime from the deployed site

**Anti-Patterns to Reject:**
- Hardcoded colors: `className="text-[#f1f5f9]"` → use `text-foreground`
- `export default` on components
- Raw `<img>` tags for content images
- Separate `__tests__/` directory
- Calling `window.gtag()` directly in components
- `dark:` Tailwind variants (site is dark-only — no light mode)
- Netlify Forms contact form rendered client-side only (breaks static HTML detection)

---

## Project Structure & Boundaries

### Complete Project Directory Structure

```
bmad-1/
├── README.md
├── package.json
├── next.config.ts                  ← output: 'export', image domains
├── tailwind.config.ts              ← custom theme tokens, font families
├── tsconfig.json
├── components.json                 ← shadcn/ui config
├── .env.local                      ← NEXT_PUBLIC_GA_ID (local dev, gitignored)
├── .env.example                    ← committed, documents required env vars
├── .gitignore
├── .eslintrc.json
│
├── public/
│   ├── cv.pdf                      ← FR12–14: stable URL, file-swap only
│   ├── og-image.png                ← FR3, FR20: 1200×630px static OG asset
│   ├── sitemap.xml                 ← FR22: single URL entry
│   ├── robots.txt                  ← FR22
│   └── images/
│       └── projects/               ← FR9: project thumbnails (.webp)
│
└── src/
    ├── app/
    │   ├── globals.css             ← CSS variable tokens, Tailwind base, dark theme defaults
    │   ├── layout.tsx              ← root layout: fonts, metadata, GA4 Script tag
    │   └── page.tsx                ← single page: composes all section components
    │
    ├── components/
    │   ├── sections/
    │   │   ├── HeroSection.tsx     ← FR4–7: name, title, availability badge, CTAs
    │   │   ├── AboutSection.tsx    ← FR6: background, stack, years of experience
    │   │   ├── PortfolioSection.tsx← FR8–11: project card grid
    │   │   ├── ProjectCard.tsx     ← FR9–11: single card (thumbnail, stack, links)
    │   │   ├── ContactSection.tsx  ← FR15–17: Netlify Forms contact form
    │   │   └── Footer.tsx          ← FR29–31: LinkedIn, email, copyright
    │   │
    │   ├── ui/                     ← shadcn/ui primitives (DO NOT EDIT DIRECTLY)
    │   │   ├── button.tsx
    │   │   ├── input.tsx
    │   │   ├── textarea.tsx
    │   │   ├── label.tsx
    │   │   ├── badge.tsx
    │   │   └── card.tsx
    │   │
    │   └── shared/
    │       ├── StickyNav.tsx       ← FR1: anchor navigation, always visible
    │       └── AvailabilityBadge.tsx← FR5: "Open to Work" status badge
    │
    ├── data/
    │   ├── projects.ts             ← FR8–11, FR26–27: typed Project[] array
    │   └── about.ts                ← FR6: bio, stack, skills content
    │
    ├── lib/
    │   ├── utils.ts                ← cn() utility from shadcn
    │   ├── analytics.ts            ← FR23–25: GA4 trackEvent() helper functions
    │   └── github.ts               ← build-time GitHub API fetch helper
    │
    └── types/
        └── index.ts                ← Project, NavItem, ContactFormValues interfaces
```

### Architectural Boundaries

**Component Boundaries:**
- Each section component is fully self-contained — no shared mutable state between sections
- `page.tsx` is the single composition point — imports and renders all sections in scroll order
- `StickyNav.tsx` receives section anchor IDs as props from `page.tsx`
- No props drilling beyond `page.tsx` → direct section children

**Data Boundaries:**
- `src/data/projects.ts` is the single source of truth for portfolio content
- `src/lib/github.ts` provides a typed build-time fetch wrapper — called from `PortfolioSection.tsx` or `page.tsx` as async Server Component; result merged with local `projects.ts` data
- No data mutation anywhere — all data is read-only static at runtime

**External Integration Points:**

| Integration | Where | When | Notes |
|---|---|---|---|
| GitHub API | `src/lib/github.ts` | Build time only | Fetches repo metadata; baked into static HTML |
| Netlify Forms | `ContactSection.tsx` | Runtime (visitor submit) | Detected at deploy time via `data-netlify` in static HTML |
| Google Analytics 4 | `src/app/layout.tsx` | Runtime (afterInteractive) | `NEXT_PUBLIC_GA_ID` env var; non-blocking |
| Netlify CDN | `/public/cv.pdf` | Runtime (visitor download) | Static file — no code required |
| `next/font` | `src/app/layout.tsx` | Build time | Inter, Plus Jakarta Sans, JetBrains Mono |

### Requirements to Structure Mapping

| FR Category | Location |
|---|---|
| FR1–FR3: Navigation & Discoverability | `StickyNav.tsx`, `layout.tsx` (OG/meta), anchor `id` attrs on sections |
| FR4–FR7: Profile & Availability | `HeroSection.tsx`, `AvailabilityBadge.tsx` |
| FR8–FR11: Portfolio Showcase | `PortfolioSection.tsx`, `ProjectCard.tsx`, `src/data/projects.ts` |
| FR12–FR14: CV Access | `HeroSection.tsx` (button), `/public/cv.pdf`, `analytics.ts` (click track) |
| FR15–FR18: Contact & Inquiry | `ContactSection.tsx` (Netlify Forms) |
| FR19–FR22: SEO | `layout.tsx` (meta/OG/JSON-LD), `/public/sitemap.xml`, `/public/robots.txt` |
| FR23–FR25: Analytics | `layout.tsx` (GA4 script), `src/lib/analytics.ts` |
| FR26–FR28: Content Management | `src/data/projects.ts` (code-edit), Netlify Forms dashboard (FR28) |
| FR29–FR31: Footer | `Footer.tsx` |

### Data Flow

```
Build time:
  src/data/projects.ts → PortfolioSection (baked into static HTML)
  src/lib/github.ts → GitHub API fetch → PortfolioSection (baked into static HTML)
  src/data/about.ts → AboutSection (baked into static HTML)
  next/font → layout.tsx (zero layout-shift fonts)
  next/image optimization → /out/images/ (WebP, lazy, sized)

Runtime (visitor):
  Visitor loads page → Netlify CDN serves /out/ static files
  Visitor clicks CV → /public/cv.pdf + analytics.trackEvent('cv_download')
  Visitor submits form → Netlify Forms (server-side) → email notification to Agun
  GA4 Script (afterInteractive) → page view + cv_download events → GA4 dashboard
```

---

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:** All decisions are mutually compatible. `output: 'export'` is correctly scoped — no Server Actions, API routes, or middleware are needed, so the constraint is zero-friction. Netlify Forms is compatible with static export (detection happens at deploy time from static HTML). GA4 `afterInteractive` is the correct Next.js `<Script>` strategy for analytics that must not affect LCP. `next/image` and `next/font` are native to the App Router. shadcn/ui is designed exactly for this stack. No conflicts detected.

**Pattern Consistency:** Named exports, CSS token usage, `next/image` enforcement, and analytics abstraction via `src/lib/analytics.ts` are consistent across all component patterns. The `dark:` variant exclusion rule correctly reflects the dark-mode-only design. All patterns align with the chosen stack.

**Structure Alignment:** The directory tree maps cleanly to every architectural decision. Section components are properly isolated. `src/data/` is the correct home for typed static content. `src/lib/github.ts` correctly encapsulates the build-time fetch concern. `/public/` correctly holds all stable-URL static assets.

### Requirements Coverage Validation ✅

All 31 FRs are architecturally supported — verified via the Requirements to Structure Mapping table. All 9 FR categories have explicit file-level coverage.

**NFR Coverage:**

| NFR | Coverage |
|---|---|
| Lighthouse 90+/80+ | SSG + `next/image` + `next/font` + async GA4 + Tailwind JIT purge |
| Progressive enhancement | Server-rendered HTML, Netlify Forms HTML POST fallback |
| HTTPS | Netlify CDN — zero config |
| Email hidden | Netlify Forms server-side recipient |
| Spam filtering | `data-netlify` attribute on form |
| CV download <1s | `/public/cv.pdf` on Netlify CDN |
| Analytics non-blocking | `<Script strategy="afterInteractive">` |
| WCAG 2.1 AA | shadcn/ui accessible primitives + semantic HTML section structure |

### Implementation Readiness Validation ✅

**Decision completeness:** All critical decisions documented with clear rationale. The `NEXT_PUBLIC_GA_ID` env var requirement is documented. The `output: 'export'` constraint and its implications are explicitly called out.

**Structure completeness:** Every FR maps to a specific file. All integration points (GitHub API, Netlify Forms, GA4, Netlify CDN) have documented timing (build-time vs runtime) and ownership locations.

**Pattern completeness:** 8 conflict points identified and addressed. Anti-patterns are explicitly enumerated. The Netlify Forms static-HTML detection requirement is called out as a critical process pattern.

### Gap Analysis Results

**No critical gaps.** One build-resilience rule added:

- `src/lib/github.ts` must handle GitHub API errors gracefully — if the API is unavailable or rate-limited at build time, the function falls back to local `src/data/projects.ts` data only. A build must never fail due to a GitHub API hiccup.

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed (31 FRs, 17 NFRs)
- [x] Scale and complexity assessed (Low / Static Web)
- [x] Technical constraints identified (Netlify, Netlify Forms, no backend)
- [x] Cross-cutting concerns mapped (Performance, SEO, Accessibility, Progressive Enhancement)

**✅ Architectural Decisions**
- [x] Critical decisions documented (SSG, Netlify Forms, GA4, `output: 'export'`)
- [x] Technology stack fully specified (Next.js, TypeScript, Tailwind, shadcn/ui)
- [x] Integration patterns defined (build-time GitHub, runtime Netlify Forms/GA4)
- [x] Performance considerations addressed (image opt, font opt, async analytics)

**✅ Implementation Patterns**
- [x] Naming conventions established (files, components, types, CSS)
- [x] Structure patterns defined (exports, shadcn extension, test co-location)
- [x] Process patterns documented (contact form, image usage, CV download, GA4)
- [x] Anti-pattern list explicitly documented

**✅ Project Structure**
- [x] Complete directory structure defined with FR annotations
- [x] Component boundaries established (`page.tsx` as single composition point)
- [x] Integration points mapped with timing (build vs runtime)
- [x] All 31 FRs mapped to specific files

### Architecture Readiness Assessment

**Overall Status: READY FOR IMPLEMENTATION**

**Confidence Level: High**

**Key Strengths:**
- Zero unresolved conflicts between all architectural decisions
- Every FR traced to a specific file — no orphaned requirements
- Netlify Forms critical constraint (static HTML detection) explicitly documented
- Build-time vs runtime separation is crystal clear throughout
- GitHub API fetch includes resilience rule (graceful fallback to local data)

**Areas for Future Enhancement (Post-MVP):**
- Portfolio filtering by tech stack (when project count exceeds 6–8)
- Dark mode toggle (post-launch personal preference)
- CMS adoption (if content update frequency demands it)
- Case study deep-dive pages (when stories are fully written)

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented
- Use implementation patterns consistently — refer to the anti-patterns list
- Respect `src/components/ui/` boundary — never edit shadcn files directly
- Always verify contact form is in static HTML output before deploying
- Set `NEXT_PUBLIC_GA_ID` in Netlify dashboard before first production deploy

**First Implementation Step:**

```bash
npx create-next-app@latest bmad-1 \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-turbopack

cd bmad-1
npx shadcn@latest init
```

