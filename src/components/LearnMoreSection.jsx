'use client'

import {
  Headphones,
  IndianRupee,
  MessageCircle,
  ShieldCheck,
  Tag,
  Users,
} from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { config } from '@/data/config'
import { learnMoreSection } from '@/data/learnMoreSection'
import './LearnMoreSection.css'

const CARD_ICONS = {
  shield: ShieldCheck,
  rupee: IndianRupee,
  headset: Headphones,
  users: Users,
}

const TRUST_ICONS = {
  shield: ShieldCheck,
  tag: Tag,
  rupee: IndianRupee,
  headset: Headphones,
  whatsapp: MessageCircle,
}

function getCardTagline(card) {
  if (card.taglineKey === 'familiesServed') {
    return `${config.heroTrustStats.headline} families served across India`
  }
  return card.tagline
}

export function LearnMoreSection() {
  const { eyebrow, title, lead, image, imageAlt, cards, trustBar } = learnMoreSection

  return (
    <section id="learn-more" className="section section-learn-more" aria-labelledby="learn-more-heading">
      <div className="learn-more-body">
        <div className="container">
          <div className="learn-more-hero">
            <Reveal className="learn-more-hero__copy" y={14}>
              <p className="learn-more-hero__eyebrow">{eyebrow}</p>
              <h2 id="learn-more-heading" className="learn-more-hero__title">
                {title}
              </h2>
              <p className="learn-more-hero__lead">{lead}</p>
            </Reveal>

            <Reveal className="learn-more-hero__visual" delay={0.06} y={16}>
              <div className="learn-more-hero__image-wrap">
                <img src={image} alt={imageAlt} className="learn-more-hero__image" loading="lazy" />
              </div>
            </Reveal>
          </div>

          <div className="learn-more-cards">
            {cards.map((card, i) => {
              const Icon = CARD_ICONS[card.icon] ?? ShieldCheck
              return (
                <Reveal key={card.title} className="learn-more-card" delay={i * 0.05} y={16}>
                  <span className="learn-more-card__icon" aria-hidden>
                    <Icon strokeWidth={1.75} />
                  </span>
                  <h3 className="learn-more-card__title">{card.title}</h3>
                  <p className="learn-more-card__tagline">{getCardTagline(card)}</p>
                  <p className="learn-more-card__desc">{card.description}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>

      <div className="learn-more-trust-bar" aria-label="Ambimed service highlights">
        <div className="container learn-more-trust-bar__inner">
          {trustBar.map((item) => {
            const Icon = TRUST_ICONS[item.icon] ?? ShieldCheck
            return (
              <div key={item.label} className="learn-more-trust-bar__item">
                <Icon className="learn-more-trust-bar__icon" strokeWidth={1.85} aria-hidden />
                <span>{item.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
