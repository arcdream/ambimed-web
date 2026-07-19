import type { MetadataRoute } from 'next'
import { config } from '@/data/config'
import { isLoginAndBookingDisabled } from '@/lib/featureFlags'
import { getAllServiceSlugs } from '@/data/serviceLandings'
import { getAllPostsMeta } from '@/lib/blog/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = config.siteUrl
  const posts = getAllPostsMeta()
  const serviceSlugs = getAllServiceSlugs()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/blog`, changeFrequency: 'weekly', priority: 0.85 },
    ...(isLoginAndBookingDisabled()
      ? []
      : [{ url: `${base}/app/booking`, changeFrequency: 'weekly' as const, priority: 0.9 }]),
    { url: `${base}/terms`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/privacy-policy`, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${base}/services/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes]
}
