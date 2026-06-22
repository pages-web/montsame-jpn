'use client';

import Link from 'next/link';
import { useQuery } from '@apollo/client/react';
import queries from '@/app/graphql/cms/queries';
import { useLang } from "../Header/LangContext";
import { useTranslate, useTranslateText, formatDateLang } from "../Header/useTranslate";

const COLS = 3;

function EditorialItem({ item, isLastCol, isLastRow, lang }: {
  item: any;
  isLastCol: boolean;
  isLastRow: boolean;
  lang: any;
}) {
  const { title, tag, isLoading } = useTranslate({
    title: item.title || '',
    tag: item.tags?.[0]?.name || item.categories?.[0]?.name || '',
    lang,
  });

  return (
    <Link
      href={`/article/${item.slug || item._id}`}
      className={`group block px-2 py-2 hover:bg-gray-50 transition-colors
        ${!isLastCol ? 'border-r border-gray-300' : ''}
        ${!isLastRow ? 'border-b border-gray-300' : ''}
      `}
    >
      <span
        className="text-[#0C4DA2] text-[10px] font-bold uppercase tracking-wide block truncate"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {tag}
      </span>
      <p className={`font-serif text-[16px] font-normal leading-[120%] text-[#183354] group-hover:text-[#0C4DA2] transition-colors line-clamp-2 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        {title}
      </p>
      <span className="text-[#0C4DA2] text-[11px]">{formatDateLang(item.createdAt, lang)}</span>
    </Link>
  );
}

export default function EditorialPicks() {
  const { lang } = useLang();
  const { translated: titleText } = useTranslateText('Редакцын сонголт', lang);

  const { data, loading, error } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: ['KmGPlSgs2usZXJW-GbROu'],
      sortField: 'createdAt',
      sortDirection: 'DESC',
      status: 'published',
      limit: 6,
    },
  });

  if (loading) return <div className="mb-6 h-40 animate-pulse bg-gray-100 rounded" />;
  if (error) return null;

  const posts = (data as any)?.cpPostList?.posts || [];
  const total = posts.length;

  return (
    <section className="mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-px bg-gray-300 flex-1" />
        <h2 className="text-[#0C4DA2] font-serif text-[28px] font-bold leading-[110%] whitespace-nowrap">
          {titleText}
        </h2>
        <div className="h-px bg-gray-300 flex-1" />
      </div>

      <div className="grid grid-cols-3 border-b border-gray-300">
        {posts.map((item: any, i: number) => (
          <EditorialItem
            key={item._id}
            item={item}
            isLastCol={(i + 1) % COLS === 0}
            isLastRow={i >= total - COLS}
            lang={lang}
          />
        ))}
      </div>
    </section>
  );
}