"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Game } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { getGameStats } from "@/data/gameStats";
import {
  getTeamById,
  getGameScoreDisplay,
  formatDate,
  cn,
} from "@/lib/utils";
import { t } from "@/lib/i18n";
import BoxScoreTable from "@/components/BoxScoreTable";

interface GameStatsSheetProps {
  game: Game | null;
  open: boolean;
  onClose: () => void;
}

export default function GameStatsSheet({
  game,
  open,
  onClose,
}: GameStatsSheetProps) {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted || !game) return null;

  const home = getTeamById(game.homeTeamId);
  const away = getTeamById(game.awayTeamId);
  const stats = getGameStats(game.id);
  if (!home || !away) return null;

  const homeName = lang === "mn" ? home.nameMn : home.name;
  const awayName = lang === "mn" ? away.nameMn : away.name;
  const score = getGameScoreDisplay(game, lang);
  const homeBox = stats?.homeBox ?? [];
  const awayBox = stats?.awayBox ?? [];
  const hasBox = homeBox.length > 0 || awayBox.length > 0;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label={t("close", lang)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="game-stats-title"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed inset-x-0 bottom-0 z-[201] flex h-[min(92dvh,920px)] flex-col rounded-t-2xl border border-mba-border bg-mba-bg shadow-2xl"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-mba-border bg-mba-surface px-4 py-3">
              <div className="min-w-0">
                <h2
                  id="game-stats-title"
                  className="font-display text-lg font-bold uppercase tracking-wide text-white"
                >
                  {t("gameStats", lang)}
                </h2>
                <p className="text-xs text-mba-muted">
                  {formatDate(game.date, lang)} &middot; {game.time}
                  {game.quarter && (
                    <span className="ml-2 font-semibold text-mba-red">
                      {game.quarter}
                    </span>
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-mba-border text-mba-muted transition-colors hover:border-mba-red hover:text-mba-text"
              >
                <X size={20} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <div className="border-b border-mba-border bg-mba-surface px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <TeamScoreChip
                    abbr={home.abbreviation}
                    color={home.primaryColor}
                    name={homeName}
                    score={game.homeScore}
                  />
                  <div className="shrink-0 text-center">
                    <p className="font-display text-3xl font-bold text-white">
                      {score}
                    </p>
                    {game.status === "live" && (
                      <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-mba-red px-2 py-0.5 text-[10px] font-bold text-on-brand">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                        {t("liveNow", lang)}
                      </span>
                    )}
                  </div>
                  <TeamScoreChip
                    abbr={away.abbreviation}
                    color={away.primaryColor}
                    name={awayName}
                    score={game.awayScore}
                    align="right"
                  />
                </div>

                {stats && stats.quarters.length > 0 && (
                  <div className="mt-4 overflow-hidden rounded-lg border border-mba-border">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-mba-bg text-mba-muted">
                          <th className="px-3 py-1.5 text-left" />
                          <th className="px-3 py-1.5 text-center">
                            {home.abbreviation}
                          </th>
                          <th className="px-3 py-1.5 text-center">
                            {away.abbreviation}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.quarters.map((q) => (
                          <tr
                            key={q.label}
                            className="border-t border-mba-border/50"
                          >
                            <td className="px-3 py-1.5 font-medium text-white">
                              {q.label}
                            </td>
                            <td className="px-3 py-1.5 text-center text-white">
                              {q.home}
                            </td>
                            <td className="px-3 py-1.5 text-center text-white">
                              {q.away}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="space-y-4 bg-neutral-100 px-3 py-4 pb-6 sm:px-4">
                {hasBox ? (
                  <>
                    {homeBox.length > 0 && (
                      <BoxScoreTable
                        teamName={homeName}
                        players={homeBox}
                        lang={lang}
                      />
                    )}
                    {awayBox.length > 0 && (
                      <BoxScoreTable
                        teamName={awayName}
                        players={awayBox}
                        lang={lang}
                      />
                    )}
                  </>
                ) : (
                  <p className="rounded-lg bg-white px-4 py-8 text-center text-sm text-neutral-600">
                    {lang === "mn"
                      ? "Статистик одоогоор байхгүй байна."
                      : "Stats are not available for this game yet."}
                  </p>
                )}
              </div>

              <p className="bg-neutral-100 px-4 pb-6 text-center text-xs text-neutral-500">
                {lang === "mn" ? game.venueMn : game.venue}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

function TeamScoreChip({
  abbr,
  color,
  name,
  score,
  align = "left",
}: {
  abbr: string;
  color: string;
  name: string;
  score?: number;
  align?: "left" | "right";
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 items-center gap-2",
        align === "right" && "flex-row-reverse text-right"
      )}
    >
      <div
        className="on-color flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-display text-xs font-bold"
        style={{ backgroundColor: color }}
      >
        {abbr}
      </div>
      <div className="min-w-0">
        <p className="truncate text-xs font-semibold text-white">{name}</p>
        {score !== undefined && (
          <p className="font-display text-xl font-bold text-mba-red">{score}</p>
        )}
      </div>
    </div>
  );
}
