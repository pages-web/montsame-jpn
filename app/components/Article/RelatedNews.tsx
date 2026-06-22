import Link from "next/link";
import { getRelatedPosts } from "@/lib/erxes";
import RelatedItem from "./RelatedItem";
import TranslatableText from "./TranslatableText";

export default async function RelatedNews({
  title,
  currentId,
}: {
  title: string;
  currentId: string;
}) {
  const posts = await getRelatedPosts(title, currentId);

  if (!posts.length) return null;

  return (
    <section className="mt-10 pt-6 border-t border-gray-200">
      <TranslatableText
        as="h2"
        text="Холбоотой мэдээ"
        className="text-[1.5rem] font-bold text-[#0C4DA2] mb-6 block"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 items-start">
        {posts.map((item: any) => (
          <RelatedItem key={item._id} item={item} />
        ))}
      </div>
      <div className="text-center mt-6">
        <Link href="/news" className="text-[13px] font-semibold text-gray-700 hover:text-[#0C4DA2] transition-colors">
          <TranslatableText text="дэлгэрэнгүй" /> ↗
        </Link>
      </div>
    </section>
  );
}
