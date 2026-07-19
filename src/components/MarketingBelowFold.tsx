import { Services } from '@/components/Services'
import { SeoContentSection } from '@/components/SeoContentSection'
import { Testimonials } from '@/components/Testimonials'
import { Apps } from '@/components/Apps'

import '@/components/Services.css'
import '@/components/SeoContentSection.css'
import '@/components/Testimonials.css'
import '@/components/Apps.css'

/** Homepage sections — detailed content lives on dedicated pages */
export default function MarketingBelowFold() {
  return (
    <>
      <Services />
      <SeoContentSection />
      <Testimonials />
      <Apps />
    </>
  )
}
