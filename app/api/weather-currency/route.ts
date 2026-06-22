import { NextResponse } from "next/server";

// 1. Монголбанк XML
async function getRateFromMongolbank(): Promise<number | null> {
  try {
    const res = await fetch(
      "https://www.mongolbank.mn/dblistxmlview.aspx?pid=0&sta=1&ttype=1",
      { next: { revalidate: 3600 }, cache: "force-cache" }
    );
    const xml = await res.text();
    const usdBlock = xml.match(/<item>[\s\S]*?<code>USD<\/code>[\s\S]*?<\/item>/i)
      || xml.match(/<item>[\s\S]*?USD[\s\S]*?<\/item>/i);
    if (usdBlock) {
      const rateMatch = usdBlock[0].match(/<rate>([\d.]+)<\/rate>/i);
      if (rateMatch) return parseFloat(rateMatch[1]);
    }
    return null;
  } catch {
    return null;
  }
}

// 2. Mongolbank JSON API (өөр endpoint)
async function getRateFromMongolbankJson(): Promise<number | null> {
  try {
    const today = new Date().toISOString().split("T")[0];
    const res = await fetch(
      `https://www.mongolbank.mn/api/getCurrencyList?startDate=${today}&endDate=${today}`,
      { next: { revalidate: 3600 } }
    );
    const json = await res.json();
    // Response: [{ currency: "USD", rate: "3450.00", ... }]
    const usdEntry = (Array.isArray(json) ? json : json?.data || [])
      .find((item: any) => item.currency === "USD" || item.code === "USD");
    if (usdEntry) {
      const rate = parseFloat(usdEntry.rate || usdEntry.value || usdEntry.close);
      if (!isNaN(rate)) return rate;
    }
    return null;
  } catch {
    return null;
  }
}

// 3. open.er-api.com fallback
async function getRateFallback(): Promise<number | null> {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 3600 },
    });
    const json = await res.json();
    return json?.rates?.MNT ?? null;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const [weatherRes, rateXml] = await Promise.all([
      fetch("https://wttr.in/Ulaanbaatar?format=j1", { next: { revalidate: 1800 } }),
      getRateFromMongolbank(),
    ]);

    const weatherData = await weatherRes.json();
    const condition = weatherData?.current_condition?.[0];
    const temp = condition?.temp_C ?? null;
    const weatherCode = condition?.weatherCode ? parseInt(condition.weatherCode) : null;

    let usdToMnt = rateXml;

    if (!usdToMnt) usdToMnt = await getRateFromMongolbankJson();
    if (!usdToMnt) usdToMnt = await getRateFallback();

    return NextResponse.json({ temp, weatherCode, usdToMnt });
  } catch {
    return NextResponse.json({ temp: null, usdToMnt: null });
  }
}
