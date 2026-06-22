"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import queries from "@/app/graphql/cms/queries";
import { useLang } from "../Header/LangContext";
import { useTranslateText } from "../Header/useTranslate";

const IMG = (url?: string) =>
  url ? `https://montsame.next.erxes.io/gateway/read-file?key=${url}` : "/images/a.png";

export default function FestivalMainArticle() {
  const { lang } = useLang();
  const { translated: justNowLabel } = useTranslateText('Дөнгөж сая', lang);
  const { translated: minutesAgo } = useTranslateText('минутын өмнө', lang);
  const { translated: hoursAgo } = useTranslateText('цагийн өмнө', lang);
  const { translated: daysAgo } = useTranslateText('өдрийн өмнө', lang);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
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
    variables: { categoryIds: ["4w6mrrd6Hm306_8RX0Sn5"], sortField: "createdAt", sortDirection: "DESC", status: "published", limit: 1 },
  });

  if (loading) return (
    <div className="animate-pulse space-y-3">
      <div className="h-3 bg-gray-200 rounded w-1/4" />
      <div className="w-full h-[400px] bg-gray-200 rounded" />
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/5" />
    </div>
  );

  if (error) return null;

  const post = (data as any)?.cpPostList?.posts?.[0];
  if (!post) return null;

  return (
    <Link href={`/article/${post.slug || post._id}`} className="group block">
      <span className="block text-[11px] font-bold text-[#0C4DA2] tracking-wide uppercase mb-1">
        {post.tags?.[0]?.name || post.categories?.[0]?.name}
      </span>
      <div className="relative w-full h-[250px] md:h-[350px] xl:h-[400px] overflow-hidden">
        <Image
          src={IMG(post.thumbnail?.url)}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 900px) 100vw, 900px"
          priority
        />
      </div>
      <div className="mt-1">
        <h1
          className="font-serif font-bold leading-[115%] text-[#183354] group-hover:text-[#0C4DA2] transition-colors mb-4 max-w-full lg:max-w-[450px]"
          style={{ fontSize: "28px" }}
        >
          {post.excerpt || post.title}
        </h1>
      </div>
      <p className="text-[12px] text-[#0C4DA2]">{formatDate(post.createdAt)}</p>
    </Link>
  );
}
