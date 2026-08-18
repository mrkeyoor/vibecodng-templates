// Source slug: tripled-dynamic-spotlight-cta-shadcnui
// Author repo: https://github.com/moumen-soliman/uitripled
// Spotlight CTA whose glow follows the pointer on hover; static centered
// glow otherwise and under reduced motion.

import { usePointerGlow } from './Effects.jsx'

export default function Cta() {
  const ref = usePointerGlow()
  return (
    <section id="cta" className="section" data-reveal-group>
      <div className="shell">
        <div ref={ref} className="cta-panel" data-reveal style={{ '--reveal-order': 0 }}>
          <p className="eyebrow">Two minutes, honestly</p>
          <h2 className="section-title mx-auto mt-6 max-w-2xl text-white">
            Your first supporter is <em className="gradient-text">already waiting</em>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-7 text-mist">
            Pick your link, drop in one thing you have already made, and share
            it once. That is the whole setup.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href="#pricing" className="button">Claim bloom.page/you</a>
            <a href="#features" className="button button-ghost">See how it works</a>
          </div>
          <p className="mt-6 text-xs text-mist">No card. No monthly fee. Export everything, any day.</p>
        </div>
      </div>
    </section>
  )
}
