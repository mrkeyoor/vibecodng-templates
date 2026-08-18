// First-party section: floating pricing planes reusing the plane/hover-depth system.
// The hover depth treatment carries the uilayouts-hovercard3 attribution from Hero.jsx.

const plans = [
  {
    name: 'Drift',
    price: '$0',
    cadence: 'forever, public spaces',
    blurb: 'For open-source docs and anyone who wants to see their pages become a map.',
    rows: ['1 public space, unlimited pages', 'Reader and graph views', 'Markdown and MDX import', 'Atlas badge on the space'],
    cta: 'Start free',
    featured: false,
  },
  {
    name: 'Orbit',
    price: '$12',
    cadence: 'per editor per month',
    blurb: 'Private spaces with drift review. This is the plan most product teams land on.',
    rows: ['Unlimited private spaces', 'Drift review queue and source sync', 'OpenAPI import with typed links', 'In-app help embed', 'SAML SSO'],
    cta: 'Start a 30-day trial',
    featured: true,
  },
  {
    name: 'Constellation',
    price: 'Custom',
    cadence: 'annual, for platform orgs',
    blurb: 'Many teams, one navigable atlas, with the boring-but-vital controls attached.',
    rows: ['Cross-space graph and search', 'Audit log and retention policies', 'Self-hosted reader option', 'Dedicated onboarding engineer'],
    cta: 'Talk to us',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="section" data-reveal-group>
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center" data-reveal style={{ '--reveal-order': 0 }}>
          <div className="eyebrow"><i /> Pricing</div>
          <h2 className="section-title mt-5">Priced by <em>editors</em>, never by readers</h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-7 text-mist">
            Readers are free at every tier and always will be. Charging for readers punishes the exact thing
            documentation exists to do.
          </p>
        </div>

        <div className="mt-14 grid items-start gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <article
              key={plan.name}
              className={`plane hover-depth price-plane ${plan.featured ? 'featured' : 'md:stagger-down'}`}
              data-reveal
              style={{ '--reveal-order': index + 1 }}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl">{plan.name}</h3>
                {plan.featured && <span className="mono text-[9px] tracking-[0.18em] text-accent">MOST TEAMS</span>}
              </div>
              <p className="price-value mt-6">{plan.price}</p>
              <p className="mono mt-1 text-[10px] tracking-[0.1em] text-mist">{plan.cadence.toUpperCase()}</p>
              <p className="mt-5 text-sm leading-6 text-mist">{plan.blurb}</p>
              <ul className="mt-5 flex-1 list-none p-0">
                {plan.rows.map((row) => <li key={row} className="plan-row">{row}</li>)}
              </ul>
              <a href="#cta" className={`mt-6 w-full ${plan.featured ? 'button' : 'button button-ghost'}`}>{plan.cta}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
