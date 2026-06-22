'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@apollo/client/react';
import queries from '@/app/graphql/cms/queries';
import { useLang } from "../Header/LangContext";
import { useTranslateText } from "../Header/useTranslate";

const IMG = (url?: string) =>
  url ? `https://montsame.next.erxes.io/gateway/read-file?key=${url}` : '/images/a.png';

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

export default function FestivalLeft() {
  const { lang } = useLang();
  const { translated: errorText } = useTranslateText('Мэдээ ачааллахад алдаа гарлаа', lang);
  const { data, loading, error } = useQuery(queries.cmsPostList, {
    variables: { categoryIds: ['4Wh0GOlQveCGEg79BgV8s'], sortField: 'createdAt', sortDirection: 'DESC', status: 'published', limit: 2 },
  });

  if (loading) return (
    <div className="space-y-6">
      {[1, 2].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="w-full h-[180px] bg-gray-200 mb-3" />
          <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  );

  if (error) return (
    <p className="text-xs text-red-400">{errorText}</p>
  );

  const posts = (data as any)?.cpPostList?.posts || [];

  return (
    <div className="space-y-2 pr-4">
      {posts.slice(0, 2).map((item: any) => (
        <Link
          key={item._id}
          href={`/article/${item.slug || item._id}`}
          className="group block border-b border-gray-200 last:border-0"
        >
          {/* Категори */}
          <span className="text-[11px] font-bold text-[#0C4DA2] tracking-wide uppercase">
            {item.tags?.[0]?.name || item.categories?.[0]?.name}
          </span>
          {/* Зураг */}
          {item.thumbnail?.url && (
            <div className="relative w-full h-[170px] overflow-hidden">
              <Image
                src={IMG(item.thumbnail?.url)}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>
          )}

          {/* title */}
          <div className="mt-2">
            <h3 className="font-serif text-[15px] font-bold leading-snug text-[#183354] group-hover:text-[#0C4DA2] transition-colors mb-2">
              {item.title}
            </h3>
          </div>

          {/* Огноо */}
          <p className="text-[11px] text-[#0C4DA2]">{formatDate(item.createdAt)}</p>
        </Link>
      ))}
    </div>
  );
}
