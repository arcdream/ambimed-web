import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import MarketingBelowFold from '@/components/MarketingBelowFold'

import '@/components/Header.css'
import '@/components/Hero.css'
import '@/components/Footer.css'

export function MarketingSite() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MarketingBelowFold />
      </main>
      <Footer />
    </>
  )
}
