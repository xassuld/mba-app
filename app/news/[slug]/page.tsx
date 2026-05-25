"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { getArticleBySlug } from "@/data/news";
import { newsMn } from "@/data/newsMn";
import { useLanguage } from "@/context/LanguageContext";
import { formatDate } from "@/lib/utils";

export default function NewsArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const { lang } = useLanguage();
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center text-mba-muted">
        Article not found.
      </div>
    );
  }

  const mn = newsMn[article.slug];
  const title =
    lang === "mn" && mn ? mn.title : article.titleEn || article.title;
  const content =
    lang === "mn" && mn ? mn.content : article.contentEn || article.content;
  const category =
    lang === "mn" && mn ? mn.category : article.categoryEn || article.category;

  return (
    <PageTransition>
      <article className="mx-auto max-w-3xl px-4 py-8 lg:px-6 lg:py-12">
        <Link
          href="/news"
          className="mb-6 inline-flex items-center gap-2 text-sm text-mba-muted hover:text-mba-red"
        >
          <ArrowLeft size={16} />
          {lang === "mn" ? "\u0411\u0443\u0446\u0430\u0445" : "Back to News"}
        </Link>
        <span className="rounded-full bg-mba-red px-3 py-1 text-xs font-bold uppercase text-white">
          {category}
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-mba-muted">
          {formatDate(article.date, lang)} &middot; {article.author}
        </p>
        <div className="my-8 h-48 rounded-xl bg-gradient-to-br from-mba-red/30 to-mba-surface" />
        <div className="prose prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-gray-300">{content}</p>
          <p className="mt-6 text-lg leading-relaxed text-gray-300">
            {lang === "mn"
              ? "\u0426\u0430\u0430\u0448 \u0443\u043b\u0438\u0440\u043b\u044b\u043d \u0442\u043e\u0433\u043b\u043e\u043b\u0442\u0443\u0443\u0434, \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a \u0431\u043e\u043b\u043e\u043d MBA-\u0438\u0439\u043d \u0430\u043b\u0431\u0430\u043d \u0434\u0430\u0433\u0430\u0430\u0440\u0430\u0439."
              : "Follow MBA for more season coverage, stats, and exclusive league updates throughout the playoffs."}
          </p>
        </div>
      </article>
    </PageTransition>
  );
}
