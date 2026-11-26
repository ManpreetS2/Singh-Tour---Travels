import { business, reviews } from "@/lib/business";

export function Reviews() {
  return (
    <section id="reviews" className="bg-indigo py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-clay">
              Real reviews
            </p>
            <h2 className="font-display mt-3 text-3xl tracking-tight text-paper sm:text-4xl">
              {business.rating}★ from travellers on Google
            </h2>
            <p className="mt-3 max-w-md text-sandstone/90">
              Quotes from Google reviews of {business.name}.{" "}
              {business.reviewCount} reviews in total.
            </p>
          </div>
          <a
            href={business.googleMapsSearch}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press focus-ring inline-flex rounded-sm border border-sandstone/35 px-4 py-2.5 text-sm text-paper"
          >
            Read all reviews on Google
          </a>
        </div>

        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {reviews.map((review) => (
            <li key={review.name} className="flex flex-col">
              <blockquote className="font-display text-lg leading-snug text-paper sm:text-xl">
                “{review.quote}”
              </blockquote>
              <footer className="mt-5 text-sm text-sandstone">
                <cite className="not-italic font-medium text-paper">
                  {review.name}
                </cite>
                <span className="text-muted"> · via Google</span>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
