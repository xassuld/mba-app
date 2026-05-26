import type { Game, GameDetailStats, PlayerBoxScore, TeamGameStats } from "./types";
import { getPlayersByTeam, getPlayerStats } from "@/data/players";
import { aggregateBoxScores } from "./boxScore";

function seed(gameId: string, playerId: string, n: number): number {
  let h = 0;
  const s = `${gameId}-${playerId}-${n}`;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function buildPlayerLine(
  playerId: string,
  gameId: string,
  index: number
): PlayerBoxScore {
  const h = seed(gameId, playerId, index);
  const season = getPlayerStats(playerId);
  const pts = season
    ? Math.max(2, Math.round(season.ppg * (0.75 + (h % 25) / 100)))
    : 6 + (h % 16);
  const fga = Math.max(pts, pts + 2 + (h % 8));
  const fgm = Math.min(fga, Math.max(1, Math.round(fga * (0.36 + (h % 18) / 100))));
  const tpa = Math.min(fga, (h % 6) + 1);
  const tpm = Math.min(tpa, Math.floor(tpa * (0.3 + (h % 5) / 10)));
  const fta = (h % 5) + 1;
  const ftm = Math.min(fta, Math.round(fta * (0.65 + (h % 4) / 10)));
  const reb = season
    ? Math.max(1, Math.round(season.rpg * (0.8 + (h % 20) / 100)))
    : 2 + (h % 9);
  const oreb = Math.floor(reb * (0.25 + (h % 3) / 10));
  const dreb = reb - oreb;

  return {
    playerId,
    min: 14 + (h % 18),
    fgm,
    fga,
    tpm,
    tpa,
    ftm,
    fta,
    oreb,
    dreb,
    reb,
    ast: season
      ? Math.max(0, Math.round(season.apg * (0.7 + (h % 15) / 100)))
      : h % 7,
    stl: h % 3,
    blk: h % 2,
    to: 1 + (h % 4),
    pf: 1 + (h % 4),
    pts,
    plusMinus: (h % 21) - 10,
  };
}

function teamBoxFromRoster(teamId: string, gameId: string): PlayerBoxScore[] {
  const roster = getPlayersByTeam(teamId);
  if (roster.length === 0) return [];

  const active = roster.slice(0, Math.min(5, roster.length));
  const lines = active.map((p, i) => buildPlayerLine(p.id, gameId, i));

  if (roster.length > active.length) {
    lines.push({ playerId: roster[active.length].id, dnp: "coach" });
  }

  return lines;
}

function teamStatsFromBox(box: PlayerBoxScore[]): TeamGameStats {
  const t = aggregateBoxScores(box);
  return {
    fgPct: t.fga ? t.fgm / t.fga : 0,
    threePct: t.tpa ? t.tpm / t.tpa : 0,
    ftPct: t.fta ? t.ftm / t.fta : 0,
    reb: t.reb,
    ast: t.ast,
    to: t.to,
  };
}

export function buildSyntheticGameStats(game: Game): GameDetailStats | null {
  const homeBox = teamBoxFromRoster(game.homeTeamId, game.id);
  const awayBox = teamBoxFromRoster(game.awayTeamId, game.id);

  if (homeBox.length === 0 && awayBox.length === 0) return null;

  const homeScore = game.homeScore ?? 0;
  const awayScore = game.awayScore ?? 0;

  return {
    gameId: game.id,
    quarters: [],
    home: teamStatsFromBox(homeBox),
    away: teamStatsFromBox(awayBox),
    homeLeaders: [],
    awayLeaders: [],
    homeBox,
    awayBox,
  };
}
