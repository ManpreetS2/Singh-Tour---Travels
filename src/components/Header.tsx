"use client";

import { useEffect, useState } from "react";
import { business, callUrl, whatsappUrl } from "@/lib/business";
import { cn } from "@/lib/utils";

const links = [
  { href: "#why-us", label: "Why us" },
  { href: "#destinations", label: "Destinations" },
  { href: "#services", label: "Services" },
  { href: "#planner", label: "Plan a trip" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-200",
        scrolled || open
          ? "border-b border-sandstone/15 bg-ink/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="focus-ring group min-w-0 rounded-sm">
          <span className="font-display text-[1.15rem] leading-none tracking-tight text-paper sm:text-xl">
            {business.name}
          </span>
          <span className="font-hindi mt-0.5 block text-[0.7rem] leading-none text-sandstone/80 sm:text-xs">
            {business.nameHindi}
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="focus-ring rounded-sm text-sm text-sandstone/90 transition-colors duration-150 hover:text-paper"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={callUrl()}
            className="btn-press focus-ring rounded-sm border border-sandstone/30 px-3 py-2 text-sm text-paper"
          >
            Call
          </a>
          <a
            href={whatsappUrl(
              `Namaste! I'd like to enquire with ${business.name}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press focus-ring rounded-sm bg-clay px-3 py-2 text-sm font-medium text-paper"
          >
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          className="btn-press focus-ring inline-flex h-10 w-10 items-center justify-center rounded-sm border border-sandstone/25 text-paper lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span aria-hidden className="flex flex-col gap-1.5">
            <span
              className={cn(
                "block h-px w-5 bg-paper transition-transform duration-200",
                open && "translate-y-[3.5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-px w-5 bg-paper transition-opacity duration-150",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-px w-5 bg-paper transition-transform duration-200",
                open && "-translate-y-[3.5px] -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-sandstone/15 bg-ink lg:hidden"
      >
        <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="focus-ring rounded-sm px-2 py-3 text-base text-paper"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-2">
            <a
              href={callUrl()}
              className="btn-press focus-ring rounded-sm border border-sandstone/30 px-3 py-3 text-center text-sm"
            >
              Call
            </a>
            <a
              href={whatsappUrl(
                `Namaste! I'd like to enquire with ${business.name}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press focus-ring rounded-sm bg-clay px-3 py-3 text-center text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
