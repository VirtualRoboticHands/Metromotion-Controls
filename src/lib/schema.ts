import { siteUrl } from '@/lib/metadata'
import type { BlogPostFrontmatter } from '@/lib/blog'

export function buildArticleSchema(post: BlogPostFrontmatter) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Organization',
      name: 'Metromotion Controls',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Metromotion Controls',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.png`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    keywords: post.tags,
  }
}

export function buildFaqSchema(post: BlogPostFrontmatter) {
  if (!post.faqs?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function buildHowToSchema(post: BlogPostFrontmatter) {
  if (post.postType !== 'how-to') return null

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: post.title,
    step: [
      { '@type': 'HowToStep', name: 'Define scope and success criteria' },
      { '@type': 'HowToStep', name: 'Complete controls design and risk assessment' },
      { '@type': 'HowToStep', name: 'Program, test, and commission safely' },
    ],
  }
}

export function buildBreadcrumbSchema(post: BlogPostFrontmatter) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${siteUrl}/blog/${post.slug}`,
      },
    ],
  }
}

export function getPostSchemas(post: BlogPostFrontmatter) {
  return [
    buildArticleSchema(post),
    buildFaqSchema(post),
    buildHowToSchema(post),
    buildBreadcrumbSchema(post),
  ].filter(Boolean)
}
