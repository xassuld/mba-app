"use client";

import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import {
  getPlayerById,
  getPlayerStats,
  gameLogs,
} from "@/data/players";
import { useLanguage } from "@/context/LanguageContext";
import { getTeamById, formatDate } from "@/lib/utils";
import { t } from "@/lib/i18n";

export default function PlayerPage({ params }: { params: { id: string } }) {
  const { lang } = useLanguage();
  const player = getPlayerById(params.id);
  const stats = getPlayerStats(params.id);
  const logs = gameLogs[params.id] ?? [];

  if (!player) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center text-mba-muted">
        Player not found.
      </div>
    );
  }

  const team = getTeamById(player.teamId);

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-12">
        <div className="mb-10 grid gap-8 md:grid-cols-[240px_1fr]">
          <div
            className="flex aspect-square items-center justify-center rounded-2xl border border-mba-border bg-gradient-to-br from-mba-red/20 to-mba-surface font-display text-6xl font-bold text-mba-red/40"
            style={{
              backgroundColor: team ? team.primaryColor + "22" : undefined,
            }}
          >
            #{player.number}
          </div>
          <div>
            <h1 className="font-display text-4xl font-bold text-white">
              {lang === "mn" ? player.nameMn : player.name}
            </h1>
            {team && (
              <Link
                href={`/teams/${team.slug}`}
                className="mt-2 inline-block text-mba-gold hover:text-mba-red"
              >
                {lang === "mn" ? team.nameMn : team.name}
              </Link>
            )}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <BioItem label={t("position", lang)} value={lang === "mn" ? player.positionMn : player.position} />
              <BioItem label={t("height", lang)} value={player.height} />
              <BioItem label={t("weight", lang)} value={player.weight} />
              <BioItem label={t("nationality", lang)} value={lang === "mn" ? player.nationalityMn : player.nationality} />
              <BioItem label={t("age", lang)} value={String(player.age)} />
            </div>
          </div>
        </div>

        {stats && (
          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold uppercase text-white">
              {t("seasonStats", lang)}
            </h2>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-10">
              {[
                { l: t("gp", lang), v: stats.gp },
                { l: t("ppg", lang), v: stats.ppg },
                { l: t("rpg", lang), v: stats.rpg },
                { l: t("apg", lang), v: stats.apg },
                { l: t("spg", lang), v: stats.spg },
                { l: t("bpg", lang), v: stats.bpg },
                { l: t("fgPct", lang), v: `${(stats.fgPct * 100).toFixed(1)}%` },
                { l: t("threePct", lang), v: `${(stats.threePct * 100).toFixed(1)}%` },
                { l: t("ftPct", lang), v: `${(stats.ftPct * 100).toFixed(1)}%` },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-lg border border-mba-border bg-mba-surface p-3 text-center"
                >
                  <p className="text-lg font-bold">{s.v}</p>
                  <p className="text-[10px] uppercase text-mba-muted">{s.l}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {logs.length > 0 && (
          <section>
            <h2 className="mb-4 font-display text-xl font-bold uppercase text-white">
              {t("gameLog", lang)}
            </h2>
            <div className="overflow-x-auto rounded-xl border border-mba-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-mba-border bg-mba-surface text-left text-xs uppercase text-mba-muted">
                    <th className="px-4 py-3">{t("date", lang)}</th>
                    <th className="px-4 py-3">{t("opponent", lang)}</th>
                    <th className="px-4 py-3">{t("result", lang)}</th>
                    <th className="px-4 py-3">Score</th>
                    <th className="px-4 py-3">{t("min", lang)}</th>
                    <th className="px-4 py-3">{t("pts", lang)}</th>
                    <th className="px-4 py-3">{t("reb", lang)}</th>
                    <th className="px-4 py-3">{t("ast", lang)}</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr
                      key={log.gameId}
                      className="border-b border-mba-border/50"
                    >
                      <td className="px-4 py-3">{formatDate(log.date, lang)}</td>
                      <td className="px-4 py-3">
                        {lang === "mn" ? log.opponentMn : log.opponent}
                      </td>
                      <td
                        className={`px-4 py-3 font-bold ${log.result === "W" ? "text-green-500" : "text-mba-red"}`}
                      >
                        {log.result}
                      </td>
                      <td className="px-4 py-3">{log.score}</td>
                      <td className="px-4 py-3">{log.min}</td>
                      <td className="px-4 py-3">{log.pts}</td>
                      <td className="px-4 py-3">{log.reb}</td>
                      <td className="px-4 py-3">{log.ast}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  );
}

function BioItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase text-mba-muted">{label}</p>
      <p className="font-semibold text-white">{value}</p>
    </div>
  );
}
