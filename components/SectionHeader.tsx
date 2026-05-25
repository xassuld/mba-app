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
    <div className="mb-6 flex items-center justify-between">
      <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
        {t(titleKey, lang)}
      </h2>
      {href && (
        <Link
          href={href}
          className="text-sm font-semibold text-mba-red hover:text-mba-gold transition-colors"
        >
          {t("viewAll", lang)} →
        </Link>
      )}
    </div>
  );
}
