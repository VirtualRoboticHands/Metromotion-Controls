import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { projects } from '@/lib/projects'
import { services } from '@/lib/services'
import { siteUrl } from '@/lib/metadata'
import { industries } from '@/data/industries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', '/about', '/contact', '/services', '/services/support', '/projects']
  const serviceRoutes = services.map((service) => `/services/${service.slug}`)
  const projectRoutes = projects.map((project) => `/projects/${project.slug}`)
  const industryRoutes = ['/industries', ...industries.map((industry) => `/industries/${industry.slug}`)]

  const posts = await getAllPosts()
  const blogUrls = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    ...[...staticRoutes, ...serviceRoutes, ...projectRoutes, ...industryRoutes].map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...blogUrls,
  ]
}
