"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import { Search } from "lucide-react";
import queries from "../graphql/cms/queries";
import { useLang } from "../components/Header/LangContext";
import { useTranslateText } from "../components/Header/useTranslate";

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(h / 24);
  if (h < 24) return `${h} цагийн өмнө`;
  return `${d} өдрийн өмнө`;
};

// Match болсон үгийг bold болгоно
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim() || !text) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? <strong key={i} className="font-bold text-gray-900">{part}</strong> : part
      )}
    </>
  );
}

// title/excerpt/content-с snippet авна
function getSnippet(post: any, query: string, maxLen = 200): string {
  const fields = [post.excerpt, post.content?.replace(/<[^>]+>/g, " "), post.title].filter(Boolean);
  if (!query.trim()) return fields[0]?.slice(0, maxLen) || "";
  const q = query.toLowerCase();
  for (const field of fields) {
    const idx = field.toLowerCase().indexOf(q);
    if (idx !== -1) {
      const start = Math.max(0, idx - 60);
      const end = Math.min(field.length, idx + query.length + 100);
      return (start > 0 ? "..." : "") + field.slice(start, end) + (end < field.length ? "..." : "");
    }
  }
  return fields[0]?.slice(0, maxLen) || "";
}

function SearchPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get("q") || "";
  const { lang } = useLang();
  const { translated: resultText } = useTranslateText('үр дүн', lang);
  const { translated: noResultText } = useTranslateText('Үр дүн олдсонгүй', lang);
  const { translated: tryAgainText } = useTranslateText('Өөр үгээр хайж үзнэ үү', lang);
  const { translated: enterQueryText } = useTranslateText('Хайх үгээ оруулна уу', lang);
  const [inputValue, setInputValue] = useState(q);

  useEffect(() => { setInputValue(q); }, [q]);

  const { data, loading } = useQuery(queries.cmsPostList, {
    variables: { searchValue: q || undefined },
    skip: !q,
  });

  const posts = (data as any)?.cpPostList?.posts || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) router.push(`/search?q=${encodeURIComponent(inputValue.trim())}`);
  };

  return (
    <>
      <main className="w-full bg-white min-h-screen">
        <div className="max-w-[800px] mx-auto px-4 py-8">

          {/* Search bar */}
          <form onSubmit={handleSubmit} className="relative mb-6">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={useTranslateText('Мэдээ хайх', lang).translated + '...'}
              className="w-full pl-10 pr-12 py-3 text-sm border border-gray-300 rounded-full bg-white text-gray-900 focus:outline-none focus:border-[#0C4DA2] focus:ring-1 focus:ring-[#0C4DA2]"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#0C4DA2] text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-[#0a3d82]">
              <Search size={13} />
            </button>
          </form>

          {/* Result count */}
          {q && !loading && (
            <p className="text-sm text-gray-500 mb-5">
              <span className="font-semibold text-gray-800">&ldquo;{q}&rdquo;</span> — {posts.length} {resultText}
            </p>
          )}

          {/* Loading */}
          {loading && (
            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse border-b border-gray-100 pb-6">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-1/3 mb-3" />
                  <div className="h-3 bg-gray-200 rounded w-full mb-1" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                </div>
              ))}
            </div>
          )}

          {/* No results */}
          {!loading && q && posts.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <Search size={40} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">{noResultText}</p>
              <p className="text-sm mt-1">{tryAgainText}</p>
            </div>
          )}

          {/* Results list — ikon.mn style */}
          {!loading && posts.length > 0 && (
            <div className="space-y-6">
              {posts.map((post: any) => {
                const snippet = getSnippet(post, q);
                return (
                  <div key={post._id} className="border-b border-gray-100 pb-6">
                    <Link href={`/article/${post.slug || post._id}`} className="group">
                      <h3 className="text-[#0C4DA2] text-lg font-semibold leading-snug group-hover:underline mb-1">
                        <Highlight text={post.excerpt || post.title} query={q} />
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                      <span className="text-green-700 font-medium">montsame.mn</span>
                      {(post.tags?.[0]?.name || post.categories?.[0]?.name) && (
                        <><span>›</span><span>{post.tags?.[0]?.name || post.categories?.[0]?.name}</span></>
                      )}
                      <span>·</span>
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    {snippet && (
                      <p className="text-sm text-gray-600 leading-relaxed">
                        <Highlight text={snippet} query={q} />
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty state */}
          {!q && (
            <div className="text-center py-20 text-gray-400">
              <Search size={40} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">{enterQueryText}</p>
            </div>
          )}

        </div>
      </main>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchPageInner />
    </Suspense>
  );
}
