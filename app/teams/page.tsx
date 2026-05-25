"use client";

import PageTransition from "@/components/PageTransition";
import TeamCard from "@/components/TeamCard";
import { teams } from "@/data/teams";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

export default function TeamsPage() {
  const { lang } = useLanguage();

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-12">
        <h1 className="mb-8 font-display text-3xl font-bold uppercase tracking-wide text-white">
          {t("allTeamsTitle", lang)}
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teams.map((team, i) => (
            <TeamCard key={team.id} team={team} index={i} />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
