import Image from "next/image";
import { business, callUrl } from "@/lib/business";
import { Reveal } from "@/components/Reveal";

export function Contact() {
  return (
    <section
      id="contact"
      className="bg-ivory px-4 py-20 md:px-8 md:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <p className="font-label">Visit</p>
          <h2
            id="contact-heading"
            className="font-display mt-3 text-[30px] text-forest md:text-[40px]"
          >
            From West Delhi
          </h2>
          <Reveal>
            <address className="font-display mt-6 text-[22px] not-italic leading-snug text-charcoal md:text-[26px]">
              {business.address}
            </address>
            <p className="mt-4 text-stone">{business.hours}</p>
            <p className="mt-1 text-stone">Plus code {business.plusCode}</p>

            <div className="mt-8 flex flex-col items-start gap-3">
              <a
                href={callUrl()}
                className="btn-press btn-forest inline-flex min-h-12 items-center rounded-sm bg-forest px-6 text-ivory"
              >
                Call {business.phoneDisplay}
              </a>
              <a
                href={business.googleMapsDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex min-h-11 items-center text-forest"
              >
                Directions
              </a>
            </div>

            <dl className="mt-10 space-y-3 text-[15px]">
              <div className="flex gap-4">
                <dt className="font-label w-24 shrink-0">Phone</dt>
                <dd>
                  <a href={callUrl()} className="link-underline text-charcoal">
                    {business.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="font-label w-24 shrink-0">Hours</dt>
                <dd className="text-charcoal">{business.hours}</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal className="md:col-span-7 md:mt-12" delayMs={80}>
          <div className="relative ml-auto aspect-[4/3] w-[90%] overflow-hidden md:w-full">
            <Image
              src="/images/v2/contact-map.svg"
              alt={`Map area near ${business.addressShort}`}
              fill
              sizes="(max-width: 768px) 90vw, 50vw"
              className="object-cover bg-sand"
            />
          </div>
          <p className="mt-2 text-[13px] text-stone">
            Area map · OpenStreetMap contributors
          </p>
        </Reveal>
      </div>
    </section>
  );
}
