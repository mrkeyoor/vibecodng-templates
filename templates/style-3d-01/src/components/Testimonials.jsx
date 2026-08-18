// Source slug: motion-primitives-tilt (quote cards reuse the pointer tilt utility)
// Author repo: https://github.com/ibelick/motion-primitives
import { useTilt } from './Effects.jsx'

const quotes = [
  {
    quote: 'We stopped budgeting a "fix the marketplace asset" day per prop. Prism kits import at the scale and pivot we expect, first try.',
    name: 'Ilse Vandermeer',
    role: 'Environment lead, Copperfield Interactive',
  },
  {
    quote: 'The silhouette search sounds like a gimmick until you find the exact chair in nine seconds instead of scrolling page fourteen.',
    name: 'Dario Quinteros',
    role: 'Art director, Night Market Studio',
  },
  {
    quote: 'Legal signed off on the license in one read. Anyone who has shipped a game knows that sentence is the whole review.',
    name: 'Maren Holt',
    role: 'Producer, Sixth Floor Games',
  },
]

function QuoteCard({ item, order }) {
  const ref = useTilt(4)
  return (
    <figure className="quote-card tilt" ref={ref} data-reveal style={{ '--reveal-order': order }}>
      <blockquote className="m-0 text-[15px] leading-7 text-white/90">“{item.quote}”</blockquote>
      <figcaption>
        <p className="text-sm font-semibold">{item.name}</p>
        <p className="mono mt-1 text-[10px] tracking-[0.12em] text-mist">{item.role.toUpperCase()}</p>
      </figcaption>
    </figure>
  )
}

export default function Testimonials() {
  return (
    <section className="section border-t border-white/8" data-reveal-group>
      <div className="shell">
        <div className="max-w-2xl" data-reveal style={{ '--reveal-order': 0 }}>
          <div className="eyebrow">From the floor</div>
          <h2 className="section-title mt-4">Teams keep the subscription after the crunch ends</h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {quotes.map((item, index) => <QuoteCard key={item.name} item={item} order={index + 1} />)}
        </div>
      </div>
    </section>
  )
}
