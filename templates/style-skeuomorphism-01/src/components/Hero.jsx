// Hero. Device frame is the adapted magicui-iphone
// (https://github.com/magicuidesign/magicui); the Deck screen inside it is
// first-party, live markup. Faceplate knobs and switches are first-party.
import { IphoneFrame } from './Skeuo.jsx'
import { AmpSwitch, Knob } from './Hardware.jsx'

function DeckScreen() {
  return (
    <div className="flex h-full flex-col bg-surface p-[7%] text-ink">
      <div className="flex items-center justify-between pt-[9%]">
        <span className="font-display text-[0.8em] tracking-[0.2em] text-mist">TUE · SESSION 4</span>
        <span className="led" aria-hidden="true" />
      </div>
      <div className="metal-panel mt-[6%] rounded-[10px] p-[6%] text-center">
        <p className="engraved text-[0.65em]">Tuner</p>
        <p className="font-display text-[3.2em] leading-none text-accent" aria-hidden="true">A</p>
        <p className="text-[0.7em] text-mist">440.0 Hz · on pitch</p>
        <div className="mx-auto mt-[4%] flex w-4/5 items-center justify-between" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5, 6].map((mark) => (
            <span key={mark} className={`h-[0.55em] w-[3px] rounded ${mark === 3 ? 'bg-accent shadow-[0_0_6px_var(--bw-accent)]' : 'bg-ink/25'}`} />
          ))}
        </div>
      </div>
      <div className="mt-[6%] flex items-center justify-between rounded-[10px] bg-black/30 p-[5%]">
        <div>
          <p className="engraved text-[0.62em]">Metronome</p>
          <p className="font-display text-[1.6em] leading-tight">92 BPM</p>
        </div>
        <span className="font-display text-[0.75em] tracking-[0.14em] text-mist">6/8</span>
      </div>
      <div className="mt-[6%] space-y-[3%] text-[0.78em]">
        <p className="engraved text-[0.8em]">Tonight</p>
        {['Barre chords, 8 min', 'Riff: Little Wing intro', 'Cool down: open strings'].map((item, index) => (
          <p key={item} className={`rounded-[8px] px-[5%] py-[3.5%] ${index === 0 ? 'bg-accent/15 text-ink' : 'bg-white/5 text-mist'}`}>{item}</p>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="pt-30 sm:pt-36" data-reveal-group>
      <div className="shell grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div data-reveal style={{ '--reveal-order': 0 }}>
          <p className="eyebrow">Metronome · Tuner · Log</p>
          <h1 className="display mt-5 text-balance">
            Practice like it's <span className="text-accent">plugged in</span>.
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-mist sm:text-lg sm:leading-8">
            Deck puts a metronome, a tuner, and an honest practice log behind knobs and switches that behave like the gear on your desk. Twenty focused minutes, then the amp light goes off.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href="#pricing" className="push-button">Start practicing free</a>
            <a href="#rig" className="push-button push-button-ghost">Tour the rig</a>
          </div>

          <div className="metal-panel relative mt-12 max-w-xl rounded-[12px] p-6" aria-label="Deck control panel preview">
            <span className="metal-screw left-2 top-2" aria-hidden="true" />
            <span className="metal-screw right-2 top-2" aria-hidden="true" />
            <span className="metal-screw bottom-2 left-2" aria-hidden="true" />
            <span className="metal-screw bottom-2 right-2" aria-hidden="true" />
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Knob label="Tempo" angle={64} />
              <Knob label="Focus" angle={12} />
              <Knob label="Volume" angle={-38} />
              <div className="flex flex-col gap-3">
                <AmpSwitch label="Drills" defaultOn />
                <AmpSwitch label="Standby" />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-85" data-reveal style={{ '--reveal-order': 1 }}>
          <IphoneFrame>
            <DeckScreen />
          </IphoneFrame>
        </div>
      </div>
    </section>
  )
}
