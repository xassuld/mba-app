"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Team } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { formatRecord, getInitials, cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

interface TeamCardProps {
  team: Team;
  index?: number;
}

export default function TeamCard({ team, index = 0 }: TeamCardProps) {
  const { lang } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        href={`/teams/${team.slug}`}
        className="group block overflow-hidden rounded-xl border border-mba-border bg-mba-surface transition-all hover:border-mba-red/50 hover:shadow-lg hover:shadow-mba-red/10"
      >
        <div
          className="flex h-24 items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${team.primaryColor}33 0%, #111111 100%)`,
          }}
        >
          <div
            className="on-color flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/20 font-display text-xl font-bold"
            style={{ backgroundColor: team.primaryColor }}
          >
            {getInitials(team.abbreviation)}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-display text-lg font-bold text-white group-hover:text-mba-red transition-colors">
            {lang === "mn" ? team.nameMn : team.name}
          </h3>
          <p className="mt-1 text-sm text-mba-muted">
            {lang === "mn" ? team.cityMn : team.city}
          </p>
          <p className="mt-2 font-semibold text-mba-gold">
            {formatRecord(team.wins, team.losses)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
