import IndustrySite from './components/IndustrySite.jsx'

const profile = {
  name: 'Calder & Frost Associates', monogram: 'C&F', category: 'Advocates and legal counsel', artKind: 'law', artLabel: 'Counsel, clearly', artTag: 'Established 2008 · Bengaluru',
  eyebrow: 'Bengaluru counsel for business and private clients', headline: <>Clear advice when the stakes are real.</>,
  lede: 'Calder & Frost Associates helps founders, families, and established companies make sound legal decisions. You get direct partner attention, practical options, and writing that respects your time.',
  primaryCta: 'Request a consultation', headerCta: 'Speak with counsel', serviceNoun: 'practice areas', trustTitle: 'Confidential consultations from ₹7,500', trustCopy: 'Conflict checks completed before any matter is discussed.',
  servicesEyebrow: 'Practice areas', servicesTitle: <>Depth where<br/>decisions matter.</>, servicesIntro: 'Focused teams handle each brief from first assessment through negotiation, filing, or close.',
  services: [
    { title: 'Corporate and commercial', copy: 'Shareholder agreements, investment documents, commercial contracts, governance, and strategic exits for growing companies.', meta: 'Retainers from ₹65,000/month' },
    { title: 'Disputes and arbitration', copy: 'Early case assessment, negotiation, arbitration, and court strategy with a disciplined view of cost and outcome.', meta: 'Case assessment ₹18,000' },
    { title: 'Private client and estates', copy: 'Wills, succession planning, family settlements, trusts, and careful support through probate matters.', meta: 'Estate plans from ₹35,000' },
  ],
  proofLabel: 'Credentials', proofEyebrow: 'Credentials', proofTitle: <>Experienced judgment,<br/>documented.</>, proofIntro: 'The firm combines courtroom experience with commercial discipline. Every client knows who owns the work and what happens next.',
  stats: [{ value: '18 yrs', label: 'Combined partner practice' }, { value: '92%', label: 'Matters resolved without trial' }, { value: '14', label: 'High Courts and tribunals appeared before' }],
  quote: 'They translated a difficult shareholder dispute into three clear options, then kept the negotiation focused until we had a workable settlement.', quoteName: 'Aarav Menon', quoteRole: 'Founder, Fieldwell Systems',
  featureLabel: 'Approach', featureEyebrow: 'How a matter moves', featureTitle: <>No theatre.<br/>A rigorous plan.</>, featureCopy: 'Good legal work should reduce uncertainty. Our matter plan shows the facts, choices, costs, and next decision in plain language.', featureCta: 'Discuss your matter', featureCardLabel: 'Matter plan', featureCardMeta: 'Partner supervised',
  featureItems: [{ title: 'Assess', copy: 'Conflict check, document review, risk map, and initial options.' }, { title: 'Advise', copy: 'A written recommendation with scope, fees, and decision points.' }, { title: 'Act', copy: 'Negotiation, drafting, filing, and regular status notes until close.' }],
  contactEyebrow: 'Private consultation', contactTitle: <>Start with the<br/>right questions.</>, contactCopy: 'Send a short note about the matter and the parties involved. Our team will complete a conflict check and respond within one business day.', contactCta: 'Email the legal team', email: 'counsel@calderfrost.example', phone: '+91 80 4127 6800', phoneHref: '+918041276800', contactCardLabel: 'Bengaluru office', address: '44 Lavelle Road, Bengaluru 560001', hours: 'Monday to Friday, 9:30 am to 6:30 pm · Urgent client line available',
  footerLine: 'Measured advice. Decisive action. No avoidable complexity.', legalLine: 'Attorney advertising · Illustrative template content only',
}

export default function App() { return <IndustrySite profile={profile}/> }
