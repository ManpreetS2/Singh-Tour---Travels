"use client";

import { useState } from "react";
import { NorthMapSvg } from "@/components/NorthMapSvg";
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

type Sheet = "places" | "month" | "note" | null;

export function TripPlanner({
  seedPlaces = [],
}: {
  seedPlaces?: string[];
}) {
  /** Local toggles; seeds from gallery arrive via remount key on the parent. */
  const [placeIds, setPlaceIds] = useState<string[]>(() => seedPlaces);
  const [month, setMonth] = useState<string>("December");
  const [exactDate, setExactDate] = useState("");
  const [people, setPeople] = useState(4);
  const [note, setNote] = useState("");
  const [sheet, setSheet] = useState<Sheet>(null);

  const placeNames = placeIds
    .map((id) => getPlace(id)?.name)
    .filter(Boolean) as string[];

  const whenLabel = exactDate
    ? formatDateDdMmYyyy(exactDate)
    : month;

  const sentence = `I'd like to travel from Delhi to ${
    placeNames.length ? placeNames.join(", ") : "…"
  }, around ${whenLabel}, with ${people} people.${
    note ? ` Note: ${note}` : ""
  }`;

  const message = [
    `Enquiry — ${business.name}`,
    sentence,
  ].join("\n");

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
          className="font-display mt-3 text-[30px] leading-tight text-forest md:text-[48px]"
        >
          Compose your journey
        </h2>
        <p className="mt-3 max-w-[42ch] text-stone">
          No prices online. Choose places and a month; we call you back.
        </p>

        <p
          className="font-display mt-10 text-[22px] leading-relaxed text-charcoal md:text-[28px]"
          aria-live="polite"
        >
          I&apos;d like to travel{" "}
          <span className="underline decoration-forest/40 underline-offset-4">
            from Delhi
          </span>{" "}
          to{" "}
          <button
            type="button"
            className="btn-press min-h-11 underline decoration-forest underline-offset-4 text-forest"
            aria-haspopup="dialog"
            aria-label={placeLabel}
            onClick={() => setSheet("places")}
          >
            {placeNames.length ? placeNames.join(", ") : "choose places ＋"}
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

        {/* Summary card */}
        <div className="charbagh-corners mt-12 bg-ivory p-6 md:p-8">
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="min-w-0 flex-1">
              <p className="font-label">Your enquiry</p>
              <p className="mt-3 text-[16px] leading-relaxed text-charcoal">
                {sentence}
              </p>
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
            <div className="w-full shrink-0 overflow-hidden rounded-sm sm:w-[140px]">
              <NorthMapSvg
                compact
                staticAll
                litPlaces={placeIds}
                className="aspect-[360/220] h-auto max-h-[120px]"
              />
            </div>
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
                className="font-display text-[24px] text-forest"
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
                    <ul className="mt-2 space-y-1">
                      {plannerPlaces()
                        .filter((p) => p.regionId === region.id)
                        .map((place) => {
                          const on = placeIds.includes(place.id);
                          return (
                            <li key={place.id}>
                              <button
                                type="button"
                                className={cn(
                                  "btn-press flex min-h-12 w-full items-center justify-between rounded-sm px-3 text-left",
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
                                <span>{place.name}</span>
                                <span aria-hidden>{on ? "✓" : "＋"}</span>
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
