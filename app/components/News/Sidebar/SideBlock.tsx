"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import queries from "@/app/graphql/cms/queries";
import { useLang } from "../../Header/LangContext";
import { useTranslateText } from "../../Header/useTranslate";

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

export default function SideBlock() {
  const { lang } = useLang();
  const { translated: detailText } = useTranslateText('Дэлгэрэнгүй', lang);
  const { data, loading, error } = useQuery(queries.cmsPostList, {
    variables: { categoryIds: ["r_rIIw6y725CfCcNpUsNu"], sortField: "createdAt", sortDirection: "DESC", status: "published", limit: 2 },
  });

  if (loading)
    return (
      <div className="mb-5 pb-5 h-[240px] animate-pulse bg-gray-100 rounded border-b border-gray-200" />
    );
  if (error) return null;

  const posts = ((data as any)?.cpPostList?.posts || [])
  if (!posts.length) return null;

  return (
    <>
      {posts.map((item: any) => (
        <div key={item._id} className="mb-5 pb-5 border-b border-gray-200">
          <Link href={`/article/${item.slug || item._id}`} className="group block">
            <span className="text-[#0C4DA2] font-serif text-[20px] font-bold leading-normal mb-3 pb-1 inline-block">
              {item.tags?.[0]?.name || item.categories?.[0]?.name}
            </span>
            {getThumbSrc(item) && (
              <div className="relative h-[180px] overflow-hidden mb-2">
                <Image
                  src={getThumbSrc(item)!}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized={!item.thumbnail?.url}
                />
              </div>
            )}
            <p className="text-sm font-semibold text-gray-900 group-hover:text-[#1a5fba] transition-colors leading-snug mb-2">
              {item.title}
            </p>
            <span className="text-black text-xs font-bold hover:underline flex justify-center">
              {detailText}↗
            </span>
          </Link>
        </div>
      ))}
    </>
  );
}
