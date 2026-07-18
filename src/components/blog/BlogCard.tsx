import Link from 'next/link'
import { formatBlogDate, type BlogPostMeta } from '@/lib/blog/posts'

type BlogCardProps = {
  post: BlogPostMeta
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="blog-card">
      <Link href={`/blog/${post.slug}`} className="blog-card-link">
        {post.coverImage ? (
          <div className="blog-card-image-wrap">
            <img src={post.coverImage} alt={post.coverImageAlt} loading="lazy" />
          </div>
        ) : null}
        <div className="blog-card-body">
          <time className="blog-card-date" dateTime={post.date}>
            {formatBlogDate(post.date)}
          </time>
          <h2 className="blog-card-title">{post.title}</h2>
          <p className="blog-card-desc">{post.description}</p>
          {post.tags.length > 0 && (
            <ul className="blog-card-tags" aria-label="Tags">
              {post.tags.slice(0, 3).map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
          <span className="blog-card-cta">Read article →</span>
        </div>
      </Link>
    </article>
  )
}
