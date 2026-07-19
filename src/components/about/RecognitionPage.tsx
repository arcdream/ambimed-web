'use client'

import { MarketingPageShell } from '@/components/layout/MarketingPageShell'
import { PageHero } from '@/components/layout/PageHero'
import { AchievementsSection } from '@/components/AchievementsSection'
import '@/components/AchievementsSection.css'

export function RecognitionPage() {
  return (
    <MarketingPageShell mainClassName="marketing-page-main--flush">
      <PageHero
        eyebrow="About Us"
        title="Recognition"
        description="Official startup recognition at the national and state level — reflecting our commitment to trusted home healthcare."
      />
      <AchievementsSection embedded />
    </MarketingPageShell>
  )
}
