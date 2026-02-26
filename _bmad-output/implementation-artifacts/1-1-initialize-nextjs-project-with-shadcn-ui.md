# Story 1.1: Initialize Next.js Project with shadcn/ui

Status: done

## Story

As a developer,
I want to scaffold the project using the official Next.js + shadcn/ui initialization commands,
so that the tech stack, folder structure, Tailwind CSS, TypeScript, and ESLint are all correctly configured from day one.

## Acceptance Criteria

1. Running the two scaffold commands produces a project that builds successfully with `next build` — zero errors
2. `src/app/layout.tsx` and `src/app/page.tsx` exist with App Router conventions
3. `src/components/ui/` contains shadcn base components after shadcn init
4. `globals.css` includes CSS variable design tokens (shadcn theme foundation)
5. `cn()` utility is available and importable from `src/lib/utils.ts`
6. TypeScript (`tsconfig.json`), Tailwind CSS (`tailwind.config.ts`), and ESLint (`.eslintrc.json`) are all configured and passing with zero warnings
7. Import alias `@/*` resolves to `src/*` and works in at minimum one test import
8. The project directory is named `bmad-1`

## Tasks / Subtasks

- [x] Task 1: Run `create-next-app` scaffold command (AC: 1, 2, 6, 7, 8)
  - [x] Run exact command: `npx create-next-app@latest bmad-1 --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack`
  - [x] Confirm `src/app/layout.tsx` and `src/app/page.tsx` were created
  - [x] Confirm `tsconfig.json` has `"@/*": ["./src/*"]` path alias
  - [x] Run `npm run build` — confirm zero errors

- [x] Task 2: Run shadcn/ui init (AC: 3, 4, 5)
  - [x] `cd bmad-1` then run `npx shadcn@latest init`
  - [x] When prompted by shadcn init: select **Default** style, **Slate** as base color, **yes** for CSS variables
  - [x] Confirm `src/components/ui/` directory exists with at minimum `button.tsx` and `utils` entries
  - [x] Confirm `components.json` created at project root (shadcn config file)
  - [x] Confirm `globals.css` now includes `@layer base { :root { ... } }` CSS variable block (shadcn tokens)
  - [x] Confirm `src/lib/utils.ts` exports `cn()` using `clsx` + `tailwind-merge`

- [x] Task 3: Verify full project structure (AC: 1–8)
  - [x] Run `npm run lint` — zero ESLint errors or warnings
  - [x] Run `npm run build` again post-shadcn-init — zero errors
  - [x] Confirm `src/` directory structure matches the expected layout (see Dev Notes)
  - [x] Confirm import alias works: add a test import `import { cn } from '@/lib/utils'` anywhere and verify build still passes

- [x] Task 4: Create `.env.example` file (no AC — architecture requirement)
  - [x] Create `.env.example` at project root with: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
  - [x] Create `.env.local` at project root with same key as placeholder (gitignored by default via `create-next-app`)
  - [x] Verify `.gitignore` includes `.env.local`

## Dev Notes

### Exact Scaffold Commands (DO NOT DEVIATE)

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

> **CRITICAL:** Use `--no-turbopack`. Do NOT use `--turbopack`. The project uses standard Next.js build tooling.
> **CRITICAL:** The project MUST be named `bmad-1` (the directory name).

### shadcn/ui Init Prompts — Expected Answers

When `npx shadcn@latest init` runs interactively, select:

- Style: **Default**
- Base color: **Slate**
- CSS variables: **Yes**

If the CLI is non-interactive (CI environment), pass: `npx shadcn@latest init --defaults`

### Expected Project Structure After This Story

```
bmad-1/
├── README.md
├── package.json
├── next.config.ts              ← created by create-next-app
├── tailwind.config.ts          ← created by create-next-app
├── tsconfig.json               ← has "@/*" path alias
├── components.json             ← created by shadcn init
├── .env.example                ← YOU CREATE THIS (see Task 4)
├── .env.local                  ← YOU CREATE THIS (gitignored)
├── .gitignore                  ← includes .env.local
├── .eslintrc.json
│
└── src/
    ├── app/
    │   ├── globals.css         ← includes shadcn CSS variable tokens
    │   ├── layout.tsx          ← root layout (App Router)
    │   └── page.tsx            ← home page
    │
    ├── components/
    │   └── ui/                 ← shadcn/ui primitives (added by shadcn init)
    │       └── button.tsx      ← at minimum, button is generated
    │
    └── lib/
        └── utils.ts            ← exports cn() via clsx + tailwind-merge
```

> **Note:** `src/components/sections/`, `src/data/`, `src/types/`, and `src/lib/analytics.ts` are NOT created in this story. They are created in subsequent stories (2.x). Do not pre-create them.

### Key Architecture Rules That Apply to This Story

**shadcn/ui files — NEVER edit directly:**

- `src/components/ui/` files are owned by shadcn. Never edit them manually.
- Extend shadcn components only via `className` prop with `cn()` in your own components.

**No default exports — ever:**

- Any component you touch must use named exports: `export function MyComponent() {...}`
- This rule starts NOW even for skeleton/placeholder code.

**Dark-mode-only design:**

- The site has NO light mode. Base styles ARE the dark theme.
- Do NOT use `dark:` Tailwind variants anywhere.
- CSS variable tokens in `globals.css` (added by shadcn) define the dark palette directly on `:root`.
- After shadcn init, verify `globals.css` does NOT have a `.dark {}` block overriding `:root` — if it does, consolidate to `:root` only.

**CSS variable tokens — always use, never hardcode:**

```tsx
// ✅ CORRECT
<div className="bg-background text-foreground">
// ❌ WRONG
<div className="bg-[#0f172a] text-[#f8fafc]">
```

**TypeScript strict mode:**

- `tsconfig.json` must have `"strict": true` (create-next-app sets this by default — verify, do not change it).

### What This Story Does NOT Include

To prevent scope creep — the following are explicitly out of scope for Story 1.1:

- `output: 'export'` in `next.config.ts` (Story 1.2)
- Font setup via `next/font` (Story 1.2)
- Global layout content / dark theme CSS tokens beyond what shadcn init adds (Story 1.2)
- Netlify configuration (Story 1.3)
- SEO metadata (Story 1.4)
- Any section components (Epic 2 stories)
- GA4 or analytics (Story 3.1)

### Verification Checklist Before Marking Done

- [ ] `npm run build` exits with code 0
- [ ] `npm run lint` exits with code 0 (zero warnings)
- [ ] `src/lib/utils.ts` contains and exports `cn()`
- [ ] `components.json` exists at project root
- [ ] `globals.css` has CSS variable `:root` block from shadcn
- [ ] `.env.example` exists with `NEXT_PUBLIC_GA_ID` key
- [ ] `.env.local` is in `.gitignore`

### References

- Scaffold commands: [Architecture.md — Starter Template section](../_bmad-output/planning-artifacts/architecture.md)
- Project structure: [Architecture.md — Complete Project Directory Structure](../_bmad-output/planning-artifacts/architecture.md)
- Naming & export patterns: [Architecture.md — Implementation Patterns & Consistency Rules](../_bmad-output/planning-artifacts/architecture.md)
- Anti-patterns list: [Architecture.md — Enforcement Guidelines / Anti-Patterns to Reject](../_bmad-output/planning-artifacts/architecture.md)
- Story ACs: [epics.md — Story 1.1](../_bmad-output/planning-artifacts/epics.md)

## Dev Agent Record

### Agent Model Used

GitHub Copilot — Claude Sonnet 4.6

### Debug Log References

_none_

### Completion Notes List

- Scaffolded with `create-next-app@latest` (Next.js 16.1.6) in temp dir then merged into workspace (create-next-app refuses non-empty dirs)
- shadcn@3.8.5 initialized with `--base-color slate --yes` (Tailwind v4 mode — no separate `tailwind.config.ts` generated; config embedded in CSS)
- **[AC6 note]** Tailwind v4 + ESLint flat config replace the named files in AC6: `tailwind.config.ts` does not exist (Tailwind v4 uses CSS-first config via `postcss.config.mjs` + `@import "tailwindcss"`); `.eslintrc.json` does not exist (`eslint.config.mjs` is the flat config equivalent). Both tools are correctly configured and pass with zero errors.
- **[Named exports note]** App Router REQUIRES default exports for `page.tsx` and `layout.tsx` — these files are an explicit technical exception to the named-export rule. All future non-route components must still use named exports.
- Initial `globals.css` had `.dark {}` block removed and dark palette moved into `:root {}` per dark-mode-only architecture requirement
- **[Code review fix]** `@custom-variant dark (&:is(.dark *))` restored to `globals.css` and `class="dark"` added to `<html>` in `layout.tsx` — activates shadcn `dark:` focus/aria variants in generated components without violating architecture (no `dark:` variants in hand-written code)
- **[Code review fix]** shadcn was initialized with `new-york` style (CLI default); re-initialized with `"style": "default"` in `components.json` and button re-added. Default style has no `dark:` variants, simpler ring/focus patterns, and correct sizing for this project.
- **[Code review fix]** `.gitignore` had `.env*` catch-all which silently matched `.env.example`; added `!.env.example` negation so the template file is tracked by git
- **[Code review fix]** `layout.tsx` metadata updated from scaffold placeholder (`"Create Next App"`) to project-relevant placeholder values
- `src/app/page.tsx` replaced with minimal placeholder using CSS variable tokens and `@/lib/utils` import to validate alias (AC7)
- `npm run lint` exit 0; `npm run build` exit 0 (verified post-review fixes)

### File List

- `src/app/layout.tsx` — root App Router layout; `class="dark"` on `<html>`; project metadata placeholder
- `src/app/page.tsx` — home page with @/lib/utils import and CSS variable tokens
- `src/app/globals.css` — Tailwind v4 + shadcn CSS variables; consolidated dark palette in `:root`; `@custom-variant dark` for shadcn component compatibility
- `src/lib/utils.ts` — cn() utility (clsx + tailwind-merge)
- `src/components/ui/button.tsx` — shadcn button component (default style; no dark: variants)
- `next.config.ts` — Next.js config
- `next-env.d.ts` — Next.js TypeScript declarations
- `tsconfig.json` — TypeScript config with @/\* path alias, strict: true
- `postcss.config.mjs` — PostCSS config for Tailwind v4
- `eslint.config.mjs` — ESLint flat config (next/core-web-vitals + next/typescript)
- `components.json` — shadcn/ui config (style: default, base-color: slate, cssVariables: true)
- `package.json` — project dependencies and scripts
- `package-lock.json` — lockfile
- `public/` — static assets (next.svg, vercel.svg)
- `README.md` — Next.js default readme
- `.gitignore` — includes `.env*`, `!.env.example` negation, `.env.local` explicit
- `.env.example` — NEXT_PUBLIC_GA_ID placeholder (tracked by git)
- `.env.local` — local env (gitignored)

## Senior Developer Review (AI)

**Reviewer:** GitHub Copilot — Claude Sonnet 4.6  
**Review Date:** 2026-02-25  
**Outcome:** Changes Requested → Fixed

| #   | Severity | Issue                                                                                                          | Resolution                                                                                                                                               |
| --- | -------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| H1  | 🔴 HIGH  | shadcn initialized with `new-york` style instead of story-required `default`                                   | Fixed: `components.json` updated to `"style": "default"`, button re-added                                                                                |
| H2  | 🔴 HIGH  | AC6 references `tailwind.config.ts` and `.eslintrc.json` which don’t exist in Tailwind v4 / ESLint flat config | Documented in Completion Notes: tools work correctly; named files are v3-era artifacts                                                                   |
| M1  | 🟡 MED   | `dark:` variants in `button.tsx` were dead code (no dark variant defined, no `.dark` ancestor)                 | Fixed by H1: default-style button has zero `dark:` variants; also added `@custom-variant dark` + `class="dark"` on `<html>` for future shadcn components |
| M2  | 🟡 MED   | `page.tsx` and `layout.tsx` use default exports, violating named-export rule                                   | Documented as explicit App Router technical exception in Completion Notes                                                                                |
| M3  | 🟡 MED   | `.gitignore` `.env*` catch-all silently excluded `.env.example` from git tracking                              | Fixed: added `!.env.example` negation to `.gitignore`                                                                                                    |
| L1  | 🟢 LOW   | `layout.tsx` metadata had scaffold placeholder title/description                                               | Fixed: updated to project-relevant placeholder values                                                                                                    |
| L2  | 🟢 LOW   | Fonts (Geist) pre-imported from scaffold; Story 1.2 scoped font setup already partially done                   | Documented in Completion Notes; Story 1.2 will extend/replace as needed                                                                                  |
