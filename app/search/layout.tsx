import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Хайлт | Монцамэ",
  description: "Монцамэ мэдээний сайтаас мэдээ хайх.",
  openGraph: {
    title: "Хайлт | Монцамэ",
    description: "Монцамэ мэдээний сайтаас мэдээ хайх.",
    siteName: "Монцамэ",
  },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
