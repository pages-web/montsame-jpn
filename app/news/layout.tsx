import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Мэдээ | Монцамэ",
  description: "Монгол улсын мэдээллийн агентлаг МОНЦАМЭ-ийн мэдээний хуудас. Улс төр, нийгэм, эдийн засаг, спорт болон бусад мэдээнүүд.",
  openGraph: {
    title: "Мэдээ | Монцамэ",
    description: "Монгол улсын мэдээллийн агентлаг МОНЦАМЭ-ийн мэдээний хуудас.",
    siteName: "Монцамэ",
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
