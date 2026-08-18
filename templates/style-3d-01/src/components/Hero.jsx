// Source slugs: motion-primitives-tilt (stage rig tilt), fancy-parallax-floating (pointer parallax layers)
// Author repos: https://github.com/ibelick/motion-primitives, https://github.com/danielpetho/fancy
// Both rebuilt on CSS custom properties + pointer events.
// Signature hero: the viewport now hosts a real three.js scene via
// @react-three/fiber (PrismScene.jsx), lazy-loaded as its own chunk. The CSS
// cube below stays as the Suspense fallback and the no-WebGL fallback.
import { Suspense, lazy, useEffect, useRef, useState } from 'react'

const PrismScene = lazy(() => import('./PrismScene.jsx'))

function webglAvailable() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function Cube({ size = '6rem', className = '' }) {
  return (
    <span className={`cube-scene block ${className}`} aria-hidden="true">
      <span className="cube block" style={{ '--size': size }}>
        <i /><i /><i /><i /><i /><i />
      </span>
    </span>
  )
}

function WireSphere({ className = '' }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g fill="none" stroke="var(--bw-accent)" strokeOpacity="0.6" strokeWidth="1">
        <circle cx="60" cy="60" r="52" />
        <ellipse cx="60" cy="60" rx="52" ry="20" />
        <ellipse cx="60" cy="60" rx="52" ry="38" />
        <ellipse cx="60" cy="60" rx="20" ry="52" />
        <ellipse cx="60" cy="60" rx="38" ry="52" />
      </g>
      <circle cx="60" cy="8" r="2.5" fill="var(--bw-accent)" />
    </svg>
  )
}

function Torus({ className = '' }) {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden="true">
      <g fill="none" strokeWidth="1">
        <ellipse cx="60" cy="30" rx="54" ry="22" stroke="#7c9bff" strokeOpacity="0.7" />
        <ellipse cx="60" cy="30" rx="40" ry="14" stroke="#7c9bff" strokeOpacity="0.5" />
        <path d="M6 30q27 -14 54 -14t54 14" stroke="#7c9bff" strokeOpacity="0.35" />
        <path d="M6 30q27 14 54 14t54 -14" stroke="#7c9bff" strokeOpacity="0.35" />
      </g>
    </svg>
  )
}

export default function Hero() {
  const stageRef = useRef(null)
  const floatRef = useRef(null)
  const [gpu, setGpu] = useState(false)

  useEffect(() => { setGpu(webglAvailable()) }, [])

  useEffect(() => {
    const stage = stageRef.current
    const floats = floatRef.current
    const section = stage?.closest('section')
    if (!stage || !section) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const move = (event) => {
      const rect = section.getBoundingClientRect()
      const nx = (event.clientX - rect.left) / rect.width - 0.5
      const ny = (event.clientY - rect.top) / rect.height - 0.5
      stage.style.setProperty('--rx', (nx * 7).toFixed(2))
      stage.style.setProperty('--ry', (ny * 5).toFixed(2))
      if (floats) {
        floats.style.setProperty('--px', (nx * -14).toFixed(1))
        floats.style.setProperty('--py', (ny * -10).toFixed(1))
      }
    }
    section.addEventListener('pointermove', move, { passive: true })
    return () => section.removeEventListener('pointermove', move)
  }, [])

  return (
    <section id="top" className="hero pt-16" data-reveal-group>
      <div className="hero-floor" aria-hidden="true" />

      <div className="float-layer" ref={floatRef} aria-hidden="true">
        <div className="float-item float-drift left-[6%] top-[18%] hidden lg:block" style={{ '--depth': 1.6 }}>
          <WireSphere className="w-24 opacity-70" />
        </div>
        <div className="float-item float-drift-late right-[7%] top-[14%] hidden lg:block" style={{ '--depth': 2.2 }}>
          <Cube size="4.2rem" />
        </div>
        <div className="float-item float-drift right-[16%] bottom-[30%] hidden xl:block" style={{ '--depth': 1.1 }}>
          <Torus className="w-28 opacity-70" />
        </div>
      </div>

      <div className="shell relative z-10 pb-20 pt-16 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center" data-reveal style={{ '--reveal-order': 0 }}>
          <div className="eyebrow mx-auto w-fit">Prism library · v4 index live</div>
          <h1 className="display mt-6 text-balance">
            Every asset here has <span className="spectrum-text">already survived</span> a real pipeline.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-7 text-mist sm:text-lg sm:leading-8">
            Prism is a library of 12,418 production 3D assets: quad topology, calibrated PBR, four LODs, and rigs that
            import clean into Unreal, Unity, Blender, and Houdini. Drop in, hit render, move on.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#pricing" className="button w-full sm:w-auto">Start with 50 free assets</a>
            <a href="#library" className="button button-ghost w-full sm:w-auto">Inspect the library</a>
          </div>
          <p className="mono mt-5 text-[11px] tracking-[0.08em] text-mist/70">GLTF · USD · FBX · BLEND - one license, no per-seat math</p>
        </div>

        <div className="stage mx-auto mt-16 max-w-4xl" data-reveal style={{ '--reveal-order': 1 }}>
          <div className="stage-rig relative" ref={stageRef}>
            <div className="viewport-card depth-1">
              <div className="viewport-bar">
                <span className="mono text-[10px] tracking-[0.14em] text-mist">PRISM VIEWPORT - KIT_BRUTAL_TOWER_004</span>
                <span className="mono hidden text-[10px] text-mist sm:block">SHADED · WIRE · UV</span>
              </div>
              <div className="grid gap-px sm:grid-cols-[1fr_220px]">
                <div className="grid min-h-[19rem] place-items-center p-4 sm:min-h-[21rem]">
                  {gpu ? (
                    <Suspense fallback={<Cube size="clamp(6rem, 16vw, 9rem)" />}>
                      <PrismScene />
                    </Suspense>
                  ) : (
                    <Cube size="clamp(6rem, 16vw, 9rem)" />
                  )}
                </div>
                <aside className="hidden border-l border-white/10 p-5 sm:block">
                  <p className="mono text-[10px] tracking-[0.14em] text-mist">ASSET REPORT</p>
                  <dl className="mt-4 space-y-3 text-xs">
                    {[
                      ['Tris (LOD0)', '18,204'],
                      ['UV sets', '2 · non-overlap'],
                      ['Maps', 'BC/N/R/M/AO 4K'],
                      ['Rig', 'none · static'],
                      ['Scale', 'real-world · 1u = 1m'],
                    ].map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between gap-3">
                        <dt className="text-mist">{key}</dt>
                        <dd className="mono text-[11px] text-white">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-5 border border-accent/40 bg-accent/5 p-3">
                    <p className="mono text-[9px] tracking-[0.16em] text-accent">PASSED QA</p>
                    <p className="mt-1.5 text-[11px] leading-4 text-white/80">Checked in 3 engines before listing. Rejected twice, fixed, shipped.</p>
                  </div>
                </aside>
              </div>
            </div>
            <span className="hud-chip depth-3 -left-3 top-10 hidden lg:inline-flex">DRAW CALLS <b>11</b></span>
            <span className="hud-chip depth-2 -right-2 top-24 hidden lg:inline-flex">LIGHT BAKE <b>CLEAN</b></span>
            <span className="hud-chip depth-3 -bottom-4 left-14 hidden lg:inline-flex">LODS <b>0–3 INCLUDED</b></span>
          </div>
        </div>
      </div>
    </section>
  )
}
