"use client";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useState, useRef } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { useQuery } from "@apollo/client/react";
import queries from "../graphql/cms/queries";
import { useLang } from "../components/Header/LangContext";
import { useTranslateText } from "../components/Header/useTranslate";

const VIDEO_CATEGORY_ID = "shWOTAdbQ28nRM0BKjobx";

const getYoutubeId = (url?: string) => {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/);
  return match ? match[1] : null;
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(h / 24);
  if (m < 1) return "Саяхан";
  if (m < 60) return `${m} минутын өмнө`;
  if (h < 24) return `${h} цагийн өмнө`;
  return `${d} өдрийн өмнө`;
};

function VideoThumb({ post, isActive, onSelect }: { post: any; isActive: boolean; onSelect: () => void }) {
  const videoId = getYoutubeId(post.videoUrl);

  return (
    <button onClick={onSelect} className="group text-left w-full">
      <div className={`relative overflow-hidden rounded mb-2 ${isActive ? "ring-2 ring-[#0C4DA2]" : ""}`} style={{ aspectRatio: '16/9' }}>
        {videoId ? (
          <Image
            src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
            alt={post.title}
            fill
            className={`object-cover transition-all duration-300 ${isActive ? "brightness-90" : "brightness-75 group-hover:brightness-90"}`}
            unoptimized
          />
        ) : post.thumbnail?.url ? (
          <Image
            src={`https://montsame.next.erxes.io/gateway/read-file?key=${post.thumbnail.url}`}
            alt={post.title}
            fill
            className="object-cover brightness-75 group-hover:brightness-90 transition-all duration-300"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-200" />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-10 h-10 rounded-full border-2 border-white/80 flex items-center justify-center transition-all ${isActive ? "bg-[#0C4DA2]/80" : "bg-black/40 group-hover:bg-black/60"}`}>
            <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <span className="text-[10px] font-bold text-[#0C4DA2] uppercase tracking-wide block mb-1">
        {post.tags?.[0]?.name || post.categories?.[0]?.name}
      </span>
      <p className={`text-sm font-semibold leading-snug transition-colors line-clamp-2 ${isActive ? "text-[#0C4DA2]" : "text-[#183354] group-hover:text-[#0C4DA2]"}`}>
        {post.excerpt || post.title}
      </p>
      <span className="text-[11px] text-gray-400 mt-0.5 block">{formatDate(post.createdAt)}</span>
    </button>
  );
}

const LAYOUT_KEYWORDS = ["sidebar", "зүүн", "баруун", "төв", "дунд", "center", "left", "right", "наадм", "festival", "bottom", "main", "hero", "carousel", "reel", "subscription", "реклам", "онцлох зураг"];
const getLabel = (p: any): string => p.tags?.[0]?.name || p.categories?.[0]?.name || "";

export default function VideoPage() {
  const [query, setQuery] = useState('');
  const [activeCatName, setActiveCatName] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [featuredPlaying, setFeaturedPlaying] = useState(false);
  const { lang } = useLang();
  const { translated: watchLabel } = useTranslateText('Үзэх', lang);
  const { translated: allLabel } = useTranslateText('БҮГД', lang);
  const { translated: noVideoLabel } = useTranslateText('Видео олдсонгүй', lang);
  const featuredRef = useRef<HTMLDivElement>(null);

  const { data, loading } = useQuery(queries.cmsPostList, {
    variables: { categoryIds: [VIDEO_CATEGORY_ID], sortField: "createdAt", sortDirection: "DESC", status: "published" },
  });

  const posts = (data as any)?.cpPostList?.posts || [];

  // Filter товчнуудын жагсаалт
  const labelSet = new Set<string>();
  posts.forEach((p: any) => {
    const label = getLabel(p);
    if (!label) return;
    if (LAYOUT_KEYWORDS.some((kw) => label.toLowerCase().includes(kw))) return;
    labelSet.add(label);
  });
  const filterLabels = Array.from(labelSet);

  const filtered = posts.filter((p: any) => {
    const label = getLabel(p);
    const matchesCat = !activeCatName || label === activeCatName;
    const matchesSearch = (p.title + (p.excerpt || '')).toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featured = filtered[activeIndex] || filtered[0];
  const featuredVideoId = getYoutubeId(featured?.videoUrl);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    setFeaturedPlaying(false);
    featuredRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <main className="w-full bg-[#f5f6f8]">

        {/* ── Featured banner ── */}
        {featured && (
          <div ref={featuredRef} className="relative w-full h-[480px] overflow-hidden">
            {featuredPlaying && featuredVideoId ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${featuredVideoId}?autoplay=1&rel=0`}
                title={featured.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                {featuredVideoId ? (
                  <Image
                    src={`https://img.youtube.com/vi/${featuredVideoId}/maxresdefault.jpg`}
                    alt={featured.title}
                    fill
                    className="object-cover brightness-50"
                    unoptimized
                    priority
                  />
                ) : featured.thumbnail?.url ? (
                  <Image
                    src={`https://montsame.next.erxes.io/gateway/read-file?key=${featured.thumbnail.url}`}
                    alt={featured.title}
                    fill
                    className="object-cover brightness-50"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-900" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-10 left-10 max-w-[600px]">
                  <span className="text-[11px] font-bold text-[#5b9af5] uppercase tracking-widest block mb-3">
                    {featured.tags?.[0]?.name || featured.categories?.[0]?.name}
                  </span>
                  <h1 className="text-white font-serif text-[36px] font-bold leading-[115%] mb-4">
                    {featured.excerpt || featured.title}
                  </h1>
                  <span className="text-white/60 text-sm block mb-5">{formatDate(featured.createdAt)}</span>
                  <button
                    onClick={() => setFeaturedPlaying(true)}
                    className="flex items-center gap-3 bg-[#0C4DA2] hover:bg-[#0a3d82] text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    {watchLabel}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-40 py-8">

          {/* ── Search + Filter ── */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <div className="relative w-full sm:w-64 shrink-0">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={useTranslateText('Видео хайх', lang).translated + '...'}
                value={query}
                onChange={e => { setQuery(e.target.value); setActiveIndex(0); }}
                className="text-black w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-full bg-white focus:outline-none focus:border-[#0C4DA2]"
              />
            </div>
            {filterLabels.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => { setActiveCatName(null); setActiveIndex(0); }}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase transition-colors ${
                    !activeCatName ? "bg-[#0C4DA2] text-white" : "bg-white text-gray-600 border border-gray-300 hover:border-[#0C4DA2] hover:text-[#0C4DA2]"
                  }`}
                >
                  {allLabel}
                </button>
                {filterLabels.map((name) => (
                  <button
                    key={name}
                    onClick={() => { setActiveCatName(name); setActiveIndex(0); }}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase transition-colors ${
                      activeCatName === name ? "bg-[#0C4DA2] text-white" : "bg-white text-gray-600 border border-gray-300 hover:border-[#0C4DA2] hover:text-[#0C4DA2]"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Video grid ── */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="w-full aspect-video bg-gray-200 rounded mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-1" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-16">{noVideoLabel}</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
              {filtered.map((post: any) => (
                <VideoThumb
                  key={post._id}
                  post={post}
                  isActive={filtered[activeIndex]?._id === post._id}
                  onSelect={() => handleSelect(filtered.indexOf(post))}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
