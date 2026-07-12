/**
 * Redirect merged keyword URLs to pillar pages — avoids duplicate content.
 */
export const seoRedirects = {
  'home-nursing-near-me': 'home-nurse-services',
  'home-care-nurse': 'home-nurse-services',
  'senior-citizen-care': 'elder-care-services',
  'home-caregiver': 'caregiver-services',
  'general-duty-assistant': 'caregiver-services',
  'home-attendant-services': 'caregiver-services',
  'physiotherapist-at-home': 'home-physiotherapy-services',
}

export function getRedirectTarget(slug) {
  return seoRedirects[slug] ?? null
}
