import type { Metadata } from 'next'
import { OurStoryPage } from '@/components/about/OurStoryPage'
import { config } from '@/data/config'

export const metadata: Metadata = {
  title: 'Our Story | Ambimed Healthcare',
  description: 'Learn how Ambimed brings trusted, affordable home healthcare to families across India.',
  alternates: { canonical: `${config.siteUrl}/about/our-story` },
}

export default function OurStoryRoute() {
  return <OurStoryPage />
}
