import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'

const blogDirectory = path.join(process.cwd(), 'content/blog')

export type BlogFaq = { question: string; answer: string }
export type BlogTakeaway = { title: string; body: string }

export type BlogPostFrontmatter = {
  title: string
  slug: string
  description: string
  publishedAt: string
  updatedAt?: string
  author: string
  category: string
  tags: string[]
  targetKeyword: string
  searchIntent: string
  pillar: string
  postType: string
  readingTime?: number
  featured?: boolean
  image?: string
  summaryPoints?: BlogTakeaway[]
  faqs?: BlogFaq[]
}

export type BlogPost = BlogPostFrontmatter & {
  content: string
  headings: { id: string; text: string; level: 2 | 3 }[]
}

export type CompiledPost = BlogPostFrontmatter & {
  content: React.ReactNode
  rawContent: string
  headings: { id: string; text: string; level: 2 | 3 }[]
}

function getMdxFiles() {
  if (!fs.existsSync(blogDirectory)) return []
  return fs.readdirSync(blogDirectory).filter((file) => file.endsWith('.mdx'))
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function extractHeadings(content: string) {
  const lines = content.split('\n')
  return lines
    .filter((line) => line.startsWith('## ') || line.startsWith('### '))
    .map((line) => {
      const level = line.startsWith('### ') ? 3 : 2
      const text = line.replace(/^###?\s+/, '').trim()
      return { id: slugify(text), text, level: level as 2 | 3 }
    })
}

function parsePostFile(file: string): BlogPost {
  const fullPath = path.join(blogDirectory, file)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const frontmatter = data as BlogPostFrontmatter
  const calculatedReadingTime = Math.max(1, Math.round(readingTime(content).minutes))

  return {
    ...frontmatter,
    readingTime: frontmatter.readingTime ?? calculatedReadingTime,
    content,
    headings: extractHeadings(content),
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = getMdxFiles()
  const posts = files.map((file) => parsePostFile(file))

  return posts.sort(
    (a, b) => new Date(b.updatedAt ?? b.publishedAt).getTime() - new Date(a.updatedAt ?? a.publishedAt).getTime(),
  )
}

export async function getPostBySlug(slug: string): Promise<CompiledPost | null> {
  const files = getMdxFiles()
  const file = files.find((entry) => entry.replace(/\.mdx$/, '') === slug)

  if (!file) return null

  const post = parsePostFile(file)

  const { content } = await compileMDX<BlogPostFrontmatter>({
    source: post.content,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'append' }],
          [rehypePrettyCode, { theme: 'github-dark' }],
        ],
      },
    },
  })

  return {
    ...post,
    content,
    rawContent: post.content,
  }
}

export async function getPostsByCategory(category: string) {
  const posts = await getAllPosts()
  return posts.filter((post) => post.category.toLowerCase() === category.toLowerCase())
}

export async function getPostsByPillar(pillar: string) {
  const posts = await getAllPosts()
  return posts.filter((post) => post.pillar.toLowerCase() === pillar.toLowerCase())
}

export async function getPostsByTag(tag: string) {
  const posts = await getAllPosts()
  return posts.filter((post) => post.tags.some((item) => item.toLowerCase() === tag.toLowerCase()))
}

export async function getRelatedPosts(currentPost: BlogPostFrontmatter, count = 3) {
  const posts = await getAllPosts()

  return posts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      let score = 0
      if (post.pillar === currentPost.pillar) score += 3
      if (post.category === currentPost.category) score += 2
      const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag)).length
      score += sharedTags
      return { post, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((entry) => entry.post)
}

export async function getFeaturedPosts(count = 1) {
  const posts = await getAllPosts()
  return posts.filter((post) => post.featured).slice(0, count)
}

export async function getAllCategories() {
  const posts = await getAllPosts()
  const categoryMap = new Map<string, number>()

  for (const post of posts) {
    categoryMap.set(post.category, (categoryMap.get(post.category) ?? 0) + 1)
  }

  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export async function getAllTags() {
  const posts = await getAllPosts()
  const tagMap = new Map<string, number>()

  for (const post of posts) {
    for (const tag of post.tags) {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1)
    }
  }

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name))
}
