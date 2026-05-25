"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Player } from "@/lib/types";
import type { PlayerSeasonStats } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { getTeamById } from "@/lib/utils";
import { t } from "@/lib/i18n";

interface PlayerCardProps {
  player: Player;
  stats?: PlayerSeasonStats;
  featured?: boolean;
}

export default function PlayerCard({
  player,
  stats,
  featured = false,
}: PlayerCardProps) {
  const { lang } = useLanguage();
  const team = getTeamById(player.teamId);

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-2xl border border-mba-border bg-gradient-to-br from-mba-red/20 via-mba-surface to-mba-gold/10 p-6"
      >
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-mba-red/10 blur-3xl" />
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-mba-gold">
          {t("topPerformer", lang)}
        </p>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div
            className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl border-2 border-mba-red/30 bg-mba-surface font-display text-4xl font-bold text-mba-red"
            style={{ backgroundColor: team?.primaryColor + "44" }}
          >
            #{player.number}
          </div>
          <div className="flex-1">
            <Link
              href={`/players/${player.id}`}
              className="font-display text-2xl font-bold text-white hover:text-mba-red transition-colors"
            >
              {lang === "mn" ? player.nameMn : player.name}
            </Link>
            <p className="mt-1 text-mba-muted">
              {lang === "mn" ? team?.nameMn : team?.name} &middot;{" "}
              {lang === "mn" ? player.positionMn : player.position}
            </p>
            {stats && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-2xl font-bold text-white">{stats.ppg}</p>
                  <p className="text-xs text-mba-muted">{t("ppg", lang)}</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.rpg}</p>
                  <p className="text-xs text-mba-muted">{t("rpg", lang)}</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.apg}</p>
                  <p className="text-xs text-mba-muted">{t("apg", lang)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <Link
      href={`/players/${player.id}`}
      className="flex items-center gap-3 rounded-lg border border-mba-border bg-mba-surface px-4 py-3 transition-colors hover:border-mba-red/40"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-mba-red/20 font-bold text-mba-red">
        {player.number}
      </span>
      <div>
        <p className="font-medium text-white">
          {lang === "mn" ? player.nameMn : player.name}
        </p>
        <p className="text-xs text-mba-muted">
          {lang === "mn" ? player.positionMn : player.position}
        </p>
      </div>
    </Link>
  );
}
