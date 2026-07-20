'use client'

import Link from 'next/link'
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
  const { sections } = homeSeoArticle

  return (
    <section
      id="home-healthcare-guide"
      className="section section-seo-article"
      aria-label="Home healthcare guide"
    >
      <div className="container">
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
