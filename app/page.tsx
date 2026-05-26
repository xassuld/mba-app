"use client";

import PageTransition from "@/components/PageTransition";
import LiveGamesCarousel from "@/components/LiveGamesCarousel";
import StandingsTable from "@/components/StandingsTable";
import GameCard from "@/components/GameCard";
import NewsCard from "@/components/NewsCard";
import PlayerCard from "@/components/PlayerCard";
import SectionHeader from "@/components/SectionHeader";
import { standings } from "@/data/standings";
import { getLatestNews } from "@/data/news";
import { getUpcomingGames } from "@/data/games";
import {
  getPlayerById,
  getPlayerStats,
  topPerformerId,
} from "@/data/players";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function HomePage() {
  const { lang } = useLanguage();
  const topStandings = standings.slice(0, 5);
  const upcoming = getUpcomingGames(3);
  const latestNews = getLatestNews(3);
  const topPlayer = getPlayerById(topPerformerId);
  const topStats = getPlayerStats(topPerformerId);

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-10"
        >
          <h1 className="font-display text-3xl font-bold uppercase tracking-wider text-white md:text-4xl">
            {lang === "mn"
              ? "\u041c\u043e\u043d\u0433\u043e\u043b\u044b\u043d \u0411\u0430\u0441\u043a\u0435\u0442\u0431\u043e\u043b\u044b\u043d \u0425\u043e\u043b\u0431\u043e\u043e"
              : "Mongolian Basketball League"}
          </h1>
          <p className="mt-2 text-mba-muted">
            {lang === "mn"
              ? "2024-25 \u0443\u043b\u0438\u0440\u043b\u044b\u043d \u0430\u043b\u0431\u0430\u043d \u043c\u044d\u0434\u044d\u044d\u043b\u043b\u0438\u0439\u043d \u0441\u0430\u0439\u0442"
              : "2024-25 Season Official Portal"}
          </p>
        </motion.div>

        <LiveGamesCarousel />

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <SectionHeader titleKey="leagueStandings" href="/standings" />
              <StandingsTable data={topStandings} compact clickable />
            </section>

            <section>
              <SectionHeader titleKey="upcomingGames" href="/schedule" />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1">
                {upcoming.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-12">
            {topPlayer && (
              <section>
                <PlayerCard
                  player={topPlayer}
                  stats={topStats}
                  featured
                />
              </section>
            )}

            <section>
              <SectionHeader titleKey="latestNews" href="/news" />
              <div className="space-y-4">
                {latestNews.map((article, i) => (
                  <NewsCard key={article.id} article={article} index={i} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
