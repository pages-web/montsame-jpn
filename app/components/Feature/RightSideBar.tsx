'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client/react';
import queries from '@/app/graphql/cms/queries';
import Cop17Widget from './Cop17widget';
import { useLang } from '../Header/LangContext';
import { useTranslate, useTranslateText } from '../Header/useTranslate';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(h / 24);
  if (m < 1) return 'Дөнгөж сая';
  if (m < 60) return `${m} минутын өмнө`;
  if (h < 24) return `${h} цагийн өмнө`;
  return `${d} өдрийн өмнө`;
};

function SidebarItem({ item, lang }: { item: any; lang: any }) {
  const { title, tag, isLoading } = useTranslate({
    title: item.title || '',
    tag: item.tags?.[0]?.name || item.categories?.[0]?.name || '',
    lang,
  });

  return (
    <li className="relative pl-3 py-2 group">
      <div className="absolute left-0 top-[5px] w-[11px] h-[11px] rounded-full bg-black z-15" />
      <Link href={`/article/${item.slug || item._id}`} className="block">
        <div className="flex items-baseline gap-2 mb-[5px]">
          <span className="text-[8px] text-black whitespace-nowrap">{formatDate(item.createdAt)}</span>
          <span
            className="text-[10px] font-bold uppercase leading-normal text-[#0C4DA2] truncate"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {tag}
          </span>
        </div>
        <p
          className={`group-hover:text-[#0C4DA2] transition-colors line-clamp-2 ${
            isLoading ? 'opacity-50' : 'opacity-100'
          }`}
          style={{ fontFamily: '"PT Serif", serif', fontSize: '15px', fontWeight: 400, lineHeight: '110%', color: '#183354' }}
        >
          {title}
        </p>
      </Link>
    </li>
  );
}

export default function RightSidebarNews() {
  const [activeTab, setActiveTab] = useState<'new' | 'popular'>('new');
  const { lang } = useLang();

  // Tab үгсийг орчуулна
  const { translated: tabNew } = useTranslateText('Шинэ мэдээ', lang);
  const { translated: tabPopular } = useTranslateText('Их уншсан', lang);
  const { translated: moreText } = useTranslateText('дэлгэрэнгүй', lang);

  const { data, loading, error } = useQuery(queries.cmsPostList, {
    variables: {
      sortField: activeTab === 'popular' ? 'viewCount' : 'createdAt',
      sortDirection: 'DESC',
      status: 'published',
      limit: 5,
    },
  });

  const posts = (data as any)?.cpPostList?.posts || [];

  return (
    <div className="flex flex-col">
      {/* Tabs */}
      <div className="flex items-stretch">
        <button
          onClick={() => setActiveTab('new')}
          className={`flex-1 py-3 transition-colors border-b-2 -mb-px ${
            activeTab === 'new'
              ? 'text-[#0C4DA2]'
              : 'text-gray-400 border-transparent hover:text-gray-600'
          }`}
          style={{ fontFamily: '"PT Serif", serif', fontSize: '18px', fontWeight: 700, lineHeight: '30px' }}
        >
          {tabNew}
        </button>
        <span className="w-px bg-gray-200" />
        <button
          onClick={() => setActiveTab('popular')}
          className={`flex-1 py-3 transition-colors border-b-2 -mb-px ${
            activeTab === 'popular'
              ? 'text-[#0C4DA2]'
              : 'text-gray-400 border-transparent hover:text-gray-600'
          }`}
          style={{ fontFamily: '"PT Serif", serif', fontSize: '18px', fontWeight: 700, lineHeight: '30px' }}
        >
          {tabPopular}
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="space-y-3 p-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-full" />
            </div>
          ))}
        </div>
      )}

      {/* Timeline */}
      {!loading && !error && (
        <div className="relative px-2 pt-2">
          <div className="absolute left-[12px] top-4 bottom-6 w-px border border-black" />
          <ul className="divide-y divide-gray-200">
            {posts.map((item: any) => (
              <SidebarItem key={item._id} item={item} lang={lang} />
            ))}
          </ul>
        </div>
      )}

      {/* More link */}
      <div className="px-2 pb-2 pt-1 border-t border-gray-200 mt-1">
        <Link
          href="/news"
          className="text-[13px] font-semibold text-gray-700 hover:text-[#0C4DA2] transition-colors"
        >
          {moreText} ↗
        </Link>
      </div>

      <Cop17Widget />
    </div>
  );
}