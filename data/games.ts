import type { Game } from "@/lib/types";

export const games: Game[] = [
  { id: "g1", date: "2025-05-25", time: "19:00", homeTeamId: "bch-knights", awayTeamId: "bim-bishrelt", homeScore: 78, awayScore: 72, status: "live", quarter: "Q3 4:32", venue: "MBA Arena", venueMn: "MBA Arena" },
  { id: "g25", date: "2025-05-25", time: "17:00", homeTeamId: "ihc-apes", awayTeamId: "erdenet-miners", homeScore: 54, awayScore: 58, status: "live", quarter: "Q2 8:15", venue: "IHC Gymnasium", venueMn: "IHC Gymnasium" },
  { id: "g26", date: "2025-05-25", time: "20:30", homeTeamId: "darkhan-united", awayTeamId: "khas-knights", homeScore: 41, awayScore: 39, status: "live", quarter: "Q2 1:42", venue: "Darkhan Arena", venueMn: "Darkhan Arena" },
  { id: "g2", date: "2025-05-24", time: "18:00", homeTeamId: "erdenet-miners", awayTeamId: "darkhan-united", homeScore: 102, awayScore: 98, status: "final", venue: "Erdenet Sports Hall", venueMn: "Erdenet Sports Hall" },
  { id: "g3", date: "2025-05-24", time: "16:00", homeTeamId: "ihc-apes", awayTeamId: "khas-knights", homeScore: 88, awayScore: 91, status: "final", venue: "IHC Gymnasium", venueMn: "IHC Gymnasium" },
  { id: "g4", date: "2025-05-23", time: "19:30", homeTeamId: "khovd-falcons", awayTeamId: "mongolians-bt", homeScore: 95, awayScore: 89, status: "final", venue: "Khovd Arena", venueMn: "Khovd Arena" },
  { id: "g5", date: "2025-05-23", time: "17:00", homeTeamId: "selenge-bodons", awayTeamId: "zavkhan-brothers", homeScore: 76, awayScore: 82, status: "final", venue: "Sukhbaatar Center", venueMn: "Sukhbaatar Center" },
  { id: "g6", date: "2025-05-22", time: "19:00", homeTeamId: "bch-knights", awayTeamId: "erdenet-miners", homeScore: 105, awayScore: 99, status: "final", venue: "MBA Arena", venueMn: "MBA Arena" },
  { id: "g7", date: "2025-05-21", time: "18:30", homeTeamId: "bim-bishrelt", awayTeamId: "darkhan-united", homeScore: 94, awayScore: 88, status: "final", venue: "BIM Sports Complex", venueMn: "BIM Sports Complex" },
  { id: "g8", date: "2025-05-20", time: "19:00", homeTeamId: "bch-knights", awayTeamId: "bim-bishrelt", homeScore: 98, awayScore: 92, status: "final", venue: "MBA Arena", venueMn: "MBA Arena" },
  { id: "g9", date: "2025-05-19", time: "17:00", homeTeamId: "ihc-apes", awayTeamId: "khovd-falcons", homeScore: 101, awayScore: 97, status: "final", venue: "IHC Gymnasium", venueMn: "IHC Gymnasium" },
  { id: "g10", date: "2025-05-18", time: "18:00", homeTeamId: "khas-knights", awayTeamId: "mongolians-bt", homeScore: 87, awayScore: 84, status: "final", venue: "Khas Arena", venueMn: "Khas Arena" },
  { id: "g11", date: "2025-05-17", time: "19:00", homeTeamId: "bch-knights", awayTeamId: "erdenet-miners", homeScore: 105, awayScore: 99, status: "final", venue: "MBA Arena", venueMn: "MBA Arena" },
  { id: "g12", date: "2025-05-16", time: "16:30", homeTeamId: "selenge-bodons", awayTeamId: "darkhan-united", homeScore: 72, awayScore: 85, status: "final", venue: "Sukhbaatar Center", venueMn: "Sukhbaatar Center" },
  { id: "g13", date: "2025-05-15", time: "19:00", homeTeamId: "zavkhan-brothers", awayTeamId: "khovd-falcons", homeScore: 80, awayScore: 88, status: "final", venue: "Uliastai Sports Hall", venueMn: "Uliastai Sports Hall" },
  { id: "g14", date: "2025-05-14", time: "18:00", homeTeamId: "darkhan-united", awayTeamId: "bch-knights", homeScore: 91, awayScore: 88, status: "final", venue: "Darkhan Arena", venueMn: "Darkhan Arena" },
  { id: "g15", date: "2025-05-10", time: "19:00", homeTeamId: "bch-knights", awayTeamId: "ihc-apes", homeScore: 112, awayScore: 98, status: "final", venue: "MBA Arena", venueMn: "MBA Arena" },
  { id: "g16", date: "2025-05-26", time: "18:00", homeTeamId: "darkhan-united", awayTeamId: "khas-knights", status: "upcoming", venue: "Darkhan Arena", venueMn: "Darkhan Arena" },
  { id: "g17", date: "2025-05-27", time: "19:00", homeTeamId: "erdenet-miners", awayTeamId: "bim-bishrelt", status: "upcoming", venue: "Erdenet Sports Hall", venueMn: "Erdenet Sports Hall" },
  { id: "g18", date: "2025-05-28", time: "17:30", homeTeamId: "mongolians-bt", awayTeamId: "selenge-bodons", status: "upcoming", venue: "MBA Arena", venueMn: "MBA Arena" },
  { id: "g19", date: "2025-05-29", time: "19:00", homeTeamId: "bch-knights", awayTeamId: "khovd-falcons", status: "upcoming", venue: "MBA Arena", venueMn: "MBA Arena" },
  { id: "g20", date: "2025-05-30", time: "18:00", homeTeamId: "ihc-apes", awayTeamId: "zavkhan-brothers", status: "upcoming", venue: "IHC Gymnasium", venueMn: "IHC Gymnasium" },
  { id: "g21", date: "2025-06-01", time: "19:00", homeTeamId: "bim-bishrelt", awayTeamId: "khas-knights", status: "upcoming", venue: "BIM Sports Complex", venueMn: "BIM Sports Complex" },
  { id: "g22", date: "2025-06-02", time: "16:00", homeTeamId: "selenge-bodons", awayTeamId: "erdenet-miners", status: "upcoming", venue: "Sukhbaatar Center", venueMn: "Sukhbaatar Center" },
  { id: "g23", date: "2025-06-03", time: "19:30", homeTeamId: "darkhan-united", awayTeamId: "mongolians-bt", status: "upcoming", venue: "Darkhan Arena", venueMn: "Darkhan Arena" },
  { id: "g24", date: "2025-06-05", time: "19:00", homeTeamId: "bch-knights", awayTeamId: "zavkhan-brothers", status: "upcoming", venue: "MBA Arena", venueMn: "MBA Arena" },
];

export const featuredGameId = "g1";

export function getGameById(id: string): Game | undefined {
  return games.find((g) => g.id === id);
}

export function getUpcomingGames(limit = 3): Game[] {
  return games
    .filter((g) => g.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
}

export function getLiveGames(): Game[] {
  return games.filter((g) => g.status === "live");
}

export function getOngoingGames(): Game[] {
  return games.filter((g) => g.status === "live");
}

export function getRecentGames(days = 7): Game[] {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return games
    .filter((g) => g.status === "final" && new Date(g.date) >= cutoff)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
