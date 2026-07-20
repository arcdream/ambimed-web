'use client'

import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import './RecognitionSection.css'

const DPIIT_BADGE = '/assets/recognition/dpiit-certified.png'

const TRUST_POINTS = [
  'DPIIT-certified startup under Startup India',
  'Healthcare & Lifesciences focus area',
  'Committed to compliant, trusted home care',
]

export function RecognitionSection() {
  return (
    <section id="recognition" className="section section-recognition" aria-labelledby="recognition-heading">
      <div className="container">
        <Reveal as="p" className="section-subtitle" y={10}>
          Recognition
        </Reveal>
        <Reveal as="h2" id="recognition-heading" className="section-title" delay={0.04} y={10}>
          Government of India recognized startup
        </Reveal>

        <div className="recognition-panel">
          <Reveal className="recognition-panel__badge-wrap" delay={0.06} y={16}>
            <img
              src={DPIIT_BADGE}
              alt="DPIIT certification seal — Department for Promotion of Industry and Internal Trade, Government of India"
              className="recognition-panel__badge"
              width={220}
              height={220}
              loading="lazy"
            />
          </Reveal>

          <div className="recognition-panel__copy">
            <Reveal as="p" className="recognition-panel__eyebrow" delay={0.08} y={12}>
              Recognized by DPIIT
            </Reveal>
            <Reveal as="p" className="recognition-panel__dept" delay={0.1} y={12}>
              Department for Promotion of Industry and Internal Trade, Government of India
            </Reveal>
            <Reveal as="p" className="recognition-panel__lead" delay={0.12} y={12}>
              Ambimed Healthcare is officially recognized as a startup by DPIIT — a mark of credibility
              for families choosing home healthcare in India.
            </Reveal>

            <ul className="recognition-panel__list">
              {TRUST_POINTS.map((point, i) => (
                <Reveal as="li" key={point} delay={0.14 + i * 0.04} y={10}>
                  <CheckCircle2 className="recognition-panel__check" strokeWidth={2.25} aria-hidden />
                  <span>{point}</span>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.26} y={10}>
              <Link href="/about/recognition" className="recognition-panel__link">
                View all recognition →
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
