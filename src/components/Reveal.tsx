"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Props = {
  children: ReactNode;
  className?: string;
  clip?: boolean;
  delayMs?: number;
  as?: "div" | "section" | "article" | "li" | "figure";
};

export function Reveal({
  children,
  className,
  clip,
  delayMs = 0,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.classList.add("reveal-visible");
      el.classList.remove("reveal-pending");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => {
            el.classList.add("reveal-visible");
            el.classList.remove("reveal-pending");
          }, delayMs);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, delayMs]);

  return (
    <Tag
      ref={ref as never}
      className={cn(
        "reveal-pending",
        clip && "reveal-clip",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
