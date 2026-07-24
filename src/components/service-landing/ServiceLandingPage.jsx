import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ServiceFaqAccordion } from '@/components/service-landing/ServiceFaqAccordion'
import { ServiceLeadForm } from '@/components/service-landing/ServiceLeadForm'
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel'
import { CallCareButton } from '@/components/CallCareButton'
import { PhoneTextLink } from '@/components/PhoneTextLink'
import { config } from '@/data/config'
import { isLoginAndBookingDisabled } from '@/lib/featureFlags'
import { getTelHref } from '@/lib/contactLinks'

import '@/components/Header.css'
import '@/components/Footer.css'
import '@/components/CallCareButton.css'
import '@/components/PhoneTextLink.css'
import '@/components/service-landing/ServiceLandingPage.css'
import '@/components/marketing/MarketingHome.css'

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.6 10.8a15.9 15.9 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
        fill="currentColor"
      />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 2v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2V2h-2v2H9V2H7zm12 8H5v10h14V10z"
        fill="currentColor"
      />
    </svg>
  )
}

export function ServiceLandingPage({ landing }) {
  const loginBookingDisabled = isLoginAndBookingDisabled()
  const bookUrl = `/app/book/${landing.bookingServiceTypeId}`

  return (
    <>
      <Header />
      <main className="svc-landing marketing-home">
        {/* Hero */}
        <section className="svc-hero section">
          <div className="container">
            <nav className="svc-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden>›</span>
              <Link href="/#services">Services</Link>
              <span aria-hidden>›</span>
              <span aria-current="page">{landing.hero.eyebrow}</span>
            </nav>
            <div className="svc-hero-grid">
              <div className="svc-hero-copy">
                <p className="svc-eyebrow">{landing.hero.eyebrow}</p>
                <h1 className="svc-hero-title">{landing.hero.title}</h1>
                <p className="svc-hero-subtitle">{landing.hero.subtitle}</p>
                <p className="svc-hero-desc">{landing.hero.description}</p>
                <div className="svc-hero-actions">
                  {loginBookingDisabled ? (
                    <CallCareButton variant="primary" showPhone label="Call customer care" />
                  ) : (
                    <>
                      <Link href={bookUrl} className="btn btn-primary svc-btn">
                        <CalendarIcon />
                        Book {landing.hero.eyebrow}
                      </Link>
                      <p className="svc-hero-call-hint">
                        <PhoneTextLink />
                      </p>
                    </>
                  )}
                </div>
                <ul className="svc-trust-row">
                  {landing.hero.trustBadges.map((badge) => (
                    <li key={badge}>
                      <span className="svc-trust-check" aria-hidden>
                        ✓
                      </span>
                      {badge}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="svc-hero-visual">
                <div className="svc-hero-image-wrap">
                  <img src={landing.image} alt={landing.hero.title} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What we help with */}
        <section className="section svc-section-alt">
          <div className="container">
            <p className="section-subtitle">{landing.helpWith.eyebrow}</p>
            <h2 className="section-title">{landing.helpWith.title}</h2>
            <div className="svc-help-grid">
              {landing.helpWith.items.map((item) => (
                <article key={item.title} className="svc-help-card">
                  <span className="svc-help-icon" aria-hidden>
                    {item.icon}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
            <div className="svc-section-cta">
              {loginBookingDisabled ? (
                <CallCareButton variant="primary" showPhone label="Call customer care" />
              ) : (
                <Link href={bookUrl} className="btn btn-primary">
                  Book {landing.hero.eyebrow}
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Why choose */}
        <section className="section">
          <div className="container">
            <p className="section-subtitle">{landing.whyChoose.eyebrow}</p>
            <h2 className="section-title">{landing.whyChoose.title}</h2>
            <div className="svc-why-grid">
              {landing.whyChoose.items.map((item) => (
                <div key={item.label} className="svc-why-item">
                  <span className="svc-why-icon" aria-hidden>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="section svc-section-alt">
          <div className="container svc-how-grid">
            <div className="svc-how-visual">
              <div className="svc-how-image-wrap">
                <img src={landing.image} alt="" />
              </div>
            </div>
            <div className="svc-how-copy">
              <p className="section-subtitle">{landing.howItWorks.eyebrow}</p>
              <h2 className="section-title">{landing.howItWorks.title}</h2>
              <ol className="svc-steps">
                {landing.howItWorks.steps.map((step, i) => (
                  <li key={step.title}>
                    <span className="svc-step-num">{i + 1}</span>
                    <div>
                      <strong>{step.title}</strong>
                      <p>{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section">
          <div className="container">
            <p className="section-subtitle">What families say</p>
            <h2 className="section-title">Trusted by Hundreds of Families</h2>
            <TestimonialsCarousel items={landing.testimonials} />
          </div>
        </section>

        {/* FAQ + Lead form */}
        <section className="section svc-section-alt" id="book">
          <div className="container svc-faq-form-grid">
            <h2 className="section-title svc-faq-form-grid__title">Common Questions</h2>
            <div className="svc-faq-form-grid__faq">
              <ServiceFaqAccordion items={landing.faqs} />
            </div>
            <div className="svc-lead-form-wrap svc-faq-form-grid__form">
              <ServiceLeadForm serviceTitle={landing.hero.eyebrow} />
            </div>
          </div>
        </section>

        {/* Sticky CTA bar */}
        <aside className="svc-sticky-cta" aria-label="Quick contact">
          <div className="container svc-sticky-cta-inner">
            <p>
              {loginBookingDisabled
                ? 'Need immediate help? Call our customer care team.'
                : 'Need immediate help? Call us now or book a service in just a few clicks.'}
            </p>
            <div className="svc-sticky-cta-actions">
              <a
                href={getTelHref()}
                className={`btn ${loginBookingDisabled ? 'btn-primary' : 'btn-secondary'} svc-sticky-call`}
              >
                <PhoneIcon />
                {loginBookingDisabled ? 'Call customer care' : config.contact.phone}
              </a>
              {!loginBookingDisabled ? (
                <Link href={bookUrl} className="btn btn-primary">
                  Book {landing.hero.eyebrow}
                </Link>
              ) : null}
            </div>
          </div>
        </aside>
      </main>
      <Footer />
    </>
  )
}
