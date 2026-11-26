import { Wordmark } from "@/components/Wordmark";
import { business } from "@/lib/business";
import { places } from "@/lib/destinations";

export function Footer() {
  const credits = [
    ...places.map((p) => ({
      place: p.name,
      credit: p.credit,
      license: p.license,
      url: p.creditUrl,
    })),
  ];
  // Dedupe by image url credit line
  const seen = new Set<string>();
  const unique = credits.filter((c) => {
    const key = `${c.place}|${c.credit}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return (
    <footer className="bg-forest px-4 py-16 text-mist md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <Wordmark inverted />
        <p className="mt-6 max-w-md text-[15px] leading-relaxed">
          {business.address}
        </p>
        <p className="mt-2 text-[15px]">{business.hours}</p>

        <div className="mt-12 border-t border-garden pt-8">
          <p className="font-label text-gold-light">Photo credits</p>
          <ul className="mt-4 space-y-2 text-[13px] leading-relaxed">
            {unique.map((c) => (
              <li key={`${c.place}-${c.credit}`}>
                {c.place} —{" "}
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-mist"
                >
                  {c.credit}
                </a>{" "}
                · {c.license}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[13px]">
            Photos show the destinations, not our vehicles or staff.
          </p>
        </div>

        <p className="mt-10 text-[13px] text-mist/80">
          Concept demo — built as a surprise for {business.name}. Verified facts
          from the public Google Maps listing; example routes are illustrative
          until confirmed.
        </p>
      </div>
    </footer>
  );
}
