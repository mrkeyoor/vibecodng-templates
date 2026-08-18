// Cards adapted from neu-card (mrkeyoor/sir-originals); habit list uses
// neu-checkbox; the search demo uses neu-search-input.
import { NeuCard, NeuCheckbox, NeuSearchInput } from './Neu.jsx'

// First-party inline SVG sparkline, inherits palette variables.
function HrvWave() {
  return (
    <svg viewBox="0 0 320 64" className="mt-4 w-full" role="img" aria-label="Heart rate variability trending upward over two weeks">
      <path
        className="wave-path"
        d="M4 42 C24 40 32 50 52 46 S84 24 104 30 S140 46 160 38 S196 18 216 24 S252 34 272 26 S304 14 316 16"
        fill="none" stroke="var(--bw-accent)" strokeWidth="2.5" strokeLinecap="round"
      />
      <g fill="var(--bw-accent)">
        <circle cx="104" cy="30" r="3.5" />
        <circle cx="216" cy="24" r="3.5" />
        <circle cx="316" cy="16" r="3.5" />
      </g>
    </svg>
  )
}

// First-party inline SVG, stacked sleep-phase bars.
function SleepBars() {
  const nights = [
    [16, 22, 10], [20, 18, 12], [12, 26, 8], [22, 20, 14], [18, 24, 10], [24, 18, 12], [20, 26, 12],
  ]
  return (
    <svg viewBox="0 0 320 72" className="mt-4 w-full" role="img" aria-label="Seven nights of sleep, split into deep, core, and REM phases">
      {nights.map((phases, night) => {
        const x = 14 + night * 44
        let y = 64
        return phases.map((height, phase) => {
          y -= height
          return <rect key={`${night}-${phase}`} x={x} y={y} width="26" height={height - 2} rx="4" fill="var(--bw-accent)" opacity={[1, 0.55, 0.3][phase]} />
        })
      })}
    </svg>
  )
}

export default function Features() {
  return (
    <section id="features" className="section" data-reveal-group>
      <div className="shell">
        <div className="max-w-2xl" data-reveal style={{ '--reveal-order': 0 }}>
          <p className="eyebrow">What Pulse watches</p>
          <h2 className="section-title mt-4">Soft on your eyes. Strict about the signal.</h2>
          <p className="mt-5 text-base font-medium leading-7 text-mist">
            Every card below is a real Pulse surface. The same quiet materials carry your data all day, so checking in feels like pressing a button, not reading a lab report.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <div data-reveal style={{ '--reveal-order': 1 }}>
            <NeuCard eyebrow="Recovery" title="HRV without the homework">
              Pulse reads overnight heart rate variability and folds it into your morning score. You see the trend, not forty acronyms.
              <HrvWave />
            </NeuCard>
          </div>
          <div data-reveal style={{ '--reveal-order': 2 }}>
            <NeuCard eyebrow="Sleep" title="Phases, minus the guilt">
              Deep, core, and REM are tracked nightly and rated against your own baseline. A short night lowers tomorrow's target instead of scolding you.
              <SleepBars />
            </NeuCard>
          </div>
          <div data-reveal style={{ '--reveal-order': 3 }}>
            <NeuCard eyebrow="Habits" title="Three taps, not thirty">
              Pick a few anchors and tick them off with one thumb. Anything left unchecked simply rolls forward.
              <div className="mt-5 flex flex-col gap-4">
                <NeuCheckbox label="10 minute walk after lunch" defaultChecked />
                <NeuCheckbox label="Lights out by 23:00" defaultChecked />
                <NeuCheckbox label="Breathing session before bed" />
              </div>
            </NeuCard>
          </div>
          <div data-reveal style={{ '--reveal-order': 4 }}>
            <NeuCard eyebrow="History" title="Ask your body anything">
              Every reading is searchable. Type a race day, a rough week, or a holiday and see what your body was doing.
              <div className="mt-5">
                <NeuSearchInput placeholder="marathon week, April" buttonLabel="Find" />
              </div>
            </NeuCard>
          </div>
        </div>
      </div>
    </section>
  )
}
