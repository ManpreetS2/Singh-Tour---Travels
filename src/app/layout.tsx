import type { Metadata } from "next";
import { Anek_Devanagari, Mukta } from "next/font/google";
import "./globals.css";
import { business } from "@/lib/business";

const anek = Anek_Devanagari({
  variable: "--font-anek",
  subsets: ["latin", "devanagari"],
  weight: ["300", "400", "500"],
  display: "swap",
  preload: true,
});

const mukta = Mukta({
  variable: "--font-mukta",
  weight: ["400", "500", "600"],
  subsets: ["latin", "devanagari"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${business.name} | Journeys from Delhi`,
  description: `${business.name} — Delhi travel agency. ${business.hours}. Rated ${business.rating} on Google from ${business.reviewCount} reviews. Call ${business.phoneDisplay}.`,
  openGraph: {
    title: business.name,
    description: `Delhi travel agency · ${business.hours} · ${business.rating} on Google`,
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${anek.variable} ${mukta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-charcoal font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-forest focus:px-4 focus:py-3 focus:text-ivory"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
