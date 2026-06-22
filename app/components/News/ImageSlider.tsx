'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';

interface SlideProps {
  id: string;
  image: string;
  alt: string;
}

interface ImageSliderProps {
  slides: SlideProps[];
  onIndexChange?: (index: number) => void;
}

export default function ImageSlider({ slides, onIndexChange }: ImageSliderProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused]   = useState(false);

  const goTo = (i: number) => {
    setCurrent(i);
    onIndexChange?.(i);
  };

  const next = useCallback(() => {
    const i = (current + 1) % slides.length;
    setCurrent(i);
    onIndexChange?.(i);
  }, [current, slides.length, onIndexChange]);

  const prev = useCallback(() => {
    const i = (current - 1 + slides.length) % slides.length;
    setCurrent(i);
    onIndexChange?.(i);
  }, [current, slides.length, onIndexChange]);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [paused, next, slides.length]);

  if (!slides.length) return null;

  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{ width: '351px', height: '206px' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[206px] flex items-center">
        {slides.map((slide, i) => {
          const offset = i - current;
          const abs = Math.abs(offset);
          const translateX = offset * 85;
          const scale = abs === 0 ? 1 : 0.82;
          const opacity = abs > 1 ? 0 : abs === 0 ? 1 : 0.6;
          const zIndex = abs === 0 ? 10 : abs === 1 ? 5 : 0;

          return (
            <div
              key={slide.id}
              className="absolute rounded-lg overflow-hidden cursor-pointer transition-all duration-500"
              style={{
                width: '75%',
                height: '100%',
                left: '12.5%',
                transform: `translateX(${translateX}%) scale(${scale})`,
                opacity,
                zIndex,
              }}
              onClick={() => abs !== 0 && goTo(i)}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover"
                sizes="500px"
                unoptimized
              />
            </div>
          );
        })}

        {slides.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-12 bg-black/30 hover:bg-black/50 text-white flex items-center justify-center text-2xl transition-colors rounded-r"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-12 bg-black/30 hover:bg-black/50 text-white flex items-center justify-center text-2xl transition-colors rounded-l"
            >
              ›
            </button>
          </>
        )}
      </div>

      {slides.length > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? 'bg-[#1565c0] w-5 h-2' : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}