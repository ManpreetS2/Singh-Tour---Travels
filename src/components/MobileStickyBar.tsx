"use client";

import { business, callUrl, whatsappUrl } from "@/lib/business";
import { config } from "@/lib/config";

export function MobileStickyBar() {
  const wa = config.whatsappEnabled
    ? whatsappUrl(
        `Hello ${business.name}, I'd like to enquire about a journey from Delhi.`,
      )
    : null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-forest/15 bg-ivory portrait:block landscape:hidden"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        height: "calc(var(--bar-h) + env(safe-area-inset-bottom, 0px))",
      }}
      role="region"
      aria-label="Quick actions"
    >
      <div className="mx-auto flex h-16 max-w-lg items-center gap-3 px-4">
        <a
          href={callUrl()}
          className="btn-press btn-forest flex min-h-12 flex-1 items-center justify-center rounded-sm bg-forest text-[16px] font-medium text-ivory"
        >
          Call
        </a>
        {wa && (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press flex min-h-12 flex-1 items-center justify-center rounded-sm border border-forest text-[16px] font-medium text-forest"
          >
            WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
