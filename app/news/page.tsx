"use client";

import PageTransition from "@/components/PageTransition";
import NewsCard from "@/components/NewsCard";
import { newsArticles } from "@/data/news";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

export default function NewsPage() {
  const { lang } = useLanguage();

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-12">
        <h1 className="mb-8 font-display text-3xl font-bold uppercase tracking-wide text-white">
          {t("allNews", lang)}
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newsArticles.map((article, i) => (
            <NewsCard key={article.id} article={article} index={i} />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
