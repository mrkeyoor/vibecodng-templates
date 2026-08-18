// Stat row adapted from clay-stat-card; quest-library demo adapts
// clay-search-input (both mrkeyoor/sir-originals).
import { ClaySearchInput, ClayStatCard } from './Clay.jsx'
import { Flower, Sprout, Star } from './Art.jsx'

const stats = [
  { label: 'Flowers grown by families', value: '9.4M', change: 'and counting', icon: <Flower className="h-10 w-10" /> },
  { label: 'Average quest streak', value: '11 days', change: 'no guilt attached', icon: <Sprout className="h-10 w-10" /> },
  { label: 'Letter sounds mastered', value: '26 of 26', change: 'the whole alphabet', icon: <Star className="h-10 w-10" /> },
]

export default function Garden() {
  return (
    <section id="garden" className="section pt-0" data-reveal-group>
      <div className="shell">
        <div className="max-w-2xl" data-reveal style={{ '--reveal-order': 0 }}>
          <p className="eyebrow">The garden</p>
          <h2 className="section-title mt-4">Small quests add up to a meadow.</h2>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={stat.label} data-reveal style={{ '--reveal-order': index + 1 }}>
              <ClayStatCard {...stat} className={index === 1 ? 'sm:rotate-1' : 'sm:-rotate-1'} />
            </div>
          ))}
        </div>
        <div className="mx-auto mt-14 max-w-xl" data-reveal style={{ '--reveal-order': 4 }}>
          <p className="mb-4 text-center text-sm font-black text-ink">750 quests in the library. Search by topic, sound, or mood.</p>
          <ClaySearchInput label="Search the quest library" placeholder="dinosaurs, the letter D, rainy day" buttonLabel="Dig in" />
        </div>
      </div>
    </section>
  )
}
