import type { BoxScoreTotals, PlayerBoxScore } from "./types";

export function shootingPct(made: number, att: number): string {
  if (att === 0) return "—";
  return `${Math.round((made / att) * 1000) / 10}`;
}

export function aggregateBoxScores(players: PlayerBoxScore[]): BoxScoreTotals {
  const active = players.filter((p) => !p.dnp);

  return {
    min: active.reduce((a, p) => a + (p.min ?? 0), 0),
    fgm: active.reduce((a, p) => a + (p.fgm ?? 0), 0),
    fga: active.reduce((a, p) => a + (p.fga ?? 0), 0),
    tpm: active.reduce((a, p) => a + (p.tpm ?? 0), 0),
    tpa: active.reduce((a, p) => a + (p.tpa ?? 0), 0),
    ftm: active.reduce((a, p) => a + (p.ftm ?? 0), 0),
    fta: active.reduce((a, p) => a + (p.fta ?? 0), 0),
    oreb: active.reduce((a, p) => a + (p.oreb ?? 0), 0),
    dreb: active.reduce((a, p) => a + (p.dreb ?? 0), 0),
    reb: active.reduce((a, p) => a + (p.reb ?? 0), 0),
    ast: active.reduce((a, p) => a + (p.ast ?? 0), 0),
    stl: active.reduce((a, p) => a + (p.stl ?? 0), 0),
    blk: active.reduce((a, p) => a + (p.blk ?? 0), 0),
    to: active.reduce((a, p) => a + (p.to ?? 0), 0),
    pf: active.reduce((a, p) => a + (p.pf ?? 0), 0),
    pts: active.reduce((a, p) => a + (p.pts ?? 0), 0),
  };
}

export const BOX_SCORE_COLUMNS = [
  "min",
  "fgm",
  "fga",
  "fgPct",
  "tpm",
  "tpa",
  "tpPct",
  "ftm",
  "fta",
  "ftPct",
  "oreb",
  "dreb",
  "reb",
  "ast",
  "stl",
  "blk",
  "to",
  "pf",
  "pts",
  "plusMinus",
] as const;

export type BoxScoreColumn = (typeof BOX_SCORE_COLUMNS)[number];
