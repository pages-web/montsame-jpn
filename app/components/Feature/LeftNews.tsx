'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@apollo/client/react';
import queries from '@/app/graphql/cms/queries';
import { useLang } from '../Header/LangContext';
import { useTranslate, useTranslateText } from '../Header/useTranslate';

const IMG = (url?: string) =>
  url ? `https://montsame.next.erxes.io/gateway/read-file?key=${url}` : '/images/a.png';

function LeftNewsItem({ item, lang }: { item: any; lang: any }) {
  const { translated: justNowLabel } = useTranslateText('Саяхан', lang);
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

  const { title, excerpt, tag, isLoading } = useTranslate({
    title: item.title || '',
    excerpt: item.excerpt || '',
    tag: item.tags?.[0]?.name || item.categories?.[0]?.name || '',
    lang,
  });

  return (
    <Link href={`/article/${item.slug || item._id}`} className="group block last:border-0">
      <span
        className="block text-[10px] font-bold uppercase leading-normal text-[#0C4DA2]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {tag}
      </span>
      <div className="relative w-full h-[160px] overflow-hidden mb-1">
        <Image
          src={IMG(item.thumbnail?.url)}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 600px) 78vw, 200px"
        />
      </div>
      <h3
        className={`font-serif text-[15px] font-bold leading-snug text-[#183354] group-hover:text-[#0C4DA2] transition-colors ${
          isLoading ? 'opacity-50' : 'opacity-100'
        }`}
      >
        {excerpt || title}
      </h3>
      <span className="text-[11px] text-[#0C4DA2]">{formatDate(item.createdAt)}</span>
    </Link>
  );
}

export default function LeftNews() {
  const { lang } = useLang();

  const { data, loading, error } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: ['b794oyIAyjfbqbqpzY3aH'],
      sortField: 'createdAt',
      sortDirection: 'DESC',
      status: 'published',
      limit: 2,
    },
  });

  if (loading) return (
    <div className="space-y-8">
      {[1, 2].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="h-3 bg-gray-200 rounded w-1/3 mb-3" />
          <div className="w-full h-[220px] bg-gray-200 rounded mb-3" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-1/4" />
        </div>
      ))}
    </div>
  );

  if (error) return null;

  const posts = (data as any)?.cpPostList?.posts || [];

  return (
    <div className="space-y-4">
      {posts.map((item: any) => (
        <LeftNewsItem key={item._id} item={item} lang={lang} />
      ))}
    </div>
  );
}