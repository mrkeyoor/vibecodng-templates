// Source slug: tripled-glassmorphism-pricing-block-shadcnui
// Author repo: https://github.com/moumen-soliman/uitripled
// Adapted: three frosted tiers with a highlighted popular plan and check lists kept;
// added a first-party monthly/annual switch; shadcn Card/Button swapped for glass primitives.
import { useState } from 'react'

const plans = [
  {
    name: 'Starter',
    monthly: 0,
    annual: 0,
    blurb: 'For a product finding its first users.',
    features: ['Up to 5 seats', '1M events per month', 'Funnels and retention', 'Community support'],
    cta: 'Start free',
    featured: false,
  },
  {
    name: 'Growth',
    monthly: 79,
    annual: 63,
    blurb: 'For teams shipping weekly and watching the numbers move.',
    features: ['Unlimited seats', '25M events per month', 'Cohorts, alerts, digests', 'Warehouse sync', 'Slack and email alerts'],
    cta: 'Start 14-day trial',
    featured: true,
  },
  {
    name: 'Scale',
    monthly: 249,
    annual: 199,
    blurb: 'For companies where analytics is infrastructure.',
    features: ['Everything in Growth', 'Unmetered event volume', 'SSO and row-level access', 'EU data residency', 'Dedicated engineer'],
    cta: 'Talk to us',
    featured: false,
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(true)

  return (
    <section id="pricing" className="section" data-reveal-group>
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center" data-reveal style={{ '--reveal-order': 0 }}>
          <span className="eyebrow">Pricing</span>
          <h2 className="section-title mt-6 text-balance">Pay for events, not for seats</h2>
          <p className="mt-5 text-base leading-7 text-mist">
            Everyone on the team gets a login. You only pay for what your product actually sends.
          </p>
          <div className="billing-switch mx-auto mt-7" role="group" aria-label="Billing period">
            <button type="button" className={annual ? '' : 'active'} onClick={() => setAnnual(false)}>Monthly</button>
            <button type="button" className={annual ? 'active' : ''} onClick={() => setAnnual(true)}>
              Annual <span className="text-accent">-20%</span>
            </button>
          </div>
        </div>
        <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <article
              key={plan.name}
              className={`glass price-card ${plan.featured ? 'price-card-featured' : 'glass-hover'}`}
              data-reveal
              style={{ '--reveal-order': index + 1 }}
            >
              {plan.featured && (
                <span className="mono mb-5 w-fit rounded-full border border-white/14 bg-white/6 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-accent">
                  Most teams choose this
                </span>
              )}
              <h3 className="text-xl font-semibold tracking-tight">{plan.name}</h3>
              <p className="mt-2 min-h-10 text-sm leading-6 text-mist">{plan.blurb}</p>
              <p className="mt-5">
                <span className="text-4xl font-semibold tracking-tight">
                  {plan.monthly === 0 ? '$0' : `$${annual ? plan.annual : plan.monthly}`}
                </span>
                <span className="ml-2 text-sm text-mist">{plan.monthly === 0 ? 'forever' : 'per month'}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-white/85">
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
        <p className="mono mt-6 text-center text-[10px] uppercase tracking-[0.16em] text-mist" data-reveal style={{ '--reveal-order': 4 }}>
          Annual prices shown per month, billed yearly · VAT handled at checkout
        </p>
      </div>
    </section>
  )
}
