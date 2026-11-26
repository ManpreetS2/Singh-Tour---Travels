"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { NorthMapSvg, type RoutePathId } from "@/components/NorthMapSvg";
import { routes } from "@/lib/destinations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const ROUTE_IDS = routes.map((r) => r.id) as RoutePathId[];

/**
 * Roads north from Delhi.
 * Portrait (≥600px tall): CSS sticky map ≤45svh, clears header + Call bar.
 * Landscape or short viewports: inline map + stacked chapters with per-route highlight.
 * No scroll-jacking / GSAP pin on mobile. Desktop GSAP via matchMedia only.
 */
export function RoutesMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<RoutePathId>("triangle");
  const reduced = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Chapter activation via IntersectionObserver (mobile / reduced / always as backup)
  useEffect(() => {
    if (isDesktop && !reduced) return;
    const root = sectionRef.current;
    if (!root) return;
    const chapters = Array.from(
      root.querySelectorAll<HTMLElement>("[data-chapter]"),
    );
    if (!chapters.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = visible.target.getAttribute(
            "data-chapter",
          ) as RoutePathId | null;
          if (id && ROUTE_IDS.includes(id)) setActive(id);
        }
      },
      { root: null, threshold: [0.35, 0.55, 0.7], rootMargin: "-35% 0px -30% 0px" },
    );
    chapters.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [isDesktop, reduced]);

  // Desktop: GSAP ScrollTrigger + dashoffset scrub
  useEffect(() => {
    if (!isDesktop || reduced) return;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();
        mm.add(
          "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          () => {
            ROUTE_IDS.forEach((id) => {
              const path = document.querySelector<SVGPathElement>(
                `#desktop-map [data-route="${id}"]`,
              );
              const chapter = document.querySelector<HTMLElement>(
                `.routes-layout-pin [data-chapter="${id}"]`,
              );
              if (!path || !chapter) return;

              gsap.set(path, { strokeDasharray: 1, strokeDashoffset: 1 });

              ScrollTrigger.create({
                trigger: chapter,
                start: "top 70%",
                end: "bottom 40%",
                scrub: 0.6,
                onEnter: () => setActive(id),
                onEnterBack: () => setActive(id),
                onUpdate: (self) => {
                  gsap.set(path, {
                    strokeDashoffset: 1 - self.progress,
                    opacity: 0.25 + 0.75 * self.progress,
                  });
                },
              });
            });
          },
        );
      }, sectionRef);
    })();

    return () => ctx?.revert();
  }, [isDesktop, reduced]);

  const showArrival = active === "himalaya";

  return (
    <section
      id="routes"
      ref={sectionRef}
      className="bg-forest-deep text-ivory"
      aria-labelledby="routes-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <p className="font-label text-gold-light">Example routes from Delhi</p>
        <h2
          id="routes-heading"
          className="font-display mt-3 max-w-[16ch] text-[30px] leading-tight text-ivory md:text-[48px]"
        >
          Roads north from Delhi
        </h2>
        <p className="mt-3 max-w-[42ch] text-mist">
          Illustrative corridors — not road geometry or packages. Confirm with
          us before you travel.
        </p>
      </div>

      {/* Compact: landscape / short — CSS toggled */}
      <div className="routes-layout-compact mx-auto max-w-6xl px-4 pb-16 md:px-8">
        <div className="mx-auto max-w-md overflow-hidden rounded-sm border border-garden/40">
          <NorthMapSvg
            staticAll={reduced}
            activeId={reduced ? null : active}
            className="max-h-[40svh]"
          />
        </div>
        <ol className="mt-10 space-y-10">
          {routes.map((route) => (
            <li
              key={`compact-${route.id}`}
              data-chapter={route.id}
              className="route-chapter grid gap-4 sm:grid-cols-[120px_1fr] sm:gap-6"
            >
              <div className="overflow-hidden rounded-sm border border-garden/40 bg-forest">
                <NorthMapSvg
                  compact
                  highlightOnly={route.id as RoutePathId}
                  staticAll
                  className="aspect-[360/280] h-auto max-h-28"
                />
              </div>
              <div>
                <h3 className="font-display text-[24px] text-ivory">
                  {route.name}
                </h3>
                <p className="mt-1 text-[14px] text-gold-light">
                  {route.places.join(" · ")}
                </p>
                <p className="mt-2 text-mist">{route.line}</p>
                <a
                  href="#plan"
                  className="link-underline mt-3 inline-flex min-h-11 items-center text-gold-light"
                >
                  Plan this route
                </a>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Pin layout: portrait tall + desktop */}
      <div className="routes-layout-pin mx-auto max-w-6xl md:grid md:grid-cols-12 md:gap-10 md:px-8">
        <div className="md:col-span-7 md:order-2">
          <div
            className="map-sticky-frame overflow-hidden border-y border-garden/30 bg-forest-deep md:border md:border-garden/40"
            data-map-frame
          >
            <div
              id={isDesktop ? "desktop-map" : "mobile-map"}
              className="mx-auto h-full max-h-[inherit] w-full max-w-md md:max-w-none"
            >
              <NorthMapSvg
                activeId={reduced ? null : active}
                staticAll={reduced}
                className="max-h-[45svh] md:max-h-[min(70svh,720px)]"
              />
            </div>
          </div>
        </div>

        <div className="px-4 pb-[calc(var(--bar-h)+2rem)] pt-8 md:col-span-5 md:order-1 md:px-0 md:pb-32">
          <ol className="space-y-16 md:space-y-[40vh]">
            {routes.map((route) => (
              <li
                key={`pin-${route.id}`}
                data-chapter={route.id}
                className={cn(
                  "route-chapter transition-opacity duration-500",
                  active === route.id ? "opacity-100" : "opacity-55",
                )}
              >
                <h3 className="font-display text-[26px] text-ivory md:text-[32px]">
                  {route.name}
                </h3>
                <p className="mt-2 font-label text-gold-light">
                  {route.places.join(" · ")}
                </p>
                <p className="mt-3 max-w-[34ch] text-mist">{route.line}</p>
                <a
                  href="#plan"
                  className="link-underline mt-4 inline-flex min-h-11 items-center text-gold-light"
                >
                  Plan this route
                </a>

                {route.id === "himalaya" && (
                  <figure
                    className={cn(
                      "mt-8 overflow-hidden",
                      showArrival ? "picture-develops is-developed" : "picture-develops",
                    )}
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src="/images/v2/ladakh-pangong.jpg"
                        alt="Pangong Tso, Ladakh"
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="mt-2 py-2 text-[13px] text-mist">
                      Pangong Tso · KennyOMG · CC BY-SA 4.0
                    </figcaption>
                  </figure>
                )}
              </li>
            ))}
          </ol>

          <ul className="sr-only">
            {routes.map((r) => (
              <li key={r.id}>
                {r.name}: {r.places.join(", ")}. {r.line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
