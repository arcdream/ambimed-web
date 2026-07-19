/** Hero carousel — image + matching copy per slide */
export const heroBannerSlides = [
  {
    id: 'verified-caregiver',
    image: '/assets/hero/banner-verified-caregiver.png',
    alt: 'Trusted Ambimed caregivers providing compassionate home care',
    imageFocus: 'caregiver',
    headline: {
      line1: 'Trusted & verified',
      line2: 'home',
      accent: 'caregivers',
    },
    description:
      'Background-checked professionals who bring compassionate, hospital-grade care to your doorstep.',
  },
  {
    id: 'transparent-pricing',
    image: '/assets/hero/banner-transparent-pricing.png',
    alt: 'Transparent Ambimed service pricing with clear daily rates',
    imageFocus: 'pricing',
    headline: {
      line1: 'Clear, honest',
      line2: null,
      accent: 'pricing',
    },
    description:
      'Published daily rates and upfront estimates — know what you pay before care begins.',
  },
  {
    id: 'easy-booking',
    image: '/assets/hero/banner-easy-booking.png',
    alt: 'Booking Ambimed home healthcare on mobile',
    imageFocus: 'booking',
    headline: {
      line1: 'Easy booking on',
      line2: null,
      accent: 'web & app',
    },
    description:
      'Choose your service, pick a date, and confirm securely — in just a few taps.',
  },
  {
    id: 'caregiver-tracking',
    image: '/assets/hero/banner-caregiver-tracking.png',
    alt: 'Tracking caregiver visits on the Ambimed app',
    imageFocus: 'tracking',
    headline: {
      line1: 'Track your caregiver',
      line2: 'in the',
      accent: 'app',
    },
    description:
      'See assigned professionals, visit updates, and manage bookings in one place.',
  },
]

export const heroCta = {
  label: 'Book Care',
  href: '/app/booking',
}

export const heroWelcomeCopy = {
  headline: {
    line1: 'Your care hub is',
    line2: null,
    accent: 'ready',
  },
  description: 'Book visits, track caregivers, and manage home care from web or app.',
}
