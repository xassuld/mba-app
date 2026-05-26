"use client";

import { useState } from "react";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import GameCard from "@/components/GameCard";
import { teams } from "@/data/teams";
import { games } from "@/data/games";
import { getPlayersByTeam } from "@/data/players";
import { getTeamStats } from "@/data/teamStats";
import { useLanguage } from "@/context/LanguageContext";
import {
  getTeamBySlug,
  formatRecord,
  filterGamesByTeam,
  getInitials,
  cn,
} from "@/lib/utils";
import { t } from "@/lib/i18n";

export default function TeamPage({ params }: { params: { slug: string } }) {
  const { lang } = useLanguage();
  const team = getTeamBySlug(params.slug);
  const [tab, setTab] = useState<"roster" | "stats" | "schedule">("roster");

  if (!team) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center text-mba-muted">
        Team not found.
      </div>
    );
  }

  const roster = getPlayersByTeam(team.id);
  const stats = getTeamStats(team.id);
  const teamGames = filterGamesByTeam(games, team.id).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const tabs = [
    { id: "roster" as const, label: t("roster", lang) },
    { id: "stats" as const, label: t("stats", lang) },
    { id: "schedule" as const, label: t("schedule", lang) },
  ];

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-12">
        <div
          className="mb-8 overflow-hidden rounded-2xl border border-mba-border p-8"
          style={{
            background: `linear-gradient(135deg, ${team.primaryColor}44 0%, #111111 60%)`,
          }}
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div
              className="on-color flex h-24 w-24 items-center justify-center rounded-2xl font-display text-3xl font-bold"
              style={{ backgroundColor: team.primaryColor }}
            >
              {getInitials(team.abbreviation)}
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-white">
                {lang === "mn" ? team.nameMn : team.name}
              </h1>
              <p className="mt-1 text-mba-muted">
                {lang === "mn" ? team.cityMn : team.city}
              </p>
              <p className="mt-2 text-xl font-bold text-mba-gold">
                {formatRecord(team.wins, team.losses)}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 flex gap-2 border-b border-mba-border">
          {tabs.map((tb) => (
            <button
              key={tb.id}
              onClick={() => setTab(tb.id)}
              className={cn(
                "px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors",
                tab === tb.id
                  ? "border-b-2 border-mba-red text-mba-red"
                  : "text-mba-muted hover:text-mba-text"
              )}
            >
              {tb.label}
            </button>
          ))}
        </div>

        {tab === "roster" && (
          <div className="overflow-x-auto rounded-xl border border-mba-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-mba-border bg-mba-surface text-left text-xs uppercase text-mba-muted">
                  <th className="px-4 py-3">{t("number", lang)}</th>
                  <th className="px-4 py-3">{t("name", lang)}</th>
                  <th className="px-4 py-3">{t("position", lang)}</th>
                  <th className="px-4 py-3">{t("height", lang)}</th>
                  <th className="px-4 py-3">{t("weight", lang)}</th>
                  <th className="px-4 py-3">{t("nationality", lang)}</th>
                </tr>
              </thead>
              <tbody>
                {roster.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-mba-border/50 hover:bg-mba-surfaceHover"
                  >
                    <td className="px-4 py-3 font-bold text-mba-red">
                      {p.number}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/players/${p.id}`}
                        className="font-medium text-white hover:text-mba-red"
                      >
                        {lang === "mn" ? p.nameMn : p.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      {lang === "mn" ? p.positionMn : p.position}
                    </td>
                    <td className="px-4 py-3">{p.height}</td>
                    <td className="px-4 py-3">{p.weight}</td>
                    <td className="px-4 py-3">
                      {lang === "mn" ? p.nationalityMn : p.nationality}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "stats" && stats && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {[
              { label: t("ppg", lang), value: stats.ppg },
              { label: t("rpg", lang), value: stats.rpg },
              { label: t("apg", lang), value: stats.apg },
              { label: t("fgPct", lang), value: `${(stats.fgPct * 100).toFixed(1)}%` },
              { label: t("threePct", lang), value: `${(stats.threePct * 100).toFixed(1)}%` },
              { label: t("ftPct", lang), value: `${(stats.ftPct * 100).toFixed(1)}%` },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-mba-border bg-mba-surface p-4 text-center"
              >
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="mt-1 text-xs text-mba-muted uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "schedule" && (
          <div className="grid gap-3">
            {teamGames.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
