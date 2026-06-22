"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import queries from "@/app/graphql/cms/queries";
import ImageSlider from "../ImageSlider";
import { useLang } from "../../Header/LangContext";
import { useTranslate, useTranslateText, formatDateLang } from "../../Header/useTranslate";

const IMG = (url?: string) =>
  url ? `https://montsame.next.erxes.io/gateway/read-file?key=${url}` : "/images/a.png";

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-px bg-gray-200 flex-1" />
      <h2 className="text-[#0C4DA2] font-serif text-3xl font-bold whitespace-nowrap tracking-tight">
        {title}
      </h2>
      <div className="h-px bg-gray-200 flex-1" />
    </div>
  );
}

// ActivePost-ийн орчуулгыг тусдаа component-д хийнэ
// activeIndex өөрчлөгдөх бүрт шинэ орчуулга дуудагдана
function ActivePostInfo({ post, lang }: { post: any; lang: any }) {
  const { title, content, tag, isLoading } = useTranslate({
    title: post.title || '',
    content: post.content || '',
    tag: post.tags?.[0]?.name || post.categories?.[0]?.name || '',
    lang,
  });
  const { translated: detailText } = useTranslateText('Дэлгэрэнгүй', lang);

  return (
    <div className="flex-1 flex flex-col justify-center transition-all duration-500">
      <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#1565c0] mb-3">
        {tag}
      </span>
      <h3
        className={isLoading ? 'opacity-50' : 'opacity-100'}
        style={{ fontFamily: '"PT Serif"', fontSize: '16px', fontWeight: 700, lineHeight: 'normal', textTransform: 'capitalize', color: '#000' }}
        dangerouslySetInnerHTML={{ __html: title || '' }}
      />
      <div
        className={`mb-4 line-clamp-3 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
        style={{ fontFamily: '"PT Serif"', fontSize: '16px', fontWeight: 400, lineHeight: 'normal', color: '#000' }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">{formatDateLang(post.createdAt, lang)}</span>
        <span className="text-gray-200">•</span>
        <Link
          href={`/article/${post.slug || post._id}`}
          className="text-xs font-semibold text-[#1565c0] hover:underline flex items-center gap-0.5"
        >
          {detailText} <span>↗</span>
        </Link>
      </div>
    </div>
  );
}

export default function OntslohZurag() {
  const { lang } = useLang();
  const [activeIndex, setActiveIndex] = useState(0);
  const { translated: titleText } = useTranslateText('Онцлох зураг', lang);

  const { data, loading, error } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: ["XJxdclyvzdLqXK0ZTUSbM"],
      sortField: "createdAt",
      sortDirection: "DESC",
      status: "published",
      limit: 5,
    },
  });

  if (loading) return (
    <section className="max-w-[960px] mx-auto px-4">
      <div className="animate-pulse flex gap-8">
        <div className="w-[500px] h-[280px] bg-gray-200 rounded shrink-0" />
        <div className="flex-1 space-y-3 pt-2">
          <div className="h-3 bg-gray-200 rounded w-1/4" />
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-full" />
        </div>
      </div>
    </section>
  );

  if (error) return null;

  const posts = (data as any)?.cpPostList?.posts || [];
  if (!posts.length) return null;

  const slides = posts.slice(0, 5).map((item: any) => ({
    id:    item._id,
    image: IMG(item.thumbnail?.url),
    alt:   item.title,
  }));

  const activePost = posts[activeIndex] || posts[0];

  return (
    <section className="max-w-[960px] mx-auto px-4">
      <SectionTitle title={titleText} />
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <ImageSlider slides={slides} onIndexChange={setActiveIndex} />
        <ActivePostInfo key={activePost._id} post={activePost} lang={lang} />
      </div>
    </section>
  );
}