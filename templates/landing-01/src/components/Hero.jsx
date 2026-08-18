// Source slugs: motion-primitives-spotlight, magicui-animated-list, magicui-line-shadow-text
// Author repo: https://github.com/ibelick/motion-primitives
// Effect sources: https://github.com/magicuidesign/magicui

import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, Branch, Pulse } from './Icons.jsx'
import { useReducedMotion } from './Effects.jsx'

// Signature backdrop ships as its own lazy chunk so first paint stays fast;
// while it loads (or when WebGL2 is unavailable) the CSS grid + spotlight
// version of this hero renders unchanged.
const HeroField = lazy(() => import('./HeroField.jsx'))

function Spotlight() {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    const parent = node?.parentElement
    if (!node || !parent) return undefined
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined

    const move = (event) => {
      const rect = parent.getBoundingClientRect()
      node.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
      node.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
    }

    parent.addEventListener('pointermove', move, { passive: true })
    return () => parent.removeEventListener('pointermove', move)
  }, [])

  return <div ref={ref} className="spotlight" aria-hidden="true" />
}

const initialCards = [
  { id: 'DEV-218', title: 'Cache build artifacts', tag: 'PLATFORM', meta: 'M. Singh', state: 'healthy', version: 0 },
  { id: 'DEV-224', title: 'Retry failed webhooks', tag: 'RELIABILITY', meta: 'A. Ortiz', state: 'risk', version: 0 },
  { id: 'DEV-229', title: 'Tighten deploy gate', tag: 'RELEASE', meta: 'J. Park', state: 'healthy', version: 0 },
]

const incomingCards = [
  { id: 'DEV-231', title: 'Ship audit trail export', tag: 'SECURITY', meta: 'K. Diaz', state: 'healthy' },
  { id: 'DEV-233', title: 'Unblock release candidate', tag: 'RELEASE', meta: 'J. Park', state: 'risk' },
  { id: 'DEV-236', title: 'Trim preview build time', tag: 'PLATFORM', meta: 'M. Singh', state: 'healthy' },
  { id: 'DEV-239', title: 'Verify incident handoff', tag: 'RELIABILITY', meta: 'A. Ortiz', state: 'healthy' },
]

function WorkCard({ card, index }) {
  const details = [
    { branch: 'cache/layer-v2', checks: '4 / 4', progress: 86 },
    { branch: 'webhook/backoff', checks: '2 / 4', progress: 52 },
    { branch: 'release/gate', checks: '3 / 3', progress: 100 },
  ][index]
  return (
    <div className={`work-card work-card-live ${index === 1 ? 'work-card-active' : ''}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="mono text-[10px] text-mist">{card.id}</span>
        <span className={`status-dot ${card.state === 'risk' ? 'status-risk' : ''}`} />
      </div>
      <p className="mt-5 text-sm font-medium text-white">{card.title}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="mono text-[9px] tracking-[0.12em] text-accent">{card.tag}</span>
        <span className="text-[10px] text-mist">{card.meta}</span>
      </div>
      <div className="card-detail mt-4"><div><span className="mono">{details.branch}</span><b>{details.checks}</b></div><div className="mini-progress"><i style={{width:`${details.progress}%`}}/></div></div>
    </div>
  )
}

export default function Hero() {
  const reduced = useReducedMotion()
  const [cards, setCards] = useState(initialCards)
  const cursor = useRef(0)

  useEffect(() => {
    if (reduced) return undefined
    const interval = window.setInterval(() => {
      const step = cursor.current
      const slot = step % initialCards.length
      const next = incomingCards[step % incomingCards.length]
      setCards((current) => current.map((card, index) => (
        index === slot ? { ...next, version: card.version + 1 } : card
      )))
      cursor.current += 1
    }, 2400)
    return () => window.clearInterval(interval)
  }, [reduced])

  return (
    <section id="top" className="hero relative border-b border-white/8 pt-20" data-reveal-group>
      <Spotlight />
      <div className="hero-grid" aria-hidden="true" />
      <Suspense fallback={null}>
        <HeroField />
      </Suspense>
      <div className="shell relative z-10 pb-16 pt-20 sm:pb-24 sm:pt-28 lg:pb-28 lg:pt-32">
        <div className="mx-auto max-w-5xl text-center" data-reveal style={{ '--reveal-order': 0 }}>
          <div className="eyebrow mx-auto w-fit">
            <span className="live-dot" /> Boardwatch 1.0 · Early access
          </div>
          <h1 className="display mt-7 text-balance">
            See the work move.<br /><span className="line-shadow-text text-accent" data-text="Before it stalls.">Before it stalls.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-7 text-mist sm:text-lg sm:leading-8">
            Boardwatch turns pull requests, delivery plans, and incidents into one calm operating view-so engineering teams can act before a blocker becomes a deadline.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#pricing" className="button w-full justify-center sm:w-auto">Start free <ArrowUpRight /></a>
            <a href="#features" className="button button-ghost w-full justify-center sm:w-auto">Explore the workflow <ArrowRight /></a>
          </div>
          <p className="mt-4 text-xs tracking-wide text-mist/70">14 days free · Connect in read-only mode · Cancel anytime</p>
        </div>

        <div className="product-frame mx-auto mt-14 max-w-6xl sm:mt-20" data-reveal style={{ '--reveal-order': 1 }}>
          <div className="frame-bar">
            <div className="flex items-center gap-2" aria-hidden="true"><i /><i /><i /></div>
            <div className="mono hidden text-[10px] tracking-[0.12em] text-mist sm:block">ACME / DELIVERY PULSE</div>
            <div className="flex items-center gap-2 text-[10px] text-mist"><span className="live-dot" /> LIVE</div>
          </div>
          <div className="grid gap-px bg-white/8 lg:grid-cols-[1fr_270px]">
            <div className="bg-panel p-4 sm:p-6">
              <div className="dashboard-toolbar mb-5"><div className="toolbar-tabs"><span className="active">Board</span><span>Timeline</span><span>Signals</span></div><div className="avatar-cluster" aria-label="Four teammates active"><i>MS</i><i>AO</i><i>JP</i><b>+4</b></div></div>
              <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="mono text-[10px] tracking-[0.16em] text-mist">SPRINT 34 · DAY 7</p>
                  <h2 className="mt-2 text-lg font-semibold tracking-tight">Release train</h2>
                </div>
                <div className="flex gap-2 text-[10px] text-mist"><span className="chip"><Branch className="size-3.5" /> 18 active</span><span className="chip"><Pulse className="size-3.5" /> 2 signals</span></div>
              </div>
              <div className="board-columns">
                {['PLANNED · 08', 'IN REVIEW · 05', 'READY · 05'].map((label, index) => (
                  <div key={label} className="min-w-0">
                    <p className="mono mb-3 text-[9px] tracking-[0.14em] text-mist">{label}</p>
                    <WorkCard key={`${cards[index].id}-${cards[index].version}`} card={cards[index]} index={index} />
                    <div className="mt-3 hidden rounded-lg border border-dashed border-white/10 py-5 text-center text-[10px] text-mist sm:block">OPEN LANE</div>
                  </div>
                ))}
              </div>
              <div className="activity-strip mt-4"><span className="live-dot"/><p><b>J. Park</b> moved DEV-229 to Ready</p><time>2m</time><i/><p><b>Checks</b> passed on cache/layer-v2</p><time>6m</time></div>
            </div>
            <aside className="bg-ink p-5 sm:p-6">
              <p className="mono text-[10px] tracking-[0.16em] text-mist">WATCH SIGNALS</p>
              <div className="mt-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between text-xs"><span>Review latency</span><span className="text-accent">−18%</span></div>
                  <div className="latency-graph mt-3" role="img" aria-label="Review latency trending downward">
                    <svg viewBox="0 0 220 42" preserveAspectRatio="none" aria-hidden="true">
                      <defs><linearGradient id="latency-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--bw-accent)" stopOpacity=".24" /><stop offset="1" stopColor="var(--bw-accent)" stopOpacity="0" /></linearGradient></defs>
                      <path d="M0 9 C22 11 30 7 50 15 S86 24 108 19 S142 29 166 25 S195 34 220 29 L220 42 L0 42 Z" fill="url(#latency-fill)" />
                      <path d="M0 9 C22 11 30 7 50 15 S86 24 108 19 S142 29 166 25 S195 34 220 29" fill="none" stroke="var(--bw-accent)" strokeWidth="1.25" />
                    </svg>
                    <span className="latency-shimmer" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs"><span>Scope movement</span><span className="text-mist">Stable</span></div>
                  <div className="meter mt-3"><span style={{ width: '46%' }} /></div>
                </div>
                <div className="throughput-panel"><div className="flex items-center justify-between"><span>Throughput</span><b>+12%</b></div><svg viewBox="0 0 220 72" aria-label="Throughput over seven days"><g className="bar-chart">{[22,31,28,45,39,58,64].map((v,i)=><rect key={i} x={i*31+4} y={68-v} width="20" height={v} rx="2"/>)}</g></svg><div className="chart-labels"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div></div>
                <div className="signal-callout">
                  <span className="mono text-[9px] tracking-[0.16em] text-accent">ATTENTION</span>
                  <p className="mt-2 text-xs leading-5 text-white/85">DEV-224 has crossed its review threshold by 6 hours.</p>
                  <div className="mt-3 flex items-center justify-between"><span className="mono text-[8px] text-mist">OWNER · A. ORTIZ</span><b className="text-[9px]">OPEN ↗</b></div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}
