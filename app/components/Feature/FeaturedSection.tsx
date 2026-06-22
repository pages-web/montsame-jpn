"use client";

import LeftNews         from "./LeftNews";
import MainNews         from "./MainNews";
import RightSidebarNews from "./RightSideBar";
import { useLang } from "../Header/LangContext";
import { useTranslateText } from "../Header/useTranslate";

export default function FeaturedSection() {
  const { lang } = useLang();
  return (
    <section className="bg-[#f5f6f8] py-6 sm:py-8 lg:py-10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4 lg:items-stretch">

          {/* ── ЗҮҮН + ДУНД (9 col) ── */}
          <div className="lg:col-span-9 order-1 border-b border-gray-300">

            <div className="flex items-center gap-1 mb-6">
              <div className="h-px bg-gray-300 flex-1" />
              <h2 className="text-[#0C4DA2] font-serif text-[28px] font-bold leading-[110%] whitespace-nowrap">
                {useTranslateText('Онцлох мэдээ', lang).translated}
              </h2>
              <div className="h-px bg-gray-300 flex-1" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 lg:gap-6">
              <div className="lg:col-span-4">
                <LeftNews />
              </div>
              <div className="lg:col-span-8 lg:border-l lg:border-gray-300 lg:pl-6">
                <MainNews />
              </div>
            </div>
          </div>

          {/* ── БАРУУН SIDEBAR (3 col) ── */}
          <div className="lg:col-span-3 order-2 lg:border-l lg:border-gray-300 lg:pl-6 flex flex-col">
            <RightSidebarNews />
          </div>

        </div>
      </div>
    </section>
  );
}