"use client";

import Image from "next/image";
import { useLang } from "../Header/LangContext";
import { useTranslate } from "../Header/useTranslate";

const IMG = (url: string) =>
  `https://montsame.next.erxes.io/gateway/read-file?key=${url}`;

// Next.js image optimizer-ээр дамжуулна — автоматаар WebP болгож, resize хийнэ
function optimizeImgSrc(src: string): string {
  if (!src) return src;
  // Аль хэдийн optimized эсвэл data URL бол тэр чигээр нь
  if (src.startsWith('/_next/') || src.startsWith('data:')) return src;
  return `/_next/image?url=${encodeURIComponent(src)}&w=1200&q=75`;
}

const NaturalImg = ({ src, alt }: { src: string; alt: string }) => (
  <Image src={src} alt={alt} width={0} height={0} sizes="100vw"
    style={{ width: "100%", height: "auto" }} className="rounded-lg" />
);

function processHtml(html: string): string {
  let result = html;

  // figure элементийг data-image-style дагуу layout болгоно
  result = result.replace(
    /<figure([^>]*)>([\s\S]*?)<\/figure>/gi,
    (match, attrs, inner) => {
      const style = attrs.match(/data-image-style="([^"]*)"/i)?.[1] || 'normal';

      const maxWidthMatch = attrs.match(/max-width:\s*(\d+)px/i);
      const maxWidth = maxWidthMatch ? parseInt(maxWidthMatch[1]) : 1600;

      const srcMatch = inner.match(/src="([^"]*)"/i);
      const src = srcMatch ? optimizeImgSrc(srcMatch[1]) : '';
      const altMatch = inner.match(/alt="([^"]*)"/i);
      const alt = altMatch ? altMatch[1] : '';

      if (!src) return match;

      if (style === 'float-right') {
        return `<figure style="float:right;width:${maxWidth}px;max-width:45%;margin:0.25rem 0 1rem 1.5rem;clear:right">
          <img src="${src}" alt="${alt}" loading="lazy" style="width:100%;height:auto;display:block;border-radius:0.5rem">
        </figure>`;
      }

      if (style === 'float-left') {
        return `<figure style="float:left;width:${maxWidth}px;max-width:45%;margin:0.25rem 1.5rem 1rem 0;clear:left">
          <img src="${src}" alt="${alt}" loading="lazy" style="width:100%;height:auto;display:block;border-radius:0.5rem">
        </figure>`;
      }

      return `<figure style="width:100%;margin:1.5rem 0;clear:both">
        <img src="${src}" alt="${alt}" loading="lazy" style="width:100%;height:auto;display:block;border-radius:0.5rem">
      </figure>`;
    }
  );

  // Float-н дараа clear нэмнэ
  result = result.replace(/<\/ul>/gi, '</ul><div style="clear:both"></div>');
  result = result.replace(/<\/ol>/gi, '</ol><div style="clear:both"></div>');

  return result;
}

export default function ArticleContent({ content, images }: { content: string; images: any[] }) {
  const { lang } = useLang();
  // Mongolian renders on the server (in the initial HTML); other languages are
  // translated on the client and swap in after hydration.
  const { content: localized } = useTranslate({ content: content || "", lang });
  const html = processHtml(localized || content || "");
  const proseClass = [
    "prose max-w-none text-gray-800 leading-relaxed",
    "[&_p]:text-justify [&_p]:my-3",
    "[&_figure]:my-0",
    "[&_figcaption]:text-sm [&_figcaption]:text-gray-500 [&_figcaption]:mt-2",
  ].join(" ");

  const imgGroups: React.ReactNode[] = [];
  if (images[0]) imgGroups.push(
    <div key="g0" className="my-8 w-full overflow-hidden rounded-lg">
      <NaturalImg src={IMG(images[0].url)} alt={images[0].name || "img-1"} />
    </div>
  );
  if (images[1]) imgGroups.push(
    <div key="g1" className="my-8 overflow-hidden" style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}>
      <NaturalImg src={IMG(images[1].url)} alt={images[1].name || "img-2"} />
    </div>
  );
  if (images[2]) imgGroups.push(
    <div key="g2" className="my-8 w-full overflow-hidden rounded-lg">
      <NaturalImg src={IMG(images[2].url)} alt={images[2].name || "img-3"} />
    </div>
  );
  if (images.slice(3, 8).length > 0) imgGroups.push(
    <div key="g3" className="my-8 grid grid-cols-4 gap-2">
      {images.slice(3, 8).map((img: any, i: number) => (
        <div key={i} className="overflow-hidden rounded-lg">
          <NaturalImg src={IMG(img.url)} alt={img.name || `img-${i + 4}`} />
        </div>
      ))}
    </div>
  );
  if (images[8]) imgGroups.push(
    <div key="g4" className="my-8 w-full overflow-hidden rounded-lg">
      <NaturalImg src={IMG(images[8].url)} alt={images[8].name || "img-9"} />
    </div>
  );
  images.slice(9).forEach((img: any, i: number) => imgGroups.push(
    <div key={`g${i + 5}`} className="my-8 w-full overflow-hidden rounded-lg">
      <NaturalImg src={IMG(img.url)} alt={img.name || `img-${i + 10}`} />
    </div>
  ));

  if (!imgGroups.length) {
    return <div className={proseClass} dangerouslySetInnerHTML={{ __html: html }} />;
  }

  const paras = html.split("</p>").filter((p) => p.trim());
  const n = imgGroups.length;
  const size = Math.ceil(paras.length / (n + 1));
  const chunks: string[] = Array.from({ length: n + 1 }, (_, i) => {
    const slice = paras.slice(i * size, (i + 1) * size);
    return slice.length ? slice.join("</p>") + "</p>" : "";
  });

  return (
    <>
      {chunks.map((chunk, i) => (
        <div key={i}>
          {chunk && <div className={proseClass} dangerouslySetInnerHTML={{ __html: chunk }} />}
          {imgGroups[i] ?? null}
        </div>
      ))}
    </>
  );
}