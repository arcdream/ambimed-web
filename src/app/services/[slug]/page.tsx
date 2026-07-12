import { notFound } from 'next/navigation'
import { ServiceLandingPage } from '@/components/service-landing/ServiceLandingPage'
import { config } from '@/data/config'
import { getAllServiceSlugs, getServiceLandingBySlug } from '@/data/serviceLandings'

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const landing = getServiceLandingBySlug(slug)
  if (!landing) return { title: 'Service Not Found' }

  const url = `${config.siteUrl}/services/${slug}`

  return {
    title: landing.seo.title,
    description: landing.seo.description,
    keywords: landing.seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: landing.seo.title,
      description: landing.seo.description,
      url,
      type: 'website',
      images: [{ url: `${config.siteUrl}${landing.image}`, alt: landing.hero.title }],
    },
  }
}

function buildJsonLd(landing: NonNullable<ReturnType<typeof getServiceLandingBySlug>>) {
  const url = `${config.siteUrl}/services/${landing.slug}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: config.siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${config.siteUrl}/#services` },
          { '@type': 'ListItem', position: 3, name: landing.hero.eyebrow, item: url },
        ],
      },
      {
        '@type': 'MedicalBusiness',
        name: 'Ambimed Healthcare',
        url: config.siteUrl,
        telephone: config.contact.phone,
        email: config.contact.email,
        areaServed: config.citiesOperating,
      },
      {
        '@type': 'Service',
        name: landing.hero.title,
        description: landing.seo.description,
        url,
        provider: { '@type': 'Organization', name: 'Ambimed Healthcare', url: config.siteUrl },
        areaServed: { '@type': 'Country', name: 'India' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: landing.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
    ],
  }
}

export default async function ServiceLandingRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const landing = getServiceLandingBySlug(slug)
  if (!landing) notFound()

  const jsonLd = buildJsonLd(landing)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceLandingPage landing={landing} />
    </>
  )
}
