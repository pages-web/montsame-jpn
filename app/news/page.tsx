"use client";

import { useState, useEffect, Suspense } from "react";
import { useQuery } from "@apollo/client/react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import queries from "../graphql/cms/queries";
import { useLang } from "../components/Header/LangContext";
import { useTranslateText } from "../components/Header/useTranslate";

const IMG = (url: string) =>
  `https://montsame.next.erxes.io/gateway/read-file?key=${url}`;

const getYoutubeId = (url?: string) => {
  if (!url) return null;
  const m = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/);
  return m ? m[1] : null;
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(h / 24);
  if (m < 1) return "Дөнгөж сая";
  if (m < 60) return `${m} минутын өмнө`;
  if (h < 24) return `${h} цагийн өмнө`;
  return `${d} өдрийн өмнө`;
};

function NewsCard({ post, activeCategoryId }: { post: any; activeCategoryId?: string | null }) {
  const { lang } = useLang();
  const { translated: videoLabel } = useTranslateText('Видео', lang);
  const ytId = getYoutubeId(post.videoUrl);
  const thumbUrl = post.thumbnail?.url || post.images?.[0]?.url || null;
  const hasImage = !!(thumbUrl || ytId);
  const imgSrc = thumbUrl
    ? IMG(thumbUrl)
    : ytId
    ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`
    : null;
  const categoryLabel =
    post.tags?.[0]?.name ||
    (activeCategoryId && post.categories?.find((c: any) => c._id === activeCategoryId)?.name) ||
    post.categories?.[0]?.name ||
    "";

  return (
    <Link href={`/article/${post.slug || post._id}`} className="group flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="relative w-full overflow-hidden bg-gray-100 flex items-center justify-center shrink-0" style={{ aspectRatio: "16/9" }}>
        {hasImage ? (
          <Image src={imgSrc!} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" unoptimized={!!ytId} />
        ) : (
          <Image src="/images/Montsamelogo.png" alt="MONTSAME" width={56} height={56} className="object-contain opacity-40" />
        )}
        {ytId && <span className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">▶ {videoLabel}</span>}
      </div>
      <div className="p-3 flex flex-col gap-1 flex-1">
        {categoryLabel && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#0C4DA2] truncate">{categoryLabel}</span>
        )}
        <p className="font-serif text-[14px] font-semibold leading-[140%] text-[#0d1f3c] group-hover:text-[#0C4DA2] transition-colors line-clamp-3 flex-1">{post.title}</p>
        <span className="text-[11px] text-gray-400 mt-0.5">{formatDate(post.createdAt)}</span>
      </div>
    </Link>
  );
}

const PAGE_SIZE = 20;

type CmsMenuItem = { _id: string; label: string; url: string; parentId?: string; kind?: string };
type SidebarGroup = { label: string; items: CmsMenuItem[] };

// URL-аас /category/slug хэлбэрийн slug-г авна
const extractSlug = (url: string) => {
  const match = url?.match(/\/category\/(.+)/);
  return match ? match[1] : null;
};

function Sidebar({
  activeCategoryIdParam,
  slugMap,
  groups,
  onSelect,
}: {
  activeCategoryIdParam: string | null;
  slugMap: Record<string, string>;
  groups: SidebarGroup[];
  onSelect: (categoryId: string | null) => void;
}) {
  const { lang } = useLang();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (groups.length > 0) {
      setOpenGroups(Object.fromEntries(groups.map((g) => [g.label, true])));
    }
  }, [groups.length]);

  const toggleGroup = (label: string) =>
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));

  const getCatId = (item: CmsMenuItem) => {
    const s = extractSlug(item.url);
    return s ? slugMap[s] : null;
  };

  const isActive = (item: CmsMenuItem) => {
    if (!activeCategoryIdParam) return false;
    return activeCategoryIdParam === getCatId(item);
  };

  const handleItemClick = (item: CmsMenuItem) => {
    const catId = getCatId(item);
    if (catId) onSelect(catId);
  };

  return (
    <nav className="w-full">
      <button
        onClick={() => onSelect(null)}
        className={`w-full text-left px-3 py-2 rounded text-[13px] font-bold mb-3 transition-colors ${
          !activeCategoryIdParam
            ? "bg-[#0C4DA2] text-white"
            : "text-gray-700 hover:text-[#0C4DA2] hover:bg-blue-50"
        }`}
      >
        {useTranslateText('Бүгд мэдээ', lang).translated}
      </button>

      {groups.map((group) => (
        <div key={group.label} className="mb-1">
          <button
            onClick={() => toggleGroup(group.label)}
            className="w-full flex items-center justify-between px-3 py-2 text-[11px] font-extrabold uppercase tracking-widest text-[#0C4DA2] hover:bg-blue-50 rounded transition-colors"
          >
            <span>{group.label}</span>
            {openGroups[group.label] ? <ChevronDown size={14} className="shrink-0" /> : <ChevronRight size={14} className="shrink-0" />}
          </button>

          {openGroups[group.label] && (
            <ul className="mt-0.5 mb-2 border-l-2 border-[#0C4DA2]/20 ml-3">
              {group.items.map((item) => {
                const slug = extractSlug(item.url);
                const catId = slug ? slugMap[slug] : null;
                return (
                  <li key={`${group.label}-${item._id}`}>
                    {catId ? (
                      <button
                        onClick={() => handleItemClick(item)}
                        className={`w-full text-left pl-3 pr-2 py-1.5 text-[12px] transition-colors rounded-r ${
                          isActive(item)
                            ? "text-[#0C4DA2] font-bold bg-blue-50 border-l-2 border-[#0C4DA2] -ml-[2px]"
                            : "text-gray-600 hover:text-[#0C4DA2] hover:bg-blue-50 font-normal"
                        }`}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <a
                        href={item.url}
                        className="block pl-3 pr-2 py-1.5 text-[12px] text-gray-600 hover:text-[#0C4DA2] hover:bg-blue-50 font-normal rounded-r transition-colors"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          <div className="h-px bg-gray-200 mx-3 mb-2" />
        </div>
      ))}
    </nav>
  );
}

function NewsPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeAimag = searchParams.get("aimag");
  const activeCategoryIdParam = searchParams.get("categoryId");
  const { lang } = useLang();
  const { translated: readLabel } = useTranslateText('Унших', lang);
  const { translated: noNewsLabel } = useTranslateText('Мэдээ олдсонгүй', lang);
  const { translated: prevLabel } = useTranslateText('Өмнөх', lang);
  const { translated: nextLabel } = useTranslateText('Дараах', lang);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  // CMS categories — slug → _id map
  const { data: catListData } = useQuery(queries.cmsCategoryList, { fetchPolicy: "cache-first" });
  const categoryList: any[] = (catListData as any)?.cpCategories?.list || [];
  const slugMap: Record<string, string> = {};
  const idToName: Record<string, string> = {};
  categoryList.forEach((c: any) => {
    slugMap[c.slug] = c._id;
    idToName[c._id] = c.name;
  });

  // CMS menu — sidebar groups
  const { data: menuData } = useQuery(queries.cmsMenuList, {
    variables: { kind: "header", limit: 100 },
    fetchPolicy: "network-only",
  });
  const allMenus: CmsMenuItem[] = (menuData as any)?.cpCmsMenuList || [];
  const topMenus = allMenus.filter((m) => !m.parentId);
  const sidebarGroups: SidebarGroup[] = topMenus
    .map((parent) => ({
      label: parent.label,
      items: allMenus.filter((m) => m.parentId === parent._id),
    }))
    .filter((g) => g.items.length > 0);

  // Posts
  const { data: allData, loading: allLoading } = useQuery(queries.cmsPostList, {
    variables: { limit: 100, sortField: "createdAt", sortDirection: "DESC", status: "published" },
  });
  const allPosts: any[] = (allData as any)?.cpPostList?.posts || [];

  const { data: catData, loading: catLoading } = useQuery(queries.cmsPostList, {
    variables: { categoryIds: [activeCategoryIdParam!], limit: 50, sortField: "createdAt", sortDirection: "DESC", status: "published" },
    skip: !activeCategoryIdParam,
  });
  const catPosts: any[] = activeCategoryIdParam ? ((catData as any)?.cpPostList?.posts || []) : [];

  const loading = allLoading || (!!activeCategoryIdParam && catLoading);

  const LAYOUT_KEYWORDS = ["sidebar", "зүүн", "баруун", "төв", "дунд", "center", "left", "right", "наадм", "festival", "bottom", "main", "hero", "carousel", "reel", "subscription", "реклам", "онцлох зураг"];

  const filteredPosts = (activeCategoryIdParam ? catPosts : allPosts).filter((post: any) => {
    const label = post.tags?.[0]?.name || post.categories?.[0]?.name || "";
    if (!activeCategoryIdParam && LAYOUT_KEYWORDS.some((kw) => label.toLowerCase().includes(kw))) return false;
    const postTitle = post.title?.trim().toLowerCase() || "";
    const postExcerpt = post.excerpt?.trim().toLowerCase() || "";
    const matchesAimag = !activeAimag || postTitle.includes(activeAimag.toLowerCase()) || postExcerpt.includes(activeAimag.toLowerCase());
    const matchesSearch = !query || postExcerpt.includes(query.toLowerCase()) || postTitle.includes(query.toLowerCase());
    return matchesAimag && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / PAGE_SIZE);
  const posts = filteredPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const featured = filteredPosts[0];

  const goToPage = (p: number) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const handleCategory = (categoryId: string | null) => {
    router.push(categoryId ? `/news?categoryId=${categoryId}` : "/news");
    setPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeLabel = activeCategoryIdParam ? idToName[activeCategoryIdParam] : null;

  return (
    <main className="w-full bg-[#f0f2f5] min-h-screen">
      {/* Featured banner */}
      {featured && (featured.thumbnail?.url || getYoutubeId(featured.videoUrl)) && (
        <div className="relative w-full h-[460px] overflow-hidden">
          <Image
            src={featured.thumbnail?.url ? IMG(featured.thumbnail.url) : `https://img.youtube.com/vi/${getYoutubeId(featured.videoUrl)}/maxresdefault.jpg`}
            alt={featured.title}
            fill
            className="object-cover"
            priority
            unoptimized={!featured.thumbnail?.url}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-8 sm:px-16 lg:px-40 pb-12">
            <div className="max-w-[680px]">
              {featured.tags?.[0]?.name && (
                <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-white bg-[#0C4DA2] px-3 py-1 rounded-full mb-4">
                  {featured.tags[0].name}
                </span>
              )}
              <h1 className="text-white font-serif text-[28px] sm:text-[36px] font-bold leading-[120%] mb-3 line-clamp-3">{featured.title}</h1>
              <span className="text-white/60 text-sm block mb-5">{formatDate(featured.createdAt)}</span>
              <Link href={`/article/${featured.slug || featured._id}`} className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#0C4DA2] px-5 py-2.5 rounded-full font-bold text-sm transition-colors">
                {readLabel} →
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-40 py-8">
        <div className="flex gap-8 items-start">

          {/* Sidebar */}
          <aside className="hidden lg:block shrink-0 w-[230px] sticky top-6 self-start">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 py-3 px-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
              <Sidebar
                activeCategoryIdParam={activeCategoryIdParam}
                slugMap={slugMap}
                groups={sidebarGroups}
                onSelect={handleCategory}
              />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Breadcrumb + Search */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="cursor-pointer hover:text-[#0C4DA2] transition-colors" onClick={() => handleCategory(null)}>{useTranslateText('Бүгд', lang).translated}</span>
                {activeLabel && (
                  <>
                    <span className="text-gray-300">/</span>
                    <span className="text-[#0C4DA2] font-semibold">{activeLabel}</span>
                  </>
                )}
              </div>
              <div className="relative w-full sm:w-56 shrink-0">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={useTranslateText('Мэдээ хайх', lang).translated + '...'}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                  className="text-black w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-full bg-white focus:outline-none focus:border-[#0C4DA2]"
                />
              </div>
            </div>

            {/* Mobile chips */}
            <div className="lg:hidden flex items-center gap-2 flex-wrap mb-5">
              <button
                onClick={() => handleCategory(null)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase transition-colors ${!activeCategoryIdParam ? "bg-[#0C4DA2] text-white" : "bg-white text-gray-600 border border-gray-300 hover:border-[#0C4DA2] hover:text-[#0C4DA2]"}`}
              >
                {useTranslateText('БҮГД', lang).translated}
              </button>
              {sidebarGroups.flatMap((g) => g.items.map((item) => ({ ...item, _gk: g.label }))).map((item) => {
                const slug = extractSlug(item.url);
                const catId = slug ? slugMap[slug] : null;
                return catId ? (
                  <button
                    key={`${item._gk}-${item._id}`}
                    onClick={() => handleCategory(catId)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase transition-colors ${activeCategoryIdParam === catId ? "bg-[#0C4DA2] text-white" : "bg-white text-gray-600 border border-gray-300 hover:border-[#0C4DA2] hover:text-[#0C4DA2]"}`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    key={`${item._gk}-${item._id}`}
                    href={item.url}
                    className="px-3 py-1.5 rounded-full text-[11px] font-bold uppercase bg-white text-gray-600 border border-gray-300 hover:border-[#0C4DA2] hover:text-[#0C4DA2] transition-colors"
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                    <div className="w-full aspect-video bg-gray-200" />
                    <div className="p-3">
                      <div className="h-3 bg-gray-200 rounded w-1/3 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-full mb-1" />
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <p className="text-center text-gray-400 py-16">{noNewsLabel}</p>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-8">
                  {posts.map((post: any) => (
                    <NewsCard key={post._id} post={post} activeCategoryId={activeCategoryIdParam} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pb-12">
                    <button onClick={() => goToPage(Math.max(1, page - 1))} disabled={page === 1} className="px-4 py-2 rounded-full text-sm font-semibold bg-white border border-gray-300 text-gray-600 hover:border-[#0C4DA2] hover:text-[#0C4DA2] disabled:opacity-30 disabled:cursor-not-allowed transition-colors">← {prevLabel}</button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button key={i} onClick={() => goToPage(i + 1)} className={`w-9 h-9 rounded-full text-sm font-bold transition-colors ${page === i + 1 ? "bg-[#0C4DA2] text-white" : "bg-white border border-gray-300 text-gray-600 hover:border-[#0C4DA2] hover:text-[#0C4DA2]"}`}>{i + 1}</button>
                    ))}
                    <button onClick={() => goToPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="px-4 py-2 rounded-full text-sm font-semibold bg-white border border-gray-300 text-gray-600 hover:border-[#0C4DA2] hover:text-[#0C4DA2] disabled:opacity-30 disabled:cursor-not-allowed transition-colors">{nextLabel} →</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function NewsPage() {
  return (
    <Suspense>
      <NewsPageInner />
    </Suspense>
  );
}
