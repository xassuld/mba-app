"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Sun, Moon } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import LeagueLogo from "./LeagueLogo";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { navItems } from "@/lib/i18n";
import { cn, searchTeamsAndPlayers } from "@/lib/utils";
import { t } from "@/lib/i18n";

export default function Navbar() {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    { type: "team" | "player"; id: string; label: string; href: string }[]
  >([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setResults(searchTeamsAndPlayers(query, lang));
  }, [query, lang]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-mba-border bg-mba-surface/95 shadow-sm backdrop-blur-md dark:shadow-none">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3 lg:px-6">
        <LeagueLogo size="nav" link />

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "text-mba-red"
                  : "text-mba-muted hover:text-mba-text"
              )}
            >
              {lang === "mn" ? item.labelMn : item.labelEn}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div ref={searchRef} className="relative hidden md:block">
            <div className="flex items-center rounded-lg border border-mba-border bg-mba-surface px-3 py-1.5">
              <Search size={16} className="text-mba-muted" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                placeholder={t("search", lang)}
                className="w-40 bg-transparent pl-2 text-sm text-mba-text outline-none placeholder:text-mba-muted lg:w-52"
              />
            </div>
            <AnimatePresence>
              {searchOpen && query && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-lg border border-mba-border bg-mba-surface shadow-xl"
                >
                  {results.length === 0 ? (
                    <p className="px-4 py-3 text-sm text-mba-muted">
                      {t("noResults", lang)}
                    </p>
                  ) : (
                    results.map((r) => (
                      <Link
                        key={`${r.type}-${r.id}`}
                        href={r.href}
                        onClick={() => {
                          setQuery("");
                          setSearchOpen(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-mba-surfaceHover"
                      >
                        <span className="rounded bg-mba-border px-1.5 py-0.5 text-[10px] uppercase text-mba-gold">
                          {r.type}
                        </span>
                        {r.label}
                      </Link>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={toggleTheme}
            className="hidden rounded-md border border-mba-border p-2 text-mba-muted transition-colors hover:border-mba-gold hover:text-mba-gold sm:flex"
            aria-label={theme === "dark" ? t("lightMode", lang) : t("darkMode", lang)}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <LanguageToggle className="hidden sm:flex" />

          <button
            className="rounded-md border border-mba-border p-2 text-mba-text lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-mba-border bg-mba-surface lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              <div className="mb-3 flex items-center rounded-lg border border-mba-border bg-mba-bg px-3 py-2">
                <Search size={16} className="text-mba-muted" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("search", lang)}
                  className="flex-1 bg-transparent pl-2 text-sm text-mba-text outline-none"
                />
              </div>
              {query &&
                results.map((r) => (
                  <Link
                    key={`m-${r.type}-${r.id}`}
                    href={r.href}
                    className="block rounded-md px-3 py-2 text-sm hover:bg-mba-surfaceHover"
                  >
                    {r.label}
                  </Link>
                ))}
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block rounded-md px-3 py-2.5 text-sm font-medium",
                    isActive(item.href) ? "text-mba-red" : "text-mba-muted"
                  )}
                >
                  {lang === "mn" ? item.labelMn : item.labelEn}
                </Link>
              ))}
              <div className="flex items-center gap-2 pt-2">
                <LanguageToggle />
                <button
                  onClick={toggleTheme}
                  className="rounded-md border border-mba-border p-2 text-mba-muted"
                  aria-label={theme === "dark" ? t("lightMode", lang) : t("darkMode", lang)}
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
