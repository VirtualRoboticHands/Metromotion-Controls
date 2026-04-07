import type { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'
import { services } from '@/lib/services'
import { siteUrl } from '@/lib/metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/about', '/contact', '/services', '/services/support', '/projects']

  const serviceRoutes = services.map((service) => `/services/${service.slug}`)
  const projectRoutes = projects.map((project) => `/projects/${project.slug}`)

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}
