export type DestinationCategory =
  | "Spiritual"
  | "Mountains"
  | "Heritage"
  | "Weekend";

export type Destination = {
  id: string;
  name: string;
  region: string;
  category: DestinationCategory;
  blurb: string;
  image: string;
  itineraryHint: string;
};

export const categories: Array<DestinationCategory | "All"> = [
  "All",
  "Spiritual",
  "Mountains",
  "Heritage",
  "Weekend",
];

/** Illustrative destinations for exploration only — not a published catalogue. */
export const destinations: Destination[] = [
  {
    id: "amritsar",
    name: "Amritsar",
    region: "Punjab",
    category: "Spiritual",
    blurb: "Golden Temple evenings and the quiet of the sarovar at dusk.",
    image: "/images/amritsar-golden-temple.jpg",
    itineraryHint: "Delhi → Amritsar overnight road, temple visit, return next day",
  },
  {
    id: "rishikesh",
    name: "Rishikesh",
    region: "Uttarakhand",
    category: "Spiritual",
    blurb: "Ganga aarti light, riverside walks, and mountain air.",
    image: "/images/himalaya-road.jpg",
    itineraryHint: "Day or overnight to Rishikesh with flexible halt points",
  },
  {
    id: "manali",
    name: "Manali",
    region: "Himachal",
    category: "Mountains",
    blurb: "Pine roads, snow line views, and unhurried hill stays.",
    image: "/images/manali-mountains.jpg",
    itineraryHint: "Multi-day Himachal road trip — pace set with you",
  },
  {
    id: "ladakh",
    name: "Ladakh",
    region: "High Himalaya",
    category: "Mountains",
    blurb: "High passes, open sky, and the long road north.",
    image: "/images/ladakh-road.jpg",
    itineraryHint: "Long-haul mountain itinerary — confirm season and vehicle",
  },
  {
    id: "shimla",
    name: "Shimla",
    region: "Himachal",
    category: "Mountains",
    blurb: "Ridge walks, colonial lanes, and cool evenings.",
    image: "/images/shimla-hills.jpg",
    itineraryHint: "Weekend or extended hill escape from Delhi",
  },
  {
    id: "agra",
    name: "Agra",
    region: "Uttar Pradesh",
    category: "Heritage",
    blurb: "Taj at first light — the classic Delhi day journey.",
    image: "/images/agra-taj.jpg",
    itineraryHint: "Same-day Agra with early start and flexible return",
  },
  {
    id: "jaipur",
    name: "Jaipur",
    region: "Rajasthan",
    category: "Heritage",
    blurb: "Pink city streets, forts, and warm Rajasthani evenings.",
    image: "/images/jaipur.jpg",
    itineraryHint: "Day trip or overnight Golden Triangle leg",
  },
  {
    id: "delhi-heritage",
    name: "Delhi circuits",
    region: "NCR",
    category: "Weekend",
    blurb: "Airport runs, family visits, and local day circuits.",
    image: "/images/delhi-india-gate.jpg",
    itineraryHint: "Airport transfer or local sightseeing — ask what's available",
  },
  {
    id: "open-road",
    name: "Open highway",
    region: "North India",
    category: "Weekend",
    blurb: "Golden-hour stretches between cities — your pace, our wheel.",
    image: "/images/highway-golden.jpg",
    itineraryHint: "Custom outstation — tell us the towns and dates",
  },
];
