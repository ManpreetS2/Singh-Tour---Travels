# DESIGN-NOTES — V3 “Courtyard”

Contemporary luxury direction with Indian character for Singh Tour & Travels. Built on the V1 inquiry stack (`/api/inquiry`, validation, honeypot, rate limit, Call/SMS fallback).

## Direction sources → implementation

| Resource / reference | What we took | Where it lives |
|---|---|---|
| **Amanbagh (Aman)** | Light display + humanist sans; place-first region/name/sentence; typographic contact list; “Getting here” as plain lines | `Gallery.tsx`, `Contact.tsx`, `globals.css` (Anek 300 + Mukta) |
| **Oberoi Udaivilas** | Local-time utility line (no weather API); quiet booking teaser → planner jump | `Hero.tsx` Delhi clock; `#plan` CTA |
| **The SUJÁN Life** | Sans-led luxury; one large pull-quote + offset smaller reviews; Delhi address as credential | `Reviews.tsx`, `Footer.tsx` |
| **Badrutt’s Palace** (Curated.design) | Utility line above hero; two CTA sizes; captioned imagery; ScrollTrigger reveals (desktop) | `Hero.tsx`, `Reveal.tsx`, `RoutesMap.tsx` desktop GSAP |
| **Singita** | 7:5 / 5:7 asymmetric grids; journey-designer tone for planner | `Gallery.tsx` desktop, `TripPlanner.tsx`, section layouts |
| **Taste Skill** | Word-highlight scroll colour; picture-develops film look (once) | `Statement.tsx`, Pangong arrival in `RoutesMap.tsx` |
| **Scroll Craft** | Desktop map pin span ~1.4 screens / scrubbed draw | `RoutesMap.tsx` ScrollTrigger scrub 0.6 |
| **SiteReel therma** (idea only) | Sentence-complete planner + mini map lighting stops | `TripPlanner.tsx` |
| **Emil Kowalski** | Button press `scale(.97)` | `.btn-press` in `globals.css` |
| **Departures (V2 A)** | Sentence planner + stub summary — without boards/tickets | `TripPlanner.tsx` |
| **Safarnama (V2 B)** | Wikimedia destination photography set | `public/images/v2/*`, `CREDITS.md` |

## Skipped on purpose

- Retro departure boards, split-flap, boarding-pass chrome (owner rejected industrial look).
- Heavy serif display (Aman-like quiet via Anek 300 instead).
- Hero video / WebGL / Lenis (4G budget).
- FAQ accordion (no owner-supplied answers — inventing none).
- Google Maps iframe embed (QW-14); static SVG area map instead.
- WhatsApp control when flag is OFF (not CSS-hidden).
- State/country outlines on the route map (boundary sensitivity); rivers only, “not to scale”.

## Route map — PM amendment (Bug Hunter / Engineering Researcher)

- **Portrait only:** `position: sticky; top: var(--header-h)`; `max-height: min(45svh, 100svh − header − Call bar − safe-area)`.
- **No** scroll-jacking, **no** GSAP pin, **no** scroll-snap on phones.
- **Landscape or height &lt; ~600px:** map inline; chapters stack with a small per-route highlight SVG.
- Reduced motion: all routes drawn statically.
- Playwright: `npm run test:map` at 390×844 and 844×390 — chapter headings must not be covered by the map or Call bar.

Files: `RoutesMap.tsx`, `NorthMapSvg.tsx`, `globals.css` (`.map-sticky-frame`), `scripts/map-coverage.mjs`.

## Palette & type

Tokens in `globals.css` (`--ivory`, `--forest`, `--gold-deep`, …). Gold `#B08D57` is decoration only; text uses `--gold-deep` / `--gold-light`. Anek Devanagari + Mukta via `next/font` in `layout.tsx`. Wordmark + charbagh mark: `Wordmark.tsx`.

## QA carried from V1 (QW-01…16)

Sticky bar padding + safe-area; opaque header + scroll-margin; landscape hero; AA contrast pairs; en-IN `dd/mm/yyyy`; ≥44px targets; no text on raw photos (caption bars ≥80% forest-deep); WhatsApp flag; no customer-facing Telegram/tech wording; geo-correct Commons photos; concept demo note in hero + footer.
