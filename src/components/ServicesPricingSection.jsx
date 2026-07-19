'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, Heart, Tag } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { ServiceIcon } from '@/components/ServiceIcon'
import { config } from '@/data/config'
import { isLoginAndBookingDisabled } from '@/lib/featureFlags'
import {
  homePricingPlans,
  PRICING_CAREGIVER_NOTE,
  PRICING_FOOTNOTE,
  DEFAULT_DISCOUNT_PCT,
} from '@/data/homePricing'
import { metadataService } from '@/client-app/services/metadataService'
import { fetchDefaultDiscount } from '@/client-app/services/discountService'
import { isSupabaseConfigured } from '@/client-app/lib/supabase'
import './ServicesPricingSection.css'

function formatInr(n) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(n)
}

function monthlyFromDaily(daily) {
  return Math.round(daily * 30)
}

function applyDiscount(price, discountPct) {
  if (!discountPct || discountPct <= 0) return price
  return Math.round((price * (100 - discountPct)) / 100)
}

function shiftLabelFromSubtype(sub) {
  const name = sub.shiftTypeName?.trim()
  const hours = sub.shiftDurationHours
  if (name && hours) return `${name} · ${hours}H`
  if (name) return name
  if (hours) return `${hours}H session`
  return 'Per visit'
}

function buildTiersFromLive(subtypes, discountPct) {
  return subtypes.map((sub) => {
    const listPrice = sub.price
    const dealPrice = applyDiscount(listPrice, discountPct)
    return {
      id: sub.id,
      name: sub.userFriendlyName || sub.subtypeName,
      shiftLabel: shiftLabelFromSubtype(sub),
      listPrice,
      dealPrice,
      savings: listPrice - dealPrice,
    }
  })
}

function buildTiersFromFallback(fallbackTiers, discountPct) {
  return fallbackTiers.map((tier, i) => {
    const listPrice = tier.priceInr
    const dealPrice = applyDiscount(listPrice, discountPct)
    return {
      id: `fallback-${i}`,
      name: tier.name,
      shiftLabel: tier.shiftLabel,
      listPrice,
      dealPrice,
      savings: listPrice - dealPrice,
    }
  })
}

export function ServicesPricingSection() {
  const loginBookingDisabled = isLoginAndBookingDisabled()
  const [liveServices, setLiveServices] = useState([])
  const [discountPct, setDiscountPct] = useState(DEFAULT_DISCOUNT_PCT)
  const [liveLoaded, setLiveLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      if (!isSupabaseConfigured()) {
        setLiveLoaded(true)
        return
      }
      try {
        const [svc, disc] = await Promise.all([
          metadataService.fetchServicesMetadata(),
          fetchDefaultDiscount(),
        ])
        if (cancelled) return
        setLiveServices(svc ?? [])
        const pct = disc?.discountPct ?? DEFAULT_DISCOUNT_PCT
        setDiscountPct(Number.isFinite(pct) ? pct : DEFAULT_DISCOUNT_PCT)
      } catch (e) {
        console.error(e)
      } finally {
        if (!cancelled) setLiveLoaded(true)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const plans = useMemo(() => {
    const effectiveDiscount = discountPct

    return homePricingPlans.map((plan) => {
      const live = liveServices.find(
        (s) => String(s.id) === plan.bookingServiceTypeId || s.slug === plan.id,
      )

      const tiers =
        live?.subtypes?.length > 0
          ? buildTiersFromLive(live.subtypes, effectiveDiscount)
          : buildTiersFromFallback(plan.tiers, effectiveDiscount)

      const lowestDeal = tiers.reduce(
        (min, t) => (t.dealPrice < min ? t.dealPrice : min),
        tiers[0]?.dealPrice ?? plan.startingDailyInr,
      )
      const lowestList = tiers.reduce(
        (min, t) => (t.listPrice < min ? t.listPrice : min),
        tiers[0]?.listPrice ?? plan.startingDailyInr,
      )
      const maxSavings = tiers.reduce((max, t) => (t.savings > max ? t.savings : max), 0)

      return {
        ...plan,
        tiers,
        hasLivePrice: Boolean(live?.subtypes?.length),
        daily: lowestList,
        discountedDaily: lowestDeal,
        monthly: monthlyFromDaily(lowestList),
        discountedMonthly: monthlyFromDaily(lowestDeal),
        maxSavings,
        bookHref: `/app/book/${plan.bookingServiceTypeId}`,
        serviceHref: `/services/${plan.id}`,
      }
    })
  }, [liveServices, discountPct])

  const displayDiscount = discountPct
  const showDiscount = displayDiscount > 0
  const waHref = config.contact.whatsapp
    ? `https://wa.me/${String(config.contact.whatsapp).replace(/\D/g, '')}?text=${encodeURIComponent('Hi Ambimed, I need a custom home healthcare quote.')}`
    : '#contact'

  return (
    <section id="services-pricing" className="section section-services-pricing" aria-labelledby="services-pricing-heading">
      <div className="container services-pricing-inner">
        <header className="services-pricing-header">
          <Reveal className="services-pricing-eyebrow-pill" y={0}>
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

        <div className="services-pricing-grid">
          {plans.map((plan, i) => (
            <Reveal
              key={plan.id}
              as="article"
              className={`services-pricing-card services-pricing-card--${plan.accent}`}
              delay={i * 0.06}
              y={24}
            >
              <div className="services-pricing-card__hero">
                <ServiceIcon name={plan.icon} className="services-pricing-card__icon-wrap" />
                <h3 className="services-pricing-card__title">{plan.title}</h3>
                <p className="services-pricing-card__desc">{plan.description}</p>
                {plan.hasLivePrice && liveLoaded ? (
                  <span className="services-pricing-card__live-badge">Live catalogue</span>
                ) : null}
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
                {!loginBookingDisabled && (
                  <Link href={plan.bookHref} className="services-pricing-book">
                    Book {plan.shortTitle}
                    <ArrowRight className="services-pricing-book__arrow" strokeWidth={2.5} aria-hidden />
                  </Link>
                )}
                <Link href={plan.serviceHref} className="services-pricing-details-link">
                  View service details
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="services-pricing-info-strip" y={16}>
          <div className="services-pricing-info-card services-pricing-info-card--offer">
            <span className="services-pricing-info-card__icon-wrap" aria-hidden>
              <Tag strokeWidth={2} />
            </span>
            <div>
              <p className="services-pricing-info-card__title">
                {showDiscount ? `Up to ${displayDiscount}% OFF on eligible bookings` : 'Exclusive offers on eligible bookings'}
              </p>
              <p className="services-pricing-info-card__text">
                Save more when you book with our current offers.
              </p>
            </div>
          </div>
          <div className="services-pricing-info-card services-pricing-info-card--booking">
            <span className="services-pricing-info-card__icon-wrap" aria-hidden>
              <Calendar strokeWidth={2} />
            </span>
            <div>
              <p className="services-pricing-info-card__title">Minimum booking: 1 month</p>
              <p className="services-pricing-info-card__text">
                All services require a minimum booking of 1 month.
              </p>
            </div>
          </div>
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
              <a href={waHref} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Get quote on WhatsApp
              </a>
              {!loginBookingDisabled && (
                <Link href="/app/booking" className="btn btn-secondary">
                  Book online
                </Link>
              )}
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
