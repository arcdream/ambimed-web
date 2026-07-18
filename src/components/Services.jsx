'use client'

import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import { services } from '../data/services'
import './Services.css'

const icons = {
  elder: '👴',
  physio: '🏥',
  nurse: '🩺',
  baby: '👶',
}

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
                whileHover={{ y: -4 }}
              >
                {item.image && (
                  <div className="service-card-image-wrap">
                    <img src={item.image} alt="" />
                  </div>
                )}
                <span className="service-icon" aria-hidden>{icons[item.icon] || '•'}</span>
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
