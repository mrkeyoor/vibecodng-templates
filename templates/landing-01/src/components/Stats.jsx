// Source slugs: hyperui-stats-1, magicui-number-ticker
// Author repos: https://github.com/markmead/hyperui, https://github.com/magicuidesign/magicui

import { NumberTicker } from './Effects.jsx'

const stats = [
  { value: 31, suffix: '%', label: 'less time spent preparing delivery reviews' },
  { value: 2.4, decimals: 1, suffix: '×', label: 'faster response to work that starts drifting' },
  { value: 8, suffix: ' min', label: 'median time to connect a first workspace' },
  { value: 0, suffix: '', label: 'individual activity scores-by design' },
]

export default function Stats() {
  return (
    <section id="proof" className="border-b border-white/8 bg-panel" data-reveal-group>
      <div className="shell grid sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ value, decimals = 0, suffix, label }, index) => (
          <div key={label} className={`py-10 sm:p-8 lg:py-12 ${index > 0 ? 'border-t border-white/8 sm:border-t-0 sm:border-l' : ''} ${index === 2 ? 'sm:border-l-0 lg:border-l' : ''}`} data-reveal style={{ '--reveal-order': index }}>
            <strong className="stat-value"><NumberTicker value={value} decimalPlaces={decimals} />{suffix}</strong>
            <p className="mt-3 max-w-[15rem] text-sm leading-6 text-mist">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
