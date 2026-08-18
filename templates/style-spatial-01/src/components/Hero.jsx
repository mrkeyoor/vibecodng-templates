// Source slugs: eldora-blur-in-text (headline blur-in), uilayouts-hovercard3 (depth hover on the doc plane)
// Author repos: https://github.com/karthikmudunuri/eldoraui, https://github.com/ui-layouts/uilayouts
// Pointer parallax on the layer field is restrained to ±10px and disabled under reduced motion.
import { useEffect, useRef } from 'react'

function BlurWords({ text, from = 0 }) {
  return text.split(' ').map((word, index) => (
    <span key={`${word}-${index}`}>
      <span className="blur-word" style={{ '--w': from + index }}>{word}</span>
      {' '}
    </span>
  ))
}

export default function Hero() {
  const fieldRef = useRef(null)

  useEffect(() => {
    const field = fieldRef.current
    const section = field?.closest('section')
    if (!field || !section) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const move = (event) => {
      const rect = section.getBoundingClientRect()
      const nx = (event.clientX - rect.left) / rect.width - 0.5
      const ny = (event.clientY - rect.top) / rect.height - 0.5
      field.style.setProperty('--px', (nx * -10).toFixed(1))
      field.style.setProperty('--py', (ny * -8).toFixed(1))
    }
    section.addEventListener('pointermove', move, { passive: true })
    return () => section.removeEventListener('pointermove', move)
  }, [])

  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-36" data-reveal-group>
      <div className="shell pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow"><i /> Atlas 2.0 - spatial navigation shipped</div>
          <h1 className="display mt-7 text-balance">
            <BlurWords text="Your documentation," /><br />
            <em><BlurWords text="arranged in space." from={2} /></em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-7 text-mist sm:text-lg sm:leading-8">
            Atlas lays your docs out as connected planes instead of an endless left-hand tree. Readers see where a page
            sits, what it depends on, and what depends on it. Context stops being a guess.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#pricing" className="button w-full sm:w-auto">Open a free space</a>
            <a href="#views" className="button button-ghost w-full sm:w-auto">See the three views</a>
          </div>
          <p className="mono mt-5 text-[10px] tracking-[0.16em] text-mist">IMPORTS MARKDOWN, MDX, OPENAPI · EXPORTS PLAIN HTML</p>
        </div>

        <div className="field relative mx-auto mt-16 max-w-3xl" ref={fieldRef}>
          <div className="parallax-layer" style={{ '--depth': 0.5 }}>
            <div className="doc-stack">
              <div className="doc-plane-back b2" aria-hidden="true" />
              <div className="doc-plane-back b1" aria-hidden="true" />
              <div className="plane hover-depth relative p-6 sm:p-8" data-reveal style={{ '--reveal-order': 2 }}>
                <div className="flex items-center justify-between gap-4 border-b border-ink/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="mono rounded-md border border-ink/10 bg-fog px-2 py-1 text-[10px] text-mist">auth /</span>
                    <span className="mono rounded-md border border-accent/30 bg-accent/5 px-2 py-1 text-[10px] font-semibold text-accent">session-tokens</span>
                  </div>
                  <span className="mono hidden text-[10px] text-mist sm:block">DEPTH 2 · 6 LINKED PLANES</span>
                </div>
                <div className="mt-5 grid gap-8 sm:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <h2 className="font-display text-2xl">Session tokens</h2>
                    <div className="mt-4" aria-hidden="true">
                      <div className="doc-line"><b style={{ width: '38%' }} /><i style={{ width: '30%' }} /></div>
                      <div className="doc-line"><i style={{ width: '84%' }} /></div>
                      <div className="doc-line"><i style={{ width: '76%' }} /></div>
                      <div className="doc-line"><i style={{ width: '58%' }} /><b style={{ width: '18%' }} /></div>
                      <div className="doc-line"><i style={{ width: '68%' }} /></div>
                    </div>
                  </div>
                  <div className="rounded-xl border border-ink/10 bg-fog p-4" aria-hidden="true">
                    <p className="mono text-[9px] tracking-[0.18em] text-mist">NEIGHBORS</p>
                    <svg viewBox="0 0 180 120" className="mt-2 w-full">
                      <g stroke="color-mix(in srgb, var(--bw-text) 18%, transparent)" strokeWidth="1">
                        <line x1="90" y1="60" x2="34" y2="24" /><line x1="90" y1="60" x2="146" y2="26" />
                        <line x1="90" y1="60" x2="30" y2="96" /><line x1="90" y1="60" x2="150" y2="94" />
                      </g>
                      <circle cx="90" cy="60" r="7" fill="var(--bw-accent)" />
                      <g fill="color-mix(in srgb, var(--bw-text) 35%, transparent)">
                        <circle cx="34" cy="24" r="5" /><circle cx="146" cy="26" r="5" />
                        <circle cx="30" cy="96" r="5" /><circle cx="150" cy="94" r="5" />
                      </g>
                    </svg>
                    <p className="mt-1 text-[11px] leading-4 text-mist">refresh-flow, api-keys, logout, rate-limits</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="parallax-layer pointer-events-none absolute inset-0" style={{ '--depth': 1.6 }} aria-hidden="true">
            <span className="anchor-chip -top-5 left-2 hidden sm:inline-flex">READERS HERE NOW <b>14</b></span>
          </div>
          <div className="parallax-layer pointer-events-none absolute inset-0" style={{ '--depth': 2.1 }} aria-hidden="true">
            <span className="anchor-chip -right-3 top-20 hidden sm:inline-flex">STALE LINKS <b>0</b></span>
          </div>
          <div className="parallax-layer pointer-events-none absolute inset-0" style={{ '--depth': 1.2 }} aria-hidden="true">
            <span className="anchor-chip -bottom-6 right-14 hidden sm:inline-flex">LAST VERIFIED <b>2H AGO</b></span>
          </div>
        </div>
      </div>
    </section>
  )
}
