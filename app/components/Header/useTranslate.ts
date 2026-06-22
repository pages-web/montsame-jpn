"use client";

import { useState, useEffect, useRef } from "react";
import { LangCode } from "../Header/LangContext";

function getCacheKey(text: string, targetLang: LangCode): string {
  const shortText = text.slice(0, 80);
  try {
    return `mt_${targetLang}_${btoa(unescape(encodeURIComponent(shortText)))}`;
  } catch {
    return `mt_${targetLang}_${shortText.length}`;
  }
}

async function translateText(text: string, targetLang: LangCode): Promise<string> {
  if (!text.trim()) return text;

  // Cache шалгах
  const cacheKey = getCacheKey(text, targetLang);
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) return cached;
  } catch {}

  try {
    // Next.js route handler дамжуулж Google Translate дуудна
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, target: targetLang }),
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) return text;

    const data = await res.json();
    const translated: string = data.translated || text;

    // Cache-д хадгалах
    try {
      localStorage.setItem(cacheKey, translated);
    } catch {}

    return translated;
  } catch {
    return text;
  }
}

// ── useTranslate hook ─────────────────────────────────────────────
interface TranslateOptions {
  title?: string;
  content?: string;
  excerpt?: string;
  tag?: string;
  lang: LangCode;
}

interface TranslateResult {
  title: string;
  content: string;
  excerpt: string;
  tag: string;
  isLoading: boolean;
  isError: boolean;
}

export function useTranslate({
  title = "",
  content = "",
  excerpt = "",
  tag = "",
  lang,
}: TranslateOptions): TranslateResult {
  const [result, setResult] = useState<TranslateResult>({
    title,
    content,
    excerpt,
    tag,
    isLoading: false,
    isError: false,
  });

  const prevLang = useRef<LangCode>("mn");
  const prevTitle = useRef<string>("");

  useEffect(() => {
    if (lang === "mn") {
      setResult({ title, content, excerpt, tag, isLoading: false, isError: false });
      return;
    }

    if (lang === prevLang.current && title === prevTitle.current) return;
    prevLang.current = lang;
    prevTitle.current = title;

    if (!title && !content && !excerpt && !tag) return;

    setResult((prev) => ({ ...prev, isLoading: true, isError: false }));

    Promise.all([
      translateText(title, lang),
      translateText(content, lang),
      translateText(excerpt, lang),
      translateText(tag, lang),
    ])
      .then(([t, c, e, tg]) => {
        setResult({ title: t, content: c, excerpt: e, tag: tg, isLoading: false, isError: false });
      })
      .catch(() => {
        setResult({ title, content, excerpt, tag, isLoading: false, isError: true });
      });
  }, [lang, title, content, excerpt, tag]);

  return result;
}

// ── useTranslateText hook ─────────────────────────────────────────
export function useTranslateText(text: string, lang: LangCode) {
  const [translated, setTranslated] = useState(text);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (lang === "mn" || !text) {
      setTranslated(text);
      return;
    }
    setIsLoading(true);
    translateText(text, lang).then((t) => {
      setTranslated(t);
      setIsLoading(false);
    });
  }, [text, lang]);

  return { translated, isLoading };
}

// ── formatDate with lang support ─────────────────────────────────
const DATE_LABELS: Record<LangCode, { just: string; min: string; hour: string; day: string }> = {
  mn: { just: "Саяхан",     min: "минутын өмнө",  hour: "цагийн өмнө",  day: "өдрийн өмнө" },
  en: { just: "Just now",   min: "minutes ago",   hour: "hours ago",    day: "days ago"     },
  ru: { just: "Только что", min: "минут назад",   hour: "часов назад",  day: "дней назад"   },
  zh: { just: "刚刚",        min: "分钟前",         hour: "小时前",        day: "天前"          },
  ja: { just: "たった今",    min: "分前",           hour: "時間前",        day: "日前"          },
  ko: { just: "방금",        min: "분 전",          hour: "시간 전",       day: "일 전"         },
};

export function formatDateLang(dateStr: string, lang: LangCode = "mn"): string {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(h / 24);
  const L = DATE_LABELS[lang] || DATE_LABELS.mn;
  if (m < 1) return L.just;
  if (m < 60) return `${m} ${L.min}`;
  if (h < 24) return `${h} ${L.hour}`;
  return `${d} ${L.day}`;
}