// Hero. Aurora headline adapted from an indexed component; editor mock is first-party.
//
// Headline source slug: magicui-aurora-text
// Author repo: https://github.com/magicuidesign/magicui
// Adapted: gradient-clipped drifting text with sr-only copy kept; fixed hex stops
// replaced by hues derived from --bw-accent so palettes re-key the aurora.
import { lazy, Suspense, useEffect, useState } from 'react'
import { ArrowRight, Sparkle } from './Icons.jsx'

// Signature hero: real GLSL mesh-gradient (lazy WebGL2 chunk). The CSS blob
// field in App stays as the no-WebGL fallback and page-length backdrop.
const MeshShader = lazy(() => import('./shader/MeshShader.jsx'))

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

function AuroraWord({ children }) {
  return (
    <span className="relative inline-block">
      <span className="sr-only">{children}</span>
      <span className="aurora-text" aria-hidden="true">{children}</span>
    </span>
  )
}

function EditorMock() {
  return (
    <div className="pane mx-auto mt-14 max-w-4xl overflow-hidden sm:mt-20" aria-label="Preview of the Nimbus editor">
      <div className="editor-bar">
        <div className="flex items-center gap-2" aria-hidden="true"><i /><i /><i /></div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist">field-notes-issue-14.md</p>
        <p className="text-[11px] font-medium text-mist">Draft 3</p>
      </div>
      <div className="grid gap-0 md:grid-cols-[1fr_240px]">
        <div className="p-6 sm:p-8">
          <p className="font-display text-xl font-bold tracking-tight sm:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
            Why the best interviews start late
          </p>
          <div className="mt-5 space-y-2.5" aria-hidden="true">
            <div className="doc-line" style={{ width: '96%' }} />
            <div className="doc-line" style={{ width: '88%' }} />
            <div className="doc-line doc-line-dim" style={{ width: '92%' }} />
            <div className="doc-line doc-line-dim" style={{ width: '61%' }} />
          </div>
          <p className="mt-6 text-sm leading-7 text-white/85">
            The first ten minutes of any interview are theater. The real conversation begins
            when the recorder is forgotten<span className="caret" aria-hidden="true" />
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="suggest-chip"><Sparkle /> Continue in my voice</span>
            <span className="suggest-chip" style={{ opacity: 0.65 }}>Tighten this paragraph</span>
          </div>
        </div>
        <aside className="border-t border-white/8 p-5 md:border-l md:border-t-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-mist">Nimbus notes</p>
          <ul className="mt-4 space-y-4 text-xs leading-5 text-mist">
            <li>
              <span className="font-semibold text-white/85">Tone drift.</span> Paragraph 4 reads
              more formal than your last three essays.
            </li>
            <li>
              <span className="font-semibold text-white/85">Source found.</span> The 2024 Pew
              study backs your claim. Insert citation?
            </li>
            <li>
              <span className="font-semibold text-white/85">Reading time.</span> 6 min. Your
              newsletter median is 5 min.
            </li>
          </ul>
        </aside>
      </div>
    </div>
  )
}

export default function Hero() {
  const webgl = useWebGL2()
  return (
    <section id="top" className="relative pt-36 sm:pt-40" data-reveal-group>
      {webgl && (
        <div className="mesh-wrap" aria-hidden="true">
          <Suspense fallback={null}>
            <MeshShader />
          </Suspense>
        </div>
      )}
      <div className="relative shell pb-16 sm:pb-24">
        <div className="mx-auto max-w-3xl text-center" data-reveal style={{ '--reveal-order': 0 }}>
          <span className="eyebrow"><Sparkle /> Nimbus 2.0 · Sourced facts in every draft</span>
          <h1 className="display mt-7 text-balance">
            Write with the <AuroraWord>lights on</AuroraWord>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-7 text-mist sm:text-lg sm:leading-8">
            Nimbus is a writing tool that drafts beside you, not instead of you. It keeps your
            voice, checks your facts, and turns a blank page into a working outline in one keystroke.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#cta" className="button w-full sm:w-auto">Start writing free <ArrowRight /></a>
            <a href="#showcase" className="button button-ghost w-full sm:w-auto">See the editor</a>
          </div>
          <p className="mt-4 text-xs font-medium tracking-wide text-mist/80">
            Free for 20,000 words a month · Your drafts are never training data
          </p>
        </div>
        <div data-reveal style={{ '--reveal-order': 1 }}>
          <EditorMock />
        </div>
      </div>
    </section>
  )
}
