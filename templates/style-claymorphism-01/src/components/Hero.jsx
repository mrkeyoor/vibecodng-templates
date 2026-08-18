// First-party layout composed from adapted sir-originals primitives.
// Source slugs in use: clay-badge, clay-button, clay-progress, clay-checkbox,
// clay-avatar.
import { ClayAvatar, ClayBadge, ClayButton, ClayCheckbox, ClayProgress } from './Clay.jsx'
import { Butterfly, GardenRow, Sprout, Star } from './Art.jsx'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 sm:pt-44" data-reveal-group>
      <Butterfly className="float-slow absolute right-[6%] top-32 hidden h-16 w-16 lg:block" />
      <Star className="float-slower absolute left-[4%] top-64 hidden h-10 w-10 opacity-70 lg:block" />
      <div className="shell grid items-center gap-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
        <div data-reveal style={{ '--reveal-order': 0 }}>
          <ClayBadge icon={<Sprout className="h-4 w-4" />}>Ages 3 to 8 · No ads, ever</ClayBadge>
          <h1 className="display mt-6 text-balance">
            Every lesson finished, a flower <span className="text-accent">grows</span>.
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base font-bold leading-7 text-mist sm:text-lg sm:leading-8">
            Petalboard turns letters, numbers, and little life skills into ten minute garden quests. Kids water their garden by learning; parents watch it bloom from the kitchen.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ClayButton>Plant your first seed</ClayButton>
            <ClayButton tone="mint" as="a" href="#play">Peek inside first</ClayButton>
          </div>
          <p className="mt-5 text-sm font-bold text-mist">Free for 30 days. Grown-up gate on every purchase.</p>
        </div>

        <div className="clay-panel clay-wobble rounded-[44px] p-7 sm:p-9" data-reveal style={{ '--reveal-order': 1 }}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <ClayAvatar initials="M" alt="Miri, age five" size="sm" />
              <div>
                <p className="font-display text-base font-extrabold leading-tight">Miri's garden</p>
                <p className="text-xs font-bold text-mist">Tuesday quest · 10 min</p>
              </div>
            </div>
            <ClayBadge icon={<Star className="h-4 w-4" />} tone="mint">Day 12</ClayBadge>
          </div>
          <div className="mt-6"><GardenRow className="w-full" /></div>
          <div className="mt-6"><ClayProgress label="Today's quest" value={66} /></div>
          <div className="mt-6 flex flex-col gap-4">
            <ClayCheckbox label="Trace the letter B" defaultChecked />
            <ClayCheckbox label="Count the ladybugs to 12" defaultChecked />
            <ClayCheckbox label="Water the sunflower (story time)" />
          </div>
        </div>
      </div>
    </section>
  )
}
