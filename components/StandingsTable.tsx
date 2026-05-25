"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown } from "lucide-react";
import type { Standing } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { getTeamById, sortStandings, cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

interface StandingsTableProps {
  data: Standing[];
  compact?: boolean;
  clickable?: boolean;
}

type SortKey = keyof Standing;

export default function StandingsTable({
  data,
  compact = false,
  clickable = true,
}: StandingsTableProps) {
  const { lang } = useLanguage();
  const router = useRouter();
  const [sortCol, setSortCol] = useState<SortKey>("rank");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const sorted = sortStandings(data, sortCol, sortDir);

  const handleSort = (col: SortKey) => {
    if (sortCol === col) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortCol(col);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortCol === col ? (
      sortDir === "asc" ? (
        <ChevronUp size={14} />
      ) : (
        <ChevronDown size={14} />
      )
    ) : null;

  return (
    <div className="overflow-x-auto rounded-xl border border-mba-border">
      <table className="w-full min-w-[500px] text-sm">
        <thead>
          <tr className="border-b border-mba-border bg-mba-surface text-left text-xs uppercase tracking-wider text-mba-muted">
            <th className="px-4 py-3">
              <button
                onClick={() => handleSort("rank")}
                className="flex items-center gap-1 hover:text-white"
              >
                {t("rank", lang)} <SortIcon col="rank" />
              </button>
            </th>
            <th className="px-4 py-3">{t("team", lang)}</th>
            <th className="px-4 py-3">
              <button
                onClick={() => handleSort("wins")}
                className="flex items-center gap-1 hover:text-white"
              >
                {t("wins", lang)} <SortIcon col="wins" />
              </button>
            </th>
            <th className="px-4 py-3">
              <button
                onClick={() => handleSort("losses")}
                className="flex items-center gap-1 hover:text-white"
              >
                {t("losses", lang)} <SortIcon col="losses" />
              </button>
            </th>
            <th className="px-4 py-3">
              <button
                onClick={() => handleSort("pct")}
                className="flex items-center gap-1 hover:text-white"
              >
                {t("pct", lang)} <SortIcon col="pct" />
              </button>
            </th>
            {!compact && (
              <>
                <th className="px-4 py-3">{t("gb", lang)}</th>
                <th className="px-4 py-3">{t("homeRecord", lang)}</th>
                <th className="px-4 py-3">{t("awayRecord", lang)}</th>
                <th className="px-4 py-3">{t("last10", lang)}</th>
                <th className="px-4 py-3">{t("streak", lang)}</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => {
            const team = getTeamById(row.teamId);
            if (!team) return null;
            const teamName = lang === "mn" ? team.nameMn : team.name;

            return (
              <tr
                key={row.teamId}
                onClick={
                  clickable
                    ? () => router.push(`/teams/${team.slug}`)
                    : undefined
                }
                className={cn(
                  "border-b border-mba-border/50 transition-colors",
                  clickable &&
                    "cursor-pointer hover:bg-mba-surfaceHover group"
                )}
              >
                <td className="px-4 py-3 font-bold text-mba-gold">
                  {row.rank}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded text-[10px] font-bold text-white"
                      style={{ backgroundColor: team.primaryColor }}
                    >
                      {team.abbreviation}
                    </span>
                    <span className="font-medium text-white group-hover:text-mba-red">
                      {teamName}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">{row.wins}</td>
                <td className="px-4 py-3">{row.losses}</td>
                <td className="px-4 py-3">
                  {(row.pct * 100).toFixed(1)}%
                </td>
                {!compact && (
                  <>
                    <td className="px-4 py-3 text-mba-muted">
                      {row.gb === 0 ? "—" : row.gb}
                    </td>
                    <td className="px-4 py-3 text-mba-muted">{row.home}</td>
                    <td className="px-4 py-3 text-mba-muted">{row.away}</td>
                    <td className="px-4 py-3 text-mba-muted">{row.last10}</td>
                    <td
                      className={cn(
                        "px-4 py-3 font-semibold",
                        row.streak.startsWith("W")
                          ? "text-green-500"
                          : "text-mba-red"
                      )}
                    >
                      {row.streak}
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
