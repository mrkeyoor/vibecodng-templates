// Stat row adapted from neu-stat-card (mrkeyoor/sir-originals).
import { NeuStatCard } from './Neu.jsx'

const icon = (path) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={path} />
  </svg>
)

const stats = [
  { label: 'Median score check time', value: '9 sec', change: '2 sec faster', icon: icon('M12 8v4l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0') },
  { label: 'Nights tracked', value: '4.1M', change: '12%', icon: icon('M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8') },
  { label: 'Members sleeping longer', value: '68%', change: '5 pts', icon: icon('M4 18V10m5 8V6m5 12v-7m5 7V4') },
  { label: 'Average battery cost', value: '2%', change: 'per day', icon: icon('M6 7h9a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Zm13 3v4') },
]

export default function Stats() {
  return (
    <section id="score" className="section pt-0" data-reveal-group>
      <div className="shell">
        <hr className="neu-line mb-16" />
        <div className="max-w-2xl" data-reveal style={{ '--reveal-order': 0 }}>
          <p className="eyebrow">Quiet numbers</p>
          <h2 className="section-title mt-4">Calm is measurable.</h2>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.label} data-reveal style={{ '--reveal-order': index + 1 }}>
              <NeuStatCard {...stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
