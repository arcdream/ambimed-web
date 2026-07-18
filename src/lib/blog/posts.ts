import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { markdownToHtml } from '@/lib/blog/markdown'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export type BlogPostMeta = {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  author: string
  coverImage: string
  coverImageAlt: string
}

export type BlogPost = BlogPostMeta & {
  contentHtml: string
}

function normalizeTags(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map(String)
  if (typeof raw === 'string') return raw.split(',').map((t) => t.trim()).filter(Boolean)
  return []
}

function parseFrontmatter(slug: string, data: Record<string, unknown>): BlogPostMeta {
  const title = String(data.title ?? slug)
  const description = String(data.description ?? '').slice(0, 160)

  return {
    slug: String(data.slug ?? slug),
    title,
    date: String(data.date ?? ''),
    description,
    tags: normalizeTags(data.tags),
    author: String(data.author ?? 'Ambimed Healthcare'),
    coverImage: String(data.coverImage ?? ''),
    coverImageAlt: String(data.coverImageAlt ?? title),
  }
}

function listMarkdownFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
}

export function getAllPostSlugs(): string[] {
  return listMarkdownFiles().map((file) => file.replace(/\.mdx?$/, ''))
}

export function getAllPostsMeta(): BlogPostMeta[] {
  return listMarkdownFiles()
    .map((filename) => {
      const slug = filename.replace(/\.mdx?$/, '')
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8')
      const { data } = matter(raw)
      return parseFrontmatter(slug, data as Record<string, unknown>)
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  for (const ext of ['.md', '.mdx']) {
    const filePath = path.join(BLOG_DIR, `${slug}${ext}`)
    if (!fs.existsSync(filePath)) continue

    const raw = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(raw)
    const meta = parseFrontmatter(slug, data as Record<string, unknown>)
    const contentHtml = await markdownToHtml(content)

    return { ...meta, contentHtml }
  }
  return null
}

/** Related posts: same tags first, then newest; excludes current slug. */
export function getRelatedPosts(slug: string, limit = 3): BlogPostMeta[] {
  const all = getAllPostsMeta()
  const current = all.find((p) => p.slug === slug)
  if (!current) return all.filter((p) => p.slug !== slug).slice(0, limit)

  const tagSet = new Set(current.tags.map((t) => t.toLowerCase()))

  const scored = all
    .filter((p) => p.slug !== slug)
    .map((p) => {
      const overlap = p.tags.filter((t) => tagSet.has(t.toLowerCase())).length
      return { post: p, overlap }
    })
    .sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
    })

  return scored.slice(0, limit).map((s) => s.post)
}

export function formatBlogDate(isoDate: string): string {
  if (!isoDate) return ''
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(new Date(isoDate))
}
