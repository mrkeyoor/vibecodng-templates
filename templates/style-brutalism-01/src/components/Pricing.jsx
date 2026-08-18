// Adapted patterns: neobrutalism-card (tier cards), neobrutalism-badge (tier flags), neobrutalism-button (CTAs)
// Author repo: https://github.com/ekmas/neobrutalism-components

const plans = [
  {
    name: 'Self-host',
    price: '$0',
    note: 'forever. Not a trial. Not a tease.',
    rows: ['Single binary, your server', 'Every feature, no gating', 'Community support that actually answers', 'MIT-licensed core'],
    cta: 'Download the binary',
    featured: false,
    flag: null,
  },
  {
    name: 'Cloud',
    price: '$29',
    note: 'per project per month. Flat. Seats are free because charging per editor taxes collaboration.',
    rows: ['We run it, patch it, back it up', 'Global edge cache included', 'Unlimited editors and API keys', '99.99% uptime SLA with refunds, not apologies'],
    cta: 'Start on Cloud',
    featured: true,
    flag: 'THE HONEST DEFAULT',
  },
  {
    name: 'Enterprise',
    price: '$499',
    note: 'per month. The price is on the website because you deserve to know it.',
    rows: ['SSO/SAML without the "call us" ritual', 'Audit log, retention, DPA', 'Named engineer, 4h response', 'We will say no to bad feature requests'],
    cta: 'Talk to an engineer',
    featured: false,
    flag: null,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="section" data-reveal-group>
      <div className="shell">
        <div data-reveal style={{ '--reveal-order': 0 }}>
          <h2 className="section-title max-w-3xl">Three prices. All of them public.</h2>
          <p className="mt-4 max-w-xl text-[15px] font-medium leading-7 text-mist">
            No "contact sales" black box, no per-seat arithmetic, no usage cliff at the end of the month.
            You can compute your bill in your head, which is the point.
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <article
              key={plan.name}
              className={`slab-card price-card ${plan.featured ? 'featured rot-r' : index === 0 ? 'rot-l' : ''}`}
              data-reveal
              style={{ '--reveal-order': index + 1 }}
            >
              {plan.flag && <span className="sticker slab-badge slab-badge-paper -top-4 left-4">{plan.flag}</span>}
              <h3 className="font-display text-2xl uppercase tracking-wide">{plan.name}</h3>
              <p className="price-value mt-5">{plan.price}</p>
              <p className="plan-note mt-2 text-[13px] font-semibold leading-5">{plan.note}</p>
              <ul className="mt-6 flex-1 list-none p-0">
                {plan.rows.map((row) => <li key={row} className="plan-row">{row}</li>)}
              </ul>
              <a href="#cta" className={`slab-button mt-6 w-full ${plan.featured ? 'slab-button-ink' : ''}`}>{plan.cta}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
