// Source slugs: tailark-dusk-stats-2, motion-primitives-animated-number
// Author repos: https://github.com/tailark/blocks, https://github.com/ibelick/motion-primitives
// The dusk stats band restyled with accent rules; count-up runs once in view.

import { CountUp } from './Effects.jsx'

const stats = [
  { value: 41, suffix: 's', label: 'median time from first packet to named intrusion' },
  { value: 2.1, decimals: 1, suffix: 'M', label: 'events per second sustained on one sensor' },
  { value: 14, suffix: ' days', label: 'full-fidelity packet retention around incidents' },
  { value: 0, suffix: '', label: 'packets that leave your network. Ever.' },
]

export default function Stats() {
  return (
    <section id="numbers" className="section border-t border-white/8 bg-panel" data-reveal-group>
      <div className="shell">
        <p className="eyebrow" data-reveal style={{ '--reveal-order': 0 }}>03 / Numbers</p>
        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ value, decimals = 0, suffix, label }, index) => (
            <div key={label} className="stat-cell" data-reveal style={{ '--reveal-order': index + 1 }}>
              <strong className="stat-value"><CountUp value={value} decimals={decimals} />{suffix}</strong>
              <p className="mt-3 max-w-[14rem] text-xs leading-6 text-mist">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
