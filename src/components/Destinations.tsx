"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  categories,
  destinations,
  type DestinationCategory,
} from "@/lib/destinations";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Destinations() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (filter === "All") return destinations;
    return destinations.filter((d) => d.category === filter);
  }, [filter]);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const rail = railRef.current;
      const section = sectionRef.current;
      if (reduce || !rail || !section) return;
      if (window.matchMedia("(max-width: 768px)").matches) return;

      // ONE signature scroll effect: horizontal destination rail pans on scroll.
      const totalScroll = () =>
        Math.max(0, rail.scrollWidth - rail.clientWidth);

      const tween = gsap.to(rail, {
        x: () => -totalScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll() + 200}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: sectionRef, dependencies: [filter] },
  );

  return (
    <section
      id="destinations"
      ref={sectionRef}
      className="relative overflow-hidden bg-indigo py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-clay">
              Destinations explorer
            </p>
            <h2 className="font-display mt-3 text-3xl tracking-tight text-paper sm:text-4xl">
              Where the road might lead
            </h2>
            <p className="mt-3 max-w-md text-sandstone/90">
              Illustrative routes from Delhi — filter by mood, then ask us what
              is available for your dates.
            </p>
          </div>
          <p className="illustrative-tag">
            Illustrative itinerary — confirm details with us
          </p>
        </div>

        <div
          className="mt-8 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter destinations"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={cn(
                "btn-press focus-ring rounded-sm px-3.5 py-2 text-sm",
                filter === cat
                  ? "bg-sandstone text-ink"
                  : "border border-sandstone/25 text-sandstone hover:border-sandstone/50",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 overflow-x-auto md:overflow-visible">
        <div
          ref={railRef}
          className="signature-rail flex w-max gap-4 px-4 pb-4 sm:px-6 lg:px-8 will-change-transform"
        >
          {filtered.map((dest) => (
            <article
              key={dest.id}
              className="group relative h-[22rem] w-[17rem] shrink-0 overflow-hidden rounded-sm sm:h-[26rem] sm:w-[20rem]"
            >
              <Image
                src={dest.image}
                alt={`${dest.name}, ${dest.region} — illustrative destination for ${dest.category.toLowerCase()} journeys`}
                fill
                sizes="320px"
                className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-sandstone">
                  {dest.category as DestinationCategory} · {dest.region}
                </p>
                <h3 className="font-display mt-1 text-2xl text-paper">
                  {dest.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/85">
                  {dest.blurb}
                </p>
                <p className="mt-3 text-xs text-sandstone/80">
                  {dest.itineraryHint}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-6xl px-4 text-xs text-muted sm:px-6 lg:px-8">
        Photos are licensed stand-ins of real places — not photographs of our
        vehicles or staff.
      </p>
    </section>
  );
}
