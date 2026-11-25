# Dan website (dan.partners)

The public intro page for Dan, an ordering and counter system for independent Chinese takeaways in the UK. One static landing page, in English and Traditional Chinese, with no forms, analytics, trackers or cookies.

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

## Links: demo, WhatsApp, email

All links live in `src/site.ts`:

- `demoUrl`: where "Try the demo" goes (default `https://dan-partners.vercel.app`).
- `whatsapp`: a full link such as `https://wa.me/44...`. Empty hides the button.
- `email`: an address. Empty hides the button.

While both contact values are empty, the Talk to us section shows "Contact details are coming soon" instead of buttons.

## Language

The page holds both languages and `<html lang>` picks one. The EN / 中文 switch is remembered in `localStorage` (failures are ignored). The Chinese copy is a draft and still needs checking by a Cantonese speaker.

## Motion

CSS only, plus a small IntersectionObserver for scroll reveals (`src/components/motion.tsx`). Everything is under `prefers-reduced-motion: no-preference`; with reduced motion the page is static.
