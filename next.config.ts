import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    ERXES_API_URL: "https://montsame.next.erxes.io/gateway/graphql",
    ERXES_URL: "https://montsame.next.erxes.io/gateway",
    ERXES_FILE_URL: "https://montsame.next.erxes.io/gateway/read-file?key=",
    ERXES_APP_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRQb3J0YWxJZCI6IkpvNzA2dGZveW5yUkFxNjB5RnhsVCIsImlhdCI6MTc3MjUzNDgzMX0.hIo2PvNXUamH-R5wxSnWe2z7zsv6XKnHmqrJhn2Uq10",
  },
  images: {
    // unoptimized: true  ← УСТГАСАН — оптимизаци асаалттай болно
    formats: ["image/webp", "image/avif"], // WebP/AVIF болгон хөрвүүлнэ
    deviceSizes: [640, 750, 828, 1080, 1200, 1600], // responsive sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 хоног cache
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
      },
      {
        protocol: "https",
        hostname: "montsame.next.erxes.io",
      },
      {
        protocol: "https",
        hostname: "www.mongolbank.mn",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "*.erxes.io",
      },
    ],
  },
};

export default nextConfig;