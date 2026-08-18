// Features as a pedalboard. Pedal enclosures are first-party; the keyboard
// caps in the shortcuts strip adapt 8bitcn-kbd
// (https://github.com/TheOrcDev/8bitcn-ui).
import { Knob } from './Hardware.jsx'
import { Kbd, KbdGroup } from './Skeuo.jsx'

const pedals = [
  {
    name: 'Click', role: 'Metronome',
    body: 'Tap a tempo or dial one in. Subdivisions, accents, and a count-in that waits for you to pick the guitar back up.',
    knob: 58,
  },
  {
    name: 'Pitch', role: 'Tuner',
    body: 'A strobe-steady chromatic tuner that hears you over the fan, the fridge, and the neighbor practicing worse than you.',
    knob: -20,
  },
  {
    name: 'Reel', role: 'Looper log',
    body: 'Every session records a rough take automatically. Hear yourself from three weeks ago and stop doubting the progress.',
    knob: 35,
  },
  {
    name: 'Coach', role: 'Drill deck',
    body: 'Short drills matched to what you fumbled yesterday. The deck reshuffles itself; you just press the pedal.',
    knob: 80,
  },
]

export default function Pedals() {
  return (
    <section id="rig" className="section" data-reveal-group>
      <div className="shell">
        <div className="max-w-2xl" data-reveal style={{ '--reveal-order': 0 }}>
          <p className="eyebrow">The rig</p>
          <h2 className="section-title mt-4">Four pedals. No menu diving.</h2>
          <p className="mt-5 text-base leading-7 text-mist">
            Everything in Deck is a box with one job, laid out on the board the way you would wire it yourself.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pedals.map((pedal, index) => (
            <div key={pedal.name} className="metal-panel relative rounded-[12px] p-6 pt-7" data-reveal style={{ '--reveal-order': index + 1 }}>
              <span className="metal-screw left-2 top-2" aria-hidden="true" />
              <span className="metal-screw right-2 top-2" aria-hidden="true" />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-3xl tracking-[0.06em] text-ink">{pedal.name}</h3>
                  <p className="engraved mt-1 text-[0.7rem]">{pedal.role}</p>
                </div>
                <Knob label="" angle={pedal.knob} size="sm" />
              </div>
              <p className="mt-4 text-sm leading-6 text-mist">{pedal.body}</p>
              <div className="mt-5 flex items-center gap-2">
                <span className="led" aria-hidden="true" />
                <span className="engraved text-[0.65rem]">True bypass</span>
              </div>
            </div>
          ))}
        </div>

        <div className="leather-panel mt-10 flex flex-wrap items-center justify-between gap-4 rounded-[14px] px-6 py-5" data-reveal style={{ '--reveal-order': 5 }}>
          <p className="engraved text-[0.75rem]">Desk shortcuts</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-mist">
            <span className="flex items-center gap-2"><KbdGroup><Kbd>Space</Kbd></KbdGroup> start and stop the click</span>
            <span className="flex items-center gap-2"><KbdGroup><Kbd>T</Kbd></KbdGroup> tap tempo</span>
            <span className="flex items-center gap-2"><KbdGroup><Kbd>R</Kbd></KbdGroup> drop a take marker</span>
          </div>
        </div>
      </div>
    </section>
  )
}
