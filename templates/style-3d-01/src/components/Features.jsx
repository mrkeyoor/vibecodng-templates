// Source slug: eldora-card-flip-hover
// Author repo: https://github.com/karthikmudunuri/eldoraui
// Hover/focus 3D flip rebuilt in CSS; under reduced motion the back face renders inline below the front.

const features = [
  {
    front: 'Topology you can deform',
    icon: 'M10 10 H54 V54 H10 Z M10 25 H54 M10 40 H54 M25 10 V54 M40 10 V54',
    back: 'Quads only, edge loops where a rigger needs them. No decimated scan soup renamed "game-ready".',
    stat: '100% quad · zero n-gons',
  },
  {
    front: 'PBR that matches between engines',
    icon: 'M32 8 L56 22 V42 L32 56 L8 42 V22 Z M32 8 V32 M8 22 L32 32 L56 22',
    back: 'Every material is calibrated against a physical chart and exported per target: metal/rough for Unreal and Unity, USD preview surface for film.',
    stat: 'Chart-calibrated · 3 export profiles',
  },
  {
    front: 'LODs cut by hand',
    icon: 'M8 50 H24 V40 H8 Z M28 50 H42 V30 H28 Z M46 50 H58 V16 H46 Z',
    back: 'Four LODs per mesh with silhouettes checked at distance, not auto-decimated. Transition popping stays under one pixel at 1080p.',
    stat: 'LOD0–3 · <1px silhouette drift',
  },
  {
    front: 'Rigs that survive retargeting',
    icon: 'M32 10 A5 5 0 1 0 32 20 M32 20 V38 M32 26 L18 34 M32 26 L46 34 M32 38 L22 54 M32 38 L42 54',
    back: 'Humanoids ship on a standard skeleton with clean weights; mechs get FK/IK switches. Tested against Mixamo and Unreal retarget chains.',
    stat: 'Standard skeleton · FK/IK included',
  },
  {
    front: 'Search by silhouette',
    icon: 'M14 50 Q10 28 26 24 Q28 10 42 14 Q56 16 52 32 Q60 42 48 50 Z M22 50 V56 M44 50 V56',
    back: 'Sketch a blob, get assets whose outline matches. Faster than guessing what a prop artist named a chair in 2019.',
    stat: 'Shape index · 40ms median query',
  },
  {
    front: 'One license, shipped titles included',
    icon: 'M16 12 H48 V52 H16 Z M24 22 H40 M24 30 H40 M24 38 H34',
    back: 'Per-project and per-seat clauses are how libraries punish success. Prism is flat: use anything, ship anything, keep shipping it.',
    stat: 'Flat license · no revenue gates',
  },
]

export default function Features() {
  return (
    <section id="pipeline" className="section" data-reveal-group>
      <div className="shell">
        <div className="max-w-2xl" data-reveal style={{ '--reveal-order': 0 }}>
          <div className="eyebrow">Why teams stay</div>
          <h2 className="section-title mt-4">Built to the standard your art director already enforces</h2>
          <p className="mt-4 text-[15px] leading-7 text-mist">
            Flip any card. The front is the promise; the back is the measurable claim behind it.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={feature.front} className="flip-card" tabIndex={0} data-reveal style={{ '--reveal-order': index + 1 }}>
              <div className="flip-inner">
                <div className="flip-face">
                  <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true">
                    <path d={feature.icon} fill="none" stroke="var(--bw-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{feature.front}</h3>
                    <p className="mono mt-3 text-[10px] tracking-[0.14em] text-mist">HOVER TO INSPECT</p>
                  </div>
                </div>
                <div className="flip-face flip-back">
                  <p className="text-sm leading-6 text-white/85">{feature.back}</p>
                  <p className="mono text-[10px] tracking-[0.12em] text-accent">{feature.stat}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
