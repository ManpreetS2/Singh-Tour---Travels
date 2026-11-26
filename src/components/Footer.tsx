import { business } from "@/lib/business";

export function Footer() {
  return (
    <footer className="border-t border-sandstone/15 bg-indigo pb-28 md:pb-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div>
          <p className="font-display text-xl text-paper">{business.name}</p>
          <p className="font-hindi mt-1 text-sm text-sandstone">
            {business.nameHindi}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-sandstone/80">
            {business.addressShort}
            <br />
            {business.phoneDisplay} · {business.hours}
          </p>
        </div>
        <div className="max-w-md text-sm leading-relaxed text-muted">
          <p>
            Demo site — illustrative content marked. Destination photos are
            licensed stand-ins. Business name, address, phone, hours, rating,
            and review quotes match the public Google listing.
          </p>
          <p className="mt-3">
            <a
              href="/CREDITS.md"
              className="focus-ring rounded-sm text-sandstone underline-offset-2 hover:underline"
            >
              Photo credits
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
