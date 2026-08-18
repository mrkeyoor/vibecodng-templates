// Derived from index slug: meraki-pricing-side-by-side
// Author repo: https://github.com/merakiui/merakiui
// Structure kept (two side-by-side cards: name, description, price with
// period, button, divided "what's included" list); filled buttons and check
// icons flattened to the template's 1px rules and dash markers.

const tiers = [
  {
    name: 'Free',
    blurb: 'For the occasional job. Three invoices a month, every core feature included.',
    price: '$0',
    period: 'forever',
    cta: 'Start free',
    lead: false,
    included: ['3 invoices per month', 'Payment links and bank transfer', 'Automatic paid-matching', 'Client address book'],
  },
  {
    name: 'Working',
    blurb: 'For freelancing as a living. Unlimited invoices and the parts that chase money for you.',
    price: '$9',
    period: 'per month, billed yearly',
    cta: 'Start 30 days free',
    lead: true,
    included: ['Unlimited invoices', 'Scheduled reminders and late fees', 'Quarterly tax export', 'Recurring invoices', 'Your logo, your domain'],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="section pt-0">
      <div className="shell">
        <div className="rule pt-14">
          <div className="max-w-2xl">
            <p className="kicker">Pricing</p>
            <h2 className="section-title mt-4">One price. It is nine dollars.</h2>
            <p className="mt-4 text-[0.9375rem] leading-7 text-mist">
              No tiers named after gemstones, no seats, no usage math. Free while
              invoicing is occasional, nine dollars a month when it is your living.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {tiers.map((tier) => (
              <div key={tier.name} className={`price-card ${tier.lead ? 'price-card-lead' : ''}`}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-base font-semibold">{tier.name}</h3>
                  {tier.lead ? <span className="mono text-[10px] tracking-[0.14em] text-accent">MOST USEFUL</span> : null}
                </div>
                <p className="mt-3 text-sm leading-6 text-mist">{tier.blurb}</p>
                <p className="mt-6">
                  <span className="price-value">{tier.price}</span>
                  <span className="ml-2 text-sm text-mist">{tier.period}</span>
                </p>
                <a href="#top" className={`button mt-6 w-full ${tier.lead ? '' : 'button-quiet'}`}>{tier.cta}</a>
                <div className="rule mt-7 pt-5">
                  <p className="mono text-[10px] tracking-[0.14em] text-mist">INCLUDED</p>
                  <ul className="included mt-4 grid list-none gap-2.5 p-0">
                    {tier.included.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
