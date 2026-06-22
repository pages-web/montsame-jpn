"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLang } from "./LangContext";
import { useTranslateText } from "./useTranslate";

const POPULAR = ["Монгол", "Улс төр", "Эдийн засаг", "Спорт", "Дэлхийн мэдээ"];

export function SearchIcon({ onClick }: { onClick: () => void }) {
  const { lang } = useLang();
  const { translated: searchAria } = useTranslateText('Хайх', lang);
  return (
    <button
      onClick={onClick}
      className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/15 transition-all cursor-pointer shrink-0"
      aria-label={searchAria}
    >
      <Search size={15} />
    </button>
  );
}

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { lang } = useLang();
  const { translated: closeAria } = useTranslateText('Хаах', lang);
  const { translated: searchTitle } = useTranslateText('Хайлт', lang);
  const { translated: placeholderText } = useTranslateText('Мэдээ, нийтлэл хайх', lang);
  const { translated: searchBtn } = useTranslateText('Хайх', lang);
  const { translated: popularLabel } = useTranslateText('Түгээмэл', lang);
  const { translated: archiveLabel } = useTranslateText('Архив', lang);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setValue("");
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    router.push(`/search?q=${encodeURIComponent(value.trim())}`);
    onClose();
  };

  const handlePopular = (term: string) => {
    router.push(`/search?q=${encodeURIComponent(term)}`);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0a0f28]/75 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative bg-white/97 shadow-[0_32px_80px_rgba(0,0,0,0.25)] animate-slideDown w-full max-w-[860px] rounded-2xl overflow-hidden">
        {/* Shimmer accent bar */}
        <div className="h-[3px] w-full bg-gradient-to-r from-[#0C4DA2] via-[#4a9eff] to-[#0C4DA2] bg-[length:200%_100%] animate-shimmer" />

        <div className="px-12 pt-10 pb-9 relative">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-all hover:rotate-90"
            aria-label={closeAria}
          >
            <X size={16} />
          </button>

          {/* Label */}
          <div className="flex items-center gap-3 mb-5">
            <p className="text-[10px] font-bold tracking-[3px] text-white uppercase">
              {searchTitle}
            </p>
            <div className="h-px w-28 bg-gradient-to-r from-[#0C4DA2] to-transparent" />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-3 bg-slate-100 rounded-full px-5 py-3">
            <Search size={20} className="text-[#0C4DA2] shrink-0" />
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholderText + '...'}
              className="flex-1 font-[family-name:var(--font-playfair)] text-[22px] font-normal tracking-[-0.3px] text-slate-900 placeholder-slate-400 bg-transparent border-none outline-none ring-0 focus:ring-0 focus:outline-none"
            />
            {value && (
              <button
                type="button"
                onClick={() => { setValue(""); inputRef.current?.focus(); }}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all"
              >
                <X size={13} />
              </button>
            )}
            <button
              type="submit"
              disabled={!value.trim()}
              className="px-6 py-2.5 bg-[#0C4DA2] text-white text-[13px] font-semibold rounded-full hover:bg-[#0a3d82] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(12,77,162,0.3)] disabled:opacity-35 disabled:cursor-not-allowed transition-all"
            >
              {searchBtn}
            </button>
          </form>

          {/* Popular */}
          <div className="mt-6 flex items-center gap-2.5 flex-wrap">
            <span className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-[2px] shrink-0">
              <TrendingUp size={12} /> {popularLabel}
            </span>
            {POPULAR.map((term, i) => (
              <button
                key={term}
                onClick={() => handlePopular(term)}
                style={{ animationDelay: `${i * 50}ms` }}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-[#0C4DA2] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(12,77,162,0.2)] rounded-full transition-all animate-tagIn"
              >
                {term}
              </button>
            ))}
            <a
              href="https://montsame.mn"
              target="_blank"
              rel="noopener noreferrer"
              style={{ animationDelay: `${POPULAR.length * 50}ms` }}
              className="px-3.5 py-1.5 text-xs font-medium text-[#0C4DA2] bg-blue-50 hover:bg-[#0C4DA2] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(12,77,162,0.2)] rounded-full transition-all animate-tagIn border border-[#0C4DA2]/20"
            >
              {archiveLabel} ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}