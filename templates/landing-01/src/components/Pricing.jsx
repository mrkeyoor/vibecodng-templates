// Source slugs: hyperui-pricing-1, magicui-border-beam
// Author repos: https://github.com/markmead/hyperui, https://github.com/magicuidesign/magicui

import { useState } from 'react'
import { ArrowUpRight, Check } from './Icons.jsx'
import { BorderBeam } from './Effects.jsx'

const plans = [
  {
    name: 'Team',
    note: 'For one product team ready to replace status chasing.',
    monthly: 19,
    annual: 15,
    cta: 'Start Team free',
    features: ['Up to 12 contributors', 'GitHub + Linear connections', 'Delivery signals and digests', '90-day history'],
  },
  {
    name: 'Studio',
    note: 'For engineering groups coordinating across shared systems.',
    monthly: 49,
    annual: 39,
    cta: 'Start Studio free',
    featured: true,
    features: ['Unlimited contributors', 'Cross-team portfolio view', 'PagerDuty incident context', 'Unlimited history', 'Priority onboarding'],
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(true)

  return (
    <section id="pricing" className="section border-b border-white/8" data-reveal-group>
      <div className="shell">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between" data-reveal style={{ '--reveal-order': 0 }}>
          <div>
            <div className="eyebrow">Simple pricing</div>
            <h2 className="section-title mt-6">Start with the team.<br />Scale with the work.</h2>
          </div>
          <div className="billing-switch" aria-label="Billing frequency">
            <button type="button" className={!annual ? 'active' : ''} onClick={() => setAnnual(false)}>Monthly</button>
            <button type="button" className={annual ? 'active' : ''} onClick={() => setAnnual(true)}>Annual <span>save 20%</span></button>
          </div>
        </div>

        <div className="grid gap-px bg-white/10 md:grid-cols-2">
          {plans.map((plan, index) => (
            <article key={plan.name} className={`price-card ${plan.featured ? 'price-card-featured' : ''}`} data-reveal style={{ '--reveal-order': index + 1 }}>
              {plan.featured && <BorderBeam />}
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                {plan.featured && <span className="mono rounded-full bg-accent px-3 py-1 text-[9px] font-bold tracking-[0.12em] text-black">MOST POPULAR</span>}
              </div>
              <p className="mt-4 max-w-sm text-sm leading-6 text-mist">{plan.note}</p>
              <div className="mt-10 flex items-end gap-2">
                <span className="text-5xl font-semibold tracking-[-0.055em]">${annual ? plan.annual : plan.monthly}</span>
                <span className="mb-1 text-sm text-mist">/ contributor / mo</span>
              </div>
              <p className="mt-2 h-5 text-xs text-mist">{annual ? 'Billed annually' : 'Billed monthly'}</p>
              <a href="#final-cta" className={`button mt-8 w-full justify-center ${plan.featured ? '' : 'button-ghost'}`}>{plan.cta} <ArrowUpRight /></a>
              <ul className="mt-9 space-y-4 border-t border-white/10 pt-7">
                {plan.features.map((feature) => <li key={feature} className="flex items-center gap-3 text-sm text-white/80"><Check className="size-4 shrink-0 text-accent" />{feature}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-5 text-xs text-mist">All plans include a 14-day trial. Read-only connections by default. Prices shown in USD.</p>
      </div>
    </section>
  )
}
