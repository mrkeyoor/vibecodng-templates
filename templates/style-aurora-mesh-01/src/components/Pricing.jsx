// First-party pricing; the featured tier wears an aurora gradient border.
import { useState } from 'react'

const plans = [
  {
    name: 'Notebook',
    monthly: 0,
    annual: 0,
    blurb: 'For essays, letters, and getting unstuck.',
    features: ['20,000 words a month', 'Outlines and rewrites', 'Voice profile from 3 pieces', 'Export to Markdown'],
    cta: 'Start free',
    featured: false,
  },
  {
    name: 'Byline',
    monthly: 14,
    annual: 11,
    blurb: 'For people who publish on a schedule.',
    features: ['Unlimited words', 'Citations with sources', 'Newsletter, script, thread exports', 'Version history forever', 'Priority drafting model'],
    cta: 'Try Byline free',
    featured: true,
  },
  {
    name: 'Masthead',
    monthly: 32,
    annual: 26,
    blurb: 'For newsrooms and content teams.',
    features: ['Everything in Byline', 'Shared style guide enforcement', 'Editor notes and approvals', 'SSO and audit log', 'Per-desk voice profiles'],
    cta: 'Talk to sales',
    featured: false,
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(true)

  return (
    <section id="pricing" className="section pt-0" data-reveal-group>
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center" data-reveal style={{ '--reveal-order': 0 }}>
          <span className="eyebrow">Pricing</span>
          <h2 className="section-title mt-6 text-balance">Priced like a good pen, not a newsroom</h2>
          <div className="mx-auto mt-7 flex w-fit gap-1 rounded-full border border-white/12 bg-white/4 p-1" role="group" aria-label="Billing period">
            {['Monthly', 'Annual'].map((label) => {
              const isAnnual = label === 'Annual'
              const active = annual === isAnnual
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setAnnual(isAnnual)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${active ? 'bg-white/12 text-white' : 'text-mist'}`}
                >
                  {label}{isAnnual && <span className="ml-1 text-accent">-20%</span>}
                </button>
              )
            })}
          </div>
        </div>
        <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <article
              key={plan.name}
              className={`pane price-card ${plan.featured ? 'price-card-featured' : 'pane-hover'}`}
              data-reveal
              style={{ '--reveal-order': index + 1 }}
            >
              {plan.featured && (
                <span className="aurora-text mb-5 w-fit text-[11px] font-bold uppercase tracking-[0.16em]">
                  Most writers choose this
                </span>
              )}
              <h3 className="text-xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{plan.name}</h3>
              <p className="mt-2 min-h-10 text-sm leading-6 text-mist">{plan.blurb}</p>
              <p className="mt-5">
                <span className="text-4xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                  {plan.monthly === 0 ? '$0' : `$${annual ? plan.annual : plan.monthly}`}
                </span>
                <span className="ml-2 text-sm text-mist">{plan.monthly === 0 ? 'forever' : 'per month'}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-white/88">
                    <span className="check-dot" aria-hidden="true">
                      <svg viewBox="0 0 12 12" width="8" height="8"><path d="m2 6.2 2.6 2.6L10 3.4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="#cta" className={`mt-8 w-full ${plan.featured ? 'button' : 'button button-ghost'}`}>{plan.cta}</a>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-xs font-medium text-mist" data-reveal style={{ '--reveal-order': 4 }}>
          Annual prices shown per month, billed yearly. Students and working journalists get Byline half off.
        </p>
      </div>
    </section>
  )
}
