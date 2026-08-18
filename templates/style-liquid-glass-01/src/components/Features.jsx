// Feature grid: three first-party liquid cards plus one adapted insight card.
//
// Insight card source slug: ruixen-glass-ai-card
// Author repo: https://github.com/ruixenui/ruixen.com
// Adapted: the frosted card with shimmering skeleton lines and a primary action kept;
// motion/react and the click sound removed; lines recolored through the palette vars.
import { Rule, Forecast, Lens, Sparkle } from './Icons.jsx'

const features = [
  {
    icon: Lens,
    title: 'Every account, one lens',
    body: 'Checking, cards, brokerage, and that one savings account you forgot about. Meridian reads them all in one place, and never moves money without a rule you wrote.',
  },
  {
    icon: Rule,
    title: 'Rules, not resolutions',
    body: 'Round up card purchases, sweep 4 percent of payday, cap eating out at $220. Write a rule once and Meridian runs it quietly forever.',
  },
  {
    icon: Forecast,
    title: 'See the month ahead',
    body: 'Rent, subscriptions, and payday are already on the calendar. The forecast line shows your lowest upcoming balance before it surprises you.',
  },
]

const skeletonGroups = [[100], [45, 22, 33], [40, 24], [22, 78]]

function InsightCard() {
  return (
    <article className="liquid p-7">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight">Weekly insight, drafted for you</h3>
        <span className="text-accent" aria-hidden="true"><Sparkle /></span>
      </div>
      <p className="mt-3 text-sm leading-6 text-mist">
        Every Sunday, Meridian writes a short brief about where the week went. This one is still thinking.
      </p>
      <div className="mt-6 space-y-4" aria-hidden="true">
        {skeletonGroups.map((group, gi) => (
          <div key={gi} className="flex items-center gap-1.5">
            {group.map((w, i) => (
              <span
                key={i}
                className="skeleton-bar"
                style={{ flex: `0 0 ${w}%`, animationDelay: `${gi * 0.3}s` }}
              />
            ))}
          </div>
        ))}
      </div>
      <button type="button" className="button button-ghost button-small mt-7">Generate this week&rsquo;s brief</button>
    </article>
  )
}

export default function Features() {
  return (
    <section id="features" className="section pt-0" data-reveal-group>
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center" data-reveal style={{ '--reveal-order': 0 }}>
          <span className="eyebrow">Features</span>
          <h2 className="section-title mt-6 text-balance">
            Built like glass: <span className="serif-accent text-accent">clear, layered, calm</span>
          </h2>
          <p className="mt-5 text-pretty text-base leading-7 text-mist">
            Four ways Meridian turns account noise into decisions you can actually make.
          </p>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {features.map((feature, index) => (
            <article key={feature.title} className="liquid liquid-hover p-7" data-reveal style={{ '--reveal-order': index + 1 }}>
              <span className="ledger-icon" style={{ width: '2.8rem', height: '2.8rem' }}><feature.icon /></span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-mist">{feature.body}</p>
            </article>
          ))}
          <div data-reveal style={{ '--reveal-order': 4 }}><InsightCard /></div>
        </div>
      </div>
    </section>
  )
}
