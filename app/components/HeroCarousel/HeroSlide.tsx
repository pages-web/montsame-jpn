'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang } from "../Header/LangContext";
import { useTranslate, useTranslateText } from "../Header/useTranslate";

const IMG = (url?: string) =>
  url ? `https://montsame.next.erxes.io/gateway/read-file?key=${url}` : '/images/a.png';

interface Props {
  item: any;
}

export default function HeroSlide({ item }: Props) {
  const { lang } = useLang();

  // ← Hooks дээд хэсэгт, JSX-с өмнө
  const { translated: moreText } = useTranslateText('дэлгэрэнгүй', lang);
  const { title, excerpt, tag, isLoading } = useTranslate({
    title: item.title || '',
    excerpt: item.excerpt || '',
    tag: item.categories?.[0]?.name || '',
    lang,
  });

  return (
    <Link
      href={`/tusgai-bulan/${item._id}`}
      className="relative block w-full h-[420px] overflow-hidden group"
    >
      <Image
        src={IMG(item.thumbnail?.url)}
        alt={title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="100vw"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />

      <div className="absolute left-12 top-1/2 -translate-y-1/2 text-white max-w-[520px]">
        <h2 className={`text-[38px] font-bold leading-[1.1] font-serif mb-6 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
          {excerpt || title}
        </h2>

        <span className="text-[11px] font-bold uppercase text-[#0C4DA2] block mb-2">
          {tag}
        </span>

        <div className="flex items-center gap-2 text-xs opacity-90 mb-5">
          <div className="w-6 h-6 rounded-full bg-white/40 overflow-hidden">
            <Image
              src={item.author?.details?.avatar ? IMG(item.author.details.avatar) : "/images/a.png"}
              alt="author"
              width={24}
              height={24}
              className="object-cover"
            />
          </div>
          <span>{item.author?.details?.fullName || item.author?.username || 'Монцамэ'}</span>
        </div>

        <span className="text-sm font-semibold underline underline-offset-4 group-hover:text-[#0C4DA2] transition-colors">
          {moreText} →
        </span>
      </div>
    </Link>
  );
}