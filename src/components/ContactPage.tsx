'use client'

import { MarketingPageShell } from '@/components/layout/MarketingPageShell'
import { PageHero } from '@/components/layout/PageHero'
import { Contact } from '@/components/Contact'
import '@/components/Contact.css'

export function ContactPage() {
  return (
    <MarketingPageShell mainClassName="marketing-page-main--flush">
      <PageHero
        eyebrow="Get in touch"
        title="Contact"
        description="Reach our care team for quotes, service questions, or support across cities we operate in."
      />
      <Contact embedded />
    </MarketingPageShell>
  )
}
