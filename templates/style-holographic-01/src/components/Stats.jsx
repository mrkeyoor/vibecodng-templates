// Source slug: motion-primitives-animated-number (count-up only)
// Author repo: https://github.com/ibelick/motion-primitives
// Band layout and foil rules are first-party; counters run one eased pass.

import { CountUp } from './Effects.jsx'

const stats = [
  { value: 118, suffix: 'k', label: 'portfolios live on Flux' },
  { value: 0.7, decimals: 1, suffix: 's', label: 'median first paint on a project page' },
  { value: 31, suffix: '%', label: 'more replies to outreach with a client room link' },
  { value: 9, suffix: '', label: 'layout systems, all yours to break' },
]

export default function Stats() {
  return (
    <section id="numbers" className="section" data-reveal-group>
      <div className="shell">
        <hr className="footer-foil-rule" />
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ value, decimals = 0, suffix, label }, index) => (
            <div key={label} data-reveal style={{ '--reveal-order': index }}>
              <strong className="stat-value holo-text"><CountUp value={value} decimals={decimals} />{suffix}</strong>
              <p className="mt-2 max-w-[13rem] text-sm leading-6 text-mist">{label}</p>
            </div>
          ))}
        </div>
        <hr className="footer-foil-rule" />
      </div>
    </section>
  )
}
