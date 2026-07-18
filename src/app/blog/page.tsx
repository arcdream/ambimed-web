import type { Metadata } from 'next'
import { BlogShell } from '@/components/blog/BlogShell'
import { BlogCard } from '@/components/blog/BlogCard'
import { config } from '@/data/config'
import { getAllPostsMeta } from '@/lib/blog/posts'

export const metadata: Metadata = {
  title: 'Blog | Home Healthcare Tips & Guides | Ambimed',
  description:
    'Expert guides on home care, caregivers, transparent pricing, and booking healthcare at home in India — from the Ambimed team.',
  alternates: {
    canonical: `${config.siteUrl}/blog`,
  },
  openGraph: {
    title: 'Ambimed Healthcare Blog',
    description:
      'Expert guides on home care, caregivers, transparent pricing, and booking healthcare at home in India.',
    url: `${config.siteUrl}/blog`,
    type: 'website',
    images: [{ url: `${config.siteUrl}/assets/hero/banner-verified-caregiver.png`, alt: 'Ambimed Healthcare Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ambimed Healthcare Blog',
    description:
      'Expert guides on home care, caregivers, transparent pricing, and booking healthcare at home in India.',
    images: [`${config.siteUrl}/assets/hero/banner-verified-caregiver.png`],
  },
}

export default function BlogIndexPage() {
  const posts = getAllPostsMeta()

  return (
    <BlogShell>
      <div className="blog-page container">
        <header className="blog-page-header">
          <p className="section-subtitle">Insights &amp; guides</p>
          <h1 className="section-title">Ambimed Blog</h1>
          <p className="blog-page-lead">
            Practical advice for families on home healthcare, verified caregivers, transparent pricing, and
            booking care in India.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="blog-page-lead" style={{ textAlign: 'center' }}>
            New articles are on the way. Check back soon.
          </p>
        ) : (
          <div className="blog-grid">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </BlogShell>
  )
}
