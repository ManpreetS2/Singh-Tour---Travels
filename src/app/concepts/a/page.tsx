import Image from "next/image";
import Link from "next/link";
import { WordmarkDepartures } from "@/components/concepts/WordmarkDepartures";

const places = [
  {
    name: "Amritsar",
    state: "Punjab",
    label: "AMRITSAR · Punjab · Harmandir Sahib (Golden Temple)",
    sentence:
      "Evening light on Harmandir Sahib and the quiet of the Amrit Sarovar.",
    image: "/images/v2/hero-golden-temple-night.jpg",
    code: "ATQ",
  },
  {
    name: "Delhi",
    state: "NCR",
    label: "DELHI · NCR · Humayun's Tomb",
    sentence:
      "Humayun's Tomb gardens: a calm city circuit before the open road.",
    image: "/images/v2/delhi-humayun.jpg",
    code: "DEL",
  },
  {
    name: "Rishikesh",
    state: "Uttarakhand",
    label: "RISHIKESH · Uttarakhand · Lakshman Jhula",
    sentence: "Lakshman Jhula over the Ganga, with the riverside town below.",
    image: "/images/v2/rishikesh-jhula.jpg",
    code: "RKSH",
  },
  {
    name: "Agra",
    state: "Uttar Pradesh",
    label: "AGRA · Uttar Pradesh · Taj Mahal",
    sentence: "The Taj Mahal at Agra: the classic day journey from Delhi.",
    image: "/images/v2/agra-taj.jpg",
    code: "AGR",
  },
  {
    name: "Shimla",
    state: "Himachal",
    label: "SHIMLA · Himachal · The Ridge",
    sentence: "The Ridge and Christ Church: hill air above the plains.",
    image: "/images/v2/shimla-ridge.jpg",
    code: "SLD",
  },
  {
    name: "Jaipur",
    state: "Rajasthan",
    label: "JAIPUR · Rajasthan · Hawa Mahal",
    sentence: "Hawa Mahal on the old city street: pink sandstone and traffic.",
    image: "/images/v2/jaipur-hawa.jpg",
    code: "JAI",
  },
];

function FlapWord({ word }: { word: string }) {
  return (
    <div className="flap-row" aria-label={word}>
      {word.split("").map((ch, i) =>
        ch === " " ? (
          <span key={i} className="flap-tile flap-space" aria-hidden>
            {"\u00A0"}
          </span>
        ) : (
          <span key={i} className="flap-tile" aria-hidden>
            {ch}
          </span>
        ),
      )}
    </div>
  );
}

export default function ConceptA() {
  return (
    <div className="concepts-a min-h-svh">
      {/* 0 — header */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[rgba(14,20,36,0.92)] backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <WordmarkDepartures className="h-12 w-auto max-w-[200px] sm:h-14 sm:max-w-[240px]" />
          <div className="flex items-center gap-3">
            <span className="concept-banner hidden text-[#9AA3B5] sm:inline">
              Concept demo
            </span>
            <span className="font-mono rounded-sm border border-[#F2A93B]/50 px-2.5 py-1 text-xs text-[#F2A93B]">
              24 hrs
            </span>
            <Link
              href="/concepts"
              className="font-mono text-xs text-[#9AA3B5] underline-offset-2 hover:underline"
            >
              All concepts
            </Link>
          </div>
        </div>
      </header>

      {/* 1 — Hero / board */}
      <section
        id="hero"
        className="relative mx-auto grid min-h-[100svh] max-w-6xl gap-8 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-2 lg:items-center lg:pb-20"
      >
        <div className="relative z-10">
          <p className="concept-banner text-[#9AA3B5]">
            Concept demo. Call to confirm any trip.
          </p>
          <h1 className="font-board mt-4 text-[clamp(2.4rem,8vw,3.75rem)] leading-[0.95] tracking-wide text-[#F4EFE6]">
            From Delhi, anywhere.
            <br />
            Day or night.
          </h1>
          <p className="font-hindi mt-3 text-xl text-[#9AA3B5]">
            दिल्ली से, कहीं भी। दिन हो या रात।
          </p>

          <div className="mt-8 space-y-3 rounded-sm border border-white/10 bg-[#1A2236] p-4 sm:p-5">
            <div>
              <p className="font-mono mb-1 text-[0.65rem] uppercase tracking-[0.18em] text-[#9AA3B5]">
                From
              </p>
              <FlapWord word="FROM DELHI" />
            </div>
            <div>
              <p className="font-mono mb-1 text-[0.65rem] uppercase tracking-[0.18em] text-[#9AA3B5]">
                To
              </p>
              <FlapWord word="AMRITSAR" />
            </div>
            <div>
              <p className="font-mono mb-1 text-[0.65rem] uppercase tracking-[0.18em] text-[#9AA3B5]">
                Status
              </p>
              <FlapWord word="OPEN 24 HRS" />
            </div>
          </div>

          <p className="mt-6 max-w-md text-base leading-relaxed text-[#9AA3B5]">
            No prices online. Tell us the trip, we call you back.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#planner" className="btn-amber">
              Plan a trip
            </a>
            <a
              href="tel:+919818749172"
              className="inline-flex min-h-12 items-center rounded-sm border border-[#F4EFE6]/35 px-5 text-sm font-medium text-[#F4EFE6] max-lg:hidden"
            >
              Call +91 98187 49172
            </a>
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-sm lg:aspect-auto lg:min-h-[70vh]">
          <Image
            src="/images/v2/hero-golden-temple-night.jpg"
            alt="Golden Temple (Harmandir Sahib) at night, Amritsar"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#0E1424] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#0E1424]/80 lg:via-transparent"
            aria-hidden
          />
        </div>
      </section>

      {/* 2 — Route chips */}
      <section className="border-y border-white/10 bg-[#1A2236] py-5">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 sm:px-6">
          {places.map((p) => (
            <span
              key={p.name}
              className="font-mono inline-flex min-h-11 shrink-0 items-center rounded-sm border border-[#F2A93B]/35 px-3 text-xs tracking-wide text-[#F2A93B]"
            >
              {p.name.toUpperCase()}
            </span>
          ))}
        </div>
      </section>

      {/* 3 — Destinations rail */}
      <section id="destinations" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#F2A93B]">
            The board
          </p>
          <h2 className="font-board mt-2 text-3xl tracking-wide sm:text-4xl">
            Places reachable from Delhi
          </h2>
          <p className="mt-3 max-w-lg text-[#9AA3B5]">
            Illustrative destinations. Photos show the places, not our vehicles.
            Confirm any trip by phone.
          </p>
        </div>
        <div className="dest-rail mt-8">
          {places.map((p) => (
            <article key={p.name} className="dest-slide bg-[#1A2236]">
              <Image
                src={p.image}
                alt={p.label}
                fill
                className="object-cover"
                sizes="86vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-[#0E1424]/95 p-4">
                <p className="font-mono text-[0.65rem] leading-snug tracking-wide text-[#F2A93B]">
                  {p.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#F4EFE6]">
                  {p.sentence}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5 — Reviews as arrivals */}
      <section id="reviews" className="border-t border-white/10 bg-[#1A2236] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#F2A93B]">
            Arrivals
          </p>
          <h2 className="font-board mt-2 text-3xl tracking-wide">
            4.6 on Google · 30 reviews
          </h2>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Singh+Tour+%26+Travels+Tagore+Garden+Delhi"
            className="mt-2 inline-block text-sm text-[#9AA3B5] underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read all reviews on Google
          </a>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "comfortable journey",
              "punctuality",
              "clean car",
              "stress-free trip",
            ].map((t) => (
              <span
                key={t}
                className="font-mono rounded-sm border border-white/15 px-2 py-1 text-[0.65rem] text-[#9AA3B5]"
              >
                {t}
              </span>
            ))}
          </div>
          <ul className="mt-10 space-y-8">
            {[
              {
                name: "Ravinder S.",
                q: "Travelled from panipat and had amazing experience, sukhwant ji was very punctual and polite. It was a great trip",
              },
              {
                name: "Gagan G.",
                q: "Had an amazing journey with singh tour and travels today. The driver was Professional and was just like a family. Thank you!",
              },
              {
                name: "Megha N.",
                q: "Very good experience with Sonu bhaiya .his driving is very safe and he is very punctual",
              },
            ].map((r) => (
              <li
                key={r.name}
                className="border-t border-white/10 pt-6 font-mono text-xs text-[#9AA3B5]"
              >
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <span className="text-[#F2A93B]">{r.name}</span>
                  <span>Google review</span>
                </div>
                <p className="mt-3 font-sans text-lg leading-snug text-[#F4EFE6]">
                  “{r.q}”
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6 — Ticket planner */}
      <section id="planner" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#F2A93B]">
            Your ticket
          </p>
          <h2 className="font-board mt-2 text-3xl tracking-wide">
            Sketch the journey
          </h2>
          <p className="mt-3 max-w-lg text-[#9AA3B5]">
            No prices online. Choose a place and date and we call you back to
            confirm.
          </p>

          <div className="ticket mt-10 overflow-hidden">
            <div className="space-y-4 p-5 sm:p-8">
              <label className="block text-sm font-medium text-[#0E1424]/80">
                From
                <input
                  readOnly
                  defaultValue="Delhi"
                  className="mt-1.5 w-full rounded-sm border border-[#0E1424]/15 bg-white px-3 py-3 text-base"
                />
              </label>
              <label className="block text-sm font-medium text-[#0E1424]/80">
                To
                <select
                  defaultValue="Amritsar"
                  className="mt-1.5 w-full rounded-sm border border-[#0E1424]/15 bg-white px-3 py-3 text-base"
                >
                  {places.map((p) => (
                    <option key={p.name}>{p.name}</option>
                  ))}
                  <option>Somewhere else</option>
                </select>
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-[#0E1424]/80">
                  Date
                  <input
                    type="date"
                    lang="en-IN"
                    defaultValue="2026-12-14"
                    className="mt-1.5 w-full rounded-sm border border-[#0E1424]/15 bg-white px-3 py-3 text-base"
                  />
                  <span className="mt-1 block font-mono text-xs text-[#0E1424]/55">
                    Shown as 14 Dec 2026 (dd/mm/yyyy)
                  </span>
                </label>
                <label className="block text-sm font-medium text-[#0E1424]/80">
                  People
                  <div className="mt-1.5 flex items-center gap-2">
                    <button
                      type="button"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-sm border border-[#0E1424]/2 text-lg"
                      aria-label="Decrease"
                    >
                      −
                    </button>
                    <span className="min-w-8 text-center text-lg font-semibold">
                      4
                    </span>
                    <button
                      type="button"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-sm border border-[#0E1424]/2 text-lg"
                      aria-label="Increase"
                    >
                      +
                    </button>
                  </div>
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-[#0E1424]/80">
                  Name
                  <input
                    placeholder="Your name"
                    className="mt-1.5 w-full rounded-sm border border-[#0E1424]/15 bg-white px-3 py-3 text-base"
                  />
                </label>
                <label className="block text-sm font-medium text-[#0E1424]/80">
                  Phone
                  <input
                    type="tel"
                    placeholder="+91 …"
                    className="mt-1.5 w-full rounded-sm border border-[#0E1424]/15 bg-white px-3 py-3 text-base"
                  />
                </label>
              </div>
              <a href="tel:+919818749172" className="btn-amber mt-2 w-full sm:w-auto">
                Call to confirm
              </a>
              <p className="text-xs text-[#0E1424]/50">
                We will call you back to confirm. Concept demo — not a booking.
              </p>
            </div>
            <div className="ticket-stub">
              <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[#0E1424]/55">
                Stub
              </p>
              <p className="mt-3 text-sm font-medium leading-relaxed text-[#0E1424]">
                DEL → ATQ
                <br />
                14 DEC
                <br />
                4 PAX
              </p>
            </div>
            <span className="ticket-notch" aria-hidden />
          </div>
        </div>
      </section>

      {/* 8 — Contact */}
      <section id="contact" className="border-t border-white/10 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-sm border border-white/10 bg-[#1A2236] p-6 sm:p-8 lg:-mr-8 lg:z-10">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#F2A93B]">
              Contact
            </p>
            <h2 className="font-board mt-2 text-3xl tracking-wide">
              Tagore Garden Extension
            </h2>
            <address className="mt-4 not-italic text-sm leading-relaxed text-[#9AA3B5]">
              1457, TC Camp Tilaknagar, Raghubir Nagar, Tagore Garden Extension,
              Delhi 110027
              <br />
              Plus code J4W4+P4
            </address>
            <p className="mt-4 text-[#F4EFE6]">Open 24 hours</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="tel:+919818749172" className="btn-amber">
                Call
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=J4W4%2BP4%20Delhi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center rounded-sm border border-[#F4EFE6]/35 px-5 text-sm"
              >
                Directions
              </a>
            </div>
          </div>
          <div className="relative min-h-[280px] overflow-hidden rounded-sm bg-[#12182A]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/v2/contact-map.svg"
              alt="Map illustration of Tagore Garden Extension, West Delhi"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-10 pb-28 text-xs text-[#9AA3B5] sm:px-6 md:pb-10">
        <div className="mx-auto max-w-6xl space-y-3">
          <p>Concept demo. Call to confirm any trip.</p>
          <p>
            Photos show destinations, not our vehicles. Credits: Golden Temple
            night — Marsmux, CC BY-SA 4.0; Humayun&apos;s Tomb — Komal Sambhudas,
            CC0; Lakshman Jhula — Snehrashmi, CC BY-SA 4.0; Taj Mahal — Yann /
            King of Hearts, CC BY-SA 4.0; Shimla Ridge — Tanweer Morshed, CC
            BY-SA 4.0; Hawa Mahal — Marcin Białek, CC BY-SA 4.0. Wikimedia
            Commons.
          </p>
          <p>
            <Link href="/concepts/b" className="underline underline-offset-2">
              See Direction B · Safarnama →
            </Link>
          </p>
        </div>
      </footer>

      {/* Mobile bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0E1424]/95 p-3 backdrop-blur-md md:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <a
          href="tel:+919818749172"
          className="btn-amber flex w-full justify-center"
        >
          Call
        </a>
      </div>
    </div>
  );
}
