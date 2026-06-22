"use client"

import Image from "next/image"
import { useQuery } from "@apollo/client/react"
import queries from "@/app/graphql/cms/queries"
import { useLang } from "../Header/LangContext";
import { useTranslateText } from "../Header/useTranslate";

const IMG = (url?: string) =>
  url ? `https://montsame.next.erxes.io/gateway/read-file?key=${url}` : "/images/sonin.png"

function LargeCard({ item }: { item: any }) {
  const { lang } = useLang();
  const { translated: soonText } = useTranslateText('Тун удахгүй', lang);
  const { translated: readText } = useTranslateText('Унших', lang);
  const isComingSoon = item.excerpt === 'Тун удахгүй';

  return (
    <div className="flex flex-col rounded overflow-hidden h-full">
      <div className="px-3 py-2 bg-white">
        <h3 className="font-serif text-[14px] font-bold leading-snug text-black line-clamp-2 min-h-[40px]">
          {item.title}
        </h3>
      </div>
      <div className="relative flex-1">
        <div className="relative w-full h-full">
          {item.thumbnail?.url ? (
            <Image src={IMG(item.thumbnail.url)} alt={item.title} fill className="object-cover" sizes="25vw" />
          ) : (
            <div className="w-full h-full bg-gray-100" />
          )}
          {isComingSoon && <div className="absolute inset-0 bg-black/35" />}
        </div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          {isComingSoon ? (
            <button type="button" className="px-5 py-1.5 text-white text-[13px] font-bold bg-[#D4A843] cursor-default rounded-[4px] shadow">
              {soonText}
            </button>
          ) : (
            <a href={item.videoUrl || "#"} target="_blank" rel="noopener noreferrer"
              className="px-5 py-1.5 text-white text-[13px] font-bold bg-[#0C4DA2] hover:bg-[#083b7d] transition-colors rounded-[4px] shadow">
              {readText}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function SmallCard({ item }: { item: any }) {
  const { lang } = useLang();
  const { translated: soonText } = useTranslateText('Тун удахгүй', lang);
  const { translated: readText } = useTranslateText('Унших', lang);
  const isComingSoon = item.excerpt === 'Тун удахгүй';

  return (
    <div className="flex flex-col rounded overflow-hidden">
      <div className="px-2 py-1.5 bg-white">
        <h3 className="font-serif text-[11px] font-bold leading-snug text-black line-clamp-2 min-h-[30px]">
          {item.title}
        </h3>
      </div>
      <div className="relative">
        <div className="relative aspect-square w-full">
          {item.thumbnail?.url ? (
            <Image src={IMG(item.thumbnail.url)} alt={item.title} fill className="object-cover" sizes="20vw" />
          ) : (
            <div className="w-full h-full bg-gray-100" />
          )}
          {isComingSoon && <div className="absolute inset-0 bg-black/35" />}
        </div>
        <div className="absolute bottom-2 left-0 right-0 flex justify-center">
          {isComingSoon ? (
            <button type="button" className="px-3 py-0.5 text-white text-[10px] font-bold bg-[#D4A843] cursor-default rounded-[4px] shadow">
              {soonText}
            </button>
          ) : (
            <a href={item.videoUrl || "#"} target="_blank" rel="noopener noreferrer"
              className="px-3 py-0.5 text-white text-[10px] font-bold bg-[#0C4DA2] hover:bg-[#083b7d] transition-colors rounded-[4px] shadow">
              {readText}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SubscriptionSection() {
  const { lang } = useLang();
  const { translated: sectionTitle } = useTranslateText('Цахим захиалга', lang);

  const { data, loading, error } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: ["mvxZxdnGvKrI91KyiK9jk"],
      sortField: 'createdAt',
      sortDirection: 'DESC',
      status: 'published',
      limit: 7,
    },
  });

  const posts = (data as any)?.cpPostList?.posts || [];
  const large = posts[0];
  const topSmall = posts.slice(1, 4);
  const botSmall = posts.slice(4, 6);

  if (loading) return (
    <section className="w-full bg-[#f5f6f8] py-10">
      <div className="max-w-[1200px] mx-auto px-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-8" />
        <div className="h-64 bg-gray-100 rounded" />
      </div>
    </section>
  );

  if (error || !posts.length) return null;

  return (
    <section className="w-full bg-white py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center gap-4 mb-8">
          <div className="h-[1px] bg-gray-300 flex-1" />
          <h2 className="text-[#0C4DA2] font-serif text-[28px] font-bold leading-[110%] whitespace-nowrap">
            {sectionTitle}
          </h2>
          <div className="h-[1px] bg-gray-300 flex-1" />
        </div>

        <div className="flex gap-4">

          {/* Зүүн том зураг */}
          {large && (
            <div className="w-[400px] shrink-0">
              <LargeCard item={large} />
            </div>
          )}

          {/* Баруун талын 2 мөр */}
          <div className="flex-1 flex flex-col gap-4 mt-4">

            {/* Дээд мөр — 3 жижиг */}
            <div className="grid grid-cols-3 gap-4">
              {topSmall.map((item: any) => (
                <SmallCard key={item._id} item={item} />
              ))}
            </div>

            {/* Доод мөр — 2 жижиг голлуулсан */}
            <div className="flex gap-4 justify-center">
              {botSmall.map((item: any) => (
                <div key={item._id} className="w-1/3">
                  <SmallCard item={item} />
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}