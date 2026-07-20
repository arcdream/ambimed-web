'use client'

import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import { ServiceIcon } from '@/components/ServiceIcon'
import { getServiceSlug, mapDbIconToUi } from '@/lib/serviceCatalog'
import { useServiceCatalog } from '@/hooks/useServiceCatalog'
import './Services.css'

export function Services() {
  const { services, loading, error } = useServiceCatalog()

  return (
    <section id="services" className="section section-services">
      <div className="container">
        <Reveal as="p" className="section-subtitle">
          What we offer
        </Reveal>
        <Reveal as="h2" className="section-title" delay={0.05}>
          Our services
        </Reveal>
        <Reveal as="p" className="services-intro" delay={0.08}>
          Professional, verified home care — explore each service to learn more and view pricing.
        </Reveal>

        {loading ? <p className="services-status">Loading services…</p> : null}
        {!loading && error ? (
          <p className="services-status services-status--error" role="alert">
            {error}
          </p>
        ) : null}

        <div className="services-grid">
          {services.map((item, i) => {
            const slug = getServiceSlug(item)
            return (
              <Link
                key={item.id}
                href={`/services/${slug}`}
                className="service-card-link"
                aria-label={`Learn about ${item.name}`}
              >
                <Reveal
                  as="article"
                  className="service-card"
                  delay={i * 0.08}
                  y={25}
                  whileHover={{ y: -6 }}
                >
                  <ServiceIcon name={mapDbIconToUi(item.icon)} />
                  <h3 className="service-title">{item.name}</h3>
                  <p className="service-desc">{item.description}</p>
                  <span className="service-card-cta">Learn more →</span>
                </Reveal>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
