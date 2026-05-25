"use client";

import { motion } from "framer-motion";
import type { Game } from "@/lib/types";
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
  const home = getTeamById(game.homeTeamId);
  const away = getTeamById(game.awayTeamId);
  if (!home || !away) return null;

  const homeName = lang === "mn" ? home.nameMn : home.name;
  const awayName = lang === "mn" ? away.nameMn : away.name;
  const score = getGameScoreDisplay(game, lang);

  if (featured) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-mba-border bg-hero-gradient"
      >
        <div className="absolute inset-0 bg-[url('/images/court-pattern.svg')] opacity-5" />
        <div className="relative px-6 py-10 md:px-10 md:py-14">
          <div className="mb-6 flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-mba-gold">
              {t("featuredGame", lang)}
            </span>
            {game.status === "live" && (
              <span className="flex items-center gap-1.5 rounded-full bg-mba-red px-3 py-1 text-xs font-bold text-white">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                {t("liveNow", lang)}
              </span>
            )}
          </div>

          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            <TeamBlock team={home} name={homeName} score={game.homeScore} isLive={game.status === "live"} />
            <div className="text-center">
              <p className="font-display text-5xl font-bold text-white md:text-6xl">
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
      </motion.section>
    );
  }

  return (
    <div className="rounded-xl border border-mba-border bg-mba-surface p-4">
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
      <div className="flex items-center justify-between">
        <span className="font-medium">{homeName}</span>
        <span className="font-display text-xl font-bold">{score}</span>
        <span className="font-medium">{awayName}</span>
      </div>
    </div>
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
        "flex flex-1 items-center gap-4",
        align === "right" && "flex-row-reverse text-right"
      )}
    >
      <div
        className="flex h-20 w-20 items-center justify-center rounded-2xl font-display text-2xl font-bold text-white shadow-lg md:h-24 md:w-24"
        style={{ backgroundColor: team.primaryColor }}
      >
        {team.abbreviation}
      </div>
      <div>
        <p className="font-display text-xl font-bold text-white md:text-2xl">
          {name}
        </p>
        {score !== undefined && (
          <p
            className={cn(
              "font-display text-3xl font-bold md:text-4xl",
              isLive ? "text-mba-red" : "text-white"
            )}
          >
            {score}
          </p>
        )}
      </div>
    </div>
  );
}
