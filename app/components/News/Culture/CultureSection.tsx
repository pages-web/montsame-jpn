import CultureSectionLeft  from './CultureSectionLeft';
import CultureSectionRight from './CultureSectionRight';
import { useLang } from "../../Header/LangContext";
import { useTranslateText } from "../../Header/useTranslate";

export default function CultureSection() {
  const { lang } = useLang();
  return (
    <section className="mb-6">
      <div className="flex items-center gap-4 mb-3">
        <div className="h-px bg-gray-300 flex-1" />
        <h2 className="text-[#0C4DA2] font-serif text-[28px] font-bold leading-[110%] whitespace-nowrap">
          {useTranslateText('Өв соёл', lang).translated}
        </h2>
        <div className="h-px bg-gray-300 flex-1" />
      </div>

      <div className="grid grid-cols-4 divide-x divide-gray-300 border-b border-gray-300">
        <CultureSectionLeft />
        <CultureSectionRight />
      </div>

      <div className="text-center mt-4">
        <a href="#" className="text-gray-600 text-sm font-medium hover:text-[#0C4DA2] transition-colors">
          {useTranslateText('ДЭЛГЭРЭНГҮЙ', lang).translated} ↗
        </a>
      </div>
    </section>
  );
}
