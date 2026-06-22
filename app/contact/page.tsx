"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLang } from "../components/Header/LangContext";
import { useTranslateText } from "../components/Header/useTranslate";

export default function ContactPage() {
  const { lang } = useLang();
  const { translated: pageTitle } = useTranslateText('Холбоо барих', lang);
  const { translated: sectionTitle } = useTranslateText('Байршил & Холбоо', lang);
  const { translated: addressLabel } = useTranslateText('Хаяг', lang);
  const { translated: addressValue } = useTranslateText('Монгол Улс, Улаанбаатар хот, Чингэлтэй дүүрэг, Б.Жигжиджавын гудамж-8, Индекс-15160, Ш/х-1514', lang);
  const { translated: phoneLabel } = useTranslateText('Утас', lang);
  const { translated: emailLabel } = useTranslateText('И-мэйл', lang);
  const { translated: workingHoursLabel } = useTranslateText('Ажлын цаг', lang);
  const { translated: workingDays } = useTranslateText('Даваа – Баасан', lang);
  const { translated: formTitle } = useTranslateText('Бидэнд бичих', lang);
  const { translated: successMsg } = useTranslateText('Амжилттай илгээлээ!', lang);
  const { translated: successDesc } = useTranslateText('Бид тантай удахгүй холбогдох болно.', lang);
  const { translated: nameLabel } = useTranslateText('Нэр', lang);
  const { translated: namePlaceholder } = useTranslateText('Таны нэр', lang);
  const { translated: subjectLabel } = useTranslateText('Гарчиг', lang);
  const { translated: subjectPlaceholder } = useTranslateText('Захидлын гарчиг', lang);
  const { translated: messageLabel } = useTranslateText('Мессеж', lang);
  const { translated: messagePlaceholder } = useTranslateText('Таны мессеж...', lang);
  const { translated: submitBtn } = useTranslateText('Илгээх', lang);

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:info@montsame.gov.mn?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Нэр: ${form.name}\nИ-мэйл: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <main className="w-full bg-[#f5f6f8] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="font-serif text-[2rem] font-bold text-[#183354] mb-2">{pageTitle}</h1>
          <div className="h-1 w-16 bg-[#0C4DA2] rounded" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="font-bold text-[#183354] text-lg mb-6">{sectionTitle}</h2>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#0C4DA2]/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-[#0C4DA2]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">{addressLabel}</p>
                    <p className="text-sm text-gray-700 font-medium leading-6">{addressValue}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#0C4DA2]/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-[#0C4DA2]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">{phoneLabel}</p>
                    <a href="tel:+97655266904" className="text-sm font-semibold text-[#0C4DA2] hover:underline">
                      +976 55266904
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#0C4DA2]/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-[#0C4DA2]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">{emailLabel}</p>
                    <a href="mailto:info@montsame.gov.mn" className="text-sm font-semibold text-[#0C4DA2] hover:underline">
                      info@montsame.gov.mn
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#0C4DA2]/10 rounded-full flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-[#0C4DA2]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">{workingHoursLabel}</p>
                    <p className="text-sm font-semibold text-gray-700">{workingDays}</p>
                    <p className="text-sm text-gray-500">09:00 – 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-sm h-[260px]">
              <iframe
                src="https://maps.google.com/maps?q=47.91957,106.915007&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="font-bold text-[#183354] text-lg mb-6">{formTitle}</h2>
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width={32} height={32} fill="none" stroke="#16a34a" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <p className="font-bold text-gray-700 mb-2">{successMsg}</p>
                <p className="text-sm text-gray-400">{successDesc}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">{nameLabel}</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0C4DA2] text-gray-800"
                    placeholder={namePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">{emailLabel}</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0C4DA2] text-gray-800"
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">{subjectLabel}</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0C4DA2] text-gray-800"
                    placeholder={subjectPlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">{messageLabel}</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0C4DA2] text-gray-800 resize-none"
                    placeholder={messagePlaceholder}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#0C4DA2] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#0a3d82] transition-colors"
                >
                  {submitBtn}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
