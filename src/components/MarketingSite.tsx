import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { AppDownloadStrip } from '@/components/AppDownloadStrip'
import MarketingBelowFold from '@/components/MarketingBelowFold'

import '@/components/Header.css'
import '@/components/Hero.css'
import '@/components/AppDownloadStrip.css'
import '@/components/Footer.css'

export function MarketingSite() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AppDownloadStrip />
        <MarketingBelowFold />
      </main>
      <Footer />
    </>
  )
}
