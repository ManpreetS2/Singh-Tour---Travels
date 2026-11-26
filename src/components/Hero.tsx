import Image from "next/image";
import { business, callUrl, whatsappUrl } from "@/lib/business";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden"
      aria-label="Hero"
    >
      <div className="absolute inset-0 grain">
        <div className="ken-burns absolute inset-0 origin-center">
          <Image
            src="/images/hero-himalaya.jpg"
            alt={`${business.name} — Himalayan peaks above a sea of clouds at golden hour`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-28 pt-36 sm:px-6 sm:pb-32 lg:px-8 lg:pb-36">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-sandstone">
          Delhi · Travel agency · {business.hours}
        </p>
        <h1 className="font-display max-w-[14ch] text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.95] tracking-[-0.02em] text-paper">
          {business.name}
        </h1>
        <p className="font-hindi mt-3 text-lg text-sandstone/90 sm:text-xl">
          {business.nameHindi}
        </p>
        <p className="mt-5 max-w-md text-base leading-relaxed text-paper/85 sm:text-lg">
          Comfortable journeys from West Delhi — punctual, calm, and cared for
          like family.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#planner"
            className="btn-press focus-ring rounded-sm bg-clay px-5 py-3 text-sm font-semibold text-paper"
          >
            Plan a trip
          </a>
          <a
            href={callUrl()}
            className="btn-press focus-ring rounded-sm border border-sandstone/40 bg-ink/30 px-5 py-3 text-sm text-paper backdrop-blur-sm"
          >
            Call {business.phoneDisplay}
          </a>
          <a
            href={whatsappUrl(
              `Namaste! I'd like to plan a trip with ${business.name}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press focus-ring rounded-sm border border-sandstone/40 bg-ink/30 px-5 py-3 text-sm text-paper backdrop-blur-sm"
          >
            WhatsApp (if available)
          </a>
        </div>
      </div>
    </section>
  );
}
