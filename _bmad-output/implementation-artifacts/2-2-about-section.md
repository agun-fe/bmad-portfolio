# Story 2.2: About Section

Status: done

## Story

As a visitor,
I want to read a concise, professional About section describing Agun's background, experience, and core stack,
so that I can evaluate whether his skills and experience match my hiring needs.

## Acceptance Criteria

1. **Given** I scroll to or navigate to `#about`
   **When** the section loads
   **Then** Agun's professional background and ~8 years of experience are communicated clearly

2. **Given** I view the About section
   **When** the content renders
   **Then** his core tech stack (React JS, Next.js, Webflow, HTML, CSS, JavaScript, TypeScript) is visible as individual skill tags

3. **Given** I read the About section copy
   **When** I evaluate the tone and presentation
   **Then** the section feels human and professional — not a resume wall — with personality coming through the bio text

4. **Given** the section is implemented
   **When** I inspect the source
   **Then** all bio/skills content is sourced from `src/data/about.ts` — not hardcoded in the component

5. **Given** I view the section on any device (mobile, tablet, desktop)
   **When** the layout renders
   **Then** the section is fully responsive and visually consistent with the overall dark theme

6. **Given** the section is rendered
   **When** I check text contrast
   **Then** all text meets WCAG 2.1 AA contrast ratios (minimum 4.5:1 for normal text)

7. **Given** JavaScript is disabled
   **When** the page renders
   **Then** the About section content is fully visible as static HTML (progressive enhancement)

## Tasks / Subtasks

- [x] Task 1: Create `src/data/about.ts` data file (AC: 1, 2, 3, 4)
  - [x] Define and export `interface AboutData` with fields: `bio: string[]`, `skills: string[]`, `yearsOfExperience: number`, `currentRole: string`, `highlights: string[]`
  - [x] Export `const aboutData: AboutData` with Agun's real content — bio paragraphs (2–3 sentences each, human tone), skills array, highlights
  - [x] Skills array must include at minimum: `"React JS"`, `"Next.js"`, `"Webflow"`, `"HTML"`, `"CSS"`, `"JavaScript"`, `"TypeScript"`

- [x] Task 2: Create `src/components/shared/SectionHeading.tsx` (reusable component, AC: 5)
  - [x] Named export `SectionHeading`
  - [x] Props: `eyebrow: string`, `title: string`, `description?: string`
  - [x] Eyebrow: `text-xs tracking-widest font-bold text-amber-400 uppercase mb-2`
  - [x] Heading: `<h2>` with `font-(family-name:--font-plus-jakarta-sans) text-4xl font-bold tracking-tight text-foreground`
  - [x] Optional description: `text-lg text-muted-foreground leading-relaxed mt-4 max-w-prose`
  - [x] This component will also be used in stories 2.3, 2.5

- [x] Task 3: Create `src/components/shared/SkillTag.tsx` (reusable component, AC: 2, 6)
  - [x] Named export `SkillTag`
  - [x] Props: `label: string`
  - [x] Styling (from UX spec): `font-mono text-[10px] font-semibold tracking-wide bg-amber-950 border border-amber-400/25 text-amber-400 px-2 py-0.5 rounded`
  - [x] Non-interactive at MVP (no hover state)
  - [x] This component will also be used in story 2.3 (ProjectCard)

- [x] Task 4: Create `src/components/sections/AboutSection.tsx` (AC: 1, 2, 3, 5, 6, 7)
  - [x] Named export `AboutSection`
  - [x] Section `id="about"` — matches sidebar anchor `#about` and `#About` nav link
  - [x] Import `aboutData` from `@/data/about`
  - [x] Import and use `SectionHeading` with `eyebrow="ABOUT ME"` and `title` of your choice
  - [x] Import and use `SkillTag` for each skill in `aboutData.skills`
  - [x] Layout: `py-20 px-6 lg:px-12 max-w-3xl` (matches architecture content width spec)
  - [x] Bio paragraphs rendered from `aboutData.bio` array (map, each paragraph in its own `<p>`)
  - [x] Skills section: flex-wrap row of `<SkillTag>` chips with a label above ("TECH STACK" or "CORE SKILLS")
  - [x] Optional: years of experience callout (e.g., a highlighted stat block)
  - [x] Section is fully static — no client-side JS required (Server Component, no `"use client"`)
  - [x] Accessibility: section has `aria-labelledby` pointing to the `<h2>` id; section wrapped in `<section>` (not `<div>`)

- [x] Task 5: Update `src/app/page.tsx` — replace `#about` placeholder (AC: 1–7)
  - [x] Import `AboutSection` from `@/components/sections/AboutSection`
  - [x] Replace `<section id="about" className="min-h-screen py-20 px-6 lg:px-12" />` with `<AboutSection />`
  - [x] Do NOT touch any other section in `page.tsx` — only the `#about` placeholder

- [x] Task 6: Build validation (AC: 1–7)
  - [x] Run `npm run lint` — exit code 0, zero warnings
  - [x] Run `npm run build` — exit code 0, `/out/` produced
  - [x] Verify About section content is in `/out/index.html` (e.g., `grep "About" out/index.html`)
  - [x] Verify skill tags are in static HTML output
  - [x] Manual: Keyboard tab through About section — confirm no focus issues

## Dev Notes

### Context: What Story 2.1 Built

**Story 2.1 (DONE)** created the following files — **do not recreate these, they already exist**:

| File                                          | Status                    | Note                                      |
| --------------------------------------------- | ------------------------- | ----------------------------------------- |
| `src/app/page.tsx`                            | EXISTS — PARTIALLY modify | Replace only `#about` placeholder section |
| `src/components/shared/AvailabilityBadge.tsx` | EXISTS — do not touch     | Used in Sidebar                           |
| `src/components/shared/Sidebar.tsx`           | EXISTS — do not touch     | Desktop/mobile nav                        |
| `src/components/sections/HeroSection.tsx`     | EXISTS — do not touch     | Story 2.1 output                          |
| `src/lib/analytics.ts`                        | EXISTS — do not touch     | GA4 event helper                          |
| `src/types/index.ts`                          | EXISTS — do not touch     | `NavItem`, `SiteConfig` interfaces        |
| `src/components/ui/button.tsx`                | EXISTS (shadcn)           | DO NOT EDIT                               |
| `src/components/ui/badge.tsx`                 | EXISTS (shadcn)           | DO NOT EDIT                               |

**Current `src/app/page.tsx` about section placeholder** (this is what you are replacing in Task 5):

```tsx
<section id="about" className="min-h-screen py-20 px-6 lg:px-12" />
```

### Architecture Compliance Rules

#### ✅ REQUIRED — Will be checked

- **Named exports only** — `export function AboutSection`, `export function SectionHeading`, `export function SkillTag`. Never `export default` on any component.
- **No `dark:` Tailwind variants** — base styles ARE the dark theme. Use `text-foreground`, `text-muted-foreground`, `bg-background` etc.
- **No hardcoded hex colors** — use CSS variable token classes or Tailwind named palette (slate/amber/emerald). Never `text-[#f1f5f9]`.
- **Content in data file** — all bio copy and skills sourced from `src/data/about.ts`, not hardcoded in the component.
- **Server Component** — `AboutSection.tsx` should NOT have `"use client"` directive. Bio content is static; no interactive state required in this story.
- **Section tag with id** — `<section id="about">` not `<div id="about">`.

#### ❌ FORBIDDEN — Anti-patterns

- `export default` on any component
- `dark:` Tailwind variants anywhere
- Hardcoded hex colors (`text-[#f59e0b]`) — use `text-amber-400`
- `"use client"` in `AboutSection.tsx` (no client-side interactivity needed)
- Editing any file in `src/components/ui/`
- Hardcoding bio copy or skills directly inside the component JSX

### Tailwind v4 Syntax — CRITICAL

Story 2.1 identified a Tailwind v4 breaking syntax change. Use the **v4** form:

```tsx
// ✅ CORRECT (Tailwind v4)
className = "font-(family-name:--font-plus-jakarta-sans) text-4xl ...";

// ❌ WRONG (Tailwind v3 - will fail lint)
className = "font-[family-name:var(--font-plus-jakarta-sans)] text-4xl ...";
```

Apply this to any Plus Jakarta Sans heading text.

### Motion-Safe Transitions

Any micro-interaction (hover, transition) must use `motion-safe:` prefix:

```tsx
// ✅ CORRECT
className = "motion-safe:transition-colors motion-safe:duration-150";

// ❌ WRONG (fails prefers-reduced-motion AC)
className = "transition-colors duration-150";
```

### `src/data/about.ts` — Expected Shape

```ts
// src/data/about.ts

export interface AboutData {
  bio: string[]; // Array of paragraph strings — 2–3 paragraphs
  skills: string[]; // Tech stack tags displayed as SkillTag chips
  yearsOfExperience: number; // Displayed as a callout stat (e.g., "8+")
  currentRole: string; // e.g., "Senior Frontend Developer"
  highlights: string[]; // 2–4 bullet points of career highlights (optional display)
}

export const aboutData: AboutData = {
  bio: [
    "8+ years building fast, accessible web products ...",
    "Currently focused on ...",
  ],
  skills: [
    "React JS",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Webflow",
    "HTML",
    "CSS",
    "Tailwind CSS",
    // add others that reflect Agun's actual stack
  ],
  yearsOfExperience: 8,
  currentRole: "Senior Frontend Developer",
  highlights: ["Led frontend architecture for ...", "..."],
};
```

### `SectionHeading` Component — Expected Implementation

This is a shared component used in ALL content sections (2.2, 2.3, 2.5, 2.6). Implement it correctly now to avoid rework in later stories:

```tsx
// src/components/shared/SectionHeading.tsx

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string; // for aria-labelledby
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
}: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <p className="text-xs tracking-widest font-bold text-amber-400 uppercase mb-2">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="font-(family-name:--font-plus-jakarta-sans) text-4xl font-bold tracking-tight text-foreground"
      >
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground leading-relaxed mt-4 max-w-prose">
          {description}
        </p>
      )}
    </div>
  );
}
```

### `SkillTag` Component — Expected Implementation

```tsx
// src/components/shared/SkillTag.tsx

interface SkillTagProps {
  label: string;
}

export function SkillTag({ label }: SkillTagProps) {
  return (
    <span className="font-mono text-[10px] font-semibold tracking-wide bg-amber-950 border border-amber-400/25 text-amber-400 px-2 py-0.5 rounded">
      {label}
    </span>
  );
}
```

### `AboutSection` Layout Pattern

```tsx
// src/components/sections/AboutSection.tsx
// NO "use client" — this is a Server Component

import { aboutData } from "@/data/about";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SkillTag } from "@/components/shared/SkillTag";

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 px-6 lg:px-12"
    >
      <div className="max-w-3xl">
        <SectionHeading
          eyebrow="ABOUT ME"
          title="Background & Experience"
          id="about-heading"
        />

        {/* Bio paragraphs */}
        <div className="space-y-4 text-base text-muted-foreground leading-relaxed mb-12">
          {aboutData.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Skills */}
        <div>
          <p className="text-xs tracking-widest font-bold text-amber-400 uppercase mb-4">
            CORE SKILLS
          </p>
          <div className="flex flex-wrap gap-2">
            {aboutData.skills.map((skill) => (
              <SkillTag key={skill} label={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Color Token Reference — This Story

| Usage                       | Tailwind class          | Token                 |
| --------------------------- | ----------------------- | --------------------- |
| Page background             | `bg-background`         | `#0f172a` (slate-950) |
| Primary text                | `text-foreground`       | `#f1f5f9` (slate-100) |
| Secondary text              | `text-muted-foreground` | `#94a3b8` (slate-400) |
| Amber accent (eyebrow, tag) | `text-amber-400`        | `#f59e0b`             |
| Skill tag bg                | `bg-amber-950`          | amber tint            |
| Skill tag border            | `border-amber-400/25`   | amber border          |

### Key File Locations

| File                                       | Status                    | Action                                |
| ------------------------------------------ | ------------------------- | ------------------------------------- |
| `src/data/about.ts`                        | DOES NOT EXIST — CREATE   | AboutData interface + aboutData const |
| `src/components/shared/SectionHeading.tsx` | DOES NOT EXIST — CREATE   | Reusable section heading              |
| `src/components/shared/SkillTag.tsx`       | DOES NOT EXIST — CREATE   | Skill/tech stack tag chip             |
| `src/components/sections/AboutSection.tsx` | DOES NOT EXIST — CREATE   | The about section                     |
| `src/app/page.tsx`                         | EXISTS — PARTIALLY MODIFY | Replace `#about` placeholder only     |

### page.tsx After This Story

The only change to `page.tsx` is replacing the About placeholder. Final state of the about line:

```tsx
// BEFORE (story 2.1 output):
<section id="about" className="min-h-screen py-20 px-6 lg:px-12" />

// AFTER (this story):
<AboutSection />
```

Full import line to add at top of `page.tsx`:

```tsx
import { AboutSection } from "@/components/sections/AboutSection";
```

### Project Structure Additions This Story

```
src/
├── app/
│   └── page.tsx                       ← MODIFY: replace #about placeholder
├── components/
│   ├── sections/
│   │   └── AboutSection.tsx           ← CREATE (FR6)
│   └── shared/
│       ├── SectionHeading.tsx         ← CREATE (reusable for 2.2, 2.3, 2.5)
│       └── SkillTag.tsx               ← CREATE (reusable for 2.2, 2.3)
└── data/
    └── about.ts                       ← CREATE (FR6 — content source)
```

### UX Intent — About Section (Emotional Target: Trust)

From the UX specification, the About section emotional target is:

> "Trust — depth and personality come through"

The design must avoid looking like a resume dump. Key UX principles:

- **Human tone** — write in first or third person with personality, not CV bullet points
- **Experience depth** — "8+ years" should feel like depth, not just a number
- **Stack coherence** — React + Webflow should feel intentional and complementary
- **Scannability** — recruiters (Sarah) should be able to confirm fit within 10 seconds

The layout should provide: eyebrow → heading → 2–3 bio paragraphs → skill chips. Optionally a years-of-experience callout stat (`8+` in large type) can be added for scannable impact.

### References

- Story requirements (AC source): [planning-artifacts/epics.md — Story 2.2](../_bmad-output/planning-artifacts/epics.md)
- FR coverage: FR6 [Source: planning-artifacts/epics.md#FR-Coverage-Map]
- UX About section emotional target: [Source: planning-artifacts/ux-design-specification.md#Emotional-Journey-Mapping]
- SkillTag component spec: [Source: planning-artifacts/ux-design-specification.md#SkillTag]
- SectionHeading component spec: [Source: planning-artifacts/ux-design-specification.md#SectionHeading]
- Color system: [Source: planning-artifacts/ux-design-specification.md#Color-System]
- Typography system: [Source: planning-artifacts/ux-design-specification.md#Typography-System]
- Architecture naming + export rules: [Source: planning-artifacts/architecture.md#Naming-Patterns]
- Architecture directory structure: [Source: planning-artifacts/architecture.md#Complete-Project-Directory-Structure]
- Data file pattern (`src/data/about.ts`): [Source: planning-artifacts/architecture.md#Data-Architecture]
- Anti-patterns list: [Source: planning-artifacts/architecture.md#Enforcement-Guidelines]
- Previous story dev notes (Tailwind v4 syntax, motion-safe): [Source: implementation-artifacts/2-1-hero-section-with-navigation.md#Dev-Notes]

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6 (GitHub Copilot)

### Debug Log References

### Completion Notes List

- All 6 tasks completed. All AC covered.
- `src/data/about.ts` created with `AboutData` interface and real Agun Gunawan bio content (3 paragraphs, 12 skills, 4 highlights, 8 years experience).
- `SectionHeading` and `SkillTag` are reusable shared components — ready for use in stories 2.3, 2.5, 2.6.
- `AboutSection` is a Server Component (no `"use client"`), uses `aria-labelledby` with `id="about-heading"`, wrapped in `<section>` tag.
- Includes years-of-experience callout stat (`8+` in large amber type) for scannability.
- All Tailwind uses v4 syntax (`font-(family-name:--font-plus-jakarta-sans)`), no `dark:` variants, no hardcoded hex colors.
- `npm run lint` — exit 0, zero warnings.
- `npm run build` — exit 0, `/out/index.html` produced and verified to contain About section content.

### File List

- `src/data/about.ts` — CREATED
- `src/components/shared/SectionHeading.tsx` — CREATED
- `src/components/shared/SkillTag.tsx` — CREATED
- `src/components/sections/AboutSection.tsx` — CREATED
- `src/app/page.tsx` — MODIFIED (added AboutSection import + replaced `#about` placeholder)
