"use client";

import Image from "next/image";
import { useLang } from "../Header/LangContext";
import { useTranslateText } from "../Header/useTranslate";

type NewsCardVariant = "list" | "imageBlock" | "sidebar";

export default function NewsCard({
  title,
  category,
  time,
  image = "/images/a.png",
  variant = "list",
  className = "",
}: {
  title: string;
  category: string;
  time: string;
  image?: string;
  variant?: NewsCardVariant;
  className?: string;
}) {
  const { lang } = useLang();
  const { translated: readMore } = useTranslateText('дэлгэрэнгүй', lang);

  if (variant === "list") {
    return (
      <div className={className}>
        <div className="text-[10px] font-bold uppercase text-[#0C4DA2]">
          {category}
        </div>
        <div className="text-[13px] leading-snug font-medium text-black mt-1">
          {title}
        </div>
        <div className="text-[10px] text-[#0C4DA2] mt-1">{time}</div>
      </div>
    );
  }

  if (variant === "imageBlock") {
    return (
      <div className={className}>
        <Image
          src={image}
          alt={title}
          width={700}
          height={500}
          className="w-full h-[150px] object-cover"
        />
        <div className="text-[11px] font-bold uppercase text-black mt-2">
          {category}:
        </div>
        <div className="text-[13px] leading-snug font-semibold text-black mt-1">
          {title}
        </div>
        <div className="text-[10px] text-[#0C4DA2] mt-1">{time}</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <Image
        src={image}
        alt={title}
        width={700}
        height={500}
        className="w-full h-[220px] object-cover"
      />
      <div className="text-[13px] leading-snug font-semibold text-black mt-2">
        {title}
      </div>
      <a
        href="#"
        className="inline-block mt-2 text-[11px] text-[#0C4DA2] font-semibold hover:underline"
      >
        {readMore} →
      </a>
    </div>
  );
}
