import { business, whatsappUrl } from "@/lib/business";

const services = [
  {
    title: "Airport transfers",
    body: "Timed pickups and drop-offs across NCR — enquire for your flight window.",
  },
  {
    title: "Outstation trips",
    body: "City-to-city journeys with drivers who know the North India roads.",
  },
  {
    title: "Family tours",
    body: "Space and patience for multi-stop days with children and elders.",
  },
  {
    title: "Pilgrimage journeys",
    body: "Calm, respectful travel for spiritual destinations — ask what's available.",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-ink py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-clay">
          Enquire about
        </p>
        <h2 className="font-display mt-3 max-w-xl text-3xl tracking-tight text-paper sm:text-4xl">
          How we can take you there
        </h2>
        <p className="mt-4 max-w-lg text-sandstone/90">
          We do not list a fixed fleet or price sheet here. Tell us the journey —
          we will confirm what is available.
        </p>

        <ul className="mt-12 grid gap-px bg-sandstone/15 sm:grid-cols-2">
          {services.map((s) => (
            <li
              key={s.title}
              className="bg-ink p-6 sm:p-8"
            >
              <h3 className="font-display text-xl text-paper">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-sandstone/90">
                {s.body}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={whatsappUrl(
              `Namaste ${business.name}, I'd like to ask what's available for my travel dates.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press focus-ring rounded-sm bg-clay px-5 py-3 text-sm font-semibold text-paper"
          >
            Ask us what&apos;s available
          </a>
          <p className="text-sm text-muted">No online booking · WhatsApp or call</p>
        </div>
      </div>
    </section>
  );
}
