import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SITE_NAME } from "@/lib/site-brand";
import { SiteAppointmentProvider } from "@/components/site/SiteAppointmentProvider";

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
    default:  SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Every fault declared and photographed. Full MOT history. Video walkaround where available. Honest used vehicles at straightforward prices.",
  keywords: ["used cars", "Manchester", "vehicles", "honest", "transparent", "condition report"],
  openGraph: {
    type:     "website",
    siteName: SITE_NAME,
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
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-text-body)] antialiased min-w-0 max-w-full">
        <SiteAppointmentProvider>{children}</SiteAppointmentProvider>
      </body>
    </html>
  );
}
