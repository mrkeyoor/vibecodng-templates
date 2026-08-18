// Derived from index slug: magicui-avatar-circles
// Author repo: https://github.com/magicuidesign/magicui
// Keeps the source's overlapping circle row with a "+N" terminal circle;
// photo avatars are replaced with first-party SVG initial marks that
// inherit the theme variables.

import { Card } from './Effects.jsx'

const people = [
  { initials: 'AK', tint: 'var(--bw-accent)' },
  { initials: 'MO', tint: 'color-mix(in srgb, var(--bw-accent) 65%, black)' },
  { initials: 'IV', tint: 'color-mix(in srgb, var(--bw-text) 85%, var(--bw-accent))' },
  { initials: 'DR', tint: 'color-mix(in srgb, var(--bw-accent) 55%, var(--bw-text))' },
  { initials: 'SL', tint: 'var(--bw-text)' },
]

function Avatar({ initials, tint }) {
  return (
    <svg viewBox="0 0 40 40" role="img" aria-label={`Teammate ${initials}`}>
      <circle cx="20" cy="20" r="20" fill={tint} />
      <text x="20" y="25" textAnchor="middle" fontSize="13" fontWeight="700" fill="white" fontFamily="inherit">{initials}</text>
    </svg>
  )
}

export default function PresenceCard() {
  return (
    <Card span="b4" order={1} id="teams" className="flex flex-col gap-5">
      <p className="card-label">In the workspace now</p>
      <div className="avatar-row" aria-label="24 teammates online">
        {people.map((person) => <Avatar key={person.initials} {...person} />)}
        <span className="avatar-more">+19</span>
      </div>
      <p className="big-stat">24 <span className="text-lg font-semibold text-mist">of 31 online</span></p>
      <p className="m-0 text-sm leading-6 text-mist">
        Presence without surveillance. See who is around, never how many minutes they moved a mouse.
      </p>
    </Card>
  )
}
