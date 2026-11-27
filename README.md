# Dan website (dan.partners)

The public site for Dan, a modern POS and commerce system for restaurants and food shops of any cuisine: the counter, QR orders at the table, the shop's own online ordering site, a simple online shop, card payments straight to the shop, kitchen tickets by station, and offline working. One page, in English and Traditional Chinese, with no forms, analytics, trackers or cookies. Prices are rendered on the server from Stripe.

Next.js 16 (App Router), React 19, TypeScript, Tailwind 4. Fonts (DM Sans, Bodoni Moda, IBM Plex Mono, Noto Sans TC) come from `next/font/google` and are self-hosted at build. Icons are Lucide.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
```

## Build

```bash
npm run build
npm run start    # serves the production build
npm test
```

`npm run build` does not write an `out/` directory. Public prices are read on the server, so the site is a Next.js server deployment rather than a static export.

## The hero demo

The hero is a live, looping demo of Dan in use (`src/components/counter-demo`): a customer pays on their phone, the order lands on the counter's board, staff accept it, the kitchen ticket prints. It is React in the page, not a video, and it only runs while it is on screen. With reduced motion it shows one still frame.

It is built with [StageShow](https://benji.org/stageshow). The kit parts it uses are vendored, unchanged, in `src/stageshow/kit` (MIT, see `src/stageshow/LICENSE`); ESLint skips that folder. `REHEARSAL.md` beside the component records how the demo was filmed and checked, what is unresolved, and how to film it again.

The demo has three designs and picks one from the width of its column: wide from 940px, mid from 560px, compact below. The page's side padding and the demo's own gutter are tied together in two places: `wrap` in `src/app/page.tsx` and `.hero-demo` in `src/app/globals.css`.

The skill itself is not in the repo. `skills-lock.json` records its source and commit; `npx skills add benjitaylor/skills --skill stageshow` installs it into `.agents/` (ignored by git).

## Deploy

Vercel. Import the repo; the framework preset is Next.js. Point the apex domain `dan.partners` at it. Shops use subdomains (`yourshop.dan.partners`), so keep the apex for this site. A host that can only serve static files cannot refresh prices from Stripe.

## Pricing

Amounts, Dan's fee and the launch offer are read from the Dan Partners Stripe account (the same `lookup_key`s in test and live). The server requests `GET /v1/prices` with the product expanded, and Next.js caches that response for one hour (`revalidate` 3600 on the fetch, the page and the layout).

| lookup_key | What it is |
| --- | --- |
| `dan_free_monthly` | Free plan, monthly. Product metadata holds the fee and the launch offer. |
| `dan_duo_setup` | Duo setup, one-off. Price or product metadata `compare_at_amount` is the struck-through usual price, in pence. |
| `dan_duo_maintenance_monthly` | Duo maintenance, monthly. |

Fee and launch-offer metadata on the Dan Free product: `dan_fee_percent`, `dan_fee_fixed_pence`, `dan_fee_cap_pence`, `promo_free_online_orders_per_month`, `promo_duration_months`.

### `STRIPE_PRICING_KEY`

A restricted Stripe secret key with read access to Prices and Products. Set it in the server environment (for example Vercel's environment variables). It is read only on the server, in `src/lib/get-pricing.ts`.

- Do not prefix it with `NEXT_PUBLIC_`. That would send it to the browser.
- Do not commit the key, and do not put it in the repo.

If `STRIPE_PRICING_KEY` is unset, or Stripe returns an error or an incomplete catalogue, the page uses the published fallback in `src/lib/pricing.ts` (the deal approved on 26 Nov 2026). The site and the build still render. The page revalidates hourly, so adding the key later is picked up without a code change.

## Links: log in, demo, WhatsApp, email

All links live in `src/site.ts`:

- `loginUrl`: where the header "Log in" button goes (`https://my.dan.partners`).
- `demoUrl`: where "View the demo" goes (`https://my.dan.partners/shop/orders?demo=1`, the demo on the orders board).
- `orderDemoUrl`: the demo shop's ordering page (`https://order.dan.partners/?table=5`). The QR code in the Demonstration section points here; it is drawn at build time (npm `qrcode`), so no QR service is called. The demo shop is the Dan cloud's (`dan-cloud shop add ... --slug order --demo`).
- `slashieUrl`: the footer's link to Slashie Ltd.
- `whatsapp`: a full link such as `https://wa.me/44...`. Empty hides the button.
- `email`: an address. Empty hides the button.

While both contact values are empty, the Contact section's button goes to Slashie Ltd (`slashieUrl`), of which Dan Partners is a trading name. Set `whatsapp` or `email` and it shows those instead.

## Language

The page holds both languages and `<html lang>` picks one. The EN / 中文 switch is remembered in `localStorage` (failures are ignored). The Chinese copy is a draft and still needs checking by a Cantonese speaker.

## Motion

The hero demo leads. The rest of the page only arrives: CSS, plus a small IntersectionObserver for scroll reveals (`src/components/motion.tsx`). Everything is under `prefers-reduced-motion: no-preference`; with reduced motion the page is static and the demo shows its still.
