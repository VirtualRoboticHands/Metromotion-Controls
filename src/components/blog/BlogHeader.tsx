import type { BlogPostFrontmatter } from '@/lib/blog'

export function BlogHeader({ post }: { post: BlogPostFrontmatter }) {
  return (
    <header className="bg-[#f7f6f3] px-6 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 inline-flex rounded-full bg-[#f7ecea] px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#c8281e]">
          {post.category}
        </p>
        <h1 className="max-w-4xl font-[var(--font-serif)] text-4xl leading-tight text-[#1a1a1a] md:text-6xl">{post.title}</h1>
        <p className="mt-4 text-[#4a4a4a]">{post.readingTime} min read · Published {new Date(post.publishedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })} · Updated {new Date(post.updatedAt ?? post.publishedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </div>
    </header>
  )
}
