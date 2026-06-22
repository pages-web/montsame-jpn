import { redirect } from "next/navigation";

async function getCategoryBySlug(slug: string) {
  try {
    const res = await fetch("https://montsame.next.erxes.io/gateway/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            cpCategories {
              list { _id slug }
            }
          }
        `,
      }),
      next: { revalidate: 3600 },
    });
    const json = await res.json();
    const list = json?.data?.cpCategories?.list || [];
    return list.find((c: any) => c.slug === slug) || null;
  } catch {
    return null;
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (category?._id) {
    redirect(`/news?categoryId=${category._id}`);
  }

  redirect("/news");
}
