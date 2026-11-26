import type { Metadata } from "next";
import { Fraunces, Mukta, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";
import { business } from "@/lib/business";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const mukta = Mukta({
  variable: "--font-mukta",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const tiro = Tiro_Devanagari_Hindi({
  variable: "--font-tiro",
  weight: "400",
  subsets: ["devanagari", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${business.name} | Delhi travel agency`,
  description: `${business.name} — Delhi-based travel agency. ${business.hours}. Rated ${business.rating}★ on Google from ${business.reviewCount} reviews. Call ${business.phoneDisplay}.`,
  openGraph: {
    title: business.name,
    description: `Delhi travel agency · ${business.hours} · ${business.rating}★ on Google`,
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${mukta.variable} ${tiro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper font-sans">
        {children}
      </body>
    </html>
  );
}
