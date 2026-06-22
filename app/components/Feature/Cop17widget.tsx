'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLang } from "../Header/LangContext";
import { useTranslateText } from "../Header/useTranslate";

const COP17_DATE = new Date('2026-09-01T00:00:00');

export default function Cop17Widget() {
  const { lang } = useLang();
  const { translated: dayLabel } = useTranslateText('ӨДӨР', lang);
  const { translated: hourLabel } = useTranslateText('ЦАГ', lang);
  const { translated: minLabel } = useTranslateText('МИНУТ', lang);
  const { translated: secLabel } = useTranslateText('СЕКУНД', lang);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = COP17_DATE.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days:  Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins:  Math.floor((diff % 3600000) / 60000),
        secs:  Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="overflow-hidden flex flex-col items-center px-2 py-2"
      style={{
        borderRadius: '24px',
        background: '#F7F7ED',
        boxShadow: '-2px 4px 4px 0 rgba(0,0,0,0.25), 2px -2px 4px 0 rgba(0,0,0,0.25)',
      }}
    >
      {/* COP17 лого зураг */}
      <div className="">
        <Image
          src="/images/cop17.png"
          alt="UNCCD COP17"
          width={160}
          height={96}
          className="object-contain"
        />
      </div>

      {/* Mongolia to Host COP17 */}
      <p className="text-[#1a6b5a] font-bold text-sm text-center leading-tight">
        Mongolia to Host<br />COP17
      </p>

      {/* Тоолуур */}
      <div className="grid grid-cols-4 gap-2 w-40 mt-1">
        {[
          { val: timeLeft.days,  label: dayLabel },
          { val: timeLeft.hours, label: hourLabel },
          { val: timeLeft.mins,  label: minLabel },
          { val: timeLeft.secs,  label: secLabel },
        ].map((c) => (
          <div
            key={c.label}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl"
            style={{ background: '#2a7a67' }}
          >
            <span className="text-white text-[8px] font-bold text-lg leading-none">
              {String(c.val).padStart(2, '0')}
            </span>
            <span className="text-white/80 text-[6px] font-semibold mt-0.5 tracking-wide">
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}