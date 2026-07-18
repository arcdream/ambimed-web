/**
 * Homepage pricing cards — baseline rates and shift tiers.
 * Live Supabase catalogue prices override tiers when available.
 */
export const homePricingPlans = [
  {
    id: 'home-nurse',
    bookingServiceTypeId: '1',
    title: 'Home Nurse',
    shortTitle: 'Home Nurse',
    description: 'Skilled nursing care at home—post-surgery, palliative care, and general nursing when you need it.',
    icon: 'nurse',
    accent: 'teal',
    startingDailyInr: 766,
    tiers: [
      { name: 'Home Nurse (Day Shift)', shiftLabel: 'Day shift · 10H', priceInr: 901 },
      { name: 'Home Nurse (Night Shift)', shiftLabel: 'Night shift · 10H', priceInr: 951 },
      { name: 'Home Nurse (24 Hrs Live-in)', shiftLabel: '24 hrs live-in · 24H', priceInr: 1151 },
    ],
  },
  {
    id: 'physiotherapy',
    bookingServiceTypeId: '2',
    title: 'Physiotherapist',
    shortTitle: 'Physiotherapy',
    description: 'Home physiotherapy made easy. Trained physiotherapists for rehabilitation and mobility at your convenience.',
    icon: 'physio',
    accent: 'blue',
    startingDailyInr: 935,
    tiers: [{ name: 'Home Physiotherapy Session', shiftLabel: '1 hour session', priceInr: 1101 }],
  },
  {
    id: 'mother-baby',
    bookingServiceTypeId: '3',
    title: 'Mother Baby Care',
    shortTitle: 'Mother Baby Care',
    description: 'Postnatal and newborn care at home. Experienced caregivers for mother and baby wellness.',
    icon: 'baby',
    accent: 'rose',
    startingDailyInr: 766,
    tiers: [
      { name: 'Mother Baby Care (Day Shift)', shiftLabel: 'Day shift · 10H', priceInr: 901 },
      { name: 'Mother Baby Care (Night Shift)', shiftLabel: 'Night shift · 10H', priceInr: 951 },
      { name: 'Mother Baby Care (24 Hrs Live-in)', shiftLabel: '24 hrs live-in · 24H', priceInr: 1251 },
    ],
  },
  {
    id: 'caregiver-assistant',
    bookingServiceTypeId: '5',
    title: 'Caregiver Assistant',
    shortTitle: 'Caregiver Assistant',
    description: 'Compassionate, professional care for seniors at home. Daily assistance, companionship, and medication support.',
    icon: 'elder',
    accent: 'violet',
    startingDailyInr: 766,
    tiers: [
      { name: 'Caregiver Assistant (Day Shift)', shiftLabel: 'Day shift · 10H', priceInr: 901 },
      { name: 'Caregiver Assistant (Night Shift)', shiftLabel: 'Night shift · 10H', priceInr: 951 },
      { name: 'Caregiver Assistant (24 Hrs Live-in)', shiftLabel: '24 hrs live-in · 24H', priceInr: 1251 },
    ],
  },
]

export const PRICING_FOOTNOTE =
  'Prices reflect our catalogue; final totals may vary by dates and add-ons.'

export const PRICING_CAREGIVER_NOTE =
  'Prices may vary slightly based on the experience and qualifications of the caregiver.'

export const DEFAULT_DISCOUNT_PCT = 15
