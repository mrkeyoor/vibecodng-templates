// First-party pricing: amp-series faceplates with tactile buy buttons.
const tiers = [
  {
    name: 'Bedroom', watts: '5W', price: '$0', period: 'forever',
    description: 'The click, the tuner, and seven days of takes. Enough to build the habit.',
    features: ['Metronome and tap tempo', 'Chromatic tuner', '7 days of takes', 'One practice deck'],
    cta: 'Take it home',
  },
  {
    name: 'Club', watts: '30W', price: '$4', period: '/month',
    description: 'The full board: drills that adapt, a take archive, and your progress on tape.',
    features: ['Everything in Bedroom', 'Adaptive drill decks', 'Unlimited take archive', 'Progress reels, weekly', 'Setlist sheets'],
    cta: 'Go louder', featured: true,
  },
  {
    name: 'Studio', watts: '100W', price: '$9', period: '/month',
    description: 'For teachers and bands: shared decks, student rooms, and exportable stems.',
    features: ['Everything in Club', 'Five linked players', 'Teacher room with notes', 'WAV export of takes'],
    cta: 'Book the room',
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="section" data-reveal-group>
      <div className="shell">
        <div className="max-w-2xl" data-reveal style={{ '--reveal-order': 0 }}>
          <p className="eyebrow">Pricing</p>
          <h2 className="section-title mt-4">Pick your wattage.</h2>
          <p className="mt-5 text-base leading-7 text-mist">
            Cheaper than one set of strings. Cancel any time; your takes export with you.
          </p>
        </div>
        <div className="mt-14 grid items-stretch gap-8 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <div key={tier.name} className={`metal-panel relative flex flex-col rounded-[14px] p-7 ${tier.featured ? 'outline-2 outline-offset-4 outline-accent' : ''}`} data-reveal style={{ '--reveal-order': index + 1 }}>
              <span className="metal-screw left-2 top-2" aria-hidden="true" />
              <span className="metal-screw right-2 top-2" aria-hidden="true" />
              {tier.featured ? <span className="absolute -top-3 right-6 rounded-[6px] bg-accent px-3 py-1 font-display text-xs tracking-[0.16em] text-surface shadow-[0_3px_8px_rgb(0_0_0/0.5)]">MOST PLAYED</span> : null}
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-3xl tracking-[0.06em]">{tier.name}</h3>
                <span className="engraved text-[0.8rem]">{tier.watts}</span>
              </div>
              <div className="mt-4 flex items-end gap-1">
                <span className="font-display text-5xl text-accent">{tier.price}</span>
                <span className="pb-1 text-sm text-mist">{tier.period}</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-mist">{tier.description}</p>
              <ul className="my-6 space-y-2.5 text-sm">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="led shrink-0" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button type="button" className={`push-button mt-auto w-full ${tier.featured ? '' : 'push-button-ghost'}`}>{tier.cta}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
