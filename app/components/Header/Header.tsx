"use client";

import Image from "next/image";
import { Facebook, Instagram, Linkedin, Youtube, Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudDrizzle, Wind, CloudFog } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { SearchIcon, SearchOverlay } from "./SearchBar";
import { useQuery } from "@apollo/client/react";
import queries from "@/app/graphql/cms/queries";
import { LangProvider, useLang, LANGUAGES, type LangCode } from "./LangContext";

type MenuItem = { _id: string; label: string; url: string; parentId?: string; kind?: string };

// ── Dropdown ──────────────────────────────────────────────────────
function Dropdown({
  hoveredNav,
  setHoveredNav,
  subNav,
}: {
  hoveredNav: string | null;
  setHoveredNav: (v: string | null) => void;
  subNav: Record<string, MenuItem[]>;
}) {
  if (!hoveredNav || !subNav[hoveredNav]?.length) return null;
  const items = subNav[hoveredNav];
  const cols = items.length > 8 ? 4 : items.length > 4 ? 3 : 2;
  return (
    <div
      className="absolute left-0 right-0 bg-white shadow-xl z-50 border-t-2 border-[#0C4DA2]"
      onMouseEnter={() => setHoveredNav(hoveredNav)}
      onMouseLeave={() => setHoveredNav(null)}
    >
      <div className="max-w-[1600px] mx-auto px-16 py-5">
        <div
          className="grid gap-x-8 gap-y-1"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {items.map((sub) => (
            <a
              key={sub._id}
              href={sub.url || "#"}
              className="flex items-center gap-2 px-2 py-2 text-[13px] text-gray-600 hover:text-[#0C4DA2] hover:bg-blue-50 rounded transition-all group border-b border-gray-100"
            >
              <span className="w-1 h-1 rounded-full bg-[#0C4DA2] opacity-40 group-hover:opacity-100 shrink-0" />
              {sub.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Цаг агаарын icon ──────────────────────────────────────────────
function WeatherIcon({ code }: { code: number | null }) {
  const cls = "w-4 h-4 opacity-80";
  if (!code) return <Cloud className={cls} />;
  if ([200, 386, 389, 392, 395].includes(code)) return <CloudLightning className={cls} />;
  if ([179, 182, 185, 227, 230, 323, 326, 329, 332, 335, 338, 350, 362, 365, 368, 371, 374, 377].includes(code)) return <CloudSnow className={cls} />;
  if ([263, 266, 353].includes(code)) return <CloudDrizzle className={cls} />;
  if ([176, 293, 296, 299, 302, 305, 308, 356, 359].includes(code)) return <CloudRain className={cls} />;
  if ([143, 248, 260].includes(code)) return <CloudFog className={cls} />;
  if ([119, 122].includes(code)) return <Cloud className={cls} />;
  if (code === 116) return <Sun className={`${cls} text-yellow-300`} />;
  if (code === 113) return <Sun className={`${cls} text-yellow-300`} />;
  return <Cloud className={cls} />;
}

// ── Цаг агаар + Валют ─────────────────────────────────────────────
function useWeatherCurrency() {
  const [temp, setTemp] = useState<number | null>(null);
  const [usdToMnt, setUsdToMnt] = useState<number | null>(null);
  const [weatherCode, setWeatherCode] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/weather-currency")
      .then((r) => r.json())
      .then((d) => {
        if (d.temp !== null) setTemp(d.temp);
        if (d.usdToMnt !== null) setUsdToMnt(Math.round(d.usdToMnt));
        if (d.weatherCode !== null) setWeatherCode(d.weatherCode);
      })
      .catch(() => {});
  }, []);

  return { temp, usdToMnt, weatherCode };
}

// ── Хэл сонгогч ───────────────────────────────────────────────────
function LangSwitcher() {
  const { lang, switchLang } = useLang();

  return (
    <div className="hidden md:flex items-center gap-4 text-[13px] mt-5">
      {LANGUAGES.map((l: { label: string; code: LangCode }) => (
        <button
          key={l.code}
          onClick={() => switchLang(l.code)}
          className={`cursor-pointer whitespace-nowrap transition-colors bg-transparent border-none p-0 ${
            lang === l.code
              ? "text-white font-bold"
              : "text-white/70 hover:text-white"
          }`}
        >
          {l.label}
        </button>
      ))}
      <a
        href="https://hunbichig.montsame.mn/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/images/mongolBichig.png"
          alt="Монгол бичиг"
          width={27}
          height={27}
          className="object-contain opacity-80 hover:opacity-100 cursor-pointer"
        />
      </a>
    </div>
  );
}

// ── 1. ҮНДСЭН HEADER ──────────────────────────────────────────────
function HeaderFull({
  navLinks,
  subNav,
  onSearchOpen,
}: {
  navLinks: MenuItem[];
  subNav: Record<string, MenuItem[]>;
  onSearchOpen: () => void;
}) {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const { temp, usdToMnt, weatherCode } = useWeatherCurrency();

  return (
    <>
      <header
        className="bg-[#0C4DA2] text-white relative shadow-md"
        onMouseLeave={() => setHoveredNav(null)}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-40">
          <div className="flex items-stretch gap-8">
            {/* Лого */}
            <Link
              href="/"
              className="shrink-0 hover:opacity-90 transition-opacity flex items-center py-3"
            >
              <Image
                src="/images/Montsamelogo.png"
                alt="MONTSAME"
                width={127}
                height={116}
                className="object-contain"
              />
            </Link>

            {/* Баруун: дээр хэл/цаг/сошиал — доор nav */}
            <div className="flex flex-col flex-1 min-w-0">
              {/* Дээд utility мөр */}
              <div className="flex items-center h-[48px]">
                {/* Хэл сонгогч — Context-тэй */}
                <LangSwitcher />

                {/* Цаг/Валют/Сошиал */}
                <div className="hidden lg:flex items-center gap-4 text-[13px] text-white/80 ml-auto shrink-0 mt-5">
                  <div className="flex items-center gap-2">
                    <WeatherIcon code={weatherCode} />
                    <span>Улаанбаатар</span>
                    <span className="text-orange-300 font-semibold">
                      {temp !== null ? `${temp} °C` : "-- °C"}
                    </span>
                  </div>
                  <span className="w-px h-4 bg-white/20" />
                  <div className="flex items-center gap-2">
                    <span>🇺🇸</span>
                    <span>USD</span>
                    <span className="text-white font-semibold">
                      {usdToMnt !== null ? `${usdToMnt.toLocaleString()}₮` : "---₮"}
                    </span>
                  </div>
                  <span className="w-px h-4 bg-white/20" />
                  <div className="flex items-center gap-3">
                    <a href="https://www.facebook.com/montsame.agency" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                      <Facebook size={15} strokeWidth={1.5} />
                    </a>
                    <a href="https://x.com/montsameMN" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                      <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a href="https://www.linkedin.com/company/montsame-news-agency/d" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                      <Linkedin size={15} strokeWidth={1.5} />
                    </a>
                    <a href="https://www.youtube.com/@MonTsaMeAgency" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                      <Youtube size={15} strokeWidth={1.5} />
                    </a>
                    <a href="https://www.instagram.com/montsame_agency/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                      <Instagram size={15} strokeWidth={1.5} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Nav мөр */}
              <nav className="flex items-center gap-6 h-[52px] mt-10">
                {navLinks.map((item) => (
                  <div
                    key={item._id}
                    className="relative h-[52px] flex items-center"
                    onMouseEnter={() => setHoveredNav(subNav[item._id]?.length ? item._id : null)}
                  >
                    <a
                      href={item.url || `/news?cat=${encodeURIComponent(item.label)}`}
                      className={`whitespace-nowrap transition-colors ${
                        hoveredNav === item._id ? "text-white" : "text-white/85 hover:text-white"
                      }`}
                      style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: "14px", fontWeight: 700, lineHeight: "50px" }}
                    >
                      {item.label}
                    </a>
                    {hoveredNav === item._id && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-t" />
                    )}
                  </div>
                ))}
                <div className="ml-auto shrink-0">
                  <SearchIcon onClick={onSearchOpen} />
                </div>
              </nav>
            </div>
          </div>
        </div>

        <Dropdown hoveredNav={hoveredNav} setHoveredNav={setHoveredNav} subNav={subNav} />
      </header>
    </>
  );
}

// ── 2. COMPACT HEADER ─────────────────────────────────────────────
function HeaderCompact({
  visible,
  navLinks,
  subNav,
  onSearchOpen,
}: {
  visible: boolean;
  navLinks: MenuItem[];
  subNav: Record<string, MenuItem[]>;
  onSearchOpen: () => void;
}) {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  return (
    <>
      <header
        className={`bg-[#0C4DA2] text-white fixed top-0 left-0 right-0 z-50 shadow-lg transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
        onMouseLeave={() => setHoveredNav(null)}
      >
        <div className="max-w-[1600px] mx-auto px-10">
          <div className="flex items-center h-[60px]">
            <nav className="flex items-center gap-6 flex-1 justify-center">
              <Link href="/" className="shrink-0 mr-6 hover:opacity-80 transition-opacity">
                <Image src="/images/Montsamelogo.png" alt="MONTSAME" width={60} height={60} className="object-contain" />
              </Link>
              {navLinks.map((item) => (
                <div
                  key={item._id}
                  className="relative h-[52px] flex items-center"
                  onMouseEnter={() => setHoveredNav(subNav[item._id]?.length ? item._id : null)}
                >
                  <a
                    href={item.url || `/news?cat=${encodeURIComponent(item.label)}`}
                    className={`text-[13px] font-semibold whitespace-nowrap transition-colors ${
                      hoveredNav === item._id ? "text-white" : "text-white/85 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </a>
                  {hoveredNav === item._id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-t" />
                  )}
                </div>
              ))}
              <div className="ml-4 shrink-0">
                <SearchIcon onClick={onSearchOpen} />
              </div>
            </nav>
          </div>
        </div>
        <Dropdown hoveredNav={hoveredNav} setHoveredNav={setHoveredNav} subNav={subNav} />
      </header>
    </>
  );
}

// ── MAIN EXPORT ───────────────────────────────────────────────────
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { data } = useQuery(queries.cmsMenuList, {
    variables: { kind: "header", limit: 100, orderBy: { order: 1 } },
    fetchPolicy: "network-only",
  });

  const allMenus: MenuItem[] = (data as any)?.cpCmsMenuList || [];
  const navLinks = allMenus.filter((m) => !m.parentId);
  const subNav: Record<string, MenuItem[]> = {};
  navLinks.forEach((item) => {
    const children = allMenus.filter((m) => m.parentId === item._id);
    if (children.length > 0) subNav[item._id] = children;
  });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 160);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Suspense>
      <HeaderFull navLinks={navLinks} subNav={subNav} onSearchOpen={() => setSearchOpen(true)} />
      <HeaderCompact visible={isScrolled} navLinks={navLinks} subNav={subNav} onSearchOpen={() => setSearchOpen(true)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </Suspense>
  );
}