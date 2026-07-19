import type { Metadata } from 'next'
import { WhyAmbimedPage } from '@/components/about/WhyAmbimedPage'
import { config } from '@/data/config'

export const metadata: Metadata = {
  title: 'Why Ambimed | Ambimed Healthcare',
  description: 'Verified caregivers, transparent pricing, and dependable home healthcare you can trust.',
  alternates: { canonical: `${config.siteUrl}/about/why-ambimed` },
}

export default function WhyAmbimedRoute() {
  return <WhyAmbimedPage />
}
