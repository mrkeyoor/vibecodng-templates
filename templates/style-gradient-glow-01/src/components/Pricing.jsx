// Source slugs: magicui-shine-border, magicui-neon-gradient-card, magicui-shiny-button
// Author repo: https://github.com/magicuidesign/magicui
// Outer tiers use the static shine border; the featured tier gets the neon
// gradient halo. Buttons carry the hover-only shine pass. Tier structure and
// copy are first-party.

const tiers = [
  {
    name: 'Seedling',
    price: '0%',
    cadence: 'platform fee until $1k lifetime',
    blurb: 'Everything you need to sell your first thing tonight.',
    perks: ['One link, unlimited products', 'Tips and single sales', 'Payouts in 48 hours', 'Community support'],
    cta: 'Claim your link',
    featured: false,
  },
  {
    name: 'Bloom',
    price: '8%',
    cadence: 'flat, per sale. Nothing monthly.',
    blurb: 'The whole platform. You keep 92%, forever.',
    perks: ['Memberships with tiers', 'Taxes filed for you, worldwide', 'Automatic thank-you flows', 'Email your members, no cap', 'Full data export, any day'],
    cta: 'Start earning',
    featured: true,
  },
  {
    name: 'Garden',
    price: '6%',
    cadence: 'per sale, above $10k monthly',
    blurb: 'For studios and teams running several storefronts.',
    perks: ['Everything in Bloom', 'Team seats and roles', 'Priority payouts, same day', 'A human on your account'],
    cta: 'Talk to us',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="section" data-reveal-group>
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center" data-reveal style={{ '--reveal-order': 0 }}>
          <p className="eyebrow">Pricing</p>
          <h2 className="section-title mt-5 text-white">
            Free until it works, <em className="gradient-text">cheap after</em>
          </h2>
          <p className="mt-4 text-base leading-7 text-mist">
            No subscription. Bloom earns a slice only when you make a sale.
          </p>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {tiers.map(({ name, price, cadence, blurb, perks, cta, featured }, index) => (
            <article
              key={name}
              className={`price-card ${featured ? 'neon-card' : 'shine-border'}`}
              data-reveal
              style={{ '--reveal-order': index + 1 }}
            >
              <header className="flex items-baseline justify-between">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">{name}</h3>
                {featured && <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-accent">most loved</span>}
              </header>
              <p className="price-value mt-6 mb-0">{price}</p>
              <p className="mt-1 text-xs text-mist">{cadence}</p>
              <p className="mt-4 text-sm leading-6 text-mist">{blurb}</p>
              <ul className="mt-6 mb-8 space-y-3 p-0" style={{ listStyle: 'none' }}>
                {perks.map((perk) => (
                  <li key={perk} className="perk-row">
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <path d="M2 7.5 5.5 11 12 3.5" />
                    </svg>
                    {perk}
                  </li>
                ))}
              </ul>
              <a href="#cta" className={`button ${featured ? '' : 'button-ghost'}`} style={{ marginTop: 'auto' }}>{cta}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
