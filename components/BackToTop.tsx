"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { lang } = useLanguage();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-mba-red px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-mba-red/30 transition-transform hover:scale-105"
          aria-label={t("backToTop", lang)}
        >
          <ChevronUp size={18} />
          <span className="hidden sm:inline">{t("backToTop", lang)}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
