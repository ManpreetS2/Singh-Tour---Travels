"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { business } from "@/lib/business";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

function DelhiClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(new Date());
    const tick = () => setTime(fmt());
    const boot = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 30_000);
    return () => {
      window.clearTimeout(boot);
      window.clearInterval(id);
    };
  }, []);

  return (
    <p className="font-label text-gold-deep">
      Delhi{time ? ` · ${time}` : ""} · {business.hours}
    </p>
  );
}

/**
 * Golden Temple at night — the most vivid warm cinematic frame in the
 * Safarnama set (not the hazy Humayun's Tomb).
 */
const HERO_IMAGE = {
  src: "/images/v2/hero-golden-temple-night.jpg",
  alt: "Harmandir Sahib, Amritsar, glowing at night",
  credit: "Harmandir Sahib, Amritsar · Marsmux · CC BY-SA 4.0",
} as const;

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(() => setReady(true), 40);
    return () => window.clearTimeout(id);
  }, [reduced]);

  const show = ready || reduced;

  return (
    <section
      className="relative overflow-hidden bg-ivory"
      aria-labelledby="hero-heading"
    >
      {/* ——— Mobile: ivory type band + edge-to-edge photo, both above the fold ——— */}
      <div className="pt-[var(--header-h)] md:hidden">
        <div className="bg-ivory px-4 pb-4 pt-5">
          <div
            className={cn(
              "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            <DelhiClock />
          </div>
          <h1
            className={cn(
              "font-display mt-3 max-w-[11ch] text-[clamp(2.35rem,9vw,2.85rem)] font-[350] leading-[1.05] text-forest",
              "transition-[opacity,transform] duration-700 delay-75 ease-[cubic-bezier(0.22,1,0.36,1)]",
              show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            North India, from Delhi.
          </h1>
          <p
            lang="hi"
            className={cn(
              "font-display mt-2 text-[1.15rem] font-[350] text-stone",
              "transition-[opacity,transform] duration-700 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)]",
              show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            दिल्ली से, आपके हिसाब से।
          </p>
          <a
            href="#plan"
            className={cn(
              "btn-press btn-forest mt-4 inline-flex min-h-11 items-center rounded-sm bg-forest px-5 text-[15px] font-medium text-ivory",
              "transition-[opacity,transform] duration-700 delay-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
              show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            Plan a journey
          </a>
          <p className="mt-2 text-[13px] text-stone">
            No prices online · Concept demo
          </p>
        </div>

        {/* True edge-to-edge photo (break out of any parent padding) */}
        <figure
          className="relative left-1/2 h-[50svh] min-h-[300px] w-screen max-w-[100vw] -translate-x-1/2"
        >
          <div
            className={cn(
              "absolute inset-0 overflow-hidden",
              "transition-[clip-path,transform] duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
              reduced || show
                ? "scale-100 [clip-path:inset(0)]"
                : "scale-[1.06] [clip-path:inset(6%_4%)]",
            )}
          >
            <Image
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[50%_38%]"
            />
          </div>
          <figcaption className="absolute inset-x-0 bottom-0 bg-[color-mix(in_srgb,var(--forest-deep)_80%,transparent)] px-4 py-2 text-[12px] text-mist">
            {HERO_IMAGE.credit}
          </figcaption>
        </figure>
      </div>

      {/* ——— Desktop: ivory panel + near-full-bleed cinematic photo ——— */}
      <div className="relative hidden min-h-[calc(100svh-var(--header-h))] pt-[var(--header-h)] md:block">
        {/* Photo plane — bleeds to the right edge of the viewport */}
        <figure className="absolute inset-y-0 right-0 top-[var(--header-h)] w-[62%] lg:w-[64%]">
          <div
            className={cn(
              "absolute inset-0 overflow-hidden",
              "transition-[clip-path,transform] duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
              reduced || show
                ? "scale-100 [clip-path:inset(0)]"
                : "scale-[1.06] [clip-path:inset(5%_3%)]",
            )}
          >
            <Image
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              fill
              priority
              sizes="60vw"
              className="object-cover object-[48%_35%]"
            />
          </div>
          <figcaption className="absolute bottom-6 left-6 z-10 max-w-md bg-[color-mix(in_srgb,var(--forest-deep)_80%,transparent)] px-3 py-2 text-[13px] text-mist">
            {HERO_IMAGE.credit}
          </figcaption>
        </figure>

        {/* Solid ivory band — type never on the photo */}
        <div className="relative z-10 flex min-h-[calc(100svh-var(--header-h))] w-[42%] max-w-xl flex-col justify-center bg-ivory px-8 lg:w-[40%] lg:px-12 xl:pl-16">
          <div
            className={cn(
              "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              show ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
            )}
          >
            <DelhiClock />
          </div>

          <h1
            id="hero-heading"
            className={cn(
              "font-display mt-5 max-w-[11ch] text-[clamp(3.25rem,6.5vw,6rem)] font-[350] leading-[1.02] text-forest",
              "transition-[opacity,transform] duration-700 delay-75 ease-[cubic-bezier(0.22,1,0.36,1)]",
              show ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
            )}
          >
            North India, from Delhi.
          </h1>

          <p
            lang="hi"
            className={cn(
              "font-display mt-4 text-[clamp(1.35rem,2.2vw,1.85rem)] font-[350] text-stone",
              "transition-[opacity,transform] duration-700 delay-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
              show ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
            )}
          >
            दिल्ली से, आपके हिसाब से।
          </p>

          <p
            className={cn(
              "mt-5 max-w-[32ch] text-[17px] leading-relaxed text-stone",
              "transition-[opacity,transform] duration-700 delay-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
              show ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
            )}
          >
            Planned around you, at any hour.
          </p>

          <div
            className={cn(
              "mt-8 flex flex-col items-start gap-3",
              "transition-[opacity,transform] duration-700 delay-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              show ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
            )}
          >
            <a
              href="#plan"
              className="btn-press btn-forest inline-flex min-h-12 items-center rounded-sm bg-forest px-7 text-[16px] font-medium text-ivory"
            >
              Plan a journey
            </a>
            <p className="text-[15px] text-stone">
              No prices online. Tell us the trip, we call you back.
            </p>
            <p className="text-[12px] text-stone/80">Concept demo</p>
          </div>
        </div>
      </div>
    </section>
  );
}
