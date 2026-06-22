import { cache } from "react";
import { print } from "graphql";
import queries from "@/app/graphql/cms/queries";

const API_URL =
  process.env.ERXES_API_URL ||
  "https://montsame.next.erxes.io/gateway/graphql";
const APP_TOKEN = process.env.ERXES_APP_TOKEN || "";

// Default ISR window: one upstream call per article per 60s, regardless of traffic.
const DEFAULT_REVALIDATE = 60;

const DETAIL_QUERY = print(queries.cmsPostDetail);

// Slim query for related news — no `content`, so the payload stays small.
const RELATED_QUERY = /* GraphQL */ `
  query RelatedPostList(
    $limit: Int
    $sortField: String
    $sortDirection: String
    $status: PostStatus
  ) {
    cpPostList(
      limit: $limit
      sortField: $sortField
      sortDirection: $sortDirection
      status: $status
    ) {
      posts {
        _id
        slug
        title
        excerpt
        videoUrl
        thumbnail {
          url
        }
        images {
          url
        }
        tags {
          _id
          name
        }
        categories {
          _id
          name
        }
      }
    }
  }
`;

export async function erxesFetch<T = any>(
  query: string,
  variables: Record<string, unknown>,
  revalidate: number = DEFAULT_REVALIDATE
): Promise<T | null> {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-app-token": APP_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.data as T) ?? null;
  } catch {
    return null;
  }
}

// `cache()` dedupes within a single request so generateMetadata + the page
// share one fetch; ISR (`next.revalidate`) caches across requests.
export const getPost = cache(async (slug: string) => {
  const data = await erxesFetch<{ cpPost: any }>(DETAIL_QUERY, { slug });
  return data?.cpPost ?? null;
});

export const getRelatedPosts = cache(
  async (title: string, currentId: string) => {
    if (!title) return [];

    const data = await erxesFetch<{ cpPostList: { posts: any[] } }>(
      RELATED_QUERY,
      {
        limit: 30,
        sortField: "createdAt",
        sortDirection: "DESC",
        status: "published",
      }
    );

    const all = data?.cpPostList?.posts || [];
    const words = title
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length >= 3);

    const score = (p: any) =>
      words.filter((w) =>
        ((p.title || "") + " " + (p.excerpt || "")).toLowerCase().includes(w)
      ).length;

    return all
      .filter((p) => p._id !== currentId && score(p) > 0)
      .sort((a, b) => score(b) - score(a))
      .slice(0, 3);
  }
);
