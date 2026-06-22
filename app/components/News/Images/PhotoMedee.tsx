'use client';

import { useQuery } from '@apollo/client/react';
import queries from '@/app/graphql/cms/queries';
import PhotoCardItem from '../PhotoCardItem';
import { useLang } from "../../Header/LangContext";
import { useTranslateText } from "../../Header/useTranslate";

const IMG = (url?: string) =>
  url ? `https://montsame.next.erxes.io/gateway/read-file?key=${url}` : '';

export default function PhotoMedee() {
  const { lang } = useLang();
  const { translated: photoTitle } = useTranslateText('Фото мэдээ', lang);
  const { translated: detailText } = useTranslateText('ДЭЛГЭРЭНГҮЙ', lang);
  const { data, loading, error } = useQuery(queries.cmsPostList, {
    variables: { categoryIds: ['dTjHNiFqAZNLjkvhtt8u0'], sortField: 'createdAt', sortDirection: 'DESC', status: 'published', limit: 6 },
  });

  if (loading) return (
    <section className="max-w-[960px] mx-auto px-4">
      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
            <div className="w-full h-[160px] bg-gray-200 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-full" />
          </div>
        ))}
      </div>
    </section>
  );

  if (error) return null;

  const posts = (data as any)?.cpPostList?.posts || [];
  if (!posts.length) return null;

  return (
    <section className="max-w-[960px] mx-auto px-4">
      {/* Title */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px bg-gray-300 flex-1" />
        <h2 className="text-[#0C4DA2] font-serif text-[28px] font-bold leading-[110%] whitespace-nowrap">
          {photoTitle}
        </h2>
        <div className="h-px bg-gray-300 flex-1" />
      </div>

      {/* Grid: 3 колонн, 2 мөр */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
        {posts.slice(0, 6).map((item: any) => (
          <PhotoCardItem
            key={item._id}
            card={{
              id:       item._id,
              slug:     item.slug,
              category: item.tags?.[0]?.name || item.categories?.[0]?.name || '',
              title:    item.title,
              image:    IMG(item.thumbnail?.url),
              excerpt:  item.excerpt || item.title,
              hasImage: !!item.thumbnail?.url,
            }}
          />
        ))}
      </div>

      {/* Дэлгэрэнгүй */}
      <div className="text-center mt-6">
        <a href="/news?categoryId=dTjHNiFqAZNLjkvhtt8u0" className="text-gray-600 text-sm font-medium hover:text-[#0C4DA2] transition-colors tracking-wide">
          {detailText} ↗
        </a>
      </div>
    </section>
  );
}
