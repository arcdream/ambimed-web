/**
 * SEO service landing pages — one entry per service.
 * URL: /services/{slug}
 */
export const serviceLandings = [
  {
    slug: 'caregiver-assistant',
    bookingServiceTypeId: '5',
    image: '/assets/service-elder-care.png',
    seo: {
      title: 'Professional Caregiver Services at Home | Ambimed Healthcare',
      description:
        'Book verified caregiver assistants for elder care at home. Personal care, companionship, mobility help & medication reminders. Background-checked professionals across India.',
      keywords:
        'caregiver services, elder care at home, home caregiver India, senior care assistant, Ambimed caregiver',
    },
    hero: {
      eyebrow: 'Caregiver Assistant',
      title: 'Professional Caregiver Services',
      subtitle: 'Compassionate Care at Home',
      description:
        'Our trained and verified caregivers provide reliable support for daily activities, personal care, and companionship — so your loved ones can live safely and comfortably at home.',
      trustBadges: ['Background Verified', 'Skilled & Trained', '24/7 Support'],
    },
    helpWith: {
      eyebrow: 'What our caregivers can help with',
      title: 'Care That Goes Beyond Support',
      items: [
        { icon: '🛁', title: 'Personal Care', description: 'Assistance with bathing, grooming, dressing, and hygiene with dignity and respect.' },
        { icon: '🚶', title: 'Mobility Assistance', description: 'Help with walking, transferring, and safe movement around the home.' },
        { icon: '🍽️', title: 'Meal Preparation', description: 'Nutritious meal preparation tailored to dietary needs and preferences.' },
        { icon: '💬', title: 'Companionship', description: 'Meaningful conversation, emotional support, and engagement in daily activities.' },
        { icon: '💊', title: 'Medication Reminders', description: 'Timely reminders to ensure medications are taken as prescribed.' },
        { icon: '🏠', title: 'Light Housekeeping', description: 'Keeping the living space clean, organized, and comfortable.' },
      ],
    },
    whyChoose: {
      eyebrow: 'Why families choose Ambimed',
      title: 'Trusted Care. Every Time.',
      items: [
        { icon: '✓', label: 'Verified & Trained Caregivers' },
        { icon: '🔍', label: 'Rigorous Background Verification' },
        { icon: '📋', label: 'Personalized Care Plans' },
        { icon: '⏱️', label: 'Flexible — Hourly, Daily or Monthly' },
        { icon: '🔄', label: 'Quick Replacement' },
        { icon: '👤', label: 'Dedicated Care Manager' },
      ],
    },
    howItWorks: {
      eyebrow: 'How it works',
      title: 'Simple Steps to Get a Caregiver at Home',
      steps: [
        { title: 'Share Your Requirements', description: 'Tell us about your loved one\'s needs, schedule, and preferences.' },
        { title: 'We Find the Right Caregiver', description: 'We match you with a verified, trained professional suited to your family.' },
        { title: 'Care Begins', description: 'Your caregiver visits as scheduled and care begins at home.' },
        { title: 'Ongoing Support', description: 'Our team stays in touch for feedback, replacements, and peace of mind.' },
      ],
    },
    testimonials: [
      { quote: 'The caregiver assigned to my mother is patient, kind, and always on time. Ambimed made the whole process easy.', name: 'Priya S.' },
      { quote: 'We needed daily help for my father after a fall. Transparent pricing and excellent care quality.', name: 'Rajesh M.' },
      { quote: 'Professional, verified staff. The care manager checked in regularly. Highly recommend Ambimed.', name: 'Anjali K.' },
    ],
    faqs: [
      { q: 'Are your caregivers verified?', a: 'Yes. Every Ambimed caregiver undergoes background verification, identity checks, and skills assessment before joining our network.' },
      { q: 'Can I hire a caregiver for a few hours or full-time?', a: 'Absolutely. We offer flexible plans — hourly, daily, or monthly shifts based on your needs.' },
      { q: 'How much does caregiver service cost?', a: 'Pricing depends on shift type and duration. View live rates on our pricing section or book online for a personalized estimate.' },
      { q: 'What if I am not satisfied with the caregiver?', a: 'Contact our care team. We provide quick replacements at no extra hassle to ensure continuity of care.' },
      { q: 'Which cities do you serve?', a: 'Ambimed operates in Delhi, Bengaluru, Mumbai, Kolkata, and 8+ other cities across India.' },
    ],
  },
  {
    slug: 'physiotherapy',
    bookingServiceTypeId: '2',
    image: '/assets/service-physiotherapy.png',
    seo: {
      title: 'Home Physiotherapy Services | Ambimed Healthcare',
      description:
        'Expert physiotherapy at home for recovery, mobility & pain relief. Licensed physiotherapists for post-surgery rehab, stroke recovery & chronic pain. Book online.',
      keywords:
        'home physiotherapy, physiotherapist at home, rehab at home India, mobility therapy, Ambimed physio',
    },
    hero: {
      eyebrow: 'Physiotherapy',
      title: 'Home Physiotherapy Services',
      subtitle: 'Recover Safely at Home',
      description:
        'Licensed physiotherapists come to you for personalized rehabilitation, pain management, and mobility improvement — no travel, no waiting rooms.',
      trustBadges: ['Licensed Therapists', 'Personalized Plans', 'Flexible Scheduling'],
    },
    helpWith: {
      eyebrow: 'Conditions we treat at home',
      title: 'Therapy Tailored to Your Recovery',
      items: [
        { icon: '🦴', title: 'Post-Surgery Rehab', description: 'Structured recovery programs after joint replacement, fracture, or orthopedic surgery.' },
        { icon: '🧠', title: 'Stroke Recovery', description: 'Mobility and strength exercises to regain independence after stroke or neurological events.' },
        { icon: '⚡', title: 'Pain Management', description: 'Targeted therapy for back pain, neck pain, arthritis, and chronic musculoskeletal conditions.' },
        { icon: '🏃', title: 'Mobility & Balance', description: 'Gait training and balance exercises to prevent falls and improve movement.' },
        { icon: '👴', title: 'Geriatric Physiotherapy', description: 'Age-appropriate exercises to maintain strength, flexibility, and daily function.' },
        { icon: '🏠', title: 'Home Exercise Plans', description: 'Custom exercise routines you can continue between therapist visits.' },
      ],
    },
    whyChoose: {
      eyebrow: 'Why families choose Ambimed',
      title: 'Expert Care in Your Living Room',
      items: [
        { icon: '🎓', label: 'Qualified Physiotherapists' },
        { icon: '📊', label: 'Progress Tracking' },
        { icon: '🏠', label: 'No Clinic Visits Needed' },
        { icon: '⏱️', label: 'Flexible Session Times' },
        { icon: '💰', label: 'Transparent Pricing' },
        { icon: '📱', label: 'Book & Track via App' },
      ],
    },
    howItWorks: {
      eyebrow: 'How it works',
      title: 'Get Physiotherapy at Home in 4 Steps',
      steps: [
        { title: 'Book Online or Call', description: 'Share your condition, location, and preferred session times.' },
        { title: 'Initial Assessment', description: 'A physiotherapist evaluates your needs and creates a treatment plan.' },
        { title: 'Regular Sessions', description: 'Scheduled home visits with hands-on therapy and guided exercises.' },
        { title: 'Track Progress', description: 'Monitor improvement and adjust the plan with your therapist and care team.' },
      ],
    },
    testimonials: [
      { quote: 'After knee surgery, home physio was a lifesaver. The therapist was knowledgeable and very encouraging.', name: 'Ramesh K.' },
      { quote: 'My father\'s mobility improved significantly within weeks. Convenient and professional service.', name: 'Sneha P.' },
      { quote: 'Clear exercises, punctual visits, and honest pricing. Exactly what we needed.', name: 'Arun V.' },
    ],
    faqs: [
      { q: 'Do I need a doctor\'s referral for home physiotherapy?', a: 'A referral is helpful but not always required. Share your medical history during booking and our team will guide you.' },
      { q: 'What equipment do therapists bring?', a: 'Therapists carry essential portable equipment. For specialized needs, we coordinate in advance.' },
      { q: 'How long is each session?', a: 'Sessions typically range from 45–60 minutes depending on the treatment plan and shift type selected.' },
      { q: 'Is home physiotherapy covered by insurance?', a: 'Coverage varies by policy. We provide detailed invoices for reimbursement where applicable.' },
      { q: 'Can physiotherapy be combined with nursing care?', a: 'Yes. Many families book combined care packages. Contact us or book multiple services through the app.' },
    ],
  },
  {
    slug: 'home-nurse',
    bookingServiceTypeId: '1',
    image: '/assets/service-home-nurses.png',
    seo: {
      title: 'Home Nursing Services | Skilled Nurses at Home | Ambimed',
      description:
        'Professional home nursing for post-surgery care, wound dressing, IV therapy & palliative support. Skilled, verified nurses across major Indian cities. Book online.',
      keywords:
        'home nurse, nursing care at home, home nursing India, post surgery nurse, palliative care at home',
    },
    hero: {
      eyebrow: 'Home Nurse',
      title: 'Skilled Home Nursing Services',
      subtitle: 'Clinical Care Where You Are',
      description:
        'Registered nurses and skilled nursing professionals deliver hospital-quality care at home — for recovery, chronic conditions, and round-the-clock support when you need it most.',
      trustBadges: ['Skilled Nurses', 'Clinical Protocols', '24/7 Availability'],
    },
    helpWith: {
      eyebrow: 'Nursing care we provide',
      title: 'Clinical Support at Home',
      items: [
        { icon: '🩹', title: 'Post-Surgery Care', description: 'Wound care, dressing changes, and recovery monitoring after hospital discharge.' },
        { icon: '💉', title: 'IV & Injections', description: 'Administration of IV fluids, injections, and medications as prescribed.' },
        { icon: '🫁', title: 'Vital Monitoring', description: 'Regular monitoring of blood pressure, pulse, oxygen, and other vitals.' },
        { icon: '🛏️', title: 'Bedridden Patient Care', description: 'Turning, positioning, hygiene, and comfort care for immobile patients.' },
        { icon: '🤲', title: 'Palliative Support', description: 'Compassionate end-of-life and comfort-focused nursing care at home.' },
        { icon: '📋', title: 'Care Documentation', description: 'Detailed visit notes shared with family and coordinating physicians.' },
      ],
    },
    whyChoose: {
      eyebrow: 'Why families choose Ambimed',
      title: 'Hospital-Grade Care at Home',
      items: [
        { icon: '🩺', label: 'Qualified Nursing Staff' },
        { icon: '✓', label: 'Verified & Background Checked' },
        { icon: '📋', label: 'Structured Care Protocols' },
        { icon: '🕐', label: '12h & 24h Shift Options' },
        { icon: '🔄', label: 'Backup Nurse Coverage' },
        { icon: '💬', label: 'Family Updates & Support' },
      ],
    },
    howItWorks: {
      eyebrow: 'How it works',
      title: 'Arrange Home Nursing in 4 Steps',
      steps: [
        { title: 'Share Medical Needs', description: 'Tell us about the patient\'s condition, prescriptions, and care requirements.' },
        { title: 'Care Plan & Matching', description: 'Our team assigns a nurse with the right skills for your situation.' },
        { title: 'Nursing Begins', description: 'Your nurse arrives on schedule and follows a structured care protocol.' },
        { title: 'Continuous Coordination', description: 'We coordinate with doctors, handle replacements, and keep family informed.' },
      ],
    },
    testimonials: [
      { quote: 'After my husband\'s surgery, the home nurse was exceptional — skilled, gentle, and always professional.', name: 'Meera D.' },
      { quote: 'We needed 24-hour nursing for my father. Ambimed arranged reliable staff quickly.', name: 'Vikram R.' },
      { quote: 'Transparent billing and well-trained nurses. Peace of mind for our whole family.', name: 'Kavita L.' },
    ],
    faqs: [
      { q: 'Are your nurses qualified and registered?', a: 'Yes. Ambimed nurses are qualified professionals who pass verification and skills assessment before assignment.' },
      { q: 'Can I get a 24-hour nurse at home?', a: 'Yes. We offer 12-hour and 24-hour shift options depending on medical needs and availability in your city.' },
      { q: 'Do nurses handle emergency situations?', a: 'Nurses follow clinical protocols and escalate emergencies to family and medical contacts. For life-threatening emergencies, call emergency services.' },
      { q: 'How is nursing care priced?', a: 'Rates depend on shift duration and care complexity. See our live pricing section or get an estimate when you book online.' },
      { q: 'Can the nurse coordinate with our doctor?', a: 'Yes. Nurses document care and can follow physician instructions provided by your family or hospital.' },
    ],
  },
  {
    slug: 'mother-baby',
    bookingServiceTypeId: '3',
    image: '/assets/service-mother-baby.png',
    seo: {
      title: 'Mother & Baby Care at Home | Ambimed Healthcare',
      description:
        'Postnatal care, newborn support & mother wellness at home. Experienced caregivers for recovery, feeding support & baby care. Book trusted care across India.',
      keywords:
        'mother baby care, postnatal care at home, newborn care India, japa nanny, maternity care at home',
    },
    hero: {
      eyebrow: 'Mother & Baby Care',
      title: 'Mother & Baby Care at Home',
      subtitle: 'Support for New Mothers & Newborns',
      description:
        'Experienced caregivers provide postnatal recovery support, newborn care, and guidance for new mothers — so you can rest, heal, and bond with your baby at home.',
      trustBadges: ['Experienced Caregivers', 'Newborn Specialists', 'Gentle & Safe Care'],
    },
    helpWith: {
      eyebrow: 'How we support new families',
      title: 'Care for Mother and Baby',
      items: [
        { icon: '🤱', title: 'Postnatal Recovery', description: 'Support for the mother\'s physical recovery, rest, and wellness after delivery.' },
        { icon: '👶', title: 'Newborn Care', description: 'Bathing, feeding support, diapering, and safe handling of your newborn.' },
        { icon: '🍼', title: 'Feeding Guidance', description: 'Assistance with breastfeeding or bottle feeding routines and schedules.' },
        { icon: '😴', title: 'Sleep & Routine', description: 'Help establishing healthy sleep patterns and daily routines for baby and mother.' },
        { icon: '🍲', title: 'Nutrition Support', description: 'Nutritious meal preparation aligned with postnatal dietary needs.' },
        { icon: '💬', title: 'Emotional Support', description: 'Reassurance and guidance during the early weeks of parenthood.' },
      ],
    },
    whyChoose: {
      eyebrow: 'Why families choose Ambimed',
      title: 'Trusted Support for New Parents',
      items: [
        { icon: '👶', label: 'Newborn Care Experience' },
        { icon: '✓', label: 'Verified Caregivers' },
        { icon: '📋', label: 'Customized Care Plans' },
        { icon: '⏱️', label: 'Day & Night Shifts' },
        { icon: '🔄', label: 'Easy Replacement' },
        { icon: '📱', label: 'Book via App or Web' },
      ],
    },
    howItWorks: {
      eyebrow: 'How it works',
      title: 'Get Mother & Baby Care in 4 Steps',
      steps: [
        { title: 'Tell Us Your Needs', description: 'Share your due date or delivery date, care preferences, and schedule.' },
        { title: 'Caregiver Matching', description: 'We assign an experienced mother & baby care professional.' },
        { title: 'Care at Home Begins', description: 'Your caregiver supports daily routines for mother and newborn.' },
        { title: 'Ongoing Guidance', description: 'Our team remains available for questions, adjustments, and extensions.' },
      ],
    },
    testimonials: [
      { quote: 'The postnatal caregiver was a blessing. She helped me recover while caring for our newborn with such patience.', name: 'Anita D.' },
      { quote: 'As first-time parents, we felt supported every day. Professional and caring throughout.', name: 'Rahul & Priya' },
      { quote: 'Flexible shifts and transparent pricing. Our baby was in safe, experienced hands.', name: 'Shweta N.' },
    ],
    faqs: [
      { q: 'When should I book mother & baby care?', a: 'We recommend booking before delivery or as soon as possible after discharge so care is ready when you arrive home.' },
      { q: 'Can caregivers help with breastfeeding?', a: 'Yes. Our caregivers provide feeding support and can help with routines. For complex lactation issues, consult a lactation specialist.' },
      { q: 'Are night shifts available for newborn care?', a: 'Yes. Day and night shift options are available depending on your city and booking dates.' },
      { q: 'How long can I book mother & baby care?', a: 'Plans range from a few weeks to several months based on your family\'s needs.' },
      { q: 'Are caregivers trained in newborn safety?', a: 'Yes. Caregivers are trained in safe newborn handling, hygiene, and postnatal support protocols.' },
    ],
  },
]

/** Lookup by URL slug */
export function getServiceLandingBySlug(slug) {
  return serviceLandings.find((s) => s.slug === slug) ?? null
}

/** All slugs for static generation & sitemap */
export function getAllServiceSlugs() {
  return serviceLandings.map((s) => s.slug)
}
