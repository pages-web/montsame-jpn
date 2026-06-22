"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
import queries from "@/app/graphql/cms/queries";
import ShareButton from "./ShareButton";
import RelatedNews from "./RelatedNewsClient";
import { useLang } from "../Header/LangContext";
import { useTranslate, useTranslateText } from "../Header/useTranslate";

const IMG = (url?: string) =>
  url ? `https://montsame.next.erxes.io/gateway/read-file?key=${url}` : "/images/a.png";

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${d.getFullYear()} оны ${d.getMonth() + 1} сарын ${d.getDate()}`;
};

const getYoutubeId = (url?: string) => {
  if (!url) return null;
  const m = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/);
  return m ? m[1] : null;
};

function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setPct(Math.round((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100) || 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-transparent">
      <div className="h-full bg-[#0C4DA2] transition-all duration-100" style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function TusgaiBulanPage() {
  const params = useParams();
  const newsId = params?.id as string;
  const { lang } = useLang();

  const { data, loading, error } = useQuery(queries.cmsPostDetail, {
    variables: { id: newsId },
    skip: !newsId,
  });

  const post = (data as any)?.cpPost;

  // Орчуулга
  const { title, excerpt, content, isLoading: translating } = useTranslate({
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    lang,
  });

  const { translated: notFoundText } = useTranslateText('Мэдээ олдсонгүй', lang);
  const { translated: backText } = useTranslateText('Буцах', lang);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error || !post) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-500 mb-4">{notFoundText}</p>
        <button onClick={() => window.history.back()} className="px-4 py-2 bg-[#0C4DA2] text-white rounded text-sm">
          {backText}
        </button>
      </div>
    </div>
  );

  const youtubeId = getYoutubeId(post.videoUrl);

  return (
    <>
      <ReadingProgress />
      <div className="bg-white min-h-screen">

        {/* ══ HERO ══ */}
        <div className="relative w-full h-screen min-h-[600px]">
          <Image
            src={IMG(post.thumbnail?.url)}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 px-10 md:px-20 pb-16 max-w-[680px]">
            <h1
              className={`text-white mb-5 transition-opacity ${translating ? 'opacity-50' : 'opacity-100'}`}
              style={{
                fontFamily: '"PT Serif", serif',
                fontSize: 'clamp(28px, 4vw, 52px)',
                fontWeight: 700,
                lineHeight: '1.15',
              }}
            >
              {excerpt || title}
            </h1>

            <span className="text-[12px] font-bold text-[#5b9af5] uppercase tracking-[0.2em] block mb-5">
              {title}
            </span>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-600 shrink-0">
                <Image
                  src={post.author?.details?.avatar || "/images/a.png"}
                  alt="author"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="text-white/80 text-[13px] font-semibold uppercase tracking-widest">
                {post.author?.details?.shortName || post.author?.details?.fullName || post.author?.username || "Монцамэ"}
              </span>
            </div>
          </div>
        </div>

        {/* ══ НИЙТЛЭЛ ══ */}
        <div id="content" className="max-w-[720px] mx-auto px-5 py-16">

          {/* Видео */}
          {youtubeId && (
            <div className="mb-12 -mx-5 sm:mx-0">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                className="w-full aspect-video rounded-lg"
                allowFullScreen
                title={title}
              />
            </div>
          )}
          {!youtubeId && post.video?.url && (
            <div className="mb-12">
              <video src={IMG(post.video.url)} controls className="w-full aspect-video rounded-lg" />
            </div>
          )}

          {/* Нийтлэлийн бие + зургууд */}
          {(() => {
            const images: any[] = post.images || [];
            const html: string = content || "";
            const proseClass = "prose max-w-none text-gray-800 prose-p:text-[18px] prose-p:leading-[1.85] prose-p:mb-6 prose-headings:font-bold prose-headings:text-[#0C4DA2] prose-h2:text-[26px] prose-h2:mt-14 prose-h2:mb-5 prose-h3:text-[20px] prose-h3:mt-10 prose-h3:mb-4 prose-img:w-full prose-img:rounded-lg prose-img:my-10 prose-blockquote:border-l-[3px] prose-blockquote:border-[#0C4DA2] prose-blockquote:pl-6 prose-blockquote:py-1 prose-blockquote:text-gray-600 prose-blockquote:text-[17px] prose-blockquote:not-italic prose-blockquote:font-normal prose-a:text-[#0C4DA2] prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900";

            const NaturalImg = ({ src, alt, className = "" }: { src: string; alt: string; className?: string }) => (
              <Image src={src} alt={alt} width={0} height={0} sizes="100vw"
                style={{ width: '100%', height: 'auto' }} className={`rounded-lg ${className}`} />
            );

            const imgGroups: React.ReactNode[] = [];
            if (images[0]) imgGroups.push(
              <div key="g0" className="my-10 w-full overflow-hidden rounded-lg">
                <NaturalImg src={IMG(images[0].url)} alt={images[0].name || 'img-1'} />
              </div>
            );
            if (images[1]) imgGroups.push(
              <div key="g1" className="my-10 overflow-hidden" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
                <NaturalImg src={IMG(images[1].url)} alt={images[1].name || 'img-2'} />
              </div>
            );
            if (images[2]) imgGroups.push(
              <div key="g2" className="my-10 w-full overflow-hidden rounded-lg">
                <NaturalImg src={IMG(images[2].url)} alt={images[2].name || 'img-3'} />
              </div>
            );
            if (images.slice(3, 8).length > 0) imgGroups.push(
              <div key="g3" className="my-10 grid grid-cols-4 gap-2">
                {images.slice(3, 8).map((img: any, i: number) => (
                  <div key={i} className="overflow-hidden rounded-lg">
                    <NaturalImg src={IMG(img.url)} alt={img.name || `img-${i + 4}`} />
                  </div>
                ))}
              </div>
            );
            if (images[8]) imgGroups.push(
              <div key="g4" className="my-10 w-full overflow-hidden rounded-lg">
                <NaturalImg src={IMG(images[8].url)} alt={images[8].name || 'img-9'} />
              </div>
            );
            images.slice(9).forEach((img: any, i: number) => imgGroups.push(
              <div key={`g${i + 5}`} className="my-10 w-full overflow-hidden rounded-lg">
                <NaturalImg src={IMG(img.url)} alt={img.name || `img-${i + 10}`} />
              </div>
            ));

            if (!imgGroups.length) {
              return <div className={`${proseClass} ${translating ? 'opacity-50' : 'opacity-100'}`} dangerouslySetInnerHTML={{ __html: html }} />;
            }

            const paras = html.split('</p>').filter(p => p.trim());
            const n = imgGroups.length;
            const size = Math.ceil(paras.length / (n + 1));
            const chunks: string[] = Array.from({ length: n + 1 }, (_, i) => {
              const slice = paras.slice(i * size, (i + 1) * size);
              return slice.length ? slice.join('</p>') + '</p>' : '';
            });

            return (
              <>
                {chunks.map((chunk, i) => (
                  <div key={i}>
                    {chunk && <div className={`${proseClass} ${translating ? 'opacity-50' : 'opacity-100'}`} dangerouslySetInnerHTML={{ __html: chunk }} />}
                    {imgGroups[i] ?? null}
                  </div>
                ))}
              </>
            );
          })()}

          {/* Share */}
          <div className="mt-14 pt-6 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span>{formatDate(post.createdAt)}</span>
              <span>·</span>
              <span>{post.author?.details?.fullName || "Монцамэ"}</span>
            </div>
            <ShareButton title={excerpt || title} />
          </div>

          <RelatedNews title={post.title} currentId={post._id} />
        </div>

      </div>
    </>
  );
}