"use client";

import { useQuery } from "@apollo/client/react";
import queries from "@/app/graphql/cms/queries";
import { useLang } from "../Header/LangContext";
import { useTranslateText } from "../Header/useTranslate";
import RelatedItem from "./RelatedItem";

// Client variant of RelatedNews for use inside client pages (e.g. TusgaiBulan).
// The article route uses the server-rendered RelatedNews instead.
export default function RelatedNewsClient({
  title,
  currentId,
}: {
  title: string;
  currentId: string;
}) {
  const { lang } = useLang();
  const { translated: relatedTitle } = useTranslateText("Холбоотой мэдээ", lang);
  const { translated: moreText } = useTranslateText("дэлгэрэнгүй", lang);

  const { data } = useQuery(queries.cmsPostList, {
    variables: { limit: 30, sortField: "createdAt", sortDirection: "DESC", status: "published" },
    skip: !title,
  });

  const titleWords = title
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length >= 3);

  const score = (p: any) =>
    titleWords.filter((w) =>
      ((p.title || "") + " " + (p.excerpt || "")).toLowerCase().includes(w)
    ).length;

  const posts = ((data as any)?.cpPostList?.posts || [])
    .filter((p: any) => p._id !== currentId && score(p) > 0)
    .sort((a: any, b: any) => score(b) - score(a))
    .slice(0, 3);

  if (!posts.length) return null;

  return (
    <section className="mt-10 pt-6 border-t border-gray-200">
      <h2 className="text-[1.5rem] font-bold text-[#0C4DA2] mb-6">{relatedTitle}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 items-start">
        {posts.map((item: any) => (
          <RelatedItem key={item._id} item={item} />
        ))}
      </div>
      <div className="text-center mt-6">
        <a href="/news" className="text-[13px] font-semibold text-gray-700 hover:text-[#0C4DA2] transition-colors">
          {moreText} ↗
        </a>
      </div>
    </section>
  );
}
