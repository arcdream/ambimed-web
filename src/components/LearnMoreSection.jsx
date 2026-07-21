'use client'

import { Check } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { learnMoreSection } from '@/data/learnMoreSection'
import './LearnMoreSection.css'

export function LearnMoreSection() {
  const { eyebrow, titleAccent, titleMain, lead, image, imageAlt, stats, cards } = learnMoreSection

  return (
    <section id="why-choose" className="section section-why-choose" aria-labelledby="why-choose-heading">
      <div className="container">
        <div className="why-choose-intro">
          <Reveal className="why-choose-intro__copy" y={18}>
            <p className="why-choose-eyebrow">{eyebrow}</p>
            <h2 id="why-choose-heading" className="why-choose-title">
              <span className="why-choose-title__accent">{titleAccent}</span>
              <span className="why-choose-title__main">{titleMain}</span>
            </h2>
            <p className="why-choose-lead">{lead}</p>
          </Reveal>

          <Reveal className="why-choose-visual" delay={0.08} y={20}>
            <div className="why-choose-visual__frame">
              <img src={image} alt={imageAlt} className="why-choose-visual__img" loading="lazy" />
            </div>
          </Reveal>
        </div>

        <div className="why-choose-stats">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              className="why-choose-stat"
              delay={0.1 + i * 0.06}
              y={14}
              whileHover={{ y: -3 }}
            >
              <p className="why-choose-stat__value">{stat.value}</p>
              <p className="why-choose-stat__label">{stat.label}</p>
              <p className="why-choose-stat__detail">{stat.detail}</p>
            </Reveal>
          ))}
        </div>

        <div className="why-choose-cards">
          {cards.map((card, i) => (
            <Reveal
              key={card.title}
              className="why-choose-card"
              delay={0.14 + i * 0.06}
              y={18}
              whileHover={{ y: -5 }}
            >
              <span className="why-choose-card__icon" aria-hidden>
                <Check strokeWidth={2.5} />
              </span>
              <h3 className="why-choose-card__title">{card.title}</h3>
              <p className="why-choose-card__desc">{card.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
