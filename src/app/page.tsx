"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Statement } from "@/components/Statement";
import { Gallery } from "@/components/Gallery";
import { WindowOpens } from "@/components/WindowOpens";
import { RoutesMap } from "@/components/RoutesMap";
import { TripPlanner } from "@/components/TripPlanner";
import { Reviews } from "@/components/Reviews";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { SectionRule } from "@/components/SectionRule";

export default function Home() {
  const [seedPlaces, setSeedPlaces] = useState<string[]>([]);

  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <SectionRule className="py-0" />
        <Statement />
        <SectionRule />
        <Gallery
          onAddPlace={(id) =>
            setSeedPlaces((prev) => (prev.includes(id) ? prev : [...prev, id]))
          }
        />
        {/* One full-width image interlude — not a repeated full-screen panel */}
        <WindowOpens />
        <RoutesMap />
        <TripPlanner
          key={seedPlaces.join("-") || "empty"}
          seedPlaces={seedPlaces}
        />
        <SectionRule />
        <Reviews />
        <SectionRule />
        <Contact />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
