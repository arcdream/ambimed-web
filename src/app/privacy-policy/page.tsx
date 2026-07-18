import type { Metadata } from 'next'
import { PrivacyPolicyPage } from '@/components/PrivacyPolicyPage'
import { config } from '@/data/config'

export const metadata: Metadata = {
  title: 'Privacy Policy | Ambimed Healthcare',
  description:
    'How Ambimed Healthcare collects, uses, and protects your personal data — including rights under India\'s DPDP Act, 2023.',
  alternates: { canonical: `${config.siteUrl}/privacy-policy` },
  robots: { index: true, follow: true },
}

export default function PrivacyPolicyRoute() {
  return <PrivacyPolicyPage />
}
