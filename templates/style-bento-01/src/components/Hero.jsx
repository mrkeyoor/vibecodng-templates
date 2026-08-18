// First-party hero card plus a first-party activity feed card.

import { useId } from 'react'
import { Card } from './Effects.jsx'

function DotField() {
  const id = useId().replaceAll(':', '')
  return (
    <svg className="hero-dots" aria-hidden="true">
      <defs>
        <pattern id={id} width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.2" r="1.2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

const feed = [
  { who: 'Ana', what: 'resolved the pricing thread', when: '2m' },
  { who: 'Marcus', what: 'shipped Launch plan v4 to the team', when: '11m' },
  { who: 'Iris', what: 'turned standup into a decision: ship Tuesday', when: '26m' },
  { who: 'Dev', what: 'linked the API spec inside #launch', when: '1h' },
  { who: 'Sam', what: 'closed 3 stale threads automatically', when: '2h' },
]

export function HeroCard() {
  return (
    <Card span="b8" order={1} id="top" className="flex min-h-[24rem] flex-col justify-between gap-10">
      <DotField />
      <div className="relative">
        <span className="pill">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          Hub 2.0 is out
        </span>
        <h1 className="display mt-6 max-w-[16ch] text-balance">
          Stop working in seventeen tabs.
        </h1>
      </div>
      <div className="relative flex flex-wrap items-end justify-between gap-6">
        <p className="max-w-md text-[0.9375rem] leading-6 text-mist">
          Hub keeps threads, docs, and decisions in one workspace, so the answer
          lives where the conversation happened. Your team already knows how to use it.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="#pricing" className="button">Get Hub free</a>
          <a href="#workspace" className="button button-ink">See the workspace</a>
        </div>
      </div>
    </Card>
  )
}

export function ActivityCard() {
  return (
    <Card span="b4" order={2} className="flex flex-col" aria-label="Live workspace activity">
      <p className="card-label">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
        Happening in your Hub
      </p>
      <div className="mt-4 flex-1">
        {feed.map((item) => (
          <div key={item.what} className="feed-item">
            <span className="feed-dot" aria-hidden="true" />
            <p className="m-0">
              <strong className="font-semibold">{item.who}</strong>{' '}
              <span className="text-mist">{item.what}</span>
            </p>
            <span className="mono ml-auto flex-none text-[10px] text-mist">{item.when}</span>
          </div>
        ))}
      </div>
      <p className="mono mt-3 border-t border-edge pt-3 text-[10px] tracking-[0.12em] text-mist">
        NOTHING HERE NEEDS A MEETING
      </p>
    </Card>
  )
}
