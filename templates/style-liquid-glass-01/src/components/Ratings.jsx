// First-party social proof strip: store ratings and press mentions in liquid panels.
import { Star } from './Icons.jsx'

const items = [
  { title: '4.9', sub: 'App Store · 21,400 ratings', stars: true },
  { title: 'App of the Day', sub: 'Featured in 12 countries', stars: false },
  { title: '$310M', sub: 'Saved by rules in 2026 so far', stars: false },
  { title: '4.8', sub: 'Google Play · 13,900 ratings', stars: true },
]

export default function Ratings() {
  return (
    <section className="section pt-0" data-reveal-group aria-label="Ratings and recognition">
      <div className="shell grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <div key={item.sub} className="liquid-deep px-6 py-5 text-center" data-reveal style={{ '--reveal-order': index }}>
            <p className="text-2xl font-semibold tracking-tight">{item.title}</p>
            {item.stars && (
              <p className="mt-1 flex items-center justify-center gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="star" />)}
              </p>
            )}
            <p className="mt-1.5 text-xs font-medium text-mist">{item.sub}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
