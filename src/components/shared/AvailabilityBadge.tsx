export function AvailabilityBadge() {
  return (
    <span
      aria-label="Currently open to work opportunities"
      className="inline-flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-full px-3 py-1"
    >
      <span
        className="h-2 w-2 rounded-full bg-emerald-400 motion-safe:animate-pulse"
        aria-hidden="true"
      />
      Open to Work
    </span>
  );
}
