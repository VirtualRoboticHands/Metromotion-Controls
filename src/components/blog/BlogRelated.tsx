import { BlogCard } from '@/components/blog/BlogCard'
import type { BlogPost } from '@/lib/blog'

export function BlogRelated({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null

  return (
    <section className="mt-16">
      <h2 className="font-[var(--font-serif)] text-3xl text-[#1a1a1a]">Related posts</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}
