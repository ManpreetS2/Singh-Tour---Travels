# Singh Tour & Travels — marketing site demo

Cinematic marketing website demo for **Singh Tour & Travels**, a Delhi travel agency (Tagore Garden Extension). Built as a surprise demo for the owner.

Verified business facts (name, address, phone, hours, Google rating/reviews) come from the public Google Maps listing. Destination itineraries are clearly labeled as illustrative.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- GSAP + ScrollTrigger (one signature scroll effect: destination rail)
- `next/image` for optimized local photography
- Serverless Route Handler `/api/inquiry` (Vercel free tier) — **not** a full static export
- No auth, database, payments, or paid SMS APIs

## Design

- **Palette (Dusk Road):** ink `#14110E`, indigo `#1B222C`, sandstone `#E8D9C4`, paper `#F6F1EA`, clay `#A34A2E`
- **Type:** Fraunces (display), Mukta (body), Tiro Devanagari Hindi (logo accent: सिंह टूर & ट्रेवल्स)
- Full-bleed cinematic hero with slow Ken Burns (CSS; respects `prefers-reduced-motion`)
- Mobile sticky Call / WhatsApp bar

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

```bash
npm run build
npm run start
```

Without Telegram env vars the inquiry form runs in **demo mode** and offers WhatsApp / SMS fallback buttons.

## Inquiry → Telegram (instant notify)

The trip planner posts to `POST /api/inquiry`. The handler validates + sanitizes input, checks a honeypot field, applies a simple in-memory rate limit, then calls Telegram Bot API `sendMessage`.

### 1. Create a bot with @BotFather

1. Open Telegram and start a chat with [@BotFather](https://t.me/BotFather).
2. Send `/newbot` and follow the prompts (display name + username ending in `bot`).
3. Copy the **bot token** BotFather gives you (looks like `123456:ABC-DEF...`).
4. Message your new bot once (press Start), or add it to a private group/channel you own.

### 2. Get your chat id

- Easiest: message [@userinfobot](https://t.me/userinfobot) — it replies with your numeric id.
- Or call (replace token):  
  `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates`  
  after sending your bot a message, then read `message.chat.id`.

### 3. Set env vars

Copy `.env.example` → `.env.local` for local dev:

```bash
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_numeric_chat_id_here
```

**Never commit real tokens.** Never expose `TELEGRAM_BOT_TOKEN` to the browser — it is only read in the Route Handler.

### 4. Vercel

1. Project → **Settings → Environment Variables**
2. Add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` (Production + Preview as needed)
3. Redeploy

If env vars are missing or Telegram fails, the API returns `delivered: "fallback"` and the UI shows **Send on WhatsApp** / **Send as SMS** with the enquiry prefilled (`wa.me/919818749172` and `sms:+919818749172`).

### Test the route

```bash
# with dev server running on 43123
node scripts/test-inquiry.mjs
```

Expect `delivered: "fallback"` and `reason: "demo"` when env vars are unset. The script also checks validation, honeypot, and a mocked Telegram `sendMessage` request shape.

## Contact links

- Call: `tel:+919818749172`
- WhatsApp: `https://wa.me/919818749172`
- SMS: `sms:+919818749172`
- Google reviews / maps search linked from the site

## Deploy (Vercel free tier)

1. Push this repo to GitHub / GitLab / Bitbucket.
2. Import at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Next.js**. Build command `next build` (default).
4. Add Telegram env vars (optional — demo fallback works without them).
5. Deploy.

## Credits

See [CREDITS.md](./CREDITS.md) for photograph licenses.

## Disclaimer

Demo site — illustrative content is marked. Not an official booking system.
