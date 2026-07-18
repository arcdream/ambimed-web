'use client'

import { Reveal } from '@/components/motion/Reveal'
import './Pricing.css'

export function Pricing() {
  return (
    <section id="pricing" className="section section-pricing">
      <div className="container">
        <Reveal as="p" className="section-subtitle">
          Value for you
        </Reveal>
        <Reveal as="h2" className="section-title">
          Very reasonable pricing
        </Reveal>
        <Reveal as="h3" className="section-subheading" delay={0.05} y={12}>
          Fair quotes with no hidden charges
        </Reveal>
        <Reveal className="pricing-content" y={20}>
          <p className="pricing-text">
            We keep our prices fair and transparent so that more families can access quality
            home care. No hidden charges—you see what you pay. Contact us for a quote
            tailored to your needs.
          </p>
          <div className="pricing-cta">
            <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Get a quote</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
