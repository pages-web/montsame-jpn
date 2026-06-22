import { NextRequest, NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

function chunkText(text: string, maxSize: number = 2000): string[] {
  if (text.length <= maxSize) return [text];

  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    let end = start + maxSize;
    if (end >= text.length) {
      chunks.push(text.slice(start));
      break;
    }

    const paraEnd = text.lastIndexOf("</p>", end);
    if (paraEnd > start && paraEnd + 4 <= end + 500) {
      end = paraEnd + 4;
    } else {
      const space = text.lastIndexOf(" ", end);
      if (space > start) end = space;
    }

    chunks.push(text.slice(start, end));
    start = end;
  }

  return chunks;
}

async function translateRaw(chunk: string, target: string): Promise<string> {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=mn&tl=${target}&dt=t&q=${encodeURIComponent(chunk)}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
    signal: AbortSignal.timeout(15000),
  });
  // Throw on failure so the bad result isn't written to the persistent cache.
  if (!res.ok) throw new Error(`translate upstream ${res.status}`);
  const data = await res.json();
  return data?.[0]?.map((item: any) => item?.[0] || "").join("") || chunk;
}

// Persistent, cross-request cache (Vercel Data Cache): each unique chunk+lang
// hits Google Translate once and is reused for every visitor for 30 days.
const cachedTranslate = unstable_cache(
  (chunk: string, target: string) => translateRaw(chunk, target),
  ["mt"],
  { revalidate: 60 * 60 * 24 * 30 }
);

async function translate(chunk: string, target: string): Promise<string> {
  try {
    return await cachedTranslate(chunk, target);
  } catch {
    return chunk;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { text, target } = await req.json();

    if (!text || !target) {
      return NextResponse.json({ error: "text, target шаардлагатай" }, { status: 400 });
    }

    const chunks = chunkText(text);
    const results = await Promise.all(chunks.map((chunk) => translate(chunk, target)));
    const translated = results.join("");

    return NextResponse.json(
      { translated },
      { headers: { "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800" } }
    );
  } catch (error) {
    return NextResponse.json({ translated: "" }, { status: 500 });
  }
}
