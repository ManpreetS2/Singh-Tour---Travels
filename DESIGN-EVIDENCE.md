# DESIGN-EVIDENCE — V2 concept directions (A & B)

**Branch:** `v2-concepts`  
**Date:** 26 Nov 2026  
**Scope:** Visual concepts only (`/concepts/a`, `/concepts/b`). Final V2 not implemented until the owner picks a direction.  
**Source brief:** `uploads/v2-direction.md` (RES-V2 Engineering Researcher).

---

## How to read this

For each resource: the **exact URL/file opened** (or the researcher’s cited path when this agent relied on the RES-V2 doc), the **technique taken**, and **where it appears** in Concept A and/or B. Skips are listed with reasons.

---

## Resources consulted

### 1. Taste Skill (Leonxlnx)

| | |
|---|---|
| **Opened** | https://github.com/Leonxlnx/taste-skill · https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/README.md |
| **Also via** | RES-V2 §2 citing `skills/taste-skill/SKILL.md`, `references/moments.md`, `motion.md`, `perf.md`, `photos.md`, `system.md`, `sections.md` |

**Taken**
- Kind = *service*: photographs, flat colour, type, real icons; **no WebGL/shaders**.
- One hero entrance + limited “moments”; no fade-in on every section; no invented stats.
- Perf: ≤4 font families per direction, transform/opacity, CLS care.
- Override house “fake contact” rule: real phone/address (this is a real business).

**Where**
- **A:** Night photography + flat board UI; no shader hero (`src/app/concepts/a/page.tsx`).
- **B:** Photo-chapters as stacked full-bleed chapters with type panels (`src/app/concepts/b/page.tsx`).

**Skipped:** Shader grounds, procedural 3D, finish-gate scripts (concepts are static pages).

---

### 2. UI UX Pro Max (nextlevelbuilder)

| | |
|---|---|
| **Opened** | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill · typography.csv / SKILL.md via GitHub; local clone `/tmp/ui-ux-pro-max-skill` used earlier in V1 |
| **Also via** | RES-V2 §2: `data/products.csv` row 37 Travel/Tourism, UX guidelines #9/#22/#43/#99/#100 |

**Taken**
- UX checklist only: reduced-motion respect, ≥44–48px targets, visible labels, no forced scroll effects.
- **Skipped** its Travel “Aurora UI + sky blue” style (exactly the template look the owner rejected).

**Where**
- **A & B:** 48px Call CTAs, labelled ticket/sentence fields, concept-demo notes, sticky-bar safe padding.

---

### 3. Scroll Craft (nateherkai)

| | |
|---|---|
| **Opened** | https://github.com/nateherkai/scroll-craft · https://raw.githubusercontent.com/nateherkai/scroll-craft/main/README.md |
| **Also via** | RES-V2 citing `plugins/nateherk-design/skills/scroll-craft/SKILL.md`, `references/uniqueness.md`, `feel.md`, `devices.md` |

**Taken**
- **Grammar A:** Gallery/catalog (walkable place list, one label schema).
- **Grammar B:** Chaptered editorial (title page, hard chapter cuts, colophon).
- Feeling curve + one peak; hard rules: no scroll cue, no `01/06` counters, no em dashes in visible copy, no invented statistics.
- Destination **pan** as breadth (CSS scroll-snap on mobile for A).

**Where**
- **A:** “The board” rail with mono place labels (`#destinations` in `concepts/a`).
- **B:** Title-page hero + chapter folios + colophon contact (`concepts/b`).

**Skipped:** scrollcraft.js engine, kie.ai generation, ffmpeg video scrub, dimensional layered hero.

---

### 4. React Bits (DavidHDev)

| | |
|---|---|
| **Opened** | https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/ts-default/TextAnimations/SplitFlapText/SplitFlapText.tsx · https://reactbits.dev/text-animations/split-flap-text (via RES-V2) |

**Taken**
- Split-flap **visual language** (tile + horizontal split line) for Direction A’s board and wordmark.
- Accessibility rule from Bug Hunter / RES-V2 §9: final text in real HTML/`aria-label`; flaps `aria-hidden`; static under reduced motion.

**Where**
- **A:** `FlapWord` + `WordmarkDepartures` SVG flap tiles (`concepts/a`, `WordmarkDepartures.tsx`).
- **B:** none (signature is route-line / seal, not flaps).

**Skipped as shipped code:** full SplitFlapText runtime (concepts show the settled board, not a looping flip); TearTicket (borrowed stub **shape** only as CSS `.ticket` / `.ticket-stub`); MaskedHeading, OptionWheel, WebGL backgrounds.

---

### 5. GSAP Skills (greensock)

| | |
|---|---|
| **Opened** | https://github.com/greensock/gsap-skills · https://raw.githubusercontent.com/greensock/gsap-skills/main/README.md |
| **Also via** | RES-V2: `gsap-scrolltrigger`, `gsap-react`, `gsap.matchMedia` guidance |

**Taken (for future V2 A only)**
- Desktop-only ScrollTrigger pan via `matchMedia`; never load GSAP on phones.

**Where in concepts**
- **Not shipped** in concept pages (static CSS scroll-snap only) to keep concepts light and honest about the pause.

**Skipped in B:** entire GSAP stack (per RES-V2 Direction B motion plan).

---

### 6. Emil Kowalski (design-eng skills + essays)

| | |
|---|---|
| **Opened** | https://raw.githubusercontent.com/emilkowalski/skills/main/skills/emil-design-eng/SKILL.md · https://emilkowal.ski/ui/great-animations |
| **Also via** | RES-V2: mobile-native notes (`viewport-fit`, `100svh`, safe-area, hover gated) |

**Taken**
- Press `scale(0.97)`, ease-out curves, UI &lt; 300ms; drawers `--ease-drawer`.
- Marketing hero uses `100svh`; sticky bar uses `env(safe-area-inset-bottom)`.
- Frequent actions (stub text) = no animation.

**Where**
- **A & B:** `.btn-amber` / `.btn-saffron` active scale; mobile Call bars; ticket stub static.

**Skipped:** Vaul (unmaintained), Sonner (no toast-worthy events on concept pages).

---

### 7. Curated.design

| | |
|---|---|
| **Opened** | Via RES-V2 §3 (live checks): https://aero.com/ · https://arie.guide/ · https://rivian.com/ |

**Taken**
- **Aero:** booking console as hero (board column + tall photo).
- **Rivian:** monospace utility labels over terrain photography.
- **Arie:** layered contact card over map.

**Where**
- **A:** Split hero board/photo; mono destination labels; contact card over map illustration.
- **B:** Contact as colophon (less Arie; more editorial close).

**Don’t copy:** marks, jet imagery, lime/Geist product UI.

---

### 8. Godly (godly.design)

| | |
|---|---|
| **Opened** | Via RES-V2 §2–3: godly.design feed reviewed by researcher |

**Taken:** nothing.

**Skipped:** Current feed is AI/SaaS-heavy; no usable travel/hospitality reference. Not used in A or B.

---

### 9. SiteReel

| | |
|---|---|
| **Opened** | Via RES-V2: https://sitereel.ai/template/isleway · https://sitereel.ai/template/serra-sanctuary |

**Taken**
- **Isleway:** route cards / drawer idea → A’s place rail (drawer deferred to full V2).
- **Serra Sanctuary:** warm editorial chapter tone → B’s chapter rhythm.

**Skipped:** Floating-island hero, prompt text as copy; treating templates as real businesses.

---

### 10. Other doc examples

| Resource | Opened / cited | Use |
|---|---|---|
| ERA Residence | era-residence.com / Webflow showcase (RES-V2) | **B:** restraint, limited motion, one-motif identity (seal). |
| Oberoi Hotels | obéroihotels.com (RES-V2) | **A & B:** one place-specific sentence per destination. |
| Lenis / Motion / Spline / Unicorn / WebGL | Doc inventory | **Skipped:** scroll hijack, watermarked WebGL, heavy bundles. |

---

## Concept map → files

| Concept | Route | Wordmark | Key sections |
|---|---|---|---|
| A Departures | `/concepts/a` | `WordmarkDepartures.tsx` | Hero board, chips, destination rail, arrivals reviews, ticket planner, contact card |
| B Safarnama | `/concepts/b` | `WordmarkSafarnama.tsx` | Type-only title page, photo chapters, marginal reviews, sentence planner, colophon |
| Index | `/concepts` | — | Chooser |

Photos: Wikimedia Commons files in `public/images/v2/` (geo-verified in RES-V2 §7). Credits in each concept footer.

---

## Git / pause status

- **V1 preserved:** branch `v1` + annotated tag `v1.0` → commit `da51edd` (V1 marketing site).
- **`main`:** still at V1 (`da51edd`).
- **`v2-wip`:** paused full Departures foundation (photos + partial libs).
- **`v2-concepts`:** this concept work.
- **Final V2:** not started until owner picks A or B.
