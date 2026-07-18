/**
 * Homepage pricing cards — baseline "starting from" rates.
 * Live Supabase catalogue prices override daily rates when available.
 * Update these if your published floor rates change.
 */
export const homePricingPlans = [
  {
    id: 'caregiver-assistant',
    bookingServiceTypeId: '5',
    title: 'Caregiver Assistant',
    startingDailyInr: 1200,
    includes: [
      'Background-verified caregiver',
      'Daily living & companionship support',
      'Medication reminders',
      'Family updates via the Ambimed app',
    ],
  },
  {
    id: 'physiotherapy',
    bookingServiceTypeId: '2',
    title: 'Physiotherapy',
    startingDailyInr: 800,
    includes: [
      'Licensed physiotherapist visit',
      'Personalised recovery plan',
      'Mobility & pain-management exercises',
      'Progress notes for your doctor',
    ],
  },
  {
    id: 'home-nurse',
    bookingServiceTypeId: '1',
    title: 'Home Nurse',
    startingDailyInr: 1500,
    includes: [
      'Skilled nursing at home',
      'Vitals, wound care & injections',
      'Post-surgery recovery support',
      'Clear handover to family',
    ],
  },
  {
    id: 'mother-baby',
    bookingServiceTypeId: '3',
    title: 'Mother & Baby Care',
    startingDailyInr: 1300,
    includes: [
      'Trained postnatal caregiver',
      'Newborn handling & feeding support',
      'Mother recovery assistance',
      'Hygiene & safety best practices',
    ],
  },
]

export const PRICING_FOOTNOTE =
  '*Final price depends on service frequency, shift length, and location — confirm your exact quote via WhatsApp or call before care begins.'
