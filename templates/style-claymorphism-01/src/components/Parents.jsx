// Quote cards adapted from clay-card with clay-avatar and clay-badge
// (mrkeyoor/sir-originals).
import { ClayAvatar, ClayBadge, ClayCard } from './Clay.jsx'
import { Star } from './Art.jsx'

const quotes = [
  {
    quote: 'My daughter thinks she is gardening. Her teacher thinks she jumped a reading level. Nobody needs to know it was both.',
    name: 'Priya Nair', role: 'Mum of Anaya, 6', initials: 'PN', color: 'peach',
  },
  {
    quote: 'The ten minute cap sold me. It ends the session before the meltdown, and the garden waiting tomorrow does the nagging for me.',
    name: 'Tomas Berg', role: 'Dad of twins, 4', initials: 'TB', color: 'mint',
  },
  {
    quote: 'We use sibling mode at the childminder. Four plots, four moods, zero fights over the tablet. That alone is worth the fee.',
    name: 'Rosa Delgado', role: 'Childminder, Seville', initials: 'RD', color: 'violet',
  },
]

export default function Parents() {
  return (
    <section id="parents" className="section pt-0" data-reveal-group>
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6" data-reveal style={{ '--reveal-order': 0 }}>
          <div className="max-w-xl">
            <p className="eyebrow">For parents</p>
            <h2 className="section-title mt-4">The grown-ups are smiling too.</h2>
          </div>
          <ClayBadge icon={<Star className="h-4 w-4" />} tone="mint">4.9 on family app guides</ClayBadge>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-3">
          {quotes.map((item, index) => (
            <div key={item.name} data-reveal style={{ '--reveal-order': index + 1 }}>
              <ClayCard className="h-full">
                <blockquote className="text-[0.95rem] font-bold leading-7 text-ink">“{item.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-4">
                  <ClayAvatar initials={item.initials} alt={item.name} size="sm" color={item.color} />
                  <span>
                    <span className="block font-display text-sm font-extrabold text-ink">{item.name}</span>
                    <span className="block text-xs font-bold">{item.role}</span>
                  </span>
                </figcaption>
              </ClayCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
