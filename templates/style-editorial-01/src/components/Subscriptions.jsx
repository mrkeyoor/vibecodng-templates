// Derived from index slug: hyperui-pricing-2
// Author repo: https://github.com/markmead/hyperui
// Structure kept (side-by-side plan cards: name, price with period, feature
// list, action; one plan emphasized); recast as magazine subscription
// notices with ruled feature lists and an inverted lead card.

const plans = [
  {
    name: 'The Notebook',
    price: '$0',
    period: 'forever',
    note: 'For writing that is not ready to be read.',
    cta: 'Begin a draft',
    lead: false,
    items: [
      'Unlimited private drafts and versions',
      'Publish up to three pieces',
      'Footnotes, of course',
      'Full export, always',
    ],
  },
  {
    name: 'The Byline',
    price: '$10',
    period: 'per month',
    note: 'For a body of work with your name on it.',
    cta: 'Take a byline',
    lead: true,
    items: [
      'Unlimited published work',
      'Subscribers by email and RSS',
      'Paid subscriptions, flat 6% cut',
      'Your own domain and archive page',
      'A print stylesheet worth printing',
    ],
  },
]

export default function Subscriptions() {
  return (
    <section id="subscriptions" className="section pt-0" data-reveal-group>
      <div className="shell">
        <div className="double-rule pt-8" data-reveal style={{ '--reveal-order': 0 }}>
          <div className="folio"><span>No. 4</span><span>Subscriptions</span></div>
          <h2 className="section-title mt-6 max-w-[18ch]">Two rates, printed in <em>full</em></h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2" data-reveal style={{ '--reveal-order': 1 }}>
          {plans.map((plan) => (
            <article key={plan.name} className={`sub-card flex flex-col ${plan.lead ? 'sub-lead' : ''}`}>
              <div className="folio !text-inherit opacity-70"><span>{plan.lead ? 'Recommended' : 'Complimentary'}</span></div>
              <h3 className="display-face m-0 mt-4 text-3xl font-semibold tracking-tight">{plan.name}</h3>
              <p className={`m-0 mt-2 text-sm italic ${plan.lead ? 'opacity-75' : 'text-mist'}`}>{plan.note}</p>
              <p className="m-0 mt-7 flex items-baseline gap-2">
                <span className="sub-price">{plan.price}</span>
                <span className={`text-sm ${plan.lead ? 'opacity-70' : 'text-mist'}`}>{plan.period}</span>
              </p>
              <ul className="sub-list mt-7">
                {plan.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <a
                href="#top"
                className={`button mt-8 w-full ${plan.lead ? '!border-paper !bg-paper !text-ink hover:!border-accent hover:!bg-accent hover:!text-white' : 'button-ghost'}`}
              >
                {plan.cta}
              </a>
            </article>
          ))}
        </div>
        <p className="m-0 mt-5 text-center text-sm italic text-mist" data-reveal style={{ '--reveal-order': 2 }}>
          The 6% is the whole business model. There is no advertising department to disappoint.
        </p>
      </div>
    </section>
  )
}
