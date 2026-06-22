"use client";

import Image from "next/image";
import { Facebook, Linkedin, Youtube, Instagram } from "lucide-react";
import { useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
import queries from "@/app/graphql/cms/queries";
import { useLang } from "../Header/LangContext";
import { useTranslateText } from "../Header/useTranslate";

const col2 = {
  title: "Хөгжлийн төслүүд",
  links: [
    { label: "Үндэсний хөдөлгөөн", url: "/news?categoryId=QTa9woTm47--XdCB1OKta" },
    { label: "Тойм",                url: "/news?categoryId=YbR8wobCtvEfajfBKzfTj" },
    { label: "Монгол хэмнэл",      url: "/news?categoryId=4M_WVNWKjU1vGVYiBgE8-" },
    { label: "Видео",               url: "/video" },
    { label: "Гэрэл зураг",        url: "/news" },
    { label: "Рийл",                url: "/news" },
  ],
};

const col3 = [
  { label: "Улс төр",                   url: "/news?categoryId=X3hU_0GHy3hgTft0LX0L2" },
  { label: "Эдийн засаг",               url: "/news" },
  { label: "Нийгэм",                    url: "/news" },
  { label: "Хууль, эрх зүй",           url: "/news" },
  { label: "Байгаль орчин, экологи",   url: "/news" },
  { label: "Аялал жуулчлал",           url: "/news?categoryId=s9pxcf-65qz0EQYIunJWX" },
  { label: "Уул уурхай",               url: "/news" },
  { label: "Боловсрол, шинжлэх ухаан", url: "/news?categoryId=grGyVXpwZlxcam0ryxZwr" },
  { label: "Соёл урлаг",               url: "/news?categoryId=4sSZaD9LZeufga9HhhocD" },
  { label: "Түүх, өв соёл",            url: "/news" },
  { label: "Спорт",                     url: "/news?categoryId=Ayw0kqgMpAWf20QG1UXwV" },
  { label: "Эрүүл мэнд",               url: "/news" },
  { label: "Ярилцлага",                url: "/news" },
  { label: "Нийтлэл",                  url: "/news" },
  { label: "Тодруулга",                url: "/news" },
];

const col4 = {
  title: "Дэлхийн мэдээ",
  links: [
    { label: "Улс төр",                   url: "/news?categoryId=LHN6rcsb-y1JL2ut_pqPo" },
    { label: "Эдийн засаг",               url: "/news?categoryId=h9GMj9uV-5z9uOm1MwOwc" },
    { label: "Байгаль, экологи",          url: "/news?categoryId=TJRjWuaWHj7zElWgKF5XL" },
    { label: "Шинжлэх ухаан, технологи", url: "/news?categoryId=Rug65FVwgoJu2qTLyMZS_" },
    { label: "Боловсрол",                 url: "/news?categoryId=T8A1Uwcf7hmIE8Kvlv2pY" },
    { label: "Спорт",                     url: "/news?categoryId=ll38F6Ll3Vli2YBcZN0bT" },
    { label: "Эрүүл мэнд",               url: "/news?categoryId=EFaPd2_of8Hl4dBstwjIW" },
    { label: "Урлаг соёл",               url: "/news?categoryId=s_EFL-mTZKQrTZahl8W5N" },
    { label: "Инфографик",               url: "/news?categoryId=F3CD6GD2JGNoiX035rM7J" },
  ],
};

const col5left = [
  "Архангай",
  "Баян-Өлгий",
  "Баянхонгор",
  "Булган",
  "Говь-Алтай",
  "Говьсүмбэр",
  "Дархан-Уул",
  "Дорнод",
  "Дорноговь",
  "Дундговь",
  "Завхан",
];

const col5right = [
  "Орхон",
  "Өвөрхангай",
  "Өмнөговь",
  "Сүхбаатар",
  "Сэлэнгэ",
  "Төв",
  "Увс",
  "Ховд",
  "Хөвсгөл",
  "Хэнтий",
];

function useAnalytics() {
  const [stats, setStats] = useState<any>(null);
  useEffect(() => {
    fetch("/api/analytics")
      .then((r) => r.json())
      .then((d) => {
        if (!d.error) setStats(d);
      })
      .catch(() => {});
  }, []);
  return stats;
}

export default function Footer() {
  const stats = useAnalytics();
  const { lang } = useLang();
  const { data } = useQuery(queries.cmsMenuList, {
    variables: { kind: "footer", limit: 100 },
  });
  const footerMenus: { _id: string; label: string; url: string }[] =
    (data as any)?.cpCmsMenuList || [];


  return (
    <footer className="w-full bg-[#0C4DA2] text-white">
      {/* ── MAIN CONTENT ── */}
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-40 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── LEFT PANEL ── */}
          <div className="shrink-0 w-full lg:w-[180px] flex flex-col items-center gap-3">
            {/* Logo */}
            <div className="flex flex-col items-center">
              <Image
                src="/images/Montsamelogo.png"
                alt="MONTSAME"
                width={140}
                height={140}
                className="object-contain"
              />
            </div>

            {/* Social */}
            <div className="w-full">
              <p className="text-white text-[11px] not-italic font-bold leading-4 uppercase text-center">
                {useTranslateText('Бидэнтэй нэгдэх', lang).translated}
              </p>
              <div className="flex items-center justify-center gap-3 mt-2">
                <a
                  href="https://www.facebook.com/montsame.agency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <Facebook size={20} strokeWidth={1.5} />
                </a>
                <a
                  href="https://x.com/montsameMN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/montsame-news-agency/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <Linkedin size={20} strokeWidth={1.5} />
                </a>
                <a
                  href="https://www.youtube.com/@MonTsaMeAgency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <Youtube size={20} strokeWidth={1.5} />
                </a>
                <a
                  href="https://www.instagram.com/montsame_agency/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <Instagram size={20} strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="w-full">
              <p className="text-white text-[10px] font-extrabold leading-4 uppercase text-center tracking-widest mb-2">
                {useTranslateText('Хандалт', lang).translated}
              </p>
              <div className="grid grid-cols-3 gap-px rounded overflow-hidden text-[9px] font-bold text-white">
                <div className="bg-[#FAAF40] py-1 flex items-center justify-center tracking-wide">
                  {useTranslateText('ӨНӨӨДӨР', lang).translated}
                </div>
                <div className="bg-gray-400 py-1 flex items-center justify-center">
                  {stats?.yesterday?.label ?? "—"}
                </div>
                <div className="bg-gray-500 py-1 flex items-center justify-center">
                  {stats?.dayBefore?.label ?? "—"}
                </div>
                <div className="bg-[#C6862E] py-1 flex items-center justify-center">
                  {stats?.today?.count?.toLocaleString() ?? "—"}
                </div>
                <div className="bg-gray-500 py-1 flex items-center justify-center">
                  {stats?.yesterday?.count?.toLocaleString() ?? "—"}
                </div>
                <div className="bg-gray-600 py-1 flex items-center justify-center">
                  {stats?.dayBefore?.count?.toLocaleString() ?? "—"}
                </div>
              </div>
            </div>
          </div>

          {/* ── LINK COLUMNS ── */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {/* Col 1 */}
            <div>
              <h3
                className="mb-2"
                style={{
                  fontFamily: '"Noto Sans", sans-serif',
                  fontSize: "10px",
                  fontWeight: 800,
                  lineHeight: "16px",
                  textTransform: "uppercase",
                  color: "#FFF",
                }}
              >
                {useTranslateText('Монгол улсын тухай', lang).translated}
              </h3>
              <ul className="list-none p-0 m-0">
                {footerMenus.map((item) => (
                  <li key={item._id}>
                    <a
                      href={item.url}
                      style={{
                        fontFamily: '"Noto Sans", sans-serif',
                        fontSize: "10px",
                        fontWeight: 800,
                        lineHeight: "16px",
                        textTransform: "uppercase",
                        color: "#FFF",
                        display: "block",
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3
                className="mb-2"
                style={{
                  fontFamily: '"Noto Sans", sans-serif',
                  fontSize: "10px",
                  fontWeight: 800,
                  lineHeight: "16px",
                  textTransform: "uppercase",
                  color: "#FFF",
                }}
              >
                {useTranslateText('Монголын мэдээ', lang).translated}
              </h3>
              <ul className="list-none p-0 m-0">
                {col3.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.url}
                      style={{
                        fontFamily: '"Noto Sans", sans-serif',
                        fontSize: "10px",
                        fontWeight: 300,
                        lineHeight: "16px",
                        textTransform: "uppercase",
                        color: "#FFF",
                        display: "block",
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 2 */}
            <div>
              <h3
                className="mb-2"
                style={{
                  fontFamily: '"Noto Sans", sans-serif',
                  fontSize: "10px",
                  fontWeight: 800,
                  lineHeight: "16px",
                  textTransform: "uppercase",
                  color: "#FFF",
                }}
              >
                {useTranslateText(col2.title, lang).translated}
              </h3>
              <ul className="list-none p-0 m-0">
                {col2.links.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.url}
                      style={{
                        fontFamily: '"Noto Sans", sans-serif',
                        fontSize: "10px",
                        fontWeight: 300,
                        lineHeight: "16px",
                        textTransform: "uppercase",
                        color: "#FFF",
                        display: "block",
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h3
                className="mb-2"
                style={{
                  fontFamily: '"Noto Sans", sans-serif',
                  fontSize: "10px",
                  fontWeight: 800,
                  lineHeight: "16px",
                  textTransform: "uppercase",
                  color: "#FFF",
                }}
              >
                {useTranslateText(col4.title, lang).translated}
              </h3>
              <ul className="list-none p-0 m-0">
                {col4.links.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.url}
                      style={{
                        fontFamily: '"Noto Sans", sans-serif',
                        fontSize: "10px",
                        fontWeight: 300,
                        lineHeight: "16px",
                        textTransform: "uppercase",
                        color: "#FFF",
                        display: "block",
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 5 — 2 sub-cols */}
            <div>
              <h3
                className="mb-2"
                style={{
                  fontFamily: '"Noto Sans", sans-serif',
                  fontSize: "10px",
                  fontWeight: 800,
                  lineHeight: "16px",
                  textTransform: "uppercase",
                  color: "#FFF",
                }}
              >
                {useTranslateText('Орон нутгийн мэдээ', lang).translated}
              </h3>
              <div className="grid grid-cols-2 gap-x-3">
                <ul className="list-none p-0 m-0">
                  {col5left.map((item) => (
                    <li key={item}>
                      <a
                        href={`/news?aimag=${encodeURIComponent(item)}`}
                        style={{
                          fontFamily: '"Noto Sans", sans-serif',
                          fontSize: "10px",
                          fontWeight: 300,
                          lineHeight: "16px",
                          textTransform: "uppercase",
                          color: "#FFF",
                          display: "block",
                        }}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
                <ul className="list-none p-0 m-0">
                  {col5right.map((item) => (
                    <li key={item}>
                      <a
                        href={`/news?aimag=${encodeURIComponent(item)}`}
                        style={{
                          fontFamily: '"Noto Sans", sans-serif',
                          fontSize: "10px",
                          fontWeight: 300,
                          lineHeight: "16px",
                          textTransform: "uppercase",
                          color: "#FFF",
                          display: "block",
                        }}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="w-full bg-[#083d7a] py-3 border-t border-white">
        <div className="max-w-[1600px] mx-auto px-40 flex flex-col lg:flex-row justify-between items-center gap-2 text-[11px] text-blue-200">
          <p>
            {useTranslateText('Монгол Улс, Улаанбаатар хот, Чингэлтэй дүүрэг, Б.Жигжиджавын гудамж-8, Индекс-15160, Ш/х-1514, info@montsame.gov.mn', lang).translated}
          </p>
          <p className="whitespace-nowrap">{useTranslateText('Мэдээллийн МОНЦАМЭ агентлаг ©2025', lang).translated}</p>
        </div>
      </div>
    </footer>
  );
}
