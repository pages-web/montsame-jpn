import { Feed } from 'feed';

export async function GET() {
  const feed = new Feed({
    title: 'Монцамэ мэдээллийн агентлаг',
    description: 'Монцамэ - Монголын мэдээ',
    id: 'https://montsame.mn',
    link: 'https://montsame.mn',
    language: 'mn',
    copyright: 'Мэдээллийн МОНЦАМЭ агентлаг ©2026',
    updated: new Date(),
  });

  try {
    const apiUrl = process.env.ERXES_API_URL || 'https://montsame.next.erxes.io/gateway/graphql';
    const token = process.env.ERXES_APP_TOKEN || '';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-app-token': token,
      },
      body: JSON.stringify({
        query: `
          query {
            cpPostList {
              posts {
                _id
                slug
                title
                excerpt
                createdAt
                thumbnail { url }
              }
            }
          }
        `,
      }),
      next: { revalidate: 3600 },
    });

    const { data } = await response.json();
    const posts = data?.cpPostList?.posts || [];

    posts.forEach((post: any) => {
      feed.addItem({
        title: post.title,
        id: `https://montsame.mn/article/${post._id}`,
        link: `https://montsame.mn/article/${post._id}`,
        description: post.excerpt || post.title,
        date: new Date(post.createdAt),
        image: post.thumbnail?.url
          ? `${process.env.ERXES_FILE_URL || 'https://montsame.next.erxes.io/gateway/read-file?key='}${post.thumbnail.url}`
          : undefined,
      });
    });
  } catch {
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
