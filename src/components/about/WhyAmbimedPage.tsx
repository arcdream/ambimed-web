'use client'

import Link from 'next/link'
import {
  BadgeCheck,
  Calendar,
  Heart,
  IndianRupee,
  Phone,
  ShieldCheck,
} from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { MarketingPageShell } from '@/components/layout/MarketingPageShell'
import { PageHero } from '@/components/layout/PageHero'
import { config } from '@/data/config'
import './AboutPages.css'
import './WhyAmbimedPage.css'

const WHY_ITEMS = [
  {
    icon: ShieldCheck,
    title: 'Verified Caregivers',
    description: 'Every professional passes background checks, ID verification, and skill assessment.',
  },
  {
    icon: BadgeCheck,
    title: 'Qualified Nurses',
    description: 'Registered nurses with hospital experience in medical and surgical care.',
  },
  {
    icon: IndianRupee,
    title: 'Affordable Pricing',
    description: 'Transparent rates with no hidden charges — know the cost before you book.',
  },
  {
    icon: Phone,
    title: 'Emergency Support',
    description: '24/7 helpline with rapid deployment for urgent care requirements.',
  },
  {
    icon: Calendar,
    title: 'Flexible Booking',
    description: 'Hourly, daily, or monthly packages — book online when booking is available.',
  },
  {
    icon: Heart,
    title: 'Trusted by Families',
    description: `${config.heroTrustStats.headline} families across India trust Ambimed for home healthcare.`,
  },
]

export function WhyAmbimedPage() {
  return (
    <MarketingPageShell>
      <PageHero
        eyebrow="About Us"
        title="Why Ambimed"
        description="Dependable, affordable home healthcare — driven by integrity, training, and compassion."
      />
      <section className="section why-ambimed-section">
        <div className="container">
          <Reveal className="why-ambimed-intro" y={12}>
            <p>
              Ambimed exists to bring dependable, affordable healthcare to your home. Every service we
              offer — elder care, physiotherapy, home nurses, mother &amp; baby care — is driven by a
              simple goal: to serve families and society with integrity and compassion.
            </p>
          </Reveal>
          <div className="why-ambimed-grid">
            {WHY_ITEMS.map((item, i) => {
              const Icon = item.icon
              return (
                <Reveal key={item.title} className="why-ambimed-card" delay={i * 0.05} y={16}>
                  <span className="why-ambimed-card__icon" aria-hidden>
                    <Icon strokeWidth={1.75} />
                  </span>
                  <h2 className="why-ambimed-card__title">{item.title}</h2>
                  <p className="why-ambimed-card__desc">{item.description}</p>
                </Reveal>
              )
            })}
          </div>
          <Reveal className="why-ambimed-cta" y={12}>
            <Link href="/pricing" className="btn btn-primary">
              View pricing
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Contact us
            </Link>
          </Reveal>
        </div>
      </section>
    </MarketingPageShell>
  )
}
