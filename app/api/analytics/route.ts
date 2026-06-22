import { NextResponse } from "next/server";

const PROPERTY_ID = process.env.GA4_PROPERTY_ID;
const CLIENT_EMAIL = process.env.GA4_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GA4_PRIVATE_KEY?.replace(/\\n/g, "\n");

// Service account JWT үүсгэх
async function getAccessToken(): Promise<string | null> {
  if (!CLIENT_EMAIL || !PRIVATE_KEY) return null;
  try {
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: "RS256", typ: "JWT" };
    const payload = {
      iss: CLIENT_EMAIL,
      scope: "https://www.googleapis.com/auth/analytics.readonly",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    };

    const encode = (obj: object) =>
      Buffer.from(JSON.stringify(obj)).toString("base64url");

    const signingInput = `${encode(header)}.${encode(payload)}`;

    const key = await crypto.subtle.importKey(
      "pkcs8",
      pemToArrayBuffer(PRIVATE_KEY!),
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(signingInput));
    const jwt = `${signingInput}.${Buffer.from(signature).toString("base64url")}`;

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
      }),
    });
    const tokenData = await tokenRes.json();
    return tokenData.access_token ?? null;
  } catch {
    return null;
  }
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const b64 = pem.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
  const binary = atob(b64);
  const buf = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) buf[i] = binary.charCodeAt(i);
  return buf.buffer;
}

function dateStr(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split("T")[0]; // YYYY-MM-DD
}

function shortDate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return `${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export async function GET() {
  if (!PROPERTY_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
    return NextResponse.json({ error: "GA4 credentials not configured" }, { status: 500 });
  }

  const token = await getAccessToken();
  if (!token) return NextResponse.json({ error: "Auth failed" }, { status: 500 });

  try {
    const res = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateRanges: [
            { startDate: "today",     endDate: "today"     },
            { startDate: "yesterday", endDate: "yesterday" },
            { startDate: dateStr(2),  endDate: dateStr(2)  },
          ],
          metrics: [{ name: "sessions" }],
          dimensions: [{ name: "dateRange" }],
        }),
        next: { revalidate: 3600 },
      }
    );

    const json = await res.json();
    const rows = json.rows || [];

    const getCount = (rangeIndex: number) => {
      const row = rows.find((r: any) => r.dimensionValues?.[0]?.value === `date_range_${rangeIndex}`);
      return parseInt(row?.metricValues?.[0]?.value || "0");
    };

    return NextResponse.json({
      today: { label: shortDate(0), count: getCount(0) },
      yesterday: { label: shortDate(1), count: getCount(1) },
      dayBefore: { label: shortDate(2), count: getCount(2) },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
