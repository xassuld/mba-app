"use client";

import PageTransition from "@/components/PageTransition";
import PageTitle from "@/components/PageTitle";
import NewsCard from "@/components/NewsCard";
import { newsArticles } from "@/data/news";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

export default function NewsPage() {
  const { lang } = useLanguage();

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 lg:px-6 lg:py-12">
        <PageTitle className="mb-6 sm:mb-8">{t("allNews", lang)}</PageTitle>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newsArticles.map((article, i) => (
            <NewsCard key={article.id} article={article} index={i} />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
