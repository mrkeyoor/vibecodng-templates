// Source slug: cultui-three-d-carousel
// Author repo: https://github.com/nolly-studio/cult-ui
// Rotating cylinder carousel rebuilt with CSS preserve-3d and button-driven rotation (no autoplay).
// Reduced motion: the ring collapses into a flat stacked list.
import { useState } from 'react'

const collections = [
  { name: 'Blockout City', count: '1,214 assets', note: 'Modular streets, towers, and infill that snap on a 25cm grid.', art: 'M10 54 V26 L22 20 V54 M26 54 V14 L40 8 V54 M44 54 V30 L56 24 V54' },
  { name: 'Overgrowth', count: '842 assets', note: 'Scanned foliage repacked into wind-ready clusters and cards.', art: 'M32 56 V26 M32 38 Q18 36 14 18 Q30 20 32 32 M32 30 Q36 14 52 12 Q50 30 32 38' },
  { name: 'Workshop Clutter', count: '1,067 assets', note: 'The props that make a scene lived-in: tools, crates, cables, grime.', art: 'M12 50 H52 M16 50 V36 H30 V50 M34 50 V30 H48 V50 M20 36 V28 H26 V36' },
  { name: 'Signal & Steel', count: '486 assets', note: 'Hard-surface mechs and drones, rigged with FK/IK switching.', art: 'M24 14 H40 V30 H24 Z M20 30 L14 54 M44 30 L50 54 M28 30 L26 42 M36 30 L38 42 M28 20 H36' },
  { name: 'Wet Streets', count: '318 materials', note: 'Layered asphalt, puddle masks, and decals tuned for night scenes.', art: 'M8 18 H56 V50 H8 Z M8 34 H56 M24 18 V50 M40 18 V50 M14 42 Q18 38 22 42' },
  { name: 'Set Dressing: Diner', count: '61 assets', note: 'A full location kit; every asset lit and tested together.', art: 'M12 52 V32 H52 V52 M18 32 V22 H46 V32 M26 42 H38 M12 52 H52' },
]

const stats = [
  { value: '12,418', label: 'assets in the index' },
  { value: '4', label: 'LODs on every mesh' },
  { value: '3', label: 'engines in the QA pass' },
  { value: '0', label: 'assets listed untested' },
]

export default function Showcase() {
  const [step, setStep] = useState(0)
  const angle = step * -60
  const frontIndex = ((step % collections.length) + collections.length) % collections.length

  return (
    <section id="collections" className="section border-t border-white/8" data-reveal-group>
      <div className="shell">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-reveal style={{ '--reveal-order': 0 }}>
            <div className="eyebrow">Collections</div>
            <h2 className="section-title mt-4">Kits, not piles</h2>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-mist">
              Assets ship in collections that were modeled, textured, and lit together, so nothing looks pasted in.
              Rotate the ring; each card is a full location kit.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <button type="button" className="ring-nav" onClick={() => setStep((value) => value - 1)} aria-label="Previous collection">←</button>
              <button type="button" className="ring-nav" onClick={() => setStep((value) => value + 1)} aria-label="Next collection">→</button>
              <span className="mono ml-2 text-[11px] tracking-[0.14em] text-mist" aria-live="polite">
                {String(frontIndex + 1).padStart(2, '0')} / {String(collections.length).padStart(2, '0')} - {collections[frontIndex].name.toUpperCase()}
              </span>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="order-2 mt-1 block text-[13px] text-mist">{stat.label}</dt>
                  <dd className="stat-value m-0">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="ring-stage" data-reveal style={{ '--reveal-order': 1 }}>
            <div className="ring" style={{ '--ring-angle': angle }}>
              {collections.map((collection, index) => (
                <article
                  key={collection.name}
                  className="ring-item"
                  style={{ '--i': index }}
                  data-front={index === frontIndex}
                  aria-hidden={index !== frontIndex}
                >
                  <svg viewBox="0 0 64 64" className="h-16 w-16" aria-hidden="true">
                    <path d={collection.art} fill="none" stroke="var(--bw-accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <h3 className="font-semibold tracking-tight">{collection.name}</h3>
                    <p className="mono mt-1 text-[10px] tracking-[0.12em] text-accent">{collection.count.toUpperCase()}</p>
                    <p className="mt-3 text-[13px] leading-5 text-mist">{collection.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
