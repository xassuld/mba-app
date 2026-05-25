"use client";

import PageTransition from "@/components/PageTransition";
import StandingsTable from "@/components/StandingsTable";
import { standings } from "@/data/standings";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

export default function StandingsPage() {
  const { lang } = useLanguage();

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-12">
        <h1 className="mb-8 font-display text-3xl font-bold uppercase tracking-wide text-white">
          {t("leagueStandings", lang)}
        </h1>
        <StandingsTable data={standings} clickable />
      </div>
    </PageTransition>
  );
}
