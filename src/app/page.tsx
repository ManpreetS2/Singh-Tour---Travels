import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { WhyUs } from "@/components/WhyUs";
import { Destinations } from "@/components/Destinations";
import { Services } from "@/components/Services";
import { TripPlanner } from "@/components/TripPlanner";
import { Reviews } from "@/components/Reviews";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <WhyUs />
        <Destinations />
        <Services />
        <TripPlanner />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
