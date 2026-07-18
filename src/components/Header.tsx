'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { config } from '@/data/config'
import { useAuth } from '@/client-app/context/AuthContext'

const LOGO_IMG = '/assets/ambimed-logo.png'

const marketingNavBase: { id: string; label: string; href?: string }[] = [
  { id: 'hero', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'services-pricing', label: 'Our Pricing' },
  { id: 'about', label: 'About' },
  { id: 'caregivers', label: 'Caregivers' },
  { id: 'testimonials', label: 'Feedback' },
  { id: 'apps', label: 'Our Apps' },
  { id: 'team', label: 'Team' },
  { id: 'achievements', label: 'Recognition' },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'contact', label: 'Contact' },
]

const appNavLinks = [
  { href: '/', label: 'Website home' },
  { href: '/#services', label: 'Services' },
  { href: '/#services-pricing', label: 'Our Pricing' },
  { href: '/#achievements', label: 'Recognition' },
  { href: '/#contact', label: 'Contact' },
  { href: '/app/booking', label: 'Book care' },
  { href: '/app/history', label: 'My bookings' },
]

export function Header() {
  const pathname = usePathname()
  const isApp = pathname.startsWith('/app')
  const isHomePage = pathname === '/'
  const useMarketingHashLinks = !isApp && !isHomePage
  const { user, isAuthenticated, referralHubAccess, isLoading, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  const marketingNav = marketingNavBase.filter(
    (l) => (l.id === 'about' ? config.showAboutSection : l.id === 'team' ? config.showTeamSection : true),
  )

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  const scrollTo = useCallback((id: string) => {
    setOpen(false)
    window.setTimeout(() => {
      const tryScroll = () => {
        const el = document.getElementById(id)
        if (!el) return false
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return true
      }
      if (tryScroll()) return
      let n = 0
      const t = window.setInterval(() => {
        n += 1
        if (tryScroll() || n >= 40) window.clearInterval(t)
      }, 50)
    }, 280)
  }, [])

  /** After navigating to /#section from another page, scroll to the target section */
  useEffect(() => {
    if (pathname !== '/') return
    const hash = window.location.hash.replace(/^#/, '')
    if (!hash) return
    scrollTo(hash)
  }, [pathname, scrollTo])

  const marketingNavHref = (id: string) => (id === 'hero' ? '/' : `/#${id}`)

  const renderMarketingNavLink = (link: (typeof marketingNavBase)[number], onNavigate?: () => void) => {
    if (link.href) {
      return (
        <Link key={link.id} href={link.href} className="nav-link" onClick={onNavigate}>
          {link.label}
        </Link>
      )
    }
    if (useMarketingHashLinks) {
      return (
        <Link
          key={link.id}
          href={marketingNavHref(link.id)}
          className="nav-link"
          onClick={onNavigate}
        >
          {link.label}
        </Link>
      )
    }
    return (
      <button key={link.id} type="button" className="nav-link" onClick={() => scrollTo(link.id)}>
        {link.label}
      </button>
    )
  }

  const appNavLinksResolved = useMemo(() => {
    const links = [...appNavLinks]
    if (referralHubAccess) {
      const idx = links.findIndex((l) => l.href === '/app/history')
      if (idx >= 0) links.splice(idx + 1, 0, { href: '/app/doctor', label: 'Referral hub' })
    }
    return links
  }, [referralHubAccess])

  const displayName = user?.firstName?.trim() || (user?.mobileNumber ? `…${String(user.mobileNumber).slice(-4)}` : 'there')
  const avatarLetter = (
    user?.firstName?.trim()?.[0] ||
    String(user?.mobileNumber || '').replace(/\D/g, '').slice(-1) ||
    'U'
  ).toUpperCase()

  const authDesktop = (
    <div className="header-auth">
      {isLoading ? (
        <span className="header-auth-loading" aria-hidden>
          …
        </span>
      ) : isAuthenticated ? (
        <div className="header-user-wrap" ref={userMenuRef}>
          <button
            type="button"
            className="header-user-trigger"
            aria-expanded={userMenuOpen}
            aria-haspopup="true"
            onClick={() => setUserMenuOpen((v) => !v)}
          >
            <span className="header-user-avatar">{avatarLetter}</span>
            <span className="header-user-name">Hi, {displayName}</span>
            <span className="header-user-chevron" aria-hidden>
              ▾
            </span>
          </button>
          <AnimatePresence>
            {userMenuOpen && (
              <motion.div
                className="header-user-dropdown"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
              >
                <Link href="/app/booking" onClick={() => setUserMenuOpen(false)}>
                  Book care
                </Link>
                <Link href="/app/history" onClick={() => setUserMenuOpen(false)}>
                  My bookings
                </Link>
                {referralHubAccess && (
                  <Link href="/app/doctor" onClick={() => setUserMenuOpen(false)}>
                    Referral hub
                  </Link>
                )}
                <button
                  type="button"
                  className="header-user-signout"
                  onClick={() => {
                    logout()
                    setUserMenuOpen(false)
                  }}
                >
                  Sign out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <Link href="/app/login" className="header-btn-login">
          Log in
        </Link>
      )}
    </div>
  )

  return (
    <motion.header
      className={`header ${isApp ? 'header--app' : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="header-inner container">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          {!logoError && <img src={LOGO_IMG} alt="" className="logo-img" onError={() => setLogoError(true)} />}
          <span className="logo-text">
            <span className="logo-ambi">AMBI</span>
            <span className="logo-med">MED</span>
          </span>
        </Link>

        <nav className="nav desktop">
          {isApp
            ? appNavLinksResolved.map((item) => (
                <Link key={item.href + item.label} href={item.href} className="nav-link">
                  {item.label}
                </Link>
              ))
            : marketingNav.map((link) => renderMarketingNavLink(link))}
          {!isApp && (
            <Link href="/app/booking" className="nav-link nav-link--cta">
              Book care
            </Link>
          )}
          {authDesktop}
        </nav>

        <div className="header-mobile-actions">
          {!isLoading && !isAuthenticated && (
            <Link href="/app/login" className="header-btn-login header-btn-login--compact">
              Log in
            </Link>
          )}
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
          >
            <span className="menu-toggle-glyph" aria-hidden>
              {open ? '✕' : '☰'}
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="nav mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {isApp
              ? appNavLinksResolved.map((item) => (
                  <Link key={item.href + item.label} href={item.href} className="nav-link" onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                ))
              : marketingNav.map((link) => renderMarketingNavLink(link, () => setOpen(false)))}
            {!isApp && (
              <Link href="/app/booking" className="nav-link nav-link--cta" onClick={() => setOpen(false)}>
                Book care
              </Link>
            )}
            {!isLoading && !isAuthenticated && (
              <Link href="/app/login" className="nav-link nav-link--login-mobile" onClick={() => setOpen(false)}>
                Log in
              </Link>
            )}
            {!isLoading && isAuthenticated && (
              <>
                <Link href="/app/booking" className="nav-link" onClick={() => setOpen(false)}>
                  Book care (dashboard)
                </Link>
                <Link href="/app/history" className="nav-link" onClick={() => setOpen(false)}>
                  My bookings
                </Link>
                {referralHubAccess && (
                  <Link href="/app/doctor" className="nav-link" onClick={() => setOpen(false)}>
                    Referral hub
                  </Link>
                )}
                <button
                  type="button"
                  className="nav-link nav-link--signout"
                  onClick={() => {
                    logout()
                    setOpen(false)
                  }}
                >
                  Sign out
                </button>
              </>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
