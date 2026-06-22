"use client";

import Image from "next/image";
import { useLang } from "../Header/LangContext";
import { useTranslate, useTranslateText } from "../Header/useTranslate";

const getYoutubeId = (url?: string) => {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/);
  return match ? match[1] : null;
};

interface Props {
  posts: any[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

function NextNewsItem({
  post,
  index,
  isActive,
  onSelect,
  lang,
}: {
  post: any;
  index: number;
  isActive: boolean;
  onSelect: (index: number) => void;
  lang: any;
}) {
  const videoId = getYoutubeId(post.videoUrl);
  const { title, excerpt, isLoading } = useTranslate({
    title: post.title || '',
    excerpt: post.excerpt || '',
    lang,
  });

  return (
    <button
      onClick={() => onSelect(index)}
      className={`group w-full flex items-start gap-3 py-3 border-b border-gray-100 last:border-0 text-left transition-colors ${
        isActive ? "opacity-60" : "hover:bg-gray-50"
      }`}
    >
      <p className={`flex-1 text-sm font-medium leading-snug transition-colors ${
        isActive ? "text-[#0C4DA2]" : "text-gray-800 group-hover:text-[#0C4DA2]"
      } ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        {excerpt || title}
      </p>
      <div className={`relative w-[88px] h-[60px] shrink-0 overflow-hidden rounded bg-gray-100 ${
        isActive ? "ring-2 ring-[#0C4DA2]" : ""
      }`}>
        {videoId ? (
          <Image
            src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
            alt={title}
            fill
            className="object-cover"
            unoptimized
          />
        ) : post.thumbnail?.url ? (
          <Image
            src={`https://montsame.next.erxes.io/gateway/read-file?key=${post.thumbnail.url}`}
            alt={title}
            fill
            className="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="w-5 h-5 rounded-full bg-white/80 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-[#0C4DA2] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function NextNewsBlock({ posts, activeIndex, onSelect }: Props) {
  const { lang } = useLang();
  const { translated: headerTitle } = useTranslateText('Дараачийн мэдээ', lang);
  const { translated: viewAllText } = useTranslateText('Бүгдийг үзэх', lang);

  const sidebarPosts = posts.slice(1, 5);

  return (
    <div className="mb-5 pb-5">
      <h3 className="text-gray-900 font-bold text-base mb-3 border-b-2 border-gray-900 pb-1 inline-block">
        {headerTitle}
      </h3>
      <div className="mt-5">
        {sidebarPosts.map((post: any, i: number) => (
          <NextNewsItem
            key={post._id}
            post={post}
            index={i + 1}
            isActive={activeIndex === i + 1}
            onSelect={onSelect}
            lang={lang}
          />
        ))}
      </div>
      <a
        href="/video"
        className="mt-4 w-full border border-gray-300 rounded py-2.5 text-sm font-bold text-gray-800 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1"
      >
        {viewAllText} <span className="text-[#0C4DA2]">↗</span>
      </a>
    </div>
  );
}