/** Verified facts only — from Google Maps listing / owner brief. */

export const business = {
  name: "Singh Tour & Travels",
  nameHindi: "सिंह टूर & ट्रेवल्स",
  category: "Travel agency",
  address:
    "1457, TC camp Tilaknagar, Raghubir Nagar, Tagore Garden Extension, Delhi 110027, India",
  addressShort: "Tagore Garden Extension, Delhi 110027",
  phoneDisplay: "+91 98187 49172",
  phoneTel: "+919818749172",
  whatsapp: "919818749172",
  hours: "Open 24 hours",
  rating: 4.6,
  reviewCount: 30,
  googleMapsSearch:
    "https://www.google.com/maps/search/?api=1&query=Singh+Tour+%26+Travels+Tagore+Garden+Delhi",
  googleMapsEmbed:
    "https://maps.google.com/maps?q=Singh+Tour+%26+Travels+Tagore+Garden+Extension+Delhi&z=15&output=embed",
  googleMapsDirections:
    "https://www.google.com/maps/dir/?api=1&destination=1457+TC+camp+Tilaknagar+Raghubir+Nagar+Tagore+Garden+Extension+Delhi+110027",
} as const;

export const reviews = [
  {
    name: "Ravinder Singh",
    quote:
      "Travelled from panipat and had amazing experience, sukhwant ji was very punctual and polite. It was a great trip",
  },
  {
    name: "Gagan Grover",
    quote:
      "Had an amazing journey with singh tour and travels today. The driver was Professional and was just like a family. Thank you!",
  },
  {
    name: "Megha Nanda",
    quote:
      "Very good experience with Sonu bhaiya .his driving is very safe and he is very punctual",
  },
] as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function callUrl() {
  return `tel:${business.phoneTel}`;
}
