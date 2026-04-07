import { getAllPosts } from '@/lib/blog'
import { siteUrl } from '@/lib/metadata'

export async function GET() {
  const posts = await getAllPosts()

  const items = posts
    .map(
      (post) => `<item>
<title><![CDATA[${post.title}]]></title>
<link>${siteUrl}/blog/${post.slug}</link>
<guid>${siteUrl}/blog/${post.slug}</guid>
<description><![CDATA[${post.description}]]></description>
<pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
</item>`,
    )
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
<title>Metromotion Controls Blog</title>
<link>${siteUrl}/blog</link>
<description>Industrial automation insights and guides from Metromotion Controls.</description>
<language>en-au</language>
${items}
</channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}
