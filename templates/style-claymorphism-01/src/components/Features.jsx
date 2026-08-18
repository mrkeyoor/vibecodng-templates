// Cards adapted from clay-card; the practice slider demo uses clay-slider
// (both mrkeyoor/sir-originals).
import { useState } from 'react'
import { ClayCard, ClaySlider, ClayToggle } from './Clay.jsx'
import { Butterfly, Flower, Sprout, Star } from './Art.jsx'

export default function Features() {
  const [minutes, setMinutes] = useState(10)

  return (
    <section id="play" className="section" data-reveal-group>
      <div className="shell">
        <div className="max-w-2xl" data-reveal style={{ '--reveal-order': 0 }}>
          <p className="eyebrow">How it works</p>
          <h2 className="section-title mt-4">Squishy on the outside. Serious about learning.</h2>
          <p className="mt-5 text-base font-bold leading-7 text-mist">
            The curriculum follows early-years phonics and numeracy milestones. The clay is just how we sneak it past small skeptics.
          </p>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-2">
          <div data-reveal style={{ '--reveal-order': 1 }}>
            <ClayCard eyebrow="Quests" title="Ten minutes, then the garden closes" accent={<Flower className="h-14 w-14" />}>
              Each day brings one small quest: a letter, a number pattern, a kindness task. When it is done, Petalboard says goodnight instead of begging for one more level.
            </ClayCard>
          </div>
          <div data-reveal style={{ '--reveal-order': 2 }}>
            <ClayCard eyebrow="Growing" title="Progress you can water" accent={<Sprout className="h-14 w-14" />}>
              Finished activities become flowers, and flowers become a garden your child can walk through. Skipped days do not kill anything; gardens wait patiently.
            </ClayCard>
          </div>
          <div data-reveal style={{ '--reveal-order': 3 }}>
            <ClayCard eyebrow="Grown-ups" title="A dashboard that speaks parent" accent={<Star className="h-14 w-14" />}>
              See which sounds are sticking and which need another pass, in plain words.
              <div className="mt-6 space-y-5">
                <ClaySlider label="Daily quest length" value={minutes} min={5} max={20} onChange={(event) => setMinutes(Number(event.target.value))} showValue={false} />
                <p className="text-xs font-black">{minutes} minutes a day, chosen by you</p>
                <ClayToggle label="Weekend garden pause" defaultChecked={false} />
              </div>
            </ClayCard>
          </div>
          <div data-reveal style={{ '--reveal-order': 4 }}>
            <ClayCard eyebrow="Together" title="Two small hands, one screen" accent={<Butterfly className="h-14 w-14" />}>
              Sibling mode splits the garden into plots so nobody waters over anyone else's marigolds. Up to four children per family plan, each with their own pace.
            </ClayCard>
          </div>
        </div>
      </div>
    </section>
  )
}
