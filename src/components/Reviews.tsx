import { business, reviews } from "@/lib/business";
import { Reveal } from "@/components/Reveal";

export function Reviews() {
  const featured = reviews.find((r) => r.featured)!;
  const others = reviews.filter((r) => !r.featured);

  return (
    <section
      id="reviews"
      className="px-4 py-20 md:px-8 md:py-28"
      aria-labelledby="reviews-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-label">Guests&apos; words</p>
        <h2
          id="reviews-heading"
          className="font-display mt-3 text-[clamp(1.85rem,4vw,3rem)] font-[350] text-forest"
        >
          From travellers who went with us
        </h2>
        <p className="mt-3 text-stone">
          {business.reviewThemes.join(" · ")}
        </p>

        <Reveal className="mt-12 max-w-3xl md:ml-0">
          <p className="font-label">Google review</p>
          <blockquote className="font-display mt-4 text-[24px] leading-snug text-charcoal md:text-[32px]">
            “{featured.quote}”
          </blockquote>
          <footer className="mt-4 text-[15px] text-stone">
            — {featured.name}, via Google
          </footer>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
          {others.map((r, i) => (
            <Reveal key={r.id} delayMs={i * 80} className={i === 1 ? "md:mt-16" : ""}>
              <p className="font-label">Google review</p>
              <blockquote className="mt-3 text-[17px] leading-relaxed text-charcoal">
                “{r.quote}”
              </blockquote>
              <footer className="mt-3 text-[14px] text-stone">
                — {r.name}, via Google
              </footer>
            </Reveal>
          ))}
        </div>

        <a
          href={business.googleMapsSearch}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline mt-12 inline-flex min-h-11 items-center text-forest"
        >
          {business.rating} · {business.reviewCount} reviews on Google →
        </a>
      </div>
    </section>
  );
}
