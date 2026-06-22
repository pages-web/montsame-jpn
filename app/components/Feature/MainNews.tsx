'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@apollo/client/react';
import queries from '@/app/graphql/cms/queries';
import { useLang, LANGUAGES } from "../Header/LangContext";
import { useTranslate, useTranslateText } from "../Header/useTranslate";

const IMG = (url?: string) =>
  url ? `https://montsame.next.erxes.io/gateway/read-file?key=${url}` : '/images/a.png';

export default function MainNews() {
  const { lang } = useLang();
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

  const { data, loading, error } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: ['rwXFEoh4AgwY01lDNSaGG'],
      sortField: 'createdAt',
      sortDirection: 'DESC',
      status: 'published',
      limit: 1,
    },
  });

  const post = (data as any)?.cpPostList?.posts?.[0];

  const {
    title,
    excerpt,
    isLoading: translating,
  } = useTranslate({
    title: post?.title || '',
    excerpt: post?.tags?.[0]?.name || post?.categories?.[0]?.name || '',
    lang,
  });

  if (loading) return (
    <div className="animate-pulse space-y-4">
      <div className="h-3 bg-gray-200 rounded w-1/4" />
      <div className="h-8 bg-gray-200 rounded w-full" />
      <div className="h-8 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/5" />
      <div className="w-full h-[380px] bg-gray-200 rounded" />
    </div>
  );

  if (error || !post) return null;

  return (
    <Link href={`/article/${post.slug}`} className="group block">
      <span
        className="block text-[10px] font-bold uppercase leading-normal text-[#0C4DA2]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {/* category/tag нэр орчуулагдсан */}
        {excerpt}
      </span>

      <h1
        className={`font-serif font-bold leading-[115%] text-[#183354] group-hover:text-[#0C4DA2] transition-colors mb-2 max-w-full lg:max-w-[450px] line-clamp-4 ${
          translating ? 'opacity-50' : 'opacity-100'
        }`}
        style={{ fontSize: '28px' }}
      >
        {/* гарчиг орчуулагдсан */}
        {title}
      </h1>

      <span className="text-[11px] text-gray-400 block mb-2">
        {formatDate(post.createdAt)}
      </span>

      <div className="relative w-full overflow-hidden rounded" style={{ aspectRatio: '16/10' }}>
        <Image
          src={IMG(post.thumbnail?.url)}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 600px"
          priority
        />
      </div>
    </Link>
  );
}