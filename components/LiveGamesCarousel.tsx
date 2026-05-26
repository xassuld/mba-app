"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Game } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { getOngoingGames } from "@/data/games";
import {
  getTeamById,
  getGameScoreDisplay,
  formatDate,
  cn,
} from "@/lib/utils";
import { t } from "@/lib/i18n";
import GameStatsSheet from "@/components/GameStatsSheet";

export default function LiveGamesCarousel() {
  const { lang } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const ongoing = getOngoingGames();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const openStats = (game: Game) => {
    setSelectedGame(game);
    setSheetOpen(true);
  };

  const closeStats = () => {
    setSheetOpen(false);
  };

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  if (ongoing.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="font-display text-lg font-bold uppercase tracking-wider text-mba-text sm:text-xl">
            {t("ongoingGames", lang)}
          </h2>
          <span className="flex items-center gap-1.5 rounded-full bg-mba-red px-3 py-1 text-xs font-bold text-on-brand">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
            {ongoing.length} {t("liveNow", lang)}
          </span>
        </div>
        {ongoing.length > 1 && (
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Previous game"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-mba-border text-mba-muted transition-colors hover:border-mba-red hover:text-mba-text"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Next game"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-mba-border text-mba-muted transition-colors hover:border-mba-red hover:text-mba-text"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2"
      >
        {ongoing.map((game, i) => (
          <LiveGameSlide
            key={game.id}
            game={game}
            lang={lang}
            index={i}
            onSelect={() => openStats(game)}
          />
        ))}
      </div>

      <p className="mt-2 text-center text-xs text-mba-muted sm:text-left">
        {t("viewStats", lang)}
      </p>

      <GameStatsSheet
        game={selectedGame}
        open={sheetOpen}
        onClose={closeStats}
      />
    </section>
  );
}

function LiveGameSlide({
  game,
  lang,
  index,
  onSelect,
}: {
  game: Game;
  lang: "mn" | "en";
  index: number;
  onSelect: () => void;
}) {
  const home = getTeamById(game.homeTeamId);
  const away = getTeamById(game.awayTeamId);
  if (!home || !away) return null;

  const homeName = lang === "mn" ? home.nameMn : home.name;
  const awayName = lang === "mn" ? away.nameMn : away.name;
  const score = getGameScoreDisplay(game, lang);

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      onClick={onSelect}
      className={cn(
        "w-[min(100%,320px)] shrink-0 snap-center rounded-2xl border border-mba-border bg-hero-gradient p-5 text-left transition-all",
        "hover:border-mba-red/60 hover:shadow-lg hover:shadow-mba-red/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-mba-red"
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="flex items-center gap-1.5 rounded-full bg-mba-red px-2.5 py-0.5 text-[10px] font-bold uppercase text-on-brand">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          {t("liveNow", lang)}
        </span>
        {game.quarter && (
          <span className="text-xs font-semibold text-mba-gold">{game.quarter}</span>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div
              className="on-color flex h-10 w-10 items-center justify-center rounded-lg font-display text-xs font-bold"
              style={{ backgroundColor: home.primaryColor }}
            >
              {home.abbreviation}
            </div>
            <span className="text-sm font-semibold text-white">{homeName}</span>
          </div>
          <span className="font-display text-2xl font-bold text-white">
            {game.homeScore ?? "-"}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div
              className="on-color flex h-10 w-10 items-center justify-center rounded-lg font-display text-xs font-bold"
              style={{ backgroundColor: away.primaryColor }}
            >
              {away.abbreviation}
            </div>
            <span className="text-sm font-semibold text-white">{awayName}</span>
          </div>
          <span className="font-display text-2xl font-bold text-white">
            {game.awayScore ?? "-"}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
        <p className="text-xs text-mba-muted">
          {formatDate(game.date, lang)} &middot; {game.time}
        </p>
        <p className="font-display text-lg font-bold text-mba-gold">{score}</p>
      </div>
    </motion.button>
  );
}
