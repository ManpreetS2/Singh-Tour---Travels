/**
 * Illustrative places people often travel to from Delhi.
 * Mix rule (QW-16): alternate plains/heritage, water/ghats, hills —
 * no two mountain frames adjacent; at most 3 of 10 mountain-dominated.
 */

export type Destination = {
  id: string;
  name: string;
  boardName: string;
  state: string;
  code: string;
  sentence: string;
  label: string;
  image: string;
  credit: string;
  creditUrl: string;
  license: string;
  terrain: "heritage" | "water" | "mountain" | "city";
};

export const destinations: Destination[] = [
  {
    id: "amritsar",
    name: "Amritsar",
    boardName: "AMRITSAR",
    state: "Punjab",
    code: "ATQ",
    sentence:
      "Evening light on Harmandir Sahib and the quiet of the Amrit Sarovar.",
    label: "AMRITSAR · Punjab · Harmandir Sahib (Golden Temple)",
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
    boardName: "DELHI",
    state: "NCR",
    code: "DEL",
    sentence:
      "Humayun's Tomb gardens: a calm city circuit before the open road.",
    label: "DELHI · NCR · Humayun's Tomb",
    image: "/images/v2/delhi-humayun.jpg",
    credit: "Komal Sambhudas",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Humayun%27s_Tomb-Delhi_front_view.jpg",
    license: "CC0",
    terrain: "city",
  },
  {
    id: "rishikesh",
    name: "Rishikesh",
    boardName: "RISHIKESH",
    state: "Uttarakhand",
    code: "RKSH",
    sentence:
      "Lakshman Jhula over the Ganga, with the riverside town below.",
    label: "RISHIKESH · Uttarakhand · Lakshman Jhula",
    image: "/images/v2/rishikesh-jhula.jpg",
    credit: "Snehrashmi",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Lakshman_Jhula_Bridge_-_Hrishikesh_-_Uttarakhand_001.jpg",
    license: "CC BY-SA 4.0",
    terrain: "water",
  },
  {
    id: "agra",
    name: "Agra",
    boardName: "AGRA",
    state: "Uttar Pradesh",
    code: "AGR",
    sentence: "The Taj Mahal at Agra: the classic day journey from Delhi.",
    label: "AGRA · Uttar Pradesh · Taj Mahal",
    image: "/images/v2/agra-taj.jpg",
    credit: "Yann; edited by King of Hearts",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Taj_Mahal,_Agra,_India_edit2.jpg",
    license: "CC BY-SA 4.0",
    terrain: "heritage",
  },
  {
    id: "shimla",
    name: "Shimla",
    boardName: "SHIMLA",
    state: "Himachal",
    code: "SLD",
    sentence: "The Ridge and Christ Church: hill air above the plains.",
    label: "SHIMLA · Himachal · The Ridge",
    image: "/images/v2/shimla-ridge.jpg",
    credit: "Tanweer Morshed",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:The_Ridge,_shimla_01.JPG",
    license: "CC BY-SA 4.0",
    terrain: "mountain",
  },
  {
    id: "jaipur",
    name: "Jaipur",
    boardName: "JAIPUR",
    state: "Rajasthan",
    code: "JAI",
    sentence: "Hawa Mahal on the old city street: pink sandstone and traffic.",
    label: "JAIPUR · Rajasthan · Hawa Mahal",
    image: "/images/v2/jaipur-hawa.jpg",
    credit: "Marcin Białek",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Hawa_Mahal_2011.jpg",
    license: "CC BY-SA 4.0",
    terrain: "heritage",
  },
  {
    id: "haridwar",
    name: "Haridwar",
    boardName: "HARIDWAR",
    state: "Uttarakhand",
    code: "HW",
    sentence: "Har Ki Pauri aarti: lamps on the Ganga after dusk.",
    label: "HARIDWAR · Uttarakhand · Har Ki Pauri",
    image: "/images/v2/haridwar-aarti.jpg",
    credit: "Ramesh Lalwani",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Aarti_at_Har_ki_Pauri_on_Explore.jpg",
    license: "CC BY 2.0",
    terrain: "water",
  },
  {
    id: "kashmir",
    name: "Kashmir",
    boardName: "KASHMIR",
    state: "J&K",
    code: "SXR",
    sentence: "An empty shikara on Dal Lake, Srinagar.",
    label: "KASHMIR · J&K · Dal Lake, Srinagar",
    image: "/images/v2/kashmir-dal.jpg",
    credit: "Fulvio Spada",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Empty_shikara_on_Dal_Lake,_Srinagar,_India_2013-08-23_(flickr_9967093983).jpg",
    license: "CC BY-SA 2.0",
    terrain: "water",
  },
  {
    id: "ladakh",
    name: "Ladakh",
    boardName: "LADAKH",
    state: "Ladakh",
    code: "IXL",
    sentence: "Pangong Tso: high blue water under an open sky.",
    label: "LADAKH · Pangong Tso",
    image: "/images/v2/ladakh-pangong.jpg",
    credit: "KennyOMG",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Pangong_Tso_2.jpg",
    license: "CC BY-SA 4.0",
    terrain: "mountain",
  },
  {
    id: "vaishno-devi",
    name: "Vaishno Devi",
    boardName: "VAISHNO DEVI",
    state: "J&K",
    code: "KTRA",
    sentence: "The temple at Katra lit for the night climb.",
    label: "VAISHNO DEVI · Katra · Temple at night",
    image: "/images/v2/vaishno-devi-night.jpg",
    credit: "Baap8969",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Shri_Mata_Vaishno_Devi_Temple_at_Night.jpg",
    license: "CC0",
    terrain: "mountain",
  },
];

/** Board flip cycle (hero row 2). */
export const boardPlaces = [
  "AMRITSAR",
  "HARIDWAR",
  "JAIPUR",
  "SHIMLA",
  "AGRA",
] as const;

export function findDestination(idOrName: string) {
  const q = idOrName.trim().toLowerCase();
  return destinations.find(
    (d) =>
      d.id === q ||
      d.name.toLowerCase() === q ||
      d.boardName.toLowerCase() === q,
  );
}
