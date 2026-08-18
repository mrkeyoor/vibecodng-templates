// Source slug: tripled-feature-cards-block-shadcnui
// Author repo: https://github.com/moumen-soliman/uitripled
// Adapted: frosted card grid with icon wells and hover lift kept; grid grew from three
// to six cards; shadcn Card/lucide replaced with first-party glass primitives and icons.
import { Funnel, Pulse, Cohort, Bell, Layers, Shield } from './Icons.jsx'

const features = [
  {
    icon: Funnel,
    title: 'Funnels in plain language',
    body: 'Describe the steps as your team says them. Vantage maps them to events and shows exactly where people drop.',
  },
  {
    icon: Cohort,
    title: 'Cohorts that stay fresh',
    body: 'Group users by behavior, plan, or region. Cohorts recompute on every sync, so last month never poses as today.',
  },
  {
    icon: Pulse,
    title: 'Live product pulse',
    body: 'A single screen for actives, conversion, and retention. Updates within seconds of events arriving.',
  },
  {
    icon: Bell,
    title: 'Alerts before the retro',
    body: 'Set a threshold once and get pinged in Slack when a metric drifts, with the affected segment attached.',
  },
  {
    icon: Layers,
    title: 'Warehouse sync',
    body: 'Two-way sync with Snowflake, BigQuery, and Postgres. Your models stay the source of truth.',
  },
  {
    icon: Shield,
    title: 'Access without anxiety',
    body: 'Row-level permissions, SSO, and EU data residency. Auditors get their export in one click.',
  },
]

export default function Features() {
  return (
    <section id="features" className="section" data-reveal-group>
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center" data-reveal style={{ '--reveal-order': 0 }}>
          <span className="eyebrow">What you get</span>
          <h2 className="section-title mt-6 text-balance">Every question about your product, answered on one pane</h2>
          <p className="mt-5 text-pretty text-base leading-7 text-mist">
            Six capabilities that replace the weekly metrics scramble with something calmer.
          </p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className="glass glass-hover p-7"
              data-reveal
              style={{ '--reveal-order': index + 1 }}
            >
              <div className="icon-well"><feature.icon /></div>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-mist">{feature.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
