'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang } from "../Header/LangContext";
import { useTranslate } from "../Header/useTranslate";

interface PhotoCard {
  id: string;
  slug?: string;
  category: string;
  title: string;
  image: string;
  excerpt: string;
  hasImage: boolean;
}

export default function PhotoCardItem({ card }: { card: PhotoCard }) {
  const { lang } = useLang();
  const { title, tag, isLoading } = useTranslate({
    title: card.title || '',
    tag: card.category || '',
    lang,
  });

  return (
    <Link href={`/article/${card.slug || card.id}`} className="group block">
      {/* Category */}
      <span
        className="text-[10px] font-bold uppercase tracking-widest text-[#0C4DA2] block mb-1"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {tag}
      </span>

      {/* Зураг */}
      {card.hasImage && (
        <div className="relative w-full h-[160px] overflow-hidden mb-2">
          <Image
            src={card.image}
            alt={title}
            fill
            className="object-cover group-hover:brightness-90 transition-all duration-300"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Гарчиг */}
      <p
        className={`group-hover:text-[#0C4DA2] transition-colors leading-snug ${isLoading ? 'opacity-50' : 'opacity-100'}`}
        style={{ fontFamily: '"PT Serif", serif', fontSize: '14px', fontWeight: 700, color: '#183354' }}
      >
        {title}
      </p>
    </Link>
  );
}