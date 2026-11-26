"use client";

import Image from "next/image";
import { useState } from "react";
import { business, callUrl, whatsappUrl } from "@/lib/business";
import { config } from "@/lib/config";
import {
  getPlace,
  plannerPlaces,
  regions,
} from "@/lib/destinations";
import { formatDateDdMmYyyy } from "@/lib/inquiry";
import { cn } from "@/lib/utils";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const PLACE_PLACEHOLDER = "a few places you choose";

type Sheet = "places" | "month" | "note" | null;

export function TripPlanner({
  seedPlaces = [],
}: {
  seedPlaces?: string[];
}) {
  const [placeIds, setPlaceIds] = useState<string[]>(() => seedPlaces);
  const [month, setMonth] = useState<string>("December");
  const [exactDate, setExactDate] = useState("");
  const [people, setPeople] = useState(4);
  const [note, setNote] = useState("");
  const [sheet, setSheet] = useState<Sheet>(null);

  const selectedPlaces = placeIds
    .map((id) => getPlace(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getPlace>>[];

  const placeNames = selectedPlaces.map((p) => p.name);

  const whenLabel = exactDate ? formatDateDdMmYyyy(exactDate) : month;

  const destinationPhrase = placeNames.length
    ? placeNames.join(", ")
    : PLACE_PLACEHOLDER;

  const sentence = `I'd like to travel from Delhi to ${destinationPhrase}, around ${whenLabel}, with ${people} people.${
    note ? ` Note: ${note}` : ""
  }`;

  const message = [`Enquiry — ${business.name}`, sentence].join("\n");
  const wa = config.whatsappEnabled ? whatsappUrl(message) : null;

  const placeLabel =
    placeNames.length > 0
      ? `Choose places, currently ${placeNames.join(", ")}`
      : "Choose places";

  return (
    <section
      id="plan"
      className="bg-sand px-4 py-20 md:px-8 md:py-28"
      aria-labelledby="plan-heading"
    >
      <div className="mx-auto max-w-3xl">
        <p className="font-label">Trip planner</p>
        <h2
          id="plan-heading"
          className="font-display mt-3 text-[clamp(1.85rem,4vw,3rem)] font-[350] leading-tight text-forest"
        >
          Compose your journey
        </h2>
        <p className="mt-3 max-w-[42ch] text-stone">
          No prices online. Choose places and a month; we call you back.
        </p>

        <p
          className="font-display mt-10 text-[22px] font-[350] leading-relaxed text-charcoal md:text-[28px]"
          aria-live="polite"
        >
          I&apos;d like to travel{" "}
          <span className="underline decoration-forest/40 underline-offset-4">
            from Delhi
          </span>{" "}
          to{" "}
          <button
            type="button"
            className={cn(
              "btn-press min-h-11 underline decoration-forest underline-offset-4",
              placeNames.length ? "text-forest" : "text-stone italic",
            )}
            aria-haspopup="dialog"
            aria-label={placeLabel}
            onClick={() => setSheet("places")}
          >
            {placeNames.length ? placeNames.join(", ") : PLACE_PLACEHOLDER}
          </button>
          , around{" "}
          <button
            type="button"
            className="btn-press min-h-11 underline decoration-forest underline-offset-4 text-forest"
            aria-haspopup="dialog"
            aria-label={`Choose month, currently ${whenLabel}`}
            onClick={() => setSheet("month")}
          >
            {whenLabel}
          </button>
          , with{" "}
          <span className="inline-flex items-center gap-2 align-middle">
            <button
              type="button"
              className="btn-press inline-flex min-h-12 min-w-12 items-center justify-center border border-forest/30 text-forest"
              aria-label="Fewer people"
              onClick={() => setPeople((n) => Math.max(1, n - 1))}
            >
              −
            </button>
            <span className="min-w-[2ch] text-center tabular-nums">{people}</span>
            <button
              type="button"
              className="btn-press inline-flex min-h-12 min-w-12 items-center justify-center border border-forest/30 text-forest"
              aria-label="More people"
              onClick={() => setPeople((n) => Math.min(40, n + 1))}
            >
              ＋
            </button>
            <span>people</span>
          </span>
          .{" "}
          <button
            type="button"
            className="btn-press min-h-11 text-[17px] text-stone underline decoration-hairline underline-offset-4"
            aria-haspopup="dialog"
            onClick={() => setSheet("note")}
          >
            {note ? "Edit note" : "Add a note"}
          </button>
        </p>

        {/* Selected place chips with thumbnails */}
        <div className="mt-6 flex flex-wrap gap-2">
          {selectedPlaces.map((place) => (
            <button
              key={place.id}
              type="button"
              className="btn-press inline-flex min-h-11 items-center gap-2 rounded-sm bg-forest py-1 pl-1 pr-3 text-ivory"
              onClick={() =>
                setPlaceIds((prev) => prev.filter((id) => id !== place.id))
              }
              aria-label={`Remove ${place.name}`}
            >
              <span className="relative h-9 w-9 overflow-hidden rounded-[2px]">
                <Image
                  src={place.image}
                  alt=""
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </span>
              <span className="text-[14px]">{place.name}</span>
              <span aria-hidden className="text-mist">
                ×
              </span>
            </button>
          ))}
          <button
            type="button"
            className="btn-press inline-flex min-h-11 items-center gap-2 rounded-sm border border-forest/30 px-3 text-forest"
            onClick={() => setSheet("places")}
          >
            <span aria-hidden>＋</span> Add places
          </button>
        </div>

        {/* Summary card — no stray map artwork */}
        <div className="relative mt-12 border border-hairline bg-ivory p-6 md:p-8">
          {/* Gold charbagh corner marks */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-[1.5px] border-t-[1.5px] border-gold"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-[1.5px] border-r-[1.5px] border-gold"
          />
          <p className="font-label">Your enquiry</p>
          <p className="mt-3 text-[16px] leading-relaxed text-charcoal">
            {sentence}
          </p>
          {selectedPlaces.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-3" aria-label="Stops">
              {selectedPlaces.map((place) => (
                <li
                  key={place.id}
                  className="flex items-center gap-2 text-[14px] text-stone"
                >
                  <span className="relative h-10 w-10 overflow-hidden">
                    <Image
                      src={place.image}
                      alt=""
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </span>
                  {place.name}
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-[14px] text-stone">
            No prices online. We call you back to confirm.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={callUrl()}
              className="btn-press btn-forest inline-flex min-h-12 items-center rounded-sm bg-forest px-6 text-ivory"
            >
              Call to confirm
            </a>
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex min-h-12 items-center rounded-sm border border-forest px-6 text-forest"
              >
                Send on WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>

      {sheet && (
        <dialog
          open
          className="fixed inset-x-0 bottom-0 z-[60] m-0 w-full max-w-none rounded-t-md border-0 bg-ivory p-0 shadow-[0_-20px_60px_rgba(30,33,32,0.25)]"
          onClose={() => setSheet(null)}
          aria-labelledby="planner-sheet-title"
        >
          <div className="mx-auto max-w-lg px-5 pb-10 pt-3">
            <div className="flex justify-center">
              <span className="h-1 w-10 rounded-full bg-hairline" aria-hidden />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <h3
                id="planner-sheet-title"
                className="font-display text-[24px] font-[350] text-forest"
              >
                {sheet === "places" && "Choose places"}
                {sheet === "month" && "Choose a month"}
                {sheet === "note" && "Add a note"}
              </h3>
              <button
                type="button"
                className="btn-press min-h-11 min-w-11 text-forest"
                onClick={() => setSheet(null)}
              >
                Done
              </button>
            </div>

            {sheet === "places" && (
              <div className="mt-4 max-h-[50svh] space-y-6 overflow-y-auto">
                {regions.map((region) => (
                  <div key={region.id}>
                    <p className="font-label">{region.label}</p>
                    <ul className="mt-2 space-y-2">
                      {plannerPlaces()
                        .filter((p) => p.regionId === region.id)
                        .map((place) => {
                          const on = placeIds.includes(place.id);
                          return (
                            <li key={place.id}>
                              <button
                                type="button"
                                className={cn(
                                  "btn-press flex min-h-14 w-full items-center gap-3 rounded-sm px-2 text-left",
                                  on
                                    ? "bg-forest text-ivory"
                                    : "bg-sand text-charcoal",
                                )}
                                aria-pressed={on}
                                onClick={() =>
                                  setPlaceIds((prev) =>
                                    on
                                      ? prev.filter((id) => id !== place.id)
                                      : [...prev, place.id],
                                  )
                                }
                              >
                                <span className="relative h-12 w-12 shrink-0 overflow-hidden">
                                  <Image
                                    src={place.image}
                                    alt=""
                                    fill
                                    sizes="48px"
                                    className="object-cover"
                                  />
                                </span>
                                <span className="flex-1 text-[16px]">
                                  {place.name}
                                </span>
                                <span aria-hidden className="pr-2">
                                  {on ? "✓" : "＋"}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {sheet === "month" && (
              <div className="mt-4">
                <div className="grid grid-cols-3 gap-2">
                  {MONTHS.map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={cn(
                        "btn-press min-h-12 rounded-sm text-[15px]",
                        month === m && !exactDate
                          ? "bg-forest text-ivory"
                          : "bg-sand text-charcoal",
                      )}
                      onClick={() => {
                        setMonth(m);
                        setExactDate("");
                      }}
                    >
                      {m.slice(0, 3)}
                    </button>
                  ))}
                </div>
                <label className="mt-6 block text-[14px] text-stone">
                  Exact date (optional, shown as dd/mm/yyyy)
                  <input
                    type="date"
                    lang="en-IN"
                    className="mt-2 min-h-12 w-full border border-hairline bg-ivory px-3 text-charcoal"
                    value={exactDate}
                    onChange={(e) => setExactDate(e.target.value)}
                  />
                </label>
                {exactDate && (
                  <p className="mt-2 text-[14px] text-forest">
                    Selected: {formatDateDdMmYyyy(exactDate)}
                  </p>
                )}
              </div>
            )}

            {sheet === "note" && (
              <textarea
                className="mt-4 min-h-32 w-full border border-hairline bg-ivory p-3 text-charcoal"
                placeholder="Airport pickup, hotel name, anything we should know…"
                value={note}
                onChange={(e) => setNote(e.target.value.slice(0, 500))}
                maxLength={500}
              />
            )}
          </div>
          <button
            type="button"
            className="fixed inset-0 -z-10 bg-charcoal/40"
            aria-label="Dismiss"
            onClick={() => setSheet(null)}
          />
        </dialog>
      )}
    </section>
  );
}
