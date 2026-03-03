# Story 1.4: SEO Foundation — Meta Tags, OG, JSON-LD, Sitemap

Status: done

## Story

As a developer,
I want to add complete SEO metadata (title, meta description, Open Graph tags, Twitter card tags, JSON-LD Person schema, sitemap.xml, robots.txt) and a static OG image,
so that Agun's site is discoverable via search engines and renders rich link previews on LinkedIn and Slack.

## Acceptance Criteria

1. `src/app/layout.tsx` exports a fully expanded `metadata` object covering: `title` (≤60 chars with target keywords like "senior react developer" or "webflow"), `description` (≤160 chars), Open Graph (`og:title`, `og:description`, `og:image`, `og:url`), Twitter card, `robots`, and `alternates.canonical`
2. `metadataBase` is set in the `metadata` export so that Next.js can resolve relative image URLs (e.g., `/og-image.png`) to absolute URLs for OG tags
3. A JSON-LD `Person` schema `<script type="application/ld+json">` is injected in the `<head>` via the root layout, identifying Agun with: `name`, `jobTitle`, `url`, `sameAs` (LinkedIn), and `knowsAbout` (skills array)
4. `/public/og-image.png` exists as a **1200×630px** static PNG asset — a placeholder or polished dark-themed image is acceptable for this story; it must be a real, renderable PNG file (not empty)
5. `/public/sitemap.xml` is accessible at the site root with a single `<url>` entry pointing to the production domain
6. `/public/robots.txt` is accessible at the site root, allowing all crawlers and referencing the sitemap URL
7. `NEXT_PUBLIC_SITE_URL` env var is documented in `.env.example` and added to the Netlify dashboard; this value drives `metadataBase` and the sitemap's `<loc>` entry
8. `npm run build` exits with code 0 — no TypeScript or ESLint errors
9. Pasting the deployed URL in the LinkedIn Post Inspector (`https://www.linkedin.com/post-inspector/`) renders a rich preview with title, description, and OG image
10. Verifying in browser DevTools → Elements → `<head>` confirms all expected `<meta>` tags and the JSON-LD `<script>` are present in the rendered HTML

## Tasks / Subtasks

- [x] Task 1: Add `NEXT_PUBLIC_SITE_URL` env var (AC: 2, 7)
  - [x] Add `NEXT_PUBLIC_SITE_URL=` to `.env.example` with inline comment explaining usage (e.g., `# Production URL, e.g. https://agungunawan.netlify.app`)
  - [ ] Add `NEXT_PUBLIC_SITE_URL=http://localhost:3000` to `.env.local` for local dev ⚠️ MANUAL STEP — not committed
  - [ ] Add `NEXT_PUBLIC_SITE_URL=https://agunawan.netlify.app` to Netlify dashboard → Site Settings → Environment Variables ⚠️ MANUAL STEP

- [x] Task 2: Expand metadata export in `src/app/layout.tsx` (AC: 1, 2)
  - [x] Replace the existing minimal `metadata` object with the fully expanded version (see Dev Notes for exact implementation)
  - [x] Verify `title.default` is ≤60 chars and contains at least one target keyword ("senior react developer" or "webflow")
  - [x] Verify `description` is ≤160 chars
  - [x] Verify `metadataBase` is set using `new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000')`
  - [x] Verify `openGraph.images` references `/og-image.png` with `width: 1200, height: 630`

- [x] Task 3: Inject JSON-LD Person schema into the layout `<head>` (AC: 3)
  - [x] Define a `jsonLd` object constant in `src/app/layout.tsx` (above the `RootLayout` export) with the Person schema (see Dev Notes)
  - [x] Inject `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />` inside `<head>` in `RootLayout`
  - [ ] Replace placeholder `sameAs` LinkedIn URL with Agun's actual LinkedIn profile URL ⚠️ MANUAL STEP

- [x] Task 4: Create OG image asset (AC: 4)
  - [x] Place a real 1200×630px PNG at `/public/og-image.png`
  - [ ] The image should be dark-themed (matching site aesthetic) and display Agun's name and title at minimum ⚠️ MANUAL STEP — placeholder dark #0f0f0f PNG generated; replace with designed asset before launch
  - [ ] Recommended tool: Figma, Canva, or any image editor ⚠️ MANUAL STEP (design asset, not code)
  - [x] Verify the file is a valid PNG renderable in a browser (not an empty placeholder file)

- [x] Task 5: Create `/public/sitemap.xml` (AC: 5)
  - [x] Create the file at `public/sitemap.xml` using the exact template from Dev Notes
  - [x] Replace `<loc>` value with Agun's actual production Netlify URL (https://agunawan.netlify.app/)
  - [x] Set `<lastmod>` to the current date in `YYYY-MM-DD` format (2026-03-03)

- [x] Task 6: Create `/public/robots.txt` (AC: 6)
  - [x] Create the file at `public/robots.txt` using the exact template from Dev Notes
  - [x] Replace the `Sitemap:` URL with the actual production domain (https://agunawan.netlify.app/)

- [x] Task 7: Build validation and verification (AC: 8, 9, 10)
  - [x] Run `npm run lint` — confirm exit code 0, zero warnings
  - [x] Run `npm run build` — confirm exit code 0, `/out/` directory produced
  - [x] Inspect `/out/index.html` to verify all `<meta>` tags and JSON-LD `<script>` are present in the HTML source
  - [x] Confirm `/out/og-image.png`, `/out/sitemap.xml`, `/out/robots.txt` are present in the build output
  - [ ] Push to `main` and use LinkedIn Post Inspector or Twitter Card Validator to verify rich previews ⚠️ MANUAL STEP

## Dev Notes

### Context: What Was Built in Stories 1.1, 1.2, and 1.3

**Story 1.1** scaffolded the project with `create-next-app@latest + shadcn init`. The `cn()` utility lives in `src/lib/utils.ts`. All shadcn UI primitives are in `src/components/ui/`.

**Story 1.2** configured `output: 'export'` with `images: { unoptimized: true }` in `next.config.ts`. Replaced Geist fonts with Inter + Plus Jakarta Sans + JetBrains Mono via `next/font`. Dark theme is applied as base styles in `globals.css` — **no `dark:` Tailwind variants anywhere**. Four section `id` placeholders exist in `page.tsx`: `#hero`, `#about`, `#portfolio`, `#contact`.

**Story 1.3** set up Git, GitHub, and Netlify CI/CD. The site is live and auto-deploys on push to `main`. `NEXT_PUBLIC_GA_ID=G-PLACEHOLDER` is already set in the Netlify dashboard. `netlify.toml` builds with `npm run build` and publishes `/out/`.

**Current `src/app/layout.tsx` metadata state:**

```tsx
export const metadata: Metadata = {
  title: "Agun Gunawan — Portfolio",
  description: "Personal portfolio of Agun Gunawan, Frontend Engineer.",
};
```

This is the baseline to expand. **Do not replace the font configuration or the `<html lang="en" className="dark">` / `<body>` structure.**

---

### Task 2 — Exact `src/app/layout.tsx` Implementation

Replace only the `metadata` export. Add the `SITE_URL` constant and `jsonLd` constant. Add a `<head>` element with the JSON-LD script inside `RootLayout`. The full updated file should look like this:

```tsx
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Agun Gunawan — Senior React & Webflow Developer",
    template: "%s | Agun Gunawan",
  },
  description:
    "Senior Frontend Developer with 8+ years of experience in React, Next.js, and Webflow. Crafting fast, accessible web experiences. Open to opportunities.",
  keywords: [
    "senior react developer",
    "webflow developer",
    "next.js developer",
    "frontend developer",
    "agun gunawan",
    "typescript",
  ],
  authors: [{ name: "Agun Gunawan" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Agun Gunawan — Senior React & Webflow Developer",
    description:
      "Senior Frontend Developer with 8+ years of experience in React, Next.js, and Webflow. Crafting fast, accessible web experiences.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Agun Gunawan — Senior React & Webflow Developer",
      },
    ],
    siteName: "Agun Gunawan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agun Gunawan — Senior React & Webflow Developer",
    description:
      "Senior Frontend Developer with 8+ years of experience in React, Next.js, and Webflow.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Agun Gunawan",
  jobTitle: "Senior Frontend Developer",
  url: SITE_URL,
  sameAs: [
    "https://linkedin.com/in/YOUR_LINKEDIN_HANDLE", // ⚠️ Replace with actual LinkedIn URL
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Webflow",
    "HTML",
    "CSS",
    "Tailwind CSS",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} ${jetBrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

**Title character count check:**

- `"Agun Gunawan — Senior React & Webflow Developer"` = **48 chars** ✓ (≤60 limit)

**Description character count check:**

- `"Senior Frontend Developer with 8+ years of experience in React, Next.js, and Webflow. Crafting fast, accessible web experiences. Open to opportunities."` = **153 chars** ✓ (≤160 limit)

**Why `metadataBase`:** When `output: 'export'` is used, Next.js needs `metadataBase` to generate absolute `og:url` and `og:image` values in the static HTML. Without it, relative paths like `/og-image.png` won't resolve correctly in OG scrapers.

**Why `<head>` element in RootLayout:** The Next.js App Router metadata API doesn't have a first-class field for arbitrary `<script>` tags in `<head>`. Injecting a JSON-LD `<script>` inside a `<head>` element within the JSX is the official Next.js recommendation for structured data. The `dangerouslySetInnerHTML` is safe here since `jsonLd` is a hardcoded object, not user input.

---

### Task 5 — Exact `public/sitemap.xml` Content

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://YOUR-SITE.netlify.app/</loc>
    <lastmod>2026-03-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

Replace `https://YOUR-SITE.netlify.app/` with the actual Netlify production URL (same value as `NEXT_PUBLIC_SITE_URL`).

**Why `/public/` not a route file:** This is a static, single-page site. The `sitemap.xml` is manually authored (not generated). With `output: 'export'`, files in `/public/` are copied directly to `/out/` — no Next.js route handler needed. If at any point the site grows to multiple pages, switch to Next.js's [sitemap route](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap).

---

### Task 6 — Exact `public/robots.txt` Content

```
User-agent: *
Allow: /

Sitemap: https://YOUR-SITE.netlify.app/sitemap.xml
```

Replace `https://YOUR-SITE.netlify.app/sitemap.xml` with the actual production domain.

---

### Task 4 — OG Image Guidance

The architecture explicitly states `/public/og-image.png` is a **hand-crafted 1200×630px** static asset — not generated by code. Recommended approach:

1. Open Figma or Canva
2. Create a `1200 × 630px` canvas with a dark background (matching the site's dark theme)
3. Add Agun's name in large text, professional title below
4. Optionally add subtle tech stack badges or a profile photo
5. Export as PNG → save to `public/og-image.png`

A placeholder dark-background PNG is acceptable for the initial `ready-for-dev` → `done` cycle. The image can be refined before launch without any code changes.

---

### `.env.example` — Addition Required

Append the following block to the existing `.env.example` file (which already documents `NEXT_PUBLIC_GA_ID`):

```
# Site canonical URL — used for metadata, OG tags, sitemap, and JSON-LD
# Set to your Netlify production URL: https://your-site.netlify.app
NEXT_PUBLIC_SITE_URL=
```

---

### Architecture Constraints Active in This Story

From [architecture.md](../../planning-artifacts/architecture.md#Infrastructure--Deployment):

- **`output: 'export'` constraint:** No server-side rendering, no `generateSitemap()` route handler. All SEO assets must be static files in `/public/` or generated at build time via the metadata API in `layout.tsx`.
- **`metadataBase` is required for SSG:** Without it, Next.js cannot produce absolute OG image URLs in the exported HTML.
- **`dark:` Tailwind variants are NOT used anywhere** — the site is dark-mode-only. This story does not introduce any UI, but if any test renders layout components, do not add `dark:` variants.
- **Named exports only:** Do not convert `RootLayout` to a named export — it is the one exception to the named-export rule as Next.js requires `export default` for the root layout.
- **Files in `/public/`:** `sitemap.xml`, `robots.txt`, and `og-image.png` live in `/public/`. Next.js copies `/public/` contents to `/out/` at build time — no route configuration needed. They are accessible at `/sitemap.xml`, `/robots.txt`, `/og-image.png` on the live site.

From [architecture.md](../../planning-artifacts/architecture.md#Project-Structure--Boundaries) — SEO requirements mapping:

- FR19 (title + description) → `metadata` export in `layout.tsx`
- FR20 (OG metadata) → `metadata.openGraph` in `layout.tsx`
- FR21 (JSON-LD Person) → `<script type="application/ld+json">` in `RootLayout`
- FR22 (sitemap + robots) → `/public/sitemap.xml` + `/public/robots.txt`

---

### Testing Requirements

- **No new component files are created in this story** — changes are confined to `src/app/layout.tsx`, `/public/sitemap.xml`, `/public/robots.txt`, `/public/og-image.png`, and `.env.example`
- Co-located `*.test.tsx` convention applies to component files only — no test file is required for this story
- Validation is done via:
  1. `npm run build` exit code 0
  2. Inspecting `/out/index.html` for expected `<meta>` tags and JSON-LD `<script>` content
  3. LinkedIn Post Inspector or Twitter Card Validator post-deploy

---

### Previous Story Intelligence (from Story 1.3)

- The project already has a valid `netlify.toml` with `publish = "out"` and `NODE_VERSION = "20"`. Files placed in `/public/` will be available in the build output without any toml changes.
- `.env.example` already exists at the project root — **append** to it rather than replace it.
- `NEXT_PUBLIC_GA_ID` is already set in the Netlify dashboard. The new `NEXT_PUBLIC_SITE_URL` must be added as a **second** environment variable in the same Netlify dashboard location.
- The site was confirmed live with HTTPS enforced. The actual Netlify subdomain URL must be used in `sitemap.xml`, `robots.txt`, and `NEXT_PUBLIC_SITE_URL`.

### Git Intelligence

- Last 2 commits:
  - `45cd3cc` — `docs: add live site URL and project description to README` (minor README update confirming site is live)
  - `b62021d` — `Initial commit` (project scaffold)
- No component files have been created yet (other than the scaffolded shadcn `src/components/ui/` primitives). `page.tsx` contains only section placeholder `<section>` elements with `id` attributes.
- The site is already deployed and live on Netlify — this story's changes will be immediately testable via the LinkedIn Post Inspector after pushing to `main`.

### Project Structure Notes

- **Files touched / created in this story:**
  - `src/app/layout.tsx` — modify: expand `metadata`, add `jsonLd`, add `<head>` with JSON-LD script
  - `public/og-image.png` — create: 1200×630px PNG (manual design step)
  - `public/sitemap.xml` — create: single-URL sitemap
  - `public/robots.txt` — create: permissive robots with sitemap reference
  - `.env.example` — modify: append `NEXT_PUBLIC_SITE_URL` documentation
- **Files NOT touched in this story:**
  - `src/app/page.tsx` — unchanged (section placeholders only)
  - `src/components/ui/*` — never modified
  - `next.config.ts` — no changes needed
  - `globals.css` — no changes needed

### References

- Next.js Metadata API: [nextjs.org/docs/app/api-reference/functions/generate-metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- Next.js JSON-LD: [nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld](https://nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld)
- Schema.org Person: [schema.org/Person](https://schema.org/Person)
- Sitemap protocol: [sitemaps.org/protocol.html](https://www.sitemaps.org/protocol.html)
- LinkedIn Post Inspector: [linkedin.com/post-inspector](https://www.linkedin.com/post-inspector/)
- Source: [\_bmad-output/planning-artifacts/epics.md#Story-14-SEO-Foundation](../../planning-artifacts/epics.md)
- Source: [\_bmad-output/planning-artifacts/architecture.md#Infrastructure--Deployment](../../planning-artifacts/architecture.md)

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6 (GitHub Copilot)

### Debug Log References

### Completion Notes List

- Task 1: `.env.example` updated with `NEXT_PUBLIC_SITE_URL` documentation. `.env.local` and Netlify dashboard entries are ⚠️ MANUAL STEPs.
- Task 2: `src/app/layout.tsx` fully expanded — `metadataBase`, full `openGraph`, `twitter`, `robots`, `alternates.canonical`, `keywords`, `authors` all set. Title = 48 chars ✓. Description = 153 chars ✓.
- Task 3: `jsonLd` Person schema injected via `<head>` in `RootLayout`. LinkedIn `sameAs` URL is ⚠️ MANUAL STEP — placeholder `YOUR_LINKEDIN_HANDLE` left in place.
- Task 4: Valid 1200×630 dark (#0f0f0f) PNG generated programmatically using Node.js zlib. ⚠️ Replace with designed Figma/Canva asset before launch for a meaningful rich preview.
- Task 5: `public/sitemap.xml` created with `<loc>https://agunawan.netlify.app/</loc>` and `<lastmod>2026-03-03</lastmod>`.
- Task 6: `public/robots.txt` created with `Allow: /` and correct sitemap URL.
- Task 7: `npm run lint` → exit 0, zero warnings. `npm run build` → exit 0, `/out/` produced. Verified `og:title`, `og:image`, `og:description`, `og:url`, `twitter:card`, `canonical`, `robots`, `application/ld+json` all present in `/out/index.html`. All three static files confirmed in `/out/`.

### File List

- `src/app/layout.tsx` — modified: expanded metadata, added SITE_URL constant, jsonLd object, `<head>` with JSON-LD script
- `public/sitemap.xml` — created
- `public/robots.txt` — created
- `public/og-image.png` — created (1200×630 dark placeholder PNG)
- `.env.example` — modified: appended NEXT_PUBLIC_SITE_URL documentation
