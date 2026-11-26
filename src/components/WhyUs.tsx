import Image from "next/image";
import { business } from "@/lib/business";

const themes = [
  {
    title: "Comfortable journey",
    body: "Travellers mention feeling at ease from start to finish — the road should feel settled, not hurried.",
  },
  {
    title: "Punctual & polite",
    body: "On-time pickups and respectful hosts come up again and again in Google reviews.",
  },
  {
    title: "Clean car, calm mind",
    body: "A tidy vehicle and a stress-free trip — so families and outstation guests can simply enjoy the day.",
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="relative bg-ink py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-clay">
            Why travel with us
          </p>
          <h2 className="font-display mt-3 text-3xl leading-tight tracking-tight text-paper sm:text-4xl">
            What guests remember
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-sandstone/90">
            Themes drawn from real Google reviews of {business.name} — not
            marketing slogans.
          </p>
          <div className="relative mt-10 aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src="/images/highway-golden.jpg"
              alt="Open highway at golden hour — the kind of road journey travellers describe with us"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent"
              aria-hidden
            />
          </div>
        </div>

        <ul className="flex flex-col justify-center gap-10 lg:col-span-7">
          {themes.map((theme, i) => (
            <li
              key={theme.title}
              className="border-t border-sandstone/20 pt-8 first:border-t-0 first:pt-0"
            >
              <div className="flex gap-5">
                <span
                  className="font-display text-2xl text-clay/80"
                  aria-hidden
                >
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl text-paper sm:text-2xl">
                    {theme.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-base leading-relaxed text-sandstone/90">
                    {theme.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
