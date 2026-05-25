import type { Game, GameStatus, Language, Standing, Team } from "./types";
import { teams } from "@/data/teams";
import { players } from "@/data/players";

export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function getTeamById(id: string): Team | undefined {
  return teams.find((t) => t.id === id);
}

export function getTeamBySlug(slug: string): Team | undefined {
  return teams.find((t) => t.slug === slug);
}

export function formatRecord(wins: number, losses: number): string {
  return `${wins}-${losses}`;
}

export function formatPct(wins: number, losses: number): number {
  const total = wins + losses;
  if (total === 0) return 0;
  return Math.round((wins / total) * 1000) / 1000;
}

export function formatDate(dateStr: string, lang: Language = "mn"): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(lang === "mn" ? "mn-MN" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTime(time: string): string {
  return time;
}

export function getGameScoreDisplay(game: Game, lang: Language): string {
  if (game.status === "upcoming") return game.time;
  if (game.homeScore === undefined || game.awayScore === undefined)
    return "—";
  return `${game.homeScore} - ${game.awayScore}`;
}

export function getStatusLabel(status: GameStatus, lang: Language): string {
  const labels = {
    final: { mn: "Дууссан", en: "Final" },
    live: { mn: "Шууд", en: "Live" },
    upcoming: { mn: "Удахгүй", en: "Upcoming" },
  };
  return labels[status][lang];
}

export function sortStandings(
  standings: Standing[],
  column: keyof Standing,
  direction: "asc" | "desc"
): Standing[] {
  return [...standings].sort((a, b) => {
    const aVal = a[column];
    const bVal = b[column];
    if (typeof aVal === "number" && typeof bVal === "number") {
      return direction === "asc" ? aVal - bVal : bVal - aVal;
    }
    return direction === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });
}

export function filterGamesByTeam(games: Game[], teamId: string): Game[] {
  return games.filter(
    (g) => g.homeTeamId === teamId || g.awayTeamId === teamId
  );
}

export function filterGamesByMonth(games: Game[], month: number, year: number): Game[] {
  return games.filter((g) => {
    const d = new Date(g.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });
}

export function searchTeamsAndPlayers(
  query: string,
  lang: Language
): { type: "team" | "player"; id: string; label: string; href: string }[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const teamResults = teams
    .filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.nameMn.toLowerCase().includes(q) ||
        t.city.toLowerCase().includes(q) ||
        t.abbreviation.toLowerCase().includes(q)
    )
    .map((t) => ({
      type: "team" as const,
      id: t.id,
      label: lang === "mn" ? t.nameMn : t.name,
      href: `/teams/${t.slug}`,
    }));

  const playerResults = players
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.nameMn.toLowerCase().includes(q)
    )
    .map((p) => {
      const team = getTeamById(p.teamId);
      return {
        type: "player" as const,
        id: p.id,
        label: lang === "mn" ? p.nameMn : p.name,
        href: `/players/${p.id}`,
      };
    });

  return [...teamResults, ...playerResults].slice(0, 8);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

export function getMonthOptions(games: Game[]): { value: string; label: string }[] {
  const months = new Set<string>();
  games.forEach((g) => {
    const d = new Date(g.date);
    months.add(`${d.getFullYear()}-${d.getMonth()}`);
  });
  return Array.from(months)
    .sort()
    .map((m) => {
      const [year, month] = m.split("-").map(Number);
      const date = new Date(year, month, 1);
      return {
        value: m,
        label: date.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      };
    });
}
