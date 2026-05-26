"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

interface SectionHeaderProps {
  titleKey: keyof typeof import("@/lib/i18n").translations;
  href?: string;
}

export default function SectionHeader({ titleKey, href }: SectionHeaderProps) {
  const { lang } = useLanguage();

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-2 sm:mb-6">
      <h2 className="font-display text-xl font-bold uppercase tracking-wide text-mba-text sm:text-2xl">
        {t(titleKey, lang)}
      </h2>
      {href && (
        <Link
          href={href}
          className="shrink-0 text-sm font-semibold text-mba-red transition-colors hover:text-mba-gold"
        >
          {t("viewAll", lang)} →
        </Link>
      )}
    </div>
  );
}
