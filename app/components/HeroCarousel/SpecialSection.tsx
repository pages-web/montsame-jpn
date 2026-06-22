'use client';

import { useQuery } from '@apollo/client/react';
import queries from '@/app/graphql/cms/queries';
import HeroCarousel from './HeroCarousel';
import { useLang } from "../Header/LangContext";
import { useTranslateText } from "../Header/useTranslate";

export default function SpecialSection() {
  const { lang } = useLang();
  const { translated: sectionTitle } = useTranslateText('Тусгай булан', lang);
  const { data, loading } = useQuery(queries.cmsPostList, {
    variables: { categoryIds: ['6A90-ovTPVKNGqrROE1mY'], sortField: 'createdAt', sortDirection: 'DESC', status: 'published', limit: 5 },
  });

  const posts = (data as any)?.cpPostList?.posts || [];

  if (loading) return (
    <section className="w-full bg-white py-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-[420px] bg-gray-200 animate-pulse" />
      </div>
    </section>
  );

  if (!posts.length) return null;

  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px bg-gray-300 flex-1" />
          <h2 className="text-[#0C4DA2] font-serif text-[28px] font-bold leading-[110%] whitespace-nowrap">
            {sectionTitle}
          </h2>
          <div className="h-px bg-gray-300 flex-1" />
        </div>

        <HeroCarousel posts={posts} />
      </div>
    </section>
  );
}
