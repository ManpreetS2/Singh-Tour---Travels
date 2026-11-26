# Singh Tour & Travels — Courtyard (V3)

Contemporary luxury marketing site demo for **Singh Tour & Travels** (Tagore Garden Extension, Delhi). Ivory / forest / charcoal / restrained gold; Anek Devanagari + Mukta; cinematic Commons photography; sentence trip planner; illustrative “Roads north from Delhi” map.

Verified business facts come from the public Google Maps listing. Example routes and destinations are illustrative — confirm with the business.

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

```bash
npm run build
npm run lint
npm run test:inquiry   # needs dev server
npm run test:map       # Playwright: map must not cover chapter text (390×844 & 844×390)
npm run screenshots    # writes PNGs under /opt/cursor/artifacts
```

## Enquiry API

`POST /api/inquiry` — validation, honeypot, rate limit. With `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` set, delivers via Telegram; otherwise returns a Call/SMS fallback payload. No Telegram wording is shown to customers.

WhatsApp UI is gated by `src/lib/config.ts` (`whatsappEnabled`, default `false`).

## Branch

Active design: `v3-luxury`. Do not confuse with preserved `v1` / concept branches.
