"use client";

import UlsTur          from "./UlsTur";
import EdiinZasag      from "./EdiinZasag";
import OronNutag       from "./OronNutag";
import Toim            from "./Toim";
import DelkhiinMedee   from "./DelkhiinMedee";
import ShinjlekhUkhaan from "./Science";
import AyalalJuulchlal from "./Aylal";
import Sport           from "./Sports";

export default function CategoryGrid() {
  return (
    <section className="bg-[#f5f6f8]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-40">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <UlsTur />
          <EdiinZasag />
          <OronNutag />
          <Toim />
          <DelkhiinMedee />
          <ShinjlekhUkhaan />
          <AyalalJuulchlal />
          <Sport />
        </div>
      </div>
    </section>
  );
}
