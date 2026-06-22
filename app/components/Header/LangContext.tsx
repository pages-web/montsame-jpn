"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export type LangCode = "mn" | "en" | "ru" | "zh" | "ja" | "ko";

export const LANGUAGES = [
  { label: "Монгол", code: "mn" as LangCode },
  { label: "English", code: "en" as LangCode },
  { label: "Русский", code: "ru" as LangCode },
  { label: "中文", code: "zh" as LangCode },
  { label: "日本語", code: "ja" as LangCode },
  { label: "한국어", code: "ko" as LangCode },
];

interface LangContextType {
  lang: LangCode;
  switchLang: (code: LangCode) => void;
}

const LangContext = createContext<LangContextType>({
  lang: "mn",
  switchLang: () => {},
});

export function useLang() {
  return useContext(LangContext);
}

export function LangProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<LangCode>(
    (searchParams.get("lang") as LangCode) || "mn"
  );

  useEffect(() => {
    const paramLang = searchParams.get("lang") as LangCode;
    if (paramLang && paramLang !== lang) {
      setLang(paramLang);
    }
  }, [searchParams]);

const switchLang = (code: LangCode) => {
  setLang(code);
  const params = new URLSearchParams(searchParams.toString());
  params.set("lang", code);
  window.open(`${pathname}?${params.toString()}`, "_blank");
};

  return (
    <LangContext.Provider value={{ lang, switchLang }}>
      {children}
    </LangContext.Provider>
  );
}