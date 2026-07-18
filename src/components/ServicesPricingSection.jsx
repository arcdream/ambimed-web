'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { config } from '@/data/config'
import { homePricingPlans, PRICING_FOOTNOTE } from '@/data/homePricing'
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

export function ServicesPricingSection() {
  const [liveServices, setLiveServices] = useState([])
  const [discountPct, setDiscountPct] = useState(0)
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
        const pct = disc?.discountPct ?? 0
        setDiscountPct(Number.isFinite(pct) ? pct : 0)
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
    return homePricingPlans.map((plan) => {
      const live = liveServices.find(
        (s) => String(s.id) === plan.bookingServiceTypeId || s.slug === plan.id,
      )
      let daily = plan.startingDailyInr
      if (live?.subtypes?.length) {
        const prices = live.subtypes.map((sub) => sub.price).filter((p) => p > 0)
        if (prices.length) daily = Math.min(...prices)
      }
      const discountedDaily =
        discountPct > 0 ? Math.round((daily * (100 - discountPct)) / 100) : daily

      return {
        ...plan,
        daily,
        discountedDaily,
        monthly: monthlyFromDaily(daily),
        discountedMonthly: monthlyFromDaily(discountedDaily),
        hasLivePrice: Boolean(live?.subtypes?.length),
        bookHref: `/app/book/${plan.bookingServiceTypeId}`,
      }
    })
  }, [liveServices, discountPct])

  const showDiscount = discountPct > 0
  const waHref = config.contact.whatsapp
    ? `https://wa.me/${String(config.contact.whatsapp).replace(/\D/g, '')}?text=${encodeURIComponent('Hi Ambimed, I need a custom home healthcare quote.')}`
    : '#contact'

  return (
    <section id="services-pricing" className="section section-services-pricing" aria-labelledby="services-pricing-heading">
      <div className="container services-pricing-inner">
        <div className="services-pricing-header">
          {showDiscount && (
            <Reveal className="services-pricing-promo-pill" y={0}>
              <span className="services-pricing-promo-pill__spark" aria-hidden>
                ✦
              </span>
              <span>
                Up to <strong>{discountPct}% off</strong> on eligible bookings
              </span>
            </Reveal>
          )}
          <Reveal className="services-pricing-min-booking-banner" y={8}>
            Minimum booking 1 month · Transparent daily rates
          </Reveal>
          <Reveal as="p" className="section-subtitle services-pricing-subtitle" y={12}>
            Plans &amp; savings
          </Reveal>
          <Reveal as="h2" id="services-pricing-heading" className="section-title services-pricing-title" y={14}>
            Services, prices &amp; discounts
          </Reveal>
          <Reveal as="p" className="services-pricing-lead" y={12}>
            Starting rates for each service line — published upfront, no hidden fees. Live catalogue prices shown when
            available.
          </Reveal>
        </div>

        <div className="home-pricing-grid">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} as="article" className="home-pricing-card" delay={i * 0.06} y={24}>
              <header className="home-pricing-card__head">
                <h3 className="home-pricing-card__title">{plan.title}</h3>
                {plan.hasLivePrice && liveLoaded ? (
                  <span className="home-pricing-card__live-badge">Live rate</span>
                ) : null}
              </header>

              <div className="home-pricing-card__price-block">
                <p className="home-pricing-card__label">Starting from</p>
                <p className="home-pricing-card__price">
                  {showDiscount && plan.discountedMonthly < plan.monthly ? (
                    <>
                      <span className="home-pricing-card__strike">{formatInr(plan.monthly)}</span>
                      <span className="home-pricing-card__amount">{formatInr(plan.discountedMonthly)}</span>
                    </>
                  ) : (
                    <span className="home-pricing-card__amount">{formatInr(plan.monthly)}</span>
                  )}
                  <span className="home-pricing-card__period">/month*</span>
                </p>
                <p className="home-pricing-card__daily">
                  {formatInr(showDiscount && plan.discountedDaily < plan.daily ? plan.discountedDaily : plan.daily)}
                  /day equivalent
                </p>
              </div>

              <ul className="home-pricing-card__includes">
                {plan.includes.map((item) => (
                  <li key={item}>
                    <Check className="home-pricing-card__check" strokeWidth={2.5} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="home-pricing-card__actions">
                <Link href={plan.bookHref} className="btn btn-primary home-pricing-card__btn">
                  Book online
                </Link>
                <Link href={`/services/${plan.id}`} className="home-pricing-card__link">
                  Service details →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="home-pricing-custom-quote" y={16}>
          <div className="home-pricing-custom-quote__inner">
            <div>
              <h3 className="home-pricing-custom-quote__title">Need a custom quote?</h3>
              <p className="home-pricing-custom-quote__text">
                Multi-service plans, 24-hour elder care, or specialised nursing — we&apos;ll confirm scope and pricing
                before you commit.
              </p>
            </div>
            <div className="home-pricing-custom-quote__ctas">
              <a href={waHref} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Get quote on WhatsApp
              </a>
              <a href="#contact" className="btn btn-secondary">
                Contact us
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal as="p" className="services-pricing-footnote" y={0}>
          {PRICING_FOOTNOTE}
        </Reveal>
        <Reveal as="p" className="services-pricing-caregiver-note" y={0}>
          Prices may vary based on caregiver experience, qualifications, and city.
        </Reveal>
      </div>
    </section>
  )
}
