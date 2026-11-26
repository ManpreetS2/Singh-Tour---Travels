import type { Metadata } from "next";
import {
  Teko,
  Rajdhani,
  Mukta,
  IBM_Plex_Mono,
  Eczar,
  Rozha_One,
  Martel,
} from "next/font/google";
import "./concepts.css";

const teko = Teko({
  variable: "--font-teko",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  weight: ["500", "600", "700"],
  subsets: ["latin", "devanagari"],
  display: "swap",
});

const mukta = Mukta({
  variable: "--font-mukta",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "devanagari"],
  display: "swap",
});

const plex = IBM_Plex_Mono({
  variable: "--font-plex",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

const eczar = Eczar({
  variable: "--font-eczar",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "devanagari"],
  display: "swap",
});

const rozha = Rozha_One({
  variable: "--font-rozha",
  weight: "400",
  subsets: ["latin", "devanagari"],
  display: "swap",
});

const martel = Martel({
  variable: "--font-martel",
  weight: ["400", "600", "700"],
  subsets: ["latin", "devanagari"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Singh Tour & Travels — V2 concepts",
  description:
    "Visual concepts only. Direction A Departures and Direction B Safarnama. Not a live booking site.",
};

export default function ConceptsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${teko.variable} ${rajdhani.variable} ${mukta.variable} ${plex.variable} ${eczar.variable} ${rozha.variable} ${martel.variable}`}
    >
      {children}
    </div>
  );
}
