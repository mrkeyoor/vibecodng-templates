// Source slugs: tripled-stats-counter-block-shadcnui, motion-primitives-animated-number
// Author repos: https://github.com/moumen-soliman/uitripled, https://github.com/ibelick/motion-primitives
// The tripled counter block reduced to one glowing panel; counters run one
// eased pass when the panel first enters view.

import { CountUp } from './Effects.jsx'

const stats = [
  { prefix: '', value: 92, suffix: '%', label: 'of every sale stays with the creator' },
  { prefix: '$', value: 2.4, decimals: 1, suffix: 'M', label: 'paid out to creators every week' },
  { prefix: '', value: 48, suffix: 'h', label: 'from sale to money in your bank' },
  { prefix: '', value: 42, suffix: '', label: 'countries with local payouts' },
]

export default function Stats() {
  return (
    <section id="numbers" className="section pt-0" data-reveal-group>
      <div className="shell">
        <div className="stat-panel grid gap-10 px-8 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-12" data-reveal style={{ '--reveal-order': 0 }}>
          {stats.map(({ prefix, value, decimals = 0, suffix, label }, index) => (
            <div key={label} data-reveal style={{ '--reveal-order': index + 1 }}>
              <strong className="stat-value">{prefix}<CountUp value={value} decimals={decimals} />{suffix}</strong>
              <p className="mt-2 max-w-[13rem] text-sm leading-6 text-mist">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
