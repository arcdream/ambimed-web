'use client'

import Link from 'next/link'
import { MapPin, Receipt, ShieldCheck } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { homeSeoArticle } from '../data/homePageSeoCopy'
import { isLoginAndBookingDisabled } from '@/lib/featureFlags'
import { getBookCareHref } from '@/lib/ctaLinks'
import { getTelHref } from '@/lib/contactLinks'
import './SeoContentSection.css'

const STAT_ICONS = {
  map: MapPin,
  shield: ShieldCheck,
  receipt: Receipt,
}

function renderParagraph(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

export function SeoContentSection() {
  const loginBookingDisabled = isLoginAndBookingDisabled()
  const { eyebrow, title, lead, stats, sections } = homeSeoArticle

  return (
    <section
      id="home-healthcare-guide"
      className="section section-seo-article"
      aria-labelledby="seo-article-heading"
    >
      <div className="container">
        <Reveal as="p" className="section-subtitle">
          {eyebrow}
        </Reveal>
        <Reveal as="h2" id="seo-article-heading" className="section-title" delay={0.05}>
          {title}
        </Reveal>
        <Reveal as="p" className="seo-article-lead" delay={0.08}>
          {renderParagraph(lead)}
        </Reveal>

        <Reveal className="seo-stats-strip" delay={0.1} y={16}>
          {stats.map((stat) => {
            const Icon = STAT_ICONS[stat.icon] ?? ShieldCheck
            return (
              <div key={stat.label} className="seo-stat-card">
                <span className="seo-stat-card__icon-wrap" aria-hidden>
                  <Icon className="seo-stat-card__icon" strokeWidth={1.75} />
                </span>
                <p className="seo-stat-card__value">{stat.value}</p>
                <p className="seo-stat-card__label">{stat.label}</p>
              </div>
            )
          })}
        </Reveal>

        <div className="seo-article-sections">
          {sections.map((block, i) => (
            <Reveal
              key={block.id}
              className={`seo-article-row seo-article-row--${block.layout}`}
              delay={i * 0.05}
              y={24}
            >
              <div className="seo-article-row__copy">
                <h3 id={`seo-h3-${block.id}`} className="seo-article-h3">
                  {block.heading}
                </h3>
                {block.paragraphs.map((p, j) => (
                  <p key={j} className="seo-article-p">
                    {renderParagraph(p)}
                  </p>
                ))}
              </div>
              <div className="seo-article-row__visual">
                <div className="seo-article-image-wrap">
                  <img src={block.image} alt={block.imageAlt} loading="lazy" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" className="seo-article-cta" delay={0.05} y={12}>
          <Link href={getBookCareHref()} className="seo-article-book-link">
            Book home care online
          </Link>{' '}
          or <Link href="/contact">contact us</Link> for a tailored quote.
          {!loginBookingDisabled ? null : (
            <>
              {' '}
              You can also <a href={getTelHref()}>call our team</a>.
            </>
          )}
        </Reveal>
      </div>
    </section>
  )
}
