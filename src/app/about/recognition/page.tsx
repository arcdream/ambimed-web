import type { Metadata } from 'next'
import { RecognitionPage } from '@/components/about/RecognitionPage'
import { config } from '@/data/config'

export const metadata: Metadata = {
  title: 'Recognition | Ambimed Healthcare',
  description: 'DPIIT Startup India and Start In UP recognition for Ambimed Healthcare.',
  alternates: { canonical: `${config.siteUrl}/about/recognition` },
}

export default function RecognitionRoute() {
  return <RecognitionPage />
}
