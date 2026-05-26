"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Game } from "@/lib/types";
import GameStatsSheet from "@/components/GameStatsSheet";
import { useLanguage } from "@/context/LanguageContext";
import {
  getTeamById,
  getGameScoreDisplay,
  getStatusLabel,
  formatDate,
  cn,
} from "@/lib/utils";
import { t } from "@/lib/i18n";

interface ScoreBoardProps {
  game: Game;
  featured?: boolean;
}

export default function ScoreBoard({ game, featured = false }: ScoreBoardProps) {
  const { lang } = useLanguage();
  const [sheetOpen, setSheetOpen] = useState(false);
  const home = getTeamById(game.homeTeamId);
  const away = getTeamById(game.awayTeamId);
  if (!home || !away) return null;

  const homeName = lang === "mn" ? home.nameMn : home.name;
  const awayName = lang === "mn" ? away.nameMn : away.name;
  const score = getGameScoreDisplay(game, lang);

  if (featured) {
    return (
      <>
      <motion.button
        type="button"
        onClick={() => setSheetOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full overflow-hidden rounded-2xl border border-mba-border bg-hero-gradient text-left transition-colors hover:border-mba-red/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-mba-red"
      >
        <div className="absolute inset-0 bg-[url('/images/court-pattern.svg')] opacity-5" />
        <div className="relative px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-14">
          <div className="mb-6 flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-mba-gold">
              {t("featuredGame", lang)}
            </span>
            {game.status === "live" && (
              <span className="flex items-center gap-1.5 rounded-full bg-mba-red px-3 py-1 text-xs font-bold text-on-brand">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                {t("liveNow", lang)}
              </span>
            )}
          </div>

          <div className="flex flex-col items-center gap-6 sm:gap-8 md:flex-row md:justify-between">
            <TeamBlock team={home} name={homeName} score={game.homeScore} isLive={game.status === "live"} />
            <div className="order-first text-center md:order-none">
              <p className="font-display text-4xl font-bold text-mba-text sm:text-5xl md:text-6xl">
                {score}
              </p>
              {game.quarter && (
                <p className="mt-2 text-sm font-semibold text-mba-red">
                  {game.quarter}
                </p>
              )}
              <p className="mt-2 text-sm text-mba-muted">
                {formatDate(game.date, lang)} &middot; {game.time}
              </p>
              <p className="text-xs text-mba-muted">
                {lang === "mn" ? game.venueMn : game.venue}
              </p>
            </div>
            <TeamBlock team={away} name={awayName} score={game.awayScore} isLive={game.status === "live"} align="right" />
          </div>
        </div>
      </motion.button>
      <GameStatsSheet
        game={game}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setSheetOpen(true)}
        className="w-full rounded-xl border border-mba-border bg-mba-surface p-4 text-left transition-colors hover:border-mba-red/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-mba-red"
      >
        <div className="mb-2 flex justify-between text-xs text-mba-muted">
          <span>{formatDate(game.date, lang)}</span>
          <span
            className={cn(
              game.status === "live" && "text-mba-red font-bold",
              game.status === "upcoming" && "text-mba-gold"
            )}
          >
            {getStatusLabel(game.status, lang)}
          </span>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <span className="truncate text-left text-sm font-medium sm:text-base">{homeName}</span>
          <span className="font-display text-lg font-bold sm:text-xl">{score}</span>
          <span className="truncate text-right text-sm font-medium sm:text-base">{awayName}</span>
        </div>
      </button>
      <GameStatsSheet
        game={game}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </>
  );
}

function TeamBlock({
  team,
  name,
  score,
  isLive,
  align = "left",
}: {
  team: { abbreviation: string; primaryColor: string };
  name: string;
  score?: number;
  isLive: boolean;
  align?: "left" | "right";
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-1 items-center gap-3 sm:gap-4 md:w-auto",
        align === "right" && "md:flex-row-reverse md:text-right"
      )}
    >
      <div
        className="on-color flex h-14 w-14 shrink-0 items-center justify-center rounded-xl font-display text-lg font-bold shadow-lg sm:h-20 sm:w-20 sm:rounded-2xl sm:text-2xl md:h-24 md:w-24"
        style={{ backgroundColor: team.primaryColor }}
      >
        {team.abbreviation}
      </div>
      <div>
        <p className="truncate font-display text-base font-bold text-mba-text sm:text-xl md:text-2xl">
          {name}
        </p>
        {score !== undefined && (
          <p
            className={cn(
              "font-display text-2xl font-bold sm:text-3xl md:text-4xl",
              isLive ? "text-mba-red" : "text-mba-text"
            )}
          >
            {score}
          </p>
        )}
      </div>
    </div>
  );
}
