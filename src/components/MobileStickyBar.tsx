"use client";

import { business, callUrl, whatsappUrl } from "@/lib/business";

export function MobileStickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-sandstone/20 bg-ink/95 p-3 backdrop-blur-md md:hidden safe-pb">
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-2">
        <a
          href={callUrl()}
          className="btn-press focus-ring flex items-center justify-center rounded-sm border border-sandstone/30 py-3 text-sm font-medium text-paper"
        >
          Call
        </a>
        <a
          href={whatsappUrl(
            `Namaste! I'd like to enquire with ${business.name}.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-press focus-ring flex items-center justify-center rounded-sm bg-clay py-3 text-sm font-semibold text-paper"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
