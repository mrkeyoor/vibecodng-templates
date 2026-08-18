// Tiers adapted from neu-pricing; billing switch is the adapted neu-toggle
// (both mrkeyoor/sir-originals).
import { useState } from 'react'
import { NeuPricing, NeuToggle } from './Neu.jsx'

const tiers = (yearly) => [
  {
    name: 'Rest', price: '$0', period: 'forever',
    description: 'The morning score, one habit anchor, and seven days of history.',
    features: ['Daily readiness score', 'Sleep phase tracking', 'One habit anchor', '7 day history'],
    cta: 'Start free',
  },
  {
    name: 'Recover', price: yearly ? '$5' : '$7', period: '/month',
    description: 'The full picture: trends, unlimited habits, and training guidance.',
    features: ['Everything in Rest', 'HRV and strain trends', 'Unlimited habit anchors', 'Training load targets', 'Full searchable history'],
    cta: 'Start 14 days free', featured: true,
  },
  {
    name: 'Team', price: yearly ? '$4' : '$6', period: '/seat/month',
    description: 'Shared recovery for clubs and coaches, with privacy defaults that lean personal.',
    features: ['Everything in Recover', 'Coach dashboard', 'Readiness sharing controls', 'CSV and API export'],
    cta: 'Talk to us',
  },
]

export default function Pricing() {
  const [yearly, setYearly] = useState(true)

  return (
    <section id="pricing" className="section" data-reveal-group>
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8" data-reveal style={{ '--reveal-order': 0 }}>
          <div className="max-w-xl">
            <p className="eyebrow">Pricing</p>
            <h2 className="section-title mt-4">Cheaper than one bad night.</h2>
          </div>
          <div className="flex items-center gap-3">
            <NeuToggle label="Bill yearly" checked={yearly} onChange={setYearly} />
            <span className="rounded-full px-3 py-1 text-xs font-bold text-accent neu-inset">2 months free</span>
          </div>
        </div>
        <div className="mt-14 grid items-start gap-10 md:grid-cols-3">
          {tiers(yearly).map((tier, index) => (
            <div key={tier.name} data-reveal style={{ '--reveal-order': index + 1 }}>
              <NeuPricing {...tier} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
