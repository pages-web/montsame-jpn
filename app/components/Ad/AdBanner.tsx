"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import queries from "@/app/graphql/cms/queries";
import { useLang } from "../Header/LangContext";
import { useTranslateText } from "../Header/useTranslate";

const IMG = (url: string) =>
  `https://montsame.next.erxes.io/gateway/read-file?key=${url}`;

export default function AdBanner() {
  const { lang } = useLang();
  const { translated: altText } = useTranslateText('Зар сурталчилгаа', lang);
  const { data } = useQuery(queries.cmsAdList, {
    variables: { categoryIds: ["X_-C2WXMy8MgnMU_lTrJ4"] },
  });

  const ads = (data as any)?.cpPostList?.posts || [];

  if (!ads.length) return null;

  return (
    <div className="w-full bg-[#f5f6f8] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-40 py-3 flex flex-col gap-3">
      {ads.map((ad: any) => (
        <Link
          key={ad._id}
          href={ad.videoUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          {ad.thumbnail?.url ? (
            <Image
              src={IMG(ad.thumbnail.url)}
              alt={altText}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-[#f5f6f8] flex items-center justify-center text-gray-400 text-sm"></div>
          )}
        </Link>
      ))}
    </div>
  );
}
