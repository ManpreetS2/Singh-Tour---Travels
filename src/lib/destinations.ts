/**
 * Example routes / places people often travel to from Delhi.
 * Mix rule: no two mountain frames adjacent; ≤3 mountain-dominated.
 */

export type Place = {
  id: string;
  name: string;
  region: string;
  regionId: string;
  sentence: string;
  image: string;
  credit: string;
  creditUrl: string;
  license: string;
  terrain: "heritage" | "water" | "mountain" | "city";
  role?: "primary" | "secondary";
};

export type Region = {
  id: string;
  label: string;
  placeIds: string[];
  /** Primary (large 4:5) and secondary (small 1:1) photo place ids */
  photos: [string, string];
};

export const places: Place[] = [
  {
    id: "amritsar",
    name: "Amritsar",
    region: "Punjab",
    regionId: "punjab",
    sentence:
      "Evening light on Harmandir Sahib and the quiet of the Amrit Sarovar.",
    image: "/images/v2/hero-golden-temple-night.jpg",
    credit: "Marsmux",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Golden_Temple_nighttime.jpg",
    license: "CC BY-SA 4.0",
    terrain: "heritage",
  },
  {
    id: "delhi",
    name: "Delhi",
    region: "Delhi & Golden Triangle",
    regionId: "triangle",
    sentence:
      "Humayun's Tomb gardens: a calm city circuit before the open road.",
    image: "/images/v2/delhi-humayun.jpg",
    credit: "Komal Sambhudas",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Humayun%27s_Tomb-Delhi_front_view.jpg",
    license: "CC0",
    terrain: "city",
  },
  {
    id: "india-gate",
    name: "India Gate",
    region: "Delhi & Golden Triangle",
    regionId: "triangle",
    sentence: "India Gate from the west, New Delhi.",
    image: "/images/v2/delhi-india-gate.jpg",
    credit: "Nikhilb239",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:India_Gate,_New_Delhi_from_West.jpg",
    license: "CC BY-SA 4.0",
    terrain: "city",
    role: "secondary",
  },
  {
    id: "agra",
    name: "Agra",
    region: "Delhi & Golden Triangle",
    regionId: "triangle",
    sentence: "The Taj Mahal at Agra: the classic day journey from Delhi.",
    image: "/images/v2/agra-taj.jpg",
    credit: "Yann; edited by King of Hearts",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Taj_Mahal,_Agra,_India_edit2.jpg",
    license: "CC BY-SA 4.0",
    terrain: "heritage",
  },
  {
    id: "jaipur",
    name: "Jaipur",
    region: "Delhi & Golden Triangle",
    regionId: "triangle",
    sentence: "Hawa Mahal on the old city street: pink sandstone and traffic.",
    image: "/images/v2/jaipur-hawa.jpg",
    credit: "Marcin Białek",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Hawa_Mahal_2011.jpg",
    license: "CC BY-SA 4.0",
    terrain: "heritage",
  },
  {
    id: "amber",
    name: "Amber Fort",
    region: "Delhi & Golden Triangle",
    regionId: "triangle",
    sentence: "Amber Fort above Jaipur.",
    image: "/images/v2/jaipur-amber.jpg",
    credit: "A.Savin",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Jaipur_03-2016_02_Amber_Fort.jpg",
    license: "FAL",
    terrain: "heritage",
    role: "secondary",
  },
  {
    id: "shimla",
    name: "Shimla",
    region: "Himachal & Ladakh",
    regionId: "himachal",
    sentence: "The Ridge and Christ Church: hill air above the plains.",
    image: "/images/v2/shimla-ridge.jpg",
    credit: "Tanweer Morshed",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:The_Ridge,_shimla_01.JPG",
    license: "CC BY-SA 4.0",
    terrain: "heritage",
  },
  {
    id: "manali",
    name: "Manali",
    region: "Himachal & Ladakh",
    regionId: "himachal",
    sentence: "Kullu Valley north of Manali: pine slopes and open sky.",
    image: "/images/v2/manali-kullu.jpg",
    credit: "UnpetitproleX",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Kullu_Valley_near_Manali,_Himachal_Pradesh,_India.jpg",
    license: "CC BY-SA 4.0",
    terrain: "mountain",
  },
  {
    id: "ladakh",
    name: "Ladakh",
    region: "Himachal & Ladakh",
    regionId: "himachal",
    sentence: "Pangong Tso: high blue water under an open sky.",
    image: "/images/v2/ladakh-pangong.jpg",
    credit: "KennyOMG",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Pangong_Tso_2.jpg",
    license: "CC BY-SA 4.0",
    terrain: "water",
  },
  {
    id: "leh-palace",
    name: "Leh Palace",
    region: "Himachal & Ladakh",
    regionId: "himachal",
    sentence: "Leh Palace above the town.",
    image: "/images/v2/leh-palace.jpg",
    credit: "Deepank Ranka",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Leh_Palace,_Ladakh_04.jpg",
    license: "CC BY-SA 4.0",
    terrain: "heritage",
    role: "secondary",
  },
  {
    id: "rishikesh",
    name: "Rishikesh",
    region: "Uttarakhand",
    regionId: "uttarakhand",
    sentence: "Lakshman Jhula over the Ganga, with the riverside town below.",
    image: "/images/v2/rishikesh-jhula.jpg",
    credit: "Snehrashmi",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Lakshman_Jhula_Bridge_-_Hrishikesh_-_Uttarakhand_001.jpg",
    license: "CC BY-SA 4.0",
    terrain: "water",
  },
  {
    id: "haridwar",
    name: "Haridwar",
    region: "Uttarakhand",
    regionId: "uttarakhand",
    sentence: "Har Ki Pauri aarti: lamps on the Ganga after dusk.",
    image: "/images/v2/haridwar-aarti.jpg",
    credit: "Ramesh Lalwani",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Aarti_at_Har_ki_Pauri_on_Explore.jpg",
    license: "CC BY 2.0",
    terrain: "water",
  },
  {
    id: "kedarnath",
    name: "Kedarnath",
    region: "Uttarakhand",
    regionId: "uttarakhand",
    sentence: "Kedarnath temple in the Char Dham corridor.",
    image: "/images/v2/kedarnath.jpg",
    credit: "Shaq774",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Kedarnath_Temple.jpg",
    license: "Public domain",
    terrain: "mountain",
    role: "secondary",
  },
  {
    id: "vaishno-devi",
    name: "Vaishno Devi",
    region: "Jammu & Kashmir",
    regionId: "jk",
    sentence: "The temple at Katra lit for the night climb.",
    image: "/images/v2/vaishno-devi-night.jpg",
    credit: "Baap8969",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Shri_Mata_Vaishno_Devi_Temple_at_Night.jpg",
    license: "CC0",
    terrain: "heritage",
  },
  {
    id: "srinagar",
    name: "Srinagar",
    region: "Jammu & Kashmir",
    regionId: "jk",
    sentence: "An empty shikara on Dal Lake.",
    image: "/images/v2/kashmir-dal.jpg",
    credit: "Fulvio Spada",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Empty_shikara_on_Dal_Lake,_Srinagar,_India_2013-08-23_(flickr_9967093983).jpg",
    license: "CC BY-SA 2.0",
    terrain: "water",
  },
];

export const regions: Region[] = [
  {
    id: "punjab",
    label: "Punjab",
    placeIds: ["amritsar"],
    photos: ["amritsar", "amritsar"],
  },
  {
    id: "triangle",
    label: "Delhi & the Golden Triangle",
    placeIds: ["delhi", "agra", "jaipur"],
    photos: ["agra", "amber"],
  },
  {
    id: "himachal",
    label: "Himachal & Ladakh",
    placeIds: ["shimla", "manali", "ladakh"],
    photos: ["shimla", "leh-palace"],
  },
  {
    id: "uttarakhand",
    label: "Uttarakhand",
    placeIds: ["rishikesh", "haridwar", "kedarnath"],
    photos: ["rishikesh", "kedarnath"],
  },
  {
    id: "jk",
    label: "Jammu & Kashmir",
    placeIds: ["vaishno-devi", "srinagar"],
    photos: ["vaishno-devi", "srinagar"],
  },
];

/** Illustrative corridors from Delhi — not packages or road geometry. */
export const routes = [
  {
    id: "triangle",
    name: "Golden Triangle",
    places: ["Delhi", "Agra", "Jaipur"],
    line: "The classic circuit of old cities south and west of Delhi.",
    pathId: "route-triangle",
  },
  {
    id: "amritsar",
    name: "Punjab",
    places: ["Delhi", "Amritsar"],
    line: "West to Harmandir Sahib and the sarovar at dusk.",
    pathId: "route-amritsar",
  },
  {
    id: "himalaya",
    name: "Himachal & Ladakh",
    places: ["Delhi", "Shimla", "Manali", "Leh"],
    line: "North into the hills, then the high road toward Ladakh.",
    pathId: "route-himalaya",
  },
  {
    id: "ganga",
    name: "Ganga & Char Dham",
    places: ["Delhi", "Haridwar", "Rishikesh"],
    line: "The river towns and the pilgrimage corridor beyond.",
    pathId: "route-ganga",
  },
  {
    id: "kashmir",
    name: "Jammu & Kashmir",
    places: ["Delhi", "Katra", "Srinagar"],
    line: "Toward Vaishno Devi and the lake at Srinagar.",
    pathId: "route-kashmir",
  },
] as const;

export type RouteId = (typeof routes)[number]["id"];

export function getPlace(id: string) {
  return places.find((p) => p.id === id);
}

export function placesInRegion(regionId: string) {
  const r = regions.find((x) => x.id === regionId);
  if (!r) return [];
  return r.placeIds.map((id) => getPlace(id)!).filter(Boolean);
}

/** Places offered in the planner (exclude secondary-only photo slots). */
export function plannerPlaces() {
  return places.filter((p) => p.role !== "secondary" || p.id === "kedarnath");
}
