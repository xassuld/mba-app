"use client";

import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function HorizontalScroll({
  children,
  className,
  hint = true,
}: {
  children: React.ReactNode;
  className?: string;
  hint?: boolean;
}) {
  const { lang } = useLanguage();

  return (
    <div className={cn("relative", className)}>
      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">{children}</div>
      {hint && (
        <p className="mt-2 text-center text-[10px] text-mba-muted md:hidden">
          {t("scrollForMore", lang)}
        </p>
      )}
    </div>
  );
}
