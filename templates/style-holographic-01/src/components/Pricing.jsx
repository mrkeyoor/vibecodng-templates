// First-party section. Standard tiers sit on the foil ring border; the
// featured tier sits directly on the foil surface with ink-dark text.

const tiers = [
  {
    name: 'Sketch',
    price: '$0',
    cadence: 'forever',
    blurb: 'Build the whole portfolio before you pay anything.',
    perks: ['flux.gallery/you subdomain', '3 projects, 60 images', 'All layout systems', 'Community gallery listing'],
    cta: 'Start building',
    featured: false,
  },
  {
    name: 'Foil',
    price: '$9',
    cadence: 'per month, billed yearly',
    blurb: 'The full finish, on your own domain.',
    perks: ['Custom domain, no Flux badge', 'Unlimited projects and images', 'Client rooms with passcodes', 'Per-project analytics', 'Priority image pipeline'],
    cta: 'Go Foil',
    featured: true,
  },
  {
    name: 'Studio',
    price: '$29',
    cadence: 'per month, up to 8 members',
    blurb: 'One roster page, every artist under it.',
    perks: ['Everything in Foil', 'Shared roster and tags', 'Role-based editing', 'Invoice-friendly billing'],
    cta: 'Gather the studio',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="section pt-0" data-reveal-group>
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center" data-reveal style={{ '--reveal-order': 0 }}>
          <p className="eyebrow justify-center">Pricing</p>
          <h2 className="section-title mt-4 text-white">
            Free to build, <span className="holo-text">nine dollars to shine</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {tiers.map(({ name, price, cadence, blurb, perks, cta, featured }, index) => (
            featured ? (
              <article key={name} className="price-card holo-surface holo-shimmer" style={{ '--holo-angle': '224deg' }} data-reveal>
                <header className="flex items-baseline justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-[0.14em]" style={{ color: '#14101C' }}>{name}</h3>
                  <span className="text-[0.62rem] font-bold uppercase tracking-[0.14em]" style={{ color: '#14101C' }}>most picked</span>
                </header>
                <p className="price-value mt-6 mb-0" style={{ color: '#14101C' }}>{price}</p>
                <p className="mt-1 text-xs" style={{ color: 'rgb(20 16 28 / 75%)' }}>{cadence}</p>
                <p className="mt-4 text-sm leading-6 font-medium" style={{ color: 'rgb(20 16 28 / 85%)' }}>{blurb}</p>
                <ul className="mt-6 mb-8 space-y-3 p-0" style={{ listStyle: 'none' }}>
                  {perks.map((perk) => (
                    <li key={perk} className="perk-row" style={{ color: 'rgb(20 16 28 / 85%)' }}>{perk}</li>
                  ))}
                </ul>
                <a href="#cta" className="button" style={{ marginTop: 'auto', background: '#14101C', color: 'var(--bw-text)' }}>{cta}</a>
              </article>
            ) : (
              <article key={name} className="price-card holo-border" data-reveal style={{ '--reveal-order': index + 1 }}>
                <header className="flex items-baseline justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">{name}</h3>
                </header>
                <p className="price-value mt-6 mb-0">{price}</p>
                <p className="mt-1 text-xs text-mist">{cadence}</p>
                <p className="mt-4 text-sm leading-6 text-mist">{blurb}</p>
                <ul className="mt-6 mb-8 space-y-3 p-0" style={{ listStyle: 'none' }}>
                  {perks.map((perk) => <li key={perk} className="perk-row">{perk}</li>)}
                </ul>
                <a href="#cta" className="button button-ghost" style={{ marginTop: 'auto' }}>{cta}</a>
              </article>
            )
          ))}
        </div>
      </div>
    </section>
  )
}
