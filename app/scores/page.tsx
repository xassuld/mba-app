"use client";

import PageTransition from "@/components/PageTransition";
import PageTitle from "@/components/PageTitle";
import GameCard from "@/components/GameCard";
import ScoreBoard from "@/components/ScoreBoard";
import SectionHeader from "@/components/SectionHeader";
import {
  games,
  getLiveGames,
  getRecentGames,
  getUpcomingGames,
} from "@/data/games";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

export default function ScoresPage() {
  const { lang } = useLanguage();
  const live = getLiveGames();
  const recent = getRecentGames(7);
  const upcoming = getUpcomingGames(7);
  const today = games.filter((g) => {
    const d = new Date(g.date);
    const now = new Date("2025-05-25");
    return (
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  });

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 lg:px-6 lg:py-12">
        <PageTitle className="mb-6 sm:mb-8">{t("scoresTitle", lang)}</PageTitle>

        {live.length > 0 && (
          <section className="mb-12 space-y-4">
            {live.map((g) => (
              <ScoreBoard key={g.id} game={g} featured />
            ))}
          </section>
        )}

        <section className="mb-12">
          <SectionHeader titleKey="todayGames" />
          <div className="grid gap-3 md:grid-cols-2">
            {today.length > 0 ? (
              today.map((g) => <GameCard key={g.id} game={g} />)
            ) : (
              <p className="text-mba-muted">
                {lang === "mn"
                  ? "\u04e8\u043d\u04e9\u04e9\u0434\u0440 \u0442\u043e\u0433\u043b\u043e\u043b\u0442 \u0431\u0430\u0439\u0445\u0433\u04af\u0439 \u0431\u0430\u0439\u043d\u0430"
                  : "No games scheduled for today"}
              </p>
            )}
          </div>
        </section>

        <section className="mb-12">
          <SectionHeader titleKey="recentResults" />
          <div className="grid gap-3 md:grid-cols-2">
            {recent.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader titleKey="upcomingWeek" />
          <div className="grid gap-3 md:grid-cols-2">
            {upcoming.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
