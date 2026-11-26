import { business } from "@/lib/business";

const items = [
  { label: business.hours },
  { label: `${business.rating}★ on Google` },
  { label: "Delhi-based" },
  { label: `${business.reviewCount} Google reviews` },
];

export function TrustStrip() {
  return (
    <section
      aria-label="At a glance"
      className="border-y border-sandstone/15 bg-indigo"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-4 py-4 sm:px-6 lg:px-8">
        {items.map((item) => (
          <p
            key={item.label}
            className="text-sm font-medium tracking-wide text-sandstone"
          >
            {item.label}
          </p>
        ))}
      </div>
    </section>
  );
}
