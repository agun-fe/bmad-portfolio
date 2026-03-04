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
    "I'm a Senior Frontend Developer with 8+ years of experience building fast, accessible, and beautifully crafted web products. I bridge the gap between design and engineering — comfortable going deep on component architecture one moment and refining micro-interactions the next.",
    "My stack centers on React, Next.js, and TypeScript for application work, and I bring Webflow into the mix for marketing sites and rapid prototyping. I care deeply about performance, semantic HTML, and experiences that hold up across every device.",
    "I've shipped products for startups and scale-ups across e-commerce, SaaS, and creative industries. When I'm not writing code, I'm probably tweaking a font pairing or opinionating about spacing systems.",
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
    "Node.js",
    "REST APIs",
    "Git",
    "Figma",
  ],
  yearsOfExperience: 8,
  currentRole: "Senior Frontend Developer",
  highlights: [
    "Led frontend architecture for a SaaS platform serving 50k+ monthly active users",
    "Reduced Core Web Vitals LCP by 40% through image optimization and code splitting",
    "Built and open-sourced a component library adopted by 3+ internal teams",
    "Mentored junior developers and established frontend coding standards across engineering",
  ],
};
