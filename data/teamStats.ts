import type { TeamStats } from "@/lib/types";

export const teamStats: TeamStats[] = [
  { teamId: "bch-knights", ppg: 108.2, rpg: 45.1, apg: 24.8, fgPct: 0.487, threePct: 0.362, ftPct: 0.798 },
  { teamId: "bim-bishrelt", ppg: 102.5, rpg: 42.3, apg: 22.1, fgPct: 0.471, threePct: 0.348, ftPct: 0.782 },
  { teamId: "darkhan-united", ppg: 98.7, rpg: 44.8, apg: 20.5, fgPct: 0.458, threePct: 0.335, ftPct: 0.765 },
  { teamId: "erdenet-miners", ppg: 101.3, rpg: 43.2, apg: 21.8, fgPct: 0.465, threePct: 0.371, ftPct: 0.771 },
  { teamId: "ihc-apes", ppg: 99.1, rpg: 41.5, apg: 19.9, fgPct: 0.452, threePct: 0.328, ftPct: 0.758 },
  { teamId: "khas-knights", ppg: 96.4, rpg: 40.8, apg: 18.7, fgPct: 0.441, threePct: 0.322, ftPct: 0.749 },
  { teamId: "khovd-falcons", ppg: 95.8, rpg: 42.1, apg: 19.2, fgPct: 0.438, threePct: 0.318, ftPct: 0.742 },
  { teamId: "mongolians-bt", ppg: 94.2, rpg: 39.6, apg: 18.1, fgPct: 0.432, threePct: 0.312, ftPct: 0.735 },
  { teamId: "selenge-bodons", ppg: 91.5, rpg: 38.9, apg: 17.4, fgPct: 0.425, threePct: 0.305, ftPct: 0.728 },
  { teamId: "zavkhan-brothers", ppg: 90.8, rpg: 39.2, apg: 17.8, fgPct: 0.428, threePct: 0.308, ftPct: 0.731 },
];

export function getTeamStats(teamId: string): TeamStats | undefined {
  return teamStats.find((s) => s.teamId === teamId);
}
