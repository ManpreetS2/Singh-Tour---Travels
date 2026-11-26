"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** ScrollExpand: inset rounded frame → full-bleed (vanilla, no GSAP). */
export function WindowOpens() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const reduced = usePrefersReducedMotion();
  const progress = reduced ? 1 : scrollProgress;

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = trackRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        const p = Math.min(1, Math.max(0, scrolled / Math.max(1, total)));
        setScrollProgress(p);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  const insetX = 10 * (1 - progress);
  const insetY = 12 * (1 - progress);
  const radius = 4 * (1 - progress);

  return (
    <section
      className="relative"
      aria-labelledby="window-heading"
      ref={trackRef}
      style={{ height: reduced ? "auto" : "200vh" }}
    >
      <div
        className={
          reduced
            ? "relative"
            : "sticky top-[var(--header-h)] h-[calc(100svh-var(--header-h))]"
        }
      >
        <h2 id="window-heading" className="sr-only">
          Amber Fort, Jaipur
        </h2>
        <div
          className="relative h-full min-h-[60svh] overflow-hidden"
          style={{
            clipPath: reduced
              ? undefined
              : `inset(${insetY}% ${insetX}% round ${radius}px)`,
          }}
        >
          <Image
            src="/images/v2/jaipur-amber.jpg"
            alt="Amber Fort, Jaipur, above Maota Lake"
            fill
            sizes="100vw"
            className="object-cover object-[50%_40%]"
            priority={false}
          />
          <div className="absolute inset-x-0 bottom-0 bg-[color-mix(in_srgb,var(--forest-deep)_80%,transparent)] px-4 py-4 md:px-8">
            <p className="text-[14px] text-mist md:text-[15px]">
              Amber Fort, Jaipur · A.Savin · FAL
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
