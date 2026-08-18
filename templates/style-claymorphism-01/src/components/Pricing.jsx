// Tiers adapted from clay-pricing (mrkeyoor/sir-originals).
import { ClayPricing } from './Clay.jsx'

const tiers = [
  {
    name: 'Seedling', price: '$0', period: 'forever',
    description: 'One child, one garden plot, and the full letter quest line.',
    features: ['Daily letter quests', 'One garden plot', 'Grown-up gate', 'Offline mode'],
    cta: 'Start free',
  },
  {
    name: 'Bloom', price: '$6', period: '/month',
    description: 'The whole meadow: numbers, phonics, life skills, and the parent dashboard.',
    features: ['Every quest line', 'Parent dashboard', 'Printable practice sheets', 'Progress reports by email'],
    cta: 'Try 30 days free', featured: true, badge: 'Most planted',
  },
  {
    name: 'Meadow', price: '$9', period: '/month',
    description: 'Up to four children, each with their own plot, pace, and reading level.',
    features: ['Everything in Bloom', 'Four child profiles', 'Sibling mode', 'Shared family garden'],
    cta: 'Grow together',
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="section" data-reveal-group>
      <div className="shell">
        <div className="max-w-2xl" data-reveal style={{ '--reveal-order': 0 }}>
          <p className="eyebrow">Plans</p>
          <h2 className="section-title mt-4">Less than a box of crayons.</h2>
          <p className="mt-5 text-base font-bold leading-7 text-mist">
            Every plan is ad free, data quiet, and cancellable in two taps. Schools and libraries can write to us for classroom pricing.
          </p>
        </div>
        <div className="mt-16 grid items-start gap-x-8 gap-y-12 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <div key={tier.name} data-reveal style={{ '--reveal-order': index + 1 }}>
              <ClayPricing {...tier} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
