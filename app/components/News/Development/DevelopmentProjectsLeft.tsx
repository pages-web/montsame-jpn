"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import queries from "@/app/graphql/cms/queries";
import { useLang } from "../../Header/LangContext";
import { useTranslate, formatDateLang } from "../../Header/useTranslate";

function MainPost({ post, lang }: { post: any; lang: any }) {
  const { title, isLoading } = useTranslate({
    title: post.title || '',
    lang,
  });

  return (
    <Link href={`/article/${post.slug || post._id}`} className="group block p-3 hover:bg-gray-50 transition-colors">
      <div className="relative w-full h-[150px] overflow-hidden mb-2 bg-[#0C4DA2]/10 flex items-center justify-center">
        {post.thumbnail?.url ? (
          <Image
            src={`https://montsame.next.erxes.io/gateway/read-file?key=${post.thumbnail.url}`}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <Image src="/images/Montsamelogo.png" alt="MONTSAME" width={80} height={80} className="object-contain opacity-60" />
        )}
      </div>
      <p
        className={`group-hover:text-[#0C4DA2] transition-colors line-clamp-4 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
        style={{ fontFamily: '"PT Serif", serif', fontSize: "16px", fontWeight: 700, lineHeight: "110%", color: "#000" }}
      >
        {title}
      </p>
      <span className="text-[#0C4DA2] text-[11px] mt-1 block">
        {formatDateLang(post.createdAt, lang)}
      </span>
    </Link>
  );
}

function SubPost({ post, lang }: { post: any; lang: any }) {
  const { title, isLoading } = useTranslate({
    title: post.title || '',
    lang,
  });

  return (
    <Link href={`/article/${post.slug || post._id}`} className="group block p-3 hover:bg-gray-50 transition-colors flex-1">
      <p
        className={`group-hover:text-[#0C4DA2] transition-colors line-clamp-4 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
        style={{ fontFamily: '"PT Serif", serif', fontSize: "16px", fontWeight: 400, lineHeight: "110%", color: "#000" }}
      >
        {title}
      </p>
      <span className="text-[#0C4DA2] text-[11px] mt-1 block">
        {formatDateLang(post.createdAt, lang)}
      </span>
    </Link>
  );
}

export default function DevelopmentProjectsLeft() {
  const { lang } = useLang();

  const { data, loading, error } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: ["i1z9g2ChZ0FUdTqv_KVfj"],
      sortField: "createdAt",
      sortDirection: "DESC",
      status: "published",
      limit: 4,
    },
  });

  if (loading) return (
    <>
      <div className="h-40 animate-pulse bg-gray-100" />
      <div className="h-40 animate-pulse bg-gray-100" />
    </>
  );
  if (error) return null;

  const posts = (data as any)?.cpPostList?.posts || [];
  const mainPost = posts.find((p: any) => p.thumbnail?.url) || posts[0];
  const subPosts = posts.filter((p: any) => p._id !== mainPost?._id).slice(0, 3);

  if (!mainPost) return null;

  return (
    <>
      <MainPost post={mainPost} lang={lang} />
      <div className="flex flex-col divide-y divide-gray-300">
        {subPosts.map((item: any) => (
          <SubPost key={item._id} post={item} lang={lang} />
        ))}
      </div>
    </>
  );
}