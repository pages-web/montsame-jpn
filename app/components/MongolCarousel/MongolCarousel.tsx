'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@apollo/client/react';
import queries from '@/app/graphql/cms/queries';
import { useLang } from '../Header/LangContext';
import { useTranslate, useTranslateText } from '../Header/useTranslate';

const IMG = (url?: string) =>
  url ? `https://montsame.next.erxes.io/gateway/read-file?key=${url}` : '/images/a.png';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(h / 24);
  if (m < 1) return 'Саяхан';
  if (m < 60) return `${m} минутын өмнө`;
  if (h < 24) return `${h} цагийн өмнө`;
  return `${d} өдрийн өмнө`;
};

const VISIBLE = 4;

function CarouselCard({ item, lang }: { item: any; lang: any }) {
  const { title, isLoading } = useTranslate({
    title: item.title || '',
    lang,
  });

  return (
    <Link
      href={`/article/${item.slug || item._id}`}
      className="relative overflow-hidden rounded-sm cursor-pointer group"
      style={{ aspectRatio: '3/4' }}
    >
      <Image
        src={IMG(item.thumbnail?.url)}
        alt={title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h3 className={`font-serif text-[18px] italic font-bold leading-tight text-white ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
          {title}
        </h3>
        <p className="text-white/70 text-[11px] mt-3">
          <span className="font-bold">{item.author?.details?.fullName}</span>{' '}
          {formatDate(item.createdAt)}
        </p>
      </div>
    </Link>
  );
}

export default function MongolCarousel() {
  const [index, setIndex] = useState(0);
  const { lang } = useLang();
  const { translated: sectionTitle } = useTranslateText('Монгол хэмнэл', lang);

  const { data, loading, error } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: ['4M_WVNWKjU1vGVYiBgE8-'],
      sortField: 'createdAt',
      sortDirection: 'DESC',
      status: 'published',
      limit: 12,
    },
  });

  const posts = (data as any)?.cpPostList?.posts || [];
  const totalSlides = Math.ceil(posts.length / VISIBLE);
  const visible = posts.slice(index * VISIBLE, index * VISIBLE + VISIBLE);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(totalSlides - 1, i + 1));

  if (loading) return (
    <section className="w-full bg-[#f5f6f8] py-5">
      <div className="max-w-[1600px] mx-auto">
        <div className="bg-[#1a5fba] rounded-sm px-8 py-6">
          <div className="h-8 w-40 bg-white/20 rounded mb-5 animate-pulse" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-white/10 rounded-sm" style={{ aspectRatio: '3/4' }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  if (error || posts.length === 0) return null;

  return (
    <section className="w-full bg-[#f5f6f8] py-5">
      <div className="max-w-[1200px] mx-auto">
        <div className="bg-gray-100 rounded-sm px-8 py-6 relative">

          {/* Title */}
          <h2 className="text-[#1a5fba] font-serif text-[32px] font-bold leading-normal mb-5">
            {sectionTitle}
          </h2>

          {/* Cards + Arrows */}
          <div className="relative flex items-center gap-3">
            <button
              onClick={prev}
              disabled={index === 0}
              className="absolute -left-12 z-10 w-16 h-16 flex items-center justify-center text-[#1a5fba]/90 hover:text-[#1a5fba] disabled:opacity-20 transition-opacity text-5xl"
            >
              ‹
            </button>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
              {visible.map((item: any) => (
                <CarouselCard key={item._id} item={item} lang={lang} />
              ))}
            </div>

            <button
              onClick={next}
              disabled={index === totalSlides - 1}
              className="absolute -right-12 z-10 w-16 h-16 flex items-center justify-center text-[#1a5fba]/90 hover:text-[#1a5fba] disabled:opacity-20 transition-opacity text-5xl"
            >
              ›
            </button>
          </div>

          {/* Dots */}
          {totalSlides > 1 && (
            <div className="flex justify-center items-center gap-1.5 mt-5">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === index
                      ? 'bg-[#e63329] w-5 h-1.5'
                      : 'bg-gray-400/50 w-3 h-1.5 hover:bg-gray-400/70'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}