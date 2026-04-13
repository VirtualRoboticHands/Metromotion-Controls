import type { BlogTakeaway } from '@/lib/blog'

export function BlogTakeaways({ items }: { items: BlogTakeaway[] }) {
  if (!items.length) return null

  return (
    <section aria-labelledby="blog-takeaways-title" className="px-6 py-10 md:px-12">
      <div className="mx-auto max-w-6xl rounded-[28px] border border-[#e8e4de] bg-[#fffaf7] p-8">
        <h2 id="blog-takeaways-title" className="sr-only">
          Key points
        </h2>
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#c8281e]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7a7671]">
            Key points
          </span>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {items.slice(0, 3).map((item, index) => (
            <article key={item.title} className="rounded-[22px] border border-[#edd9d3] bg-white p-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f7ecea] text-sm font-semibold text-[#c8281e]">
                {index + 1}
              </div>
              <h3 className="mt-4 font-[var(--font-serif)] text-[26px] leading-[1.1] text-[#1a1a1a]">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.75] text-[#4a4a4a]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
