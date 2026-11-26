"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "@/components/Wordmark";
import { callUrl } from "@/lib/business";
import { cn } from "@/lib/utils";

const nav = [
  { href: "#destinations", label: "Destinations" },
  { href: "#routes", label: "Routes" },
  { href: "#plan", label: "Plan" },
  { href: "#contact", label: "Contact" },
] as const;

export function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (open) {
        setHidden(false);
        lastY = y;
        return;
      }
      if (y > lastY && y > 80) setHidden(true);
      else setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-ivory transition-transform duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        hidden && !open && "-translate-y-full",
      )}
      style={{ height: "var(--header-h)" }}
    >
      <div
        className={cn(
          "mx-auto flex h-full max-w-6xl items-center justify-between px-4 md:px-8",
          scrolled && "border-b border-hairline",
        )}
      >
        <a href="#main" className="min-h-11 min-w-11 inline-flex items-center">
          <Wordmark compact />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="link-underline font-label text-gold-deep min-h-11 inline-flex items-center"
            >
              {item.label}
            </a>
          ))}
          <a
            href={callUrl()}
            className="btn-press btn-forest inline-flex min-h-11 items-center rounded-sm bg-forest px-5 text-[15px] font-medium text-ivory"
          >
            Call
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <a
            href={callUrl()}
            className="btn-press hidden min-h-11 min-w-11 items-center justify-center rounded-sm bg-forest px-4 text-[15px] font-medium text-ivory [@media(orientation:landscape)]:inline-flex"
          >
            Call
          </a>
          <button
            type="button"
            className="btn-press inline-flex min-h-11 min-w-11 items-center justify-center border border-stone/40 text-forest"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className="flex flex-col gap-1.5">
              <span
                className={cn(
                  "block h-px w-5 bg-forest transition-transform",
                  open && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-px w-5 bg-forest transition-opacity",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-px w-5 bg-forest transition-transform",
                  open && "-translate-y-[3.5px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-b border-hairline bg-ivory px-4 pb-6 pt-2 md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-display min-h-11 inline-flex items-center text-[22px] text-forest"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}

      {scrolled && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-full h-6 bg-gradient-to-b from-ivory/80 to-transparent"
        />
      )}
    </header>
  );
}
