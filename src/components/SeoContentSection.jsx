'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { homeSeoArticle } from '../data/homePageSeoCopy'
import { isLoginAndBookingDisabled } from '@/lib/featureFlags'
import { getTelHref } from '@/lib/contactLinks'
import './SeoContentSection.css'

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
  const { eyebrow, title, paragraphs, image, imageAlt, trustHighlights, sections } = homeSeoArticle

  return (
    <section
      id="home-healthcare-guide"
      className="section section-seo-article"
      aria-labelledby="seo-article-heading"
    >
      <div className="container">
        <header className="seo-guide-header">
          <Reveal as="p" className="section-subtitle" y={12}>
            {eyebrow}
          </Reveal>
          <Reveal as="h2" id="seo-article-heading" className="seo-guide-title" delay={0.04} y={16}>
            {title}
          </Reveal>
        </header>

        <div className="seo-guide-grid">
          <Reveal className="seo-guide-visual" delay={0.08} y={20}>
            <div className="seo-guide-image-wrap">
              <img src={image} alt={imageAlt} loading="lazy" />
            </div>
          </Reveal>

          <div className="seo-guide-copy">
            {paragraphs.map((paragraph, i) => (
              <Reveal
                key={paragraph.slice(0, 24)}
                as="p"
                className="seo-guide-paragraph"
                delay={0.1 + i * 0.05}
                y={16}
              >
                {renderParagraph(paragraph)}
              </Reveal>
            ))}

            <Reveal className="seo-guide-trust" delay={0.22} y={14}>
              <ul className="seo-guide-trust__list">
                {trustHighlights.map((item) => (
                  <li key={item} className="seo-guide-trust__item">
                    <Check className="seo-guide-trust__icon" strokeWidth={2.5} aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {sections?.length ? (
          <div className="seo-article-sections">
            {sections.map((block, i) => (
              <Reveal
                key={block.id}
                className={`seo-article-row seo-article-row--${block.layout}`}
                delay={0.08 + i * 0.05}
                y={24}
              >
                <div className="seo-article-row__copy">
                  <h3 id={`seo-h3-${block.id}`} className="seo-article-h3">
                    {block.heading}
                  </h3>
                  {block.paragraphs.map((paragraph, j) => (
                    <p key={j} className="seo-article-p">
                      {renderParagraph(paragraph)}
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
        ) : null}

        <Reveal as="p" className="seo-article-cta" delay={0.12} y={12}>
          {loginBookingDisabled ? (
            <>
              <a href={getTelHref()} className="seo-article-book-link">
                Call customer care
              </a>{' '}
              or <Link href="/contact">contact us</Link> for a tailored quote.
            </>
          ) : (
            <>
              <Link href="/app/booking" className="seo-article-book-link">
                Book home care online
              </Link>{' '}
              or <Link href="/contact">contact us</Link> for a tailored quote.
            </>
          )}
        </Reveal>
      </div>
    </section>
  )
}
