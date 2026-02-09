"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/client";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const locale = pathname?.startsWith("/es") ? "es" : "en";
    i18n.changeLanguage(locale);
    document.documentElement.lang = locale;
  }, [pathname]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
