"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import queries from "@/app/graphql/cms/queries";
import { useLang } from "../Header/LangContext";
import { useTranslateText } from "../Header/useTranslate";

const IMG = (url: string) =>
  `https://montsame.next.erxes.io/gateway/read-file?key=${url}`;

const getYoutubeId = (url?: string) => {
  if (!url) return null;
  const m = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/);
  return m ? m[1] : null;
};

const getThumbSrc = (post: any): string | null => {
  if (post.thumbnail?.url) return IMG(post.thumbnail.url);
  const ytId = getYoutubeId(post.videoUrl);
  if (ytId) return `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`;
  return null;
};

const SECTIONS = [
  { label: "Ярилцлага",             categoryId: "r_rIIw6y725CfCcNpUsNu",  url: "/news?categoryId=r_rIIw6y725CfCcNpUsNu" },
  { label: "Зочин нийтлэлч",        categoryId: "lOeNq7vb8DZOvlAy0OQxD",  url: "/news?categoryId=lOeNq7vb8DZOvlAy0OQxD" },
  { label: "COP17",                  categoryId: "ukuqbsGroEXgC2witPk8C",  url: "/news?categoryId=ukuqbsGroEXgC2witPk8C" },
  { label: "Дэлхийд Монголын тухай", categoryId: "bZUBBgvPt9ZPdR1voPBYH",  url: "/news?categoryId=bZUBBgvPt9ZPdR1voPBYH" },
  { label: "Үндэсний хөдөлгөөн",    categoryId: "QTa9woTm47--XdCB1OKta",  url: "/news?categoryId=QTa9woTm47--XdCB1OKta" },
];

function useSectionPost(categoryId: string) {
  const { data, loading } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: [categoryId],
      sortField: "createdAt",
      sortDirection: "DESC",
      status: "published",
      limit: 1,
    },
  });
  const post = ((data as any)?.cpPostList?.posts || [])[0] ?? null;
  return { post, loading };
}

function SideSection({ section }: { section: typeof SECTIONS[0] }) {
  const { lang } = useLang();
  const { translated: moreText } = useTranslateText('дэлгэрэнгүй', lang);
  const { translated: noNewsText } = useTranslateText('Мэдээ олдсонгүй', lang);
  const { translated: sectionLabel } = useTranslateText(section.label, lang);
  const { post, loading } = useSectionPost(section.categoryId);
  const thumb = post ? getThumbSrc(post) : null;

  return (
    <div className="pb-5 mb-5 border-b border-gray-300 last:border-0 last:pb-0 last:mb-0">
      <Link
        href={section.url}
        className="hover:underline block mb-2"
        style={{ fontFamily: '"PT Serif", serif', fontSize: '20px', fontWeight: 700, color: '#0C4DA2', lineHeight: '1.25' }}
      >
        {sectionLabel}
      </Link>

      {loading && (
        <div className="animate-pulse space-y-2">
          <div className="w-full aspect-[4/3] bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      )}

      {!loading && post && (
        <Link href={`/article/${post.slug || post._id}`} className="group block">
          {thumb && (
            <div className="relative w-full aspect-[4/3] overflow-hidden mb-2">
              <Image
                src={thumb}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="300px"
                unoptimized={!post.thumbnail?.url}
              />
            </div>
          )}
          <p
            className="group-hover:text-[#0C4DA2] transition-colors line-clamp-4 mb-2"
            style={{ fontFamily: '"PT Serif", serif', fontSize: '15px', fontWeight: 700, color: '#183354', lineHeight: '1.45' }}
          >
            {post.title}
          </p>
          <div className="flex justify-end">
            <span className="text-[13px] text-gray-500 hover:text-[#0C4DA2] transition-colors">
              {moreText} ↗
            </span>
          </div>
        </Link>
      )}

      {!loading && !post && (
        <p className="text-sm text-gray-400">{noNewsText}</p>
      )}
    </div>
  );
}

function useSortedSections() {
  const { data, loading } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: SECTIONS.map((s) => s.categoryId),
      sortField: "createdAt",
      sortDirection: "DESC",
      status: "published",
      limit: 50,
    },
  });

  if (loading || !data) return { sorted: SECTIONS, loading };

  const posts: any[] = (data as any)?.cpPostList?.posts || [];

  const latestByCategory: Record<string, number> = {};
  for (const post of posts) {
    const catIds: string[] = post.categories?.map((c: any) => c._id) || [];
    for (const catId of catIds) {
      const t = new Date(post.createdAt).getTime();
      if (!latestByCategory[catId] || t > latestByCategory[catId]) {
        latestByCategory[catId] = t;
      }
    }
  }

  const sorted = [...SECTIONS].sort((a, b) => {
    const ta = latestByCategory[a.categoryId] ?? 0;
    const tb = latestByCategory[b.categoryId] ?? 0;
    return tb - ta;
  });

  return { sorted, loading: false };
}

export default function RotatingSidebar() {
  const { sorted, loading } = useSortedSections();

  return (
    <aside className="w-full lg:w-[280px] shrink-0 self-start">
      {(loading ? SECTIONS : sorted).map((section) => (
        <SideSection key={`${section.categoryId}-${section.label}`} section={section} />
      ))}
    </aside>
  );
}