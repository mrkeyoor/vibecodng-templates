// Source slug: tripled-glassmorphism-testimonials-block-shadcnui
// Author repo: https://github.com/moumen-soliman/uitripled
// Adapted: three frosted quote cards with author footer kept; star row replaced with a
// monospace role tag, initial-ring avatars are first-party; copy rewritten for Vantage.
const quotes = [
  {
    quote: 'We killed eleven Looker dashboards in the first month. The support team reads the same funnel we do now, which has never once been true before.',
    name: 'Priya Raman',
    role: 'Head of Product, Helioship',
    initials: 'PR',
  },
  {
    quote: 'The EU cohort alert caught a checkout regression on a Friday night. We shipped the fix before most of the team even knew there was a dip.',
    name: 'Jonas Beckert',
    role: 'Growth Engineer, Duskbyte',
    initials: 'JB',
  },
  {
    quote: 'I stopped exporting CSVs for the board deck. I screenshot Vantage and nobody has asked a follow-up data question in two quarters.',
    name: 'Amaia Ferrer',
    role: 'Cofounder, Fernwald',
    initials: 'AF',
  },
]

export default function Testimonials() {
  return (
    <section id="voices" className="section pt-0" data-reveal-group>
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center" data-reveal style={{ '--reveal-order': 0 }}>
          <span className="eyebrow">Customers</span>
          <h2 className="section-title mt-6 text-balance">Read by people who used to dread dashboards</h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {quotes.map((item, index) => (
            <figure key={item.name} className="glass glass-hover quote-card" data-reveal style={{ '--reveal-order': index + 1 }}>
              <blockquote className="text-sm leading-7 text-white/88">&ldquo;{item.quote}&rdquo;</blockquote>
              <figcaption className="mt-auto flex items-center gap-3 border-t border-white/8 pt-5">
                <span className="avatar-ring" aria-hidden="true">{item.initials}</span>
                <span>
                  <span className="block text-sm font-semibold">{item.name}</span>
                  <span className="mono mt-0.5 block text-[10px] uppercase tracking-[0.12em] text-mist">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
