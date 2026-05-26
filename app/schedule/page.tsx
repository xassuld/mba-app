"use client";

import { useMemo, useState } from "react";
import PageTransition from "@/components/PageTransition";
import PageTitle from "@/components/PageTitle";
import HorizontalScroll from "@/components/HorizontalScroll";
import GameStatsSheet from "@/components/GameStatsSheet";
import type { Game } from "@/lib/types";
import { games } from "@/data/games";
import { teams } from "@/data/teams";
import { useLanguage } from "@/context/LanguageContext";
import {
  getTeamById,
  getGameScoreDisplay,
  getStatusLabel,
  formatDate,
  filterGamesByTeam,
  filterGamesByMonth,
  getMonthOptions,
  cn,
} from "@/lib/utils";
import { t } from "@/lib/i18n";

export default function SchedulePage() {
  const { lang } = useLanguage();
  const [teamFilter, setTeamFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const months = getMonthOptions(games);

  const filtered = useMemo(() => {
    let result = [...games].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    if (teamFilter) result = filterGamesByTeam(result, teamFilter);
    if (monthFilter) {
      const [year, month] = monthFilter.split("-").map(Number);
      result = filterGamesByMonth(result, month, year);
    }
    return result;
  }, [teamFilter, monthFilter]);

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-12">
        <PageTitle className="mb-6 sm:mb-8">{t("fullSchedule", lang)}</PageTitle>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <select
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            className="w-full rounded-lg border border-mba-border bg-mba-surface px-4 py-2.5 text-sm text-mba-text outline-none focus:border-mba-red sm:w-auto"
          >
            <option value="">{t("allTeams", lang)}</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {lang === "mn" ? team.nameMn : team.name}
              </option>
            ))}
          </select>
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="w-full rounded-lg border border-mba-border bg-mba-surface px-4 py-2.5 text-sm text-mba-text outline-none focus:border-mba-red sm:w-auto"
          >
            <option value="">{t("allMonths", lang)}</option>
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2 md:hidden">
          {filtered.map((game) => {
            const home = getTeamById(game.homeTeamId);
            const away = getTeamById(game.awayTeamId);
            if (!home || !away) return null;
            return (
              <button
                key={game.id}
                type="button"
                onClick={() => {
                  setSelectedGame(game);
                  setSheetOpen(true);
                }}
                className="w-full rounded-xl border border-mba-border bg-mba-surface p-4 text-left active:bg-mba-surfaceHover"
              >
                <div className="mb-2 flex items-center justify-between text-xs text-mba-muted">
                  <span>{formatDate(game.date, lang)}</span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                      game.status === "live" && "bg-mba-red text-on-brand",
                      game.status === "final" && "bg-mba-border text-mba-muted",
                      game.status === "upcoming" && "bg-mba-gold/20 text-mba-gold"
                    )}
                  >
                    {getStatusLabel(game.status, lang)}
                  </span>
                </div>
                <p className="truncate text-sm font-medium text-mba-text">
                  {lang === "mn" ? home.nameMn : home.name}
                </p>
                <p className="text-xs text-mba-muted">{t("vs", lang)}</p>
                <p className="truncate text-sm font-medium text-mba-text">
                  {lang === "mn" ? away.nameMn : away.name}
                </p>
                <p className="mt-2 font-display text-lg font-bold text-mba-text">
                  {getGameScoreDisplay(game, lang)}
                </p>
              </button>
            );
          })}
        </div>

        <HorizontalScroll className="hidden md:block">
        <div className="overflow-x-auto rounded-xl border border-mba-border">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-mba-border bg-mba-surface text-left text-xs uppercase tracking-wider text-mba-muted">
                <th className="px-4 py-3">{t("date", lang)}</th>
                <th className="px-4 py-3">{t("team", lang)} (H)</th>
                <th className="px-4 py-3">{t("vs", lang)}</th>
                <th className="px-4 py-3">{t("team", lang)} (A)</th>
                <th className="px-4 py-3">Score / Time</th>
                <th className="px-4 py-3">{t("status", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((game) => {
                const home = getTeamById(game.homeTeamId);
                const away = getTeamById(game.awayTeamId);
                if (!home || !away) return null;
                return (
                  <tr
                    key={game.id}
                    onClick={() => {
                      setSelectedGame(game);
                      setSheetOpen(true);
                    }}
                    className="cursor-pointer border-b border-mba-border/50 hover:bg-mba-surfaceHover"
                  >
                    <td className="px-4 py-3 text-mba-muted">
                      {formatDate(game.date, lang)}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {lang === "mn" ? home.nameMn : home.name}
                    </td>
                    <td className="px-4 py-3 text-mba-muted">{t("vs", lang)}</td>
                    <td className="px-4 py-3 font-medium">
                      {lang === "mn" ? away.nameMn : away.name}
                    </td>
                    <td className="px-4 py-3 font-bold">
                      {getGameScoreDisplay(game, lang)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-bold uppercase",
                          game.status === "live" && "bg-mba-red text-on-brand",
                          game.status === "final" && "bg-mba-border text-mba-muted",
                          game.status === "upcoming" && "bg-mba-gold/20 text-mba-gold"
                        )}
                      >
                        {getStatusLabel(game.status, lang)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        </HorizontalScroll>

        <GameStatsSheet
          game={selectedGame}
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
        />
      </div>
    </PageTransition>
  );
}
