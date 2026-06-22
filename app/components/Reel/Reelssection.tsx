'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@apollo/client/react';
import queries from '@/app/graphql/cms/queries';
import { useLang } from "../Header/LangContext";
import { useTranslate, useTranslateText, formatDateLang } from "../Header/useTranslate";

const REEL_CATEGORY_ID = 'as4jEyFuh8hOWGJwOwspd';

const getYoutubeId = (url?: string) => {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/);
  return match ? match[1] : null;
};

// ─── Modal Player ─────────────────────────────────────────
function VideoModal({ post, onClose, lang }: { post: any; onClose: () => void; lang: any }) {
  const videoId = getYoutubeId(post.videoUrl);
  const { translated: noVideoText } = useTranslateText('Видео байхгүй', lang);
  const { translated: youtubeText } = useTranslateText('YouTube-д үзэх', lang);
  const { title, content, tag, isLoading } = useTranslate({
    title: post.title || '',
    content: post.content || '',
    tag: post.tags?.[0]?.name || post.categories?.[0]?.name || '',
    lang,
  });

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="flex flex-col sm:flex-row w-full max-w-4xl bg-[#111] rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Video — portrait 9/16 */}
        <div className="relative w-full sm:w-[320px] shrink-0" style={{ aspectRatio: '9/16' }}>
          {videoId ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={post.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm bg-gray-900">
              {noVideoText}
            </div>
          )}
        </div>

        {/* Info panel */}
        <div className="flex flex-col flex-1 p-6 gap-4">
          <button
            onClick={onClose}
            className="self-end w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors text-lg"
            aria-label="Close"
          >
            ✕
          </button>
          <div>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block mb-2">
              {tag}
            </span>
            <h3 className={`text-white font-bold text-xl leading-snug mb-3 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
              {title}
            </h3>
            <span className="text-white/40 text-xs">{formatDateLang(post.createdAt, lang)}</span>
          </div>
          {post.content && (
            <p
              className={`text-white/70 text-sm leading-relaxed line-clamp-6 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
          {videoId && (
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-2 text-xs font-bold text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              {youtubeText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Single Reel Card ────────────────────────────────────
function ReelCard({ post, onPlay, lang }: { post: any; onPlay: () => void; lang: any }) {
  const videoId = getYoutubeId(post.videoUrl);
  const thumb = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : post.thumbnail?.url
    ? `https://montsame.next.erxes.io/gateway/read-file?key=${post.thumbnail.url}`
    : null;

  const { title, tag, isLoading } = useTranslate({
    title: post.title || '',
    tag: post.tags?.[0]?.name || post.categories?.[0]?.name || '',
    lang,
  });

  return (
    <div className="group cursor-pointer flex flex-col" onClick={onPlay}>
      <div className="relative w-full aspect-[9/16] max-h-[360px] overflow-hidden rounded-xl mb-3 bg-gray-900">
        {thumb ? (
          <Image
            src={thumb}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 25vw"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 bg-gray-800" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-[#1565c0]/80 border-2 border-white/60 flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform duration-200">
            <svg className="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
          <span className="text-white/60 text-[9px] font-bold uppercase tracking-widest block mb-0.5">
            {tag}
          </span>
          <p className={`text-white text-[12px] font-bold leading-snug line-clamp-2 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
            {title}
          </p>
          <span className="text-white/40 text-[10px] mt-1 block">
            {formatDateLang(post.createdAt, lang)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────
export default function ReelsSection() {
  const { lang } = useLang();
  const [startIndex, setStartIndex] = useState(0);
  const [activePost, setActivePost] = useState<any | null>(null);

  // ← Hook дээд хэсэгт, JSX дотор биш
  const { translated: reelTitle } = useTranslateText('Рийл', lang);

  const { data, loading } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: [REEL_CATEGORY_ID],
      sortField: 'createdAt',
      sortDirection: 'DESC',
      status: 'published',
      limit: 20,
    },
  });

  const posts: any[] = (data as any)?.cpPostList?.posts || [];
  const canPrev = startIndex > 0;
  const canNext = startIndex + 4 < posts.length;
  const prev = () => canPrev && setStartIndex((i) => i - 1);
  const next = () => canNext && setStartIndex((i) => i + 1);
  const visible = posts.slice(startIndex, startIndex + 4);

  return (
    <>
      <section className="w-full py-2 sm:py-4 lg:py-6">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-40">
          <div className="rounded-sm relative">

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[#0C4DA2] font-serif text-[28px] font-bold leading-[110%] whitespace-nowrap">{reelTitle}</h2>
              </div>

              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="w-full aspect-[9/16] max-h-[360px] bg-white/10 rounded-xl" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative flex items-center gap-3">
                  <button
                    onClick={prev}
                    disabled={!canPrev}
                    className="absolute -left-12 z-10 w-16 h-16 flex items-center justify-center text-white/90 hover:text-white disabled:opacity-20 transition-opacity text-5xl"
                  >
                    ‹
                  </button>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                    {visible.map((post: any) => (
                      <ReelCard
                        key={post._id}
                        post={post}
                        lang={lang}
                        onPlay={() => setActivePost(post)}
                      />
                    ))}
                  </div>

                  <button
                    onClick={next}
                    disabled={!canNext}
                    className="absolute -right-12 z-10 w-16 h-16 flex items-center justify-center text-white/90 hover:text-white disabled:opacity-20 transition-opacity text-5xl"
                  >
                    ›
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {activePost && (
        <VideoModal post={activePost} onClose={() => setActivePost(null)} lang={lang} />
      )}
    </>
  );
}