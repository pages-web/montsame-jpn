"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "../components/Header/LangContext";
import { useTranslateText } from "../components/Header/useTranslate";

export default function AboutPage() {
  const { lang } = useLang();
  const { translated: sinceLabel } = useTranslateText('1921 оноос хойш', lang);
  const { translated: heroTitle1 } = useTranslateText('Үндэсний мэдээллийн', lang);
  const { translated: heroTitle2 } = useTranslateText('МОНЦАМЭ', lang);
  const { translated: heroTitle3 } = useTranslateText('агентлаг', lang);
  const { translated: heroDesc } = useTranslateText('Монгол Улсыг дэлхий нийтэд сурталчлах болон дэлхий дахины мэдээллийг монголчуудад хүргэх хамгийн шуурхай, үр дүнтэй, баталгаатай эх сурвалж.', lang);
  const { translated: contactBtn } = useTranslateText('Холбоо барих', lang);
  const { translated: advertiseBtn } = useTranslateText('Сурталчилгаа', lang);
  const { translated: stat1 } = useTranslateText('Үүсгэн байгуулагдсан', lang);
  const { translated: stat2 } = useTranslateText('Хэвлэн гарган байгаа хэл', lang);
  const { translated: stat3 } = useTranslateText('Аймаг дахь сурвалжлагч', lang);
  const { translated: stat4 } = useTranslateText('Гадаад агентлагтай хамтралт', lang);
  const { translated: videoTitle } = useTranslateText('МОНЦАМЭ агентлаг', lang);
  const { translated: mainContent } = useTranslateText('Үндэсний мэдээллийн МОНЦАМЭ агентлаг нь 1921 онд МОНТА буюу Монголын цахилгаан мэдээ нэртэй байгуулагдсан цагаасаа тасралтгүй үйл ажиллагаагаа явуулж ирсэн мэдээллийн ууган байгууллага бөгөөд Монгол Улсыг дэлхий нийтэд сурталчлах болон дэлхий дахины мэдээллийг монголчуудад хүргэх хамгийн шуурхай, үр дүнтэй, баталгаатай эх сурвалж юм.', lang);
  const { translated: section1Title } = useTranslateText('Үйл ажиллагааны үндсэн чиглэл', lang);
  const { translated: p1Label } = useTranslateText('-- Нэгдүгээрт --', lang);
  const { translated: p1Text } = useTranslateText('Монгол Улсын төр, засгийн удирдлага ба төв байгууллагууд, хэвлэл мэдээллийн хэрэгслүүд, өргөн олон нийтийг улс орны дотоод амьдралын шуурхай мэдээллээр хангах ба,', lang);
  const { translated: p2Label } = useTranslateText('-- Хоёрдугаарт --', lang);
  const { translated: p2Text } = useTranslateText('гадаад ертөнц, олон улсын хэмжээнд болж байгаа үйл явдлын мэдээллээр хангах,', lang);
  const { translated: p3Label } = useTranslateText('-- Гуравдугаарт --', lang);
  const { translated: p3Text } = useTranslateText('Монгол Улсын гадаад, дотоод бодлого, дотоодын үйл явдал, улс орны хөгжил дэвшлийг гадаадад мэдээлэх, сурталчилан таниулах явдал болно.', lang);
  const { translated: section2Title } = useTranslateText('Хамтын ажиллагаа', lang);
  const { translated: cooperationText } = useTranslateText('МОНЦАМЭ агентлаг Ази, Номхон далайн бүс нутгийн орнуудын мэдээллийн агентлагуудын нэгдсэн байгууллага ОАНА-ын гишүүний хувьд гишүүн агентлагуудтай тогтмол мэдээлэл солилцож, Монгол Улсад болж буй үйл явдлын тухай мэдээ мэдээллийг өдөр тутам ОАНА-ын мэдээллийн нэгдсэн санд нийлүүлж байдаг.', lang);
  const { translated: cooperationText2 } = useTranslateText('Манай агентлаг ОХУ-ын ИТАР-ТАСС, Риа-Новости, Их Британийн Ройтерс, БНХАУ-ын Синьхуа, БНСУ-ын ЁНАП, БНСВУ-ын ВМА, БНКУ-ын Пренса Латина, БНПУ-ын ПАП, БНБУ-ын БТА, БНТУ-ын Анадолу, Украин Улсын Укринформ, Америкийн дуу хоолой, Азербайжан улсын Азертак, Казахстан улсын Казинформ, Иран улсын Мер, БНАСАУ-ын Цахилгаан мэдээний төв агентлаг зэрэг мэдээллийн агентлагтай хамтын ажиллагааны гэрээ байгуулан ажиллаж байна. МОНЦАМЭ агентлаг нь нийслэл Улаанбаатар хот, 21 аймаг болон ОХУ-ын Москва, БНХАУ-ын Бээжин хотод байнгын сурвалжлагчтай.', lang);
  const { translated: section3Title } = useTranslateText('МОНЦАМЭ агентлаг өнөөдөр', lang);
  const { translated: domesticLabel } = useTranslateText('-- Дотоодын уншигчдад зориулан --', lang);
  const { translated: domesticItem1 } = useTranslateText('Өдөр тутам монгол, англи, орос, хятад, япон 5 хэлээр дотоод, гадаад мэдээллийн цахим хуудас', lang);
  const { translated: domesticItem2 } = useTranslateText('Долоо хоног тутам монгол бичгээр "Хүмүүн бичиг" сонин', lang);
  const { translated: foreignLabel } = useTranslateText('-- Гадаадын уншигчдад зориулан --', lang);
  const { translated: foreignItem1 } = useTranslateText('Өдөр тутам англи, орос хэлээр "MONTSAME Daily News", "МОНЦАМЭ Новости" товхимол', lang);
  const { translated: foreignItem2 } = useTranslateText('Долоо хоног тутмын "Новости Монголии" сонин (орос хэлээр)', lang);
  const { translated: foreignItem3 } = useTranslateText('Долоо хоног тутмын "The Mongol Messenger" сонин (англи хэлээр)', lang);
  const { translated: foreignItem4 } = useTranslateText('Долоо хоног тутмын "Мэнгу сяосибао" сонин (хятад хэлээр)', lang);
  const { translated: foreignItem5 } = useTranslateText('Долоо хоног тутмын "Монгору Цушин" сонин (япон хэлээр)', lang);
  const { translated: foreignItem6 } = useTranslateText('Улирал тутам хэвлэгдэн гардаг "Mongolia Today" сэтгүүл (англи хэлээр)', lang);
  const { translated: foreignItem7 } = useTranslateText('Жил бүр шинэчлэн хэвлэдэг "Mongolia" ном (англи хэлээр)', lang);
  const { translated: section4Title } = useTranslateText('Бусад үйлчилгээ', lang);
  const { translated: service1Label } = useTranslateText('-- Гэрэл зургийн студи --', lang);
  const { translated: service1Text } = useTranslateText('Агентлагийн фото студи нь улс оронд болж буй чухал үйл явдлуудыг гэрэл зургийн хальсанд буулган, Монгол Улсын архивын гэрэл зургийн санг баяжуулахын зэрэгцээ дотоод, гадаадын захиалгат хэрэглэгчдийг гэрэл зургийн мэдээллээр хангаж, гэрэл зургийн самбараар тогтмол сурталчилгаа хийж байна.', lang);
  const { translated: service2Label } = useTranslateText('-- МОНЦАМЭ мэдээллийн төв --', lang);
  const { translated: service2Text } = useTranslateText('Манай агентлагийн мэдээллийн төв нь хэвлэлийн бага хурал зохион байгуулахыг хүссэн албан байгууллага болон хувь хүмүүст нээлттэй. Тус төв нь хотын төвд байрлалтай, мэдээллийн гол гол эх сурвалжид ойр дөт байдгаараа онцлог, давуу талтай.', lang);
  const { translated: service3Label } = useTranslateText('-- Хэвлэх үйлдвэр --', lang);
  const { translated: service3Text } = useTranslateText('Манай агентлаг дотоод, гадаад сурталчилгааны зориулалтаар гаргаж буй бүх сонин хэвлэл, ном товхимлоо өөрийн хэвлэх үйлдвэрт хэвлэдэг. Энд мөн гадны байгууллага, хувь хүмүүсийн захиалгат материалыг хэвлэх, хэвлэлийн эх бэлтгэж өгөх бүрэн боломжтой юм.', lang);

  const stats = [
    { label: stat1, value: "1921" },
    { label: stat2, value: "5" },
    { label: stat3, value: "21" },
    { label: stat4, value: "16+" },
  ];

  return (
    <main className="w-full min-h-screen bg-[#f5f6f8]">

      {/* Hero */}
      <div className="relative bg-[#0C4DA2] overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#083d7a] to-transparent" />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-[#faaf40] rounded-full" />
                <span className="text-white/80 text-xs font-semibold tracking-widest uppercase">{sinceLabel}</span>
              </div>
              <h1 className="font-serif text-[3rem] font-bold leading-[110%] text-white mb-6">
                {heroTitle1}<br />
                <span className="text-[#faaf40]">{heroTitle2}</span> {heroTitle3}
              </h1>
              <p className="text-white/70 text-base leading-7 max-w-lg mb-8">
                {heroDesc}
              </p>
              <div className="flex gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-[#faaf40] text-[#183354] px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#e09a30] transition-colors">
                  {contactBtn}
                </Link>
                <Link href="/advertise" className="inline-flex items-center gap-2 bg-white/10 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-white/20 transition-colors border border-white/20">
                  {advertiseBtn}
                </Link>
              </div>
            </div>
            <div className="shrink-0 relative">
              <div className="w-52 h-52 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                <Image src="/images/Montsamelogo.png" alt="MONTSAME" width={140} height={140} className="object-contain" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-[#faaf40] rounded-full flex items-center justify-center">
                <span className="text-[#183354] font-serif font-black text-xs text-center leading-tight">103<br />жил</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Статистик */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {stats.map((s) => (
              <div key={s.label} className="text-center py-8 px-4">
                <p className="font-serif text-[2.8rem] font-black text-[#0C4DA2] leading-none">{s.value}</p>
                <p className="text-[11px] text-gray-400 mt-2 uppercase tracking-widest font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* YouTube видео */}
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="rounded-xl overflow-hidden shadow-sm aspect-video">
          <iframe
            src="https://www.youtube.com/embed/wjTb_0FgvXU"
            className="w-full h-full"
            allowFullScreen
            title={videoTitle}
          />
        </div>
      </div>

      {/* Үндсэн агуулга */}
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-white rounded-xl shadow-sm px-10 py-12">

          <p className="text-gray-700 text-[15px] leading-8 mb-8 text-justify">
            {mainContent}
          </p>

          <h2 className="font-bold text-[#183354] text-[15px] mb-4">{section1Title}</h2>

          <p className="text-gray-500 text-[14px] italic mb-1">{p1Label}</p>
          <p className="text-gray-700 text-[15px] leading-8 mb-5 text-justify">{p1Text}</p>

          <p className="text-gray-500 text-[14px] italic mb-1">{p2Label}</p>
          <p className="text-gray-700 text-[15px] leading-8 mb-5 text-justify">{p2Text}</p>

          <p className="text-gray-500 text-[14px] italic mb-1">{p3Label}</p>
          <p className="text-gray-700 text-[15px] leading-8 mb-10 text-justify">{p3Text}</p>

          <h2 className="font-bold text-[#183354] text-[15px] mb-4">{section2Title}</h2>
          <p className="text-gray-700 text-[15px] leading-8 mb-5 text-justify">
            {cooperationText} <a href="https://www.oananews.org" target="_blank" rel="noopener noreferrer" className="text-[#0C4DA2] hover:underline">www.oananews.org</a>
          </p>
          <p className="text-gray-700 text-[15px] leading-8 mb-10 text-justify">
            {cooperationText2}
          </p>

          <h2 className="font-bold text-[#183354] text-[15px] mb-4">{section3Title}</h2>

          <p className="text-gray-500 text-[14px] italic mb-2">{domesticLabel}</p>
          <ul className="list-disc list-inside text-gray-700 text-[15px] leading-8 mb-5 space-y-1 pl-2">
            <li>{domesticItem1} <a href="https://www.montsame.mn" target="_blank" rel="noopener noreferrer" className="text-[#0C4DA2] hover:underline">www.montsame.mn</a></li>
            <li>{domesticItem2}</li>
          </ul>

          <p className="text-gray-500 text-[14px] italic mb-2">{foreignLabel}</p>
          <ul className="list-disc list-inside text-gray-700 text-[15px] leading-8 mb-10 space-y-1 pl-2">
            <li>{foreignItem1}</li>
            <li>{foreignItem2}</li>
            <li>{foreignItem3}</li>
            <li>{foreignItem4}</li>
            <li>{foreignItem5}</li>
            <li>{foreignItem6}</li>
            <li>{foreignItem7}</li>
          </ul>

          <h2 className="font-bold text-[#183354] text-[15px] mb-4">{section4Title}</h2>

          <p className="text-gray-500 text-[14px] italic mb-1">{service1Label}</p>
          <p className="text-gray-700 text-[15px] leading-8 mb-5 text-justify">{service1Text}</p>

          <p className="text-gray-500 text-[14px] italic mb-1">{service2Label}</p>
          <p className="text-gray-700 text-[15px] leading-8 mb-5 text-justify">{service2Text}</p>

          <p className="text-gray-500 text-[14px] italic mb-1">{service3Label}</p>
          <p className="text-gray-700 text-[15px] leading-8 text-justify">{service3Text}</p>

        </div>
      </div>
    </main>
  );
}
