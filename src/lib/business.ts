import { config } from "@/lib/config";

/** Verified facts only — from Google Maps listing / owner brief. */

export const business = {
  name: "Singh Tour & Travels",
  nameHindi: "सिंह टूर & ट्रेवल्स",
  category: "Travel agency",
  address:
    "1457, TC Camp Tilaknagar, Raghubir Nagar, Tagore Garden Extension, Delhi 110027, India",
  addressShort: "Tagore Garden Extension, Delhi 110027",
  plusCode: "J4W4+P4 Delhi",
  phoneDisplay: "+91 98187 49172",
  phoneTel: "+919818749172",
  hours: "Open 24 hours",
  rating: 4.6,
  reviewCount: 30,
  googleMapsSearch:
    "https://www.google.com/maps/search/?api=1&query=Singh+Tour+%26+Travels+Tagore+Garden+Delhi",
  googleMapsDirections:
    "https://www.google.com/maps/dir/?api=1&destination=J4W4%2BP4%20Delhi",
  reviewThemes: [
    "comfortable journey",
    "punctuality",
    "clean car",
    "stress-free trip",
  ] as const,
} as const;

export const reviews = [
  {
    name: "Ravinder S.",
    fullName: "Ravinder Singh",
    quote:
      "Travelled from panipat and had amazing experience, sukhwant ji was very punctual and polite. It was a great trip",
  },
  {
    name: "Gagan G.",
    fullName: "Gagan Grover",
    quote:
      "Had an amazing journey with singh tour and travels today. The driver was Professional and was just like a family. Thank you!",
  },
  {
    name: "Megha N.",
    fullName: "Megha Nanda",
    quote:
      "Very good experience with Sonu bhaiya .his driving is very safe and he is very punctual",
  },
] as const;

export function callUrl() {
  return `tel:${business.phoneTel}`;
}

export function whatsappUrl(message: string) {
  if (!config.whatsappEnabled) return null;
  return `https://wa.me/${config.whatsappE164}?text=${encodeURIComponent(message)}`;
}

export function smsUrl(message: string) {
  return `sms:${business.phoneTel}?body=${encodeURIComponent(message)}`;
}
