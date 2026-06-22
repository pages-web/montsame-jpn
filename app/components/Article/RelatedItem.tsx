"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "../Header/LangContext";
import { useTranslate } from "../Header/useTranslate";

const IMG = (url: string) =>
  `https://montsame.next.erxes.io/gateway/read-file?key=${url}`;

const getYoutubeId = (url?: string) => {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/);
  return match ? match[1] : null;
};

export default function RelatedItem({ item }: { item: any }) {
  const { lang } = useLang();
  const ytId = getYoutubeId(item.videoUrl);
  const rawUrl = item.thumbnail?.url || item.images?.[0]?.url;
  const imgSrc = rawUrl
    ? IMG(rawUrl)
    : ytId
    ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`
    : null;

  const { title, tag, isLoading } = useTranslate({
    title: item.title || "",
    tag: item.tags?.[0]?.name || item.categories?.[0]?.name || "",
    lang,
  });

  return (
    <Link
      href={`/article/${item.slug || item._id}`}
      className="group cursor-pointer flex flex-col"
    >
      <span className="text-[10px] font-bold text-[#0C4DA2] tracking-widest uppercase block mb-1.5 truncate min-h-[16px]">
        {tag}
      </span>
      <div className="relative w-full h-[180px] overflow-hidden mb-3 rounded bg-[#0C4DA2]/10 flex-shrink-0">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
            unoptimized={!!ytId && !rawUrl}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Image src="/images/Montsamelogo.png" alt="MONTSAME" width={60} height={60} className="object-contain opacity-60" />
          </div>
        )}
      </div>
      <p className={`text-sm font-bold text-gray-900 group-hover:text-[#0C4DA2] transition-colors leading-snug line-clamp-2 ${isLoading ? "opacity-50" : "opacity-100"}`}>
        {title}
      </p>
    </Link>
  );
}
