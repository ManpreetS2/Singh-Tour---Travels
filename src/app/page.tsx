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

export default function Home() {
  const [seedPlaces, setSeedPlaces] = useState<string[]>([]);

  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Statement />
        <Gallery
          onAddPlace={(id) =>
            setSeedPlaces((prev) => (prev.includes(id) ? prev : [...prev, id]))
          }
        />
        <WindowOpens />
        <RoutesMap />
        <TripPlanner
          key={seedPlaces.join("-") || "empty"}
          seedPlaces={seedPlaces}
        />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
