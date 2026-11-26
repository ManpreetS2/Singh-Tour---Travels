import { cn } from "@/lib/utils";
import { business } from "@/lib/business";

type Props = {
  className?: string;
  compact?: boolean;
  inverted?: boolean;
};

/** Charbagh mark + bilingual wordmark (Anek Devanagari). */
export function Wordmark({ className, compact, inverted }: Props) {
  const text = inverted ? "text-ivory" : "text-forest";
  const hindi = inverted ? "text-mist" : "text-stone";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          x="0.75"
          y="0.75"
          width="14.5"
          height="14.5"
          fill="none"
          stroke="#B08D57"
          strokeWidth="1.5"
        />
        <line
          x1="8"
          y1="0.75"
          x2="8"
          y2="15.25"
          stroke="#B08D57"
          strokeWidth="1"
        />
        <line
          x1="0.75"
          y1="8"
          x2="15.25"
          y2="8"
          stroke="#B08D57"
          strokeWidth="1"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display tracking-[0.02em]",
            compact ? "text-[15px]" : "text-[17px] md:text-[19px]",
            text,
          )}
        >
          {business.name}
        </span>
        <span
          lang="hi"
          className={cn(
            "font-display mt-0.5",
            compact ? "text-[11px]" : "text-[12px] md:text-[13px]",
            hindi,
          )}
          style={{ fontSize: compact ? undefined : undefined }}
        >
          {business.nameHindi}
        </span>
      </span>
    </span>
  );
}
