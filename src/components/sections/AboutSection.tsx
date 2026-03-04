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

        {/* Experience callout stat */}
        <div className="mb-10">
          <span className="font-(family-name:--font-plus-jakarta-sans) text-6xl font-bold text-amber-400">
            {aboutData.yearsOfExperience}+
          </span>
          <span className="ml-3 text-sm text-muted-foreground uppercase tracking-widest font-semibold">
            Years of Experience
          </span>
        </div>

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
