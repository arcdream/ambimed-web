'use client'

import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import { homeSeoArticle } from '../data/homePageSeoCopy'
import './SeoContentSection.css'

export function SeoContentSection() {
  const { eyebrow, title, lead, sections } = homeSeoArticle

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
        <Reveal as="article" className="seo-article-body" delay={0.1} y={20}>
          <p className="seo-article-lead">{lead}</p>
          {sections.map((block) => (
            <div key={block.id} className="seo-article-block">
              <h3 id={`seo-h3-${block.id}`} className="seo-article-h3">
                {block.heading}
              </h3>
              {block.paragraphs.map((p, i) => (
                <p key={i} className="seo-article-p">
                  {p}
                </p>
              ))}
            </div>
          ))}
          <p className="seo-article-cta">
            <Link href="/app/booking" className="seo-article-book-link">
              Book home care online
            </Link>{' '}
            or scroll to{' '}
            <a href="#contact">contact us</a> for a tailored quote.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
