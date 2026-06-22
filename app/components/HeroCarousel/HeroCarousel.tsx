'use client';

import { useState } from 'react';
import HeroSlide from './HeroSlide';
import HeroNavigation from './HeroNavigation';
import HeroDots from './HeroDots';

interface Props {
  posts: any[];
}

export default function HeroCarousel({ posts }: Props) {
  const [current, setCurrent] = useState(0);

  if (!posts.length) return null;

  const next = () => setCurrent((prev) => (prev + 1) % posts.length);
  const prev = () => setCurrent((prev) => (prev === 0 ? posts.length - 1 : prev - 1));

  return (
    <section className="relative bg-white overflow-hidden">
      <HeroSlide item={posts[current]} />
      <HeroNavigation onPrev={prev} onNext={next} />
      <HeroDots total={posts.length} current={current} onSelect={setCurrent} />
    </section>
  );
}
