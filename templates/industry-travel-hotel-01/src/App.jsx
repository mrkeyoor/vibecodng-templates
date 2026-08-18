import IndustrySite from './components/IndustrySite.jsx'

const profile = {
  name: 'Juniper House', monogram: 'JH', category: 'Boutique hotel · Coonoor', artKind: 'hotel', artLabel: 'Juniper House', artTag: '12 rooms · Nilgiri hills',
  eyebrow: 'A small hotel above the tea gardens', headline: <>Wake slowly in the blue hills.</>,
  lede: 'Juniper House is a twelve-room retreat in Coonoor with garden breakfasts, long verandas, and a house team that knows every bend in the hills.',
  primaryCta: 'Check room dates', headerCta: 'Reserve a room', serviceNoun: 'stays', trustTitle: 'Rooms from ₹9,800 per night', trustCopy: 'Breakfast, evening tea, and local station transfers included.',
  servicesEyebrow: 'Rooms and stays', servicesTitle: <>A room for<br/>every rhythm.</>, servicesIntro: 'Each room pairs old Nilgiri stone, warm timber, and wide windows with the comforts that matter.',
  services: [
    { title: 'Garden Room', copy: 'A quiet king room opening to the lower garden, with a reading chair, rain shower, and morning sun.', meta: 'From ₹9,800 · sleeps 2' },
    { title: 'Veranda Suite', copy: 'A generous suite with a private veranda, valley view, writing desk, and a deep soaking tub.', meta: 'From ₹14,500 · sleeps 2' },
    { title: 'Juniper Family Loft', copy: 'Two connected sleeping spaces, a window seat, and room for unhurried family breakfasts.', meta: 'From ₹18,900 · sleeps 4' },
  ],
  proofLabel: 'The house', proofEyebrow: 'At Juniper House', proofTitle: <>Small scale,<br/>thoughtful detail.</>, proofIntro: 'There is always someone at the desk, something warm from the kitchen, and a recommendation suited to the weather.',
  stats: [{ value: '12', label: 'Individually designed rooms' }, { value: '4.9', label: 'Average guest rating' }, { value: '8 km', label: 'From Coonoor railway station' }],
  quote: 'The veranda looked straight into the mist. Breakfast arrived with warm bread and a handwritten trail map. We stayed an extra night.', quoteName: 'Rhea and Kabir Shah', quoteRole: 'Guests from Mumbai',
  featureLabel: 'House table', featureEyebrow: 'Eat and wander', featureTitle: <>The hills,<br/>served simply.</>, featureCopy: 'Our kitchen cooks a short daily menu with Nilgiri produce. Ask the house team for a tea walk, a picnic, or a quiet afternoon indoors.', featureCta: 'Plan your stay', featureCardLabel: 'Today at the house', featureCardMeta: 'Sample menu',
  featureItems: [{ title: 'Garden breakfast', copy: 'Millet dosas, farm eggs, fruit, filter coffee, and house preserves.' }, { title: 'Hill lunch', copy: 'Roast pumpkin broth, sourdough, herb salad, and lemon tart. ₹1,450 per guest.' }, { title: 'Tea garden walk', copy: 'A private two-hour walk with a local naturalist. ₹2,200 for two.' }],
  contactEyebrow: 'Reservations', contactTitle: <>Come up<br/>for clearer air.</>, contactCopy: 'Share your dates, number of guests, and any travel notes. We will reply with the best available room and a simple plan for arrival.', contactCta: 'Ask about dates', email: 'stay@juniperhouse.example', phone: '+91 423 223 1840', phoneHref: '+914232231840', contactCardLabel: 'Find the house', address: '17 Upper Church Road, Coonoor, Tamil Nadu 643101', hours: 'Front desk daily, 7 am to 10 pm · Check-in from 2 pm',
  footerLine: 'A warm room, a green view, and nowhere you need to rush.', legalLine: 'Rates exclude applicable taxes · Fictional property',
}

export default function App() { return <IndustrySite profile={profile}/> }
