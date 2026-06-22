"use client";

import DevelopmentProjectsLeft from './DevelopmentProjectsLeft';
import DevelopmentProjectsRight from './DevelopmentProjectsRight';
import { useLang } from "../../Header/LangContext";
import { useTranslateText } from "../../Header/useTranslate";

export default function DevelopmentProjects() {
  const { lang } = useLang();
  const { translated: sectionTitle } = useTranslateText('Хөгжлийн төслүүд', lang);
  const { translated: moreText } = useTranslateText('ДЭЛГЭРЭНГҮЙ', lang);

  return (
    <section className="mb-6">
      <div className="flex items-center gap-4 mb-3">
        <div className="h-px bg-gray-300 flex-1" />
        <h2 className="text-[#0C4DA2] font-serif text-[28px] font-bold leading-[110%] whitespace-nowrap">
          {sectionTitle}
        </h2>
        <div className="h-px bg-gray-300 flex-1" />
      </div>

      <div className="grid grid-cols-4 divide-x divide-gray-300 border-b border-gray-300">
        <DevelopmentProjectsLeft />
        <DevelopmentProjectsRight />
      </div>

      <div className="text-center mt-4">
        <a href="#" className="text-gray-600 text-sm font-medium hover:text-[#0C4DA2] transition-colors">
          {moreText} ↗
        </a>
      </div>
    </section>
  );
}