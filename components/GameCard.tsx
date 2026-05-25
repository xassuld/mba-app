"use client";

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
import { motion } from "framer-motion";

interface GameCardProps {
  game: Game;
  compact?: boolean;
}

export default function GameCard({ game, compact = false }: GameCardProps) {
  const { lang } = useLanguage();
  const home = getTeamById(game.homeTeamId);
  const away = getTeamById(game.awayTeamId);
  if (!home || !away) return null;

  const homeName = lang === "mn" ? home.nameMn : home.name;
  const awayName = lang === "mn" ? away.nameMn : away.name;
  const score = getGameScoreDisplay(game, lang);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={cn(
        "rounded-xl border border-mba-border bg-mba-surface transition-colors hover:border-mba-border/80",
        compact ? "p-3" : "p-4"
      )}
    >
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="text-mba-muted">{formatDate(game.date, lang)}</span>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 font-bold uppercase",
            game.status === "live" && "bg-mba-red text-white animate-pulse",
            game.status === "final" && "bg-mba-border text-mba-muted",
            game.status === "upcoming" && "bg-mba-gold/20 text-mba-gold"
          )}
        >
          {game.status === "live"
            ? t("liveNow", lang)
            : getStatusLabel(game.status, lang)}
        </span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 text-right">
          <p
            className={cn(
              "font-semibold",
              game.status !== "upcoming" &&
                (game.homeScore ?? 0) > (game.awayScore ?? 0)
                ? "text-white"
                : "text-mba-muted"
            )}
          >
            {homeName}
          </p>
        </div>
        <div className="shrink-0 px-2 text-center">
          <p className="font-display text-xl font-bold text-white">{score}</p>
          {game.quarter && (
            <p className="text-[10px] text-mba-red">{game.quarter}</p>
          )}
        </div>
        <div className="flex-1 text-left">
          <p
            className={cn(
              "font-semibold",
              game.status !== "upcoming" &&
                (game.awayScore ?? 0) > (game.homeScore ?? 0)
                ? "text-white"
                : "text-mba-muted"
            )}
          >
            {awayName}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
