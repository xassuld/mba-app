"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { NewsArticle } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { formatDate } from "@/lib/utils";
import { t } from "@/lib/i18n";
import { newsMn } from "@/data/newsMn";

interface NewsCardProps {
  article: NewsArticle;
  index?: number;
}

export default function NewsCard({ article, index = 0 }: NewsCardProps) {
  const { lang } = useLanguage();
  const mn = newsMn[article.slug];
  const title =
    lang === "mn" && mn ? mn.title : article.titleEn || article.title;
  const excerpt =
    lang === "mn" && mn ? mn.excerpt : article.excerptEn || article.excerpt;
  const category =
    lang === "mn" && mn ? mn.category : article.categoryEn || article.category;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Link
        href={`/news/${article.slug}`}
        className="group block overflow-hidden rounded-xl border border-mba-border bg-mba-surface transition-all hover:border-mba-red/40 hover:shadow-lg"
      >
        <div className="relative h-44 bg-gradient-to-br from-mba-red/30 to-mba-surface">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-4xl font-bold text-white/10">
              MBA
            </span>
          </div>
          <span className="absolute left-3 top-3 rounded-full bg-mba-red px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">
            {category}
          </span>
        </div>
        <div className="p-4">
          <time className="text-xs text-mba-muted">
            {formatDate(article.date, lang)}
          </time>
          <h3 className="mt-2 font-display text-lg font-bold text-white group-hover:text-mba-red transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="mt-2 text-sm text-mba-muted line-clamp-2">{excerpt}</p>
          <span className="mt-3 inline-block text-sm font-semibold text-mba-gold group-hover:underline">
            {t("readMore", lang)} →
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
