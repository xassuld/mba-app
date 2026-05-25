"use client";

import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { navItems, t } from "@/lib/i18n";

export default function Footer() {
  const { lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-mba-border bg-mba-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-mba-red font-display text-xl font-bold text-white">
                MBA
              </div>
              <div>
                <p className="font-display font-bold text-white">
                  Mongolian Basketball Association
                </p>
                <p className="text-sm text-mba-muted">
                  {lang === "mn"
                    ? "\u041c\u043e\u043d\u0433\u043e\u043b\u044b\u043d \u0411\u0430\u0441\u043a\u0435\u0442\u0431\u043e\u043b\u044b\u043d \u0425\u043e\u043b\u0431\u043e\u043e\u043d\u044b \u041d\u044d\u0432\u0442\u0440\u04e9\u04af"
                    : "Official League Portal"}
                </p>
              </div>
            </div>
            <p className="text-sm text-mba-muted">
              {lang === "mn"
                ? "\u041c\u043e\u043d\u0433\u043e\u043b\u044b\u043d \u0431\u0430\u0441\u043a\u0435\u0442\u0431\u043e\u043b\u044b\u043d \u043b\u0438\u0433\u0438\u0439\u043d \u0430\u043b\u0431\u0430\u043d \u043c\u044d\u0434\u044d\u044d\u043b\u043b\u0438\u0439\u043d \u0441\u0430\u0439\u0442"
                : "Your home for Mongolian professional basketball news, scores, and stats."}
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-mba-gold">
              {t("followUs", lang)}
            </h3>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-mba-border text-mba-muted transition-colors hover:border-mba-red hover:text-mba-red"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-mba-border text-mba-muted transition-colors hover:border-mba-gold hover:text-mba-gold"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-mba-muted transition-colors hover:text-mba-red"
                  >
                    {lang === "mn" ? item.labelMn : item.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-mba-border pt-6 text-center text-sm text-mba-muted">
          &copy; {year} MBA. {t("footerRights", lang)}.
        </div>
      </div>
    </footer>
  );
}
