/** Subtle gold hairline divider between major sections. */
export function SectionRule({ className = "" }: { className?: string }) {
  return (
    <div
      className={`mx-auto max-w-6xl px-4 py-2 md:px-8 ${className}`}
      aria-hidden="true"
    >
      <div
        className="h-px w-full"
        style={{ backgroundColor: "color-mix(in srgb, var(--gold) 55%, transparent)" }}
      />
    </div>
  );
}
