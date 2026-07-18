import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import '@/components/Header.css'
import '@/components/Footer.css'
import '@/components/blog/Blog.css'

type BlogShellProps = {
  children: React.ReactNode
}

export function BlogShell({ children }: BlogShellProps) {
  return (
    <>
      <Header />
      <main className="blog-main">{children}</main>
      <Footer />
    </>
  )
}
