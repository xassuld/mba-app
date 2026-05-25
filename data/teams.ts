import type { Team } from "@/lib/types";
import { teamLabelsMn } from "./teamLabels";

const baseTeams: Omit<Team, "nameMn" | "cityMn">[] = [
  { id: "bch-knights", slug: "bch-knights", name: "BCH Knights", city: "Ulaanbaatar", abbreviation: "BCH", primaryColor: "#1E3A5F", wins: 18, losses: 6 },
  { id: "bim-bishrelt", slug: "bim-bishrelt", name: "BIM Bishrelt Metal Ulaanbaatar", city: "Ulaanbaatar", abbreviation: "BIM", primaryColor: "#C8102E", wins: 16, losses: 8 },
  { id: "darkhan-united", slug: "darkhan-united", name: "Darkhan United", city: "Darkhan", abbreviation: "DHU", primaryColor: "#2D5016", wins: 14, losses: 10 },
  { id: "erdenet-miners", slug: "erdenet-miners", name: "Erdenet Miners", city: "Erdenet", abbreviation: "ERM", primaryColor: "#F5A623", wins: 15, losses: 9 },
  { id: "ihc-apes", slug: "ihc-apes", name: "IHC Apes", city: "Ulaanbaatar", abbreviation: "IHC", primaryColor: "#4A3728", wins: 12, losses: 12 },
  { id: "khas-knights", slug: "khas-knights", name: "Khas Knights", city: "Ulaanbaatar", abbreviation: "KHA", primaryColor: "#6B21A8", wins: 11, losses: 13 },
  { id: "khovd-falcons", slug: "khovd-falcons", name: "Khovd Falcons", city: "Khovd", abbreviation: "KHF", primaryColor: "#0EA5E9", wins: 10, losses: 14 },
  { id: "mongolians-bt", slug: "mongolians-bt", name: "Mongolians Basketball Team", city: "Ulaanbaatar", abbreviation: "MBT", primaryColor: "#C8102E", wins: 9, losses: 15 },
  { id: "selenge-bodons", slug: "selenge-bodons", name: "Selenge Bodons Sukhbaatar", city: "Sukhbaatar", abbreviation: "SEL", primaryColor: "#059669", wins: 8, losses: 16 },
  { id: "zavkhan-brothers", slug: "zavkhan-brothers", name: "Zavkhan Brothers", city: "Uliastai", abbreviation: "ZAV", primaryColor: "#DC2626", wins: 7, losses: 17 },
];

export const teams: Team[] = baseTeams.map((t) => {
  const labels = teamLabelsMn[t.id];
  return {
    ...t,
    nameMn: labels?.nameMn ?? t.name,
    cityMn: labels?.cityMn ?? t.city,
  };
});
