// Quote cards adapted from neu-card with neu-avatar and neu-badge
// (mrkeyoor/sir-originals).
import { NeuAvatar, NeuBadge, NeuCard } from './Neu.jsx'

const quotes = [
  {
    quote: 'I stopped arguing with my watch. Pulse says 62, I ride easy, and the strange thing is my race times went up.',
    name: 'Marta Kowalik', role: 'Amateur cyclist, Gdansk', initials: 'MK',
  },
  {
    quote: 'My old tracker buried sleep advice under four menus. Pulse puts one number on my wrist and lets me get on with the day.',
    name: 'Devon Reyes', role: 'ER nurse, night shifts', initials: 'DR',
  },
  {
    quote: 'We rolled Team out to eleven rowers. The coach dashboard flags who needs rest before anyone has to admit it out loud.',
    name: 'Ines Fontaine', role: 'Rowing club coach, Lyon', initials: 'IF',
  },
]

export default function Testimonials() {
  return (
    <section id="stories" className="section pt-0" data-reveal-group>
      <div className="shell">
        <hr className="neu-line mb-16" />
        <div className="flex flex-wrap items-end justify-between gap-6" data-reveal style={{ '--reveal-order': 0 }}>
          <div className="max-w-xl">
            <p className="eyebrow">Stories</p>
            <h2 className="section-title mt-4">People who wake up differently now.</h2>
          </div>
          <NeuBadge>4.8 average on both stores</NeuBadge>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {quotes.map((item, index) => (
            <div key={item.name} data-reveal style={{ '--reveal-order': index + 1 }}>
              <NeuCard className="h-full">
                <blockquote className="text-[0.95rem] leading-7">“{item.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-4">
                  <NeuAvatar initials={item.initials} alt={item.name} size="sm" />
                  <span>
                    <span className="block text-sm font-extrabold text-ink">{item.name}</span>
                    <span className="block text-xs font-semibold">{item.role}</span>
                  </span>
                </figcaption>
              </NeuCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
