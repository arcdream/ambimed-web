'use client'

import { Check } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { ServiceLeadForm } from '@/components/service-landing/ServiceLeadForm'
import { homeLeadForm } from '@/data/homeLeadForm'
import './HomeBookCareSection.css'

export function HomeBookCareSection() {
  const { eyebrow, title, lead, highlights, serviceOptions, defaultService } = homeLeadForm

  return (
    <section id="book-care" className="section section-home-book" aria-labelledby="home-book-heading">
      <div className="container">
        <div className="home-book-grid">
          <div className="home-book-copy">
            <Reveal as="p" className="section-subtitle" y={12}>
              {eyebrow}
            </Reveal>
            <Reveal as="h2" id="home-book-heading" className="section-title" delay={0.04} y={16}>
              {title}
            </Reveal>
            <Reveal as="p" className="home-book-lead" delay={0.08} y={14}>
              {lead}
            </Reveal>
            <Reveal as="ul" className="home-book-highlights" delay={0.12} y={14}>
              {highlights.map((item) => (
                <li key={item}>
                  <Check className="home-book-highlights__icon" strokeWidth={2.5} aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </Reveal>
          </div>

          <Reveal className="home-book-form-wrap" delay={0.1} y={20}>
            <ServiceLeadForm
              serviceTitle={defaultService}
              defaultService={defaultService}
              serviceOptions={serviceOptions}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
