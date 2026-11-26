"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { getPlace, places, regions, type Place } from "@/lib/destinations";
import { cn } from "@/lib/utils";

type Props = {
  onAddPlace?: (placeId: string) => void;
};

function galleryCards(): Place[] {
  // Tall snap cards — primary places only (skip secondary photo slots)
  return places.filter((p) => p.role !== "secondary");
}

export function Gallery({ onAddPlace }: Props) {
  const cards = useMemo(() => galleryCards(), []);
  const [activePlaceId, setActivePlaceId] = useState(cards[0]?.id ?? "amritsar");
  const [sheetPlace, setSheetPlace] = useState<string | null>(null);

  const activePlace = getPlace(activePlaceId) ?? cards[0];
  const activeRegion =
    regions.find((r) => r.id === activePlace?.regionId) ?? regions[0];
  const secondary = getPlace(activeRegion.photos[1]) ?? activePlace;
  const sheet = sheetPlace ? getPlace(sheetPlace) : null;

  return (
    <section
      id="destinations"
      className="px-0 py-16 md:px-8 md:py-28"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-0">
        <p className="font-label">Places from Delhi</p>
        <h2
          id="gallery-heading"
          className="font-display mt-3 max-w-[18ch] text-[clamp(1.85rem,4vw,3rem)] font-[350] leading-tight text-forest"
        >
          The courtyard gallery
        </h2>
        <p className="mt-3 max-w-[42ch] text-stone">
          Places people often travel to from Delhi — not packages. Confirm
          details with us.
        </p>
      </div>

      {/* Mobile: horizontal snap row of tall image cards */}
      <div
        className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 md:hidden"
        style={{ scrollbarWidth: "none" }}
        aria-label="Destination photos"
      >
        {cards.map((place) => (
          <button
            key={place.id}
            type="button"
            className="btn-press relative w-[72vw] max-w-[300px] shrink-0 snap-center overflow-hidden text-left"
            style={{ aspectRatio: "3 / 4" }}
            onClick={() => setSheetPlace(place.id)}
            aria-haspopup="dialog"
            aria-label={`${place.name}, ${place.region}`}
          >
            <Image
              src={place.image}
              alt=""
              fill
              sizes="72vw"
              className="object-cover"
            />
            <span className="absolute inset-x-0 bottom-0 bg-[color-mix(in_srgb,var(--forest-deep)_80%,transparent)] px-3 py-3">
              <span className="font-label block text-gold-light">
                {place.region}
              </span>
              <span className="font-display mt-1 block text-[22px] font-[350] text-ivory">
                {place.name}
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Desktop: sticky index + asymmetric photo pair with crossfade */}
      <div className="mx-auto mt-16 hidden max-w-6xl grid-cols-12 gap-10 md:grid">
        <div className="col-span-5">
          <div className="sticky top-[calc(var(--header-h)+24px)] space-y-8">
            {regions.map((region, index) => {
              const list = region.placeIds
                .map((id) => getPlace(id)!)
                .filter(Boolean);
              return (
                <div key={region.id}>
                  <p className="font-label">
                    {String(index + 1).padStart(2, "0")} · {region.label}
                  </p>
                  <ul className="mt-3 space-y-1">
                    {list.map((place) => {
                      const on = activePlaceId === place.id;
                      return (
                        <li key={place.id}>
                          <button
                            type="button"
                            className={cn(
                              "btn-press min-h-11 w-full text-left font-display text-[28px] font-[350] leading-tight transition-colors duration-300",
                              on ? "text-forest" : "text-stone hover:text-forest",
                            )}
                            onMouseEnter={() => setActivePlaceId(place.id)}
                            onFocus={() => setActivePlaceId(place.id)}
                            onClick={() => setSheetPlace(place.id)}
                            aria-haspopup="dialog"
                            aria-current={on ? "true" : undefined}
                          >
                            {place.name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-span-7">
          <div className="sticky top-[calc(var(--header-h)+24px)]">
            <div className="relative">
              {/* Large primary — crossfade stack */}
              <div className="relative aspect-[4/5] w-[88%] overflow-hidden">
                {cards.map((place) => (
                  <div
                    key={place.id}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                      activePlaceId === place.id
                        ? "opacity-100"
                        : "pointer-events-none opacity-0",
                    )}
                    aria-hidden={activePlaceId !== place.id}
                  >
                    <Image
                      src={place.image}
                      alt={`${place.name}, ${place.region}`}
                      fill
                      sizes="50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Asymmetric offset secondary */}
              {secondary && secondary.id !== activePlace?.id && (
                <div className="absolute -bottom-8 right-0 z-10 aspect-[4/5] w-[38%] overflow-hidden shadow-[0_16px_48px_rgba(30,33,32,0.22)]">
                  <Image
                    key={secondary.id}
                    src={secondary.image}
                    alt={secondary.name}
                    fill
                    sizes="20vw"
                    className="object-cover transition-opacity duration-500"
                  />
                </div>
              )}
            </div>

            {activePlace && (
              <div className="mt-12 max-w-[34ch]">
                <p className="font-label text-gold-deep">
                  {activePlace.region}
                </p>
                <p className="font-display mt-2 text-[24px] font-[350] text-forest">
                  {activePlace.name}
                </p>
                <p className="mt-2 text-[15px] text-stone">
                  {activePlace.sentence}
                </p>
                <p className="mt-3 text-[13px] text-stone">
                  {activePlace.credit} · {activePlace.license}
                </p>
              </div>
            )}
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
                  className="font-display mt-2 text-[28px] font-[350] text-forest"
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
                      document
                        .getElementById("plan")
                        ?.scrollIntoView({ behavior: "smooth" });
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
