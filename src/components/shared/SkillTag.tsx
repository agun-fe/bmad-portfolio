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
