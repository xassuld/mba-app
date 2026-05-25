"use client";

import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export default function LanguageToggle({ className }: { className?: string }) {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      className={cn(
        "flex items-center gap-1 rounded-md border border-mba-border px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors hover:border-mba-red hover:text-mba-red",
        className
      )}
      aria-label="Toggle language"
    >
      <span className={lang === "mn" ? "text-mba-red" : "text-mba-muted"}>MN</span>
      <span className="text-mba-border">/</span>
      <span className={lang === "en" ? "text-mba-red" : "text-mba-muted"}>EN</span>
    </button>
  );
}
