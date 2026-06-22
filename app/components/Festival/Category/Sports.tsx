"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import queries from "@/app/graphql/cms/queries";
import { useLang } from "../../Header/LangContext";
import { useTranslate, useTranslateText } from "../../Header/useTranslate";

const IMG = (url?: string) =>
  url ? `https://montsame.next.erxes.io/gateway/read-file?key=${url}` : "/images/a.png";

function SportsMainPost({ post, lang }: { post: any; lang: any }) {
  const { title, isLoading } = useTranslate({
    title: post.title || '',
    lang,
  });

  return (
    <Link href={`/article/${post.slug || post._id}`} className="group block mb-4 border-b border-gray-300 pb-2">
      <div className="relative w-full h-[250px] overflow-hidden">
        <Image
          src={IMG(post.thumbnail?.url)}
          alt={title}
          sizes="(max-width: 768px) 100vw, 400px"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <p className={`mt-2 font-serif text-base font-bold leading-[110%] text-black group-hover:text-[#0C4DA2] transition-colors line-clamp-3 min-h-[53px] ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        {title}
      </p>
    </Link>
  );
}

function SportsSubPost({ post, lang }: { post: any; lang: any }) {
  const { title, excerpt, isLoading } = useTranslate({
    title: post.title || '',
    excerpt: post.excerpt || '',
    lang,
  });

  return (
    <Link href={`/article/${post.slug || post._id}`} className="group flex gap-3 mb-2 border-b border-gray-300 pb-2">
      <p className={`font-serif text-sm font-normal leading-[110%] text-black group-hover:text-[#0C4DA2] transition-colors line-clamp-3 min-h-[44px] ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        {excerpt || title}
      </p>
      <div className="relative w-20 h-20 shrink-0 overflow-hidden">
        <Image
          src={IMG(post.thumbnail?.url)}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="80px"
        />
      </div>
    </Link>
  );
}

export default function Sports() {
  const { lang } = useLang();

  const { translated: headerTitle } = useTranslateText('Спорт', lang);
  const { translated: moreText } = useTranslateText('дэлгэрэнгүй', lang);

  const { data, loading, error } = useQuery(queries.cmsPostList, {
    variables: { categoryIds: ["Ayw0kqgMpAWf20QG1UXwV", "Krsn1buBSTzKIQropcEI_", "LLFATN7sPfi95q_qxCTUQ"], sortField: "createdAt", sortDirection: "DESC", status: "published", limit: 3 },
  });

  if (loading) return (
    <div className="animate-pulse space-y-4">
      <div className="h-5 bg-gray-200 rounded w-1/3 mb-4" />
      <div className="w-full h-[250px] bg-gray-200 rounded" />
      <div className="flex gap-3"><div className="w-20 h-20 bg-gray-200 rounded shrink-0" /><div className="flex-1 space-y-2"><div className="h-3 bg-gray-200 rounded" /><div className="h-3 bg-gray-200 rounded w-3/4" /></div></div>
      <div className="flex gap-3"><div className="w-20 h-20 bg-gray-200 rounded shrink-0" /><div className="flex-1 space-y-2"><div className="h-3 bg-gray-200 rounded" /><div className="h-3 bg-gray-200 rounded w-3/4" /></div></div>
    </div>
  );

  if (error) return null;

  const posts = (data as any)?.cpPostList?.posts || [];
  if (posts.length === 0) return null;

  return (
    <div>
      <Link href="/news?categoryId=LLFATN7sPfi95q_qxCTUQ" className="text-[#0C4DA2] font-bold text-lg mb-4 hover:underline block">
        {headerTitle}
      </Link>

      <SportsMainPost post={posts[0]} lang={lang} />

      {posts.slice(1, 3).map((post: any) => (
        <SportsSubPost key={post._id} post={post} lang={lang} />
      ))}

      <Link href="/news?categoryId=LLFATN7sPfi95q_qxCTUQ" className="mt-3 text-sm text-gray-800 font-semibold hover:text-[#0C4DA2] transition-colors after:content-['_↗']">
        {moreText}
      </Link>
    </div>
  );
}
