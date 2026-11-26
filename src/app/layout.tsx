import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, IBM_Plex_Mono, IBM_Plex_Sans, Noto_Sans_TC } from "next/font/google";
import { Motion } from "@/components/motion";
import { LANG_BOOT_SCRIPT } from "@/lib/lang";
import "./globals.css";

// next/font downloads these at build time and serves them from this site.
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

// "Dan" is always set in this.
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-bodoni",
  display: "swap",
});

// Only the sample order slip uses this.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const notoTc = Noto_Sans_TC({
  weight: ["400", "700"],
  variable: "--font-noto-tc",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Dan 單 | Point of sale for restaurants and food shops",
  description:
    "Dan is an in-shop point of sale for restaurants and food shops. It is being built and has not launched yet. Plans begin at £0 a month, with 50 online orders included. On every plan, the first 100 card orders carry no Dan fee; after that, the fee is 3% of each card payment, at most £1 an order.",
  applicationName: "Dan",
};

export const viewport: Viewport = {
  themeColor: "#F5EEDC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${bodoni.variable} ${plexMono.variable} ${notoTc.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Sets the saved language before first paint, so there is no flash. */}
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOT_SCRIPT }} />
      </head>
      <body>
        <Motion />
        {children}
      </body>
    </html>
  );
}
