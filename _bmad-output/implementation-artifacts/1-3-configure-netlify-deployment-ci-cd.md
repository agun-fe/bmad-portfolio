# Story 1.3: Configure Netlify Deployment & CI/CD

Status: in-progress

## Story

As a developer,
I want to initialise a Git repository, push the project to GitHub, and connect it to Netlify with auto-deploy on push to `main`,
so that every merge to `main` triggers an automatic production deployment with no manual steps.

## Acceptance Criteria

1. A Git repository is initialised, all project files committed, and the repository pushed to GitHub (new public or private repo under Agun's GitHub account)
2. The Netlify site is connected to the GitHub repository with auto-deploy enabled on the `main` branch
3. `netlify.toml` exists at the project root, specifying build command `npm run build` and publish directory `out`
4. A successful first production deploy is confirmed — the site is accessible at a public Netlify URL (e.g., `https://bmad-1.netlify.app` or similar)
5. HTTPS is enforced at the CDN level — the Netlify URL serves only over HTTPS with no plain HTTP fallback
6. `.env.example` exists at the project root documenting `NEXT_PUBLIC_GA_ID=` (empty value, shows env var is required)
7. `.env.local` is gitignored — it does not appear in the GitHub repository
8. `NEXT_PUBLIC_GA_ID` environment variable is configured in the Netlify dashboard with a placeholder value (e.g., `G-PLACEHOLDER`) — confirmed visible under Site Settings → Environment Variables
9. A subsequent push to `main` (e.g., adding a README update) triggers an automatic Netlify deploy without any manual action
10. `npm run build` exits with code 0 locally and produces the `/out/` directory before pushing

## Tasks / Subtasks

- [ ] Task 1: Initialise Git repository and push to GitHub (AC: 1, 7)
  - [x] Run `git init` in project root
  - [x] Verify `.gitignore` covers `.env.local`, `node_modules/`, `.next/`, `out/` — add any missing entries
  - [x] Run `git add .` and `git commit -m "feat: project scaffold with static export, fonts, and section placeholders"`
  - [ ] Create a new repository on GitHub (github.com → New repository → name: `bmad-1`) ⚠️ MANUAL STEP
  - [ ] Add remote: `git remote add origin https://github.com/<username>/bmad-1.git` ⚠️ MANUAL STEP
  - [ ] Push: `git push -u origin main` ⚠️ MANUAL STEP
  - [ ] Verify `.env.local` does NOT appear in the pushed repo ⚠️ MANUAL STEP

- [ ] Task 2: Add `netlify.toml` configuration file (AC: 3)
  - [x] Create `netlify.toml` at project root with the following content (see Dev Notes for exact file)
  - [ ] Commit and push `netlify.toml` to `main` ⚠️ MANUAL STEP (committed locally; push pending GitHub setup)

- [ ] Task 3: Add `.env.example` file (AC: 6)
  - [x] Create `.env.example` at project root documenting all required environment variables
  - [ ] Commit and push `.env.example` to `main` ⚠️ MANUAL STEP (committed locally; push pending GitHub setup)

- [ ] Task 4: Connect repository to Netlify and configure site (AC: 2, 4, 5, 8)
  - [ ] Log in to Netlify (netlify.com) → "Add new site" → "Import an existing project" ⚠️ MANUAL STEP
  - [ ] Connect GitHub account and select the `bmad-1` repository ⚠️ MANUAL STEP
  - [ ] Confirm Netlify auto-detects build settings from `netlify.toml` (build command: `npm run build`, publish dir: `out`) ⚠️ MANUAL STEP
  - [ ] Trigger the first deploy — watch build logs for errors ⚠️ MANUAL STEP
  - [ ] Confirm site is live at the assigned Netlify URL (e.g., `https://bmad-1.netlify.app`) ⚠️ MANUAL STEP
  - [ ] Confirm HTTPS is active — accessing the URL via `http://` redirects to `https://` ⚠️ MANUAL STEP
  - [ ] Go to Site Settings → Environment Variables → Add variable: `NEXT_PUBLIC_GA_ID` = `G-PLACEHOLDER` ⚠️ MANUAL STEP

- [ ] Task 5: Verify auto-deploy trigger (AC: 9)
  - [ ] Make a minor change locally (e.g., update `README.md` with the live Netlify URL) ⚠️ MANUAL STEP
  - [ ] Commit: `git commit -m "docs: add live site URL to README"` ⚠️ MANUAL STEP
  - [ ] Push to `main` — verify Netlify triggers a new deploy automatically in the Netlify dashboard ⚠️ MANUAL STEP

- [x] Task 6: Final local verification (AC: 10)
  - [x] Run `npm run build` locally — confirm exit code 0 and `/out/` directory is produced
  - [x] Run `npm run lint` — confirm exit code 0, zero warnings

## Dev Notes

### Context: What Was Built in Stories 1.1 and 1.2

Story 1.1 scaffolded the Next.js project with `create-next-app@latest + shadcn init`. Story 1.2 configured `output: 'export'` with `images: { unoptimized: true }` in `next.config.ts`, replaced Geist fonts with Inter + Plus Jakarta Sans + JetBrains Mono via `next/font`, updated `globals.css` `@theme inline` font variables, and created the four section placeholder structure in `page.tsx` (`#hero`, `#about`, `#portfolio`, `#contact`).

The project is fully static-export ready. Every `next build` produces `/out/` as the deploy artifact. This is what Netlify will serve.

### `netlify.toml` — Exact File Content

```toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "20"
```

**Why each setting:**

- `command = "npm run build"` — runs `next build` which produces the static `/out/` export
- `publish = "out"` — tells Netlify to serve the `/out/` directory (not the default `.next/`)
- `NODE_VERSION = "20"` — pins Node.js to LTS 20 for build reproducibility; avoids Netlify defaulting to an older Node version

> **Critical:** Without `publish = "out"`, Netlify would look for a `.next/` directory and fail to find deployable files.

### `.env.example` — Exact File Content

```
# Required environment variables
# Copy this file to .env.local and fill in the values

# Google Analytics 4 Measurement ID
# Get this from: https://analytics.google.com → Admin → Data Streams → Web → Measurement ID
# Format: G-XXXXXXXXXX
NEXT_PUBLIC_GA_ID=
```

> **Note:** `.env.local` holds the actual value and must NEVER be committed. `.env.example` documents the shape of required env vars and IS committed.

### `.gitignore` Verification — Entries That Must Be Present

The scaffold-generated `.gitignore` should already include most of these. Verify all are present:

```
# Environment variables
.env.local
.env*.local

# Next.js build output
.next/
out/

# Dependencies
node_modules/
```

> Do **not** add `.env.example` to `.gitignore` — it must be committed.

### Netlify Build Settings — What to Expect

When you import the project from GitHub, Netlify will attempt auto-detect. Because `netlify.toml` is present, Netlify will use it and skip the manual configuration step. You should see:

| Setting           | Expected Value           |
| ----------------- | ------------------------ |
| Build command     | `npm run build`          |
| Publish directory | `out`                    |
| Node version      | 20 (from `netlify.toml`) |

If Netlify shows different values, override manually to match the table above before deploying.

### NEXT_PUBLIC_GA_ID Placeholder Strategy

GA4 integration is built in Epic 3 (Story 3.1). The env var is configured now as a placeholder (`G-PLACEHOLDER`) so that:

1. The build process doesn't fail on a missing env var
2. When Story 3.1 creates `src/lib/analytics.ts` and wires up GA4, the env var slot already exists in Netlify and only needs to be updated with the real Measurement ID

> The `G-PLACEHOLDER` value will not send data to any GA4 property. It is safe to deploy.

### Architecture Constraints Active in This Story

From [architecture.md](../../planning-artifacts/architecture.md#Infrastructure--Deployment):

- Build output: `next build` → `output: 'export'` → `/out/` directory — this is the Netlify publish target
- CI/CD: Netlify auto-deploys on push to `main` — no Netlify CLI, no GitHub Actions, no separate pipeline needed
- HTTPS: Netlify enforces HTTPS at CDN level automatically — zero configuration required
- `NEXT_PUBLIC_GA_ID` env var must be set in Netlify dashboard — never committed to source code

**output: 'export' constraints** (from Story 1.2, carried forward — do not introduce these):

- No `src/app/api/` routes
- No Server Actions (`'use server'`)
- No `src/middleware.ts`
- `next/image` requires `unoptimized: true` (already configured in `next.config.ts`)

### Netlify Forms: Deferred to Story 2.5

The AC "Netlify Forms integration is active" refers to the fact that Netlify must **detect** the contact form at deploy time from the static HTML output. The actual contact form markup (`data-netlify="true"` on the `<form>` + hidden `form-name` input) is created in Story 2.5.

In this story, there is no contact form markup yet — that is correct and expected. Netlify Forms detection will be verified as part of Story 2.5 after the `ContactSection.tsx` component is built and deployed.

**You do NOT need to create any form markup in this story.**

### Node.js Version Recommendation

Use Node.js 20 LTS locally to match the Netlify build environment. Verify with `node --version`. If your local version differs, the build may produce different outputs. The `netlify.toml` `NODE_VERSION = "20"` pin ensures Netlify always uses Node 20.

### Previous Story Intelligence (Stories 1.1 and 1.2)

Key learnings that carry forward:

1. **Tailwind v4** — No `tailwind.config.ts` file. Config is CSS-first via `globals.css` `@theme inline` block. Do not create or reference `tailwind.config.ts`.

2. **ESLint flat config** — `eslint.config.mjs` (not `.eslintrc.json`). `npm run lint` uses this file.

3. **`class="dark"` on `<html>`** — Required for shadcn/ui CSS variable activation. Must remain on `<html>` in `layout.tsx`. Do not remove.

4. **`page.tsx` uses `export default`** — App Router technical exception. This is the ONLY component in the project that uses `export default`. All future components use named exports.

5. **`next.config.ts` exact current state:**

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

   Do not modify `next.config.ts` in this story.

6. **Four section placeholders in `page.tsx`** — `#hero`, `#about`, `#portfolio`, `#contact` are present as minimal `<section>` elements. Do not add or remove sections in this story.

### References

- [Architecture — Infrastructure & Deployment](../../planning-artifacts/architecture.md) — CI/CD, Netlify, env vars, build output
- [Architecture — Core Architectural Decisions](../../planning-artifacts/architecture.md) — `output: 'export'` constraints
- [Story 1.2 — Dev Notes](./1-2-configure-static-export-global-layout-fonts.md) — `next.config.ts` state, font setup, constraints
- [Epics — Story 1.3 Acceptance Criteria](../../planning-artifacts/epics.md) — canonical AC source
- Netlify Docs: [Build configuration with netlify.toml](https://docs.netlify.com/configure-builds/file-based-configuration/)
- Netlify Docs: [Environment variables](https://docs.netlify.com/environment-variables/overview/)

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6 (GitHub Copilot)

### Debug Log References

None — all steps executed cleanly.

### Completion Notes List

- **Task 1 (partial):** `git init` run, branch renamed to `main`, `.gitignore` verified (pre-existing; covers `.env.local` via `.env*` + explicit `.env.local` lines, `node_modules/`, `/.next/`, `/out/`). `git add .` staged all project files; `.env.local` confirmed absent (gitignored). Commit `30c8a76` created: `"feat: project scaffold with static export, fonts, and section placeholders"`. GitHub repo creation, remote add, and push require manual user action (external service — no programmatic access).
- **Task 2:** `netlify.toml` created at project root matching spec exactly: `command = "npm run build"`, `publish = "out"`, `NODE_VERSION = "20"`. Included in initial commit `30c8a76`. Push pending GitHub setup.
- **Task 3:** `.env.example` existed with incorrect value `G-XXXXXXXXXX`; updated to match spec exactly (empty `NEXT_PUBLIC_GA_ID=` + header comments). Included in initial commit `30c8a76`. Push pending GitHub setup.
- **Tasks 4 & 5:** External service operations (Netlify dashboard, GitHub push, deploy verification). Cannot be automated — require user to complete manually. See ⚠️ MANUAL STEP markers in task list above.
- **Task 6:** `npm run build` — exit code 0, `/out/` directory produced with static HTML. `npm run lint` — exit code 0, zero warnings.
- **Testing note:** This story contains no application code changes. All deliverables are configuration files, git operations, and external service setup. No unit/integration tests are applicable. Verification is by build success, lint pass, and deployment confirmation (manual).

### File List

- `netlify.toml` (new)
- `.env.example` (modified — updated to spec-compliant content with comments and empty value)

### Change Log

- 2026-02-26: Created `netlify.toml` (build config for Netlify static export). Updated `.env.example` (corrected to spec with header comments and empty `NEXT_PUBLIC_GA_ID=`). Initialised git repository on `main` branch with initial commit `30c8a76`. `npm run build` and `npm run lint` pass. Remaining tasks (GitHub push, Netlify connect, deploy verification) require manual user action.
