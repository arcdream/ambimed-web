import { motion } from 'framer-motion'
import { config } from '../../data/config'
import './HomeHero.css'

const TRUST_BADGES = [
  'Background Verified Staff',
  '24×7 Support',
  'Certified Professionals',
  'Fast Response',
]

export function HomeHero() {
  const telHref = `tel:${config.contact.phone.replace(/\s/g, '')}`

  return (
    <section id="hero" className="home-hero">
      <div className="home-hero-bg" aria-hidden />
      <div className="container home-hero-inner">
        <motion.div
          className="home-hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="home-hero-badge">Trusted Home Healthcare</p>
          <h1 className="home-hero-title">
            Trusted Home Healthcare Services in <span className="home-hero-highlight">Bangalore</span>
          </h1>
          <p className="home-hero-desc">
            Certified nurses, caregivers, and physiotherapists at your doorstep. Background-verified professionals,
            transparent pricing, and care that starts within hours.
          </p>
          <div className="home-hero-actions">
            <a href="#book" className="home-btn home-btn--primary">Book a Service</a>
            <a href={telHref} className="home-btn home-btn--secondary">Call Now</a>
          </div>
          <ul className="home-trust-badges">
            {TRUST_BADGES.map((badge) => (
              <li key={badge} className="home-trust-badge">
                <span className="home-trust-icon" aria-hidden>✓</span>
                {badge}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          className="home-hero-visual"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <img
            src="/assets/hero-caregiver-home.png"
            alt="Ambimed healthcare professional welcomed at a home in Bangalore"
            width={560}
            height={420}
            className="home-hero-image"
          />
        </motion.div>
      </div>
    </section>
  )
}
