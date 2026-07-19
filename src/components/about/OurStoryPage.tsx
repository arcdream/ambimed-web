'use client'

import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import { MarketingPageShell } from '@/components/layout/MarketingPageShell'
import { PageHero } from '@/components/layout/PageHero'
import { Mission } from '@/components/Mission'
import './AboutPages.css'
import './WhyAmbimedPage.css'

export function OurStoryPage() {
  return (
    <MarketingPageShell>
      <PageHero
        eyebrow="About Us"
        title="Our Story"
        description="Trusted home healthcare built on compassion, training, and a commitment to serve families across India."
      />
      <section className="section about-page-section">
        <div className="container about-page-grid">
          <Reveal className="about-page-copy" y={0} x={-16}>
            <h2 className="about-page-heading">About Ambimed Healthcare</h2>
            <h3 className="about-page-subheading">Trusted care at your doorstep</h3>
            <p className="about-page-text">
              We bring trusted healthcare to your doorstep—elder care, physiotherapy, home nurses,
              and mother &amp; baby care. Our mission is to make quality care accessible and affordable.
            </p>
            <p className="about-page-text">
              We are motivated by serving society. Every caregiver is well trained and well groomed,
              and we keep our pricing very reasonable so more families can benefit.
            </p>
            <ul className="about-page-list">
              <li>Well-trained, well-groomed caregivers</li>
              <li>Transparent billing and clear pricing</li>
              <li>Reasonable rates for families</li>
              <li>Committed to serving society</li>
            </ul>
            <div className="about-page-links">
              <Link href="/about/why-ambimed" className="about-page-link">
                Why choose Ambimed →
              </Link>
              <Link href="/about/recognition" className="about-page-link">
                Our recognition →
              </Link>
            </div>
          </Reveal>
          <Reveal className="about-page-visual" y={0} x={16}>
            <div className="about-page-image-wrap">
              <img src="/assets/about-care-at-home.png" alt="Ambimed care at home" />
            </div>
          </Reveal>
        </div>
      </section>
      <Mission />
    </MarketingPageShell>
  )
}
