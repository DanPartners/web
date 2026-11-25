# Dan website (dan.partners)

The public intro page for Dan, an in-shop point of sale (POS) for restaurants and food shops of any cuisine: the counter, QR orders at the table, the shop's own online ordering site, card payments straight to the shop, bilingual kitchen tickets by station, and offline working. One static landing page, in English and Traditional Chinese, with no forms, analytics, trackers or cookies.

Next.js 16 (App Router, `output: "export"`), React 19, TypeScript, Tailwind 4. Fonts (Bodoni Moda, IBM Plex Sans, IBM Plex Mono, Noto Sans TC) come from `next/font/google` and are self-hosted at build.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
```

## Build

```bash
npm run build    # writes the static site to out/
```

Serve `out/` with any static host to check it, for example `npx serve out`.

## Deploy

Vercel or any static host. On Vercel, import the repo; the framework preset is Next.js and the static export is detected from `next.config.ts`. Point the apex domain `dan.partners` at it. Shops use subdomains (`yourshop.dan.partners`), so keep the apex for this site.

## Links: log in, demo, WhatsApp, email

All links live in `src/site.ts`:

- `loginUrl`: where the header "Log in" button goes (`https://my.dan.partners`).
- `demoUrl`: where "Try the demo" goes (`https://my.dan.partners/shop/orders?demo=1`, the demo on the orders board).
- `whatsapp`: a full link such as `https://wa.me/44...`. Empty hides the button.
- `email`: an address. Empty hides the button.

While both contact values are empty, the Talk to us section shows "Contact details are coming soon" instead of buttons.

## Language

The page holds both languages and `<html lang>` picks one. The EN / 中文 switch is remembered in `localStorage` (failures are ignored). The Chinese copy is a draft and still needs checking by a Cantonese speaker.

## Motion

CSS only, plus a small IntersectionObserver for scroll reveals (`src/components/motion.tsx`). Everything is under `prefers-reduced-motion: no-preference`; with reduced motion the page is static.
