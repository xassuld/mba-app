export type Language = "mn" | "en";

export type GameStatus = "final" | "live" | "upcoming";

export interface Team {
  id: string;
  slug: string;
  name: string;
  nameMn: string;
  city: string;
  cityMn: string;
  abbreviation: string;
  primaryColor: string;
  wins: number;
  losses: number;
  logoUrl?: string;
}

export interface TeamStats {
  teamId: string;
  ppg: number;
  rpg: number;
  apg: number;
  fgPct: number;
  threePct: number;
  ftPct: number;
}

export interface Player {
  id: string;
  teamId: string;
  name: string;
  nameMn: string;
  number: number;
  position: string;
  positionMn: string;
  height: string;
  weight: string;
  nationality: string;
  nationalityMn: string;
  age: number;
  photoUrl?: string;
}

export interface PlayerSeasonStats {
  playerId: string;
  gp: number;
  ppg: number;
  rpg: number;
  apg: number;
  spg: number;
  bpg: number;
  fgPct: number;
  threePct: number;
  ftPct: number;
}

export interface GameLogEntry {
  gameId: string;
  date: string;
  opponent: string;
  opponentMn: string;
  result: "W" | "L";
  score: string;
  min: number;
  pts: number;
  reb: number;
  ast: number;
}

export interface Game {
  id: string;
  date: string;
  time: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore?: number;
  awayScore?: number;
  status: GameStatus;
  quarter?: string;
  venue: string;
  venueMn: string;
}

export interface QuarterScore {
  label: string;
  home: number;
  away: number;
}

export interface TeamGameStats {
  fgPct: number;
  threePct: number;
  ftPct: number;
  reb: number;
  ast: number;
  to: number;
}

export interface GameLeader {
  playerId: string;
  pts: number;
  reb: number;
  ast: number;
}

/** Per-player line in a box score; use `dnp` when the player did not play. */
export interface PlayerBoxScore {
  playerId: string;
  dnp?: string;
  min?: number;
  fgm?: number;
  fga?: number;
  tpm?: number;
  tpa?: number;
  ftm?: number;
  fta?: number;
  oreb?: number;
  dreb?: number;
  reb?: number;
  ast?: number;
  stl?: number;
  blk?: number;
  to?: number;
  pf?: number;
  pts?: number;
  plusMinus?: number;
}

export interface BoxScoreTotals {
  min: number;
  fgm: number;
  fga: number;
  tpm: number;
  tpa: number;
  ftm: number;
  fta: number;
  oreb: number;
  dreb: number;
  reb: number;
  ast: number;
  stl: number;
  blk: number;
  to: number;
  pf: number;
  pts: number;
}

export interface GameDetailStats {
  gameId: string;
  quarters: QuarterScore[];
  home: TeamGameStats;
  away: TeamGameStats;
  homeLeaders: GameLeader[];
  awayLeaders: GameLeader[];
  homeBox: PlayerBoxScore[];
  awayBox: PlayerBoxScore[];
}

export interface Standing {
  teamId: string;
  rank: number;
  wins: number;
  losses: number;
  pct: number;
  gb: number;
  home: string;
  away: string;
  last10: string;
  streak: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  content: string;
  contentEn: string;
  date: string;
  category: string;
  categoryEn: string;
  thumbnail: string;
  author: string;
}

export interface NavItem {
  href: string;
  labelMn: string;
  labelEn: string;
}

export interface Translations {
  [key: string]: { mn: string; en: string };
}
