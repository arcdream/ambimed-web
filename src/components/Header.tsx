'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useAuth } from '@/client-app/context/AuthContext'
import { isLoginAndBookingDisabled } from '@/lib/featureFlags'
import { isNavDropdown, marketingNav, type NavDropdown, type NavItem } from '@/data/siteNav'

const LOGO_IMG = '/assets/ambimed-logo.png'

const appNavLinks = [
  { href: '/', label: 'Website home' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about/recognition', label: 'Recognition' },
  { href: '/contact', label: 'Contact' },
  { href: '/app/booking', label: 'Book care' },
  { href: '/app/history', label: 'My bookings' },
]

function isLinkActive(pathname: string, href: string) {
  return pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))
}

function isDropdownActive(pathname: string, item: NavDropdown) {
  return item.children.some((child) => isLinkActive(pathname, child.href))
}

function DesktopNavDropdown({ item, pathname }: { item: NavDropdown; pathname: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const active = isDropdownActive(pathname, item)

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  return (
    <div
      className="nav-dropdown"
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`nav-link nav-dropdown__trigger${active ? ' is-active' : ''}`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        {item.label}
        <ChevronDown className="nav-dropdown__chevron" strokeWidth={2.25} aria-hidden />
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="nav-dropdown__menu"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            role="menu"
          >
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                role="menuitem"
                className={`nav-dropdown__item${isLinkActive(pathname, child.href) ? ' is-active' : ''}`}
                onClick={() => setOpen(false)}
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

function renderDesktopNavItem(item: NavItem, pathname: string) {
  if (isNavDropdown(item)) {
    return <DesktopNavDropdown key={item.label} item={item} pathname={pathname} />
  }
  return (
    <Link
      key={item.href}
      href={item.href}
      className={`nav-link${isLinkActive(pathname, item.href) ? ' is-active' : ''}`}
    >
      {item.label}
    </Link>
  )
}

function MobileNavGroup({
  item,
  pathname,
  expanded,
  onToggle,
  onNavigate,
}: {
  item: NavDropdown
  pathname: string
  expanded: boolean
  onToggle: () => void
  onNavigate: () => void
}) {
  return (
    <div className="nav-mobile-group">
      <button
        type="button"
        className={`nav-link nav-mobile-group__trigger${isDropdownActive(pathname, item) ? ' is-active' : ''}`}
        aria-expanded={expanded}
        onClick={onToggle}
      >
        <span>{item.label}</span>
        <ChevronDown className={`nav-mobile-group__chevron${expanded ? ' is-open' : ''}`} strokeWidth={2.25} aria-hidden />
      </button>
      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            className="nav-mobile-group__items"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={`nav-mobile-group__link${isLinkActive(pathname, child.href) ? ' is-active' : ''}`}
                onClick={onNavigate}
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export function Header() {
  const pathname = usePathname()
  const isApp = pathname.startsWith('/app')
  const { user, isAuthenticated, referralHubAccess, isLoading, logout } = useAuth()
  const loginBookingDisabled = isLoginAndBookingDisabled()
  const [open, setOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  useEffect(() => {
    setOpen(false)
    setMobileExpanded(null)
  }, [pathname])

  const appNavLinksResolved = useMemo(() => {
    let links = appNavLinks.filter((l) => !(loginBookingDisabled && l.href === '/app/booking'))
    if (referralHubAccess) {
      const idx = links.findIndex((l) => l.href === '/app/history')
      if (idx >= 0) links.splice(idx + 1, 0, { href: '/app/doctor', label: 'Referral hub' })
    }
    return links
  }, [referralHubAccess, loginBookingDisabled])

  const displayName = user?.firstName?.trim() || (user?.mobileNumber ? `…${String(user.mobileNumber).slice(-4)}` : 'there')
  const avatarLetter = (
    user?.firstName?.trim()?.[0] ||
    String(user?.mobileNumber || '').replace(/\D/g, '').slice(-1) ||
    'U'
  ).toUpperCase()

  const closeMobile = () => setOpen(false)

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
            {userMenuOpen ? (
              <motion.div
                className="header-user-dropdown"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
              >
                {!loginBookingDisabled ? (
                  <Link href="/app/booking" onClick={() => setUserMenuOpen(false)}>
                    Book care
                  </Link>
                ) : null}
                <Link href="/app/history" onClick={() => setUserMenuOpen(false)}>
                  My bookings
                </Link>
                {referralHubAccess ? (
                  <Link href="/app/doctor" onClick={() => setUserMenuOpen(false)}>
                    Referral hub
                  </Link>
                ) : null}
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
            ) : null}
          </AnimatePresence>
        </div>
      ) : loginBookingDisabled ? null : (
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
        <Link href="/" className="logo" onClick={closeMobile}>
          {!logoError ? <img src={LOGO_IMG} alt="" className="logo-img" onError={() => setLogoError(true)} /> : null}
          <span className="logo-text">
            <span className="logo-ambi">AMBI</span>
            <span className="logo-med">MED</span>
          </span>
        </Link>

        <nav className="nav desktop" aria-label="Primary">
          {isApp
            ? appNavLinksResolved.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className={`nav-link${isLinkActive(pathname, item.href) ? ' is-active' : ''}`}
                >
                  {item.label}
                </Link>
              ))
            : marketingNav.map((item) => renderDesktopNavItem(item, pathname))}
          {!isApp && !loginBookingDisabled ? (
            <Link href="/app/booking" className="nav-link nav-link--cta">
              Book care
            </Link>
          ) : null}
          {authDesktop}
        </nav>

        <div className="header-mobile-actions">
          {!isLoading && !isAuthenticated && !loginBookingDisabled ? (
            <Link href="/app/login" className="header-btn-login header-btn-login--compact">
              Log in
            </Link>
          ) : null}
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
        {open ? (
          <motion.nav
            className="nav mobile"
            aria-label="Primary mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {isApp
              ? appNavLinksResolved.map((item) => (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    className={`nav-link${isLinkActive(pathname, item.href) ? ' is-active' : ''}`}
                    onClick={closeMobile}
                  >
                    {item.label}
                  </Link>
                ))
              : marketingNav.map((item) =>
                  isNavDropdown(item) ? (
                    <MobileNavGroup
                      key={item.label}
                      item={item}
                      pathname={pathname}
                      expanded={mobileExpanded === item.label}
                      onToggle={() => setMobileExpanded((v) => (v === item.label ? null : item.label))}
                      onNavigate={closeMobile}
                    />
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`nav-link${isLinkActive(pathname, item.href) ? ' is-active' : ''}`}
                      onClick={closeMobile}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
            {!isApp && !loginBookingDisabled ? (
              <Link href="/app/booking" className="nav-link nav-link--cta" onClick={closeMobile}>
                Book care
              </Link>
            ) : null}
            {!isLoading && !isAuthenticated && !loginBookingDisabled ? (
              <Link href="/app/login" className="nav-link nav-link--login-mobile" onClick={closeMobile}>
                Log in
              </Link>
            ) : null}
            {!isLoading && isAuthenticated ? (
              <>
                {!loginBookingDisabled ? (
                  <Link href="/app/booking" className="nav-link" onClick={closeMobile}>
                    Book care (dashboard)
                  </Link>
                ) : null}
                <Link href="/app/history" className="nav-link" onClick={closeMobile}>
                  My bookings
                </Link>
                {referralHubAccess ? (
                  <Link href="/app/doctor" className="nav-link" onClick={closeMobile}>
                    Referral hub
                  </Link>
                ) : null}
                <button
                  type="button"
                  className="nav-link nav-link--signout"
                  onClick={() => {
                    logout()
                    closeMobile()
                  }}
                >
                  Sign out
                </button>
              </>
            ) : null}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
