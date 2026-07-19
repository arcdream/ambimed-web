'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Reveal } from '@/components/motion/Reveal'
import { config } from '../data/config'
import { marketingNav, isNavDropdown } from '@/data/siteNav'
import { services } from '../data/services'

const SERVICE_LABELS = {
  'home-nurse': 'Home Nursing',
  'caregiver-assistant': 'Caregiver',
  physiotherapy: 'Physiotherapy',
  'mother-baby': 'Mother & Baby Care',
}

export function Footer() {
  const pathname = usePathname()
  const aboutLinks = marketingNav.find((item) => isNavDropdown(item) && item.label === 'About Us')
  const serviceLinks = marketingNav.find((item) => isNavDropdown(item) && item.label === 'Services')
  const topLinks = marketingNav.filter((item) => !isNavDropdown(item))

  return (
    <Reveal as="footer" className="footer" y={0}>
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="footer-brand-link">
            <span className="logo-text">
              <span className="logo-ambi">AMBI</span>
              <span className="logo-med">MED</span>
            </span>
          </Link>
          <p className="footer-tagline">Trusted home healthcare. Transparent pricing. Care at your doorstep.</p>
        </div>

        {aboutLinks && isNavDropdown(aboutLinks) ? (
          <div className="footer-links">
            <p className="footer-section-heading" id="footer-about-heading">
              About Us
            </p>
            <ul aria-labelledby="footer-about-heading">
              {aboutLinks.children.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link footer-link--anchor">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="footer-links">
          <p className="footer-section-heading" id="footer-services-heading">
            Services
          </p>
          <ul aria-labelledby="footer-services-heading">
            {(serviceLinks && isNavDropdown(serviceLinks) ? serviceLinks.children : services.map((s) => ({
              href: `/services/${s.id}`,
              label: SERVICE_LABELS[s.id] ?? s.title,
            }))).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="footer-link footer-link--anchor">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-links">
          <p className="footer-section-heading" id="footer-quick-links-heading">
            Explore
          </p>
          <ul aria-labelledby="footer-quick-links-heading">
            {topLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`footer-link footer-link--anchor${pathname === link.href ? ' is-active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-contact">
          <p className="footer-section-heading" id="footer-contact-heading">
            Contact
          </p>
          <p>
            <a href={`tel:${config.contact.phone.replace(/\s/g, '')}`} className="footer-link footer-link--anchor">
              {config.contact.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${config.contact.email}`} className="footer-link footer-link--anchor">
              {config.contact.email}
            </a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} Ambimed Healthcare. Motivated by serving society.</p>
          <nav className="footer-legal" aria-label="Legal">
            <Link href={config.privacyPolicyUrl} className="footer-legal-link">
              Privacy Policy
            </Link>
            <Link href="/terms" className="footer-legal-link">
              Terms &amp; Conditions
            </Link>
          </nav>
        </div>
      </div>
    </Reveal>
  )
}
