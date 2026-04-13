import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BlogAuthor } from '@/components/blog/BlogAuthor'
import { BlogCTA } from '@/components/blog/BlogCTA'
import { BlogFAQ } from '@/components/blog/BlogFAQ'
import { BlogHeader } from '@/components/blog/BlogHeader'
import { BlogRelated } from '@/components/blog/BlogRelated'
import { BlogTOC } from '@/components/blog/BlogTOC'
import { ShareButtons } from '@/components/blog/ShareButtons'
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog'
import { siteName, siteUrl } from '@/lib/metadata'
import { getPostSchemas } from '@/lib/schema'

export const revalidate = 3600

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}

  const canonical = `${siteUrl}/blog/${post.slug}`

  return {
    title: { absolute: `${post.title} | ${siteName}` },
    description: post.description,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: canonical,
      title: `${post.title} | ${siteName}`,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: [{ url: post.image ?? '/logo.png' }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: `${post.title} | ${siteName}`,
      description: post.description,
      images: [post.image ?? '/logo.png'],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  const relatedPosts = await getRelatedPosts(post, 3)
  const schemas = getPostSchemas(post)

  return (
    <main>
      <nav className="px-6 py-4 text-sm md:px-12">
        <ol className="mx-auto flex max-w-6xl items-center gap-2 text-[#7a7671]">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>/</li>
          <li className="text-[#1a1a1a]">{post.title}</li>
        </ol>
      </nav>

      <BlogHeader post={post} />

      <article className="px-6 py-14 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,2.3fr)_minmax(0,1fr)]">
          <div>
            <section className="blog-content">
              {post.content}
            </section>

            <ShareButtons title={post.title} />
            <BlogFAQ faqs={post.faqs ?? []} />
            <BlogAuthor author={post.author} />
            <BlogCTA topic={post.category.toLowerCase()} />
          </div>
          <aside>
            <BlogTOC headings={post.headings} />
          </aside>
        </div>
      </article>

      <section className="px-6 pb-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <BlogRelated posts={relatedPosts} />
        </div>
      </section>

      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </main>
  )
}
