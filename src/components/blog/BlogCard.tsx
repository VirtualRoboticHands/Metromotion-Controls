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
      {post.summaryPoints?.[0] && (
        <div className="mt-4 rounded-xl bg-[#f7f6f3] p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7a7671]">
            Key point
          </p>
          <p className="mt-2 text-sm leading-[1.6] text-[#1a1a1a]">
            {post.summaryPoints[0].title}
          </p>
        </div>
      )}
      <p className="mt-4 text-sm text-[#7a7671]">{post.readingTime} min read | {post.publishedAt}</p>
    </article>
  )
}
