import type { Metadata } from 'next'
import { PricingPage } from '@/components/PricingPage'
import { config } from '@/data/config'

export const metadata: Metadata = {
  title: 'Pricing | Ambimed Healthcare',
  description: 'Transparent home healthcare pricing for nursing, caregiving, physiotherapy, and mother & baby care.',
  alternates: { canonical: `${config.siteUrl}/pricing` },
}

export default function PricingRoute() {
  return <PricingPage />
}
