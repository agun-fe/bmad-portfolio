# Story 1.2: Configure Static Export, Global Layout & Fonts

Status: done

## Story

As a developer,
I want to configure `output: 'export'` in Next.js, replace scaffold fonts with the project-specified typefaces via `next/font`, and establish the single-page section placeholder structure,
so that the site generates as fully static HTML and all pages share consistent typography and layout from this point forward.

## Acceptance Criteria

1. `next.config.ts` has `output: 'export'` and `images: { unoptimized: true }` configured
2. `next build` produces a `/out/` directory with fully static HTML — no server runtime required
3. Inter, Plus Jakarta Sans, and JetBrains Mono are loaded via `next/font/google` in `src/app/layout.tsx` with zero layout shift — Geist and Geist_Mono are fully removed
4. `globals.css` `@theme inline` block references the new font CSS variables (`--font-sans` → `--font-inter`, `--font-mono` → `--font-jetbrains-mono`; add `--font-display` → `--font-plus-jakarta-sans`)
5. `src/app/page.tsx` contains a `<main>` with four `<section>` placeholder elements — each with its anchor `id`: `hero`, `about`, `portfolio`, `contact`
6. No Server Actions, no API routes, no middleware exist in the project
7. `npm run build` exits with code 0 and outputs the `/out/` directory
8. `npm run lint` exits with code 0 (zero warnings)

## Tasks / Subtasks

- [x] Task 1: Configure static export in `next.config.ts` (AC: 1, 2, 7)
  - [x] Add `output: 'export'` to the `nextConfig` object
  - [x] Add `images: { unoptimized: true }` (required for `next/image` in static export — no server-side optimizer available)
  - [x] Run `npm run build` — confirm `/out/` directory is created and build exits 0

- [x] Task 2: Replace fonts in `src/app/layout.tsx` (AC: 3, 8)
  - [x] Remove `import { Geist, Geist_Mono } from 'next/font/google'` and all Geist font instantiation
  - [x] Add `import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'`
  - [x] Instantiate each font:
    - `Inter` → `variable: '--font-inter'`, `subsets: ['latin']`
    - `Plus_Jakarta_Sans` → `variable: '--font-plus-jakarta-sans'`, `subsets: ['latin']`
    - `JetBrains_Mono` → `variable: '--font-jetbrains-mono'`, `subsets: ['latin']`
  - [x] Update `<body>` className to apply all three font variables: `` `${inter.variable} ${plusJakartaSans.variable} ${jetBrainsMono.variable} antialiased` ``
  - [x] Verify `class="dark"` remains on `<html>` (from Story 1.1 code review fix — must not remove)
  - [x] Run `npm run lint` — confirm zero warnings

- [x] Task 3: Update `globals.css` font theme references (AC: 4)
  - [x] In the `@theme inline` block, replace `--font-sans: var(--font-geist-sans)` → `--font-sans: var(--font-inter)`
  - [x] In the `@theme inline` block, replace `--font-mono: var(--font-geist-mono)` → `--font-mono: var(--font-jetbrains-mono)`
  - [x] Add a new line in `@theme inline`: `--font-display: var(--font-plus-jakarta-sans)`
  - [x] Do NOT remove or change any shadcn CSS variable tokens in `:root {}` — those belong to shadcn and are unchanged

- [x] Task 4: Update `src/app/page.tsx` with section placeholder structure (AC: 5)
  - [x] Replace the current minimal placeholder with a `<main>` containing four `<section>` elements with ids: `hero`, `about`, `portfolio`, `contact`
  - [x] Each section should have `min-h-screen` as a placeholder height and use CSS variable token classes only (`bg-background`, `text-foreground`)
  - [x] Keep the `cn()` import from `@/lib/utils` if still used; remove if not needed after the refactor
  - [x] Note: `page.tsx` MUST use `export default` (App Router technical exception — see Story 1.1 completion notes)
  - [x] Do NOT create any section component files (`HeroSection.tsx`, etc.) — those belong in Epic 2 stories

- [x] Task 5: Final verification (AC: 1–8)
  - [x] Run `npm run lint` — must exit 0, zero warnings
  - [x] Run `npm run build` — must exit 0, `/out/` directory present
  - [x] Confirm `/out/index.html` exists and contains visible rendered HTML (not empty)
  - [x] Confirm no `src/app/api/` directory, no `middleware.ts` exists
  - [x] Open `/out/index.html` in a browser or inspect: confirm four section elements are present with correct `id` attrs

## Dev Notes

### Critical: `output: 'export'` Constraints

With `output: 'export'` enabled, the following are **permanently forbidden** in this project:

| Forbidden                                                   | Why                                                        |
| ----------------------------------------------------------- | ---------------------------------------------------------- |
| `src/app/api/` routes                                       | Requires Node.js runtime — incompatible with static export |
| Server Actions (`'use server'`)                             | Requires server runtime                                    |
| `src/middleware.ts`                                         | Requires edge/server runtime                               |
| `next/image` without `unoptimized: true`                    | Image optimization API requires a server                   |
| `generateStaticParams` returning `fallback: true` behaviour | Static export requires `fallback: false`                   |

The architecture is designed around these constraints — all 31 FRs are achievable without any of the above.

### `next.config.ts` — Exact Expected Result

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

> **Why `images: { unoptimized: true }`?** With `output: 'export'`, Next.js cannot run its server-side image optimizer. Without this flag, any page using `next/image` will throw a build error: _"Image Optimization using the default loader is not compatible with `{ output: 'export' }`"_. Setting `unoptimized: true` passes images through as-is. Lighthouse performance targets are still achievable by manually serving pre-optimised WebP assets in `/public/images/`.

### Font Setup — `src/app/layout.tsx`

**Exact font imports and instantiation:**

```tsx
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});
```

**Applied in `<body>`:**

```tsx
<body
  className={`${inter.variable} ${plusJakartaSans.variable} ${jetBrainsMono.variable} antialiased`}
>
```

**Font role mapping (for future reference across Epic 2 stories):**

| Variable                                        | Font              | Use Case                                         |
| ----------------------------------------------- | ----------------- | ------------------------------------------------ |
| `--font-sans` (→ `--font-inter`)                | Inter             | Body copy, UI text, labels, form fields          |
| `--font-display` (→ `--font-plus-jakarta-sans`) | Plus Jakarta Sans | Headings, hero title, section headers            |
| `--font-mono` (→ `--font-jetbrains-mono`)       | JetBrains Mono    | Code snippets, tech stack badges, monospace text |

**Usage in components (Tailwind v4):**

```tsx
// Body text (default — no class needed since --font-sans is the default)
<p className="text-foreground">...</p>

// Headings / display
<h1 className="font-display text-4xl font-bold">...</h1>

// Monospace / code / stack badges
<span className="font-mono text-sm">React</span>
```

> Tailwind v4 maps `font-sans` → `--font-sans`, `font-display` → `--font-display`, `font-mono` → `--font-mono` via the `@theme inline` block — ensure `--font-display` is added there.

### `globals.css` — Exact Changes to `@theme inline`

Only the font lines change — all other variables remain untouched:

```css
/* BEFORE (Story 1.1 output): */
--font-sans: var(--font-geist-sans);
--font-mono: var(--font-geist-mono);

/* AFTER (this story): */
--font-sans: var(--font-inter);
--font-display: var(--font-plus-jakarta-sans);
--font-mono: var(--font-jetbrains-mono);
```

Do **not** touch the `:root {}` block, `@layer base {}`, `@custom-variant dark`, `@import` lines, or any shadcn color/radius tokens.

### `page.tsx` — Section Placeholder Structure

```tsx
export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <section id="hero" className="min-h-screen" />
      <section id="about" className="min-h-screen" />
      <section id="portfolio" className="min-h-screen" />
      <section id="contact" className="min-h-screen" />
    </main>
  );
}
```

> **Note:** `export default` on `page.tsx` is the App Router technical exception — DO NOT change to named export. This was documented in Story 1.1 completion notes (review item M2).

> **Scope boundary:** Do NOT create `src/components/sections/` or any section component files. Section components are in Epic 2 (Stories 2.1–2.6). This story creates skeleton `id` anchor targets only.

### Previous Story Intelligence (Story 1.1)

**Critical learnings to carry forward:**

1. **Tailwind v4** — No `tailwind.config.ts` file exists. Config is purely CSS-first via `globals.css` and `postcss.config.mjs`. Any Tailwind customisation happens in `globals.css` `@theme inline` block.

2. **ESLint flat config** — Config is `eslint.config.mjs`, not `.eslintrc.json`. `npm run lint` uses this.

3. **shadcn `@custom-variant dark`** — The `@custom-variant dark (&:is(.dark *))` line in `globals.css` and `class="dark"` on `<html>` in `layout.tsx` are **required** — they activate shadcn's internal `dark:` focus/aria variants in generated UI components. Do NOT remove either.

4. **Dark-mode-only rule** — Do not use `dark:` Tailwind variants in any code you write. Base styles ARE the dark theme. `globals.css` `:root {}` defines the dark palette directly (no `.dark {}` override block).

5. **Named exports on components** — ALL future components (not `page.tsx`/`layout.tsx`) must use named exports: `export function MyComponent() {}`. No `export default` except App Router conventions.

6. **CSS variable tokens only** — Never hardcode colors. Use `text-foreground`, `bg-background`, `text-muted-foreground`, etc. from the shadcn token set.

7. **shadcn button** — `src/components/ui/button.tsx` exists, is default style, zero `dark:` variants. Do not re-run `shadcn init` or edit this file.

### Project Structure Notes

**Files touched in this story:**

```
next.config.ts          ← add output: 'export', images: { unoptimized: true }
src/app/layout.tsx      ← replace Geist fonts with Inter/PlusJakartaSans/JetBrainsMono
src/app/globals.css     ← update @theme inline font variable references only
src/app/page.tsx        ← replace minimal placeholder with 4-section placeholder structure
```

**Files NOT touched in this story:**

```
src/components/ui/button.tsx    ← shadcn file, never edit
src/lib/utils.ts                ← cn() utility, unchanged
tsconfig.json                   ← unchanged
eslint.config.mjs               ← unchanged
postcss.config.mjs              ← unchanged
components.json                 ← shadcn config, unchanged
.gitignore / .env.*             ← unchanged
```

**Directories NOT created in this story (belong to later stories):**

```
src/components/sections/        ← Epic 2
src/data/                       ← Epic 2
src/types/                      ← Epic 2
src/lib/analytics.ts            ← Story 3.1
src/lib/github.ts               ← Story 2.3
public/cv.pdf                   ← Story 2.4
public/og-image.png             ← Story 1.4
public/sitemap.xml              ← Story 1.4
public/robots.txt               ← Story 1.4
netlify.toml                    ← Story 1.3
```

### Alignment with Unified Project Structure

Architecture specifies: `next.config.ts ← output: 'export', image domains`. The `image domains` note in the architecture diagram refers to future `remotePatterns` for external images — not needed in Story 1.2 since no external images are referenced yet. Add only what is needed for the static export build to succeed.

### References

- Static export requirement: [architecture.md — Core Architectural Decisions / Frontend Architecture](../_bmad-output/planning-artifacts/architecture.md)
- Font specification: [architecture.md — External Integration Points table (next/font row)](../_bmad-output/planning-artifacts/architecture.md)
- `next.config.ts` structure: [architecture.md — Complete Project Directory Structure](../_bmad-output/planning-artifacts/architecture.md)
- Story ACs (BDD format): [epics.md — Story 1.2](../_bmad-output/planning-artifacts/epics.md)
- Anti-patterns: [architecture.md — Enforcement Guidelines / Anti-Patterns to Reject](../_bmad-output/planning-artifacts/architecture.md)
- Previous story completion notes: [1-1-initialize-nextjs-project-with-shadcn-ui.md — Dev Agent Record](./1-1-initialize-nextjs-project-with-shadcn-ui.md)

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6 (GitHub Copilot — bmad-agent-bmm-dev mode)

### Debug Log References

_none_

### Completion Notes List

- Task 1: Added `output: 'export'` and `images: { unoptimized: true }` to `next.config.ts`. `npm run build` exits 0, `/out/` directory created with `index.html`.
- Task 2: Removed Geist/Geist_Mono font imports; added Inter, Plus_Jakarta_Sans, JetBrains_Mono via `next/font/google`. `class="dark"` retained on `<html>`. `npm run lint` exits 0 with zero warnings.
- Task 3: Updated `@theme inline` block in `globals.css` — replaced `--font-geist-sans`/`--font-geist-mono` references with `--font-inter`/`--font-jetbrains-mono`; added `--font-display: var(--font-plus-jakarta-sans)`. No `:root {}` tokens touched.
- Task 4: Replaced `page.tsx` placeholder with `<main>` containing four `<section>` elements (`id`: hero, about, portfolio, contact). `cn()` import removed (no longer needed). `export default` retained per App Router convention.
- Task 5: `npm run lint` → exit 0. `npm run build` → exit 0. `/out/index.html` confirmed present with all four section IDs. No `src/app/api/` or `middleware.ts` found.

### File List

- next.config.ts
- src/app/layout.tsx
- src/app/globals.css
- src/app/page.tsx

## Senior Developer Review (AI)

**Review Date:** 2026-02-26
**Reviewer Model:** Claude Sonnet 4.6 (GitHub Copilot — bmad-agent-bmm-dev mode)
**Outcome:** Changes Requested (3 LOW — all fixed in session)

### Action Items

- [x] [LOW] `next.config.ts`: Add `trailingSlash: true` for Netlify static hosting compatibility — direct URL access without trailing slash returns 404 on Netlify [next.config.ts]
- [x] [LOW] `layout.tsx`: Add explicit `display: "swap"` to all three font instantiations for intent clarity [src/app/layout.tsx]
- [x] [LOW] `page.tsx`: Remove redundant `bg-background text-foreground` on `<main>` — already applied globally via `@layer base body {}` in globals.css [src/app/page.tsx]

### Resolution Notes

All 3 LOW findings fixed in code review session. `npm run lint` → exit 0. `npm run build` → exit 0. Story approved and marked done.
