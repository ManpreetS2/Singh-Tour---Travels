"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { getPlace, regions } from "@/lib/destinations";
import { cn } from "@/lib/utils";

type Props = {
  onAddPlace?: (placeId: string) => void;
};

export function Gallery({ onAddPlace }: Props) {
  const [activeDesktop, setActiveDesktop] = useState(regions[0].id);
  const [sheetPlace, setSheetPlace] = useState<string | null>(null);
  const sheet = sheetPlace ? getPlace(sheetPlace) : null;

  return (
    <section
      id="destinations"
      className="px-0 py-20 md:px-8 md:py-28"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-0">
        <p className="font-label">Places from Delhi</p>
        <h2
          id="gallery-heading"
          className="font-display mt-3 max-w-[18ch] text-[30px] leading-tight text-forest md:text-[48px]"
        >
          The courtyard gallery
        </h2>
        <p className="mt-3 max-w-[42ch] text-stone">
          Places people often travel to from Delhi — not packages. Confirm
          details with us.
        </p>
      </div>

      {/* Mobile offset stack */}
      <div className="mt-14 space-y-24 md:hidden">
        {regions.map((region, index) => {
          const mirror = index % 2 === 1;
          const primary = getPlace(region.photos[0])!;
          const secondary = getPlace(region.photos[1])!;
          const list = region.placeIds
            .map((id) => getPlace(id)!)
            .filter(Boolean);

          return (
            <article key={region.id} className="relative">
              <div className="relative">
                <Reveal clip className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={primary.image}
                    alt={`${primary.name}, ${region.label}`}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </Reveal>
                <Reveal
                  delayMs={80}
                  className={cn(
                    "absolute -bottom-12 z-10 aspect-square w-[58%] overflow-hidden shadow-[0_12px_40px_rgba(30,33,32,0.18)]",
                    mirror ? "left-0" : "right-0",
                  )}
                >
                  <Image
                    src={secondary.image}
                    alt={`${secondary.name}`}
                    fill
                    sizes="58vw"
                    className="object-cover"
                  />
                </Reveal>
              </div>

              <Reveal delayMs={120} className="mt-20 px-4">
                <p className="font-label">
                  {String(index + 1).padStart(2, "0")} / 05
                </p>
                <p className="font-label mt-4 text-gold-deep">{region.label}</p>
                <ul className="mt-3 space-y-4">
                  {list.map((place) => (
                    <li key={place.id}>
                      <button
                        type="button"
                        className="btn-press min-h-11 text-left"
                        onClick={() => setSheetPlace(place.id)}
                        aria-haspopup="dialog"
                      >
                        <span className="font-display block text-[28px] leading-tight text-forest">
                          {place.name}
                        </span>
                        <span className="mt-1 block max-w-[34ch] text-[15px] text-stone">
                          {place.sentence}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </article>
          );
        })}
      </div>

      {/* Desktop: sticky index + photo */}
      <div className="mx-auto mt-16 hidden max-w-6xl grid-cols-12 gap-10 md:grid">
        <div className="col-span-5">
          <div className="sticky top-[calc(var(--header-h)+24px)] space-y-8">
            {regions.map((region, index) => {
              const list = region.placeIds
                .map((id) => getPlace(id)!)
                .filter(Boolean);
              const isActive = activeDesktop === region.id;
              return (
                <div key={region.id}>
                  <p className="font-label">
                    {String(index + 1).padStart(2, "0")} · {region.label}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {list.map((place) => (
                      <li key={place.id}>
                        <button
                          type="button"
                          className={cn(
                            "btn-press min-h-11 w-full text-left font-display text-[28px] leading-tight transition-colors",
                            isActive && activeDesktop === region.id
                              ? "text-forest"
                              : "text-stone hover:text-forest",
                          )}
                          onMouseEnter={() => setActiveDesktop(region.id)}
                          onFocus={() => setActiveDesktop(region.id)}
                          onClick={() => setSheetPlace(place.id)}
                          aria-haspopup="dialog"
                        >
                          {place.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-span-7">
          <div className="sticky top-[calc(var(--header-h)+24px)]">
            {regions.map((region) => {
              const primary = getPlace(region.photos[0])!;
              return (
                <div
                  key={region.id}
                  className={cn(
                    "relative aspect-[4/5] overflow-hidden transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    activeDesktop === region.id
                      ? "opacity-100"
                      : "pointer-events-none absolute inset-0 opacity-0",
                  )}
                >
                  <Image
                    src={primary.image}
                    alt={`${primary.name}, ${region.label}`}
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                  <p className="absolute bottom-0 inset-x-0 bg-[color-mix(in_srgb,var(--forest-deep)_80%,transparent)] px-4 py-3 text-[14px] text-mist">
                    {primary.name} · {primary.credit} · {primary.license}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {sheet && (
        <dialog
          open
          className="fixed inset-x-0 bottom-0 z-[60] m-0 w-full max-w-none rounded-t-md border-0 bg-ivory p-0 shadow-[0_-20px_60px_rgba(30,33,32,0.25)] open:flex open:flex-col"
          onClose={() => setSheetPlace(null)}
          aria-labelledby="place-sheet-title"
        >
          <form method="dialog" className="contents">
            <div className="mx-auto flex w-full max-w-lg flex-col">
              <div className="flex justify-center pt-3">
                <span className="h-1 w-10 rounded-full bg-hairline" aria-hidden />
              </div>
              <div className="relative mt-3 aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={sheet.image}
                  alt={sheet.name}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="px-5 pb-8 pt-5">
                <p className="font-label">{sheet.region}</p>
                <h3
                  id="place-sheet-title"
                  className="font-display mt-2 text-[28px] text-forest"
                >
                  {sheet.name}
                </h3>
                <p className="mt-2 text-stone">{sheet.sentence}</p>
                <p className="mt-3 text-[13px] text-stone">
                  {sheet.credit} · {sheet.license}
                </p>
                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    className="btn-press btn-forest min-h-12 flex-1 rounded-sm bg-forest text-ivory"
                    onClick={() => {
                      onAddPlace?.(sheet.id);
                      setSheetPlace(null);
                      document.getElementById("plan")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    Add to my journey
                  </button>
                  <button
                    type="submit"
                    className="btn-press min-h-12 min-w-12 rounded-sm border border-stone/40 px-4 text-forest"
                    aria-label="Close"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </form>
          <button
            type="button"
            className="fixed inset-0 -z-10 bg-charcoal/40"
            aria-label="Dismiss"
            onClick={() => setSheetPlace(null)}
          />
        </dialog>
      )}
    </section>
  );
}
