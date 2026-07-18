'use client'

import { BadgeCheck } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { caregiverShowcase, caregiverTrustBadges } from '@/data/caregiverShowcase'
import './Caregivers.css'

export function Caregivers() {
  return (
    <section id="caregivers" className="section section-caregivers">
      <div className="container">
        <Reveal as="p" className="section-subtitle">
          Our people
        </Reveal>
        <Reveal as="h2" className="section-title">
          Well-trained, well-groomed caregivers
        </Reveal>
        <Reveal as="h3" className="section-subheading" delay={0.05} y={12}>
          What we look for in every caregiver
        </Reveal>

        <Reveal className="caregiver-trust-badges" delay={0.08} y={12}>
          {caregiverTrustBadges.map((badge) => (
            <span key={badge.id} className="caregiver-trust-badge">
              <BadgeCheck className="caregiver-trust-badge__icon" strokeWidth={2} aria-hidden />
              {badge.label}
            </span>
          ))}
        </Reveal>

        <Reveal className="caregivers-content" y={20}>
          <div className="caregivers-image-wrap">
            <img src="/assets/elder-care-home.png" alt="Caregiver assisting elderly client at home" />
          </div>
          <p className="caregivers-text">
            Every Ambimed caregiver is trained and groomed to the highest standards. We believe
            that quality care starts with quality people—professional, empathetic, and dedicated
            to your family&apos;s comfort and safety.
          </p>
          <ul className="caregivers-list">
            <li>Rigorous training and background checks</li>
            <li>Uniform and professional appearance</li>
            <li>Compassionate and respectful</li>
            <li>Skilled in elder care, nursing, physio, and mother &amp; baby care</li>
          </ul>
        </Reveal>

        <Reveal as="h3" className="caregivers-showcase-heading" delay={0.05} y={12}>
          Meet our care professionals
        </Reveal>
        <p className="caregivers-showcase-note">
          Representative profiles — photos are placeholders pending client assets.
        </p>

        <div className="caregiver-showcase-grid">
          {caregiverShowcase.map((person, i) => (
            <Reveal key={person.id} as="article" className="caregiver-showcase-card" delay={i * 0.06} y={20}>
              <div className="caregiver-showcase-card__photo-wrap">
                <img src={person.photo} alt="" loading="lazy" />
              </div>
              <div className="caregiver-showcase-card__body">
                <h4 className="caregiver-showcase-card__name">
                  {person.name} — {person.role}
                </h4>
                <p className="caregiver-showcase-card__meta">{person.experience}</p>
                <p className="caregiver-showcase-card__specialty">{person.specialty}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
