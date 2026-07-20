/** Hero carousel — image + matching copy per slide */
export const heroBannerSlides = [
  {
    id: 'verified-caregiver',
    image: '/assets/hero/banner-verified-caregiver.png',
    alt: 'Trusted Ambimed caregivers providing compassionate home care',
    imageFocus: 'caregiver',
    headline: {
      line1: 'Trusted & verified',
      line2: null,
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
      line1: 'Affordable & Transparent',
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
      line1: 'Quick booking',
      line2: null,
      accent: 'Call or App',
    },
    description:
      'Choose your service, pick a date, and confirm securely — in just a few taps.',
  },
  {
    id: 'startup-india',
    image: '/assets/hero/banner-startup-india.svg',
    alt: 'Ambimed recognised by Startup India, Government of India',
    imageFocus: 'startup-india',
    headline: {
      line1: 'Recognised by',
      line2: null,
      accent: 'Startup India',
    },
    description: 'Government of India certified startup.',
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
