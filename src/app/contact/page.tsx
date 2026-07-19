import type { Metadata } from 'next'
import { ContactPage } from '@/components/ContactPage'
import { config } from '@/data/config'

export const metadata: Metadata = {
  title: 'Contact | Ambimed Healthcare',
  description: 'Contact Ambimed for home healthcare quotes, support, and service enquiries.',
  alternates: { canonical: `${config.siteUrl}/contact` },
}

export default function ContactRoute() {
  return <ContactPage />
}
