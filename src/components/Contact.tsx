import { business, callUrl, whatsappUrl } from "@/lib/business";

export function Contact() {
  return (
    <section id="contact" className="bg-ink py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-clay">
          Map & contact
        </p>
        <h2 className="font-display mt-3 text-3xl tracking-tight text-paper sm:text-4xl">
          Find us in West Delhi
        </h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <address className="not-italic text-base leading-relaxed text-sandstone">
              {business.address}
            </address>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-muted">Phone</dt>
                <dd>
                  <a
                    href={callUrl()}
                    className="focus-ring rounded-sm text-lg text-paper underline-offset-4 hover:underline"
                  >
                    {business.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-muted">Hours</dt>
                <dd className="text-paper">{business.hours}</dd>
              </div>
              <div>
                <dt className="text-muted">Category</dt>
                <dd className="text-paper">{business.category}</dd>
              </div>
            </dl>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={callUrl()}
                className="btn-press focus-ring rounded-sm bg-clay px-5 py-3 text-sm font-semibold text-paper"
              >
                Call
              </a>
              <a
                href={whatsappUrl(
                  `Namaste! Contacting ${business.name} from your website.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press focus-ring rounded-sm border border-sandstone/35 px-5 py-3 text-sm text-paper"
              >
                WhatsApp (if available)
              </a>
              <a
                href={business.googleMapsDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press focus-ring rounded-sm border border-sandstone/35 px-5 py-3 text-sm text-paper"
              >
                Directions
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-sm border border-sandstone/20 lg:col-span-7">
            <iframe
              title={`Map showing ${business.name}`}
              src={business.googleMapsEmbed}
              className="h-[22rem] w-full bg-indigo sm:h-[28rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
