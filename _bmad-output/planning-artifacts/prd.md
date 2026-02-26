---
stepsCompleted:
  [
    step-01-init,
    step-02-discovery,
    step-02b-vision,
    step-02c-executive-summary,
    step-03-success,
    step-04-journeys,
    step-05-domain,
    step-06-innovation,
    step-07-project-type,
    step-08-scoping,
    step-09-functional,
    step-10-nonfunctional,
    step-11-polish,
    step-12-complete,
  ]
inputDocuments:
  - _bmad-output/planning-artifacts/product-brief-bmad-1-2026-02-25.md
workflowType: "prd"
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: greenfield
  hosting: netlify
  contactForm: netlify-forms
---

# Product Requirements Document - bmad-1

**Author:** Agun Gunawan
**Date:** 2026-02-25

## Executive Summary

Agun Gunawan is a Senior Frontend Developer with 8+ years of experience building production-grade web interfaces using React JS, Next.js, HTML, CSS, JavaScript, and Webflow. This portfolio website is his primary owned professional channel — a purpose-built, conversion-optimized destination that enables tech recruiters, startup CTOs/founders, and HR managers at software houses to discover his expertise, evaluate his work, and initiate contact with confidence.

The site solves a specific problem: senior developers with deep expertise are hard to evaluate online, and generic platforms commoditize talent rather than communicate trust. This site replaces fragmented, algorithm-dependent channels (LinkedIn, job boards) with a single, fully controlled professional presence that tells Agun's story on his terms.

**Primary success actions:** CV download and contact form submission. Every design and content decision serves these two conversion points.

### What Makes This Special

The core differentiator is Agun's rare dual-stack credibility: React JS (engineering depth) meets Webflow (no-code delivery speed). This combination appeals simultaneously to technical decision-makers who value code quality _and_ non-technical stakeholders who value speed and cost-efficiency — a pairing most developer portfolios cannot offer.

The site's tone is deliberately human-first. Not a resume wall, not a template clone — a window into how Agun thinks and works. Trust is built through curated case studies (problem → solution → outcome), visible availability status, and social proof, not volume of content. The result: a visitor who arrives skeptical leaves with enough signal to reach out.

### Project Classification

| Attribute       | Value                                                |
| --------------- | ---------------------------------------------------- |
| Project Type    | Web App (SPA/Static Site)                            |
| Domain          | General — Personal Portfolio / Professional Branding |
| Complexity      | Low                                                  |
| Project Context | Greenfield                                           |
| Deployment      | Netlify                                              |
| Contact Form    | Netlify Forms → personal email notification          |
| Tech Options    | React JS / Next.js or Webflow                        |

## Success Criteria

### User Success

- Visitor can identify Agun's skills, experience level, and availability within the first scroll — no hunting required
- Visitor successfully locates and downloads the CV within the same session
- Visitor reviews at least 2–3 portfolio projects before leaving
- Visitor completes the contact form without confusion or friction
- Site feels professional, human, and trustworthy — not a generic template

### Business Success

| Metric                    | Target                                                     | Timeframe                 |
| ------------------------- | ---------------------------------------------------------- | ------------------------- |
| Site Launch               | Live and fully functional                                  | By end of April 2026      |
| CV Downloads              | 10+ downloads/month                                        | Within 1 month of launch  |
| Qualified Inquiries       | 3–5 non-spam form submissions/month                        | Within 2 months of launch |
| Portfolio Engagement      | Average 2+ projects viewed per session                     | Ongoing                   |
| First Concrete Engagement | 1 freelance, part-time, or full-time opportunity initiated | Within 3 months of launch |

> **Qualified inquiry definition:** Any non-spam contact form submission received via Netlify Forms and forwarded to Agun's personal email.

### Technical Success

- Correct rendering across Chrome, Firefox, Safari, Edge (latest 2 versions each)
- Mobile-first responsive layout
- Contact form submissions reliably delivered to Agun's personal email via Netlify Forms
- CV download link always serves the latest PDF version
- Analytics tracking active from day one: page visits and CV download click events
- Lighthouse Performance score 90+ desktop / 80+ mobile at launch

## User Journeys

### Journey 1: Sarah — The Tech Recruiter (Primary User, Success Path)

**Opening Scene:** It's 10am on a Tuesday. Sarah has 12 developer profiles to review before her afternoon client call. She's been sent Agun's LinkedIn profile by a colleague — "this guy does both React and Webflow, might be interesting." She clicks through to his portfolio site from the LinkedIn link.

**Rising Action:** She lands on the hero. Within 3 seconds: "Senior Frontend Developer — 8+ years — Open to Work." She exhales. She scans down — About section tells her who he is without making her read a wall of text. She clicks into two project cards; both show the tech stack she was looking for (React JS). One has a live link — she clicks it, it works, it looks clean.

**Climax:** She sees the CV download button. She clicks it. The PDF opens — formatted, readable, up to date. She forwards it to her client's hiring manager with a note: "This one's worth a call."

**Resolution:** She submits the contact form — name, company, brief note about the role. Gets a confirmation message. Agun receives the email notification later that day.

---

### Journey 2: Budi — The Startup CTO (Primary User, High-Intent Path)

**Opening Scene:** Budi is building a SaaS product. His co-founder just told him they need a frontend contractor for 6–8 weeks — someone who can build fast in React without needing his hand-held. It's 11pm, he's Googling "senior react developer freelance portfolio" and stumbles on Agun's site from a search result.

**Rising Action:** He skims the hero — "React JS, Webflow, 8+ years." He goes straight to portfolio. He sees a project that looks architecturally similar to what he's building. He spends 2 minutes on it: stack, screenshots, GitHub link. The code is clean. He checks the About section — the tone feels like someone he could actually work with.

**Climax:** He checks availability. "Open to Work" badge is visible and current. He feels enough trust to reach out now rather than bookmark for later. He opens the contact form.

**Resolution:** He writes a specific message — project description, timeline, tech stack. Submits it. Gets confirmation. Agun receives the email and follows up next morning.

---

### Journey 3: Diana — The HR Manager (Secondary User, Evaluation Path)

**Opening Scene:** Diana is preparing a shortlist for her agency's technical team. She found Agun on LinkedIn but needs more than a profile to justify forwarding him internally. She visits his portfolio site before her 2pm meeting.

**Rising Action:** She reads the About section — professional tone, clear stack, no jargon overload. She screenshots two project cards to include in her internal message. She looks for a downloadable CV — finds it immediately, downloads it, skims it. It matches what the site says.

**Climax:** She needs to forward something credible. She copies the portfolio URL and attaches the CV PDF to an internal Slack message: "Tech lead — can you look at this one?" The site URL alone passes the credibility check.

**Resolution:** She doesn't submit the contact form herself, but she has everything she needs to move the process forward. The site did its job as a trusted leave-behind.

---

### Journey 4: Agun — Site Owner (Admin/Content Update Path)

**Opening Scene:** It's March 2026. Agun just wrapped a new freelance project and wants to add it to his portfolio. He also has an updated CV to swap in.

**Rising Action:** He opens his code repo (or Webflow editor), adds the new project card — title, thumbnail, stack, live link. He replaces the CV PDF file so the existing download button points to the new version automatically.

**Climax:** He checks the site on mobile to make sure the new card looks right. He also logs into Netlify to check if any form submissions came in that he may have missed in his email.

**Resolution:** New project is live within 30 minutes. CV is updated without any URL changing. He reviews two form submissions from the past week he hadn't followed up on.

---

### Journey Requirements Summary

| Capability                                        | Driven By          |
| ------------------------------------------------- | ------------------ |
| Clear hero with availability badge                | Sarah, Budi        |
| Portfolio cards with stack + live links           | Sarah, Budi, Diana |
| CV download (stable URL, always current PDF)      | Sarah, Diana, Agun |
| Contact form → Netlify Forms → email notification | Sarah, Budi        |
| Contact form confirmation message                 | Sarah, Budi        |
| Professional visual quality / mobile-responsive   | Diana, Agun        |
| SEO-accessible pages (search landing)             | Budi               |
| Simple content update workflow                    | Agun               |
| Netlify Forms submission dashboard (backup log)   | Agun               |
| Analytics: page visits + CV download click events | Agun               |

## Web App Specific Requirements

### Project-Type Overview

A single-page application (SPA) personal portfolio website, built for search engine discoverability and deployed as a static site to Netlify. The site functions as a scrolling one-page experience with anchor-based navigation between sections, optimised for fast load, mobile-first layout, and modern browser support.

### Technical Architecture Considerations

- **Rendering Strategy:** Static Site Generation (SSG) — all pages pre-rendered at build time for maximum SEO and performance. No server-side runtime required.
- **Recommended Stack:** Next.js (SSG) or Webflow — both produce SEO-ready static output compatible with Netlify deployment
- **SPA Pattern:** Single scrollable page with anchor links (`#about`, `#portfolio`, `#contact`) as primary navigation — no full page reloads
- **Analytics:** Lightweight page visit tracking via Plausible or Google Analytics; CV download tracked via click event (not server-side)
- **Contact Form:** Netlify Forms (no backend required) — form submissions delivered to personal email inbox, with in-page confirmation message on submit

### Browser & Device Support

| Target                              | Support Level              |
| ----------------------------------- | -------------------------- |
| Chrome (latest 2 versions)          | Full                       |
| Firefox (latest 2 versions)         | Full                       |
| Safari (latest 2 versions)          | Full                       |
| Edge (latest 2 versions)            | Full                       |
| Mobile (iOS Safari, Android Chrome) | Full — mobile-first layout |
| Legacy IE / Opera Mini              | Not supported              |

### SEO Strategy

- Target search queries: _"senior react developer freelance"_, _"senior frontend developer webflow react"_
- Each section has a meaningful anchor ID for deep-linking and crawlability
- Open Graph tags for rich link previews on LinkedIn and Slack
- JSON-LD Person schema: name, job title, skills
- `sitemap.xml` and `robots.txt` at site root

### Accessibility Baseline

- Semantic HTML, WCAG 2.1 AA spirit (no certification required)
- Keyboard-navigable, sufficient colour contrast, descriptive alt text on all images

### Implementation Considerations

- CV PDF served from `/public` folder or Netlify CDN — stable URL, updated by file replacement only (no URL change on update)
- Contact form uses Netlify Forms attribute (`netlify` or `data-netlify="true"`) — zero backend code
- Analytics script loaded asynchronously — does not block page render
- All images optimised for web (WebP where supported, fallback JPEG/PNG)
- No CMS required at MVP — content is code-managed (or Webflow-managed if Webflow path chosen)

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Experience MVP — the site must feel complete and professional from day one. There is no "good enough for now" with a portfolio; the product IS the first impression. Every section ships polished or it doesn't ship.

**Resource:** Solo developer (Agun) — no external designer. Visual decisions are code-driven or Webflow-driven by the builder himself.

**Launch Target:** End of April 2026 (~2 months from project start)

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**

- Sarah (Recruiter): Discover → Evaluate → Download CV → Contact
- Budi (Startup CTO): Search-land → Evaluate portfolio → Check availability → Contact
- Diana (HR Manager): Evaluate → Download CV → Forward internally
- Agun (Site Owner): Update project content → Swap CV → Check submissions

**Must-Have Capabilities:**

| Feature                                                                         | Justification                                   |
| ------------------------------------------------------------------------------- | ----------------------------------------------- |
| Hero section (name, title, value statement, availability badge, CTAs)           | First impression — cannot be absent             |
| About Me (background, stack, 8+ years)                                          | Trust signal — recruiter and CTO both need this |
| Portfolio section — 6 project cards (thumbnail, title, stack, live/GitHub link) | Core evaluation content                         |
| CV download (stable PDF URL, prominent button)                                  | Primary conversion action                       |
| Contact form (Netlify Forms → personal email + confirmation)                    | Primary conversion action                       |
| Footer (LinkedIn, email, copyright)                                             | Credibility baseline                            |
| Analytics (page visits + CV download click event)                               | Needed from day one to measure success          |
| SEO basics (meta tags, OG tags, JSON-LD Person schema, sitemap)                 | Budi discovery journey depends on this          |
| Mobile-first responsive layout                                                  | Diana and Budi both likely to view on mobile    |

### Post-MVP Features

**Phase 2 — Growth (Post-launch, as content & usage grows):**

| Feature                     | Trigger to build                                              |
| --------------------------- | ------------------------------------------------------------- |
| Case Study Deep-Dives       | When 2+ projects have enough story to justify expanded pages  |
| Dark Mode toggle            | After launch, based on personal preference / visitor feedback |
| Portfolio filtering by tech | When project count grows beyond 6–8                           |
| Testimonials Section        | When 2+ testimonials available to display                     |

**Phase 3 — Vision (Future, if site gains traction):**

- Blog / writing section
- Availability calendar or booking integration
- Multi-language support (EN/ID)
- "Show more" projects expansion (beyond initial 6)

### Risk Mitigation Strategy

**Content Risk (High — most likely launch blocker):**

- Risk: Project screenshots, About copy, and CV PDF are not yet created. These are required for every user journey.
- Mitigation: Content creation must start in parallel with development — not after. Recommend: write About copy and gather project assets in Week 1 while setting up the codebase. Block the launch date if content isn't ready; shipping an empty portfolio is worse than shipping late.

**Scope Creep Risk (Low):**

- Risk: Portfolio filter or case studies pulled into MVP before they're warranted.
- Mitigation: Filter only added when project count exceeds 6. Case studies only when story is fully written. Both are firmly Post-MVP.

**Solo Developer Risk (Medium):**

- Risk: One person doing both design decisions and implementation may slow aesthetic iteration.
- Mitigation: Choose a design reference (one portfolio site you admire) before writing a single line of CSS. Decide on tech path (Next.js vs Webflow) in Week 1. Don't switch mid-build.

## Functional Requirements

The following capabilities constitute the binding contract for all downstream design, architecture, and development work. Every feature in scope must trace to a requirement below.

### Visitor Navigation & Discoverability

- **FR1:** Visitor can navigate between site sections via anchor-based links without full page reloads
- **FR2:** Visitor can land on the site from an external search engine result
- **FR3:** Visitor can share the site URL and have it render a meaningful preview (title, description, image) on LinkedIn, Slack, and other platforms

### Professional Profile & Availability

- **FR4:** Visitor can immediately identify Agun's name, professional title, and core value proposition upon landing
- **FR5:** Visitor can see Agun's current work availability status displayed in the hero section above the fold on all viewport sizes
- **FR6:** Visitor can read Agun's professional background, years of experience, and core tech stack
- **FR7:** Visitor can navigate to key site sections (portfolio, CV download, contact) via CTA buttons from the hero section

### Portfolio Showcase

- **FR8:** Visitor can browse a curated set of portfolio project cards
- **FR9:** Visitor can see each project's title, thumbnail image, and tech stack used on its card
- **FR10:** Visitor can access a live deployment link for a project where one exists
- **FR11:** Visitor can access a GitHub repository link for a project where one exists

### CV Access

- **FR12:** Visitor can download Agun's CV as a PDF file via a download button visible above the fold or within the first scroll on all viewport sizes
- **FR13:** The CV download link remains stable and unchanged when the PDF file is updated
- **FR14:** Agun can replace the CV PDF and have all existing download links immediately serve the new version

### Contact & Inquiry

- **FR15:** Visitor can submit an inquiry via a contact form providing their name, email address, subject, and message
- **FR16:** Visitor receives an on-page confirmation message after successfully submitting the contact form
- **FR17:** Agun receives an email notification to his personal inbox for each contact form submission
- **FR18:** Agun can update the recipient email address for form notifications without code changes

### SEO & Search Discoverability

- **FR19:** Each page renders a `<title>` tag (≤60 characters) and `<meta description>` (≤160 characters), each containing at least one target search keyword
- **FR20:** The site includes Open Graph metadata enabling rich link previews on social and messaging platforms
- **FR21:** The site includes JSON-LD structured data identifying Agun as a Person with job title and skills
- **FR22:** A `sitemap.xml` and `robots.txt` are publicly accessible at the site root

### Analytics & Tracking

- **FR23:** Agun can view page visit count data for the site
- **FR24:** Agun can track CV download button click events as a distinct measurable metric
- **FR25:** Analytics data collection does not block or degrade page load for visitors

### Site Owner Content Management

- **FR26:** Agun can add a new project card to the portfolio section
- **FR27:** Agun can update an existing project card's content (title, thumbnail, stack, links)
- **FR28:** Agun can view a log of all contact form submissions via the Netlify dashboard as a backup to email

### Footer & Social Links

- **FR29:** Visitor can access Agun's LinkedIn profile via a footer link
- **FR30:** Visitor can contact Agun via email using a footer email link
- **FR31:** Visitor can see copyright information in the footer

## Non-Functional Requirements

### Performance

- **NFR1:** Initial page load (First Contentful Paint) completes within 2 seconds on a standard broadband connection
- **NFR2:** Largest Contentful Paint (LCP) completes within 2.5 seconds — meets Google Core Web Vitals "Good" threshold
- **NFR3:** All images are served in optimised formats (WebP with JPEG/PNG fallback) and do not block page rendering
- **NFR4:** Analytics and tracking scripts are loaded asynchronously and do not contribute to LCP or blocking time
- **NFR5:** The site achieves a Lighthouse Performance score of 90+ on desktop and 80+ on mobile at launch

### Security

- **NFR6:** All traffic is served over HTTPS — enforced by Netlify at the CDN level, no plain HTTP fallback
- **NFR7:** The contact form does not expose Agun's personal email address in the page source or client-side code
- **NFR8:** Netlify Forms spam filtering is enabled to prevent bot submissions reaching the inbox
- **NFR9:** No third-party scripts are loaded from untrusted sources — all external scripts (analytics, fonts) are from established, reputable providers

### Accessibility

- **NFR10:** All images include descriptive `alt` text
- **NFR11:** Colour contrast ratios meet WCAG 2.1 AA minimum (4.5:1 for normal text, 3:1 for large text)
- **NFR12:** All interactive elements (links, buttons, form fields) are keyboard-navigable and have visible focus states
- **NFR13:** Form inputs have associated `<label>` elements for screen reader compatibility
- **NFR14:** The site renders and is fully usable without JavaScript (progressive enhancement baseline)

### Integration

- **NFR15:** Netlify Forms delivers 100% of non-spam submissions to the configured email within 5 minutes of submission
- **NFR16:** If the analytics provider experiences an outage, site functionality and page load are unaffected
- **NFR17:** The CV download link resolves correctly within 1 second — served from Netlify CDN, not an external storage service
