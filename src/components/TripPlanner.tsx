import { InquiryForm } from "@/components/InquiryForm";
import { destinations } from "@/lib/destinations";

export function TripPlanner() {
  return (
    <section id="planner" className="relative bg-paper py-20 text-ink sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-clay">
            Trip planner
          </p>
          <h2 className="font-display mt-3 text-3xl tracking-tight sm:text-4xl">
            Sketch the journey. We confirm the rest.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/70">
            No prices online. Send an enquiry and we reply with availability.
            When Telegram is configured, the owner is notified instantly;
            otherwise you can forward the same message on WhatsApp or SMS.
          </p>
          <p className="illustrative-tag mt-6 !text-clay/80">
            Illustrative itinerary — confirm details with us
          </p>
        </div>

        <InquiryForm
          className="lg:col-span-7"
          tone="paper"
          destinationSuggestions={destinations.map((d) => d.name)}
        />
      </div>
    </section>
  );
}
