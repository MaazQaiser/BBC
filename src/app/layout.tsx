import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

/* ─── Fonts ────────────────────────────────────────────────────────────
   Inter        → all copy: headings, body, labels, buttons.
   IBM Plex Mono → numbers ONLY: price, mileage, year, MPG,
                   road tax, insurance group, MOT remaining.
──────────────────────────────────────────────────────────────────────── */
const inter = Inter({
  subsets:  ["latin"],
  variable: "--font-inter",
  display:  "swap",
  weight:   ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets:  ["latin"],
  variable: "--font-ibm-plex-mono",
  display:  "swap",
  weight:   ["400", "500"],
});

/* ─── Metadata ─────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default:  "Bury Bargain Cars",
    template: "%s — Bury Bargain Cars",
  },
  description:
    "Every fault declared. Full MOT history. Video on every car. Honest used vehicles at straightforward prices.",
  keywords: ["used cars", "Bury", "vehicles", "honest", "transparent"],
  openGraph: {
    type:     "website",
    siteName: "Bury Bargain Cars",
    locale:   "en_GB",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width:        "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor:   "#FFFFFF",
};

/* ─── Root Layout ──────────────────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${ibmPlexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-text-body)] antialiased">
        {children}
      </body>
    </html>
  );
}
