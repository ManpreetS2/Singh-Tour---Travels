"use client";

import { useEffect, useRef } from "react";
import { business } from "@/lib/business";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const WORDS =
  "From West Delhi to the hills, the river towns and the old cities, at any hour.".split(
    " ",
  );

export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));
    if (reduced) {
      spans.forEach((s) => {
        s.style.color = "var(--charcoal)";
      });
      return;
    }

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = Math.min(
        1,
        Math.max(0, (vh * 0.75 - rect.top) / (rect.height + vh * 0.35)),
      );
      const n = Math.floor(progress * spans.length);
      spans.forEach((s, i) => {
        s.style.color = i < n ? "var(--charcoal)" : "var(--stone)";
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  return (
    <section className="bg-sand px-4 py-16 md:px-8 md:py-24" aria-label="About">
      <div className="mx-auto max-w-3xl">
        <p
          ref={ref}
          className="font-display text-[26px] leading-snug text-stone md:text-[40px] md:leading-snug"
        >
          {WORDS.map((w, i) => (
            <span key={`${w}-${i}`} data-word className="transition-colors duration-300">
              {w}
              {i < WORDS.length - 1 ? " " : ""}
            </span>
          ))}{" "}
          <a
            href={business.googleMapsSearch}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-forest"
          >
            {business.rating} on Google from {business.reviewCount} reviews.
          </a>
        </p>
      </div>
    </section>
  );
}
