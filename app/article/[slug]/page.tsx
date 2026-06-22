import type { Metadata } from "next";
import ArticlePage from "@/app/components/Article/ArticlePage";
import { getPost } from "@/lib/erxes";

// ISR: serve a cached HTML/data snapshot, refresh at most once per minute.
export const revalidate = 60;

const IMG = (url: string) =>
  `https://montsame.next.erxes.io/gateway/read-file?key=${url}`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug); // deduped with the page render via cache()

  if (!post) return {};

  const imgUrl = post.thumbnail?.url ? IMG(post.thumbnail.url) : undefined;

  return {
    title: post.title,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: "article",
      images: imgUrl ? [imgUrl] : [],
    },
  };
}

export default async function ArticlePageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ArticlePage slug={slug} />;
}
