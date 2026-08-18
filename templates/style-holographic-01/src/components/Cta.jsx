// First-party section. The closing panel is the pointer-tilted foil surface
// with ink-dark type, mirroring the hero panel so the page ends where it began.

import { useHoloTilt } from './Effects.jsx'

export default function Cta() {
  const ref = useHoloTilt(230, 70)

  return (
    <section id="cta" className="section pt-0" data-reveal-group>
      <div className="shell">
        <div ref={ref} className="holo-surface holo-shimmer cta-panel" data-reveal style={{ '--reveal-order': 0 }}>
          <h2 className="section-title mx-auto max-w-2xl" style={{ color: '#14101C' }}>
            The work is done.<br />Give it a finish.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-7 font-medium" style={{ color: 'rgb(20 16 28 / 78%)' }}>
            Import a folder of images, pick a layout, and your portfolio is
            live tonight. The foil is optional. The speed is not.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href="#pricing" className="button" style={{ background: '#14101C', color: 'var(--bw-text)' }}>Claim flux.gallery/you</a>
            <a href="#work" className="button" style={{ background: 'rgb(20 16 28 / 12%)', color: '#14101C', border: '1px solid rgb(20 16 28 / 45%)' }}>See the wall again</a>
          </div>
        </div>
      </div>
    </section>
  )
}
