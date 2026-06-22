"use client";

import FestivalLeft   from "./FestivalLeft";
import FestivalCenter from "./FestivalCenter";
import FestivalRight  from "./FestivalRight";
import FestivalBottom from "./FestivalBottom";
import { useLang } from "../Header/LangContext";
import { useTranslateText } from "../Header/useTranslate";

export default function FestivalSection() {
  const { lang } = useLang();
  return (
    <section className="bg-[#f5f6f8] py-4">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-40">

        {/* Title */}
        <div className="flex items-center mb-2">
          <div className="h-px bg-gray-300 flex-1" />
          <h2 className="text-[#0C4DA2] font-serif text-[28px] font-bold leading-[110%] whitespace-nowrap">
            {useTranslateText('Наадмын өнгө', lang).translated}
          </h2>
          <div className="h-px bg-gray-300 flex-1" />
        </div>

        {/* Top 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-1 xl:gap-0 pb-2 border-b border-gray-300">
          <div className="xl:col-span-3">
            <FestivalLeft />
          </div>
          <div className="xl:col-span-6 border-l border-r border-gray-300 px-2">
            <FestivalCenter />
          </div>
          <div className="xl:col-span-3">
            <FestivalRight />
          </div>
        </div>

        {/* Bottom 4-news row */}
        <FestivalBottom />

      </div>
    </section>
  );
}
