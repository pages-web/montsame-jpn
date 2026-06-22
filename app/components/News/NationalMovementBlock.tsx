'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@apollo/client/react';
import queries from '@/app/graphql/cms/queries';
import { useLang } from "../Header/LangContext";
import { useTranslateText } from "../Header/useTranslate";

const IMG = (url: string) =>
  `https://montsame.next.erxes.io/gateway/read-file?key=${url}`;

const getYoutubeId = (url?: string) => {
  if (!url) return null;
  const m = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/);
  return m ? m[1] : null;
};

const getThumbSrc = (item: any) => {
  if (item.thumbnail?.url) return IMG(item.thumbnail.url);
  const ytId = getYoutubeId(item.videoUrl);
  if (ytId) return `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`;
  return null;
};

export default function NationalMovementBlock() {
  const { lang } = useLang();
  const { translated: titleText } = useTranslateText('Үндэсний хөдөлгөөн', lang);
  const { translated: detailText } = useTranslateText('Дэлгэрэнгүй', lang);
  const { data, loading, error } = useQuery(queries.cmsPostList, {
    variables: { categoryIds: ['QTa9woTm47--XdCB1OKta'], sortField: 'createdAt', sortDirection: 'DESC', status: 'published', limit: 3 },
  });

  if (loading) return <div className="mb-5 h-[220px] animate-pulse bg-gray-100 rounded" />;
  if (error)   return null;

  const posts = (data as any)?.cpPostList?.posts || [];
  if (!posts.length) return null;

  return (
    <>
      <h3 className="text-[#0C4DA2] font-serif text-[20px] font-bold leading-normal mb-3 pb-1 inline-block">
        {titleText}
      </h3>
      {posts.slice(0, 3).map((item: any) => (
        <div key={item._id} className="mb-5">
          <Link href={`/article/${item.slug || item._id}`} className="group block mt-2">
            {getThumbSrc(item) && (
              <div className="relative h-[180px] overflow-hidden rounded mb-2">
                <Image
                  src={getThumbSrc(item)!}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized={!item.thumbnail?.url}
                />
              </div>
            )}
            <p className="text-sm font-semibold text-gray-900 group-hover:text-[#0C4DA2] transition-colors leading-snug">
              {item.excerpt || item.title}
            </p>
          </Link>
          <div className="mt-5">
            <Link
              href={`/article/${item.slug || item._id}`}
              className="text-sm font-semibold text-[#1565c0] hover:underline underline-offset-4 tracking-wide flex items-center gap-1"
            >
              {detailText} <span>↗</span>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}