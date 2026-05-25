import type { Player, PlayerSeasonStats, GameLogEntry } from "@/lib/types";

export const players: Player[] = [
  { id: "p1", teamId: "bch-knights", name: "Boldbaatar Ganbat", nameMn: "Ganbat Boldbaatar", number: 23, position: "PG", positionMn: "PG", height: "6'1\"", weight: "180 lbs", nationality: "Mongolia", nationalityMn: "Mongolia", age: 28 },
  { id: "p2", teamId: "bch-knights", name: "Tuvshinbayar Munkh", nameMn: "Munkh Tuvshinbayar", number: 7, position: "SG", positionMn: "SG", height: "6'3\"", weight: "195 lbs", nationality: "Mongolia", nationalityMn: "Mongolia", age: 25 },
  { id: "p3", teamId: "bch-knights", name: "Enkhbold Dorj", nameMn: "Dorj Enkhbold", number: 15, position: "PF", positionMn: "PF", height: "6'8\"", weight: "220 lbs", nationality: "Mongolia", nationalityMn: "Mongolia", age: 27 },
  { id: "p4", teamId: "bch-knights", name: "James Mitchell", nameMn: "James Mitchell", number: 33, position: "C", positionMn: "C", height: "6'11\"", weight: "245 lbs", nationality: "USA", nationalityMn: "USA", age: 30 },
  { id: "p5", teamId: "bim-bishrelt", name: "Bat-Erdene Otgon", nameMn: "Otgon Bat-Erdene", number: 11, position: "PG", positionMn: "PG", height: "5'11\"", weight: "175 lbs", nationality: "Mongolia", nationalityMn: "Mongolia", age: 24 },
  { id: "p6", teamId: "bim-bishrelt", name: "Sainbayar Naran", nameMn: "Naran Sainbayar", number: 3, position: "SF", positionMn: "SF", height: "6'6\"", weight: "210 lbs", nationality: "Mongolia", nationalityMn: "Mongolia", age: 26 },
  { id: "p7", teamId: "bim-bishrelt", name: "Marcus Williams", nameMn: "Marcus Williams", number: 24, position: "SG", positionMn: "SG", height: "6'4\"", weight: "200 lbs", nationality: "USA", nationalityMn: "USA", age: 29 },
  { id: "p8", teamId: "darkhan-united", name: "Gan-Ochir Purev", nameMn: "Purev Gan-Ochir", number: 10, position: "SF", positionMn: "SF", height: "6'7\"", weight: "215 lbs", nationality: "Mongolia", nationalityMn: "Mongolia", age: 27 },
  { id: "p9", teamId: "darkhan-united", name: "Temuulen Bat", nameMn: "Bat Temuulen", number: 5, position: "PG", positionMn: "PG", height: "6'0\"", weight: "178 lbs", nationality: "Mongolia", nationalityMn: "Mongolia", age: 23 },
  { id: "p10", teamId: "erdenet-miners", name: "Byambadorj Altan", nameMn: "Altan Byambadorj", number: 14, position: "C", positionMn: "C", height: "7'0\"", weight: "250 lbs", nationality: "Mongolia", nationalityMn: "Mongolia", age: 31 },
  { id: "p11", teamId: "erdenet-miners", name: "David Chen", nameMn: "David Chen", number: 8, position: "SG", positionMn: "SG", height: "6'2\"", weight: "190 lbs", nationality: "Taiwan", nationalityMn: "Taiwan", age: 26 },
  { id: "p12", teamId: "ihc-apes", name: "Narantuya Erdene", nameMn: "Erdene Narantuya", number: 12, position: "PF", positionMn: "PF", height: "6'9\"", weight: "225 lbs", nationality: "Mongolia", nationalityMn: "Mongolia", age: 28 },
  { id: "p13", teamId: "khas-knights", name: "Oyunbat Khishig", nameMn: "Khishig Oyunbat", number: 21, position: "SF", positionMn: "SF", height: "6'5\"", weight: "205 lbs", nationality: "Mongolia", nationalityMn: "Mongolia", age: 25 },
  { id: "p14", teamId: "khovd-falcons", name: "Ariunbold Tsog", nameMn: "Tsog Ariunbold", number: 4, position: "PG", positionMn: "PG", height: "5'10\"", weight: "170 lbs", nationality: "Mongolia", nationalityMn: "Mongolia", age: 22 },
  { id: "p15", teamId: "mongolians-bt", name: "Munkhbat Erdene", nameMn: "Erdene Munkhbat", number: 9, position: "SG", positionMn: "SG", height: "6'3\"", weight: "192 lbs", nationality: "Mongolia", nationalityMn: "Mongolia", age: 27 },
  { id: "p16", teamId: "selenge-bodons", name: "Battulga Gan", nameMn: "Gan Battulga", number: 17, position: "PF", positionMn: "PF", height: "6'8\"", weight: "218 lbs", nationality: "Mongolia", nationalityMn: "Mongolia", age: 29 },
  { id: "p17", teamId: "zavkhan-brothers", name: "Khurelbaatar Sum", nameMn: "Sum Khurelbaatar", number: 2, position: "SG", positionMn: "SG", height: "6'1\"", weight: "185 lbs", nationality: "Mongolia", nationalityMn: "Mongolia", age: 24 },
  { id: "p18", teamId: "bch-knights", name: "Nyam-Osoryn Dash", nameMn: "Dash Nyam-Osoryn", number: 1, position: "SF", positionMn: "SF", height: "6'6\"", weight: "208 lbs", nationality: "Mongolia", nationalityMn: "Mongolia", age: 26 },
];

export const playerStats: PlayerSeasonStats[] = [
  { playerId: "p1", gp: 24, ppg: 22.4, rpg: 4.2, apg: 8.1, spg: 1.8, bpg: 0.2, fgPct: 0.468, threePct: 0.382, ftPct: 0.891 },
  { playerId: "p2", gp: 24, ppg: 16.8, rpg: 3.5, apg: 2.4, spg: 1.2, bpg: 0.3, fgPct: 0.445, threePct: 0.368, ftPct: 0.852 },
  { playerId: "p3", gp: 23, ppg: 14.2, rpg: 9.8, apg: 1.9, spg: 0.8, bpg: 1.1, fgPct: 0.512, threePct: 0.285, ftPct: 0.778 },
  { playerId: "p4", gp: 24, ppg: 18.5, rpg: 11.2, apg: 1.2, spg: 0.5, bpg: 2.4, fgPct: 0.558, threePct: 0, ftPct: 0.721 },
  { playerId: "p5", gp: 24, ppg: 19.1, rpg: 3.1, apg: 7.5, spg: 1.5, bpg: 0.1, fgPct: 0.441, threePct: 0.355, ftPct: 0.865 },
];

export const topPerformerId = "p1";

export const gameLogs: Record<string, GameLogEntry[]> = {
  p1: [
    { gameId: "g1", date: "2025-05-20", opponent: "BIM Bishrelt", opponentMn: "BIM Bishrelt", result: "W", score: "98-92", min: 36, pts: 28, reb: 5, ast: 10 },
    { gameId: "g2", date: "2025-05-17", opponent: "Erdenet Miners", opponentMn: "Erdenet Miners", result: "W", score: "105-99", min: 38, pts: 24, reb: 4, ast: 9 },
    { gameId: "g3", date: "2025-05-14", opponent: "Darkhan United", opponentMn: "Darkhan United", result: "L", score: "88-91", min: 35, pts: 19, reb: 3, ast: 7 },
    { gameId: "g4", date: "2025-05-10", opponent: "IHC Apes", opponentMn: "IHC Apes", result: "W", score: "112-98", min: 34, pts: 31, reb: 6, ast: 8 },
    { gameId: "g5", date: "2025-05-07", opponent: "Khas Knights", opponentMn: "Khas Knights", result: "W", score: "95-88", min: 37, pts: 22, reb: 4, ast: 11 },
  ],
};

export function getPlayerStats(playerId: string): PlayerSeasonStats | undefined {
  return playerStats.find((s) => s.playerId === playerId);
}

export function getPlayersByTeam(teamId: string): Player[] {
  return players.filter((p) => p.teamId === teamId);
}

export function getPlayerById(id: string): Player | undefined {
  return players.find((p) => p.id === id);
}
