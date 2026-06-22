import Image from "next/image";
import { notFound } from "next/navigation";

import { getPost } from "@/lib/erxes";
import ShareButton from "./ShareButton";
import RelatedNews from "./RelatedNews";
import ArticleContent from "./ArticleContent";
import LikeButton from "./LikeButton";
import TranslatableText from "./TranslatableText";
import RightSidebarNews from "../Feature/RightSideBar";
import SideBlock from "../News/Sidebar/SideBlock";
import NationalMovementBlock from "../News/NationalMovementBlock";
import AdBanner from "../Ad/AdBanner";

const IMG = (url: string) =>
  `https://montsame.next.erxes.io/gateway/read-file?key=${url}`;

const formatFullDate = (dateStr: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const getYoutubeId = (url?: string) => {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/);
  return match ? match[1] : null;
};

export default async function ArticlePage({ slug }: { slug: string }) {
  const post = await getPost(slug);

  if (!post) notFound();

  const tag = post.tags?.[0]?.name || post.categories?.[0]?.name || "";
  const youtubeId = getYoutubeId(post.videoUrl);
  const likeCount = post.reactionCounts?.like || 0;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <TranslatableText
          as="h1"
          text={post.title}
          className="font-serif text-[2rem] font-bold text-[#183354] leading-[115%] mb-4 line-clamp-4"
        />

        <div className="flex items-center gap-3 mb-4">
          {tag && (
            <TranslatableText
              text={tag}
              className="text-[12px] font-bold text-[#0C4DA2] tracking-wide uppercase"
            />
          )}
          <span className="text-[12px] text-gray-400">{formatFullDate(post.createdAt)}</span>
          {post.recentViewCount > 0 && (
            <span className="text-[12px] text-gray-400 flex items-center gap-1">
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              {post.recentViewCount.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-[#0C4DA2] shrink-0 flex items-center justify-center">
              <Image
                src={post.author?.details?.avatar ? IMG(post.author.details.avatar) : "/images/Montsamelogo.png"}
                alt="author"
                width={40}
                height={40}
                className={post.author?.details?.avatar ? "object-cover object-top w-full h-full" : "object-contain p-1 brightness-0 invert"}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {post.author?.details?.fullName || post.author?.username || "Монцамэ"}
              </p>
              <p className="text-[11px] text-gray-400">{post.author?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LikeButton postId={post._id} initialCount={likeCount} />
            <ShareButton title={post.title} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:items-stretch">
          <div className="flex-1 min-w-0">
            {post.thumbnail?.url && (
              <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden mb-6">
                <Image
                  src={IMG(post.thumbnail.url)}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 900px"
                />
              </div>
            )}

            {youtubeId && (
              <div className="mb-6">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  className="w-full aspect-video"
                  allowFullScreen
                  title={post.title}
                />
              </div>
            )}
            {!youtubeId && post.video?.url && (
              <div className="mb-6">
                <video src={IMG(post.video.url)} controls className="w-full aspect-video" />
              </div>
            )}

            <ArticleContent content={post.content || post.excerpt || ""} images={post.images || []} />

            <div className="flex items-center gap-2 mt-8 pt-4 border-t border-gray-100">
              <LikeButton postId={post._id} initialCount={likeCount} />
              <ShareButton title={post.title} />
            </div>
          </div>

          <aside className="w-full lg:w-[300px] shrink-0 lg:sticky lg:top-4 self-start lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
            <div className="mt-6"><RightSidebarNews /></div>
            <div className="mt-6"><SideBlock /></div>
            <div className="mt-4"><AdBanner /></div>
            <div className="mt-6"><NationalMovementBlock /></div>
          </aside>
        </div>

        <RelatedNews title={post.title} currentId={post._id} />
      </div>
    </div>
  );
}
