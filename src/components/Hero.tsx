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

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(() => setReady(true), 0);
    return () => window.clearTimeout(id);
  }, [reduced]);

  const show = ready || reduced;

  return (
    <section
      className="relative overflow-hidden px-4 pb-16 pt-[calc(var(--header-h)+28px)] md:px-8 md:pb-24 md:pt-[calc(var(--header-h)+48px)] landscape:min-h-0 landscape:pb-10"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-12 md:items-start md:gap-10 [@media(orientation:landscape)_and_(max-height:500px)]:grid-cols-2 [@media(orientation:landscape)_and_(max-height:500px)]:items-center [@media(orientation:landscape)_and_(max-height:500px)]:gap-6">
        <div className="relative z-10 md:col-span-5">
          <div
            className={cn(
              "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
          >
            <DelhiClock />
          </div>

          <h1
            id="hero-heading"
            className={cn(
              "font-display mt-5 max-w-[14ch] text-[40px] leading-[1.1] text-forest md:text-[72px] md:leading-[1.05]",
              "transition-[opacity,transform] duration-700 delay-[80ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
          >
            North India, from Delhi.
          </h1>

          <p
            lang="hi"
            className={cn(
              "font-display mt-3 text-[20px] text-stone md:text-[28px]",
              "transition-[opacity,transform] duration-700 delay-[160ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
          >
            दिल्ली से, आपके हिसाब से।
          </p>

          <p
            className={cn(
              "mt-5 max-w-[36ch] text-[17px] leading-relaxed text-stone",
              "transition-[opacity,transform] duration-700 delay-[200ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
          >
            Planned around you, at any hour.
          </p>

          <div
            className={cn(
              "mt-8 flex flex-col items-start gap-3",
              "transition-[opacity,transform] duration-700 delay-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
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
            <p className="text-[13px] text-stone/80">Concept demo</p>
          </div>
        </div>

        <figure
          className={cn(
            "relative ml-auto w-[78%] overflow-hidden md:col-span-7 md:ml-0 md:w-full",
            "transition-[clip-path,opacity] duration-[900ms] delay-150 ease-[cubic-bezier(0.65,0,0.35,1)]",
            show
              ? "opacity-100 [clip-path:inset(0)]"
              : "opacity-0 [clip-path:inset(100%_0_0_0)]",
          )}
        >
          <div className="relative aspect-[4/5] w-full md:aspect-[4/5]">
            <Image
              src="/images/v2/delhi-humayun.jpg"
              alt="Humayun's Tomb, Delhi — front gardens"
              fill
              priority
              sizes="(max-width: 768px) 78vw, 42vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-2 text-[14px] text-stone">
            Humayun&apos;s Tomb, Delhi · Komal Sambhudas · CC0
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
