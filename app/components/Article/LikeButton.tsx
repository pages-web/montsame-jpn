"use client";

import { useEffect, useState } from "react";
import { ThumbsUp } from "lucide-react";
import { useMutation } from "@apollo/client/react";
import mutations from "@/app/graphql/cms/mutations";

export default function LikeButton({
  postId,
  initialCount,
}: {
  postId: string;
  initialCount: number;
}) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [react] = useMutation(mutations.cmsPostReact);

  useEffect(() => {
    setLiked(localStorage.getItem(`liked_${postId}`) === "true");
  }, [postId]);

  const handleLike = () => {
    const next = !liked;
    setLiked(next);
    setCount((c) => c + (next ? 1 : -1));
    localStorage.setItem(`liked_${postId}`, String(next));
    react({
      variables: { id: postId, reaction: "like", action: next ? "add" : "remove" },
    }).catch(() => {});
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-1.5 px-4 py-2 rounded text-sm font-semibold transition-colors ${
        liked
          ? "bg-[#faaf40] text-white hover:bg-[#e09a30]"
          : "bg-[#0C4DA2] text-white hover:bg-[#0a3d82]"
      }`}
    >
      <ThumbsUp size={14} /> {count > 0 ? count : "Like"}
    </button>
  );
}
