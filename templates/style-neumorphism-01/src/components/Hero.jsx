// First-party layout composed from adapted sir-originals primitives.
// Source slugs in use: neu-badge, neu-button, neu-toggle, neu-slider, neu-progress.
import { useState } from 'react'
import { NeuBadge, NeuButton, NeuProgress, NeuSlider, NeuToggle } from './Neu.jsx'

// First-party inline SVG. Three concentric activity rings; arc sweep runs once
// on reveal and inherits the palette variables.
function ScoreRings() {
  const rings = [
    { r: 84, pct: 0.81, width: 13, opacity: 1 },
    { r: 64, pct: 0.66, width: 13, opacity: 0.62 },
    { r: 44, pct: 0.9, width: 13, opacity: 0.34 },
  ]
  return (
    <svg viewBox="0 0 200 200" className="ring-dial mx-auto w-full max-w-55" role="img" aria-label="Today's readiness rings: recovery 81 percent, sleep 66 percent, calm 90 percent">
      {rings.map(({ r, pct, width, opacity }) => {
        const c = 2 * Math.PI * r
        return (
          <g key={r}>
            <circle cx="100" cy="100" r={r} fill="none" stroke="color-mix(in srgb, var(--bw-text) 9%, transparent)" strokeWidth={width} />
            <circle
              cx="100" cy="100" r={r} fill="none"
              className="ring-arc"
              stroke="var(--bw-accent)" strokeOpacity={opacity} strokeWidth={width} strokeLinecap="round"
              strokeDasharray={c}
              style={{ '--arc-full': c, '--arc-rest': c * (1 - pct) }}
              transform="rotate(-90 100 100)"
            />
          </g>
        )
      })}
      <text x="100" y="95" textAnchor="middle" fill="var(--bw-text)" fontSize="34" fontWeight="800" fontFamily="inherit">81</text>
      <text x="100" y="118" textAnchor="middle" fill="var(--bw-muted)" fontSize="11" fontWeight="700" letterSpacing="2" fontFamily="inherit">READY</text>
    </svg>
  )
}

export default function Hero() {
  const [focus, setFocus] = useState(45)

  return (
    <section id="top" className="pt-32 sm:pt-40" data-reveal-group>
      <div className="shell grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div data-reveal style={{ '--reveal-order': 0 }}>
          <NeuBadge>Now on iOS and Android</NeuBadge>
          <h1 className="display mt-7 text-balance">
            Recovery you can <span className="text-accent">feel</span>, not just chart.
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base font-medium leading-7 text-mist sm:text-lg sm:leading-8">
            Pulse listens to your heart rate, sleep, and breath, then hands you one calm number each morning. No streak guilt, no red alerts, just a quiet answer to the question: how hard should today be?
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <NeuButton className="text-accent">Start your first week free</NeuButton>
            <NeuButton as="a" href="#features">See how the score works</NeuButton>
          </div>
          <p className="mt-5 text-xs font-semibold text-mist">Works with the sensors already on your wrist. No new hardware.</p>
        </div>

        <div className="neu-raised-lg rounded-[32px] bg-surface p-7 sm:p-9" data-reveal style={{ '--reveal-order': 1 }}>
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-mist">This morning</p>
            <NeuBadge dot={false}>Tue 06:40</NeuBadge>
          </div>
          <div className="mt-6"><ScoreRings /></div>
          <div className="mt-8 space-y-6">
            <NeuProgress label="Sleep debt repaid" value={66} />
            <NeuSlider label="Today's training load" value={focus} onChange={(event) => setFocus(Number(event.target.value))} />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <NeuToggle label="Quiet mornings" defaultChecked />
              <span className="text-xs font-semibold text-mist">Alerts wait until you wake</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
