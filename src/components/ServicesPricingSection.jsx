'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Heart, ShieldCheck, Tag } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { CallCareButton } from '@/components/CallCareButton'
import { ServiceIcon } from '@/components/ServiceIcon'
import { config } from '@/data/config'
import { PRICING_CAREGIVER_NOTE, PRICING_FOOTNOTE } from '@/data/pricingCopy'
import { isLoginAndBookingDisabled } from '@/lib/featureFlags'
import { getTelHref } from '@/lib/contactLinks'
import { useServiceCatalog } from '@/hooks/useServiceCatalog'
import './ServicesPricingSection.css'
import '@/components/CallCareButton.css'

function formatInr(n) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(n)
}

export function ServicesPricingSection({ embedded = false }) {
  const loginBookingDisabled = isLoginAndBookingDisabled()
  const { plans, discountPct, loading, error } = useServiceCatalog()

  const displayDiscount = discountPct
  const showDiscount = displayDiscount > 0
  const waHref = config.contact.whatsapp
    ? `https://wa.me/${String(config.contact.whatsapp).replace(/\D/g, '')}?text=${encodeURIComponent('Hi Ambimed, I need a custom home healthcare quote.')}`
    : '#contact'

  return (
    <section
      id={embedded ? undefined : 'services-pricing'}
      className={`section section-services-pricing${embedded ? ' section-services-pricing--embedded' : ''}`}
      aria-labelledby={embedded ? undefined : 'services-pricing-heading'}
    >
      <div className="container services-pricing-inner">
        {!embedded ? (
          <header className="services-pricing-header">
            <Reveal className="services-pricing-eyebrow-pill" y={0}>
              <Tag className="services-pricing-eyebrow-pill__icon" strokeWidth={2} aria-hidden />
              Plans &amp; savings
            </Reveal>
            <Reveal as="h2" id="services-pricing-heading" className="services-pricing-title" y={10}>
              Services and Tariffs
            </Reveal>
            <Reveal as="p" className="services-pricing-lead" y={12}>
              Transparent pricing. Trusted care. Save more with our exclusive offers.
            </Reveal>
            <Reveal className="services-pricing-divider" y={8} aria-hidden>
              <span className="services-pricing-divider__line" />
              <Heart className="services-pricing-divider__heart" strokeWidth={1.75} />
              <span className="services-pricing-divider__line" />
            </Reveal>
          </header>
        ) : null}

        {loading ? (
          <p className="services-pricing-status" aria-live="polite">
            Loading catalogue…
          </p>
        ) : null}

        {!loading && error ? (
          <p className="services-pricing-status services-pricing-status--error" role="alert">
            {error}
          </p>
        ) : null}

        {!loading && !error && plans.length === 0 ? (
          <p className="services-pricing-status">
            No services are available in the catalogue right now. Please{' '}
            <a href={getTelHref()}>call customer care</a> for assistance.
          </p>
        ) : null}

        <div className="services-pricing-grid">
          {plans.map((plan, i) => (
            <Reveal
              key={plan.bookingServiceTypeId}
              as="article"
              className={`services-pricing-card services-pricing-card--${plan.accent}`}
              delay={i * 0.06}
              y={24}
            >
              <div className="services-pricing-card__hero">
                <ServiceIcon name={plan.icon} className="services-pricing-card__icon-wrap" />
                <h3 className="services-pricing-card__title">{plan.title}</h3>
                <p className="services-pricing-card__desc">{plan.description}</p>
                <span className="services-pricing-card__live-badge">Live catalogue</span>
              </div>

              <div className="services-pricing-card__monthly">
                <p className="services-pricing-card__monthly-label">Starting from</p>
                <p className="services-pricing-card__monthly-price">
                  {showDiscount && plan.discountedMonthly < plan.monthly ? (
                    <>
                      <span className="services-pricing-card__monthly-strike">{formatInr(plan.monthly)}</span>
                      <span className="services-pricing-card__monthly-amount">{formatInr(plan.discountedMonthly)}</span>
                    </>
                  ) : (
                    <span className="services-pricing-card__monthly-amount">{formatInr(plan.monthly)}</span>
                  )}
                  <span className="services-pricing-card__monthly-period">/month*</span>
                </p>
                <p className="services-pricing-card__monthly-daily">
                  {formatInr(plan.discountedDaily)}/day equivalent
                </p>
              </div>

              <ul className="services-pricing-lines">
                {plan.tiers.map((tier) => (
                  <li key={tier.id} className="services-pricing-line">
                    <div className="services-pricing-line__meta">
                      <span className="services-pricing-line__name">{tier.name}</span>
                      <span className="services-pricing-line__detail">{tier.shiftLabel}</span>
                    </div>
                    <div className="services-pricing-line__price">
                      {showDiscount && tier.dealPrice < tier.listPrice ? (
                        <>
                          <span className="services-pricing-line__strike">{formatInr(tier.listPrice)}</span>
                          <span className="services-pricing-line__deal">{formatInr(tier.dealPrice)}</span>
                        </>
                      ) : (
                        <span className="services-pricing-line__deal">{formatInr(tier.listPrice)}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {showDiscount && plan.maxSavings > 0 ? (
                <div className="services-pricing-savings">
                  <Tag className="services-pricing-savings__icon" strokeWidth={2} aria-hidden />
                  <span>
                    {displayDiscount}% OFF — You save up to {formatInr(plan.maxSavings)}
                  </span>
                </div>
              ) : null}

              <div className="services-pricing-card__foot">
                {!loginBookingDisabled ? (
                  <Link href={plan.bookHref} className="services-pricing-book">
                    Book {plan.shortTitle}
                    <ArrowRight className="services-pricing-book__arrow" strokeWidth={2.5} aria-hidden />
                  </Link>
                ) : null}
                <Link href={plan.serviceHref} className="services-pricing-details-link">
                  View service details
                  <ArrowRight className="services-pricing-details-link__arrow" strokeWidth={2.25} aria-hidden />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="services-pricing-trust" y={16}>
          <ShieldCheck className="services-pricing-trust__icon" strokeWidth={2} aria-hidden />
          <span>Trusted care. Verified professionals. No hidden charges.</span>
        </Reveal>

        <Reveal className="services-pricing-custom-quote" y={12}>
          <div className="services-pricing-custom-quote__inner">
            <div>
              <h3 className="services-pricing-custom-quote__title">Need a custom quote?</h3>
              <p className="services-pricing-custom-quote__text">
                Multi-service plans, 24-hour elder care, or specialised nursing — we&apos;ll confirm scope and pricing
                before you commit.
              </p>
            </div>
            <div className="services-pricing-custom-quote__ctas">
              <CallCareButton variant="primary" showPhone label="Call customer care" />
              <a href={waHref} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                Get quote on WhatsApp
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal as="p" className="services-pricing-footnote" y={0}>
          {PRICING_FOOTNOTE}
        </Reveal>
        <Reveal as="p" className="services-pricing-caregiver-note" y={0}>
          {PRICING_CAREGIVER_NOTE}
        </Reveal>
      </div>
    </section>
  )
}
