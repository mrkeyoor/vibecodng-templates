// First-party pricing in the template's liquid glass language.
import { useState } from 'react'

const plans = [
  {
    name: 'Glance',
    monthly: 0,
    annual: 0,
    blurb: 'See everything in one place.',
    features: ['Unlimited linked accounts', 'Automatic categories', 'Monthly spending recap', 'Search 1 year of history'],
    cta: 'Download free',
    featured: false,
  },
  {
    name: 'Flow',
    monthly: 9,
    annual: 7,
    blurb: 'Let the rules do the saving.',
    features: ['Everything in Glance', 'Unlimited auto-save rules', '30-day balance forecast', 'Weekly written insight', 'Shared goals with a partner'],
    cta: 'Try Flow free for 30 days',
    featured: true,
  },
  {
    name: 'Horizon',
    monthly: 16,
    annual: 13,
    blurb: 'For households and long plans.',
    features: ['Everything in Flow', 'Up to 5 family members', 'Net worth and property tracking', 'Advisor-ready exports', 'Priority human support'],
    cta: 'Start Horizon',
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
          <h2 className="section-title mt-6 text-balance">
            Costs less than the fees <span className="serif-accent text-accent">it finds</span>
          </h2>
          <p className="mt-5 text-base leading-7 text-mist">
            Members typically spot forgotten subscriptions worth more than a year of Meridian
            in their first week.
          </p>
          <div
            className="liquid-deep mx-auto mt-7 flex w-fit gap-1 rounded-full p-1"
            role="group"
            aria-label="Billing period"
          >
            {['Monthly', 'Annual'].map((label) => {
              const isAnnual = label === 'Annual'
              const active = annual === isAnnual
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setAnnual(isAnnual)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${active ? 'bg-white text-ink shadow-sm' : 'text-mist'}`}
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
              className={`liquid price-card ${plan.featured ? 'price-card-featured' : 'liquid-hover'}`}
              data-reveal
              style={{ '--reveal-order': index + 1 }}
            >
              {plan.featured && (
                <span className="mb-5 w-fit rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                  Most loved
                </span>
              )}
              <h3 className="text-xl font-semibold tracking-tight">{plan.name}</h3>
              <p className="mt-2 min-h-10 text-sm leading-6 text-mist">{plan.blurb}</p>
              <p className="mt-5">
                <span className="text-4xl font-semibold tracking-tight">
                  {plan.monthly === 0 ? '$0' : `$${annual ? plan.annual : plan.monthly}`}
                </span>
                <span className="ml-2 text-sm font-medium text-mist">{plan.monthly === 0 ? 'forever' : 'per month'}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-medium">
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
          Annual prices shown per month, billed once a year. Cancel in the app, anytime.
        </p>
      </div>
    </section>
  )
}
