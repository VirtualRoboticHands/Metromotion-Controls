import type { Metadata } from 'next'
import Link from 'next/link'
import { BlogCard } from '@/components/blog/BlogCard'
import { getAllCategories, getAllPosts, getFeaturedPosts } from '@/lib/blog'
import { siteUrl } from '@/lib/metadata'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const revalidate = 3600

const POSTS_PER_PAGE = 12

export const metadata: Metadata = {
  title: { absolute: 'Insights & Guides | Metromotion Controls' },
  description:
    'Industrial automation insights and practical engineering guides from Metromotion Controls.',
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/blog`,
    title: 'Insights & Guides | Metromotion Controls',
    description:
      'Industrial automation insights and practical engineering guides from Metromotion Controls.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insights & Guides | Metromotion Controls',
    description:
      'Industrial automation insights and practical engineering guides from Metromotion Controls.',
  },
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>
}) {
  const [allPosts, categories, featuredPosts] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
    getFeaturedPosts(1),
  ])

  const { category, page: pageParam } = await searchParams
  const activeCategory = category ?? 'All'
  const page = Number(pageParam ?? '1')

  const filteredPosts =
    activeCategory === 'All'
      ? allPosts
      : allPosts.filter((post) => post.category === activeCategory)

  const pageCount = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE))
  const currentPage = Math.min(Math.max(page, 1), pageCount)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  )

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '72px' }}>
        <section className="bg-[#f7f6f3] px-6 py-20 md:px-12">
          <div className="mx-auto max-w-6xl">
            <p className="section-label">Blog</p>
            <h1 className="font-[var(--font-serif)] text-5xl text-[#1a1a1a]">Insights & Guides</h1>
            <p className="mt-4 max-w-2xl text-lg text-[#4a4a4a]">
              Engineering-led content for Australian manufacturers planning PLC, SCADA, and controls upgrades.
            </p>
          </div>
        </section>

        <section className="px-6 py-12 md:px-12">
          <div className="mx-auto max-w-6xl">
            {featuredPosts[0] && activeCategory === 'All' && (
              <article className="mb-10 rounded-2xl border border-[#e8e4de] bg-[#f7f6f3] p-8">
                <p className="text-xs uppercase tracking-wider text-[#c8281e]">Featured</p>
                <h2 className="mt-2 font-[var(--font-serif)] text-4xl text-[#1a1a1a]">
                  <Link href={`/blog/${featuredPosts[0].slug}`}>{featuredPosts[0].title}</Link>
                </h2>
                <p className="mt-3 max-w-3xl text-[#4a4a4a]">{featuredPosts[0].description}</p>
              </article>
            )}

            <nav className="mb-8 flex flex-wrap gap-2">
              <Link
                href="/blog"
                className={`rounded-full px-4 py-2 text-sm ${activeCategory === 'All' ? 'bg-[#c8281e] text-white' : 'bg-[#f7f6f3] text-[#1a1a1a]'}`}
              >
                All
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={`/blog?category=${encodeURIComponent(category.name)}`}
                  className={`rounded-full px-4 py-2 text-sm ${activeCategory === category.name ? 'bg-[#c8281e] text-white' : 'bg-[#f7f6f3] text-[#1a1a1a]'}`}
                >
                  {category.name} ({category.count})
                </Link>
              ))}
            </nav>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {paginatedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>

            <div className="mt-10 flex items-center justify-center gap-3">
              {Array.from({ length: pageCount }).map((_, index) => {
                const target = index + 1
                const href =
                  activeCategory === 'All'
                    ? `/blog?page=${target}`
                    : `/blog?category=${encodeURIComponent(activeCategory)}&page=${target}`
                return (
                  <Link
                    key={target}
                    href={href}
                    className={`h-9 w-9 rounded-full text-center text-sm leading-9 ${target === currentPage ? 'bg-[#c8281e] text-white' : 'bg-[#f7f6f3] text-[#1a1a1a]'}`}
                  >
                    {target}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
