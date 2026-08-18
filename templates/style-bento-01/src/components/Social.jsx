import { Card } from './Effects.jsx'

// StatsCard: first-party.
export function StatsCard() {
  const stats = [
    { value: '3.1h', label: 'given back per person, per week' },
    { value: '41%', label: 'fewer standing meetings after a quarter' },
    { value: '1', label: 'place to look for any decision' },
  ]
  return (
    <Card span="b6" tone="card-ink" order={0} className="flex flex-col justify-between gap-8">
      <p className="card-label">What teams get back</p>
      <div className="grid gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="big-stat m-0 text-white">{stat.value}</p>
            <p className="m-0 mt-2 text-[0.8125rem] leading-5 opacity-70">{stat.label}</p>
          </div>
        ))}
      </div>
      <p className="mono m-0 text-[10px] tracking-[0.12em] opacity-60">
        MEDIANS ACROSS TEAMS OF 8 TO 40, FIRST 90 DAYS ON HUB
      </p>
    </Card>
  )
}

// Derived from index slug: magicui-client-tweet-card
// Author repo: https://github.com/magicuidesign/magicui
// Keeps the source's social-post layout (avatar, name and handle, short
// body, platform mark top right); rendered statically with a first-party
// SVG avatar instead of fetching a live post at runtime.
export function TestimonialCard() {
  return (
    <Card as="figure" span="b6" order={1} className="m-0 flex flex-col justify-between gap-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <svg className="post-avatar" viewBox="0 0 44 44" role="img" aria-label="Priya Shah">
            <circle cx="22" cy="22" r="22" fill="var(--bw-accent)" />
            <circle cx="22" cy="17" r="7" fill="white" opacity=".9" />
            <path d="M8 40a14 14 0 0 1 28 0" fill="white" opacity=".9" />
          </svg>
          <figcaption>
            <p className="m-0 text-sm font-bold">Priya Shah</p>
            <p className="m-0 text-xs text-mist">Head of Product, Fern Robotics</p>
          </figcaption>
        </div>
        <svg width="18" height="18" viewBox="0 0 20 20" fill="var(--bw-muted)" aria-hidden="true">
          <path d="M3 3h4.6l3.6 5.1L15.8 3H18l-5.8 6.7L18.5 17h-4.6l-3.9-5.5L5.2 17H3l6.2-7.2L3 3z" />
        </svg>
      </div>
      <blockquote className="m-0">
        <p className="m-0 text-lg font-medium leading-7 tracking-tight">
          We deleted four tools the month we moved to Hub. The surprising part was the silence:
          nobody asked where anything went, because everything was already in the thread.
        </p>
      </blockquote>
      <p className="mono m-0 text-[10px] tracking-[0.12em] text-mist">POSTED 14 MAR · 2,140 REPOSTS</p>
    </Card>
  )
}
