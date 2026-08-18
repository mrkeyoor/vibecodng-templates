import IndustrySite from './components/IndustrySite.jsx'

const profile = {
  name: 'Riverbank Foundation', monogram: 'RF', category: 'Clean water initiative', artKind: 'ngo', artLabel: 'Water within reach', artTag: 'Working across the Narmada basin',
  eyebrow: 'Community-led clean water systems', headline: <>Clean water changes the whole day.</>,
  lede: 'Riverbank Foundation partners with villages to build durable water points, train local caretakers, and test water quality long after installation day.',
  primaryCta: 'Fund clean water', headerCta: 'Donate today', serviceNoun: 'programs', trustTitle: '₹1,850 gives one person a year of safe water', trustCopy: 'Every completed system is mapped, tested, and locally managed.',
  servicesEyebrow: 'Our programs', servicesTitle: <>Infrastructure owned<br/>by the community.</>, servicesIntro: 'A water point works when engineering, local training, and long-term maintenance arrive together.',
  services: [
    { title: 'Village water systems', copy: 'Solar pumps, storage, filtration, and tap stands designed around local groundwater and daily demand.', meta: 'Average project ₹8.4 lakh' },
    { title: 'Caretaker training', copy: 'Village-selected operators learn routine checks, simple repairs, fee records, and escalation pathways.', meta: 'Two trained caretakers per site' },
    { title: 'Water quality labs', copy: 'Field testing and independent lab checks track bacteria, fluoride, nitrate, and seasonal changes.', meta: 'Quarterly public results' },
  ],
  proofLabel: 'Impact', proofEyebrow: '2025 impact', proofTitle: <>Evidence that<br/>keeps flowing.</>, proofIntro: 'We publish project locations, test results, budgets, and maintenance status so supporters and communities can follow each system.',
  stats: [{ value: '38,420', label: 'People with reliable safe water' }, { value: '71', label: 'Community systems operating' }, { value: '93%', label: 'Funds directed to programs' }],
  quote: 'Before the new system, our girls missed the first class to collect water. Now the taps open before school and our own committee runs the schedule.', quoteName: 'Sushila Pawar', quoteRole: 'Water committee chair, Khedi',
  featureLabel: 'Transparency', featureEyebrow: 'Follow one project', featureTitle: <>A gift becomes<br/>a working system.</>, featureCopy: 'Donors receive a project code and can follow the budget, build milestones, water tests, and caretaker visits in one public record.', featureCta: 'Sponsor a water point', featureCardLabel: 'Project RB-071', featureCardMeta: 'Khedi · Operational',
  featureItems: [{ title: 'Build complete', copy: 'Bore assessment, solar pump, 10,000 litre tank, and four tap stands.' }, { title: 'Quality verified', copy: 'Commissioning samples passed bacterial and chemical safety checks.' }, { title: 'Local care active', copy: 'Two trained caretakers and a village maintenance fund with monthly records.' }],
  contactEyebrow: 'Give or partner', contactTitle: <>Help a village<br/>turn on the tap.</>, contactCopy: 'Make an individual gift, fund a full water point, or ask about a corporate partnership. Our team shares a clear budget before you commit.', contactCta: 'Contact partnerships', email: 'water@riverbankfoundation.example', phone: '+91 755 412 8800', phoneHref: '+917554128800', contactCardLabel: 'Program office', address: '12 Link Road No. 1, Bhopal 462016', hours: 'Monday to Friday, 9 am to 5:30 pm · Field teams work across Madhya Pradesh',
  footerLine: 'Safe water, local ownership, and public proof.', legalLine: 'Donation examples and registration details are fictional',
}

export default function App() { return <IndustrySite profile={profile}/> }
