'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Reveal } from '@/components/motion/Reveal'
import { config } from '../data/config'
import { services } from '../data/services'

const quickLinksBase = [
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
  { id: 'apps', label: 'Our Apps' },
]

export function Footer() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const quickLinks = config.showAboutSection ? quickLinksBase : quickLinksBase.filter((l) => l.id !== 'about')

  const quickLinkHref = (id) => `/#${id}`

  return (
    <Reveal as="footer" className="footer" y={0}>
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="logo-text">
            <span className="logo-ambi">AMBI</span><span className="logo-med">MED</span>
          </span>
          <p className="footer-tagline">Trusted home healthcare. Easy booking. Transparent billing.</p>
        </div>
        <div className="footer-links">
          <p className="footer-section-heading" id="footer-quick-links-heading">
            Quick links
          </p>
          <ul aria-labelledby="footer-quick-links-heading">
            {quickLinks.map((link) => (
              <li key={link.id}>
                {isHomePage ? (
                  <button
                    type="button"
                    className="footer-link"
                    onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link href={quickLinkHref(link.id)} className="footer-link footer-link--anchor">
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-links">
          <p className="footer-section-heading" id="footer-services-heading">
            Our services
          </p>
          <ul aria-labelledby="footer-services-heading">
            {services.map((svc) => (
              <li key={svc.id}>
                <Link href={`/services/${svc.id}`} className="footer-link footer-link--anchor">
                  {svc.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-contact">
          <p className="footer-section-heading" id="footer-contact-heading">
            Contact
          </p>
          <p>{config.contact.phone} · {config.contact.email}</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} Ambimed Healthcare. Motivated by serving society.</p>
        </div>
      </div>
    </Reveal>
  )
}
