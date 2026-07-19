import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BlogShell } from '@/components/blog/BlogShell'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { config } from '@/data/config'
import { isLoginAndBookingDisabled } from '@/lib/featureFlags'
import { BookCareButton } from '@/components/BookCareButton'
import { PhoneTextLink } from '@/components/PhoneTextLink'
import { getBookCareHref } from '@/lib/ctaLinks'
import '@/components/BookCareButton.css'
import '@/components/PhoneTextLink.css'
import {
  formatBlogDate,
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
} from '@/lib/blog/posts'

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Article Not Found' }

  const url = `${config.siteUrl}/blog/${post.slug}`
  const imageUrl = post.coverImage.startsWith('http')
    ? post.coverImage
    : `${config.siteUrl}${post.coverImage}`

  return {
    title: `${post.title} | Ambimed Blog`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: imageUrl, alt: post.coverImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  }
}

function buildBlogPostingJsonLd(post: Awaited<ReturnType<typeof getPostBySlug>>) {
  if (!post) return null

  const url = `${config.siteUrl}/blog/${post.slug}`
  const imageUrl = post.coverImage.startsWith('http')
    ? post.coverImage
    : `${config.siteUrl}${post.coverImage}`

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: config.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ambimed Healthcare',
      url: config.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${config.siteUrl}/assets/ambimed-logo.png`,
      },
    },
    image: imageUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    keywords: post.tags.join(', '),
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const related = getRelatedPosts(slug, 3)
  const jsonLd = buildBlogPostingJsonLd(post)
  const loginBookingDisabled = isLoginAndBookingDisabled()

  return (
    <BlogShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="blog-article-wrap container">
        <article className="blog-article">
          <nav className="blog-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/blog">Blog</Link>
            <span aria-hidden>/</span>
            <span>{post.title}</span>
          </nav>

          {post.coverImage ? (
            <figure className="blog-article-cover">
              <img src={post.coverImage} alt={post.coverImageAlt} />
            </figure>
          ) : null}

          <div className="blog-article-meta">
            <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
            <span>By {post.author}</span>
          </div>

          <h1 className="blog-article-title">{post.title}</h1>

          {post.tags.length > 0 && (
            <ul className="blog-article-tags" aria-label="Article tags">
              {post.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}

          <div
            className="blog-article-body"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          <div className="blog-article-cta">
            <p>{loginBookingDisabled ? 'Ready to talk about home care?' : 'Ready to book trusted home care?'}</p>
            <BookCareButton
              variant="primary"
              href={loginBookingDisabled ? '/contact' : getBookCareHref()}
              label="Book Home Care"
              showArrow
            />
            <p className="blog-article-call-hint">
              <PhoneTextLink prefix="Questions? " />
            </p>
          </div>

          <RelatedPosts posts={related} />
        </article>
      </div>
    </BlogShell>
  )
}
