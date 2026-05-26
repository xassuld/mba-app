"use client";

import { useMemo, useState } from "react";
import PageTransition from "@/components/PageTransition";
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
        <h1 className="mb-8 font-display text-3xl font-bold uppercase tracking-wide text-white">
          {t("fullSchedule", lang)}
        </h1>

        <div className="mb-6 flex flex-wrap gap-4">
          <select
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            className="rounded-lg border border-mba-border bg-mba-surface px-4 py-2 text-sm text-white outline-none focus:border-mba-red"
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
            className="rounded-lg border border-mba-border bg-mba-surface px-4 py-2 text-sm text-white outline-none focus:border-mba-red"
          >
            <option value="">{t("allMonths", lang)}</option>
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

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

        <GameStatsSheet
          game={selectedGame}
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
        />
      </div>
    </PageTransition>
  );
}
