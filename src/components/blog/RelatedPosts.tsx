import Link from 'next/link'
import { formatBlogDate, type BlogPostMeta } from '@/lib/blog/posts'

type RelatedPostsProps = {
  posts: BlogPostMeta[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <aside className="blog-related" aria-labelledby="blog-related-heading">
      <h2 id="blog-related-heading" className="blog-related-title">
        You might also like
      </h2>
      <ul className="blog-related-list">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="blog-related-item">
              {post.coverImage ? (
                <img
                  src={post.coverImage}
                  alt={post.coverImageAlt}
                  className="blog-related-thumb"
                  loading="lazy"
                />
              ) : null}
              <span className="blog-related-meta">
                <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                <span className="blog-related-item-title">{post.title}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
