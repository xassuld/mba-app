"use client";

import PageTransition from "@/components/PageTransition";
import PageTitle from "@/components/PageTitle";
import StandingsTable from "@/components/StandingsTable";
import { standings } from "@/data/standings";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

export default function StandingsPage() {
  const { lang } = useLanguage();

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 lg:px-6 lg:py-12">
        <PageTitle className="mb-6 sm:mb-8">{t("leagueStandings", lang)}</PageTitle>
        <StandingsTable data={standings} clickable />
      </div>
    </PageTransition>
  );
}
