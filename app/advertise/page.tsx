"use client";

import { useLang } from "../components/Header/LangContext";
import { useTranslateText } from "../components/Header/useTranslate";

export default function AdvertisePage() {
  const { lang } = useLang();
  const { translated: pageTitle } = useTranslateText('Сурталчилгаа байрлуулах', lang);
  const { translated: introText } = useTranslateText('Монцамэ мэдээллийн агентлаг нь 1921 онд үүсгэн байгуулагдсан, Монгол Улсын хамгийн эртний мэдээллийн байгууллага юм. Манай сайт өдөр бүр олон мянган уншигчид монгол, орос, англи, хятад, япон хэл дээр мэдээ мэдээлэл хүргэдэг. Таны брэнд, бүтээгдэхүүн, үйлчилгээг манай сайтаар дамжуулан өргөн уншигчдад хүргэх боломжтой.', lang);
  const { translated: tableTitle } = useTranslateText('Баннер сурталчилгааны үнийн мэдээлэл', lang);
  const { translated: tableNote } = useTranslateText('Үнэ сарын нэгж тарифаар тооцогдоно. НӨАТ орсон.', lang);
  const { translated: colType } = useTranslateText('Баннерийн төрөл', lang);
  const { translated: colSize } = useTranslateText('Хэмжээ', lang);
  const { translated: colLocation } = useTranslateText('Байрлал', lang);
  const { translated: colPrice } = useTranslateText('Сарын үнэ', lang);
  const { translated: contactTitle } = useTranslateText('Сурталчилгааны асуудлаар холбоо барих', lang);
  const { translated: emailLabel } = useTranslateText('И-мэйл', lang);
  const { translated: phoneLabel } = useTranslateText('Утас', lang);
  const { translated: addressLabel } = useTranslateText('Хаяг', lang);
  const { translated: workingHoursLabel } = useTranslateText('Ажлын цаг', lang);
  const { translated: addressValue } = useTranslateText('Чингэлтэй дүүрэг, Б.Жигжиджавын гудамж-8', lang);
  const { translated: workingHoursValue } = useTranslateText('Даваа – Баасан, 09:00 – 18:00', lang);
  const { translated: banner1 } = useTranslateText('Дээд баннер (Leaderboard)', lang);
  const { translated: banner2 } = useTranslateText('Том дөрвөлжин (Large Rectangle)', lang);
  const { translated: banner3 } = useTranslateText('Баруун тал (Wide Skyscraper)', lang);
  const { translated: banner4 } = useTranslateText('Дунд баннер (Banner)', lang);
  const { translated: banner5 } = useTranslateText('Гар утасны баннер', lang);
  const { translated: loc1 } = useTranslateText('Нүүр хуудас дээд хэсэг', lang);
  const { translated: loc2 } = useTranslateText('Нийтлэлийн дотор', lang);
  const { translated: loc3 } = useTranslateText('Баруун sidebar', lang);
  const { translated: loc4 } = useTranslateText('Мэдээний хооронд', lang);
  const { translated: loc5 } = useTranslateText('Мобайл хуудас', lang);

  const banners = [
    { name: banner1, size: "728×90 px", location: loc1, price: "800,000₮" },
    { name: banner2, size: "336×280 px", location: loc2, price: "600,000₮" },
    { name: banner3, size: "160×600 px", location: loc3, price: "500,000₮" },
    { name: banner4, size: "468×60 px", location: loc4, price: "400,000₮" },
    { name: banner5, size: "320×50 px", location: loc5, price: "300,000₮" },
  ];

  return (
    <main className="w-full bg-[#f5f6f8] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="font-serif text-[2rem] font-bold text-[#183354] mb-2">
            {pageTitle}
          </h1>
          <div className="h-1 w-16 bg-[#0C4DA2] rounded" />
        </div>

        <div className="bg-white rounded-lg p-8 mb-8 shadow-sm">
          <p className="text-gray-700 text-sm leading-7">
            {introText}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-[#183354] text-lg">{tableTitle}</h2>
            <p className="text-xs text-gray-400 mt-1">{tableNote}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#f5f6f8]">
                <tr>
                  <th className="text-left px-6 py-3 text-gray-600 font-semibold">{colType}</th>
                  <th className="text-left px-6 py-3 text-gray-600 font-semibold">{colSize}</th>
                  <th className="text-left px-6 py-3 text-gray-600 font-semibold">{colLocation}</th>
                  <th className="text-right px-6 py-3 text-gray-600 font-semibold">{colPrice}</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((b, i) => (
                  <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-[#183354]">{b.name}</td>
                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">{b.size}</td>
                    <td className="px-6 py-4 text-gray-500">{b.location}</td>
                    <td className="px-6 py-4 text-right font-bold text-[#0C4DA2]">{b.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#0C4DA2] rounded-lg p-8 text-white">
          <h2 className="font-bold text-lg mb-4">{contactTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-white/60 mb-1">{emailLabel}</p>
              <a href="mailto:info@montsame.gov.mn" className="text-white hover:underline font-semibold">
                info@montsame.gov.mn
              </a>
            </div>
            <div>
              <p className="text-white/60 mb-1">{phoneLabel}</p>
              <a href="tel:+97651262342" className="text-white hover:underline font-semibold">
                +976 51-262342
              </a>
            </div>
            <div>
              <p className="text-white/60 mb-1">{addressLabel}</p>
              <p className="text-white font-semibold">{addressValue}</p>
            </div>
            <div>
              <p className="text-white/60 mb-1">{workingHoursLabel}</p>
              <p className="text-white font-semibold">{workingHoursValue}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
