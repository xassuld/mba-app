"use client";

import Link from "next/link";
import type { Language, PlayerBoxScore } from "@/lib/types";
import { getPlayerById } from "@/data/players";
import {
  aggregateBoxScores,
  shootingPct,
  type BoxScoreColumn,
} from "@/lib/boxScore";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const STAT_COLS: BoxScoreColumn[] = [
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
];

const COL_LABEL: Record<BoxScoreColumn, keyof typeof import("@/lib/i18n").translations> = {
  min: "min",
  fgm: "fgm",
  fga: "fga",
  fgPct: "fgPct",
  tpm: "tpm",
  tpa: "tpa",
  tpPct: "tpPct",
  ftm: "ftm",
  fta: "fta",
  ftPct: "ftPct",
  oreb: "oreb",
  dreb: "dreb",
  reb: "reb",
  ast: "ast",
  stl: "stl",
  blk: "blk",
  to: "to",
  pf: "pf",
  pts: "pts",
  plusMinus: "plusMinus",
};

const LINKABLE = new Set<BoxScoreColumn>([
  "fgm",
  "fga",
  "tpm",
  "tpa",
  "ftm",
  "fta",
  "oreb",
  "dreb",
  "reb",
  "ast",
  "stl",
  "blk",
  "to",
]);

interface BoxScoreTableProps {
  teamName: string;
  players: PlayerBoxScore[];
  lang: Language;
}

export default function BoxScoreTable({
  teamName,
  players,
  lang,
}: BoxScoreTableProps) {
  const totals = aggregateBoxScores(players);

  return (
    <section className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-200 px-3 py-3 sm:px-4">
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-neutral-900 sm:text-base">
          {teamName}
        </h3>
        <p className="mt-1 text-xs text-neutral-500">{t("boxScoreHint", lang)}</p>
      </div>

      <div className="space-y-2 p-3 md:hidden">
        {players.map((line) => (
          <MobilePlayerCard key={line.playerId} line={line} lang={lang} />
        ))}
        <MobileTotalsCard totals={totals} lang={lang} />
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[1100px] border-collapse text-[11px]">
          <thead>
            <tr className="bg-neutral-100 text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
              <th className="sticky left-0 z-10 min-w-[180px] bg-neutral-100 px-3 py-2 text-left">
                {t("player", lang)}
              </th>
              {STAT_COLS.map((col) => (
                <th key={col} className="whitespace-nowrap px-2 py-2 text-center">
                  {t(COL_LABEL[col], lang)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {players.map((line) => (
              <PlayerRow key={line.playerId} line={line} lang={lang} />
            ))}
            <TotalsRow totals={totals} lang={lang} />
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PlayerRow({
  line,
  lang,
}: {
  line: PlayerBoxScore;
  lang: Language;
}) {
  const player = getPlayerById(line.playerId);
  if (!player) return null;

  const name = lang === "mn" ? player.nameMn : player.name;
  const pos = lang === "mn" ? player.positionMn : player.position;
  const dnpText =
    line.dnp === "coach"
      ? t("dnpCoach", lang)
      : line.dnp ?? t("dnpCoach", lang);

  if (line.dnp) {
    return (
      <tr className="border-t border-neutral-100">
        <td className="sticky left-0 z-10 bg-white px-3 py-2.5">
          <div className="flex items-center gap-2">
            <PlayerAvatar number={player.number} />
            <div>
              <Link
                href={`/players/${player.id}`}
                onClick={(e) => e.stopPropagation()}
                className="font-semibold text-[#006BB6] hover:underline"
              >
                {name}
              </Link>
              <p className="text-[10px] text-neutral-500">{pos}</p>
            </div>
          </div>
        </td>
        <td
          colSpan={STAT_COLS.length}
          className="px-3 py-2.5 text-neutral-600"
        >
          {dnpText}
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-t border-neutral-100 hover:bg-neutral-50/80">
      <td className="sticky left-0 z-10 bg-white px-3 py-2 group-hover:bg-neutral-50">
        <div className="flex items-center gap-2">
          <PlayerAvatar number={player.number} />
          <div className="min-w-0">
            <Link
              href={`/players/${player.id}`}
              onClick={(e) => e.stopPropagation()}
              className="font-semibold text-[#006BB6] hover:underline"
            >
              {name}
            </Link>
            <p className="text-[10px] text-neutral-500">{pos}</p>
          </div>
        </div>
      </td>
      {STAT_COLS.map((col) => (
        <td key={col} className="whitespace-nowrap px-2 py-2 text-center text-neutral-800">
          <StatCell col={col} line={line} playerId={player.id} />
        </td>
      ))}
    </tr>
  );
}

function StatCell({
  col,
  line,
  playerId,
}: {
  col: BoxScoreColumn;
  line: PlayerBoxScore;
  playerId: string;
}) {
  const value = cellValue(col, line);
  const linkable = LINKABLE.has(col) && value !== "—";

  if (linkable) {
    return (
      <Link
        href={`/players/${playerId}`}
        onClick={(e) => e.stopPropagation()}
        className="font-medium text-[#006BB6] hover:underline"
      >
        {value}
      </Link>
    );
  }

  return <span className={cn(col === "pts" && "font-semibold")}>{value}</span>;
}

function cellValue(col: BoxScoreColumn, line: PlayerBoxScore): string {
  switch (col) {
    case "min":
      return String(line.min ?? 0);
    case "fgm":
      return String(line.fgm ?? 0);
    case "fga":
      return String(line.fga ?? 0);
    case "fgPct":
      return shootingPct(line.fgm ?? 0, line.fga ?? 0);
    case "tpm":
      return String(line.tpm ?? 0);
    case "tpa":
      return String(line.tpa ?? 0);
    case "tpPct":
      return shootingPct(line.tpm ?? 0, line.tpa ?? 0);
    case "ftm":
      return String(line.ftm ?? 0);
    case "fta":
      return String(line.fta ?? 0);
    case "ftPct":
      return shootingPct(line.ftm ?? 0, line.fta ?? 0);
    case "oreb":
      return String(line.oreb ?? 0);
    case "dreb":
      return String(line.dreb ?? 0);
    case "reb":
      return String(line.reb ?? 0);
    case "ast":
      return String(line.ast ?? 0);
    case "stl":
      return String(line.stl ?? 0);
    case "blk":
      return String(line.blk ?? 0);
    case "to":
      return String(line.to ?? 0);
    case "pf":
      return String(line.pf ?? 0);
    case "pts":
      return String(line.pts ?? 0);
    case "plusMinus": {
      const pm = line.plusMinus ?? 0;
      return pm > 0 ? `+${pm}` : String(pm);
    }
    default:
      return "—";
  }
}

function TotalsRow({
  totals,
  lang,
}: {
  totals: ReturnType<typeof aggregateBoxScores>;
  lang: Language;
}) {
  const row: Record<BoxScoreColumn, string> = {
    min: String(totals.min),
    fgm: String(totals.fgm),
    fga: String(totals.fga),
    fgPct: shootingPct(totals.fgm, totals.fga),
    tpm: String(totals.tpm),
    tpa: String(totals.tpa),
    tpPct: shootingPct(totals.tpm, totals.tpa),
    ftm: String(totals.ftm),
    fta: String(totals.fta),
    ftPct: shootingPct(totals.ftm, totals.fta),
    oreb: String(totals.oreb),
    dreb: String(totals.dreb),
    reb: String(totals.reb),
    ast: String(totals.ast),
    stl: String(totals.stl),
    blk: String(totals.blk),
    to: String(totals.to),
    pf: String(totals.pf),
    pts: String(totals.pts),
    plusMinus: "—",
  };

  return (
    <tr className="border-t-2 border-neutral-200 bg-neutral-50 font-semibold">
      <td className="sticky left-0 z-10 bg-neutral-50 px-3 py-2.5 text-xs uppercase tracking-wide text-neutral-500">
        {t("totals", lang)}
      </td>
      {STAT_COLS.map((col) => (
        <td
          key={col}
          className="whitespace-nowrap px-2 py-2.5 text-center text-[#006BB6]"
        >
          {row[col]}
        </td>
      ))}
    </tr>
  );
}

function PlayerAvatar({ number }: { number: number }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-[10px] font-bold text-neutral-600">
      {number}
    </span>
  );
}

function MobilePlayerCard({
  line,
  lang,
}: {
  line: PlayerBoxScore;
  lang: Language;
}) {
  const player = getPlayerById(line.playerId);
  if (!player) return null;

  const name = lang === "mn" ? player.nameMn : player.name;
  const pos = lang === "mn" ? player.positionMn : player.position;

  if (line.dnp) {
    return (
      <div className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <PlayerAvatar number={player.number} />
          <div className="min-w-0">
            <Link
              href={`/players/${player.id}`}
              className="font-semibold text-[#006BB6]"
            >
              {name}
            </Link>
            <p className="text-[10px] text-neutral-500">{pos}</p>
          </div>
        </div>
        <p className="mt-2 text-xs text-neutral-600">
          {line.dnp === "coach" ? t("dnpCoach", lang) : line.dnp}
        </p>
      </div>
    );
  }

  const primary = [
    { label: t("min", lang), value: line.min },
    { label: t("pts", lang), value: line.pts },
    { label: t("reb", lang), value: line.reb },
    { label: t("ast", lang), value: line.ast },
  ];

  const secondary = [
    { label: t("fgm", lang), value: `${line.fgm}/${line.fga}` },
    { label: t("tpm", lang), value: `${line.tpm}/${line.tpa}` },
    { label: t("ftm", lang), value: `${line.ftm}/${line.fta}` },
    { label: t("stl", lang), value: line.stl },
    { label: t("blk", lang), value: line.blk },
    { label: t("to", lang), value: line.to },
    { label: t("pf", lang), value: line.pf },
    {
      label: t("plusMinus", lang),
      value:
        (line.plusMinus ?? 0) > 0
          ? `+${line.plusMinus}`
          : String(line.plusMinus ?? 0),
    },
  ];

  return (
    <div className="rounded-lg border border-neutral-200 px-3 py-2.5">
      <div className="flex items-center gap-2">
        <PlayerAvatar number={player.number} />
        <div className="min-w-0 flex-1">
          <Link
            href={`/players/${player.id}`}
            className="font-semibold text-[#006BB6]"
          >
            {name}
          </Link>
          <p className="text-[10px] text-neutral-500">{pos}</p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {primary.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-[10px] uppercase text-neutral-500">{s.label}</p>
            <p className="text-sm font-bold text-neutral-900">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-4 gap-x-2 gap-y-1 border-t border-neutral-100 pt-2">
        {secondary.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-[9px] uppercase text-neutral-400">{s.label}</p>
            <p className="text-xs font-medium text-neutral-700">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileTotalsCard({
  totals,
  lang,
}: {
  totals: ReturnType<typeof aggregateBoxScores>;
  lang: Language;
}) {
  return (
    <div className="rounded-lg border-2 border-neutral-200 bg-neutral-50 px-3 py-2.5">
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-neutral-500">
        {t("totals", lang)}
      </p>
      <div className="grid grid-cols-4 gap-2 text-center">
        {[
          { label: t("pts", lang), value: totals.pts },
          { label: t("reb", lang), value: totals.reb },
          { label: t("ast", lang), value: totals.ast },
          {
            label: t("fgm", lang),
            value: `${totals.fgm}/${totals.fga}`,
          },
        ].map((s) => (
          <div key={s.label}>
            <p className="text-[10px] uppercase text-neutral-500">{s.label}</p>
            <p className="text-sm font-bold text-[#006BB6]">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
