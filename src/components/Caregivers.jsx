'use client'

import { Reveal } from '@/components/motion/Reveal'
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
        <Reveal className="caregivers-content" y={20}>
          <div className="caregivers-image-wrap">
            <img src="/assets/elder-care-home.png" alt="Caregiver assisting elderly client at home" />
          </div>
          <p className="caregivers-text">
            Every Ambimed caregiver is trained and groomed to the highest standards. We believe
            that quality care starts with quality people—professional, empathetic, and dedicated
            to your family’s comfort and safety.
          </p>
          <ul className="caregivers-list">
            <li>Rigorous training and background checks</li>
            <li>Uniform and professional appearance</li>
            <li>Compassionate and respectful</li>
            <li>Skilled in elder care, nursing, physio, and mother & baby care</li>
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
