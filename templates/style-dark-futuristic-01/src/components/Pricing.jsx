// Source slug: tailark-dusk-pricing-1
// Author repo: https://github.com/tailark/blocks
// Three-tier structure from the dusk pricing block, moved onto the Blacksite
// square card system with reticle corners on the featured tier.

const tiers = [
  {
    name: 'Recon',
    price: '$0',
    cadence: 'forever',
    blurb: 'One sensor, one subnet. Enough to see what your firewall misses.',
    specs: ['1 sensor, 50k events/sec', 'Standard rule pack, read-only', '24h incident retention', 'Community support'],
    cta: 'Deploy free',
    featured: false,
  },
  {
    name: 'Operator',
    price: '$740',
    cadence: 'per sensor / month',
    blurb: 'The full platform for teams who own their own response.',
    specs: ['Unlimited events per sensor', 'Rules as code with dry-run', '14-day sealed pcap retention', 'On-call routing and paging', 'Baseline anomaly engine'],
    cta: 'Request clearance',
    featured: true,
  },
  {
    name: 'Compound',
    price: 'Custom',
    cadence: 'annual',
    blurb: 'Air-gapped estates, classified networks, bespoke retention.',
    specs: ['Fully offline deployment', 'Signed update bundles', 'Custom retention and HSM sealing', 'Named response engineer'],
    cta: 'Talk to us',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="section border-t border-white/8" data-reveal-group>
      <div className="shell">
        <p className="eyebrow" data-reveal style={{ '--reveal-order': 0 }}>04 / Pricing</p>
        <h2 className="section-title mt-4 max-w-xl text-white" data-reveal style={{ '--reveal-order': 1 }}>
          Priced per sensor, not per byte
        </h2>
        <p className="mt-4 max-w-md text-sm leading-7 text-mist" data-reveal style={{ '--reveal-order': 2 }}>
          Traffic spikes during an attack. Your bill should not.
        </p>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map(({ name, price, cadence, blurb, specs, cta, featured }, index) => (
            <div key={name} className={featured ? 'reticle' : ''} data-reveal style={{ '--reveal-order': index + 3 }}>
              {featured && <><i /><i /><i /><i /></>}
              <article className={`price-card ${featured ? 'price-card-featured' : ''}`}>
                <header className="flex items-baseline justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white">{name}</h3>
                  {featured && <span className="text-[0.6rem] uppercase tracking-[0.18em] text-accent">most deployed</span>}
                </header>
                <p className="price-value mt-6 mb-0">{price}</p>
                <p className="mt-1 text-[0.65rem] uppercase tracking-[0.14em] text-mist">{cadence}</p>
                <p className="mt-4 text-[0.8rem] leading-6 text-mist">{blurb}</p>
                <ul className="mt-6 space-y-2.5 p-0" style={{ listStyle: 'none' }}>
                  {specs.map((spec) => <li key={spec} className="spec-row">{spec}</li>)}
                </ul>
                <a href="#cta" className={`button mt-auto justify-center ${featured ? '' : 'button-ghost'}`} style={{ marginTop: 'auto' }}>
                  {cta}
                </a>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
