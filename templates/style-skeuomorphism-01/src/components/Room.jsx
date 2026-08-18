// Practice-room stats. VU meter is first-party; the LED streak meter adapts
// the 8bitcn-progress retro segment logic
// (https://github.com/TheOrcDev/8bitcn-ui).
import { LedMeter } from './Skeuo.jsx'
import { VuMeter } from './Hardware.jsx'

const plates = [
  { label: 'Median session', value: '21 min', note: 'short enough to actually happen' },
  { label: 'Takes archived', value: '38M', note: 'rough, honest, yours' },
  { label: 'Players back next week', value: '84%', note: 'measured, not promised' },
]

export default function Room() {
  return (
    <section id="room" className="section pt-0" data-reveal-group>
      <div className="shell">
        <div className="max-w-2xl" data-reveal style={{ '--reveal-order': 0 }}>
          <p className="eyebrow">Practice room</p>
          <h2 className="section-title mt-4">The needle doesn't flatter you.</h2>
        </div>

        <div className="leather-panel mt-12 rounded-[18px] p-7 sm:p-10" data-reveal style={{ '--reveal-order': 1 }}>
          <span className="stitched" aria-hidden="true" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="mx-auto w-full max-w-90">
              <VuMeter />
              <div className="mt-8">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="engraved text-[0.75rem]">This week's streak</span>
                  <span className="font-display text-lg tracking-[0.1em] text-accent">5 of 7 days</span>
                </div>
                <LedMeter value={71} label="Weekly practice streak: five of seven days" />
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
              {plates.map((plate) => (
                <div key={plate.label} className="metal-panel rounded-[10px] px-6 py-5">
                  <p className="engraved text-[0.7rem]">{plate.label}</p>
                  <p className="mt-1 font-display text-4xl tracking-[0.04em] text-ink">{plate.value}</p>
                  <p className="mt-1 text-xs text-mist">{plate.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
