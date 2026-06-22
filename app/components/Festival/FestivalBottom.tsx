'use client';

import Link from 'next/link';
import { useQuery } from '@apollo/client/react';
import queries from '@/app/graphql/cms/queries';
import { useLang } from "../Header/LangContext";
import { useTranslateText } from "../Header/useTranslate";

export default function FestivalBottom() {
  const { lang } = useLang();
  const { translated: justNowLabel } = useTranslateText('Дөнгөж сая', lang);
  const { translated: minutesAgo } = useTranslateText('минутын өмнө', lang);
  const { translated: hoursAgo } = useTranslateText('цагийн өмнө', lang);
  const { translated: daysAgo } = useTranslateText('өдрийн өмнө', lang);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const diff = Date.now() - new Date(dateStr).getTime();
    const m = Math.floor(diff / 60000);
    const h = Math.floor(diff / 3600000);
    const d = Math.floor(h / 24);
    if (m < 1) return justNowLabel;
    if (m < 60) return `${m} ${minutesAgo}`;
    if (h < 24) return `${h} ${hoursAgo}`;
    return `${d} ${daysAgo}`;
  };

  const { data, loading, error } = useQuery(queries.cmsPostList, {
    variables: { categoryIds: ['3GTglbPQ_PPXXk6etcMji'], sortField: 'createdAt', sortDirection: 'DESC', status: 'published', limit: 4 },
  });

  if (loading) return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 mt-8 pt-6 border-t border-gray-300">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="animate-pulse space-y-2 px-4 py-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  );

  if (error) return null;

  const posts = (data as any)?.cpPostList?.posts || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 mt-3 pt-1 pb-1 border-t border-b border-gray-300">
      {posts.slice(0, 4).map((item: any, i: number) => (
        <Link
          key={item._id}
          href={`/article/${item.slug || item._id}`}
          className={`group block px-4 py-2 hover:bg-gray-50 transition-colors ${
            i < 3 ? 'border-r border-gray-300' : ''
          }`}
        >
          <span className="text-[11px] font-bold text-[#0C4DA2] tracking-wide uppercase">
            {item.tags?.[0]?.name || item.categories?.[0]?.name}
          </span>
          <p className="font-serif text-[16px] font-normal leading-[110%] text-black group-hover:text-[#0C4DA2] transition-colors mt-1">
            {item.title}
          </p>
          <p className="text-[11px] text-gray-400 mt-1.5">{formatDate(item.createdAt)}</p>
        </Link>
      ))}
    </div>
  );
}
