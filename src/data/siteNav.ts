export type NavLink = {
  label: string
  href: string
}

export type NavDropdown = {
  label: string
  children: NavLink[]
}

export type NavItem = NavLink | NavDropdown

export function isNavDropdown(item: NavItem): item is NavDropdown {
  return 'children' in item
}

/** Primary marketing navigation */
export const marketingNav: NavItem[] = [
  {
    label: 'About Us',
    children: [
      { label: 'Our Story', href: '/about/our-story' },
      { label: 'Why Ambimed', href: '/about/why-ambimed' },
      { label: 'Recognition', href: '/about/recognition' },
    ],
  },
  {
    label: 'Services',
    children: [
      { label: 'Home Nursing', href: '/services/home-nurse' },
      { label: 'Caregiver', href: '/services/caregiver-assistant' },
      { label: 'Physiotherapy', href: '/services/physiotherapy' },
      { label: 'Mother & Baby Care', href: '/services/mother-baby' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export const aboutNavLinks = marketingNav.find(isNavDropdown)?.children ?? []

export function flattenNavLinks(items: NavItem[]): NavLink[] {
  return items.flatMap((item) => (isNavDropdown(item) ? item.children : [item]))
}
