// Source slug: tripled-glassmorphism-minimal-metrics-block-shadcnui
// Author repo: https://github.com/moumen-soliman/uitripled
// Adapted: two-column frosted metric cards with delta pills and a concierge footer band kept;
// framer-motion stagger replaced by the shared reveal controller; copy rewritten for Vantage.
import { ArrowUpRight } from './Icons.jsx'

const metrics = [
  { label: 'Events processed daily', value: '2.1B', delta: '+38% YoY', body: 'Ingested, deduplicated, and queryable in under five seconds.' },
  { label: 'Median query time', value: '340ms', delta: 'p95 under 1.2s', body: 'Funnels over a year of data come back before the meeting moves on.' },
  { label: 'Teams on shared views', value: '4,800', delta: '+900 this quarter', body: 'Product, growth, and support reading one set of definitions.' },
  { label: 'Dashboards retired', value: '19k', delta: 'and counting', body: 'Customers archive stale BI boards once alerts do the watching.' },
]

export default function Stats() {
  return (
    <section id="metrics" className="section pt-0" data-reveal-group>
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center" data-reveal style={{ '--reveal-order': 0 }}>
          <span className="eyebrow">In production</span>
          <h2 className="section-title mt-6 text-balance">The numbers behind the calm</h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {metrics.map((metric, index) => (
            <article key={metric.label} className="glass glass-hover p-8" data-reveal style={{ '--reveal-order': index + 1 }}>
              <div className="flex items-center justify-between gap-4">
                <p className="mono text-[10px] uppercase tracking-[0.2em] text-mist">{metric.label}</p>
                <ArrowUpRight className="text-mist/70" aria-hidden="true" />
              </div>
              <div className="mt-4 flex flex-wrap items-end gap-3">
                <span className="stat-value">{metric.value}</span>
                <span className="delta-pill text-accent">{metric.delta}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-mist">{metric.body}</p>
            </article>
          ))}
        </div>
        <div className="glass mt-4 flex flex-wrap items-center justify-between gap-5 px-6 py-6 sm:px-8" data-reveal style={{ '--reveal-order': 5 }}>
          <div>
            <p className="mono text-[10px] uppercase tracking-[0.2em] text-mist">Weekly digest</p>
            <p className="mt-2 max-w-md text-sm leading-6 text-white/85">
              Every Monday, leaders get a one-page read of what moved and why. No dashboard safari required.
            </p>
          </div>
          <a href="#cta" className="button button-ghost button-small">Get a sample digest</a>
        </div>
      </div>
    </section>
  )
}
