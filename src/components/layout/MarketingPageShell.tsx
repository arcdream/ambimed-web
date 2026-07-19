import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

import '@/components/Header.css'
import '@/components/Footer.css'
import './MarketingPageShell.css'

type MarketingPageShellProps = {
  children: React.ReactNode
  mainClassName?: string
}

export function MarketingPageShell({ children, mainClassName = '' }: MarketingPageShellProps) {
  return (
    <>
      <Header />
      <main className={`marketing-page-main${mainClassName ? ` ${mainClassName}` : ''}`}>{children}</main>
      <Footer />
    </>
  )
}
