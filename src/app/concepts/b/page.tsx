import Image from "next/image";
import Link from "next/link";
import { WordmarkSafarnama } from "@/components/concepts/WordmarkSafarnama";

const chapters = [
  {
    folio: "Chapter 1 · Punjab",
    title: "Amritsar",
    body: "Evening light on Harmandir Sahib and the quiet of the Amrit Sarovar.",
    image: "/images/v2/hero-golden-temple-night.jpg",
    night: true,
  },
  {
    folio: "Chapter 2 · Golden Triangle",
    title: "Agra",
    body: "The Taj Mahal: the classic day journey south from Delhi.",
    image: "/images/v2/agra-taj.jpg",
    night: false,
  },
  {
    folio: "Chapter 3 · Rajasthan",
    title: "Jaipur",
    body: "Hawa Mahal on the old city street: pink sandstone and rickshaw traffic.",
    image: "/images/v2/jaipur-hawa.jpg",
    night: false,
  },
  {
    folio: "Chapter 4 · Ganga",
    title: "Rishikesh",
    body: "Lakshman Jhula over the river, with the foothill town below.",
    image: "/images/v2/rishikesh-jhula.jpg",
    night: false,
    teal: true,
  },
  {
    folio: "Chapter 5 · Himachal",
    title: "Shimla",
    body: "The Ridge and Christ Church: cool air above the plains.",
    image: "/images/v2/shimla-ridge.jpg",
    night: false,
  },
];

export default function ConceptB() {
  return (
    <div className="concepts-b min-h-svh">
      <header className="sticky top-0 z-40 border-b border-[#1F1A16]/10 bg-[rgba(243,236,223,0.94)] backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <WordmarkSafarnama className="h-12 w-auto max-w-[220px] sm:h-14 sm:max-w-[280px]" />
          <div className="flex items-center gap-3">
            <span className="concept-banner text-[#6B6357]">Concept demo</span>
            <Link
              href="/concepts"
              className="text-xs text-[#6B6357] underline-offset-2 hover:underline"
            >
              All concepts
            </Link>
          </div>
        </div>
      </header>

      {/* Title page hero — type only */}
      <section
        id="hero"
        className="relative mx-auto flex min-h-[100svh] max-w-5xl flex-col justify-center px-4 py-20 sm:px-6"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-[#6B6357]">
          Chapter 0 · Delhi
        </p>
        <div className="mt-8">
          <WordmarkSafarnama sealOnly className="h-20 w-20" />
        </div>
        <h1 className="font-display mt-8 max-w-[14ch] text-[clamp(2.5rem,8vw,4.5rem)] leading-[1.05] tracking-tight text-[#1F1A16]">
          Safarnama: journeys that begin in West Delhi.
        </h1>
        <p className="font-seal mt-4 text-xl text-[#A9521A] sm:text-2xl">
          हर सफ़र, घर जैसा।
        </p>
        <p className="mt-6 max-w-md text-base leading-relaxed text-[#6B6357]">
          Open 24 hours · Tagore Garden Extension, Delhi
        </p>
        <p className="mt-8 text-lg">
          <a
            href="tel:+919818749172"
            className="font-display text-[#A9521A] underline decoration-[#C8641E]/40 underline-offset-4"
          >
            Call +91 98187 49172
          </a>
        </p>
        <p className="concept-banner mt-10 text-[#6B6357]">
          Concept demo. Call to confirm any trip.
        </p>
        {/* Route line motif */}
        <svg
          className="pointer-events-none absolute right-4 top-24 hidden h-64 w-16 opacity-80 sm:block"
          viewBox="0 0 40 260"
          aria-hidden
        >
          <path
            className="route-line"
            d="M20 0 V40 M20 40 Q20 60 28 80 Q36 100 20 120 Q4 140 20 160 Q36 180 20 200 Q4 220 20 240 V260"
          />
          <circle cx="20" cy="40" r="3" fill="#C8641E" />
          <circle cx="20" cy="120" r="3" fill="#C8641E" />
          <circle cx="20" cy="200" r="3" fill="#C8641E" />
        </svg>
      </section>

      {/* Photo chapters */}
      <div id="destinations">
        {chapters.map((ch) => (
          <section
            key={ch.title}
            className="chapter-photo"
            style={{
              background: ch.night
                ? "#191F2B"
                : ch.teal
                  ? "#1F5C5A"
                  : undefined,
            }}
          >
            <Image
              src={ch.image}
              alt={`${ch.title}: ${ch.body}`}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background: ch.night
                  ? "linear-gradient(to top, rgba(25,31,43,0.92), transparent 55%)"
                  : ch.teal
                    ? "linear-gradient(to top, rgba(31,92,90,0.85), transparent 55%)"
                    : "linear-gradient(to top, rgba(31,26,22,0.55), transparent 50%)",
              }}
              aria-hidden
            />
            <div
              className="chapter-panel relative z-10"
              style={
                ch.night || ch.teal
                  ? { background: "rgba(243,236,223,0.94)" }
                  : undefined
              }
            >
              <p className="text-xs uppercase tracking-[0.16em] text-[#6B6357]">
                {ch.folio}
              </p>
              <h2 className="font-display mt-2 text-3xl text-[#1F1A16]">
                {ch.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#1F1A16]/80">
                {ch.body}
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* Reviews as marginal notes */}
      <section id="reviews" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6B6357]">
          Marginal notes
        </p>
        <h2 className="font-display mt-2 text-3xl">
          4.6 on Google from 30 reviews
        </h2>
        <a
          href="https://www.google.com/maps/search/?api=1&query=Singh+Tour+%26+Travels+Tagore+Garden+Delhi"
          className="mt-2 inline-block text-sm text-[#A9521A] underline-offset-4 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read all reviews on Google
        </a>
        <ul className="mt-12 space-y-10 border-l-2 border-[#C8641E]/40 pl-6">
          {[
            {
              name: "Ravinder Singh",
              q: "Travelled from panipat and had amazing experience, sukhwant ji was very punctual and polite. It was a great trip",
            },
            {
              name: "Gagan Grover",
              q: "Had an amazing journey with singh tour and travels today. The driver was Professional and was just like a family. Thank you!",
            },
            {
              name: "Megha Nanda",
              q: "Very good experience with Sonu bhaiya .his driving is very safe and he is very punctual",
            },
          ].map((r) => (
            <li key={r.name}>
              <blockquote className="font-display text-xl leading-snug text-[#1F1A16] sm:text-2xl">
                “{r.q}”
              </blockquote>
              <footer className="mt-3 text-sm text-[#6B6357]">
                — {r.name}, Google review
              </footer>
            </li>
          ))}
        </ul>
      </section>

      {/* Sentence planner */}
      <section
        id="planner"
        className="border-y border-[#1F1A16]/10 bg-[#EDE6D8] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[#6B6357]">
            Write your journey
          </p>
          <h2 className="font-display mt-2 text-3xl">
            One sentence. We call you back.
          </h2>
          <p className="mt-3 text-[#6B6357]">
            No prices online. Concept demo — not a booking.
          </p>

          <div className="font-display mt-10 rounded-sm border border-[#1F1A16]/15 bg-[#F3ECDF] p-6 text-lg leading-relaxed sm:p-8 sm:text-xl">
            <p>
              I want to travel from{" "}
              <span className="border-b-2 border-[#A9521A] px-1 font-semibold">
                Delhi
              </span>{" "}
              to{" "}
              <span className="border-b-2 border-[#A9521A] px-1 font-semibold">
                Haridwar ▾
              </span>{" "}
              on{" "}
              <span className="border-b-2 border-[#A9521A] px-1 font-semibold">
                14 Dec 2026
              </span>
              , with{" "}
              <span className="border-b-2 border-[#A9521A] px-1 font-semibold">
                4
              </span>{" "}
              people. Please call me on{" "}
              <span className="border-b-2 border-[#A9521A] px-1 font-semibold">
                +91 …
              </span>
              .
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              Destination
              <select
                defaultValue="Haridwar"
                className="mt-1.5 w-full rounded-sm border border-[#1F1A16]/15 bg-white px-3 py-3 text-base"
              >
                <option>Amritsar</option>
                <option>Agra</option>
                <option>Jaipur</option>
                <option>Rishikesh</option>
                <option>Haridwar</option>
                <option>Shimla</option>
              </select>
            </label>
            <label className="block text-sm">
              Date
              <input
                type="date"
                lang="en-IN"
                defaultValue="2026-12-14"
                className="mt-1.5 w-full rounded-sm border border-[#1F1A16]/15 bg-white px-3 py-3 text-base"
              />
            </label>
            <label className="block text-sm">
              People
              <input
                type="number"
                defaultValue={4}
                min={1}
                className="mt-1.5 w-full rounded-sm border border-[#1F1A16]/15 bg-white px-3 py-3 text-base"
              />
            </label>
            <label className="block text-sm">
              Phone
              <input
                type="tel"
                placeholder="+91 …"
                className="mt-1.5 w-full rounded-sm border border-[#1F1A16]/15 bg-white px-3 py-3 text-base"
              />
            </label>
          </div>

          <a href="tel:+919818749172" className="btn-saffron mt-8">
            Call to confirm
          </a>
        </div>
      </section>

      {/* Colophon contact */}
      <section
        id="contact"
        className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-[#6B6357]">
          Colophon
        </p>
        <h2 className="font-display mt-2 text-3xl sm:text-4xl">
          Tagore Garden Extension
        </h2>
        <p className="mt-4 max-w-md text-[#6B6357]">
          1457, TC Camp Tilaknagar, Raghubir Nagar, Tagore Garden Extension,
          Delhi 110027 · J4W4+P4
        </p>
        <p className="mt-2">Open 24 hours</p>
        <p className="font-display mt-8 text-3xl text-[#A9521A] sm:text-5xl">
          <a href="tel:+919818749172">+91 98187 49172</a>
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="tel:+919818749172" className="btn-saffron">
            Call
          </a>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=J4W4%2BP4%20Delhi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center rounded-sm border border-[#1F1A16]/25 px-5 text-sm"
          >
            Directions
          </a>
        </div>
        <div className="relative mt-10 aspect-[16/9] max-w-xl overflow-hidden rounded-sm border border-[#1F1A16]/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/v2/contact-map.svg"
            alt="Map illustration of Tagore Garden Extension"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="mt-10">
          <WordmarkSafarnama sealOnly className="h-16 w-16 opacity-80" />
        </div>
      </section>

      <footer className="border-t border-[#1F1A16]/10 px-4 py-10 pb-28 text-xs text-[#6B6357] sm:px-6 md:pb-10">
        <div className="mx-auto max-w-5xl space-y-3">
          <p>Concept demo. Call to confirm any trip.</p>
          <p>
            Photos show destinations, not our vehicles. Wikimedia Commons
            credits as listed on Direction A. Tell us where you need to go:
            local, airport or outstation. We will tell you what we can arrange.
          </p>
          <p>
            <Link href="/concepts/a" className="underline underline-offset-2">
              ← See Direction A · Departures
            </Link>
          </p>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#1F1A16]/10 bg-[rgba(243,236,223,0.96)] p-3 backdrop-blur-md md:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <a
          href="tel:+919818749172"
          className="btn-saffron flex w-full justify-center"
        >
          Call
        </a>
      </div>
    </div>
  );
}
