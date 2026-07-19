'use client'

import { MarketingPageShell } from '@/components/layout/MarketingPageShell'
import { PageHero } from '@/components/layout/PageHero'
import { ServicesPricingSection } from '@/components/ServicesPricingSection'
import '@/components/ServicesPricingSection.css'

export function PricingPage() {
  return (
    <MarketingPageShell mainClassName="marketing-page-main--flush">
      <PageHero
        eyebrow="Plans & savings"
        title="Pricing"
        description="Transparent tariffs for home nursing, caregiving, physiotherapy, and mother & baby care."
      />
      <ServicesPricingSection embedded />
    </MarketingPageShell>
  )
}
