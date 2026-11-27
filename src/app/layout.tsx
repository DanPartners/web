import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, DM_Sans, IBM_Plex_Mono, Noto_Sans_TC } from "next/font/google";
import { Motion } from "@/components/motion";
import { getPricing } from "@/lib/get-pricing";
import { LANG_BOOT_SCRIPT } from "@/lib/lang";
import { pricingCopy } from "@/lib/pricing";
import "./globals.css";

// next/font downloads these at build time and serves them from this site.
// DM Sans is the face of the Dan dashboard, and of this site and its demo.
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

// The "Dan" in the logo, and the dictionary line under it.
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

// Order slips and kitchen tickets.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

const notoTc = Noto_Sans_TC({
  weight: ["400", "500", "700"],
  variable: "--font-noto-tc",
  display: "swap",
  preload: false,
});

const title = "Dan 單 | Modern POS and commerce for restaurants and food shops";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const copy = pricingCopy(await getPricing());
  return {
    title,
    description: copy.metaDescriptionEn,
    applicationName: "Dan",
    openGraph: {
      title,
      description: copy.metaDescriptionEn,
      siteName: "Dan",
      locale: "en_GB",
      type: "website",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#F6F1E7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${bodoni.variable} ${plexMono.variable} ${notoTc.variable}`}
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
