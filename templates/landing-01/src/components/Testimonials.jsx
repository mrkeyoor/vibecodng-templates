// Source slug: meraki-testimonials-full-page-cards
// Author repo: https://github.com/merakiui/merakiui

const quotes = [
  {
    quote: 'Our delivery review used to begin with twenty minutes of fact-finding. Now we open Boardwatch and spend that time deciding what to unblock.',
    name: 'Mara Chen',
    role: 'VP Engineering, Northstar',
    initials: 'MC',
  },
  {
    quote: 'It catches the quiet kind of drift: a review waiting two days, a dependency with no owner, a release that keeps absorbing “one more” issue.',
    name: 'Elias Romero',
    role: 'Platform Lead, Kestrel',
    initials: 'ER',
  },
  {
    quote: 'The team trusts the numbers because they can trace every signal back to the work. That changed the tone of planning almost immediately.',
    name: 'Priya Nair',
    role: 'Director of Product, Tandem',
    initials: 'PN',
  },
]

export default function Testimonials() {
  return (
    <section className="section border-b border-white/8 bg-panel" aria-labelledby="testimonials-title" data-reveal-group>
      <div className="shell">
        <div data-reveal style={{ '--reveal-order': 0 }}>
          <div className="eyebrow">From the weekly review</div>
          <h2 id="testimonials-title" className="section-title mt-6 max-w-3xl">Clearer conversations start with shared facts.</h2>
        </div>
        <div className="mt-12 grid gap-px bg-white/10 lg:grid-cols-3">
          {quotes.map((item, index) => (
            <figure key={item.name} className="quote-card" data-reveal style={{ '--reveal-order': index + 1 }}>
              <span className="mono text-xs text-accent">0{index + 1}</span>
              <blockquote className="mt-8 text-lg leading-8 tracking-[-0.015em] text-white/90">“{item.quote}”</blockquote>
              <figcaption className="mt-10 flex items-center gap-3 border-t border-white/10 pt-6">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-[11px] font-bold text-black">{item.initials}</span>
                <span><strong className="block text-sm font-medium">{item.name}</strong><span className="mt-1 block text-xs text-mist">{item.role}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
