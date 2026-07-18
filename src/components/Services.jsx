'use client'

import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import { ServiceIcon } from '@/components/ServiceIcon'
import { services } from '../data/services'
import './Services.css'

export function Services() {
  return (
    <section id="services" className="section section-services">
      <div className="container">
        <Reveal as="p" className="section-subtitle">
          What we offer
        </Reveal>
        <Reveal as="h2" className="section-title" delay={0.05}>
          Our services
        </Reveal>
        <div className="services-grid">
          {services.map((item, i) => (
            <Link
              key={item.id}
              href={`/services/${item.id}`}
              className="service-card-link"
              aria-label={`Learn about ${item.title}`}
            >
              <Reveal
                as="article"
                className="service-card"
                delay={i * 0.08}
                y={25}
                whileHover={{ y: -6 }}
              >
                {item.image && (
                  <div className="service-card-image-wrap">
                    <img src={item.image} alt="" />
                  </div>
                )}
                <ServiceIcon name={item.icon} />
                <h3 className="service-title">{item.title}</h3>
                <p className="service-desc">{item.description}</p>
                <span className="service-card-cta">Learn more →</span>
              </Reveal>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
