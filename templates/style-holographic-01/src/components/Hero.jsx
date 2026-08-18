// First-party section. The headline uses the foil text ink; the panel is the
// signature thin-film interference shader (lazy WebGL2 chunk) with an inline
// SVG "portfolio spread" inked on top. Without WebGL2 the CSS conic foil +
// pointer tilt beneath is the fallback, unchanged from v1.

import { lazy, Suspense, useEffect, useState } from 'react'
import { useHoloTilt } from './Effects.jsx'

const HoloShader = lazy(() => import('./shader/HoloShader.jsx'))

function useWebGL2() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    try {
      const c = document.createElement('canvas')
      const gl = c.getContext('webgl2')
      if (gl) {
        gl.getExtension('WEBGL_lose_context')?.loseContext()
        setOk(true)
      }
    } catch { /* CSS fallback stays */ }
  }, [])
  return ok
}

export default function Hero() {
  const panelRef = useHoloTilt(210, 80)
  const webgl = useWebGL2()

  return (
    <section id="top" className="hero" data-reveal-group>
      <div className="shell relative grid items-center gap-14 pt-36 pb-24 lg:grid-cols-[1fr_1fr] lg:pt-44 lg:pb-32">
        <div className="holo-hover">
          <p className="eyebrow" data-reveal style={{ '--reveal-order': 0 }}>Portfolios for visual work</p>
          <h1 className="display mt-6 text-white" data-reveal style={{ '--reveal-order': 1 }}>
            Work that<br />
            <span className="holo-text">catches the light.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-mist" data-reveal style={{ '--reveal-order': 2 }}>
            Flux turns your projects into a portfolio with real presence:
            fast pages, full-bleed images, and a finish that moves when
            visitors do. Made for designers, 3D artists, and photographers.
          </p>
          <div className="mt-9 flex flex-wrap gap-3" data-reveal style={{ '--reveal-order': 3 }}>
            <a href="#pricing" className="button">Claim flux.gallery/you</a>
            <a href="#work" className="button button-ghost">Browse portfolios</a>
          </div>
          <p className="mt-7 text-xs text-mist" data-reveal style={{ '--reveal-order': 4 }}>
            Free while you build. Paid only when you point a domain at it.
          </p>
        </div>

        <div data-reveal style={{ '--reveal-order': 3 }}>
          <div ref={panelRef} className="holo-surface holo-shimmer hero-panel" aria-hidden="true">
            {webgl && (
              <Suspense fallback={null}>
                <HoloShader />
              </Suspense>
            )}
            <svg viewBox="0 0 560 420" fill="none">
              <g stroke="rgb(20 16 28 / 55%)" strokeWidth="2">
                <rect x="52" y="56" width="250" height="180" rx="10" fill="rgb(20 16 28 / 28%)" />
                <circle cx="132" cy="130" r="34" fill="none" />
                <path d="M84 208 L150 150 L196 190 L252 122" />
                <rect x="330" y="88" width="170" height="118" rx="10" fill="rgb(20 16 28 / 22%)" />
                <path d="M352 178 l36 -42 30 26 42 -48" />
                <rect x="52" y="266" width="140" height="96" rx="10" fill="rgb(20 16 28 / 22%)" />
                <circle cx="122" cy="314" r="24" fill="none" />
                <rect x="222" y="266" width="278" height="96" rx="10" fill="rgb(20 16 28 / 28%)" />
                <path d="M250 338 h120 M250 314 h180 M250 290 h84" strokeLinecap="round" />
              </g>
            </svg>
            <span className="hero-hint">Move your cursor. The foil follows.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
