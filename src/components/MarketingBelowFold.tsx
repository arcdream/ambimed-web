import { RecognitionSection } from '@/components/RecognitionSection'
import { LearnMoreSection } from '@/components/LearnMoreSection'
import { Services } from '@/components/Services'
import { SeoContentSection } from '@/components/SeoContentSection'
import { Testimonials } from '@/components/Testimonials'
import { HomeBookCareSection } from '@/components/HomeBookCareSection'
import { Apps } from '@/components/Apps'

import '@/components/RecognitionSection.css'
import '@/components/LearnMoreSection.css'
import '@/components/Services.css'
import '@/components/SeoContentSection.css'
import '@/components/Testimonials.css'
import '@/components/HomeBookCareSection.css'
import '@/components/Apps.css'

/** Homepage sections — detailed content lives on dedicated pages */
export default function MarketingBelowFold() {
  return (
    <>
      <RecognitionSection />
      <LearnMoreSection />
      <Services />
      <SeoContentSection />
      <Testimonials />
      <HomeBookCareSection />
      <Apps />
    </>
  )
}
