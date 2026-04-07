import Link from 'next/link'
import type { BlogPost } from '@/lib/blog'

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group rounded-2xl border border-[#e8e4de] bg-white p-6 transition hover:-translate-y-1 hover:border-[#c8281e]">
      <p className="mb-4 inline-flex rounded-full bg-[#f7ecea] px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#c8281e]">
        {post.category}
      </p>
      <h3 className="font-[var(--font-serif)] text-2xl leading-tight text-[#1a1a1a]">
        <Link href={`/blog/${post.slug}`} className="transition group-hover:text-[#c8281e]">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 line-clamp-2 text-base text-[#4a4a4a]">{post.description}</p>
      <p className="mt-4 text-sm text-[#7a7671]">{post.readingTime} min read · {post.publishedAt}</p>
    </article>
  )
}
