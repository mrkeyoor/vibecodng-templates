import IndustrySite from './components/IndustrySite.jsx'

const profile = {
  name: 'Bastion Build Co', monogram: 'BB', category: 'Commercial builders · Pune', artKind: 'construction', artLabel: 'BASTION / BUILD', artTag: 'Safety first · Programme clear',
  eyebrow: 'Commercial construction across western India', headline: <>Built to hold up. Managed to add up.</>,
  lede: 'Bastion Build Co delivers workplaces, retail spaces, and light industrial facilities with practical engineering, visible schedules, and one accountable site team.',
  primaryCta: 'Price your project', headerCta: 'Request a site visit', serviceNoun: 'capabilities', trustTitle: 'Projects from ₹1.5 crore', trustCopy: 'Preliminary feasibility review completed within five working days.',
  servicesEyebrow: 'Core capabilities', servicesTitle: <>From first survey<br/>to final handover.</>, servicesIntro: 'Our construction managers coordinate design, procurement, safety, and delivery under one clear programme.',
  services: [
    { title: 'Design and build', copy: 'A coordinated route from brief and approvals to technical design, procurement, construction, and occupancy.', meta: 'Single point accountability' },
    { title: 'Commercial fit-outs', copy: 'Fast, detailed delivery for offices, stores, clinics, hospitality spaces, and occupied refurbishments.', meta: 'Projects from ₹45 lakh' },
    { title: 'Industrial and logistics', copy: 'Efficient shells, utilities, yards, and operational spaces planned around safety and throughput.', meta: 'Pre-engineered and RCC' },
  ],
  proofLabel: 'Track record', proofEyebrow: 'Measured delivery', proofTitle: <>Solid numbers.<br/>Visible control.</>, proofIntro: 'Clients receive a weekly report covering progress, safety, procurement, commercial changes, and decisions required.',
  stats: [{ value: '2.4M', label: 'Square feet delivered' }, { value: '1.8M', label: 'Safe work hours since LTI' }, { value: '94%', label: 'Milestones met on programme' }],
  quote: 'Bastion flagged the long-lead equipment before it became a delay, re-sequenced the floor, and kept our opening date intact.', quoteName: 'Neha Kulkarni', quoteRole: 'Operations Director, Arbor Foods',
  featureLabel: 'Project controls', featureEyebrow: 'The site ledger', featureTitle: <>Every week,<br/>the truth on site.</>, featureCopy: 'No vague progress claims. The site ledger ties photographs, quantities, approvals, costs, and the next two-week plan together.', featureCta: 'Review a sample report', featureCardLabel: 'Week 18 report', featureCardMeta: 'Status: on programme',
  featureItems: [{ title: 'Progress and safety', copy: 'Zone completion, inspections, workforce, permits, and observations closed.' }, { title: 'Cost and procurement', copy: 'Approved value, forecast, changes, long-lead orders, and delivery risks.' }, { title: 'Decisions ahead', copy: 'A short owner list with due dates and clear impact on programme.' }],
  contactEyebrow: 'New projects', contactTitle: <>Bring us the site.<br/>We will bring the plan.</>, contactCopy: 'Send the location, approximate area, target use, and desired handover date. We will arrange a practical first review with a construction lead.', contactCta: 'Send the project brief', email: 'projects@bastionbuild.example', phone: '+91 20 6744 2900', phoneHref: '+912067442900', contactCardLabel: 'Pune office', address: '88 Bund Garden Road, Pune 411001', hours: 'Monday to Saturday, 8:30 am to 6 pm · Site visits by appointment',
  footerLine: 'Strong structures start with honest programmes and accountable people.', legalLine: 'Licences and figures are illustrative template content',
}

export default function App() { return <IndustrySite profile={profile}/> }
