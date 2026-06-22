"use client";

import { useLang } from "../components/Header/LangContext";
import { useTranslateText } from "../components/Header/useTranslate";

export default function ShilenDansPage() {
  const { lang } = useLang();
  const { translated: pageTitle } = useTranslateText('Шилэн данс', lang);
  const { translated: description } = useTranslateText('"Төсвийн тогтвортой байдлын тухай" болон "Шилэн дансны тухай" хуулийн дагуу Монцамэ мэдээллийн агентлаг нь санхүүгийн мэдээллээ ил тод нийтэд мэдээлэх үүрэгтэй.', lang);
  const { translated: viewOnSite } = useTranslateText('сайтаас үзнэ үү.', lang);
  const { translated: portalTitle } = useTranslateText('Шилэн дансны портал', lang);
  const { translated: portalDesc } = useTranslateText('shilendans.gov.mn — бүрэн мэдээлэл үзэх', lang);
  const { translated: yearSuffix } = useTranslateText('он', lang);

  const reports = [
    {
      year: "2024",
      items: [
        { name: "2024 оны жилийн эцсийн санхүүгийн тайлан", url: "https://shilendans.gov.mn" },
        { name: "2024 оны III улирлын тайлан", url: "https://shilendans.gov.mn" },
        { name: "2024 оны II улирлын тайлан", url: "https://shilendans.gov.mn" },
        { name: "2024 оны I улирлын тайлан", url: "https://shilendans.gov.mn" },
      ],
    },
    {
      year: "2023",
      items: [
        { name: "2023 оны жилийн эцсийн санхүүгийн тайлан", url: "https://shilendans.gov.mn" },
        { name: "2023 оны III улирлын тайлан", url: "https://shilendans.gov.mn" },
        { name: "2023 оны II улирлын тайлан", url: "https://shilendans.gov.mn" },
        { name: "2023 оны I улирлын тайлан", url: "https://shilendans.gov.mn" },
      ],
    },
  ];

  return (
    <main className="w-full bg-[#f5f6f8] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="font-serif text-[2rem] font-bold text-[#183354] mb-2">{pageTitle}</h1>
          <div className="h-1 w-16 bg-[#0C4DA2] rounded" />
        </div>

        <div className="bg-white rounded-lg p-8 mb-8 shadow-sm">
          <p className="text-gray-700 text-sm leading-7">
            {description}{" "}
            <a
              href="https://shilendans.gov.mn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0C4DA2] hover:underline font-semibold"
            >
              shilendans.gov.mn
            </a>{" "}
            {viewOnSite}
          </p>
        </div>

        <a
          href="https://shilendans.gov.mn/org/6820"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-[#0C4DA2] text-white rounded-lg p-6 mb-8 hover:bg-[#0a3d82] transition-colors shadow-sm"
        >
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
            <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-lg">{portalTitle}</p>
            <p className="text-white/70 text-sm">{portalDesc}</p>
          </div>
        </a>

        {reports.map((section) => (
          <div key={section.year} className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="px-6 py-4 bg-[#f5f6f8] border-b border-gray-100">
              <h2 className="font-bold text-[#183354]">{section.year} {yearSuffix}</h2>
            </div>
            <ul className="divide-y divide-gray-50">
              {section.items.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-6 py-4 hover:bg-[#f5f6f8] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <svg width={16} height={16} fill="none" stroke="#0C4DA2" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                      </svg>
                      <span className="text-sm text-gray-700 group-hover:text-[#0C4DA2] transition-colors">
                        {item.name}
                      </span>
                    </div>
                    <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="text-gray-300 group-hover:text-[#0C4DA2] transition-colors shrink-0">
                      <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
