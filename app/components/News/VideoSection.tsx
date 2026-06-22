"use client";

import { useState } from "react";
import Image from "next/image";
import { useLang } from "../Header/LangContext";
import { useTranslate, useTranslateText, formatDateLang } from "../Header/useTranslate";

const getYoutubeId = (url?: string) => {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/);
  return match ? match[1] : null;
};

interface Props {
  posts: any[];
  loading: boolean;
  activeIndex: number;
  onSelect: (index: number) => void;
}

// ActivePost-ийн орчуулгыг тусдаа component-д хийнэ
function ActivePostInfo({ post, lang }: { post: any; lang: any }) {
  const { title, tag, isLoading } = useTranslate({
    title: post.title || '',
    tag: post.tags?.[0]?.name || post.categories?.[0]?.name || '',
    lang,
  });

  return (
    <div className="mt-3 mb-4">
      <span className="text-[#1a5fba] text-[10px] font-bold uppercase tracking-wide block mb-1">
        {tag}
      </span>
      <h3 className={`text-gray-900 font-bold text-lg leading-snug ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        {title}
      </h3>
      <span className="text-gray-400 text-xs mt-1 block">
        {formatDateLang(post.createdAt, lang)}
      </span>
    </div>
  );
}

export default function VideoSection({ posts, loading, activeIndex, onSelect }: Props) {
  const { lang } = useLang();
  const [playing, setPlaying] = useState(false);
  const { translated: videoTitle } = useTranslateText('Видео мэдээ', lang);
  const { translated: noVideoText } = useTranslateText('Видео байхгүй', lang);

  const activePost = posts[activeIndex] || posts[0];
  const activeVideoId = getYoutubeId(activePost?.videoUrl);

  const handleSelect = (index: number) => {
    setPlaying(false);
    onSelect(index);
  };

  if (loading) return (
    <section className="mb-2">
      <div className="animate-pulse">
        <div className="w-full aspect-video bg-gray-200 rounded mb-3" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </div>
    </section>
  );

  if (!posts.length) return null;

  return (
    <section className="mb-2">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px bg-gray-300 flex-1" />
        <h2 className="text-[#0C4DA2] font-serif text-[28px] font-bold leading-[110%] whitespace-nowrap">
          {videoTitle}
        </h2>
        <div className="h-px bg-gray-300 flex-1" />
      </div>

      <div className="py-3">
        {/* Үндсэн тоглуулагч */}
        <div className="relative bg-black overflow-hidden rounded" style={{ aspectRatio: "16/9" }}>
          {playing && activeVideoId ? (
            <iframe
              key={activeVideoId}
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1`}
              title={activePost.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : activeVideoId ? (
            <>
              <Image
                src={`https://img.youtube.com/vi/${activeVideoId}/maxresdefault.jpg`}
                alt={activePost.title}
                fill
                className="object-cover brightness-75"
                unoptimized
              />
              <div className="absolute top-0 left-0 right-0 px-4 py-3 bg-gradient-to-b from-black/70 to-transparent">
                <span className="text-white text-sm font-medium line-clamp-1">
                  {activePost.title}
                </span>
              </div>
              <button
                onClick={() => setPlaying(true)}
                className="absolute inset-0 flex items-center justify-center group"
              >
                <div className="w-16 h-16 rounded-full border-2 border-white/80 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all duration-200">
                  <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
              <div className="absolute bottom-3 right-3">
                <div className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  YouTube
                </div>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
              {noVideoText}
            </div>
          )}
        </div>

        {/* key=activePost._id → activeIndex өөрчлөгдөхөд шинээр орчуулна */}
        <ActivePostInfo key={activePost._id} post={activePost} lang={lang} />
      </div>
    </section>
  );
}